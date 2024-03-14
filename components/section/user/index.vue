<script setup lang="ts">
const store = useUserStore()
const config = useRuntimeConfig()

const displayEdit = ref(false)

const profilePicture = computed(() => {
    if (!store.user?.profile_picture?.url) {
        return "https://dummyimage.com/200x200/ebebeb"
    }

    return config.public.baseURL + store.user?.profile_picture.url
})
</script>

<template>
    <div class="card mb-4 profile">
        <div class="card-header">
            <h3 class="mb-3 mb-md-0 card-header__title">My Profile</h3>
            <div>
                <UiButton
                    type="button"
                    class="btn-outline-primary card-header__button"
                    v-if="!displayEdit"
                    @click="displayEdit = true"
                    ><Icon
                        name="material-symbols:edit-square-outline"
                        class="me-2"
                    />Edit Profile</UiButton
                >
            </div>
        </div>
        <div class="card-body">
            <div class="row mt-3">
                <div
                    class="col-lg-4 col-md-6 col-12 mb-3 mb-md-0 profile__avatar"
                >
                    <div class="profile__avatar-img mb-3">
                        <img
                            class="w-100 rounded-circle"
                            :src="profilePicture"
                            alt="profile picture"
                        />
                    </div>
                    <SectionUserAvatar />
                </div>
                <div class="col-lg-8 col-md-6 col-12">
                    <div class="row profile__detail" v-if="!displayEdit">
                        <div
                            class="col-12 col-md-3 fw-bold profile__detail-title"
                        >
                            Name
                        </div>
                        <div class="col-12 col-md-9 mb-3 profile__detail-info">
                            {{ store.user?.name }}
                        </div>

                        <div
                            class="col-12 col-md-3 fw-bold profile__detail-title"
                        >
                            Email
                        </div>
                        <div class="col-12 col-md-9 mb-3 profile__detail-info">
                            {{ store.user?.email }}
                        </div>

                        <div
                            class="col-12 col-md-3 fw-bold profile__detail-title"
                        >
                            Biodata
                        </div>
                        <div class="col-12 col-md-9 mb-3 profile__detail-info">
                            {{ store.user?.biodata }}
                        </div>
                    </div>
                    <SectionUserForm
                        v-else
                        v-model="displayEdit"
                        :user="store.user"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile {
    &__avatar {
        @include media-breakpoint-down(md) {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &-img {
            width: 200px;
            height: 200px;
            max-width: 100%;
            max-height: 100%;
        }
    }

    &__detail {
        &-title {
            font-weight: bold;
        }

        &-title,
        &-info {
            @include media-breakpoint-down(md) {
                text-align: center;
            }
        }
    }
}
</style>
