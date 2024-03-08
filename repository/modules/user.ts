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
    private UPLOAD = '/upload'

    /**
     * Return the stories as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */
    async getUser(
        opt?: FetchOptions<"json">,
        asyncDataOptions?: AsyncDataOptions<IApiResponse>,
    ) {
        return await useAsyncData(async () => {
            const url = `${this.RESOURCE}`
            return await this.call(
                "GET",
                url,
                undefined, // body
                opt
            )
        }, asyncDataOptions)
    }

    async updateUser(payload: object | FormData, opt?: FetchOptions<"json">) {
        const url = `${this.RESOURCE}`
        return await this.call(
            "PATCH",
            url,
            payload, // body
            opt,
        )
    }

    async resetPassword(payload: object | FormData, opt?: FetchOptions<"json">) {
        const url = `${this.RESOURCE}/reset-password`
        return await this.call(
            "POST",
            url,
            payload, // body
            opt,
        )
    }

    async uploadProfile(payload: object | FormData, opt?: FetchOptions<"json">) {
        const url = `${this.UPLOAD}`
        return await this.call(
            "POST",
            url,
            payload, // body
            opt,
        )
    }

    async deleteProfilePicture(profile_pic_id: string, opt?: FetchOptions<"json">) {
        const url = `${this.UPLOAD}/files/${profile_pic_id}`
        return await this.call(
            "DELETE",
            url,
            undefined, // body
            opt,
        )
    }
}

export default UserModule
