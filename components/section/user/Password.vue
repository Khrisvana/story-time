<script setup lang="ts">
const displayEdit: Ref<boolean> = ref(false)
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0">Password</h3>
                <div>
                    <UiButton
                        v-if="!displayEdit"
                        @click="displayEdit = true"
                        type="button"
                        class="btn-outline-primary d-flex align-items-center"
                        ><Icon
                            name="material-symbols:edit-square-outline"
                            class="me-2"
                        />
                        Change Password</UiButton
                    >
                </div>
            </div>
            <SectionUserPasswordForm class="mt-4" v-if="displayEdit" v-model="displayEdit" />

        </div>
    </div>
</template>
