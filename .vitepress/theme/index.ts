import DefaultTheme from 'vitepress/theme'

// Dynamically import all Vue components from the layouts directory
const layouts = import.meta.glob('../../layouts/*.vue')

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
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