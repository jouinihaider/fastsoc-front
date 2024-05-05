import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  app: {
    head: {
      title: 'Orange Cyberdefense - FastSOC',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Orange Cyberdefense - FastSOC',
        },
      ],
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: [
    // Application styles
    '~/assets/scss/main.scss',
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    [
      '@pinia/nuxt',
      { autoImports: ['defineStore'] },
    ],
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
