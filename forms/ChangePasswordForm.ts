import { string, object, ref } from "yup"

export const validationSchema = object().shape({
    old_password: string().required().min(6).label('Old Password'),
    password: string().required().min(6).label('New Password'),
    password_confirmation: string().required().min(6).oneOf([ref('password')], "password don't match").label('Password Confirmation'),
})

export let fields = [
    {
        label: "Old Password",
        id: "id-old_password",
        name: "old_password",
        type: "password",
        placeholder: "Enter old password",
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