<script setup lang="ts">
definePageMeta({
    layout: "profile",
})
</script>

<template>
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0">My Profile</h3>
                <div>
                    <UiButton class="btn-outline-primary"
                        >Edit Profile</UiButton
                    >
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-lg-4 col-12">test</div>
                <div class="col-lg-8 col-12">tost</div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0">Password</h3>
                <div>
                    <UiButton class="btn-outline-primary"
                        >Change Password</UiButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>
