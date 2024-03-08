<script lang="ts" setup>
const user = useUserStore()
const { $api } = useNuxtApp()

const queryParams = ref({
    keyword: undefined,
    sort: "",
    // author: user.user?.id,
    page: 1,
    category: undefined,
})

const pagination: Ref<IPagination> = ref({} as IPagination)

const list: Ref<Array<IStory>> = ref([])

const { data } = await $api.stories.getStories({ params: queryParams.value })
list.value = data.value.data
pagination.value = data.value.meta.pagination
</script>

<template>
    <div class="card p-3">
        <div class="d-flex justify-content-between">
            <h3>Story List</h3>
            <div>
                <UiButton type="button" class="btn-primary fw-semibold"
                    ><Icon name="ic:outline-add" class="me-2" />
                    Create</UiButton
                >
            </div>
        </div>

        <table class="table border-top mt-4">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Last Update</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(story, index) in list" :key="story.id">
                    <th scope="row">{{ story.title }}</th>
                    <td>{{ story.updatedAt }}</td>
                    <td>params.action</td>
                </tr>
            </tbody>
        </table>

        <UiPagination :pagination="pagination" />
    </div>
</template>
