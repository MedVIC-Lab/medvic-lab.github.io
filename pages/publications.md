---
aside: false
---

<script setup>
import { computed, onMounted, ref } from 'vue'

const publications = ref([])
const search = ref('')
const selectedTags = ref([])
const sectionSort = ref({})

const researchAreas = [
  {
    id: 'pathology',
    title: 'Computational Pathology & Microscopy',
    description: 'Whole-slide imaging, virtual staining, histology, and microscopy.',
    tags: ['computational-pathology', 'virtual-staining'],
    keywords: /patholog|histolog|stain|whole[ -]slide|microscop|h&e|tissue/i,
  },
  {
    id: 'cardiovascular',
    title: 'Cardiovascular Imaging',
    description: 'Cardiac anatomy, function, MRI, and patient-specific heart modeling.',
    tags: ['cardiac'],
    keywords: /cardiac|cardiovascular|heart|atrial|ventric|myocard|aortic|lge[ -]?mri/i,
  },
  {
    id: 'musculoskeletal',
    title: 'Musculoskeletal, Orthopedic & Craniofacial Health',
    description: 'Bones, joints, craniofacial anatomy, and clinical musculoskeletal assessment.',
    tags: ['orthopedics', 'craniofacial', 'craniorate'],
    keywords: /orthop|cranio|femur|hip|knee|bone|skeletal|musculoskelet|shoulder|pelvi|teeth|tooth/i,
  },
  {
    id: 'neuroscience',
    title: 'Neuroimaging & Neuroscience',
    description: 'Brain anatomy, neural structures, and neurological imaging.',
    tags: ['neuroscience'],
    keywords: /neuro|brain|cerebr|cortical|hippocamp|corpus callosum/i,
  },
  {
    id: 'pulmonary',
    title: 'Pulmonary & Thoracic Imaging',
    description: 'Lung anatomy, pulmonary nodules, and thoracic image analysis.',
    tags: [],
    keywords: /pulmonary|lung|thoracic|nodule/i,
  },
  {
    id: 'shape',
    title: 'Anatomy, Shape Modeling & Population Analysis',
    description: 'Statistical shape models, anatomical correspondence, and population-level analysis.',
    tags: ['shape-modeling', 'ssm', 'deepssm', 'shapeworks', 'anatomy'],
    keywords: /shape model|statistical shape|medical shapes|anatomical shape|correspondence points|deepssm|shapeworks|point2ssm|morphoflow/i,
  },
  {
    id: 'image-analysis',
    title: 'Segmentation, Registration & Reconstruction',
    description: 'Core medical-image analysis methods for delineation, alignment, and recovery.',
    tags: ['registration', 'image registration', 'reconstruction', 'segmentation', 'image processing'],
    keywords: /registration|reconstruction|segment|super[ -]?resolution|image processing|snakes initialization/i,
  },
  {
    id: 'trustworthy-ai',
    title: 'Trustworthy, Probabilistic & Data-Efficient AI',
    description: 'Interpretability, uncertainty, domain adaptation, and learning under constraints.',
    tags: ['clinically-trustworthy', 'learning-under-constraints', 'probabilistic', 'domain-adaptation'],
    keywords: /trust|uncertain|probabili|constraint|interpretab|explainab|domain adapt|concept discovery/i,
  },
  {
    id: 'foundation-ai',
    title: 'Foundation, Generative & Deep Learning Methods',
    description: 'Foundation models, generative methods, representation learning, and modern neural architectures.',
    tags: ['foundation-models', 'generative', 'deep-learning', 'deep learning'],
    keywords: /foundation model|vision[ -]language|generative|deep learning|neural network|self[ -]?supervised|representation learning/i,
  },
  {
    id: 'general',
    title: 'General Computer Vision & Biomedical Imaging',
    description: 'Cross-cutting imaging, vision, and biomedical-computing research.',
    tags: [],
    keywords: null,
  },
]

