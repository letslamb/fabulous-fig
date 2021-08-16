import adapter from '@sveltejs/adapter-vercel'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $static: path.resolve('static')
        }
      }
    }
	}
};

export default config;
