// 3rd's
import type { $Fetch, FetchOptions, FetchContext } from "ofetch"
import ApiNotFoundException from "~/exceptions/ApiNotFoundException"
import ApiUnauthenticatedException from "~/exceptions/ApiUnauthenticatedException"

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
        with_credential: boolean = true,
    ): Promise<T> {
        const jwt = useCookie("jwt")
        return this.$fetch<T>(url, {
            method,
            body: data,
            ...fetchOptions,
            async onRequest({ options }: FetchContext) {
                /* Apply JWT before Request if exist */
                if (!jwt.value && !with_credential) return

                const headers = new Headers(options.headers)
                headers.set("Authorization", `Bearer ${jwt.value}`)

                options.headers = headers
            },
            async onResponseError({ response, error, request }: FetchContext) {
                /* Remove Token on Error Code 401 */
                if (response?.status == 401) {
                    jwt.value = null
                }

                if (response?.status == 404) {
                    throw new ApiNotFoundException(error)
                }

                if (process.client) {
                    if (response?.status == 401)
                        throw new ApiUnauthenticatedException(response, error)
                }
            },
        })
    }
}

export default FetchFactory
