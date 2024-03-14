<script setup lang="ts">
import ApiUnauthenticatedException from "~/exceptions/ApiUnauthenticatedException"
import { fields, validationSchema } from "~/forms/ChangePasswordForm"

const toast = useToast()
const { $api } = useNuxtApp()

const userStore = useUserStore()

const { handleSubmit } = useForm({
    validationSchema: validationSchema,
    initialValues: {},
})

const model: any | undefined = defineModel()
const isLoading = ref(false)

const submitForm = handleSubmit(async (values: object) => {
    try {
        isLoading.value = true
        
        const form_values = values as IResetPassword

        await $api.user.resetPassword({
            currentPassword: form_values.old_password,
            newPassword: form_values.password
        })
        const { data: userData } = await $api.user.getUser()
        userStore.setUserProfile(userData.value?.data)
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
