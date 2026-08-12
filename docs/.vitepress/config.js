import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'z-ui',
  description: 'A lightweight Vue 3 component library for TypeScript projects.',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/component/icon' },
      { text: 'GitHub', link: 'https://github.com/xch-jjay/x-norpr-ui' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quick-start' },
          ],
        },
      ],
      '/component/': [
        {
          text: '基础组件',
          items: [{ text: 'Icon 图标', link: '/component/icon' }],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xch-jjay/x-norpr-ui' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 xch-jjay',
    },
  },
})
