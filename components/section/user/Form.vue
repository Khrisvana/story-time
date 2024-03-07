<script setup lang="ts">
import ApiException from "~/exceptions/ApiException"
import { fields, validationSchema } from "~/forms/UserDetailForm"

const toast = useToast()
const { $api } = useNuxtApp()

const props = defineProps<{ user: IUser | null }>()
const userStore = useUserStore()

const { handleSubmit } = useForm({
    validationSchema: validationSchema,
    initialValues: {
        name: props.user?.name,
        email: props.user?.email,
        biodata: props.user?.biodata,
    },
})

const model: any | undefined = defineModel()
const isLoading = ref(false)

const submitForm = handleSubmit(async (values) => {
    console.log(values)
    try {
        isLoading.value = true
        await $api.user.updateUser(values)
        const { data: userData } = await $api.user.getUser()
        userStore.setUserProfile(userData.value?.data)
    } catch (error: any) {
        if (error instanceof ApiException) {
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
    <form novalidate @submit.prevent="submitForm">
        <fieldset>
            <UiDynamicForm :fields="fields" />
        </fieldset>
        <div class="d-flex justify-content-end">
            <UiButton
                @click="model = false"
                class="btn-outline-primary me-1 fw-semibold"
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
</template>
