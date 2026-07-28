#!/usr/bin/env python3
"""
bib_to_md.py — BibTeX to Markdown generator for MedVIC Lab
============================================================
Reads medvic_publications.bib (or any .bib file) and generates one Markdown file
per entry in pages/publications/. Idempotent: existing files are skipped.

Usage:
    python3 scripts/bib_to_md.py
    python3 scripts/bib_to_md.py --bib medvic_publications.bib --out pages/publications --overwrite

Spec: MedVIC_Technical_Handoff_Brief.docx §3.4.1
"""

import argparse
import re
import sys
import textwrap
from pathlib import Path

# ── Tag auto-assignment rules ──────────────────────────────────────────────────
# Each rule: (keyword_patterns, tag_to_assign)
# Keywords are matched against combined title + journal/booktitle + abstract (case-insensitive)

THEME_RULES = [
    # Theme tags
    (["shape model", "ssm", "shapeworks", "correspondence", "statistical shape",
      "anatomy", "morpholog", "morphometry", "anatomical"], "modeling-patient-state"),
    (["domain adapt", "weak supervision", "multi-instance", "MIL", "weakly",
      "label-efficient", "self-supervised", "semi-supervised",
      "virtual stain", "stain transfer", "stain diffus",
      "annotation", "heterogeneous data", "clinical constraint"], "learning-under-constraints"),
    (["uncertainty", "trustworth", "interpret", "calibrat", "epistemic",
      "aleatoric", "reliability", "out-of-distribution", "OOD",
      "VIB", "variational information bottleneck", "concept",
      "explainab", "transparent"], "clinically-trustworthy"),
]

METHOD_RULES = [
    (["shapeworks", "correspondence optim", "particle-based", "statistical shape"], "shape-modeling"),
    (["deep learning", "neural network", "CNN", "transformer", "ViT",
      "attention", "encoder", "decoder"], "deep-learning"),
    (["GAN", "generative adversarial", "diffusion model", "normalizing flow",
      "VAE", "variational autoencoder", "generative model"], "generative"),
    (["bayesian", "probabilistic", "uncertainty", "VIB", "variational information",
      "posterior", "prior", "ELBO"], "probabilistic"),
    (["registrat", "deformable", "diffeomorphic", "atlas", "warp",
      "LEDA", "EfficientMorph", "MORPH-LER"], "registration"),
    (["segment", "delineation", "label propagat"], "segmentation"),
    (["reconstruct", "accelerated MRI", "inverse problem", "compressed sensing",
      "undersampled", "k-space"], "reconstruction"),
    (["virtual stain", "stain diffus", "ImplicitStain", "StainDiffus",
      "immunohistochem", "IHC", "H&E", "histopathology stain"], "virtual-staining"),
    (["domain adapt", "domain shift", "distribution shift", "cross-domain",
      "UDA", "covariate shift"], "domain-adaptation"),
    (["vision-language", "VLM", "CLIP", "concept discovery",
      "multimodal", "foundation model", "LLM", "GPT", "BERT"], "foundation-models"),
    (["point cloud", "point2ssm", "mesh2ssm", "surface mesh",
      "3D shape", "point set"], "shape-modeling"),
]

DOMAIN_RULES = [
    (["atrial fibrill", "left atrium", "right ventricle", "cardiac", "heart",
      "LGE-MRI", "cardio", "ablation", "electrophysiol"], "cardiac"),
    (["hip", "knee", "foot", "ankle", "shoulder", "spine", "vertebra",
      "orthopedic", "musculoskeletal", "femoroacetabular", "dysplasia",
      "osteoarthritis", "bone", "joint"], "orthopedics"),
    (["craniosynostosis", "cranial", "skull", "CranioRate", "craniofacial",
      "sagittal", "metopic", "coronal"], "craniofacial"),
    (["patholog", "histopathol", "whole slide", "WSI", "colorectal",
      "prostate", "gland", "tumor", "cancer", "H&E", "stain"], "computational-pathology"),
    (["brain", "diffusion MRI", "DTI", "tractograph", "white matter",
      "HARDI", "neuroimag"], "neuroscience"),
    (["spine", "vertebra", "lumbar", "cervical", "EOS Imaging",
      "scoliosis", "intervertebral"], "spine"),
    (["intraoperative", "surgical", "ARPA-H", "MAGIC-SCAN",
      "structured illumination", "SIMPLER"], "intraoperative"),
]

