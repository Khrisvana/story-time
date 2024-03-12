<script lang="ts" setup>
definePageMeta({
    layout: "profile",
    middleware: ['auth']
})
</script>

<template>
    <SectionUserStoryEdit/>
</template>