// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/styles/main.scss'],
    modules: [
        '@vee-validate/nuxt',
        'nuxt-icon',
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        public: {
          baseURL: process.env.API_BASE_URL || 'http://localhost:3000/',
        },
    },    
})
