---
aside: false
---

<script setup>
import { ref, onMounted } from 'vue'

const publications = ref([])

onMounted(async () => {
  const response = await fetch('/assets/publications.json')
  const pubs = await response.json()

  // TODO: update with better sorting when functionality added to UI
  // sort by year, then by first author (alphabetical)
  publications.value = pubs.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year; // Sort by year in descending order
    }
    // Sort by first author alphabetically (last name)
    const aFirstAuthor = a.authors.split(',')[0]
    const bFirstAuthor = b.authors.split(',')[0]
    const aLastName = aFirstAuthor.split(' ').pop()
    const bLastName = bFirstAuthor.split(' ').pop()

    return aLastName.localeCompare(bLastName);
  })
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
  <div v-for="publication in publications" :key="publication.title" class="publication">
    <div class="publication-info">
      <a :href="publication.link" target="_blank">{{ publication.title }}</a>
      <p>{{ publication.authors }}</p>
      <p>{{ publication.conference }} ({{ publication.year }})</p>
    </div>
    <img v-if="publication.image" :src="`../assets/images/publications/${publication.image.src}`" :alt="publication.image.alt">
  </div>
</div>
