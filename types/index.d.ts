declare global {
    interface IStory {
        id: number
        title: string
        content: string

        author: any
        category: any
        cover_image: any

        createdAt: string
        updatedAt: string
    }

    interface IUser {
        id: number | string | string[]
        username: string
        email: string
        provider: string
        confirmed: boolean
        blocked: boolean
        name: string
        createdAt: string
        updatedAt: string
        biodata: string
        profile_picture: any
    }

    interface IResetPassword {
        old_password: string
        password: string
        password_confirmation: string
    }

    interface IPagination {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }

    interface IDynamicField {
        label?: string
        id: string
        name: string
        type: string
        placeholder: string
        disabled?: boolean
        options?: { value: string; name: string, disabled?: boolean }[] | undefined
    }

    interface IDynamicInputSchema {
        fields: IDynamicField[]
    }
}

export {}
