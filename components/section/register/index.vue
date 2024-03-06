<script setup lang="ts">
import ApiException from "~/exceptions/ApiException"
import { fields, validationSchema } from "~/forms/RegisterForm"

const toast = useToast()
const auth = useAuthStore()
const { handleSubmit } = useForm({
    validationSchema: validationSchema,
})
const registrationSuccess = ref(false)

const submitForm = handleSubmit(async (values) => {
    try {
        await auth.register(values)
        registrationSuccess.value = true
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
    <form
        v-if="!registrationSuccess"
        @submit.prevent="submitForm"
        class="col-12 col-lg-5"
        novalidate
    >
        <fieldset class="card p-4">
            <h1 class="fs-3 fw-semibold">Register</h1>
            <UiDynamicForm :fields="formFields" />

            <UiButton type="submit" class="btn-primary fs-5 mb-3 fw-semibold"
                >Register</UiButton
            >
            <p>
                Already have account ?
                <NuxtLink to="/login" class="fw-semibold text-primary"
                    >Login</NuxtLink
                >
            </p>
        </fieldset>
    </form>

    <div class="d-flex flex-column align-items-center w-100" v-else>
        <img
            src="/images/success.svg"
            alt="registration success"
            class="register__success-img"
        />
        <p class="register__success-desc fs-1">Registration Success</p>
        <UiButton
            type="nuxt-link"
            link="/login"
            class="btn btn-primary fw-semibold py-2 px-4"
            >Login</UiButton
        >
    </div>
</template>

<style lang="scss" scoped>
.register {
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
