<template>
    <aside class="card sidebar d-flex flex-column p-0">
        <UiButton type="button" class="sidebar__btn btn-outline-light"
            ><Icon name="material-symbols:account-circle-outline" class="fs-5 me-2" />
            My Profile</UiButton
        >
        <UiButton type="button" class="sidebar__btn btn-outline-light"
            ><Icon
                name="material-symbols-light:list-alt-outline"
                class="fs-5 me-2"
            />Story List</UiButton
        >
        <UiButton
            type="button"
            class="sidebar__btn btn-outline-light border-bottom-0"
            ><Icon
                name="material-symbols:bookmark-outline"
                class="fs-5 me-2"
            />Bookmark</UiButton
        >
        <div class="w-100 px-2 py-2">
            <UiButton
                type="button"
                class="sidebar__btn btn-outline-danger fw-semibold"
                >Logout</UiButton
            >
        </div>
    </aside>
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
