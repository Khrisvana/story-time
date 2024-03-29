<script setup lang="ts">
import ApiUnauthenticatedException from "~/exceptions/ApiUnauthenticatedException"
import { fields, validationSchema } from "~/forms/StoryForm"

const toast = useToast()
const route = useRoute()
const { $api } = useNuxtApp()

const isLoading = ref(false)
const formFields: Ref<any> = ref([])
const storyData = ref()
const categoryData = ref()

const fetcher = async () => {
    try {
        // Get Categories
        const category = await $api.category.getCategories()

        if (category.error.value) throw category.error.value
        categoryData.value = category.data.value

        const categoryOptions = categoryData.value.data?.map(
            (item: any, index: string | number) => {
                return { value: item.id, name: item.name }
            },
        )

        formFields.value = fields(categoryOptions)

        // Get Story Detail
        const story = await $api.stories.getStory(route.params.id)

        if (story.error.value) throw story.error.value
        storyData.value = story.data.value

    } catch (error: any) {
        if (error.cause instanceof ApiUnauthenticatedException) {
            toast.error(error.value.data().error.message)
        } else {
            console.log(error.value)
        }
    }
}
await fetcher()

const { values, handleSubmit } = useForm({
    validationSchema: validationSchema,
    initialValues: {
        title: storyData.value?.data?.title,
        content: storyData.value?.data?.content,
        category: storyData.value?.data?.category?.id,
        cover_image: storyData.value?.data?.cover_image?.url,
    },
})

const submitForm = handleSubmit(async (values) => {
    const instance = storyData.value?.data ?? null

    try {
        isLoading.value = true
        const { data: storyData } = await $api.stories.updateStory(
            route.params.id,
            {
                data: {
                    title: values.title,
                    content: values.content,
                    category: values.category,
                },
            },
        )

        if (typeof values.cover_image != "string") {
            if (instance!.cover_image?.id) {
                await $api.stories.deleteStoryImage(instance!.cover_image.id)
            }

            const image_payload = new FormData()
            image_payload.append("refId", storyData.id as string)
            image_payload.append("ref", "api::story.story")
            image_payload.append("field", "cover_image")
            image_payload.append("files", values.cover_image)

            await $api.stories.uploadStoryImage(image_payload)
        }

        toast.success("Successfully edit story")

        await navigateTo({ path: "/user/story" })
    } catch (error: any) {
        if (error instanceof ApiUnauthenticatedException) {
            toast.error(error.data().error.message)
        } else {
            console.log(error)
        }
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="card p-3">
        <h3 class="d-flex align-items-center">
            <NuxtLink
                to="/user/story"
                class="text-primary me-3 d-flex align-items-center"
                ><Icon name="material-symbols:arrow-back-rounded" /></NuxtLink
            >Edit Story
        </h3>
        <form novalidate @submit.prevent="submitForm">
            <fieldset>
                <UiDynamicForm :fields="formFields" />
            </fieldset>
            <div class="d-flex justify-content-end mt-5">
                <UiButton
                    type="nuxt-link"
                    to="/user/story"
                    class="btn-outline-primary fw-semibold me-2"
                    >Cancel</UiButton
                >
                <UiButton
                    type="submit"
                    :loading="isLoading"
                    class="btn-primary fw-semibold"
                    >Save</UiButton
                >
            </div>
        </form>
    </div>
</template>
