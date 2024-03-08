export default defineNuxtPlugin((nuxtApp) => {
    const { $api } = useNuxtApp()
    const user = useUserStore()
    
    async function fetchUser () {
        const jwt = useCookie('jwt')

        if (!jwt.value) return

        const { data } = await $api.user.getUser()
        user.setUserProfile(data.value?.data)
    }

    fetchUser()
})
