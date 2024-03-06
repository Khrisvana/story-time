import ApiException from "~/exceptions/ApiException"
import type { FetchContext } from 'ofetch'

export const useApiFetch = async (url: any, opt?: any) => {
    const jwt = useCookie("jwt")
    const config = useRuntimeConfig()

    const baseURL = `${config.public.baseURL}/api/`

    // Create Fetch instance with base URL
    const fetchInstance = $fetch.create({
        baseURL: baseURL,
    })

    try {
        return await fetchInstance(url, {
            ...opt,
            async onRequest({ request, options } : FetchContext) {
                /* Apply JWT before Request if exist */
                if (!jwt.value) return 

                const headers = new Headers(options.headers)
                headers.set("Authorization", `Bearer ${jwt.value}`)

                options.headers = headers
            },
            async onResponseError({ request, options, response } : FetchContext) {
                /* Remove Cookie on Error Code 401 Above */
                if (response && response.status >= 401) {
                    jwt.value = null
                }
            },
        })
    } catch (error: any) {
        // Throw Exception on Error to handle on pages
        throw new ApiException({
            message: "Api Error",
            response: error.response,
            status_code: error.status,
            error: error,
        })
    }
}
