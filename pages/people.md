---
layout: page
aside: false
pageTitle: "Our Team"
pageDescription: "Current members and alumni of the Medical Vision and Intelligent Computing Lab."
---

<script setup>
import VPTeamMembersWrapper from './VPTeamMembersWrapper.vue'
import { computed, onMounted } from 'vue'
import { getMembers } from '../scripts/utils.ts'
import { members } from '../scripts/store.ts'

onMounted(async () => {
  await getMembers();
})

const teamSections = computed(() => [
  { title: 'Professors', people: members.value.researchers },
  { title: 'PhD Candidates/Students', people: members.value.phdStudents },
  { title: 'MS Students', people: members.value.msStudents },
  { title: 'Undergrad Students', people: members.value.undergradStudents },
  { title: 'Staff', people: members.value.staff },
  { title: 'Alumni', people: members.value.alumni },
].filter((section) => section.people.length))
</script>

<div class="medvic-page-heading">
  <h1>{{$frontmatter.pageTitle}}</h1>
  <p>{{$frontmatter.pageDescription}}</p>
</div>

<section
  v-for="section in teamSections"
  :key="section.title"
  class="medvic-people-section"
>
  <h2>{{ section.title }}</h2>
  <VPTeamMembersWrapper :members="section.people" />
</section>
