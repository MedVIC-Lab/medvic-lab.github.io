import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ELHABIAN Lab",
  description: "ELHABIAN Lab's Website",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/pages/about' },
      { text: 'People', link: '/pages/people' },
      { text: 'Projects', link: '/pages/projects' },
      { text: 'Publications', link: '/pages/publications' },
    ],
  }
})
