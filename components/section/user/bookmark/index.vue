<script lang="ts" setup>
const bookmark = useBookmarkStore()

const paginationBase: Ref<any> = ref({
    page: 1,
    pageSize: 6,
})

onMounted(() => {
    bookmark.initBookmark()
})

const pagination: any = computed(() => {
    return {
        page: paginationBase.value.page,
        pageSize: paginationBase.value.pageSize,
        pageCount: Math.ceil(bookmark.bookmarks.length / 6) ?? 1,
        total: bookmark.bookmarks.length,
    }
})

const data = computed(() => {
    const index = pagination.value.pageSize * pagination.value.page
    return bookmark.bookmarks.slice(index - pagination.value.pageSize, index)
})
</script>

<template>
    <div class="row">
        <UiStory
            v-if="data.length > 0"
            class="col-12 col-md-6 col-lg-4"
            v-for="item in data"
            :key="item.id"
            :story="item"
        />
        <UiDataNotFound v-else />
    </div>
    <div class="d-flex justify-content-end mt-4" v-if="pagination.pageCount > 1">
        <UiPagination :pagination="pagination" v-model="paginationBase.page" />
    </div>
</template>
