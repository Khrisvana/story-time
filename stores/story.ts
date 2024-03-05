export const useStoryStore = defineStore("storyStore", {
    state: () => {
        return {
            stories: [] as Ref<any> | [],
            story: {} as Ref<Story>,
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

        async getStory(id: number | string | string[], params?: object) {
            const options = {
                params: params,
                watch: false,
            }

            const { data, meta } = await useApiFetch(`stories/${id}`, options)

            this.story = data
            this.meta = meta
        }
    },
})
