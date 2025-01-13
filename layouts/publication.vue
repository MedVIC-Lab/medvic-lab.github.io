<template>
  <div class="publication-layout vp-doc">
    <div class="publication-content">
      <img v-if="frontmatter.image" :src="`../../assets/images/publications/${frontmatter.image.src}`" :alt="frontmatter.image.alt" class="publication-image" />
      <Content />
    </div>
    <aside class="publication-sidebar">
      <div class="publication-links">
        <h2>Resources</h2>
        <ul>
          <li v-if="frontmatter.links.code"><a :href="frontmatter.links.code" target="_blank"><v-icon size="16" icon="mdi-code-braces"/>Link to Code</a></li>
          <li v-if="frontmatter.links.pdf"><a :href="frontmatter.links.pdf" target="_blank"><v-icon size="16" icon="mdi-file-document-outline"/>Publication (PDF)</a></li>
          <li v-if="frontmatter.links.archive"><a :href="frontmatter.links.archive" target="_blank"><v-icon size="16" icon="mdi-archive"/>Archive</a></li>
          <li v-if="frontmatter.links.video"><a :href="frontmatter.links.video" target="_blank"><v-icon size="16" icon="mdi-video-box"/>Link to Video</a></li>
          <li v-if="frontmatter.links.publisher"><a :href="frontmatter.links.publisher" target="_blank"><v-icon size="16" icon="mdi-earth"/>Link to Publisher</a></li>
        </ul>
      </div>
      <div class="author-list">
        <h2>Authors</h2>
        <ul>
          <li v-if="frontmatter.authors" v-for="author in frontmatter.authors.split(',')" :key="author">
            <span>{{ author.trim() }}</span>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { Content, useData } from 'vitepress';

const { frontmatter } = useData();

function getAuthorsList() {
  console.log(frontmatter.authors)
  return frontmatter.authors
}
</script>

<style>
.publication-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px; /* Adjust to match the default layout container width */
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh; /* Ensure the layout stretches to the full height of the screen */
}

.publication-content {
  flex: 1;
  padding-right: 20px;
}

.publication-sidebar {
  width: 300px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.publication-sidebar h2 {
  border-top: 0 !important;
  padding: 0;
  margin: 0;
}

.publication-image {
  max-width: 100%;
  margin-bottom: 20px;
}

.publication-links ul {
  list-style-type: none;
  padding: 0;
}

.publication-links li {
  margin-bottom: 10px;
}

.author-list {
  margin-top: 20px;
}

.author-list ul {
  list-style-type: none;
  padding: 0;
}
</style>