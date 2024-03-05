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
}

export {}