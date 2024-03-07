<script lang="ts" setup>
import VuePictureCropper from "vue-picture-cropper"

const pic = ref()
const result = reactive({
    dataURL: "",
    blobURL: "",
})

/**
 * Select the picture to be cropped
 */
function selectFile(e: Event) {
    // Reset last selection and results
    pic.value = ""
    result.dataURL = ""
    result.blobURL = ""

    // Get selected files
    const { files } = e.target as HTMLInputElement
    if (!files || !files.length) return

    // Convert to dataURL and pass to the cropper component
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        // Update the picture source of the `img` prop
        pic.value = String(reader.result)

        // Show the modal
        // isShowModal.value = true

        // // Clear selected files of input element
        // if (!uploadInput.value) return
        // uploadInput.value.value = ""
    }
}
</script>

<template>
    <div class="w-100">
        <UiButton
            class="profile__img-upload btn-outline-primary fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            >Change Avatar</UiButton
        >
        <input
            type="file"
            name="profile_picture"
            id="id-profile_picture"
            class="d-none"
        />
    </div>
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Adjust Image
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <ClientOnly>
                        <VuePictureCropper
                            :boxStyle="{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#f8f8f8',
                                margin: 'auto',
                            }"
                            :img="'https://dummyimage.com/200x200/ebebeb'"
                            :options="{
                                viewMode: 1,
                                dragMode: 'crop',
                                aspectRatio: 1 / 1,
                            }"
                        />
                    </ClientOnly>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button type="button" class="btn btn-primary">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile__img-upload {
    min-width: 200px;
    max-width: 100%;
}
</style>
