import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import { Plugin } from 'vite';

type Publication = {
  title: string;
  authors: string;
  conference: string;  // venue name (journal / conference / workshop)
  year: string;
  image: string;
  generated: boolean;
  link: string; // local file link
  featured: boolean;
  tags?: string[];
  links: {
    code?: string;
    publisher?: string;
    video?: string;
    pdf?: string;
    archive?: string;
    doi?: string;
    arxiv?: string;
  };
};

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function compactTags(tags?: string[]): string[] {
  return Array.from(new Set((tags || []).filter(Boolean).map((tag) => tag.toLowerCase()))).sort();
}

function countLinks(pub: Publication): number {
  return Object.values(pub.links || {}).filter(Boolean).length;
}

function scorePublication(pub: Publication): number {
  let score = 0;
  if (pub.featured) score += 20;
  if (pub.image) score += 10;
  score += countLinks(pub) * 2;
  score += (pub.tags || []).length;
  // Prefer generated slugs for canonical routing when richness is otherwise similar.
  if (/\/\d{4}_[a-z0-9]+(?:_[a-z0-9]+){3,}$/.test(pub.link)) score += 1;
  return score;
}

function mergePublications(existing: Publication, incoming: Publication): Publication {
  const preferred = scorePublication(incoming) > scorePublication(existing) ? incoming : existing;
  const fallback = preferred === incoming ? existing : incoming;

  return {
    ...preferred,
    title: preferred.title || fallback.title,
    authors: preferred.authors || fallback.authors,
    conference: preferred.conference || fallback.conference,
    year: preferred.year || fallback.year,
    featured: existing.featured || incoming.featured,
    image: preferred.image || fallback.image,
    generated: existing.generated || incoming.generated,
    tags: compactTags([...(existing.tags || []), ...(incoming.tags || [])]),
    links: {
      code: preferred.links.code || fallback.links.code || '',
      publisher: preferred.links.publisher || fallback.links.publisher || '',
      video: preferred.links.video || fallback.links.video || '',
      pdf: preferred.links.pdf || fallback.links.pdf || '',
      archive: preferred.links.archive || fallback.links.archive || '',
      doi: preferred.links.doi || fallback.links.doi || '',
      arxiv: preferred.links.arxiv || fallback.links.arxiv || '',
    },
  };
}

const generatePublicationsPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-generate-publications',
    buildStart() {
      const publicationsDir = path.join(__dirname, '../pages/publications');
      const outputFilePath = path.join(__dirname, '../public/assets/publications.json');

      const publicationsByTitle = new Map<string, Publication>();
      let rawCount = 0;

      const files = fs.readdirSync(publicationsDir).filter(f => f.endsWith('.md'));

      files.forEach(file => {
        try {
          const filePath = path.join(publicationsDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const data = fm(fileContent) as any;
          const attrs = data.attributes as any;

          function convertArrToLower(arr: string[]) {
            if (!arr || !Array.isArray(arr)) return [];
            return arr.map((item) => item.toLowerCase());
          }

          // Support both old `conference` field and new `venue` field
          const venueName = attrs.venue || attrs.conference || '';

          // Support both old links schema and new schema
          const rawLinks = attrs.links || {};
          const links = {
            code: rawLinks.code || '',
            publisher: rawLinks.publisher || rawLinks.doi || '',
            video: rawLinks.video || '',
            pdf: rawLinks.pdf || '',
            archive: rawLinks.archive || rawLinks.arxiv || '',
            doi: rawLinks.doi || rawLinks.publisher || '',
            arxiv: rawLinks.arxiv || rawLinks.archive || '',
          };

          rawCount += 1;

          const publication = {
            title: attrs.title || '',
            authors: attrs.authors || '',
            conference: venueName,
            year: attrs.year || '',
            link: `/pages/publications/${file.replace('.md', '')}`,
            featured: attrs.featured === true,
            links,
            image: attrs.image?.src || attrs.image || '',
            generated: attrs.image?.generated === true,
            tags: convertArrToLower(attrs.tags) || []
          };

          const key = normalizeTitle(publication.title || file);
          const existing = publicationsByTitle.get(key);
          publicationsByTitle.set(
            key,
            existing ? mergePublications(existing, publication) : publication
          );
        } catch (err) {
          console.warn(`[generatePublications] Skipping ${file}:`, err);
        }
      });

      const publications = Array.from(publicationsByTitle.values());

      // Sort by year descending, then by title
      publications.sort((a, b) => {
        const yearDiff = parseInt(b.year || '0') - parseInt(a.year || '0');
        if (yearDiff !== 0) return yearDiff;
        return a.title.localeCompare(b.title);
      });

      fs.writeFileSync(outputFilePath, JSON.stringify(publications, null, 2));
      console.log(`[generatePublications] Generated ${publications.length} unique publications from ${rawCount} files.`);
    }
  };
};

export default generatePublicationsPlugin;
