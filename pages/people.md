---
layout: page
aside: false
pageTitle: "Our Team"
pageDescription: "This is our team!"
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamPageSection } from 'vitepress/theme'
import VPTeamMembersWrapper from './VPTeamMembersWrapper.vue'
import { ref, onMounted } from 'vue'
import { getMembers } from '../scripts/utils.ts'
import { members } from '../scripts/store.ts'

onMounted(async () => {
  await getMembers();
})
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      {{$frontmatter.pageTitle}}
    </template>
    <template #lead>
      {{$frontmatter.pageDescription}}
    </template>
  </VPTeamPageTitle>

  <VPTeamPageSection v-if="members.researchers.length">
    <template #title>Researchers</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.researchers" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.phdStudents.length">
    <template #title>PhD Candidates/Students</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.phdStudents" size="small" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.msStudents.length">
    <template #title>MS Students</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.msStudents" size="small" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.undergradStudents.length">
      <template #title>Undergrad Students</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.msStudents" size="small" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.staff.length">
    <template #title>Staff</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.staff" size="small" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.alumni.length">
    <template #title>Alumni</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.alumni" size="small" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>