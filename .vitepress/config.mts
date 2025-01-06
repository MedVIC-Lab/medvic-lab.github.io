import { defineConfig } from 'vitepress'
import generateMembersPlugin from '../scripts/generateMembers';
import generatePublicationsPlugin from '../scripts/generatePublications';
import generateProjectsPlugin from '../scripts/generateProjects';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MedVIC Lab",
  description: "MedVIC Lab's Website",
  appearance: false,  // disable dark mode
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/pages/about' },
      { text: 'People', link: '/pages/people' },
      // Uncommnet when projects are added
      // { text: 'Projects', link: '/pages/projects' },
      { text: 'Publications', link: '/pages/publications' },
    ],
  },
  vite: {
    plugins: [
      generateMembersPlugin(),
      generatePublicationsPlugin(),
      generateProjectsPlugin(),
    ],
    ssr: {
      noExternal: [/\.css$/, /\?vue&type=style/, /^vuetify/],
    }
  },
})
