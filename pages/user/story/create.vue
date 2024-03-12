<script lang="ts" setup>
definePageMeta({
    layout: "profile",
    middleware: ['auth']
})
</script>

<template>
    <SectionUserStoryCreate/>
</template>