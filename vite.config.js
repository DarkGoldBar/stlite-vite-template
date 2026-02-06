import { defineConfig } from 'vite';

export default defineConfig({
  base: "./",
  build: {
    minify: false
  },
  server: {
    cors: true
  }
});