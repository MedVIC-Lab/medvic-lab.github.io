import { defineConfig } from 'vitepress'
import generateMembersPlugin from '../scripts/generateMembers';
import generatePublicationsPlugin from '../scripts/generatePublications';
import generateProjectsPlugin from '../scripts/generateProjects';
import generateSearchIndexPlugin from '../scripts/generateSearchIndex';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MedVIC Lab",
  description: "Medical Vision and Intelligent Computing Lab — University of Utah",
  appearance: false,  // disable dark mode
  head: [
    ['meta', { name: 'theme-color', content: '#282264' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'MedVIC Lab — University of Utah' }],
    ['meta', { property: 'og:description', content: 'Medical Vision and Intelligent Computing Lab — building structured AI systems for medical imaging.' }],
    ['link', { rel: 'icon', href: '/assets/images/medvic.svg', type: 'image/svg+xml' }],
  ],
  themeConfig: {
    logo: { src: '/assets/images/medvic.svg', alt: 'MedVIC Logo' },
    siteTitle: 'MedVIC Lab',
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/pages/about' },
      { text: 'Research', link: '/pages/research' },
      { text: 'People', link: '/pages/people' },
      { text: 'Publications', link: '/pages/publications' },
      { text: 'Software', link: '/pages/software' },
      { text: 'Join Us', link: '/pages/join' },
      { text: 'News', link: '/pages/news' },
      { text: 'Contact', link: '/pages/contact' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MedVIC-Lab' },
    ],
  },
  vite: {
    plugins: [
      generateMembersPlugin(),
      generatePublicationsPlugin(),
      generateProjectsPlugin(),
      generateSearchIndexPlugin(),
    ],
    ssr: {
      noExternal: [/\.css$/, /\?vue&type=style/, /^vuetify/],
    }
  },
})
