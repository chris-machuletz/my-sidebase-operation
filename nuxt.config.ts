// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
  },
	debug: true,
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css',
		'@/assets/styles/main.scss'
	],
  nitro: {
		plugins: ["@/server/db/index.ts"],
	},
  modules: [
    '@sidebase/nuxt-auth',
		['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_API_TOKEN }],
  ],
	auth: {
		baseURL: 'http://localhost:3000',
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
