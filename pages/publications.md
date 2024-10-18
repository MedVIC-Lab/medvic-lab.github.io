---
aside: false
---

<script setup>
import { ref, onMounted } from 'vue'

const publications = ref([])

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
  <div v-for="publication in publications" :key="publication.title" class="publication">
    <div class="publication-info">
      <a :href="publication.link" target="_blank">{{ publication.title }}</a>
      <p>{{ publication.authors }}</p>
      <p>{{ publication.conference }} ({{ publication.year }})</p>
    </div>
    <img v-if="publication.image" :src="`../assets/images/publications/${publication.image.src}`" :alt="publication.image.alt">
  </div>
</div>
