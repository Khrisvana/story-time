<template>
    <div class="d-flex w-100 align-items-center flex-column py-3 not-found">
        <div class="not-found__img mb-3">
            <img src="/images/empty-data.svg" class="w-100" alt="not found" />
        </div>
        <h5 class="mb-0 fw-semibold">Not Found</h5>
    </div>
</template>

<style lang="scss" scoped>
.not-found {
    &__img {
        width: 250px;
        max-width: 100%;
    }
}
</style>