<script lang="ts" setup>
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow-sm">
        <div class="container">
            <NuxtLink class="navbar-brand" to="/">
                <img src="/images/logo.svg" alt="Logo">
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
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <UiButton type="link" link="/" class="fw-semibold btn-outline-primary">Register</UiButton>
                    </li>
                    <li class="nav-item">
                        <UiButton type="link" link="/" class="fw-semibold btn-primary">Login</UiButton>
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
    padding: 0 .25rem;
}
</style>
