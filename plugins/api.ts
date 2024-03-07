// 3rd's
import type { FetchOptions } from "ofetch"
import { $fetch } from "ofetch"

// locals
import AuthModule from "~/repository/modules/auth"
import StoryModule from "~/repository/modules/story"
import UserModule from "~/repository/modules/user"

interface IApiInstance {
    stories: StoryModule,
    auth: AuthModule,
    user: UserModule
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const fetchOptions: FetchOptions = {
        baseURL: `${config.public.baseURL}/api/`,
    }

    // Create a new instance of $fecther with custom option
    const apiFecther = $fetch.create(fetchOptions)

    // An object containing all repositories we need to expose
    const modules: IApiInstance = {
        stories: new StoryModule(apiFecther),
        auth: new AuthModule(apiFecther),
        user: new UserModule(apiFecther),
    }

    return {
        provide: {
            api: modules,
        },
    }
})
