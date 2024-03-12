<script lang="ts" setup>
const user = useUserStore()
const { $api } = useNuxtApp()

const queryParams = ref({
    keyword: undefined,
    sort: "",
    author: user.user?.id,
    page: 1,
    category: undefined,
})

const pagination: Ref<IPagination> = ref({} as IPagination)

const list: Ref<Array<IStory>> = ref([])

const { data } = await $api.stories.getStories({ params: queryParams.value })
list.value = data.value.data
pagination.value = data.value.meta.pagination

const formatTime = (value: string) => {
    const date = new Date(value)

    const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hourCycle: 'h23' })
    const day = date.toLocaleDateString("en-US", { day: "2-digit" })
    const month = date.toLocaleDateString("en-US", { month: "short" })
    const year = date.toLocaleDateString("en-US", { year: "numeric" })

    return `${time}, ${day} ${month} ${year}`
}
</script>

<template>
    <div class="card p-3">
        <div class="d-flex justify-content-between">
            <h3>Story List</h3>
            <div>
                <UiButton
                    type="nuxt-link"
                    link="/user/story/create"
                    class="btn-primary btn-center fw-semibold"
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
                    <td>{{ formatTime(story.updatedAt) }}</td>
                    <td>
                        <UiButton type="nuxt-link" :to="`/user/story/${story.id}/edit`" class="btn-outline-primary fw-semibold me-2"
                            >Edit</UiButton
                        >
                        <UiButton class="btn-outline-danger fw-semibold">Delete</UiButton>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="d-flex justify-content-end mt-3">
            <UiPagination :pagination="pagination" />
        </div>
    </div>
</template>
