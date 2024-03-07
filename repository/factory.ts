// 3rd's
import type { $Fetch, FetchOptions, FetchContext } from "ofetch"

/*
 The FetchFactory acts as a wrapper around an HTTP client. 
 It encapsulates the functionality for making API requests asynchronously 
 through the call function, utilizing the provided HTTP client.
*/
class FetchFactory<T> {
    private $fetch: $Fetch

    constructor(fetcher: $Fetch) {
        this.$fetch = fetcher
    }

    /**
     * The HTTP client is utilized to control the process of making API requests.
     * @param method the HTTP method (GET, POST, ...)
     * @param url the endpoint url
     * @param data the body data
     * @param fetchOptions fetch options
     * @returns
     */
    async call(
        method: string,
        url: string,
        data?: object,
        fetchOptions?: FetchOptions<"json">,
    ): Promise<T> {
        const jwt = useCookie("jwt")
        return this.$fetch<T>(url, {
            method,
            body: data,
            ...fetchOptions,
            async onRequest({ options }: FetchContext) {
                /* Apply JWT before Request if exist */
                if (!jwt.value) return

                const headers = new Headers(options.headers)
                headers.set("Authorization", `Bearer ${jwt.value}`)

                options.headers = headers
            },
            async onResponseError({ response }: FetchContext) {
                /* Remove Token on Error Code 401 */
                if (response && response.status == 401) {
                    jwt.value = null
                }
            },
        })
    }
}

export default FetchFactory
