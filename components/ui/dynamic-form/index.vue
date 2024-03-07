<script setup lang="ts">
type Props = {
    fields: IDynamicField[]
}

const props = defineProps<Props>()
</script>
<template>
    <div
        class="mb-3"
        v-for="{ id, name, label, placeholder, disabled, type, ...attrs } in fields"
        :key="name"
    >
        <label :for="id" class="form-label">{{ label }}</label>

        <!-- PASSWORD INPUT -->
        <UiInputPassword
            v-if="type == 'password'"
            class="mb-3"
            v-bind="attrs"
            :id="id"
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :aria-label="placeholder"
            :disabled="disabled"
        />
        <!-- !PASSWORD INPUT -->

        <!-- INPUT -->
        <Field
            v-else-if="type == 'textarea'"
            :name="name"
            v-slot="{ errors, field }"
            :="attrs"
        >
            <textarea
                :id="id"
                v-bind="field"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.length > 0 }"
                :placeholder="placeholder"
                :aria-label="placeholder"
                :disabled="disabled"
                rows="5"
            ></textarea>
            <ErrorMessage v-bind="field" class="d-block invalid-feedback" />
        </Field>
        <!-- INPUT -->

        <!-- INPUT -->
        <Field v-else :name="name" v-slot="{ errors, field }" :="attrs">
            <input
                :id="id"
                :type="type"
                v-bind="field"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.length > 0 }"
                :placeholder="placeholder"
                :aria-label="placeholder"
                :disabled="disabled"
            />

            <ErrorMessage v-bind="field" class="d-block invalid-feedback" />
        </Field>
        <!-- INPUT -->
    </div>
</template>
