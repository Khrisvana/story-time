import ApiException from "~/exceptions/ApiException"

export const useApiFetch: any = async (url: any, options?: any) => {
    const config = useRuntimeConfig()

    const baseURL = `${config.public.baseURL}/api/`

    try {
        return await $fetch(url, { baseURL: baseURL, ...options })
    } catch (error: any) {
        throw new ApiException({
            message: "Api Error",
            response: error.response,
            status_code: error.status,
            error: error,
        })
    }
}
