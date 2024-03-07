<script setup lang="ts">
import ApiException from "~/exceptions/ApiException"
import { fields, validationSchema } from "~/forms/LoginForm"

const jwt = useCookie("jwt")
const { $api } = useNuxtApp()
const toast = useToast()
const { handleSubmit } = useForm({
    validationSchema: validationSchema,
})

const isLoading = ref(false)

const submitForm = handleSubmit(async (values) => {
    try {
        isLoading.value = true
        const result = await $api.auth.login(values)
        jwt.value = result.data.jwt ?? null
        await navigateTo({ path: "/" })
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

const formFields: Ref<Array<IDynamicField>> = ref(fields)
</script>

<template>
    <form @submit.prevent="submitForm" class="col-12 col-lg-5" novalidate>
        <fieldset class="card p-4">
            <h1 class="fs-3 fw-semibold">Login</h1>
            <UiDynamicForm :fields="formFields" />

            <UiButton
                :loading="isLoading"
                type="submit"
                class="btn-primary fs-5 mb-3 fw-semibold"
                >Login</UiButton
            >
            <p>
                Don't have an account yet ?
                <NuxtLink to="/register" class="fw-semibold text-primary"
                    >Register</NuxtLink
                >
            </p>
        </fieldset>
    </form>
</template>

<style lang="scss" scoped>
.login {
    &__success-img {
        width: 50%;
        max-width: 100%;
    }

    &__success-desc {
        text-transform: uppercase;
        font-weight: bold;
    }
}
</style>
