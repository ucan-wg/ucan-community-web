import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ["highlight.js/lib/core"], 
  },
  resolve: {
    alias: {
      $components: resolve('./src/components'),
      $static: resolve('./static')
    }
  },
}

export default config