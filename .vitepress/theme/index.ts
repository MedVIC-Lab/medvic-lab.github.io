import DefaultTheme from 'vitepress/theme'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import './custom.css'

const vuetify = createVuetify({ components, directives })

// Dynamically import all Vue components from the layouts directory
const layouts = import.meta.glob('../../layouts/*.vue')

export default {
  Layout: DefaultTheme.Layout,
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Use Vuetify
    app.use(vuetify)

    // Register each layout component
    for (const path in layouts) {
      layouts[path]().then((module) => {
        const componentName = path.split('/').pop()?.replace('.vue', '')
        if (componentName) {
          app.component(componentName, module.default)
        }
      })
    }
  }
}