export const useUserStore = defineStore("userStore", {
    state: () => {
        return {
            user: null as IUser | null,
        }
    },
    actions: {
        setUserProfile(user: IUser) {
            this.user = user
        },
        async logout() {
            const jwt = useCookie('jwt')
            this.user = null

            jwt.value = null

            return await navigateTo('/')
        }
    },
})
