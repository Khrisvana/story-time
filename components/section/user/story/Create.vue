<script setup lang="ts">
import ApiUnauthenticatedException from "~/exceptions/ApiUnauthenticatedException"
import { fields, validationSchema } from "~/forms/StoryForm"

const toast = useToast()
const { $api } = useNuxtApp()

const { values, handleSubmit } = useForm({
    validationSchema: validationSchema,
})

const isLoading = ref(false)
const formFields: Ref<any> = ref([])

const { data: categoryData, error } = await $api.category.getCategories()

if (error.value instanceof ApiUnauthenticatedException) {
    toast.error(error.value.data().error.message)
} else {
    console.log(error)
}

const categoryOptions = categoryData.value.data.map(
    (item: any, index: string | number) => {
        return { value: item.id, name: item.name }
    },
)
formFields.value = fields(categoryOptions)

const submitForm = handleSubmit(async (values) => {
    try {
        isLoading.value = true
        const { data: storyData } = await $api.stories.createStory({
            title: values.title,
            content: values.content,
            category: values.category,
        })

        const image_payload = new FormData()
        image_payload.append("refId", storyData.id as string)
        image_payload.append("ref", "api::story.story")
        image_payload.append("field", "cover_image")
        image_payload.append("files", values.cover_image)

        await $api.stories.uploadStoryImage(image_payload)

        toast.success('Successful create story')

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
            <NuxtLink to="/user/story"
                class="text-primary me-3 d-flex align-items-center"
                ><Icon name="material-symbols:arrow-back-rounded" /></NuxtLink
            >Create Story
        </h3>
        <form novalidate @submit.prevent="submitForm">
            <fieldset>
                <UiDynamicForm :fields="formFields" />
            </fieldset>
            <div class="d-flex justify-content-end">
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
