<template>
  <div>
    <h1>{{ frontmatter.title }}</h1>
    <p>{{ frontmatter.authors }}</p>
    <p>{{ frontmatter.conference }}</p>
    <p>{{ frontmatter.year }}</p>
  </div>
</template>

<script setup>
  import { useData } from 'vitepress';
  const { frontmatter } = useData();
</script>