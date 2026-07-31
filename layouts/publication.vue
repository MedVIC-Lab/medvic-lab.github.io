<template>
  <article class="publication-layout vp-doc">
    <a href="/pages/publications" class="publication-back-link">Back to Publications</a>

    <header class="publication-hero">
      <div>
        <h1>{{ frontmatter.title }}</h1>
        <p class="publication-authors">{{ frontmatter.authors }}</p>
        <p class="publication-meta">
          <span>{{ venue }}</span>
          <span v-if="frontmatter.year">{{ frontmatter.year }}</span>
          <span v-if="frontmatter.acceptance_rate">Acceptance rate: {{ frontmatter.acceptance_rate }}</span>
        </p>
        <div v-if="frontmatter.award" class="publication-award">
          {{ frontmatter.award }}
        </div>
      </div>
    </header>

    <nav v-if="resourceLinks.length" class="publication-resource-row" aria-label="Publication resources">
      <a
        v-for="link in resourceLinks"
        :key="link.href"
        :href="link.href"
        target="_blank"
        rel="noopener"
        class="publication-resource-button"
      >
        <v-icon size="18" :icon="link.icon" />
        {{ link.label }}
      </a>
      <button
        v-if="hasCitation"
        type="button"
        class="publication-resource-button"
        @click="copyCitation"
      >
        <v-icon size="18" icon="mdi-content-copy" />
        {{ copied ? 'Copied' : 'Copy BibTeX' }}
      </button>
    </nav>

    <div class="publication-main-grid">
      <main class="publication-body">
        <img
          v-if="frontmatter.image?.src"
          :src="`../../assets/images/publications/${frontmatter.image.src}`"
          :alt="frontmatter.image?.alt || frontmatter.title"
          class="publication-image"
          :class="{ 'publication-image-generated': frontmatter.image?.generated }"
        />
        <div v-else class="publication-image-placeholder">
          Graphical abstract image slot
        </div>

        <Content />
      </main>

      <aside class="publication-sidebar">
        <section v-if="frontmatter.authors" class="publication-sidebar-section">
          <h2>Authors</h2>
          <ul class="publication-author-list">
            <li v-for="author in authorNames" :key="author">
              <a v-if="getMemberByName(author)" :href="getMemberByName(author).link">
                {{ author }}
              </a>
              <span v-else>{{ author }}</span>
            </li>
          </ul>
        </section>

        <section v-if="frontmatter.tags && frontmatter.tags.length" class="publication-sidebar-section">
          <h2>Tags</h2>
          <div class="publication-tag-list">
            <a
              v-for="tag in frontmatter.tags"
              :key="tag"
              :href="`/pages/publications?tag=${encodeURIComponent(tag)}`"
              class="medvic-pub-tag"
            >
              {{ tag }}
            </a>
          </div>
        </section>
      </aside>
    </div>
  </article>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useData } from 'vitepress';
import { Content } from 'vitepress/dist/client/app/components/Content.js';
import { getMembers, getMemberByName } from '../scripts/utils';

const { frontmatter } = useData();
const copied = ref(false);

onMounted(async () => {
  await getMembers();
});

const venue = computed(() => frontmatter.value.venue || frontmatter.value.conference || '');

const authorNames = computed(() => String(frontmatter.value.authors || '')
  .split(',')
  .map((author) => author.trim().replace(/\*/g, ''))
  .filter(Boolean)
);

