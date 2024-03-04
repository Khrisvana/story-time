<script setup lang="ts">
const story = useStoryStore()

await story.getStories()
</script>

<template>
    <div>
        <div class="row justify-content-between">
            <div class="col-12 col-lg-4">
                <div class="input-group mb-3">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <UiButton class="input-group-text btn-primary" type="submit"
                        >Search</UiButton
                    >
                </div>
            </div>
            <div class="col-12 col-lg-3">Test</div>
        </div>
        <div class="row">
            <UiStory
                class="col-6 col-lg-3"
                v-for="item in story.stories.data"
                :key="item.id"
                :story="item"
            />
        </div>
        <div class="d-flex w-100 justify-content-center">
            <UiButton type="button" class="fw-semibold btn-outline-primary">
                Load More
            </UiButton>
        </div>
    </div>
</template>
