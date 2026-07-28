<template>
  <section v-if="loaded && authorPublications.length" class="author-publications">
    <h2>Publications</h2>
    <div class="author-publication-list">
      <a
        v-for="pub in authorPublications"
        :key="pub.link"
        :href="pub.link"
        class="author-publication-card"
      >
        <span class="author-publication-year">{{ pub.year }}</span>
        <span class="author-publication-title">{{ pub.title }}</span>
        <span class="author-publication-venue">{{ pub.conference }}</span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  nameInPubs: {
    type: [String, Array],
    default: '',
  },
})

const loaded = ref(false)
const publications = ref([])

const names = computed(() => {
  const value = Array.isArray(props.nameInPubs)
    ? props.nameInPubs
    : [props.nameInPubs]

  return value
    .filter(Boolean)
    .map((name) => String(name).replace(/\*/g, '').trim().toLowerCase())
})

const authorPublications = computed(() => {
  if (!names.value.length) return []

  return publications.value
    .filter((pub) => {
      const authors = String(pub.authors || '').replace(/\*/g, '').toLowerCase()
      return names.value.some((name) => authors.includes(name))
    })
    .sort((a, b) => Number(b.year || 0) - Number(a.year || 0))
})

onMounted(async () => {
  try {
    const response = await fetch('/assets/publications.json')
    publications.value = await response.json()
  } catch (error) {
    console.warn('[AuthorPublications] Could not load publications:', error)
  } finally {
    loaded.value = true
  }
})
</script>

<style scoped>
.author-publications {
  border-top: 1px solid var(--medvic-border, #d4dde8);
  margin-top: 2rem;
  padding-top: 1.5rem;
}

.author-publications h2 {
  margin-top: 0;
}

.author-publication-list {
  display: grid;
  gap: 0.75rem;
}

.author-publication-card {
  border: 1px solid var(--medvic-border, #d4dde8);
  border-left: 4px solid var(--medvic-teal, #0d6e7e);
  border-radius: 8px;
  color: inherit;
  display: grid;
  gap: 0.2rem;
  padding: 0.9rem 1rem;
  text-decoration: none;
}

.author-publication-card:hover {
  background: var(--medvic-light-bg, #f4f7fb);
}

.author-publication-year {
  color: var(--medvic-teal, #0d6e7e);
  font-family: Inter, sans-serif;
  font-size: 0.78rem;
  font-weight: 800;
}

.author-publication-title {
  color: var(--medvic-navy, #1b3a6b);
  font-family: Inter, sans-serif;
  font-weight: 700;
  line-height: 1.35;
}

.author-publication-venue {
  color: var(--medvic-muted, #5a6e82);
  font-size: 0.86rem;
}
</style>
