/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./content/**/*.md",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      primary: "#344e41",
      secondary: "#f3f3f3",
      accent: "#f4f4f4",
      text: "#333",
    },
    extend: {},
  },
  plugins: [

  ],
}

