import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [
    { path: '/', component: '@/pages/start', name: 'QTrade-V2' },
    { path: '/profile', component: '@/pages/profile', name: 'Profile' },
    {
      path: '/akshare',
      name: 'AKShare',
      routes: [
        {
          path: 'introduce',
          component: '@/pages/akshare-intro',
          name: 'AKShare Intro',
        },
        {
          path: 'graphql',
          component: '@/pages/stock-graphql',
          name: 'GraphQL Playground',
        },
      ],
    },
  ],
  fastRefresh: {},
  proxy: {
    '/proxy': {
      target: 'http://localhost:8011/proxy',
      pathRewrite: { '^/proxy': '' },
      changeOrigin: true,
    },
    '/api': {
      target: 'http://localhost:8011/api',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
