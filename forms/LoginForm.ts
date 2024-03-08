import { string, object } from "yup"

export const validationSchema = object().shape({
    identifier: string().required().min(3).label('Email/Username'),
    password: string().required().min(6).label('Password'),
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