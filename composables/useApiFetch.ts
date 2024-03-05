export const useApiFetch: any = async (url: any, options?: any) => {
    const config = useRuntimeConfig()

    const baseURL = `${config.public.baseURL}/api/`

    return await $fetch(url, { baseURL: baseURL, ...options })
} 