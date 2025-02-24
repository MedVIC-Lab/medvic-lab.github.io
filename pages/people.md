---
layout: page
aside: false
pageTitle: "Our Team"
pageDescription: "This is our team!"
---

<script setup>
  // TODO: consider replacing the team member elements with custom components
import { VPTeamPage, VPTeamPageTitle, VPTeamPageSection } from 'vitepress/theme'
import VPTeamMembersWrapper from './VPTeamMembersWrapper.vue'
import { ref, onMounted } from 'vue'

const members = ref({
  researchers: [],
  phdStudents: [],
  msStudents: [],
  undergradStudents: [],
  staff: [],
  alumni: []
})

function handleMemberClick() {
  console.log("TEST")
}

onMounted(async () => {
  const response = await fetch('/assets/members.json')
  const data = await response.json()

  data.forEach(member => {
    switch (member.role.toLowerCase()) {
      case 'researcher':
        members.value.researchers.push(member)
        break
      case 'phd student':
        members.value.phdStudents.push(member)
        break
      case 'ms student':
        members.value.msStudents.push(member)
        break
      case 'staff':
        members.value.staff.push(member)
        break
      case 'alumni':
        members.value.alumni.push(member)
        break
      default:
        break
    }
  })
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
      <VPTeamMembersWrapper :members="members.researchers"  @member-clicked="handleMemberClick"/>
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.phdStudents.length">
    <template #title>PhD Candidates/Students</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.phdStudents" size="small" @member-clicked="handleMemberClick"/>
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.msStudents.length">
    <template #title>MS Students</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.msStudents" size="small" @member-clicked="handleMemberClick" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.undergradStudents.length">
      <template #title>Undergrad Students</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.msStudents" size="small" @member-clicked="handleMemberClick" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.staff.length">
    <template #title>Staff</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.staff" size="small" @member-clicked="handleMemberClick" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.alumni.length">
    <template #title>Alumni</template>
    <template #members>
      <VPTeamMembersWrapper :members="members.alumni" size="small" @member-clicked="handleMemberClick" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>