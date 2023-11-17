// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
  },
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Roboto: true,
      'Noto+Sans+JP': true
    },
    download: true,
    inject: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/common.scss";',
        },
      },
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  ssr: false,
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1.0', 
      title: '福島高専クイズコンテスト',
    }
  }
})
