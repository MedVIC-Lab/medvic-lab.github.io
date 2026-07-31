# MedVIC Lab Website

The website for the Medical Vision and Intelligent Computing Lab at the University of Utah. It is built with VitePress 1.4, Vue 3, TypeScript, and Markdown, and deploys to GitHub Pages from `main`.

## Local development

```bash
yarn install
yarn dev      # http://127.0.0.1:5173
yarn build    # production validation
yarn preview  # preview the production build
```

The Vite plugins in `scripts/` generate the people, publication, project, and search JSON files during `yarn dev` and `yarn build`. Edit the Markdown source files, not the generated JSON files in `public/assets/`.

## Contribution workflow

Create a branch, make the change, run `yarn build`, then push the branch and open a pull request into `main`.

```bash
git switch -c content/short-description
git add <changed-files>
git commit -m "content: describe the update"
git push -u origin content/short-description
```

## Add or update a person

Create `pages/people/lastname_firstname.md` and place the square headshot in `public/assets/images/people/`.

Supported roles are `Faculty`, `Researcher`, `PhD Student`, `MS Student`, `Undergrad Student`, `Staff`, and `Alumni`.

~~~md
---
layout: person
name: "Full Name"
role: "PhD Student"
title: "PhD Student"
avatar: "lastname_firstname.jpg"
name_in_pubs: "Full Name"
links:
  - icon: "github"
    link: "https://github.com/username"
  - icon: "website"
    link: "https://example.com"
---

# Full Name

Short biography and research interests.
~~~

Use the same full name in `name_in_pubs` and publication author lists so publications can be connected to the correct person.

## Add a publication

Create `pages/publications/YYYY_short_title.md`. Add its graphical abstract to `public/assets/images/publications/` when available. Both `venue` and the older `conference` field are supported.

~~~md
---
layout: publication
title: "Paper Title"
authors: "First Author, Second Author"
venue: "Journal or Conference"
year: "2026"
featured: false
links:
  arxiv: "https://arxiv.org/abs/..."
  code: "https://github.com/..."
  publisher: "https://doi.org/..."
  pdf: "https://example.com/paper.pdf"
image:
  src: "2026_short_title.png"
  alt: "Description of the graphical abstract"
tags: ["shape-modeling", "deep-learning", "journal"]
---

# Paper Title

## Abstract

Paper abstract.

## Citation

```bibtex
@article{...}
```
~~~

Set `featured: true` only for highlighted papers. If an image is intentionally AI-generated, add `generated: true` inside the `image` block so the site applies the consistent visual treatment.

The publications index assigns each paper to a research-area section from its tags and title. Use the most specific applicable tags—such as `cardiac`, `computational-pathology`, `virtual-staining`, `orthopedics`, `craniofacial`, `neuroscience`, `shape-modeling`, `segmentation`, `registration`, `reconstruction`, `clinically-trustworthy`, `probabilistic`, `foundation-models`, or `generative`—to place new work accurately.

For bulk publication imports, update `medvic_publications.bib` and use `scripts/bib_to_md.py`; review generated files before committing.

## Add a project

Create `pages/projects/project_slug.md` and add its image to `public/assets/images/projects/`.

```md
---
layout: project
name: "Project Name"
organizations:
  - name: "University of Utah"
    link: "https://www.utah.edu/"
ongoing: true
grantLink: "https://example.com/grant"
image:
  src: "project.png"
  alt: "Project image description"
---

Project description and goals.
```

## Add a news item

Create a Markdown file in `pages/news-items/` using the date-first naming pattern already present in that folder. Copy a recent item and update its frontmatter and content. The three newest items automatically appear on the homepage.

## Add a page or component

- General pages: `pages/*.md`
- Custom layouts: `layouts/*.vue`
- Theme components and global styles: `.vitepress/theme/`
- Public images and downloadable assets: `public/assets/`

Update `.vitepress/config.mts` when a new top-level page should appear in navigation. See the [VitePress documentation](https://vitepress.dev/) for Markdown, Vue components, and theme APIs.

## Deployment

`.github/workflows/gh-pages.yml` builds and deploys the site whenever `main` changes. Always run `yarn build` locally before pushing.
