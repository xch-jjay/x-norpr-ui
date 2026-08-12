import DefaultTheme from 'vitepress/theme'
import ZIcon from '@z-ui/components/icon'
import '@z-ui/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZIcon)
  },
}
