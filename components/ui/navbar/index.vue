<script lang="ts" setup>
const user = useUserStore()
</script>

<template>
    <nav
        class="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow-sm"
    >
        <div class="container">
            <NuxtLink class="navbar-brand" to="/">
                <img src="/images/logo.svg" alt="Logo" />
            </NuxtLink>
            <div>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="!user.user">
                    <li class="nav-item">
                        <UiButton
                            type="nuxt-link"
                            link="/register"
                            class="fw-semibold btn-outline-primary"
                            >Register</UiButton
                        >
                    </li>
                    <li class="nav-item">
                        <UiButton
                            type="nuxt-link"
                            link="/login"
                            class="fw-semibold btn-primary"
                            >Login</UiButton
                        >
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-else>
                    <li class="nav-item">
                        <UiButton
                            type="nuxt-link"
                            link="/user"
                            class="fw-semibold btn-primary d-flex align-items-center"
                            ><Icon
                                name="material-symbols:account-circle"
                                class="me-2 fs-5"
                            />{{ user.user?.name }}</UiButton
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
    >
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                Navigation
            </h5>
            <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body">
            <template v-if="!user.user">
                <div data-bs-dismiss="offcanvas" aria-label="Close">
                    <UiButton
                        type="nuxt-link"
                        link="/register"
                        class="fw-semibold w-100 mb-3 btn-outline-primary"
                        >Register</UiButton
                    >
                </div>
                <div data-bs-dismiss="offcanvas" aria-label="Close">
                    <UiButton
                        type="nuxt-link"
                        link="/login"
                        class="fw-semibold w-100 btn-primary"
                        >Login</UiButton
                    >
                </div>
            </template>
            <div v-else data-bs-dismiss="offcanvas" aria-label="Close">
                <UiButton
                    type="nuxt-link"
                    link="/user"
                    class="fw-semibold btn-primary d-flex justify-content-center align-items-center"
                    ><Icon
                        name="material-symbols:account-circle"
                        class="me-2 fs-5"
                    />{{ user.user?.name }}</UiButton
                >
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navbar {
    min-height: $default-content-margin-top;

    &-brand img {
        @include media-breakpoint-down(sm) {
            height: 40px;
        }
    }
}

.nav-item {
    padding: 0 0.25rem;
}
</style>
