import vercel from '@sveltejs/adapter-vercel'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  "extensions": [".svelte"],

  kit: {
    adapter: vercel(),
    trailingSlash: 'always',
    vite: {
      resolve: {
        alias: {
          $static: path.resolve('static')
        }
      }
    }
  }

}

export default config;
