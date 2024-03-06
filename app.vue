<script setup lang="ts">
useSeoMeta({
    title: "Story Time",
})

const auth = useAuthStore()

await useAsyncData(() => auth.getUser())
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
