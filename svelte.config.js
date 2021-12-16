import { resolve } from 'path'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { mdsvex } from "mdsvex"
import remarkHeadingId from 'remark-heading-id'

console.log('from build script', remarkHeadingId)

// import { plugin: mdPlugin, Mode } from 'vite-plugin-markdown'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({ 
      extensions: ['.md'],
      remarkPlugins: [remarkHeadingId],
      rehypePlugins: []
    }),
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
  }
}

export default config
