---
aside: false
---

<script setup>
import { ref, onMounted, computed } from 'vue'

const SORT_OPTIONS = {
  sort: ["year", "author", "title", "conference"],
  ascending: false  // boolean for ascending/descending order, true = ascending
}

const publications = ref([])

const sorting = ref({
  sort: "author",
  ascending: false
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
    const order = sorting.value.ascending ? 1 : -1

    if (sortKey === "year") {
      if (a.year !== b.year) {
        return (b.year - a.year) * order
      }
      return sortByAuthor(a, b, 1)
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

function handleSortToggle(v) {
  // console.log(sorting.value.sort, v)
  // if (sorting.value.sort == v) {
  //   sorting.value.ascending = !sorting.value.ascending
  // }
  // else {
  //   sorting.value.ascending = false
  // }
}

function handleSortOptionChange(v, e) {
  console.log(v,e)
}

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
  max-width: 150px;
  height: auto; /* Maintain aspect ratio */
  margin-right: 20px;
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
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>

<v-row
  justify="space-between"
  class="mb-4"
>

# Publications

  <v-btn-toggle
    :value="sorting.sort"
    @change="handleSortOptionChange(sorting, $event)"
    mandatory
    group
  >
    <v-btn value="year" @click="() => handleSortToggle('year')">
      Year
      <v-icon v-if="sorting.sort === 'year'" class="opacity-60">
        {{ (sorting.ascending) ? "mdi-arrow-up" : "mdi-arrow-down" }}
      </v-icon>
    </v-btn>
    <v-btn value="author" @click="() => handleSortToggle('author')">
      Author
      <v-icon v-if="sorting.sort === 'author'" class="opacity-60">
        {{ (sorting.ascending) ? "mdi-arrow-up" : "mdi-arrow-down" }}
      </v-icon>
    </v-btn>
    <v-btn value="title" @click="() => handleSortToggle('title')">
      Title
      <v-icon v-if="sorting.sort === 'title'" class="opacity-60">
        {{ (sorting.ascending) ? "mdi-arrow-up" : "mdi-arrow-down" }}
      </v-icon>
    </v-btn>
  </v-btn-toggle>
</v-row>

<div class="container">
  <div v-for="publication in sortedPublications" :key="publication.title" class="publication">
    <img v-if="publication.image" :src="`../assets/images/publications/${publication.image.src}`" :alt="publication.image.alt">
    <div class="publication-info">
      <p>{{ publication.authors }}</p>
      <a :href="publication.link" target="_blank">{{ publication.title }}</a>
      <p>{{ publication.conference }} ({{ publication.year }})</p>
    </div>
  </div>
</div>