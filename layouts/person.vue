<template>
  <v-container class="person-layout vp-doc">
    <v-row>
      <v-col cols="12" md="4" class="text-center">
        <v-avatar size="200">
          <v-img :src="`../../assets/images/people/${frontmatter.avatar}`" :alt="frontmatter.name" />
        </v-avatar>
        <h1 class="person-name">{{ frontmatter.name }}</h1>
        <h3 class="person-title">{{ frontmatter.title }}</h3>
        <p class="person-org">{{ frontmatter.org }}</p>
        <div class="person-links">
          <v-btn v-for="link in frontmatter.links" :key="link.link" :href="link.link" target="_blank" rel="noopener" icon>
            <v-icon>{{ getIcon(link.icon) }}</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <Content />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { Content, useData } from 'vitepress';
import { ref } from 'vue';

const { frontmatter } = useData();

function getIcon(icon) {
  if (typeof icon == 'object' && icon !== null) {
    return 'mdi-web';
  }

  switch (icon) {
    case 'github':
      return 'mdi-github';
    case 'linkedin':
      return 'mdi-linkedin';
    case 'twitter':
      return 'mdi-twitter';
    case 'website':
      return 'mdi-web';
    default:
      return 'mdi-link';
  }
}
</script>

<style scoped>
.person-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.person-name {
  font-size: 2em;
  margin-top: 10px;
}

.person-role {
  font-size: 1.5em;
  color: #757575;
}

.person-title {
  font-size: 1.2em;
  color: #757575;
}

.person-org {
  font-size: 1em;
  color: #757575;
}

.person-links {
  margin-top: 10px;
}

.v-avatar {
  margin: 0 auto;
}

.v-btn {
  margin: 0 5px;
}
</style>