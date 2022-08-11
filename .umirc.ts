import { defineConfig } from 'dumi';



export default defineConfig({
  title: 'Misco',
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
    hostname: 'www.xuzm.cn'
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'antd',
    ],
  ],
  // more config: https://d.umijs.org/config
});
