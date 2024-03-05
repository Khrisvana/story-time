export const useStoryStore = defineStore("storyStore", {
    state: () => {
        return {
            stories: [] as Ref<any> | [],
            meta: {} as Ref<any> | {},
        }
    },
    actions: {
        async getStories(params: object) {
            const options = {
                params: params,
                watch: false,
            }
            
            const currentMeta = this.meta.page
            const { data, meta } = await useApiFetch("stories", options)

            this.meta = meta.pagination
            if (this.meta.page > 1 && currentMeta != this.meta.page) {
                this.stories.push(...data)
            } else {
                this.stories = data
            }
        },
    },
})
