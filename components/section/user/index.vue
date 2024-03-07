<script setup lang="ts">
const store = useUserStore()
const config = useRuntimeConfig()
const profilePicture = computed(() => {
    if (!store.user?.profile_picture?.url) {
        return 'https://dummyimage.com/200x200/ebebeb'
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
                    <UiButton type="button" class="btn-outline-primary d-flex align-items-center"
                        ><Icon name="material-symbols:edit-square-outline" class="me-2"/>Edit Profile</UiButton
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
                    <UiButton class="profile__img-upload btn-outline-primary fw-semibold">Change Avatar</UiButton>
                </div>
                <div class="col-lg-8 col-12">
                    <table class="profile__detail">
                        <tr>
                            <th>Name</th>
                            <td>{{store.user?.name}}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{store.user?.email}}</td>
                        </tr>
                        <tr>
                            <th>Biodata</th>
                            <td>{{store.user?.biodata}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0">Password</h3>
                <div>
                    <UiButton type="button" class="btn-outline-primary d-flex align-items-center"
                        ><Icon name="material-symbols:edit-square-outline" class="me-2"/> Change Password</UiButton
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

    &-upload {
        min-width: 200px;
        max-width: 100%;
    }
  }

  &__detail {
    & th {
        padding-right: 3rem;
        font-weight: 600;
    }

    & th, & td {
        padding-bottom: 1.5rem;
    } 
  }
}
</style>
