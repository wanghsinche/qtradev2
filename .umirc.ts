import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: false, path: '/', component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/profile', name: 'Profile'}    
      ]
    }
  ],
  fastRefresh: {},
  proxy: {
    '/proxy': {
      target: 'http://localhost:8011/proxy',
      pathRewrite: { '^/proxy': '' },
      changeOrigin: true
    },
    '/api': {
        target: 'http://localhost:8011/api',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
    },
  }
});
