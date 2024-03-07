export default defineNuxtPlugin((nuxtApp) => {
    const { $api } = useNuxtApp()
    const user = useUserStore()

    async function fetchUser () {
        const { data } = await $api.user.getUser()
        user.setUserProfile(data.value?.data)
    }

    fetchUser()

    return {
        provide: {
            fetchUser: fetchUser
        }
    }
})