SPECIAL_RULES = [
    (["shapeworks", "ShapeWorks"], "shapeworks"),
    (["craniorate", "CranioRate"], "craniorate"),
]

# Papers that should be featured (by key suffix match or title substring)
FEATURED_KEYS = {
    "Adams2024_Point2SSM",
    "Adams2023_BVIB",
    "Xu2023_Image2SSM",
    "Bhalodia2021_DeepSSM",
    "Cates2017_Shapeworks",
    # Fallback title substrings:
}
FEATURED_TITLE_SUBSTRINGS = [
    "Point2SSM: Learning Morphological",
    "Fully Bayesian VIB",
    "Image2SSM",
    "DeepSSM: A Blueprint",
    "Benchmarking Off-the-Shelf Statistical Shape",
]


# ── BibTeX parser ──────────────────────────────────────────────────────────────

def parse_bib(bib_path: Path) -> list[dict]:
    """Parse a .bib file and return a list of entry dicts."""
    text = bib_path.read_text(encoding="utf-8", errors="replace")

    entries = []
    # Match @type{key, ... }
    entry_pattern = re.compile(
        r"@(\w+)\s*\{\s*([^,\s]+)\s*,\s*(.*?)\n\}", re.DOTALL
    )
    for m in entry_pattern.finditer(text):
        entry_type = m.group(1).lower()
        key = m.group(2).strip()
        body = m.group(3)

        if entry_type in ("comment", "string", "preamble"):
            continue

        fields = parse_fields(body)
        fields["_type"] = entry_type
        fields["_key"] = key
        entries.append(fields)

    return entries


def parse_fields(body: str) -> dict:
    """Parse field = {value} pairs from a BibTeX entry body."""
    fields = {}
    # Split on field boundaries: look for `word  =`
    field_pattern = re.compile(
        r"(\w+)\s*=\s*(?:\{((?:[^{}]|\{[^{}]*\})*)\}|\"([^\"]*)\"|(\d+))",
        re.DOTALL,
    )
    for m in field_pattern.finditer(body):
        name = m.group(1).lower().strip()
        value = (m.group(2) or m.group(3) or m.group(4) or "").strip()
        # Collapse whitespace including newlines
        value = re.sub(r"\s+", " ", value)
        # Remove LaTeX commands we can't render: \textbf, \textit etc
        value = re.sub(r"\\text(?:bf|it|rm|sc|sf|tt)\{([^}]*)\}", r"\1", value)
        # Remove remaining single-char LaTeX commands like \'e -> e
        value = re.sub(r"\\'(\w)", r"\1", value)
        value = re.sub(r'\\"(\w)', r"\1", value)
        value = value.replace("\\&", "&").replace("\\%", "%").replace("---", "—").replace("--", "–")
        # Strip LaTeX grouping braces (used for case protection in BibTeX, e.g. {DeepSSM})
        value = re.sub(r"\{([^{}]*)\}", r"\1", value)
        # Remove any remaining braces
        value = value.replace("{", "").replace("}", "")
        fields[name] = value
    return fields


# ── Slug generation ────────────────────────────────────────────────────────────

def make_slug(entry: dict) -> str:
    """Generate YYYY_short_title slug from a BibTeX entry."""
    year = entry.get("year", "0000")
    title = entry.get("title", entry["_key"])

    # Remove special characters, collapse spaces
    short = re.sub(r"[^a-zA-Z0-9\s]", "", title)
    words = short.split()

    # Drop common stop words and take first 3–4 meaningful words
    stopwords = {"a", "an", "the", "of", "for", "in", "on", "at", "to",
                 "and", "or", "with", "from", "via", "using", "by",
                 "is", "are", "that", "this", "into", "as", "its"}
    meaningful = [w for w in words if w.lower() not in stopwords][:4]

    if not meaningful:
        meaningful = words[:3]

    slug_title = "_".join(w.lower() for w in meaningful)
    slug_title = re.sub(r"_+", "_", slug_title).strip("_")

    return f"{year}_{slug_title}"


# ── Author formatting ──────────────────────────────────────────────────────────

