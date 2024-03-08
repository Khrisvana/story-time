<script setup lang="ts">
definePageMeta({
    middleware: ["unauthenticated"],
})
</script>

<template>
    <div class="main-wrapper">
        <div class="content row justify-content-center login">
            <!-- SECTION LOGIN -->
            <SectionLogin />
            <!-- !SECTION LOGIN -->
        </div>
    </div>
</template>
