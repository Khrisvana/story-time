<script setup lang="ts">
type Props = {
    label?: string
    id?: string
    name: string
    placeholder?: string
    disabled?: boolean
}

const model = defineModel()
const type = ref("password")
const icon = ref("material-symbols:visibility-rounded")
const props = defineProps<Props>()

const toggleShowPassword = () => {
    if (type.value == "password") {
        icon.value = "material-symbols:visibility-off-rounded"
        type.value = "text"
        return
    }

    icon.value = "material-symbols:visibility-rounded"
    type.value = "password"
}
</script>

<template>
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <div class="input-group password">
        <Field :name v-slot="{ errors, field }" v-bind="$attrs">
            <input
                :id
                v-bind="field"
                :disabled="disabled"
                :placeholder
                :type
                class="form-control border-end-0 password__input"
                :class="{ 'is-invalid': errors.length > 0 }"
                v-model="model"
            />
        </Field>
        <UiButton
            class="input-group-text text-secondary border border-start-0 fs-5 password__toggle"
            @click="toggleShowPassword"
            type="button"
            ><Icon :name="icon"
        /></UiButton>
    </div>
    <ErrorMessage :name class="d-block invalid-feedback" />
</template>

<style lang="scss" scoped>
@use "assets/styles/main" as v;

.password {
    $p: &;

    &__input:hover,
    &__input:focus {
        & ~ #{$p}__toggle {
            border-color: $primary !important;
        }
    }

    &__toggle {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 1rem;
        padding-right: 1rem;

        #{$p}__input.is-invalid ~ & {
            border-color: $danger !important;
        }
    }
}
</style>
