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
    },
})
