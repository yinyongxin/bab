import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // base:'/mantine-template/',
  base: './',
  server: {
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 目标 API 服务器的地址
        // target: 'https://5ko3fraa-dnbn4mnf-uoh8bx53igmw.vcb3.mcprev.cn', // 目标 API 服务器的地址
        changeOrigin: true, // 对于虚拟托管的站点，这里设置为 true
        // rewrite: (path) => path.replace(/^\/api/, ''), // 可选: 若需要重写路径
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
