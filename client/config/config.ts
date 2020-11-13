import { defineConfig } from 'umi';

// ref: https://umijs.org/config/
const config = defineConfig({
  title: 'Serverless Plus UI',
  hash: true,
  antd: {},
  dva: {},
  history: {
    type: 'browser',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: '@/pages/index',
        },
      ],
    },
  ],
  theme: {
    'primary-color': '#006eff',
    // 'primary-1': '#ffffff',
    'layout-header-background': '#262F3E',
    'link-color': '#006eff',
    'border-radius-base': '0px',
    'layout-header-color': '#FFFFFF',
    'select-item-selected-color': '#006eff',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  targets: {
    ie: 11,
  },
  exportStatic: {},
});

export default config;
