<script setup lang="ts">
type Props = {
    story: IStory | Omit<IStory, "content">
}

const bookmark = useBookmarkStore()
const props = defineProps<Props>()

const config = useRuntimeConfig()

const storyThumbnail = computed(() => {
    const story: any = props.story ?? {}

    return {
        img: config.public.baseURL + story.cover_image?.formats.thumbnail.url,
        alt: story.cover_image?.formats.thumbnail.name,
    }
})

const createdAt = computed(() => {
    const date = new Date(props.story.createdAt)

    const day = date.toLocaleDateString("en-US", { day: "2-digit" })
    const month = date.toLocaleDateString("en-US", { month: "short" })
    const year = date.toLocaleDateString("en-US", { year: "2-digit" })

    return `${day} ${month} ${year}`
})

const isBookmarked = computed(() => {
    let index = bookmark.bookmarkIds.indexOf(props.story.id)
    if (index <= -1) return false
    return true
})

const toggleBookmark = () => {
    if (!isBookmarked.value) {
        return bookmark.setBookmark(props.story)
    }
    return bookmark.removeBookmark(props.story)
}
</script>

<template>
    <div class="story">
        <NuxtLink
            :to="`/story/${story.id}`"
            class="card w-100 h-100 rounded-0 border-0"
        >
            <img
                :src="storyThumbnail.img"
                class="story__image"
                :alt="storyThumbnail.alt"
            />
            <div class="card-body">
                <h5 class="card-title story__title">
                    {{ story.title }}
                </h5>
                <p
                    class="card-text story__text"
                    v-if="(story as IStory).content"
                >
                    {{ (story as IStory).content }}
                </p>

                <div class="story__author">
                    <p>
                        <small>by {{ story.author?.username ?? '' }}</small>
                    </p>
                    <p>
                        <small>{{ createdAt }}</small>
                    </p>
                </div>
                <span class="badge text-bg-light">{{
                    story.category.name
                }}</span>
            </div>
        </NuxtLink>
        <UiStoryBookmark @click="toggleBookmark" :is_active="isBookmarked" />
    </div>
</template>

<style lang="scss" scoped>
.story {
    cursor: pointer;
    text-decoration: none;
    position: relative;
    border-radius: 0;
    padding: 0;
    padding: 0 15px 25px 15px;

    &:hover {
        & .story__bookmark {
            display: flex;
        }
    }

    &__bookmark {
        display: none;
        right: 1rem !important;
    }

    &__image {
        object-fit: cover;
        height: 160px;
    }

    &__title {
        margin-bottom: 0.5rem;
        text-wrap: balance;
    }

    &__text {
        margin-bottom: 0.5rem;
        color: $secondary;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__author {
        color: $secondary;

        & p {
            margin-bottom: 0;
        }
    }
}
</style>
