<template>
    <div>
      <h1>{{ frontmatter.name }}</h1>
      <p>{{ frontmatter.bio }}</p>
    </div>
</template>
  
<script setup>
    import { useData } from 'vitepress';
    const { frontmatter } = useData();
</script>