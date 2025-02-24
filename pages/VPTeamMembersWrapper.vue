<template>
  <div class="members-grid">
    <div v-for="member in members" :key="member.id" class="item" @click="handleClick(member)">
      <article class="VPTeamMembersItem small">
        <div class="profile">
          <figure class="avatar">
            <img class="avatar-img" :src="member.avatar" :alt="member.name" />
          </figure>
          <div class="data">
            <h1 class="name">{{ member.name }}</h1>
            <p class="affiliation">
              <span class="title">{{ member.title }}</span>
            </p>
            <div class="links">
              <div class="VPSocialLinks">
                <a v-for="link in member.links" :key="link.href" class="VPSocialLink no-icon" :href="link.href" :aria-label="link.label" target="_blank" rel="noopener">
                  <span :class="getSocialLinkClass(link.icon)"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { VPTeamMembers } from 'vitepress/theme'

export default {
  components: {
    VPTeamMembers
  },
  props: {
    members: Array,
    size: String
  },
  methods: {
    handleClick(member) {
      console.log('Member clicked:', member)
      this.$emit('member-clicked', member)
    },
    getSocialLinkClass(icon) {
      if (typeof icon === 'object' && icon !== null) {
        console.log('website')
        return 'vpi-social-website'
      }
      return `vpi-social-${icon}`
    }
  },
  mounted() {
    console.log(this.members)
    this.$nextTick(() => {
      const memberElements = this.$el.querySelectorAll('.vp-team-member')
      memberElements.forEach((el, index) => {
        el.addEventListener('click', () => this.handleClick(this.members[index]))
      })
    })
  }
}
</script>

<style scoped>
.members-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  margin: 0 auto;
  max-width: 800px;
}

.item {
  margin-bottom: 20px;
}

.profile {
  display: flex;
  flex-direction: row;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 20px;
}

.profile:hover {
  background: #f1f1f1;
  cursor: pointer;
}

.avatar {
  margin-right: 20px;
}

.avatar-img {
  max-width: 80px;
  border-radius: 50px;
  height: auto;
  object-fit: contain;
}

.data {
  flex: 1;
}

.name {
  font-size: 1.5em;
  margin: 0;
}

.affiliation {
  margin: 0;
}

.links {
  margin-top: 10px;
}

.VPSocialLinks {
  display: flex;
  gap: 10px;
}

.VPSocialLink span {
  display: inline-block;
  text-decoration: none;
  height: 16px;
  width: 16px;
}

.vpi-social-github::before {
  content: "\f09b"; /* FontAwesome GitHub icon */
}

.vpi-social-twitter::before {
  content: "\f099"; /* FontAwesome Twitter icon */
}

.vpi-social-linkedin::before {
  content: "\f0e1"; /* FontAwesome LinkedIn icon */
}

.vpi-social-website::before {
  content: "\f0ac"; /* FontAwesome Website icon */
}

.vpi-social-website {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M2 12h20M12 2a15 15 0 0 0 0 20a15 15 0 0 0 0-20'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/g%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
</style>