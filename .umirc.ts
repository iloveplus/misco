import { defineConfig } from 'dumi';



export default defineConfig({
  title: 'Misro',
  favicon: '/logo.png',
  logo: '/logo.png',
  mode: 'site',
  publicPath: './',
  history: {
    type: 'hash'
  },
  locales: [['zh-CN', '中文']],
  outputPath: 'docs-dist',
  navs: [
    {
      title: '开始',
      path: '/getting-started'
    }
  ],
  sitemap: {
    hostname: 'www.ucunn.cn'
  }
  // more config: https://d.umijs.org/config
});
