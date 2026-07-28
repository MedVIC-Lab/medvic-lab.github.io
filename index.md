---
layout: home

hero:
  name: "MedVIC Lab"
  text: "Medical Vision and Intelligent Computing"
  tagline: "We build structured AI systems that make the geometry, variability, and uncertainty embedded in medical images computationally tractable — and clinically actionable."
  actions:
    - theme: brand
      text: Explore Our Research
      link: /pages/research
    - theme: alt
      text: Our Software
      link: /pages/software
    - theme: alt
      text: Join the Lab
      link: /pages/join
---

<script setup>
import { computed } from 'vue'
import { data as allNewsItems } from './pages/news.data'

const newsItems = computed(() => allNewsItems.slice(0, 3))

function badgeClass(category) {
  return `badge-${String(category || 'news').toLowerCase()}`
}
</script>

<!-- Impact Bar -->
<div class="medvic-impact-bar">
  <div class="medvic-impact-stat">
    <div class="medvic-impact-number">138+</div>
    <div class="medvic-impact-label">Peer-reviewed publications</div>
  </div>
  <div class="medvic-impact-stat">
    <div class="medvic-impact-number">2,510+</div>
    <div class="medvic-impact-label">Google Scholar citations</div>
  </div>
  <div class="medvic-impact-stat">
    <div class="medvic-impact-number">8,000+</div>
    <div class="medvic-impact-label">ShapeWorks downloads</div>
  </div>
  <div class="medvic-impact-stat">
    <div class="medvic-impact-number">100+</div>
    <div class="medvic-impact-label">Institutions using our tools</div>
  </div>
  <div class="medvic-impact-stat">
    <div class="medvic-impact-number">2,900+</div>
    <div class="medvic-impact-label">CranioRate scans processed</div>
  </div>
  <div class="medvic-impact-stat">
    <div class="medvic-impact-number">$52M+</div>
    <div class="medvic-impact-label">Competitive research funding</div>
  </div>
</div>

## Research Themes

<div class="medvic-section-header">
  <p>Three interconnected pillars that define our approach to medical AI</p>
</div>

<div class="medvic-theme-cards">
  <a href="/pages/research#modeling-patient-state" class="medvic-theme-card">
    <h3>Modeling Patient State</h3>
    <p>Geometry-aware representations of anatomy: how it is shaped, how it varies across populations, how it changes over time, and how it manifests disease. Anatomy is not just geometry — it is a structured signal we can model.</p>
    <span class="card-link">ShapeWorks · CranioRate · Point2SSM →</span>
  </a>
  <a href="/pages/research#learning-under-clinical-constraints" class="medvic-theme-card">
    <h3>Learning Under Clinical Constraints</h3>
    <p>AI systems that learn reliably from weak, sparse, heterogeneous, and domain-shifted clinical data without requiring dense expert annotation. Clinical constraints define how we design representations.</p>
    <span class="card-link">Multi-instance learning · Domain adaptation →</span>
  </a>
  <a href="/pages/research#clinically-trustworthy-ai" class="medvic-theme-card">
    <h3>Clinically Trustworthy AI</h3>
    <p>Embedding uncertainty, interpretability, and semantic grounding into AI systems so that clinicians know what models know, what they don't, and why. Trust is not accuracy — it is knowing what the model knows.</p>
    <span class="card-link">VIB · Uncertainty · Interpretability →</span>
  </a>
</div>

## Flagship Software

<div class="medvic-tool-cards">
  <div class="medvic-tool-card">
    <h3>ShapeWorks</h3>
    <p>Open-source platform for automated construction of statistical shape models of anatomical structures. The complete analysis pipeline: preprocessing, correspondence optimization, shape representation, statistical analysis, and visualization.</p>
    <div class="tool-stats">
      <span class="medvic-tool-stat-pill">8,000+ downloads</span>
      <span class="medvic-tool-stat-pill">100+ institutions</span>
      <span class="medvic-tool-stat-pill">163+ citing studies</span>
      <span class="medvic-tool-stat-pill">14 major releases</span>
    </div>
    <div class="medvic-tool-links">
      <a href="https://shapeworks.sci.utah.edu" target="_blank" class="medvic-tool-link primary">Visit shapeworks.sci.utah.edu ↗</a>
      <a href="https://github.com/SCIInstitute/ShapeWorks" target="_blank" class="medvic-tool-link secondary">GitHub</a>
    </div>
  </div>
  <div class="medvic-tool-card">
    <h3>CranioRate</h3>
    <p>AI severity scoring for craniosynostosis. Converts a patient's 3D CT scan into an objective, population-grounded severity score — replacing subjective clinical assessment with reproducible, data-driven measurement.</p>
    <div class="tool-stats">
      <span class="medvic-tool-stat-pill">2,900+ scans processed</span>
      <span class="medvic-tool-stat-pill">7 clinical sites</span>
      <span class="medvic-tool-stat-pill">Privacy by design</span>
    </div>
    <div class="medvic-tool-links">
      <a href="https://craniorate.org" target="_blank" class="medvic-tool-link primary">Visit craniorate.org ↗</a>
      <a href="/pages/software" class="medvic-tool-link secondary">All Software</a>
    </div>
  </div>
</div>

## Latest News

<div v-for="item in newsItems" class="medvic-news-item">
  <div class="medvic-news-date">{{ item.displayDate }}</div>
  <span class="medvic-news-badge" :class="badgeClass(item.category)">{{ item.category }}</span>
  <div class="medvic-news-content">
    <h4><a :href="item.url" style="color:inherit;text-decoration:none;">{{ item.title }}</a></h4>
    <p>{{ item.summary }}</p>
  </div>
</div>

<div style="text-align:center;margin-top:1.5rem;">
  <a href="/pages/news" style="font-weight:700;color:var(--medvic-orange);">All news →</a>
</div>

<div class="medvic-cta-strip">
  <h2>Interested in working with MedVIC?</h2>
  <p>We recruit PhD students through the Kahlert School of Computing and welcome postdoctoral researchers, visiting scholars, and clinical collaborators.</p>
  <a href="/pages/join" class="medvic-cta-btn primary">Join the Lab</a>
  <a href="/pages/contact" class="medvic-cta-btn secondary">Get in Touch</a>
</div>
