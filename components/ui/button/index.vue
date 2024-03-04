<script setup lang="ts">
interface Props {
    type: string,
    link: string,
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    link: '',
})
</script>

<template>
    <button v-if="type == 'button'" type="button" class="btn" :class="$attrs">
        <slot />
    </button>

    <button v-else-if="type == 'submit'" type="submit" class="btn" :class="$attrs">
        <slot />
    </button>

    <NuxtLink v-else-if="type == 'nuxt-link'" :to="link" class="btn" :class="$attrs">
        <slot />
    </NuxtLink>

    <a v-else-if="type == 'link'" :href="link" class="btn" :class="$attrs">
        <slot />
    </a>
</template>

<style lang="scss" scoped>
    .btn {
        border-radius: 0;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
</style>