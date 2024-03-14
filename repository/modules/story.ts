// 3rd's
import type { FetchOptions } from "ofetch"
import type { AsyncDataOptions } from "#app"

// locals
import FetchFactory from "../factory"

type IApiResponse = {
    data: IStory[],
    meta: {
        pagination: IPagination
    }
}

type IApiResponseDetail = {
    data: IStory,
}

class StoryModule extends FetchFactory<any> {
    private RESOURCE = "/stories"
    private UPLOAD = '/upload'

    /**
     * Return the stories as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */
    async getStories(
        opt?: FetchOptions<"json">,
        asyncDataOptions?: AsyncDataOptions<any>,
    ) {
        return await useAsyncData(async () => {
            const url = `${this.RESOURCE}`

            return await this.call(
                "GET",
                url,
                undefined, // body
                opt,
                false
            )
        }, asyncDataOptions)
    }

    async getStory(
        id: string | string[] | number,
        opt?: FetchOptions<"json">,
        asyncDataOptions?: AsyncDataOptions<IApiResponseDetail>,
    ) {
        return await useAsyncData(async () => {
            const url = `${this.RESOURCE}/${id}`
            return await this.call(
                "GET",
                url,
                undefined, // body
                opt,
                false
            )
        }, asyncDataOptions)
    }

    async createStory(payload: object | FormData, opt?: FetchOptions<"json">) {
        const url = `${this.RESOURCE}`
        return await this.call(
            "POST",
            url,
            payload, // body
            opt,
        )
    }

    async updateStory(id: string | string[] | number, payload: object | FormData, opt?: FetchOptions<"json">) {
        const url = `${this.RESOURCE}/${id}`
        return await this.call(
            "PUT",
            url,
            payload, // body
            opt,
        )
    }

    async deleteStory(id: string | string[] | number, opt?: FetchOptions<"json">) {
        const url = `${this.RESOURCE}/${id}`
        return await this.call(
            "DELETE",
            url,
            undefined, // body
            opt,
        )
    }

    async uploadStoryImage(payload: object | FormData, opt?: FetchOptions<"json">) {
        const url = `${this.UPLOAD}`
        return await this.call(
            "POST",
            url,
            payload, // body
            opt,
        )
    }

    async deleteStoryImage(cover_image_id: string, opt?: FetchOptions<"json">) {
        const url = `${this.UPLOAD}/files/${cover_image_id}`
        return await this.call(
            "DELETE",
            url,
            undefined, // body
            opt,
        )
    }
}

export default StoryModule
