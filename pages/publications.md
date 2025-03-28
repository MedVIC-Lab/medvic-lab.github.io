---
aside: false
---

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const SORT_OPTIONS = {
  sort: ["year", "author", "title", "conference"],
  ascending: false  // boolean for ascending/descending order, true = ascending
}

const publications = ref([]);

const sorting = ref({
  sort: "author",
  ascending: false
})

const previousSort = ref("author")

const search = ref("")
const searchOpen = ref(false)

const selectedTags = ref(new Set([]));
const tagsOpen = ref(false);

// helper
function sortByAuthor(a, b, order) {
  const aFirstAuthor = a.authors.split(',')[0]
  const bFirstAuthor = b.authors.split(',')[0]
  const aLastName = aFirstAuthor.split(' ').pop()
  const bLastName = bFirstAuthor.split(' ').pop()
  return aLastName.localeCompare(bLastName) * order;
}

const tags = computed(() => {
  const t = new Set([]);
  // get every unique tag from publications.value
  publications.value.forEach((p) => {
    if (p.tags) {
      // for every tag within the publication, add it to the Set object
      p.tags.forEach((tag) => t.add(tag));
    }
  });

  return t;
});

const sortedPublications = computed(() => {
  // filter search string first
  let filteredPubs = [...publications.value]
  if (search.value !== "") {
    filteredPubs = filteredPubs.filter((p) => p.title.toLowerCase().includes(search.value.toLowerCase()))
  }

  // filter by tags
  if (selectedTags.value.length > 0) {
    filteredPubs = filteredPubs.filter((p) => {
      if (!p.tags) return false
      return [...selectedTags.value].every(tag => p.tags.includes(tag))
    });
  }

  return filteredPubs.sort((a, b) => {
    const sortKey = sorting.value.sort
    const order = sorting.value.ascending ? -1 : 1

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
  if (previousSort.value === v) {
    sorting.value.ascending = !sorting.value.ascending
  } else {
    previousSort.value = v
    sorting.value.ascending = false
  }
}

function handleTagSelect(tag) {
  if (selectedTags.value.has(tag)) {
    selectedTags.value.delete(tag);
  } else {
    selectedTags.value.add(tag);
  }
}

function openSearchBar() {
  searchOpen.value = true;
}

function openTagsMenu() {
  tagsOpen.value = true;
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
  text-decoration: none !important;
  border-radius: 10px;
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

.v-icon-placeholder {
  width: 16px; /* Width of the icon */
  height: 16px; /* Height of the icon */
  display: inline-block;
}

.tags {
  padding: 5px;
  max-width: 250px;
}

.tag {
  width: fit-content;
}

.v-chip--selected {
  background: var(--vp-c-brand-1);
  color: white;
}

</style>
<span></span>
<v-row
  justify="space-between"
  class="mb-4"
>

# Publications

  <v-btn-toggle
    v-model="sorting.sort"
    mandatory
    group
  >
    <v-btn value="year" @click="() => sorting.sort === 'year' && handleSortToggle('year')">
      Year
      <v-icon v-if="sorting.sort === 'year'" class="opacity-60">
        {{ (sorting.ascending) ? "mdi-arrow-up" : "mdi-arrow-down" }}
      </v-icon>
      <span v-else class="v-icon-placeholder"></span>
    </v-btn>
    <v-btn value="author" @click="handleSortToggle('author')">
      Author
      <v-icon v-if="sorting.sort === 'author'" class="opacity-60">
        {{ (sorting.ascending) ? "mdi-arrow-up" : "mdi-arrow-down" }}
      </v-icon>
      <span v-else class="v-icon-placeholder"></span>
    </v-btn>
    <v-btn value="title" @click="handleSortToggle('title')">
      Title
      <v-icon v-if="sorting.sort === 'title'" class="opacity-60">
        {{ (sorting.ascending) ? "mdi-arrow-up" : "mdi-arrow-down" }}
      </v-icon>
      <span v-else class="v-icon-placeholder"></span>
    </v-btn>
    <v-menu 
      :close-on-content-click="false"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-tag-outline" @click="() => {
          sorting.sort = previousSort  // reset sorting to previous to ignore the click action
          openTagsMenu()
        }">
        </v-btn>
      </template>
      <v-card class="tags">
      <v-chip-group v-model="selectedTags" column multiple>
        <v-chip v-for="tag in tags" :key="tag" class="tag" :value="tag">
          {{tag}}
        </v-chip>
      </v-chip-group>
      </v-card>
    </v-menu>
    <v-menu 
      :close-on-content-click="false"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-magnify" @click="() => {
          sorting.sort = previousSort  // reset sorting to previous to ignore the click action
          openSearchBar()
        }">
        </v-btn>
      </template>
      <v-card min-width="300">
        <v-text-field
          v-model="search"
          hide-details
          label="Search"
        >
        </v-text-field>
      </v-card>
    </v-menu>
  </v-btn-toggle>
</v-row>

<div class="container">
  <a v-for="publication in sortedPublications" :key="publication.title" :href="publication.link" class="publication">
    <img v-if="publication.image" :src="`../assets/images/publications/${publication.image.src}`" :alt="publication.image.alt">
    <div class="publication-info">
      <p>{{ publication.authors }}</p>
      <p>{{ publication.title }}</p>
      <p>{{ publication.conference }} ({{ publication.year }})</p>
    </div>
  </a>
</div>