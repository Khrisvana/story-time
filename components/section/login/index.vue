<script setup lang="ts">
import ApiException from "~/exceptions/ApiException"
import { fields, validationSchema } from "~/forms/LoginForm"

const toast = useToast()
const auth = useAuthStore()
const { handleSubmit } = useForm({
    validationSchema: validationSchema,
})

const submitForm = handleSubmit(async (values) => {
    try {
        await auth.login(values)
        await navigateTo({ path: "/" })
    } catch (error: any) {
        if (error instanceof ApiException) {
            toast.error(error.data().error.message)
        } else {
            console.log(error)
        }
    }
})

const formFields: Ref<Array<DynamicField>> = ref(fields)
</script>

<template>
    <form @submit.prevent="submitForm" class="col-12 col-lg-5" novalidate>
        <fieldset class="card p-4">
            <h1 class="fs-3 fw-semibold">Login</h1>
            <UiDynamicForm :fields="formFields" />

            <UiButton type="submit" class="btn-primary fs-5 mb-3 fw-semibold"
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
