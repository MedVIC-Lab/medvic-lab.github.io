<template>
  <v-container>
    <v-row class="justify-center">
      <v-col
        v-for="member in members"
        :key="member.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto" max-width="344" outlined :href="member.link">
          <v-img :src="member.avatar" :alt="member.name" class="white--text align-end">
          </v-img>
          <v-card-title>{{ member.name }}</v-card-title>
          <v-card-subtitle>{{ member.title }}</v-card-subtitle>
          <v-card-actions>
            <v-btn v-for="link in member.links" :key="link.link" :href="link.link" target="_blank" rel="noopener" icon @click.stop>
              <v-icon><span :class="getSocialLinkClass(link.icon)"></span></v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    members: Array,
    size: String
  },
  methods: {
    getSocialLinkClass(icon) {
      if (typeof icon === 'object' && icon !== null) {
        return 'vpi-social-website'
      }
      return `vpi-social-${icon}`
    }
  },
}
</script>

<style scoped>
/* ICONS */
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

/* Customized vuetify styles */
.v-card {
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding-top: 15px;
  border-radius: 40px;
}

.v-card:hover {
  background-color: #f1f1f1;
}

.v-img {
  margin: 0 auto;
  border-radius: 100%;
  height: 80px;
  width: 80px;
}

.v-card-title {
  font-size: 1.2em;
}

.v-card-subtitle {
  font-size: 1em;
  color: #757575;
}

.v-card-actions {
  justify-content: center;
}

.v-btn {
  margin: 0 5px;
}

@media (min-width: 1280px) {
  .v-col-lg-3 {
    flex: 0 0 25%;
    max-width: 15%;
  }
}
</style>