<script lang="ts" setup>
import { Cropper } from "vue-advanced-cropper"
import "vue-advanced-cropper/dist/style.css"
import ApiException from "~/exceptions/ApiException"

const { $api, $bModal } = useNuxtApp()

const user = useUserStore()

const crp: Ref<typeof Cropper | undefined> = ref()
const toast = useToast()
const isLoading = ref(false)
const picInput = ref()
const pic = ref()
const result = ref({
    dataURL: "",
    blobURL: "",
})

/**
 * Select the picture to be cropped
 */
function selectFile(e: Event) {
    // Reset last selection and results
    let allowedExtension = ["image/jpeg", "image/jpg", "image/png"]

    pic.value = ""
    result.value.dataURL = ""
    result.value.blobURL = ""

    // Get selected files
    const { files } = e.target as HTMLInputElement
    if (!files || !files.length) return

    // Convert to dataURL and pass to the cropper component
    const file = files[0]

    if (!allowedExtension.includes(file.type)) {
        return toast.error("Accepted image format is only .png .jpg and .jpeg")
    }

    if (file.size / 1_000_000 > 2) {
        return toast.error("Maximum file size is 2MB")
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        // Update the picture source of the `img` prop
        pic.value = String(reader.result)

        // Show the modal
        $bModal.show("crop-modal")

        // // Clear selected files of input element
        if (!picInput.value) return
        picInput.value.value = ""
    }
}

async function onCrop() {
    const payload = new FormData()
    payload.append("refId", user.user?.id as string)
    payload.append("ref", "plugin::users-permissions.user")
    payload.append("field", "profile_picture")

    const cropperResult = crp.value?.getResult()

    if (cropperResult.canvas) {
        cropperResult.canvas.toBlob(async (blob: Blob) => {
            try {
                const file = new File([blob], "avatar_", { type: "image/jpeg" })
                payload.append("files", file)

                if (user.user?.profile_picture?.id) {
                    await $api.user.deleteProfilePicture(
                        user.user?.profile_picture.id,
                    )
                }
                await $api.user.uploadProfile(payload)
                const { data: userData } = await $api.user.getUser()
                user.setUserProfile(userData.value?.data)

                $bModal.hide("crop-modal")
            } catch (error) {
                if (error instanceof ApiException) {
                    toast.error(error.data().error.message)
                } else {
                    console.log(error)
                }
            }
        }, "image/jpeg")
    }
}
</script>

<template>
    <div>
        <div class="w-100">
            <UiButton
                type="label"
                for="id-profile_picture"
                class="profile__img-upload btn-outline-primary fw-semibold"
                >Change Avatar</UiButton
            >
            <input
                ref="picInput"
                type="file"
                name="profile_picture"
                id="id-profile_picture"
                class="d-none form-control"
                accept="image/jpeg,image/jpg,image/png"
                @input="selectFile"
            />
        </div>
        <UiModal id="crop-modal" title="Adjust Image">
            <ClientOnly>
                <Cropper
                    ref="crp"
                    class="cropper"
                    :src="pic"
                    :stencil-props="{
                        aspectRatio: 1,
                    }"
                />
            </ClientOnly>
            <template #footer>
                <UiButton
                    class="btn-outline-primary me-2"
                    @click="$bModal.hide('crop-modal')"
                    >Close</UiButton
                >
                <UiButton
                    class="btn-primary"
                    @click="onCrop"
                    :loading="isLoading"
                    >Save</UiButton
                >
            </template>
        </UiModal>
    </div>
</template>

<style lang="scss" scoped>
.profile__img-upload {
    min-width: 200px;
    max-width: 100%;
}
</style>
