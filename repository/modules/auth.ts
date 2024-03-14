// 3rd's
import type { FetchOptions } from "ofetch"
import type { AsyncDataOptions } from "#app"

// locals
import FetchFactory from "../factory"

type IApiResponse = {
    data: any
    error?: any
}

class AuthModule extends FetchFactory<any> {
    private RESOURCE = "/auth/local"

    /**
     * Return the stories as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */
    async register(payload: object | FormData, opt?: FetchOptions<"json">) {
        const url = `${this.RESOURCE}/register`

        return this.call(
            "POST",
            url,
            payload, // body
            opt,
            false
        )
    }

    async login(payload: object | FormData, opt?: FetchOptions<"json">) {
        const url = `${this.RESOURCE}`
        const response = await useAsyncData(async () => {
            return this.call(
                "POST",
                url,
                payload, // body
                opt,
                false
            )
        })

        const jwt = useCookie("jwt")
        jwt.value = response.data.value.data.jwt ?? null
        return response
    }
}

export default AuthModule
