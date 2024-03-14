<script setup lang="ts">
const error = useError()
</script>

<template>
    <div class="main-wrapper">
        <div class="content error">
            <template v-if="error?.statusCode === 404">
                <div class="error__image">
                    <img src="/images/404.svg" alt="not found" class="w-100" />
                </div>
                <h1 class="mb-0">Page Not Found</h1>
            </template>
            <template v-else-if="error">
                <h1>Wutdahell</h1>
                <pre class="w-100">
                    {{ error }}
                </pre>
                <p>Sumting wen wong.</p>
                <p>Sorry about that.</p>
            </template>
            <div class="d-flex justify-content-center">
                <UiButton
                    v-if="error"
                    type="nuxt-link"
                    link="/"
                    class="btn-primary fw-semibold"
                    >Go Back</UiButton
                >
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    &__image {
        display: flex;
        justify-content: center;
        width: 500px;
        max-width: 100%;
    }
}
</style>
