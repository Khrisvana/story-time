import { string, object, ref } from "yup"

export const validationSchema = object().shape({
    name: string().required(),
    username: string().required().min(3),
    email: string().email().required(),
    password: string().required().min(6),
    password_confirmation: string().required().min(6).oneOf([ref('password')], "password don't match"),
})

export let fields = [
    {
        label: "Name",
        id: "id-name",
        name: "name",
        type: "text",
        placeholder: "Enter name",
    },
    {
        label: "Username",
        id: "id-username",
        name: "username",
        type: "text",
        placeholder: "Enter username",
    },
    {
        label: "Email",
        id: "id-email",
        name: "email",
        type: "email",
        placeholder: "Enter email",
    },
    {
        label: "Password",
        id: "id-password",
        name: "password",
        type: "password",
        placeholder: "Enter password",
    },
    {
        label: "Password Confirmation",
        id: "id-password_confirmation",
        name: "password_confirmation",
        type: "password",
        placeholder: "Enter password confirmation",
    },
]