import { defineStore } from "pinia"

const toast = useToast()

function formatItem(item: IStory | Omit<IStory, "content">) {
    return {
        author: item.author,
        category: item.category,
        cover_image: item.cover_image,
        createdAt: item.createdAt,
        id: item.id,
        title: item.title,
        updatedAt: item.updatedAt,
    }
}

export const useBookmarkStore = defineStore({
    id: "myBookmarkStore",
    state: () => ({
        bookmarks: [] as Omit<IStory, "content">[],
    }),
    actions: {
        initBookmark() {
            let storageValue = localStorage.getItem("storyTimeBookmark")
            if (storageValue) {
                this.bookmarks = JSON.parse(storageValue)
            }
        },
        async setBookmark(item: IStory | Omit<IStory, "content">) {
            const userStore = useUserStore()
            if (process.server) return undefined
            if (!userStore.user) return await navigateTo("/login")
            let formattedItem = formatItem(item)

            this.bookmarks.push(formattedItem)

            if (this.bookmarks.length > 30) {
                return toast.error("Maximum of 30 bookmarks reached")
            }

            localStorage.setItem(
                "storyTimeBookmark",
                JSON.stringify(this.bookmarks),
            )

            return toast.success("Successfully add story from bookmark")
        },
        async removeBookmark(item: IStory | Omit<IStory, "content">) {
            const userStore = useUserStore()
            if (process.server) return undefined
            if (!userStore.user) return await navigateTo("/login")
            let formattedItem = formatItem(item)

            let exist = this.bookmarks
                .map((res: any) => res.id)
                .indexOf(formattedItem.id)
            if (exist <= -1) return

            this.bookmarks.splice(exist, 1)
            localStorage.setItem(
                "storyTimeBookmark",
                JSON.stringify(this.bookmarks),
            )

            return toast.success("Successfully remove story from bookmark")
        },
        clearBookmark() {
            if (process.server) return undefined
            this.bookmarks = []
            localStorage.setItem("storyTimeBookmark", JSON.stringify([]))
        },
    },
    getters: {
        bookmarkIds: (state) => {
            return state.bookmarks.map((res: any) => res.id)
        },
    },
})
