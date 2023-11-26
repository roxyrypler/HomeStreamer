// vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        extra: 'Player.html', // Adjust the path accordingly
      },
    },
  },
});
