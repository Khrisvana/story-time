<script lang="ts" setup>
import ApiException from "~/exceptions/ApiException"

const user = useUserStore()
const { $api, $bModal } = useNuxtApp()
const toast = useToast()

const queryParams = ref({
    keyword: undefined,
    sort: "",
    author: user.user?.id,
    page: 1,
    category: undefined,
})

const isLoading = ref(false)
const deleteId: Ref<string | number | string[]> = ref("")
const pagination: Ref<IPagination> = ref({} as IPagination)

const list: Ref<Array<IStory>> = ref([])

const fetchStories = async () => {
    const { data } = await $api.stories.getStories({
        params: queryParams.value,
    })
    list.value = data.value.data
    pagination.value = data.value.meta.pagination
}

fetchStories()

const formatTime = (value: string) => {
    const date = new Date(value)

    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
    })
    const day = date.toLocaleDateString("en-US", { day: "2-digit" })
    const month = date.toLocaleDateString("en-US", { month: "short" })
    const year = date.toLocaleDateString("en-US", { year: "numeric" })

    return `${time}, ${day} ${month} ${year}`
}

const openModal = (id: string | number | string[]) => {
    deleteId.value = id
    $bModal.show("delete-modal")
}

const onDelete = async () => {
    try {
        isLoading.value = true
        await $api.stories.deleteStory(deleteId.value)
        toast.success("Successfully delete story")
        await fetchStories()
        $bModal.hide("delete-modal")

    } catch (error) {
        if (error instanceof ApiException) {
            toast.error(error.data().error.message)
        } else {
            console.log(error)
        }
    } finally {
        isLoading.value = false
    }
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
                    <th scope="row">
                        <NuxtLink
                            :to="`/story/${story.id}`"
                            class="text-primary link-hover"
                            >{{ story.title }}</NuxtLink
                        >
                    </th>
                    <td>{{ formatTime(story.updatedAt) }}</td>
                    <td>
                        <div class="d-flex">
                            <UiButton
                                type="nuxt-link"
                                :to="`/user/story/${story.id}/edit`"
                                class="btn-outline-primary fw-semibold me-2 btn-center"
                                ><Icon
                                    name="material-symbols:edit"
                                    class="me-1"
                                />
                                Edit</UiButton
                            >
                            <UiButton
                                @click="openModal(story.id)"
                                class="btn-outline-danger fw-semibold btn-center"
                                ><Icon
                                    name="material-symbols:delete-rounded"
                                    class="me-1"
                                />Delete</UiButton
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="d-flex justify-content-end mt-3">
            <UiPagination :pagination="pagination" />
        </div>
    </div>

    <UiModal id="delete-modal" title="Delete Story">
        <p class="mb-0">Are you sure want to delete this story?</p>
        <template #footer>
            <UiButton
                class="fw-semibold btn-outline-primary me-2"
                @click="$bModal.hide('delete-modal')"
                >Cancel</UiButton
            >
            <UiButton class="fw-semibold btn-primary" @click="onDelete" :loading="isLoading"
                >Delete</UiButton
            >
        </template>
    </UiModal>
</template>
