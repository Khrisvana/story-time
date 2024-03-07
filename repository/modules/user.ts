// 3rd's
import type { FetchOptions } from "ofetch"
import type { AsyncDataOptions } from "#app"

// locals
import FetchFactory from "../factory"

type IApiResponse = {
    data: any
    error?: any
}

class UserModule extends FetchFactory<any> {
    private RESOURCE = "/users/me"

    /**
     * Return the stories as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */
    async getUser(
        opt?: FetchOptions<"json">,
        asyncDataOptions?: AsyncDataOptions<IApiResponse>
    ) {
        return await useAsyncData(async () => {
            const url = `${this.RESOURCE}`
            return await this.call(
                "GET",
                url,
                undefined, // body
                opt,
            )
        }, asyncDataOptions)
    }

    async updateUser(
        payload: object | FormData,
        opt?: FetchOptions<"json">
    ) {
        const url = `${this.RESOURCE}`
        return await this.call(
            "PATCH",
            url,
            payload, // body
            opt,
        )
    }
}

export default UserModule
