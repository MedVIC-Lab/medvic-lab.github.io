---
aside: false
---

<script setup>
import { computed, onMounted, ref } from 'vue'

const publications = ref([])
const search = ref('')
const selectedTag = ref('')
const sortBy = ref('year')

onMounted(async () => {
  const response = await fetch('/assets/publications.json')
  publications.value = await response.json()

  const params = new URLSearchParams(window.location.search)
  selectedTag.value = params.get('tag') || ''
})

const tags = computed(() => {
  const values = new Set()
  publications.value.forEach((publication) => {
    ;(publication.tags || []).forEach((tag) => values.add(tag))
  })
  return Array.from(values).sort()
})

const featuredPublications = computed(() =>
  publications.value.filter((publication) => publication.featured === true)
)

const filteredPublications = computed(() => {
  const query = search.value.trim().toLowerCase()

  return publications.value
    .filter((publication) => {
      const searchable = [
        publication.title,
        publication.authors,
        publication.conference,
        publication.year,
        ...(publication.tags || []),
      ].join(' ').toLowerCase()

      return !query || searchable.includes(query)
    })
    .filter((publication) => {
      return !selectedTag.value || (publication.tags || []).includes(selectedTag.value)
    })
    .sort((a, b) => {
      if (sortBy.value === 'title') return String(a.title).localeCompare(String(b.title))
      if (sortBy.value === 'author') return firstAuthor(a).localeCompare(firstAuthor(b))
      return Number(b.year || 0) - Number(a.year || 0)
    })
})

function firstAuthor(publication) {
  return String(publication.authors || '').split(',')[0].trim()
}

function setTag(tag) {
  selectedTag.value = selectedTag.value === tag ? '' : tag

  const url = new URL(window.location.href)
  if (selectedTag.value) {
    url.searchParams.set('tag', selectedTag.value)
  } else {
    url.searchParams.delete('tag')
  }
  window.history.replaceState({}, '', url)
}

function publicationImage(publication) {
  return publication.image ? `/assets/images/publications/${publication.image}` : ''
}
</script>

# Publications

<div class="medvic-stats-bar">
  <div class="medvic-stat-item">
    <span class="medvic-stat-value">138+</span>
    <span class="medvic-stat-label">Peer-reviewed publications</span>
  </div>
  <div class="medvic-stat-item">
    <span class="medvic-stat-value">{{ publications.length }}</span>
    <span class="medvic-stat-label">Unique records listed</span>
  </div>
  <div class="medvic-stat-item">
    <span class="medvic-stat-value">2,510+</span>
    <span class="medvic-stat-label">Google Scholar citations</span>
  </div>
  <div class="medvic-stat-item">
    <span class="medvic-stat-value">h-21</span>
    <span class="medvic-stat-label">h-index</span>
  </div>
  <div style="flex:0 0 auto;">
    <a href="https://scholar.google.com/citations?user=SElhabian" target="_blank"
       style="display:inline-block;padding:0.5rem 1rem;background:var(--medvic-navy);color:#fff;border-radius:6px;font-weight:600;font-size:0.85rem;text-decoration:none;">
      Google Scholar
    </a>
  </div>
</div>

<section class="medvic-publication-section medvic-publication-search-section">
  <div class="medvic-publication-toolbar">
    <label class="medvic-publication-search">
      <span>Search</span>
      <input v-model="search" type="search" placeholder="Title, author, venue, tag" />
    </label>
    <label class="medvic-publication-sort">
      <span>Sort</span>
      <select v-model="sortBy">
        <option value="year">Newest first</option>
        <option value="author">First author</option>
        <option value="title">Title</option>
      </select>
    </label>
  </div>
</section>

<section v-if="featuredPublications.length" class="medvic-publication-section">
  <h2>Highlighted Publications</h2>
  <div class="medvic-pub-grid medvic-featured-grid">
    <a
      v-for="publication in featuredPublications"
      :key="publication.link"
      :href="publication.link"
      class="medvic-pub-card featured"
    >
      <img
        v-if="publicationImage(publication)"
        :src="publicationImage(publication)"
        :alt="publication.title"
        class="medvic-pub-card-img"
      />
      <div v-else class="medvic-pub-card-placeholder">
        {{ publication.conference || publication.year }}
      </div>
      <div class="medvic-pub-card-body">
        <div class="medvic-pub-card-title">{{ publication.title }}</div>
        <div class="medvic-pub-card-authors">{{ publication.authors }}</div>
        <div class="medvic-pub-card-venue">{{ publication.conference }} ({{ publication.year }})</div>
        <div class="medvic-pub-tags">
          <span v-for="tag in publication.tags" :key="tag" class="medvic-pub-tag">{{ tag }}</span>
        </div>
      </div>
    </a>
  </div>
</section>

<section class="medvic-publication-section">
  <div class="medvic-tag-filter" aria-label="Publication tags">
    <button
      v-if="selectedTag"
      class="medvic-tag-filter-button clear"
      type="button"
      @click="setTag('')"
    >
      Clear: {{ selectedTag }}
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      class="medvic-tag-filter-button"
      :class="{ active: selectedTag === tag }"
      type="button"
      @click="setTag(tag)"
    >
      {{ tag }}
    </button>
  </div>

  <div class="medvic-results-count">
    Showing {{ filteredPublications.length }} of {{ publications.length }} publication records.
  </div>

  <div class="medvic-pub-grid">
    <a
      v-for="publication in filteredPublications"
      :key="publication.link"
      :href="publication.link"
      class="medvic-pub-card"
    >
      <img
        v-if="publicationImage(publication)"
        :src="publicationImage(publication)"
        :alt="publication.title"
        class="medvic-pub-card-img"
      />
      <div v-else class="medvic-pub-card-placeholder">
        {{ publication.conference || publication.year }}
      </div>
      <div class="medvic-pub-card-body">
        <div class="medvic-pub-card-title">{{ publication.title }}</div>
        <div class="medvic-pub-card-authors">{{ publication.authors }}</div>
        <div class="medvic-pub-card-venue">{{ publication.conference }} ({{ publication.year }})</div>
        <div class="medvic-pub-tags">
          <span v-for="tag in publication.tags" :key="tag" class="medvic-pub-tag">{{ tag }}</span>
        </div>
      </div>
    </a>
  </div>
</section>
