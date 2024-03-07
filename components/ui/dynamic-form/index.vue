<script setup lang="ts">
type Props = {
    fields: IDynamicField[]
}

const props = defineProps<Props>()
</script>
<template>
    <div
        class="mb-3"
        v-for="{ id, name, label, placeholder, type, ...attrs } in fields"
        :key="name"
    >
        <label :for="id" class="form-label">{{ label }}</label>

        <!-- INPUT -->
        <Field
            v-if="type != 'password'"
            :name="name"
            v-slot="{ errors, field }"
            :="attrs"
        >
            <input
                :id="id"
                :type="type"
                v-bind="field"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.length > 0 }"
                :placeholder="placeholder"
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
            :id="id"
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :aria-label="placeholder"
        />
        <!-- !PASSWORD INPUT -->
    </div>
</template>
