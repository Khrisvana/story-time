<script setup lang="ts">
import ApiUnauthenticatedException from "~/exceptions/ApiUnauthenticatedException"

const { $api } = useNuxtApp()

const toast = useToast()
const route = useRoute()
const config = useRuntimeConfig()
const bookmark = useBookmarkStore()

onMounted(() => {
    bookmark.initBookmark()
})

const story = ref()

async function fetcher() {
    try {
        const { data, pending } = await $api.stories.getStory(route.params.id)
        story.value = data.value
    } catch (error) {
        if (error instanceof ApiUnauthenticatedException) {
            toast.error(error.data().error.message)
        } else {
            console.log(error)
        }
    }
}

await fetcher()

if (!story.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
    })
}

const storyDetail = computed(() => {
    return story.value?.data
})

const storyCover = computed(() => {
    const data = story.value?.data

    return {
        img: config.public.baseURL + (data!.cover_image?.url ?? ""),
        alt: data!.cover_image?.alternativeText,
    }
})

const authorPicture = computed(() => {
    const data = story.value?.data

    return {
        img: config.public.baseURL + (data!.author?.profile_picture?.url ?? ""),
        alt: data!.author?.profile_picture?.name ?? "",
    }
})

const createdAt = computed(() => {
    const data = story.value?.data
    const date = new Date(data!.createdAt ?? "")

    const day = date.toLocaleDateString("en-US", { day: "2-digit" })
    const month = date.toLocaleDateString("en-US", { month: "long" })
    const year = date.toLocaleDateString("en-US", { year: "numeric" })

    return `${day} ${month} ${year}`
})

const isBookmarked = computed(() => {
    let index = bookmark.bookmarkIds.indexOf(story.value?.data.id)
    if (index <= -1) return false
    return true
})

const toggleBookmark = () => {
    if (!isBookmarked.value) {
        return bookmark.setBookmark(story.value?.data as IStory)
    }
    return bookmark.removeBookmark(story.value?.data as IStory)
}
</script>

<template>
    <div class="main-wrapper">
        <div class="content row">
            <div class="col-12 col-md-8 story">
                <h2 class="mt-3 fw-bold">
                    {{ storyDetail!.title }}
                </h2>
                <p class="text-secondary mb-3">{{ createdAt }}</p>

                <div class="position-relative w-100">
                    <img
                        class="story__image rounded"
                        :src="storyCover.img"
                        :="storyCover.alt"
                    />
                    <UiStoryBookmark
                        class="fs-3"
                        @click="toggleBookmark"
                        :is_active="isBookmarked"
                    />
                </div>

                <div
                    class="story__content mt-3"
                    v-html="storyDetail!.content"
                ></div>
            </div>
            <div class="col-12 col-md-4 position-relative">
                <div class="card story__author border-0 mt-3 py-4">
                    <h2 class="story__author-title">Author</h2>

                    <img
                        class="story__author-picture"
                        :src="authorPicture.img"
                        :alt="authorPicture.alt"
                    />

                    <div class="text-center">
                        <p class="mb-0 fw-semibold">
                            {{ storyDetail!.author?.name ?? "" }}
                        </p>
                        <p class="text-secondary mb-0">
                            {{ storyDetail!.author?.biodata ?? "" }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "assets/styles/main" as v;

.story {
    &__bookmark {
        margin-top: 0.75rem;
        margin-right: 0.75rem;
        display: flex;
        width: 55px;
        height: 55px;
    }

    &__image {
        width: 100%;
    }

    &__content {
        width: 100%;
    }

    &__author {
        position: sticky;
        top: calc(
            $default-content-margin-top + $default-content-padding-top + 1rem
        );
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        box-shadow: $default-box-shadow;

        &-title {
            margin-bottom: 0;
            font-weight: normal;
            font-size: 1rem;
            color: $secondary;
        }

        &-picture {
            border-radius: 100%;
            width: 70px;
            height: 70px;
            object-fit: cover;
        }
    }
}
</style>
