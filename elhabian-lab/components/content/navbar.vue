<template>
    <nav class="p-4 min-h-52 flex align-baseline">
      <div class="container mx-auto flex justify-between items-center">
        <div class="hidden md:flex space-x-20">
            <a :href="link.href" 
                v-for="link in links" 
                :key="link.href" 
                :class="['nav-link text-xl text-text', { 'border-b-4': isActive(link.href) }, {'hover:border-b-2': !isActive(link.href) }]">
                {{ link.name }}
            </a>
        </div>
        <div class="text-black text-2xl font-bold">
          ELHABIAN LAB
        </div>
        <div class="md:hidden">
          <button class="text-gray-300 hover:text-white focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    props: {
      current: {
        type: String,
        default: ''
      }
    },
    data() {
        return {
            links: [
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'People', href: '/people' },
                { name: 'Publications', href: '/publications' },
                { name: 'News', href: '/news' }
            ]
        }
    },
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    },
    methods: {
        isActive(href) {
            return this.currentRoute === href;
        }
    }
  }
  </script>

  <style scoped>
    .nav-link {
        border-color: var(--green-dark);
    }

    .nav-link:hover:not(.border-b-4) {
        border-bottom: 2px solid;
    }
  </style>