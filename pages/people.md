---
layout: page
aside: false
pageTitle: "Our Team"
pageDescription: "This is our team!"
---

<script setup>
  // TODO: consider replacing the team member elements with custom components
import { VPTeamMembers, VPTeamPage, VPTeamPageTitle, VPTeamPageSection } from 'vitepress/theme'
import { ref, onMounted } from 'vue'

const members = ref({
  researchers: [],
  phdStudents: [],
  msStudents: [],
  staff: [],
  alumni: []
})

onMounted(async () => {
  const response = await fetch('/assets/members.json')
  const data = await response.json()

  console.log(data)

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
      <VPTeamMembers :members="members.researchers" size="small" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.phdStudents.length">
    <template #title>PhD Students</template>
    <template #members>
      <VPTeamMembers :members="members.phdStudents" size="small" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.msStudents.length">
    <template #title>MS Students</template>
    <template #members>
      <VPTeamMembers :members="members.msStudents" size="small" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.staff.length">
    <template #title>Staff</template>
    <template #members>
      <VPTeamMembers :members="members.staff" size="small" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection v-if="members.alumni.length">
    <template #title>Alumni</template>
    <template #members>
      <VPTeamMembers :members="members.alumni" size="small" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>