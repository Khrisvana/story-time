<template>
    <aside class="card sidebar d-flex flex-column p-0">
        <UiButton class="sidebar__btn btn-outline-light">My Profile</UiButton>
        <UiButton class="sidebar__btn btn-outline-light">Story List</UiButton>
        <UiButton class="sidebar__btn btn-outline-light border-bottom-0">Bookmark</UiButton>
        <div class="w-100 px-2 py-2">
            <UiButton class="sidebar__btn btn-outline-danger fw-semibold">Logout</UiButton>
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
        padding-top: .75rem;
        padding-bottom: .75rem;
        
        &.btn-outline-light {
            color: v.$secondary;
            &:hover, &:focus-visible {
                color: black;
            }
        }

    }
}
</style>