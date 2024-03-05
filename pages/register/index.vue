<script setup lang="ts">
import { string } from "yup";

const inputs = ref({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
})

const submitForm = function (event: Event) {
    const data = new FormData(event.target as HTMLFormElement)
}

const formSchema = ref({
    fields: [
        {
            label: "Name",
            id: "id-name",
            name: "name",
            as: "input",
            type: "text",
            placeholder: "Enter name",
            rules: string().required()
        },
        {
            label: "Username",
            id: "id-username",
            name: "username",
            as: "input",
            type: "input",
            placeholder: "Enter username",
            rules: string().required()
        },
        {
            label: "Email",
            id: "id-email",
            name: "email",
            as: "input",
            type: "email",
            placeholder: "Enter email",
            rules: string().email().required()
        },
        {
            label: "Password",
            id: "id-password",
            name: "password",
            as: "input",
            type: "password",
            placeholder: "Enter password",
            rules: string().required()
        },
        {
            label: "Password Confirmation",
            id: "id-password-confirmation",
            name: "password-confirmation",
            as: "input",
            type: "password",
            placeholder: "Enter password confirmation",
            rules: string().required()
        },
    ],
})
const form = useForm()
</script>

<template>
    <div class="main-wrapper">
        <div class="content row justify-content-center">
            <form
                @submit.prevent="submitForm"
                class="col-12 col-lg-5"
                :validation-schema="formSchema"
            >
                <fieldset class="card p-4">
                    <h1 class="fs-3 fw-semibold">Register</h1>
                    <UiDynamicForm :schema="formSchema" :errors="form.errors"/>

                    <UiButton class="btn-primary fs-5 mb-3 fw-semibold"
                        >Register</UiButton
                    >
                    <p>
                        Already have account ?
                        <a href="#" class="fw-semibold text-primary">Login</a>
                    </p>
                </fieldset>
            </form>
        </div>
    </div>
</template>
