---
aside: true
outline: deep
---

<script setup>
import VPTeamMembersWrapper from './VPTeamMembersWrapper.vue'
import { onMounted } from 'vue'
import { getMembers } from '../scripts/utils.ts'
import { members } from '../scripts/store.ts'

onMounted(async () => {
  await getMembers();
})
</script>

# Our Team

Current members and alumni of the Medical Vision and Intelligent Computing Lab.

## Professors

<VPTeamMembersWrapper :members="members.researchers" />

## PhD Candidates/Students

<VPTeamMembersWrapper :members="members.phdStudents" />

## MS Students

<VPTeamMembersWrapper :members="members.msStudents" />

## Undergrad Students

<VPTeamMembersWrapper :members="members.undergradStudents" />

## Staff

<VPTeamMembersWrapper :members="members.staff" />

## Alumni

<VPTeamMembersWrapper :members="members.alumni" />
