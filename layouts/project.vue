<template>
  <div class="project-layout vp-doc">
    <div class="project-content">
      <h1>{{ frontmatter.name }}</h1>
      <Content />
    </div>
    <aside class="project-sidebar">
      <img v-if="frontmatter.image" :src="`../../assets/images/projects/${frontmatter.image.src}`" :alt="frontmatter.image.alt" class="project-image" />
      <div class="project-organizations">
        <h2>Organizations</h2>
        <ul>
          <li v-for="org in frontmatter.organizations" :key="org.name">
            <template v-if="org.link">
              <a :href="org.link" target="_blank">{{ org.name }}</a>
            </template>
            <template v-else>
              <span>{{ org.name }}</span>
            </template>
          </li>
        </ul>
      </div>
      <div v-if="frontmatter.grantLink" class="project-grant">
        <h2>Grant Link</h2>
        <a :href="frontmatter.grantLink" target="_blank">{{ frontmatter.grantLink }}</a>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { Content, useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<style>
.project-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px; /* Adjust to match the default layout container width */
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh; /* Ensure the layout stretches to the full height of the screen */
}

.project-content {
  flex: 1;
  padding-right: 20px;
}

.project-sidebar {
  width: 300px;
  padding-left: 20px;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.project-image {
  max-width: 100%;
  margin-bottom: 20px;
}

.project-organizations ul {
  list-style-type: none;
  padding: 0;
}

.project-organizations li {
  margin-bottom: 10px;
}

.project-grant {
  margin-top: 20px;
}
</style>