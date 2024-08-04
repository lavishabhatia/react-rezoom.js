import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react'],
      output: {
        dir: 'dist/vite',
        entryFileNames: 'Zoom.js',
        format: 'es'
      }
    }
  }
});