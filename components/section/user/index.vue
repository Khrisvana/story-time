<script setup lang="ts">
const store = useUserStore()
const config = useRuntimeConfig()

const display = ref({
    edit_user: false,
    change_password: false,
})

const profilePicture = computed(() => {
    if (!store.user?.profile_picture?.url) {
        return "https://dummyimage.com/200x200/ebebeb"
    }

    return config.public.baseURL + store.user?.profile_picture.url
})
</script>

<template>
    <div class="card mb-4 profile">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0">My Profile</h3>
                <div>
                    <UiButton
                        type="button"
                        class="btn-outline-primary d-flex align-items-center"
                        v-if="!display.edit_user"
                        @click="display.edit_user = true"
                        ><Icon
                            name="material-symbols:edit-square-outline"
                            class="me-2"
                        />Edit Profile</UiButton
                    >
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-4 col-12">
                    <div class="w-100 mb-3">
                        <img
                            class="profile__img rounded-circle"
                            :src="profilePicture"
                            alt="profile picture"
                        />
                    </div>
                    <SectionUserAvatar />
                </div>
                <div class="col-lg-8 col-12">
                    <table class="profile__detail" v-if="!display.edit_user">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{{ store.user?.name }}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{{ store.user?.email }}</td>
                            </tr>
                            <tr>
                                <th>Biodata</th>
                                <td>{{ store.user?.biodata }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <SectionUserForm
                        v-else
                        v-model="display.edit_user"
                        :user="store.user"
                    />
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0">Password</h3>
                <div>
                    <UiButton
                        type="button"
                        class="btn-outline-primary d-flex align-items-center"
                        ><Icon
                            name="material-symbols:edit-square-outline"
                            class="me-2"
                        />
                        Change Password</UiButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile {
    &__img {
        width: 200px;
        height: 200px;
        min-width: 200px;
        min-height: 200px;
        max-width: 100%;
        max-height: 100%;
    }

    &__detail {
        & th {
            padding-right: 3rem;
            font-weight: 600;
        }

        & th,
        & td {
            padding-bottom: 1.5rem;
        }
    }
}
</style>
