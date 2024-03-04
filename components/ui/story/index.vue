<script setup lang="ts">
interface Props {
    story: Ref | null
}

const props = withDefaults(defineProps<Props>(), {
    story: null,
})

const config = useRuntimeConfig()

const storyThumbnail = computed(() => {
    const story: any = props.story ?? {}

    return {
        img: config.public.baseURL + story.cover_image.formats.thumbnail.url,
        alt: story.cover_image.formats.thumbnail.name,
    }
})
</script>

<template>
    <div class="story" :="$attrs">
        <div class="card">
            <img
                :src="storyThumbnail.img"
                class="story__image"
                :alt="storyThumbnail.alt"
            />
            <div class="card-body">
                <h5 class="card-title story__title">
                    Harry Potter and the Chamber of Secrets
                </h5>
                <p class="card-text story__text">
                    Harry Potter and the Chamber of Secrets is a fantasy novel
                    written by British author J. K. Rowling and the second novel
                    in the Harry Potter series. The plot follows Harry's second
                    year at Hogwarts School of Witchcraft and Wizardry,
                </p>

                <div class="story__author">
                    <p><small>by [Name]</small></p>
                    <p><small>17 Jul 23</small></p>
                </div>
                <span class="badge text-bg-light">Light</span>
            </div>

            <button class="btn story__bookmark">
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
    position: relative;
    border-radius: 0;
    padding: 0;
    padding: 0 15px 25px 15px;

    &__bookmark {
        margin: 0.25rem;
        padding: 0.5rem;
        width: 40px;
        height: 40px;
        display: flex;
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
