import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import { Plugin } from 'vite';

type SearchRecord = {
  category: string;
  excerpt: string;
  headings: string[];
  path: string;
  text: string;
  title: string;
};

const SITE_ROOT = path.join(__dirname, '..');
const OUTPUT_FILE_PATH = path.join(SITE_ROOT, 'public/assets/site-search.json');
const VIRTUAL_MODULE_ID = 'virtual:medvic-search-index';
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;

function walkMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return walkMarkdownFiles(entryPath);
    if (entry.isFile() && entry.name.endsWith('.md')) return [entryPath];

    return [];
  });
}

function humanizeSlug(value: string): string {
  return value
    .replace(/^\d{4}[_-]/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function stripContent(content: string): string {
  return content
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|:-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractHeadings(content: string): string[] {
  return Array.from(content.matchAll(/^#{2,3}\s+(.+)$/gm))
    .map((match) => stripContent(match[1]))
    .filter(Boolean)
    .slice(0, 8);
}

function getRoute(filePath: string): string {
  const relativePath = path.relative(SITE_ROOT, filePath).replace(/\\/g, '/');

  if (relativePath === 'index.md') return '/';

  return `/${relativePath.replace(/\.md$/, '')}`;
}

function getCategory(filePath: string): string {
  const relativePath = path.relative(SITE_ROOT, filePath).replace(/\\/g, '/');

  if (relativePath === 'index.md') return 'Pages';
  if (relativePath.startsWith('pages/people/')) return 'People';
  if (relativePath.startsWith('pages/publications/')) return 'Publications';
  if (relativePath.startsWith('pages/news-items/')) return 'News';
  if (relativePath.includes('/projects/')) return 'Projects';

  const fileName = path.basename(filePath, '.md').toLowerCase();

  if (fileName === 'research') return 'Research';
  if (fileName === 'software') return 'Software';
  if (fileName === 'publications') return 'Publications';
  if (fileName === 'people') return 'People';
  if (fileName === 'news') return 'News';
  if (fileName === 'join') return 'Join';
  if (fileName === 'contact') return 'Contact';

  return 'Pages';
}

function getTitle(filePath: string, attrs: Record<string, unknown>, body: string): string {
  if (typeof attrs.title === 'string' && attrs.title.trim()) return attrs.title.trim();
  if (typeof attrs.name === 'string' && attrs.name.trim()) return attrs.name.trim();

  const heading = body.match(/^#\s+(.+)$/m)?.[1];
  if (heading) return stripContent(heading);

  return humanizeSlug(path.basename(filePath, '.md'));
}

function createRecord(filePath: string): SearchRecord {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = fm(fileContent) as {
    attributes: Record<string, unknown>;
    body: string;
  };
  const title = getTitle(filePath, data.attributes, data.body);
  const headings = extractHeadings(data.body);
  const plainText = stripContent(data.body);
  const attrText = Object.entries(data.attributes)
    .flatMap(([key, value]) => {
      if (['layout', 'avatar', 'image'].includes(key)) return [];
      if (Array.isArray(value)) return value.join(' ');
      if (typeof value === 'object' && value !== null) return JSON.stringify(value);
      return String(value || '');
    })
    .join(' ');
  const searchText = stripContent(`${title} ${headings.join(' ')} ${attrText} ${plainText}`);

  return {
    category: getCategory(filePath),
    excerpt: plainText.slice(0, 190),
    headings,
    path: getRoute(filePath),
    text: searchText,
    title,
  };
}

function generateRecords(): SearchRecord[] {
  const files = [
    path.join(SITE_ROOT, 'index.md'),
    ...walkMarkdownFiles(path.join(SITE_ROOT, 'pages')),
  ].filter((filePath) => fs.existsSync(filePath));

  const records = files
    .map(createRecord)
    .filter((record) => record.title && record.path)
    .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));

  fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(records, null, 2));
  console.log(`[generateSearchIndex] Generated ${records.length} searchable pages.`);

  return records;
}

const generateSearchIndexPlugin = (): Plugin => {
  let cachedRecords: SearchRecord[] | null = null;

  return {
    name: 'generate-site-search-index',
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID;
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        cachedRecords = cachedRecords ?? generateRecords();
        return `export default ${JSON.stringify(cachedRecords)};`;
      }
    },
    buildStart() {
      cachedRecords = generateRecords();
    },
    handleHotUpdate(context) {
      if (!context.file.endsWith('.md')) return;

      cachedRecords = generateRecords();

      const searchModule = context.server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
      if (searchModule) context.server.moduleGraph.invalidateModule(searchModule);
    },
  };
};

export default generateSearchIndexPlugin;
