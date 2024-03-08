<script setup lang="ts">
definePageMeta({
    layout: "profile",
    middleware: ['auth']
})
</script>

<template>
    <SectionUserStory/>
</template>
