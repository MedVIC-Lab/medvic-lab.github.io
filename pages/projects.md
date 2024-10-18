---
aside: false
---

<script setup>
import { ref, onMounted } from 'vue'

const projects = ref({
  ongoing: [],
  past: []
})

onMounted(async () => {
  const response = await fetch('/assets/projects.json')
  const data = await response.json()

  data.forEach(project => {
    if (project.ongoing) {
      projects.value.ongoing.push(project)
    } else {
      projects.value.past.push(project)
    }
  })
})
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}

.project-logo {
  max-width: 100px;
  margin-right: 20px;
}

.project-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>

# Projects

## Ongoing Projects

<ul>
  <li v-for="project in projects.ongoing" :key="project.name" class="project-item">
    <img v-if="project.image" :src="`../assets/images/projects/${project.image.src}`" :alt="project.image.alt" class="project-logo">
    <div>
      <a :href="project.link">{{ project.name }}</a>
      <p>
        <span v-for="(org, index) in project.organizations" :key="org.name">
          <template v-if="org.link">
            <a :href="org.link" target="_blank">{{ org.name }}</a>
          </template>
          <template v-else>
            <span>{{ org.name }}</span>
          </template>
          <span v-if="index < project.organizations.length - 1">, </span>
        </span>
      </p>
      <p v-if="project.grantLink"><a :href="project.grantLink" target="_blank">Grant Link</a></p>
    </div>
  </li>
</ul>

## Past Projects

<ul>
  <li v-for="project in projects.past" :key="project.name">
    <a :href="project.link">{{ project.name }}</a>
    <p>
      <span v-for="(org, index) in project.organizations" :key="org.name">
        <template v-if="org.link">
          <a :href="org.link" target="_blank">{{ org.name }}</a>
        </template>
        <template v-else>
          <span>{{ org.name }}</span>
        </template>
        <span v-if="index < project.organizations.length - 1">, </span>
      </span>
    </p>
    <p v-if="project.grantLink"><a :href="project.grantLink" target="_blank">Grant Link</a></p>
  </li>
</ul>