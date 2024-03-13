// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/styles/main.scss"],
    vite: {
        ssr: { noExternal: ["moment"] },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/config/theme.scss" as *;',
                },
            },
        },
    },

    modules: ["@vee-validate/nuxt", "nuxt-icon", "@pinia/nuxt"],
    runtimeConfig: {
        public: {
            baseURL: process.env.API_BASE_URL || "http://localhost:3000/",
        },
    },
    devtools: {
        enabled: false,
    },
})
