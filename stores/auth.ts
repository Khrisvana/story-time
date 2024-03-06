export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            user_profile: null as any
        }
    },
    actions: {
        /* 
            Register Member
        */
        async register(payload: object | FormData, params?: object) {
            const options = {
                params: params,
                method: "POST",
                body: payload,
            }

            await useApiFetch("auth/local/register", options)
        },
        /* 
            Login Member
        */
        async login(payload: object | FormData, params?: object) {
            const jwt = useCookie("jwt")
            const options = {
                params: params,
                method: "POST",
                body: payload,
            }

            const { data } = await useApiFetch("auth/local", options)
            jwt.value = data.jwt ?? null
            this.user_profile = data.user ?? {}
        },
        async getUser(params?: object) {
            if (this.user_profile) return 

            const options = {
                params: params,
            }

            const { data } = await useApiFetch("users/me", options)
            this.user_profile = data ?? {}
        }
    },
})
