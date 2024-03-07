import { string, object } from "yup"

export const validationSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
    biodata: string().nullable(),
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
        label: "Email",
        id: "id-email",
        name: "email",
        type: "email",
        placeholder: "Enter email",
        disabled: true
    },
    {
        label: "About Me",
        id: "id-biodata",
        name: "biodata",
        type: "textarea",
        placeholder: "Enter about me",
    },
]