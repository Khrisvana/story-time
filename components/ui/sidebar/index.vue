<script lang="ts" setup>
const { $bModal } = useNuxtApp()
const userStore = useUserStore()
const bookmark = useBookmarkStore()

const logoutUser = () => {
    $bModal.hide("logout-modal")
    userStore.logout()
    bookmark.clearBookmark()
}
</script>

<template>
    <aside class="card sidebar d-flex flex-column p-0">
        <UiButton
            type="nuxt-link"
            to="/user"
            class="sidebar__btn btn-outline-light"
            ><Icon
                name="material-symbols:account-circle-outline"
                class="fs-5 me-2"
            />
            My Profile</UiButton
        >
        <UiButton
            type="nuxt-link"
            to="/user/story"
            class="sidebar__btn btn-outline-light"
            ><Icon
                name="material-symbols-light:list-alt-outline"
                class="fs-5 me-2"
            />Story List</UiButton
        >
        <UiButton
            type="nuxt-link"
            to="/user/bookmark"
            class="sidebar__btn btn-outline-light border-bottom-0"
            ><Icon
                name="material-symbols:bookmark-outline"
                class="fs-5 me-2"
            />Bookmark</UiButton
        >
        <div class="w-100 px-2 py-2">
            <UiButton
                @click="$bModal.show('logout-modal')"
                type="button"
                class="sidebar__btn btn-outline-danger fw-semibold d-flex justify-content-between"
                ><span>Logout</span>
                <Icon name="material-symbols:logout-rounded" class="fs-5"
            /></UiButton>
        </div>
    </aside>

    <UiModal id="logout-modal" title="Logout">
        <p class="mb-0">Are you sure want to logout?</p>
        <template #footer>
            <UiButton
                class="rounded-0 fw-semibold px-3 btn-outline-primary me-2"
                @click="$bModal.hide('logout-modal')"
                >Cancel</UiButton
            >
            <UiButton
                class="rounded-0 fw-semibold px-3 btn-primary"
                @click="logoutUser"
                >Logout</UiButton
            >
        </template>
    </UiModal>
</template>

<style lang="scss" scoped>
@use "assets/styles/main" as v;

.sidebar {
    &__btn {
        width: 100%;
        border-radius: 0;
        text-align: left;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        display: flex;
        align-items: center;

        &.btn-outline-light {
            color: v.$secondary;
            &:hover,
            &:focus-visible {
                color: black;
            }
        }
    }
}
</style>
