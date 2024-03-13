<script setup lang="ts">
definePageMeta({
    layout: "profile",
    middleware: ['auth']
})
</script>

<template>
    <SectionUserBookmark/>
</template>
