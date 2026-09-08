import { defineConfig } from 'vitepress'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/x-norpr-ui/' : '/',
  lang: 'zh-CN',
  title: 'z-ui',
  description: 'A lightweight Vue 3 component library for TypeScript projects.',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/component/button' },
      { text: 'GitHub', link: 'https://github.com/xch-jjay/x-norpr-ui' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '主题定制', link: '/guide/theme' },
            { text: 'npm 发布手册', link: '/guide/npm-release' },
          ],
        },
      ],
      '/component/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/component/button' },
            { text: 'Icon 图标', link: '/component/icon' },
            { text: 'Input 输入框', link: '/component/input' },
            { text: 'Checkbox 复选框', link: '/component/checkbox' },
            { text: 'Radio 单选框', link: '/component/radio' },
            { text: 'Switch 开关', link: '/component/switch' },
            { text: 'InputNumber 数字输入', link: '/component/input-number' },
            { text: 'Select 选择器', link: '/component/select' },
            { text: 'Form 表单', link: '/component/form' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Alert 提示', link: '/component/alert' },
            { text: 'Message 消息', link: '/component/message' },
            { text: 'Dialog 对话框', link: '/component/dialog' },
            { text: 'Loading 加载', link: '/component/loading' },
          ],
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
