import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [
    { path: '/profile', component: '@/pages/profile', name: 'Profile' },
    {
      path: '/stock-graphql',
      component: '@/pages/stock-graphql',
      name: 'Stock Graphql',
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
