// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
  },
  nitro: {
		plugins: ["@/server/db/index.ts"],
	},
  modules: [
    '@sidebase/nuxt-auth',
    // '@nuxtjs/tailwindcss'
  ],
  typescript: {
    shim: false
  }
})
