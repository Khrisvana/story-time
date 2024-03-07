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
            )
        }, asyncDataOptions)
    }
}

export default StoryModule
