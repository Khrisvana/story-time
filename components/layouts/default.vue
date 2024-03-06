<script lang="ts" setup>
const auth = useAuthStore()

await useAsyncData(() => auth.getUser())

const user = computed(() => {
    return auth.user_profile
})
</script>

<template>
    <div>
        <UiNavbar :user="user"/>
        <div class="container mb-5">
            <slot />
        </div>
        <UiFooter />
    </div>
</template>
