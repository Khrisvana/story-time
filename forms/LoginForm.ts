import { string, object } from "yup"

export const validationSchema = object().shape({
    identifier: string().required("email/username is required").min(3),
    password: string().required().min(6),
})

export let fields = [
    {
        label: "Email/Username",
        id: "id-identifier",
        name: "identifier",
        type: "text",
        placeholder: "Enter Email/Username",
    },
    {
        label: "Password",
        id: "id-password",
        name: "password",
        type: "password",
        placeholder: "Enter password",
    },
]