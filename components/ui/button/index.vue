<script setup lang="ts">
type Props = {
    type?: string
    link?: string
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: "button",
    link: "",
    loading: false,
})
</script>

<template>
    <button
        v-if="type == 'button'"
        type="button"
        class="btn"
        :disabled="loading"
    >
        <slot v-if="!loading" />
        <UiButtonLoading v-else />
    </button>

    <button
        v-else-if="type == 'submit'"
        type="submit"
        class="btn"
        :disabled="loading"
    >
        <slot v-if="!loading" />
        <UiButtonLoading v-else />
    </button>

    <NuxtLink
        v-else-if="type == 'nuxt-link'"
        :to="link"
        class="btn"
        :disabled="loading"
    >
        <slot v-if="!loading" />
        <UiButtonLoading v-else />
    </NuxtLink>

    <a
        v-else-if="type == 'link'"
        :href="link"
        class="btn"
        :disabled="loading"
    >
        <slot v-if="!loading" />
        <UiButtonLoading v-else />
    </a>

    <label
        v-else-if="type == 'label'"
        class="btn"
        :disabled="loading"
    >
        <slot v-if="!loading" />
        <UiButtonLoading v-else />
    </label>
</template>

<style lang="scss" scoped>
.btn {
    border-radius: 0;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

.btn-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
