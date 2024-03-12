<script setup lang="ts">
type Props = {
    fields: IDynamicField[]
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
            disabled,
            type,
            options,
            ...attrs
        } in fields"
        :key="name"
    >
        <!-- PASSWORD INPUT -->
        <UiInputPassword
            v-if="type == 'password'"
            class="mb-3"
            v-bind="attrs"
            :id="id"
            :name="name"
            :type="type"
            :label
            :placeholder="placeholder"
            :aria-label="placeholder"
            :disabled="disabled"
        />
        <!-- !PASSWORD INPUT -->

        <!-- IMAGE INPUT -->
        <UiInputImage
            v-else-if="type == 'image'"
            class="mb-3"
            v-bind="attrs"
            :id="id"
            :name="name"
            :label
            :type="type"
            :placeholder="placeholder"
            :aria-label="placeholder"
            :disabled="disabled"
        />
        <!-- !IMAGE INPUT -->

        <!-- TEXT AREA -->
        <Field
            v-else-if="type == 'textarea'"
            :name="name"
            v-slot="{ errors, field }"
            :="attrs"
        >
            <label :for="id" class="form-label">{{ label }}</label>
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
        <!-- TEXT AREA -->

        <!-- SELECT -->
        <Field
            v-else-if="type == 'select'"
            :name="name"
            v-slot="{ errors, field }"
            :="attrs"
        >
            <label :for="id" class="form-label">{{ label }}</label>
            <select
                :id="id"
                v-bind="field"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.length > 0 }"
                :placeholder="placeholder"
                :aria-label="placeholder"
                :disabled="disabled"
                rows="5"
            >
                <option
                    :disabled="item.disabled"
                    :value="item.value"
                    v-for="(item, index) in options"
                    :key="index"
                >
                    {{ item.name }}
                </option>
            </select>
            <ErrorMessage v-bind="field" class="d-block invalid-feedback" />
        </Field>
        <!-- SELECT -->

        <!-- QUILL EDITOR -->
        <UiInputQuill
            v-else-if="type == 'quill-editor'"
            class="mb-3"
            v-bind="attrs"
            :id="id"
            :name="name"
            :label
            :type="type"
            :placeholder="placeholder"
            :aria-label="placeholder"
            :disabled="disabled"
        />
        <!-- QUILL EDITOR -->

        <!-- INPUT -->
        <Field v-else :name="name" v-slot="{ errors, field }" :="attrs">
            <label :for="id" class="form-label">{{ label }}</label>
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
