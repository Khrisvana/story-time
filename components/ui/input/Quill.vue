<script lang="ts" setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
if (process.client) {
    const { QuillEditor } = await import("@vueup/vue-quill")
    const { vueApp } = useNuxtApp()
    vueApp.component("QuillEditor", QuillEditor)
}

type Props = {
    label?: string
    id?: string
    name: string
    placeholder?: string
    disabled?: boolean
}

const quill = ref()
const inputValue: Ref<any> = ref()
const props = defineProps<Props>()

const contentChange = (content: any) => {
    inputValue.value = content
}

const initQuill = (value: string) => {
    quill.value.setContents(value)    
}

</script>

<template>
    <Field
        :name="name"
        v-slot="{ errors, field }"
        :="$attrs"
        v-model="inputValue"
    >
        <label :for="id" class="form-label">{{ label }}</label>
        <ClientOnly>
            <div class="quill-wrapper" :class="{ invalid: errors.length > 0 }">
                <QuillEditor    
                    ref="quill"
                    contentType="html"
                    theme="snow"
                    :placeholder="placeholder"
                    @update:content="contentChange"
                    @ready="initQuill(field.value)"
                />
                <input type="hidden" :name="name" :id="id" />
            </div>
        </ClientOnly>
        <ErrorMessage v-bind="field" class="d-block invalid-feedback" />
    </Field>
</template>