onMounted(async () => {
  const response = await fetch('/assets/publications.json')
  publications.value = await response.json()

  const params = new URLSearchParams(window.location.search)
  selectedTags.value = Array.from(new Set(
    params.getAll('tag').flatMap((value) => value.split(',')).filter(Boolean)
  ))
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
      const publicationTags = publication.tags || []
      return selectedTags.value.every((tag) => publicationTags.includes(tag))
    })
})

const featuredPublications = computed(() =>
  filteredPublications.value.filter((publication) => publication.featured === true)
)

const publicationSections = computed(() => {
  const grouped = new Map(researchAreas.map((area) => [area.id, []]))

  filteredPublications.value.forEach((publication) => {
    const tags = (publication.tags || []).map((tag) => String(tag).toLowerCase())
    const searchable = `${publication.title || ''} ${publication.conference || ''}`
    const area = researchAreas.find((candidate) =>
      candidate.id !== 'general' && (
        candidate.tags.some((tag) => tags.includes(tag)) ||
        candidate.keywords?.test(searchable)
      )
    ) || researchAreas[researchAreas.length - 1]

    grouped.get(area.id).push(publication)
  })

  return researchAreas
    .map((area) => ({ ...area, items: grouped.get(area.id) }))
    .filter((area) => area.items.length)
})

function firstAuthor(publication) {
  return String(publication.authors || '').split(',')[0].trim()
}

function sortedSectionPublications(section) {
  const mode = sectionSort.value[section.id] || 'newest'

  return [...section.items].sort((a, b) => {
    if (mode === 'author') return firstAuthor(a).localeCompare(firstAuthor(b))
    if (mode === 'venue') return String(a.conference || '').localeCompare(String(b.conference || ''))
    if (mode === 'oldest') return Number(a.year || 0) - Number(b.year || 0)
    if (mode === 'newest') return Number(b.year || 0) - Number(a.year || 0)
    return String(a.title || '').localeCompare(String(b.title || ''))
  })
}

function updateSectionSort(sectionId, event) {
  sectionSort.value = { ...sectionSort.value, [sectionId]: event.target.value }
}

function setTag(tag) {
  selectedTags.value = selectedTags.value.includes(tag)
    ? selectedTags.value.filter((selected) => selected !== tag)
    : [...selectedTags.value, tag]

  updateTagParams()
}

function clearTags() {
  selectedTags.value = []
  updateTagParams()
}

function updateTagParams() {
  const url = new URL(window.location.href)
  url.searchParams.delete('tag')
  selectedTags.value.forEach((tag) => url.searchParams.append('tag', tag))
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
  </div>

  <div class="medvic-publication-compact-meta">
    <div class="medvic-tag-filter" aria-label="Publication tags">
      <button
        v-if="selectedTags.length"
        class="medvic-tag-filter-button clear"
        type="button"
        @click="clearTags"
      >
        Clear all ({{ selectedTags.length }})
      </button>
      <button
        v-for="tag in tags"
        :key="tag"
        class="medvic-tag-filter-button"
        :class="{ active: selectedTags.includes(tag) }"
        :aria-pressed="selectedTags.includes(tag)"
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

<section class="medvic-publication-groups" aria-label="Publications by research area">
  <details
    v-for="(section, index) in publicationSections"
    :key="section.id"
    class="medvic-publication-group"
    :open="index === 0"
  >
    <summary class="medvic-publication-group-summary">
      <span class="medvic-publication-group-heading">
        <span class="medvic-publication-group-title">{{ section.title }}</span>
        <span class="medvic-publication-group-description">{{ section.description }}</span>
      </span>
      <span class="medvic-publication-group-count">{{ section.items.length }} papers</span>
    </summary>
    <div class="medvic-publication-group-content">
      <div class="medvic-publication-section-sort">
        <label class="medvic-sort-control">
          <span>Sort</span>
          <select
            :value="sectionSort[section.id] || 'newest'"
            :aria-label="`Sort ${section.title}`"
            @change="updateSectionSort(section.id, $event)"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
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
