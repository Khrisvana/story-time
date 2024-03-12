import { string, object } from "yup"

export const validationSchema = object().shape({
    title: string().required().label('Title'),
    category: string().required().label('Category'),
    content: string().required().label('Content'),
    cover_image: string().required().label('Cover Image'),
}) 

export let fields = (category_options: object[]) => {
    return [
        {
            label: "Title",
            id: "id-title",
            name: "title",
            type: "text",
            placeholder: "Enter title",
        },
        {
            label: "Category",
            id: "id-category",
            name: "category",
            type: "select",
            placeholder: "Enter category",
            options: [
                {
                    disabled: true,
                    value: '',
                    name: 'Select a category'
                },
                ...category_options
            ] 
        },
        {
            label: "Content",
            id: "id-content",
            name: "content",
            type: "quill-editor",
            placeholder: "Insert text here...",
        },
        {
            label: "Cover Image",
            id: "id-cover_image",
            name: "cover_image",
            type: "image",
            placeholder: "Enter cover image",
        },
    ]
}