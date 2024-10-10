// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/image'],
  css:['@/styles.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-light'
    }
  },
  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2024-10-10'
})