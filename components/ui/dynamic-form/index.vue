<script setup lang="ts">
type Props = {
    fields: DynamicField[]
}

const props = defineProps<Props>()
</script>
<template>
    <div
        class="mb-3"
        v-for="{
            id,
            name,
            label,
            placeholder,
            type,
            ...attrs
        } in fields"
        :key="name"
    >
        <label :for="id" class="form-label">{{ label }}</label>

        <!-- INPUT -->
        <Field
            v-if="type != 'password'"
            :name
            v-slot="{ errors, field }"
            :="attrs"
        >
            <input
                :id
                :type
                v-bind="field"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.length > 0 }"
                :placeholder
                :aria-label="placeholder"
            />

            <ErrorMessage v-bind="field" class="d-block invalid-feedback" />
        </Field>
        <!-- INPUT -->

        <!-- PASSWORD INPUT -->
        <UiInputPassword
            v-else-if="type == 'password'"
            class="mb-3"
            v-bind="attrs"
            :id
            :name
            :type
            :placeholder
            :aria-label="placeholder"
        />
        <!-- !PASSWORD INPUT -->
    </div>
</template>
