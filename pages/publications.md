---
aside: false
---

<script setup>
import { ref, onMounted, computed } from 'vue'

const SORT_OPTIONS = {
  sort: ["year", "author", "title", "conference"],
  order: ["ascending", "descending"]
}

const publications = ref([])

const sorting = ref({
  sort: "year",
  order: "descending"
})

// helper
function sortByAuthor(a, b, order) {
  const aFirstAuthor = a.authors.split(',')[0]
  const bFirstAuthor = b.authors.split(',')[0]
  const aLastName = aFirstAuthor.split(' ').pop()
  const bLastName = bFirstAuthor.split(' ').pop()
  return aLastName.localeCompare(bLastName) * order
}

const sortedPublications = computed(() => {
  return [...publications.value].sort((a, b) => {
    const sortKey = sorting.value.sort
    const order = sorting.value.order === "ascending" ? 1 : -1

    if (sortKey === "year") {
      if (a.year !== b.year) {
        return (b.year - a.year)
      }
      return sortByAuthor(a, b, order)
    }

    if (sortKey === "author") {
      return sortByAuthor(a, b, order)
    }

    if (sortKey === "title") {
      return a.title.localeCompare(b.title) * order
    }

    if (sortKey === "conference") {
      return a.conference.localeCompare(b.conference) * order
    }

    return 0
  })
})

onMounted(async () => {
  const response = await fetch('/assets/publications.json')
  publications.value = await response.json()
})
</script>

<style>
.publication {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.publication img {
  max-width: 200px;
  height: auto; /* Maintain aspect ratio */
  margin-left: 20px;
  object-fit: contain; /* Ensure the image fits within the container while maintaining aspect ratio */
}

.publication-info {
  flex: 1;
}

@media (max-width: 768px) {
  .publication {
    flex-direction: column;
  }

  .publication img {
    margin-left: 0;
    margin-bottom: 10px;
  }
}
</style>

# Publications

<div class="container">
  <div v-for="publication in sortedPublications" :key="publication.title" class="publication">
    <div class="publication-info">
      <a :href="publication.link" target="_blank">{{ publication.title }}</a>
      <p>{{ publication.authors }}</p>
      <p>{{ publication.conference }} ({{ publication.year }})</p>
    </div>
    <img v-if="publication.image" :src="`../assets/images/publications/${publication.image.src}`" :alt="publication.image.alt">
  </div>
</div>
