declare global {
    type Story = {
        id: number
        title: string,
        content: string,
    
        author: any,
        category: any,
        cover_image: any,
        
        createdAt: string,
        updatedAt: string,
    }    

    type DynamicField = {
        label?: string
        id: string
        name: string
        type: string
        placeholder: string
    }
    
    type DynamicInputSchema = {
        fields: DynamicField[]
    }
}

export {}