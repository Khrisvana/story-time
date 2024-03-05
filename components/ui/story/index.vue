<script setup lang="ts">
type Story = {
    id: number
    title: string,
    content: string,

    author: any,
    category: any,
    cover_image: any,
    
    createdAt: string,
    updatedAt: string,
}

type Props = {
    story: Story
}

const props = defineProps<Props>()

const config = useRuntimeConfig()

const storyThumbnail = computed(() => {
    const story: any = props.story ?? {}

    return {
        img: config.public.baseURL + story.cover_image.formats.thumbnail.url,
        alt: story.cover_image.formats.thumbnail.name,
    }
})

const createdAt = computed(() => {
    const date = new Date(props.story.createdAt)

    const day = date.toLocaleDateString('en-US', { day: '2-digit'})
    const month = date.toLocaleDateString('en-US', { month: 'short'})
    const year = date.toLocaleDateString('en-US', { year: '2-digit'})

    return `${day} ${month} ${year}`
})
</script>

<template>
    <div class="story" :="$attrs">
        <div class="card h-100 rounded-0 border-0">
            <img
                :src="storyThumbnail.img"
                class="story__image"
                :alt="storyThumbnail.alt"
            />
            <div class="card-body">
                <h5 class="card-title story__title">
                    {{ story.title }}
                </h5>
                <p class="card-text story__text">
                    {{ story.content }}
                </p>

                <div class="story__author">
                    <p><small>by {{ story.author.username }}</small></p>
                    <p><small>{{ createdAt }}</small></p>
                </div>
                <span class="badge text-bg-light">{{ story.category.name }}</span>
            </div>

            <button class="btn story__bookmark shadow">
                <Icon
                    name="material-symbols-light:bookmark-add-outline"
                    color="black"
                />
            </button>
        </div>
    </div>
</template>

<style lang="scss">
@use "assets/styles/main" as v;

.story {
    cursor: pointer;
    position: relative;
    border-radius: 0;
    padding: 0;
    padding: 0 15px 25px 15px;

    & .card {
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    }

    &:hover {
        & .story__bookmark {
            display: flex;
        }
    }

    &__bookmark {
        display: none;
        margin: 0.25rem;
        padding: 0.5rem;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        background-color: white !important;
        font-size: 20px;
        border: none;
        border-radius: 100%;
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
        color: v.$secondary;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__author {
        color: v.$secondary;

        & p {
            margin-bottom: 0;
        }
    }
}
</style>
