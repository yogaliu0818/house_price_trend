import {defineConfig} from 'vite';

export default defineConfig({
  root: 'site',
  base: './',
  publicDir: '../public',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
