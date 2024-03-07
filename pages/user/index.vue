<script setup lang="ts">
definePageMeta({
    layout: "profile",
    middleware: ['auth']
})
</script>

<template>
    <!-- SECTION USER -->
    <SectionUser />
    <!-- !SECTION USER -->
</template>
