<script setup lang="ts">
const { $api } = useNuxtApp()

const queryParams = ref({
    keyword: null,
    sort: "",
    author: null,
    page: 1,
    category: null,
})

const list: Ref<Array<IStory>> = ref([])
const pagination: Ref<IPagination | undefined> = ref()
const pending: Ref<boolean> = ref(false)

const fetchStories = async (loadMore: boolean = false) => {
    if (loadMore) {
        queryParams.value.page += 1
    } else {
        queryParams.value.page = 1
    }

    pending.value = true
    const { data: stories } = await $api.stories.getStories({
        params: queryParams.value,
    })
    pending.value = false

    pagination.value = stories.value.meta.pagination
    if (queryParams.value.page > 1) {
        list.value.push(...stories.value?.data)
        return
    }
    list.value = stories.value?.data
}

await fetchStories()
</script>

<template>
    <div>
        <div class="row justify-content-between">
            <div class="col-12 col-lg-4">
                <form @submit.prevent="fetchStories()" class="input-group mb-3">
                    <input
                        type="search"
                        class="form-control"
                        placeholder="Search story..."
                        aria-label="Search story..."
                        aria-describedby="basic-addon2"
                        v-model="queryParams.keyword"
                    />
                    <UiButton
                        class="input-group-text btn-primary d-flex fs-5 align-items-center"
                        type="submit"
                        ><Icon name="ic:baseline-search"
                    /></UiButton>
                </form>
            </div>
            <div class="col-12 col-lg-3">
                <div class="mb-3">
                    <select
                        name="sort"
                        id="id-sort"
                        class="form-control"
                        v-model="queryParams.sort"
                        @change="fetchStories()"
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
                v-if="list.length > 0"
                class="col-6 col-lg-3"
                v-for="item in list"
                :key="item.id"
                :story="item"
            />
            <UiDataNotFound v-else />
        </div>
        <div class="d-flex w-100 justify-content-center">
            <UiButton
                v-if="
                    list.length > 0 && pagination?.pageCount != pagination?.page
                "
                type="button"
                class="fw-semibold btn-outline-primary"
                :loading="pending"
                @click="fetchStories(true)"
            >
                Load More
            </UiButton>
        </div>
    </div>
</template>
