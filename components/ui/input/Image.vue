<script setup lang="ts">
type Props = {
    label?: string
    id?: string
    name: string
    placeholder?: string
    disabled?: boolean
}

const config = useRuntimeConfig()
const toast = useToast()
const model = defineModel()

const displayImage = ref(false)
const picInput = ref()
const picPreview = ref()

const props = defineProps<Props>()

function selectFile(e: Event) {
    // Reset last selection and results
    let allowedExtension = ["image/jpeg", "image/jpg", "image/png"]

    // Get selected files
    const { files } = e.target as HTMLInputElement
    if (!files || !files.length) return

    // Convert to dataURL and pass to the cropper component
    const file = files[0]

    if (!allowedExtension.includes(file.type)) {
        picInput.value.value = ""
        model.value = ""
        return toast.error("Accepted image format is only .png .jpg and .jpeg")
    }

    if (file.size / 1_000_000 > 2) {
        picInput.value.value = ""
        model.value = ""
        return toast.error("Maximum file size is 2MB")
    }

    displayImage.value = true

    model.value = file
}

function removeImage() {
    displayImage.value = false
    picInput.value.value = ""
    model.value = ""
}

function getImage(file: string | File) {
    if (typeof file == 'string') {
        return config.public.baseURL + file
    } else if (typeof file == 'object') {
        return URL.createObjectURL(file)
    }

    return ''
}
</script>

<template>
    <p v-if="label" class="form-label">{{ label }}</p>
    <div class="image-input">
        <Field v-model="model" :name v-slot="{ errors, field }">
            <label :for="id" class="image-input__label" v-show="!displayImage && !field.value" :class="{'invalid': errors.length > 0}">
                <Icon name="material-symbols:add-circle-rounded" class="fs-5" />
                Add Image
            </label>
            <div class="image-input__preview" v-show="displayImage || field.value">
                <img :src="getImage(field.value)" alt="preview" ref="picPreview" class="w-100 h-100 image-input__preview-image" />
            </div>
            <input
                ref="picInput"
                type="file"
                :name
                :id
                class="d-none form-control"
                accept="image/jpeg,image/jpg,image/png"
                @input="selectFile"
            />
            <ErrorMessage :name class="d-block invalid-feedback" />
            <div
                v-if="displayImage || field.value"
                @click="removeImage"
                class="d-flex align-items-center justify-content-center image-input__remove"
            >
                <Icon name="ic:baseline-close" />
            </div>
        </Field>
    </div>
</template>

<style lang="scss" scoped>
@use "assets/styles/main" as v;

.image-input {
    position: relative;
    width: 300px;
    max-width: 100%;
    aspect-ratio: 1 / 1;

    &__label,
    &__preview {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    &__label {
        cursor: pointer;
        border-width: 2px;
        border-style: dashed;
        border-color: $secondary;

        &.invalid {
            border-color: $danger;
        }
    }

    &__preview {
        &-image {
            object-fit: contain;
        }
    }

    &__remove {
        cursor: pointer;
        color: white;
        position: absolute;
        top: 0;
        left: 100%;
        background: $danger;
        border-radius: 100%;
        padding: 0.25rem;
        transform: translate(-50%, -50%);

        &:hover {
            background: darken($danger, 10%);
        }
    }
}
</style>