def format_authors(raw: str, max_names: int = 5) -> str:
    """Format 'Firstname Lastname and ...' into 'F. Lastname, ..., et al.'"""
    if not raw:
        return ""
    # Split on " and "
    parts = re.split(r"\s+and\s+", raw, flags=re.IGNORECASE)
    names = []
    for p in parts:
        p = p.strip()
        if not p or p.lower() == "others":
            continue
        names.append(p)

    if len(names) > max_names:
        shown = names[:max_names]
        formatted = []
        for n in shown:
            formatted.append(format_single_author(n))
        return ", ".join(formatted) + ", et al."
    else:
        return ", ".join(format_single_author(n) for n in names)


def format_single_author(name: str) -> str:
    """Keep full name as-is (for author linking); used verbatim in frontmatter."""
    return name.strip()


# ── Venue extraction ───────────────────────────────────────────────────────────

def extract_venue(entry: dict) -> tuple[str, str]:
    """Return (venue_name, venue_type) from entry fields."""
    etype = entry["_type"]

    if etype == "article":
        venue = entry.get("journal", "")
        return venue, "journal"

    if etype in ("inproceedings", "proceedings"):
        venue = entry.get("booktitle", "")
        return venue, classify_conference(venue)

    if etype == "techreport":
        return entry.get("institution", "Technical Report"), "preprint"

    if etype == "misc":
        note = entry.get("note", "")
        how = entry.get("howpublished", "")
        if "arxiv" in note.lower() or "arxiv" in how.lower():
            return "arXiv", "preprint"
        return how or note or "Preprint", "preprint"

    if etype == "phdthesis":
        return entry.get("school", "Dissertation"), "preprint"

    if etype == "incollection":
        return entry.get("booktitle", "Book Chapter"), "journal"

    return entry.get("journal", entry.get("booktitle", "")), "conference"


def classify_conference(booktitle: str) -> str:
    bt = booktitle.lower()
    # Workshop indicators
    workshop_indicators = ["workshop", "shapemi", "mlmi", "stacom", "midl workshop",
                           "miccai workshop", "milland", "isbi workshop"]
    if any(w in bt for w in workshop_indicators):
        return "workshop"
    # Known conferences
    conferences = ["miccai", "iclr", "cvpr", "iccv", "eccv", "wacv", "aaai", "neurips",
                   "isbi", "ipmi", "midl", "cinc", "accv", "miua", "mlmi", "stacom"]
    if any(c in bt for c in conferences):
        return "conference"
    # Journals
    journals = ["journal", "transactions", "frontiers", "plos", "nature",
                "ieee", "medical image analysis", "radiology", "jbme"]
    if any(j in bt for j in journals):
        return "journal"
    return "conference"


# ── Tag assignment ─────────────────────────────────────────────────────────────

def assign_tags(entry: dict, venue_type: str) -> list[str]:
    """Auto-assign tags from the MedVIC taxonomy."""
    # Build search text
    searchable = " ".join([
        entry.get("title", ""),
        entry.get("journal", ""),
        entry.get("booktitle", ""),
        entry.get("abstract", ""),
        entry.get("keywords", ""),
        entry.get("note", ""),
    ]).lower()

    tags = set()

    # Venue type tag
    tags.add(venue_type)

    # Theme tags (pick up to 1)
    for patterns, tag in THEME_RULES:
        if any(p.lower() in searchable for p in patterns):
            tags.add(tag)
            break  # one theme tag per paper

    # Method tags (up to 2)
    method_count = 0
    for patterns, tag in METHOD_RULES:
        if method_count >= 2:
            break
        if any(p.lower() in searchable for p in patterns):
            tags.add(tag)
            method_count += 1

    # Domain tag (pick first match)
    for patterns, tag in DOMAIN_RULES:
        if any(p.lower() in searchable for p in patterns):
            tags.add(tag)
            break

    # Special tags
    for patterns, tag in SPECIAL_RULES:
        if any(p.lower() in searchable for p in patterns):
            tags.add(tag)

    # Featured check
    key = entry["_key"]
    title = entry.get("title", "")
    if key in FEATURED_KEYS or any(fs in title for fs in FEATURED_TITLE_SUBSTRINGS):
        tags.add("featured")

    return sorted(tags)


# ── BibTeX block generation ────────────────────────────────────────────────────

def make_bibtex_block(entry: dict) -> str:
    """Regenerate a clean BibTeX block for the entry."""
    key = entry["_key"]
    etype = entry["_type"]
    skip = {"_type", "_key"}

    lines = [f"@{etype}{{{key},"]
    for k, v in entry.items():
        if k in skip or not v:
            continue
        lines.append(f"  {k:15s} = {{{v}}},")
    lines.append("}")
    return "\n".join(lines)


