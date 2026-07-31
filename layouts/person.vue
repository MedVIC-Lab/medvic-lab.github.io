<template>
  <v-container class="person-layout vp-doc">
    <v-row>
      <v-col cols="12" md="4" class="text-center">
        <v-avatar size="200">
          <v-img
            v-if="frontmatter.avatar"
            :src="`../../assets/images/people/${frontmatter.avatar}`"
            :alt="frontmatter.name"
          />
          <div v-else class="person-avatar-placeholder" aria-hidden="true">
            {{ initials }}
          </div>
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
        <AuthorPublications :name-in-pubs="frontmatter.name_in_pubs || frontmatter.name" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useData } from 'vitepress';
import { Content } from 'vitepress/dist/client/app/components/Content.js';
import { computed } from 'vue';
import AuthorPublications from './AuthorPublications.vue';

const { frontmatter } = useData();

const initials = computed(() => String(frontmatter.value.name || '')
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0])
  .join('')
  .toUpperCase()
);

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

.person-avatar-placeholder {
  align-items: center;
  background: var(--medvic-light-bg, #f4f7fb);
  border: 1px solid var(--medvic-border, #d4dde8);
  border-radius: 100%;
  color: var(--medvic-navy, #1b3a6b);
  display: flex;
  font-family: Inter, sans-serif;
  font-size: 3.25rem;
  font-weight: 800;
  height: 100%;
  justify-content: center;
  letter-spacing: 0;
  width: 100%;
}

.v-btn {
  margin: 0 5px;
}
</style>
