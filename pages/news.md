---
aside: false
---

# News

<script setup>
import { data as newsItems } from './news.data'

function badgeClass(category) {
  return `badge-${String(category || 'news').toLowerCase()}`
}
</script>

<div v-for="item in newsItems" :key="item.url" class="medvic-news-item" style="margin-bottom:0.5rem;">
  <div class="medvic-news-date">{{ item.displayDate }}</div>
  <span class="medvic-news-badge" :class="badgeClass(item.category)">{{ item.category }}</span>
  <div class="medvic-news-content">
    <h4><a :href="item.url" style="color:inherit;text-decoration:none;">{{ item.title }}</a></h4>
    <p>{{ item.summary }}</p>
  </div>
</div>