const resourceLinks = computed(() => {
  const links = frontmatter.value.links || {};
  const candidates = [
    { key: 'arxiv', label: 'arXiv', icon: 'mdi-archive' },
    { key: 'archive', label: 'Archive', icon: 'mdi-archive' },
    { key: 'code', label: 'Code', icon: 'mdi-code-braces' },
    { key: 'publisher', label: 'Publisher', icon: 'mdi-earth' },
    { key: 'doi', label: 'DOI', icon: 'mdi-earth' },
    { key: 'pdf', label: 'PDF', icon: 'mdi-file-document-outline' },
    { key: 'video', label: 'Video', icon: 'mdi-video-box' },
  ];

  const seen = new Set();

  return candidates
    .map((item) => ({ ...item, href: links[item.key] }))
    .filter((item) => {
      if (!item.href || seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    });
});

const hasCitation = computed(() => true);

async function copyCitation() {
  const citation = document.querySelector('.publication-body pre code')?.textContent || '';
  if (!citation) return;

  await navigator.clipboard.writeText(citation);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 1600);
}
</script>

<style scoped>
.publication-layout {
  margin: 0 auto;
  max-width: 1200px;
  padding: 24px;
}

.publication-back-link {
  color: var(--medvic-teal, #0d6e7e);
  display: inline-flex;
  font-family: Inter, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  text-decoration: none;
}

.publication-hero {
  border-bottom: 1px solid var(--medvic-border, #d4dde8);
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
}

.publication-hero h1 {
  color: var(--medvic-navy, #1b3a6b) !important;
  font-family: Inter, sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  letter-spacing: 0;
  line-height: 1.05;
  margin: 0 0 0.75rem;
}

.publication-authors {
  color: var(--medvic-text, #1c2b3a);
  font-size: 1.05rem;
  line-height: 1.55;
  margin: 0 0 0.45rem;
}

.publication-meta {
  color: var(--medvic-muted, #5a6e82);
  display: flex;
  flex-wrap: wrap;
  font-family: Inter, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  gap: 0.75rem;
  margin: 0;
}

.publication-award {
  background: #fdf2d0;
  border: 1px solid #e5bd51;
  border-radius: 6px;
  color: #7a5300;
  display: inline-flex;
  font-family: Inter, sans-serif;
  font-size: 0.86rem;
  font-weight: 800;
  margin-top: 0.8rem;
  padding: 0.35rem 0.6rem;
}

.publication-resource-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1rem 0 1.5rem;
}

.publication-resource-button {
  align-items: center;
  background: var(--medvic-navy, #1b3a6b);
  border: 1px solid var(--medvic-navy, #1b3a6b);
  border-radius: 6px;
  color: #fff !important;
  cursor: pointer;
  display: inline-flex;
  font-family: Inter, sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  gap: 0.35rem;
  min-height: 38px;
  padding: 0.45rem 0.8rem;
  text-decoration: none;
}

.publication-resource-button:hover {
  background: var(--medvic-teal, #0d6e7e);
  border-color: var(--medvic-teal, #0d6e7e);
}

.publication-main-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr) 280px;
}

.publication-image {
  border: 1px solid var(--medvic-border, #d4dde8);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  max-width: 100%;
}

.publication-image-generated {
  filter: blur(1.25px) brightness(1.04) contrast(0.9);
  opacity: 0.88;
}

.publication-image-placeholder {
  align-items: center;
  aspect-ratio: 16 / 9;
  background: var(--medvic-light-bg, #f4f7fb);
  border: 1px dashed var(--medvic-border, #d4dde8);
  border-radius: 8px;
  color: var(--medvic-muted, #5a6e82);
  display: flex;
  font-family: Inter, sans-serif;
  font-weight: 800;
  justify-content: center;
  margin-bottom: 1.5rem;
  text-align: center;
}

.publication-sidebar {
  display: grid;
  gap: 1.25rem;
  height: fit-content;
}

.publication-sidebar-section {
  border: 1px solid var(--medvic-border, #d4dde8);
  border-radius: 8px;
  padding: 1rem;
}

.publication-sidebar-section h2 {
  border: 0 !important;
  color: var(--medvic-navy, #1b3a6b) !important;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  margin: 0 0 0.75rem;
  padding: 0;
  text-transform: uppercase;
}

.publication-author-list {
  display: grid;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.publication-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

@media (max-width: 900px) {
  .publication-main-grid {
    grid-template-columns: 1fr;
  }
}
</style>
