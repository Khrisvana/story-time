<script lang="ts" setup></script>

<template>
    <div>
        <UiNavbar />
        <div class="container mb-5">
            <div class="main-wrapper">
                <div class="content">
                    <div class="row content__layout">
                        <div class="col-lg-3 col-12 mb-4">
                            <UiSidebar />
                        </div>
                        <div class="col-lg-9 col-12">
                            <slot />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <UiFooter />
    </div>
</template>

<style lang="scss" scoped>
.content {
    &__layout {
        @media screen and (max-width:991.98px) { 
            flex-direction: column-reverse;
            gap: 1.5rem;
        }
    }
}
</style>