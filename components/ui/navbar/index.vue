<script lang="ts" setup>
const props = defineProps<{ user: any }>()
</script>

<template>
    <nav
        class="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow-sm"
    >
        <div class="container">
            <NuxtLink class="navbar-brand" to="/">
                <img src="/images/logo.svg" alt="Logo" />
            </NuxtLink>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="!user">
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
                            link="/register"
                            class="fw-semibold btn-primary d-flex align-items-center"
                            ><Icon name="material-symbols:account-circle" class="me-2 fs-5" />{{
                                user?.name
                            }}</UiButton
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.navbar {
    z-index: 1024;
}

.nav-item {
    padding: 0 0.25rem;
}
</style>
