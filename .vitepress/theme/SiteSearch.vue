<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vitepress'
import searchIndex from 'virtual:medvic-search-index'

type SearchRecord = {
  category: string
  excerpt: string
  headings: string[]
  path: string
  text: string
  title: string
}

type SearchResult = SearchRecord & {
  score: number
}

const MAX_VISIBLE_RESULTS = 24
const router = useRouter()
const isOpen = ref(false)
const query = ref('')
const records = ref<SearchRecord[]>([])
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const quickLinks: SearchRecord[] = [
  {
    category: 'Pages',
    excerpt: 'Start at the MedVIC Lab homepage.',
    headings: [],
    path: '/',
    text: 'home medvic lab medical vision intelligent computing',
    title: 'Home',
  },
  {
    category: 'Research',
    excerpt: 'Explore MedVIC research themes and active directions.',
    headings: [],
    path: '/pages/research',
    text: 'research themes modeling patient state clinical constraints trustworthy ai',
    title: 'Research Themes',
  },
  {
    category: 'Publications',
    excerpt: 'Search the lab publication record.',
    headings: [],
    path: '/pages/publications',
    text: 'publications papers selected work highlighted publications search',
    title: 'Publications',
  },
  {
    category: 'People',
    excerpt: 'Browse faculty, students, staff, collaborators, and alumni.',
    headings: [],
    path: '/pages/people',
    text: 'people team faculty students staff alumni',
    title: 'People',
  },
]

const normalizedQuery = computed(() => normalize(query.value))
const visibleResults = computed(() => {
  if (!normalizedQuery.value) return quickLinks.map((record) => ({ ...record, score: 1 }))

  return records.value
    .map((record) => ({ ...record, score: scoreRecord(record, normalizedQuery.value) }))
    .filter((record) => record.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, MAX_VISIBLE_RESULTS)
})

const groupedResults = computed(() => {
  const groups: Array<{ category: string; results: SearchResult[] }> = []

  visibleResults.value.forEach((result) => {
    let group = groups.find((candidate) => candidate.category === result.category)

    if (!group) {
      group = { category: result.category, results: [] }
      groups.push(group)
    }

    group.results.push(result)
  })

  return groups
})

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function scoreRecord(record: SearchRecord, normalized: string) {
  const terms = normalized.split(/\s+/).filter(Boolean)
  const title = normalize(record.title)
  const path = normalize(record.path)
  const headings = normalize(record.headings.join(' '))
  const category = normalize(record.category)
  const text = normalize(record.text)

  let score = 0

  if (title === normalized) score += 120
  if (title.includes(normalized)) score += 70
  if (headings.includes(normalized)) score += 34
  if (path.includes(normalized)) score += 24
  if (category.includes(normalized)) score += 12
  if (text.includes(normalized)) score += 14

  terms.forEach((term) => {
    if (title.startsWith(term)) score += 24
    if (title.includes(term)) score += 18
    if (headings.includes(term)) score += 10
    if (path.includes(term)) score += 8
    if (category.includes(term)) score += 5
    if (text.includes(term)) score += 3
  })

  return score
}

function resultGlobalIndex(target: SearchResult) {
  return visibleResults.value.findIndex((result) => result.path === target.path && result.title === target.title)
}

async function loadIndex() {
  if (records.value.length) return

  records.value = searchIndex as SearchRecord[]
}

async function openSearch() {
  isOpen.value = true
  activeIndex.value = 0
  await loadIndex()
  await nextTick()
  inputRef.value?.focus()
}

function closeSearch() {
  isOpen.value = false
  query.value = ''
  activeIndex.value = 0
}

function goToResult(result: SearchResult) {
  closeSearch()
  router.go(result.path)
}

function goToActiveResult() {
  const result = visibleResults.value[activeIndex.value]

  if (result) goToResult(result)
}

function handleKeydown(event: KeyboardEvent) {
  const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'

  if (isShortcut) {
    event.preventDefault()
    openSearch()
    return
  }

  if (!isOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closeSearch()
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, visibleResults.value.length - 1)
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    goToActiveResult()
  }
}

watch(query, () => {
  activeIndex.value = 0
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="medvic-nav-search">
    <button
      class="medvic-nav-search-button"
      type="button"
      aria-label="Search MedVIC Lab website"
      @click="openSearch"
    >
      <span class="medvic-nav-search-icon" aria-hidden="true"></span>
      <span class="medvic-nav-search-label">Search</span>
      <kbd>⌘K</kbd>
    </button>

    <Teleport to="body">
      <div v-if="isOpen" class="medvic-search-overlay" role="presentation" @click.self="closeSearch">
        <div class="medvic-search-dialog" role="dialog" aria-modal="true" aria-label="Search MedVIC Lab website">
          <div class="medvic-search-input-wrap">
            <span class="medvic-search-icon" aria-hidden="true"></span>
            <input
              ref="inputRef"
              v-model="query"
              class="medvic-search-input"
              type="search"
              placeholder="Search people, publications, research, software..."
              autocomplete="off"
              @keydown.stop="handleKeydown"
            />
            <button class="medvic-search-close" type="button" aria-label="Close search" @click="closeSearch">
              Esc
            </button>
          </div>

          <div class="medvic-search-results" role="listbox" aria-label="Search results">
            <template v-if="groupedResults.length">
              <section v-for="group in groupedResults" :key="group.category" class="medvic-search-group">
                <div class="medvic-search-group-title">{{ group.category }}</div>
                <button
                  v-for="result in group.results"
                  :key="`${result.path}-${result.title}`"
                  class="medvic-search-result"
                  :class="{ active: resultGlobalIndex(result) === activeIndex }"
                  type="button"
                  role="option"
                  @mouseenter="activeIndex = resultGlobalIndex(result)"
                  @click="goToResult(result)"
                >
                  <span class="medvic-search-result-title">{{ result.title }}</span>
                  <span class="medvic-search-result-path">{{ result.path }}</span>
                  <span v-if="result.excerpt" class="medvic-search-result-excerpt">{{ result.excerpt }}</span>
                </button>
              </section>
            </template>

            <div v-else class="medvic-search-empty">
              No matching pages found.
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
