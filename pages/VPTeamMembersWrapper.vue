<template>
  <div class="medvic-member-grid">
    <article
      v-for="member in members"
      :key="member.name"
      class="medvic-member-card"
    >
      <a
        v-if="member.link"
        :href="member.link"
        class="medvic-member-main"
      >
        <img
          v-if="member.avatar"
          :src="member.avatar"
          :alt="member.name"
          class="medvic-member-avatar"
        />
        <div v-else class="medvic-member-avatar-placeholder" aria-hidden="true">
          {{ getInitials(member.name) }}
        </div>
        <h3>{{ member.name }}</h3>
        <p>{{ member.title }}</p>
      </a>

      <div v-else class="medvic-member-main">
        <img
          v-if="member.avatar"
          :src="member.avatar"
          :alt="member.name"
          class="medvic-member-avatar"
        />
        <div v-else class="medvic-member-avatar-placeholder" aria-hidden="true">
          {{ getInitials(member.name) }}
        </div>
        <h3>{{ member.name }}</h3>
        <p>{{ member.title }}</p>
      </div>

      <div
        v-if="member.links && member.links.length"
        class="medvic-member-socials"
        aria-label="Member links"
      >
        <a
          v-for="link in member.links"
          :key="link.link"
          :href="link.link"
          target="_blank"
          rel="noopener"
          class="medvic-member-social-link"
          :aria-label="link.icon || 'Profile link'"
        >
          <span class="medvic-member-social-icon" :class="getSocialLinkClass(link.icon)"></span>
        </a>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    getSocialLinkClass(icon) {
      if (typeof icon === 'object' && icon !== null) {
        return 'vpi-social-website'
      }
      return `vpi-social-${icon || 'website'}`
    },
    getInitials(name) {
      return (name || '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    }
  },
}
</script>

<style scoped>
.medvic-member-grid {
  align-items: stretch;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 1rem 0 2.5rem;
}

.medvic-member-card {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid var(--medvic-border, #d4dde8);
  border-radius: 8px;
  box-shadow: 0 8px 22px rgba(27, 58, 107, 0.08);
  display: flex;
  flex-direction: column;
  height: 320px;
  padding: 1.15rem;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.medvic-member-card:hover {
  border-color: rgba(13, 110, 126, 0.38);
  box-shadow: 0 12px 28px rgba(27, 58, 107, 0.12);
  transform: translateY(-2px);
}

.medvic-member-main {
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  text-align: center;
  text-decoration: none !important;
}

.medvic-member-avatar,
.medvic-member-avatar-placeholder {
  border-radius: 100%;
  flex: 0 0 auto;
  height: 96px;
  width: 96px;
}

.medvic-member-avatar {
  object-fit: cover;
}

.medvic-member-avatar-placeholder {
  align-items: center;
  background: var(--medvic-light-bg, #f4f7fb);
  border: 1px solid var(--medvic-border, #d4dde8);
  color: var(--medvic-navy, #1b3a6b);
  display: flex;
  font-family: Inter, sans-serif;
  font-size: 1.45rem;
  font-weight: 800;
  justify-content: center;
  letter-spacing: 0;
}

.medvic-member-main h3 {
  color: var(--medvic-navy, #1b3a6b) !important;
  font-family: Inter, sans-serif;
  font-size: 1rem !important;
  font-weight: 750;
  line-height: 1.25;
  margin: 0.9rem 0 0.35rem;
}

.medvic-member-main p {
  color: var(--medvic-muted, #5f6f82);
  font-size: 0.86rem;
  line-height: 1.35;
  margin: 0;
}

.medvic-member-socials {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: center;
  min-height: 34px;
  padding-top: 0.8rem;
}

.medvic-member-social-link {
  align-items: center;
  background: rgba(244, 247, 251, 0.88);
  border: 1px solid rgba(27, 58, 107, 0.12);
  border-radius: 999px;
  color: var(--medvic-teal, #0d6e7e);
  display: inline-flex;
  flex: 0 0 32px;
  height: 32px;
  justify-content: center;
  overflow: hidden;
  text-decoration: none !important;
  transition: background-color 0.2s, color 0.2s;
  width: 32px;
}

.medvic-member-social-link:hover {
  background: var(--medvic-teal, #0d6e7e);
  color: #fff;
}

.medvic-member-social-icon {
  background-color: currentColor;
  color: inherit;
  display: block;
  height: 17px;
  width: 17px;
}

.vpi-social-github,
.vpi-social-linkedin,
.vpi-social-twitter,
.vpi-social-website {
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.vpi-social-github {
  --svg: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='black' d='M12 .7A11.3 11.3 0 0 0 8.4 22.7c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.82 2.63 2.94 1.87.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15.9-.25 1.86-.38 2.82-.38.96 0 1.92.13 2.82.38 2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z'/%3E%3C/svg%3E");
}

.vpi-social-linkedin {
  --svg: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='black' d='M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.86-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z'/%3E%3C/svg%3E");
}

.vpi-social-twitter {
  --svg: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='black' d='M18.9 2.5h3.3l-7.2 8.24 8.47 11.2h-6.64l-5.2-6.8-5.95 6.8H2.36l7.7-8.8L1.94 2.5h6.8l4.7 6.22 5.46-6.22Zm-1.16 17.48h1.83L7.75 4.35H5.78l11.96 15.63Z'/%3E%3C/svg%3E");
}

.vpi-social-website {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M2 12h20M12 2a15 15 0 0 0 0 20a15 15 0 0 0 0-20'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/g%3E%3C/svg%3E");
}

@media (max-width: 640px) {
  .medvic-member-grid {
    grid-template-columns: 1fr;
  }

  .medvic-member-card {
    height: auto;
    min-height: 286px;
  }
}
</style>
