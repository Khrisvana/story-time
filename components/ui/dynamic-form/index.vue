<script setup lang="ts">
type DynamicField = {
    label?: string
    id: string
    name: string
    as: string
    type: string
    placeholder: string
}

type DynamicInputSchema = {
    fields: DynamicField[]
}

type Props = {
    schema: any
    errors: any
}

const props = defineProps<Props>()
const pppp = computed(() => {
    const test = props.errors
    return  test
})
</script>
<template>
    <div class="mb-3" v-for="{ id, as, name, label, children, placeholder, type,  ...attrs } in schema.fields" :key="name">
        <label :for="id" class="form-label">{{ label }}</label>

        <!-- INPUTS -->
        <Field
            v-if="type != 'password'"
            :as
            :id
            :name
            :type
            v-bind="attrs"
            required
            class="form-control"
            :class="{'is-invalid': errors[name]}"
            :placeholder
            :aria-label="placeholder"
        />

        <UiInputPassword
            v-else-if="type == 'password'"
            class="mb-3"
            v-bind="attrs"
            :id
            :name
            :type
            :placeholder
            :aria-label="placeholder"
            :error="errors[name]"
        />
        <!-- !INPUTS -->
        {{pppp}}
        <!-- ERROR MESSAGE -->
        <ErrorMessage :name class="d-block invalid-feedback" v-if=" type != 'password'"/>
        <!-- !ERROR MESSAGE -->
    </div>
</template>
