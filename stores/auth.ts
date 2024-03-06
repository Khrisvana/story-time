export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            errors: {},
            data: {}
        }
    },
    actions: {
        async register(payload: object | FormData, params?: object) {
            const options = {
                params: params,
                method: 'POST',
                body: payload
            }

            const { data, error } = await useApiFetch('auth/local/register', options)
            this.data = data
        }
    }
})