// import { mdsvex } from "mdsvex";
// import mdsvexConfig from "./mdsvex.config.js";
import adapter from '@sveltejs/adapter-netlify'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  "extensions": [".svelte"],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    // vite: {
    //   optimizeDeps: {
    //     include: 
    //   }
    // }
  // vite: {
    // resolve: {
    //   alias: {
    //     $static: path.resolve('static')
    //   }
    // }
    }
  // },

  // preprocess: [mdsvex(mdsvexConfig)]
};

export default config;
