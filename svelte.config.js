import { resolve } from 'path'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { mdsvex } from "mdsvex"

// import { plugin: mdPlugin, Mode } from 'vite-plugin-markdown'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({ extensions: ['.md'] }),
    preprocess()
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
    ssr: false,
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $components: resolve('./src/components'),
          $static: resolve('./static')
        }
      }
    }
  }
}

export default config
