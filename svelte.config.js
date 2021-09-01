// import { mdsvex } from "mdsvex";
// import mdsvexConfig from "./mdsvex.config.js";
import vercel from '@sveltejs/adapter-vercel'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  "extensions": [".svelte"],

  kit: {
      // hydrate the <div id="svelte"> element in src/app.html
      target: '#svelte',
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        $static: path.resolve('static')
      }
    }
  }
  },

  // preprocess: [mdsvex(mdsvexConfig)]
};

export default config;
