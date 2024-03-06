<script setup lang="ts">
const story = useStoryStore()
const isLoading = ref(false)
const queryParams = ref({
    keyword: null,
    sort: "",
    author: null,
    page: 1,
    category: null,
})

await useAsyncData(() => story.getStories(queryParams.value))
const updateData = async () => {
    isLoading.value = true
    queryParams.value.page = 1

    await story.getStories(queryParams.value)
    isLoading.value = false
}

const loadMore = async () => {
    isLoading.value = true
    queryParams.value.page += 1

    await story.getStories(queryParams.value)
    isLoading.value = false
}
</script>

<template>
    <div>
        <div class="row justify-content-between">
            <div class="col-12 col-lg-4">
                <form @submit.prevent="updateData" class="input-group mb-3">
                    <input
                        type="search"
                        class="form-control"
                        placeholder="Search story..."
                        aria-label="Search story..."
                        aria-describedby="basic-addon2"
                        v-model="queryParams.keyword"
                    />
                    <UiButton class="input-group-text btn-primary d-flex fs-5 align-items-center" type="submit"
                        ><Icon name="ic:baseline-search"/></UiButton
                    >
                </form>
            </div>
            <div class="col-12 col-lg-3">
                <div class="mb-3">
                    <select
                        name="sort"
                        id="id-sort"
                        class="form-control"
                        v-model="queryParams.sort"
                        @change="updateData"
                    >
                        <option value="" disabled selected>Sort</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <UiStory
                v-if="story.stories.length > 0"
                class="col-6 col-lg-3"
                v-for="item in story.stories"
                :key="item.id"
                :story="item"
            />
            <UiDataNotFound v-else/>
        </div>
        <div class="d-flex w-100 justify-content-center">
            <UiButton
                v-if="story.stories.length > 0 && story.meta.pageCount != story.meta.page"
                type="button"
                class="fw-semibold btn-outline-primary"
                :loading="isLoading"
                @click="loadMore"
            >
                Load More
            </UiButton>
        </div>
    </div>
</template>
