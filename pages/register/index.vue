<script setup lang="ts">
definePageMeta({
    middleware: ["unauthenticated"],
})
</script>

<template>
    <div class="main-wrapper">
        <div class="content row justify-content-center register">
            <!-- SECTION REGISTER -->
            <SectionRegister />
            <!-- SECTION REGISTER -->
        </div>
    </div>
</template>
