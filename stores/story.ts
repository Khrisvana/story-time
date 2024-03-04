export const useStoryStore = defineStore('storyStore', {
    state: () => {
        return {
            stories: [] as Ref<any> | [],
        }
    },
    actions: {
        async getStories() {
            const { data, pending, error, refresh } = await useApiFetch('stories')
            this.stories = data
        }
    }
})