<script setup lang="ts">
const displayEdit: Ref<boolean> = ref(false)
</script>

<template>
    <div class="card">
        <div class="card-header">
            <h3 class="mb-3 mb-md-0 card-header__title">Password</h3>
            <div>
                <UiButton
                    v-if="!displayEdit"
                    @click="displayEdit = true"
                    type="button"
                    class="btn-outline-primary card-header__button"
                    ><Icon
                        name="material-symbols:edit-square-outline"
                        class="me-2"
                    />
                    Change Password</UiButton
                >
            </div>
        </div>
        <div class="card-body" v-if="displayEdit">
            <SectionUserPasswordForm
                v-model="displayEdit"
            />
        </div>
    </div>
</template>
