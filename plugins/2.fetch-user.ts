import ApiUnauthenticatedException from "~/exceptions/ApiUnauthenticatedException"

export default defineNuxtPlugin(async (nuxtApp) => {
    const { $api } = useNuxtApp()
    const user = useUserStore()
    
    async function fetchUser () {
        const jwt = useCookie('jwt')

        if (!jwt.value) return

        try {
            const { data, error } = await $api.user.getUser()

            if (error.value) throw error.value

            user.setUserProfile(data.value?.data)
        } catch (error: any) {
            if (error.cause instanceof ApiUnauthenticatedException) {
                return console.log(error.message)
            } else {
                return console.log(error)
            }
        }
    }

    await fetchUser()
})