# ── Markdown file generation ───────────────────────────────────────────────────

def entry_to_markdown(entry: dict, slug: str) -> str:
    """Convert a BibTeX entry to a VitePress publication Markdown file."""
    title = entry.get("title", "Untitled")
    authors_raw = entry.get("author", "")
    authors = format_authors(authors_raw)
    year = entry.get("year", "")
    doi = entry.get("doi", "")
    url = entry.get("url", "")
    arxiv_id = entry.get("arxiv", entry.get("eprint", ""))

    # Try to find arXiv from URL or note
    if not arxiv_id:
        for field in ("url", "note", "howpublished"):
            val = entry.get(field, "")
            m = re.search(r"arxiv\.org/abs/([0-9]{4}\.\d+)", val, re.IGNORECASE)
            if m:
                arxiv_id = m.group(1)
                break

    venue, venue_type = extract_venue(entry)
    tags = assign_tags(entry, venue_type)
    abstract = entry.get("abstract", "")
    bibtex_block = make_bibtex_block(entry)

    # Conference / journal label for card
    conf_label = venue[:60] if venue else ""

    # Build links block
    links = {}
    if doi:
        links["doi"] = f"https://doi.org/{doi}"
    if arxiv_id:
        links["arxiv"] = f"https://arxiv.org/abs/{arxiv_id}"
    if url and url not in (links.get("doi", ""), links.get("arxiv", "")):
        if not doi:  # use url as doi link if no doi
            links["doi"] = url

    links_yaml = ""
    if links:
        links_yaml = "links:\n"
        for k, v in links.items():
            links_yaml += f"  {k}: \"{v}\"\n"

    tags_yaml = "[" + ", ".join(f'"{t}"' for t in tags) + "]"

    featured_line = 'featured: true\n' if "featured" in tags else ''

    content = f"""---
layout: publication
title: "{title}"
authors: "{authors}"
year: "{year}"
venue: "{conf_label}"
tags: {tags_yaml}
{featured_line}image:
  src: ""
  alt: "{title}"
{links_yaml}
bibtex_key: "{entry['_key']}"
---

# {title}

**{authors}**

*{conf_label}{', ' + year if year else year}*

"""

    if abstract:
        content += f"{abstract}\n\n"
    else:
        content += "_Abstract not yet added. Run `scripts/fetch_arxiv.py` to auto-populate from arXiv, or paste from the paper page._\n\n"

    content += f"""
## Citation

```bibtex
{bibtex_block}
```
"""

    return content


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Generate publication Markdown stubs from a BibTeX file.")
    parser.add_argument("--bib", default="medvic_publications.bib",
                        help="Path to the .bib file (default: medvic_publications.bib)")
    parser.add_argument("--out", default="pages/publications",
                        help="Output directory for .md files (default: pages/publications)")
    parser.add_argument("--overwrite", action="store_true",
                        help="Overwrite existing files (default: skip)")
    parser.add_argument("--verbose", "-v", action="store_true",
                        help="Print per-file status")
    args = parser.parse_args()

    bib_path = Path(args.bib)
    out_dir = Path(args.out)

    if not bib_path.exists():
        print(f"ERROR: BibTeX file not found: {bib_path}", file=sys.stderr)
        sys.exit(1)

    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"Reading {bib_path} ...")
    entries = parse_bib(bib_path)
    print(f"Found {len(entries)} entries.")

    created = 0
    skipped = 0
    errors = 0

    for entry in entries:
        try:
            slug = make_slug(entry)
            out_file = out_dir / f"{slug}.md"

            if out_file.exists() and not args.overwrite:
                if args.verbose:
                    print(f"  SKIP  {out_file.name}")
                skipped += 1
                continue

            md = entry_to_markdown(entry, slug)
            out_file.write_text(md, encoding="utf-8")

            if args.verbose:
                print(f"  WRITE {out_file.name}")
            created += 1

        except Exception as e:
            print(f"  ERROR {entry.get('_key', '?')}: {e}", file=sys.stderr)
            errors += 1

    print(f"\nDone. Created: {created}  Skipped: {skipped}  Errors: {errors}")
    if created > 0:
        print(f"Output directory: {out_dir.resolve()}")


if __name__ == "__main__":
    main()
