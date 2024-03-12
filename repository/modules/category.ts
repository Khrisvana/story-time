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

class CategoryModule extends FetchFactory<any> {
    private RESOURCE = "/categories"

    /**
     * Return the stories as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */
    async getCategories(
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
}

export default CategoryModule
