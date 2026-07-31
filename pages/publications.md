---
aside: false
---

<script setup>
import { computed, onMounted, ref } from 'vue'

const publications = ref([])
const search = ref('')
const selectedTag = ref('')
const sectionOrder = ref('newest')
const sectionSort = ref({})

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
})

const featuredPublications = computed(() =>
  filteredPublications.value.filter((publication) => publication.featured === true)
)

const publicationSections = computed(() => {
  const grouped = new Map()

  filteredPublications.value.forEach((publication) => {
    const year = String(publication.year || 'Undated')
    if (!grouped.has(year)) grouped.set(year, [])
    grouped.get(year).push(publication)
  })

  return Array.from(grouped, ([year, items]) => ({ year, items }))
    .sort((a, b) => {
      const yearA = Number(a.year) || 0
      const yearB = Number(b.year) || 0
      return sectionOrder.value === 'oldest' ? yearA - yearB : yearB - yearA
    })
})

function firstAuthor(publication) {
  return String(publication.authors || '').split(',')[0].trim()
}

function sortedSectionPublications(section) {
  const mode = sectionSort.value[section.year] || 'title'

  return [...section.items].sort((a, b) => {
    if (mode === 'author') return firstAuthor(a).localeCompare(firstAuthor(b))
    if (mode === 'venue') return String(a.conference || '').localeCompare(String(b.conference || ''))
    return String(a.title || '').localeCompare(String(b.title || ''))
  })
}

function updateSectionSort(year, event) {
  sectionSort.value = { ...sectionSort.value, [year]: event.target.value }
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
      <span>Year sections</span>
      <select v-model="sectionOrder">
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </label>
  </div>

  <div class="medvic-publication-compact-meta">
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
  </div>
</section>

<details v-if="featuredPublications.length" class="medvic-publication-group medvic-publication-group-featured" open>
  <summary class="medvic-publication-group-summary">
    <span class="medvic-publication-group-title">Highlighted Publications</span>
    <span class="medvic-publication-group-count">{{ featuredPublications.length }} papers</span>
  </summary>
  <div class="medvic-publication-group-content">
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
        :class="{ 'medvic-pub-card-img-generated': publication.generated }"
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
  </div>
</details>

<section class="medvic-publication-groups" aria-label="Publications by year">
  <details
    v-for="(section, index) in publicationSections"
    :key="section.year"
    class="medvic-publication-group"
    :open="index === 0"
  >
    <summary class="medvic-publication-group-summary">
      <span class="medvic-publication-group-title">{{ section.year }}</span>
      <span class="medvic-publication-group-count">{{ section.items.length }} papers</span>
    </summary>
    <div class="medvic-publication-group-content">
      <div class="medvic-publication-section-sort">
        <label>
          <span>Sort within {{ section.year }}</span>
          <select
            :value="sectionSort[section.year] || 'title'"
            @change="updateSectionSort(section.year, $event)"
          >
            <option value="title">Title</option>
            <option value="author">First author</option>
            <option value="venue">Venue</option>
          </select>
        </label>
      </div>
      <div class="medvic-pub-grid">
        <a
          v-for="publication in sortedSectionPublications(section)"
          :key="publication.link"
          :href="publication.link"
          class="medvic-pub-card"
        >
          <img
            v-if="publicationImage(publication)"
            :src="publicationImage(publication)"
            :alt="publication.title"
            class="medvic-pub-card-img"
            :class="{ 'medvic-pub-card-img-generated': publication.generated }"
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
    </div>
  </details>
</section>
