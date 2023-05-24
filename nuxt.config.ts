import path from 'path';
import fs from 'fs';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
  },
	debug: false,
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css',
		'@/assets/styles/main.scss'
	],
  nitro: {
		plugins: ["@/server/db/index.ts"],
	},
	devServer: {
    https: {
      key: 'localhost-key.pem',
      cert: 'localhost.pem'
    }
  },
  modules: [
    '@sidebase/nuxt-auth',
		['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_API_TOKEN }],
  ],
	auth: {
		baseURL: 'https://localhost:3000',
		provider: {
			type: 'authjs'
		},
		globalAppMiddleware: false,
	},
  typescript: {
    shim: false
  },
	vite: {
		css: {
			preprocessorOptions: {
					scss: {
							additionalData: '@import "@/assets/styles/_variables.scss";',
					},
			},
		},
    optimizeDeps: { exclude: ["fsevents"] }
  }
})
