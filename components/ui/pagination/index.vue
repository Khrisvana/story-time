<script lang="ts" setup>
const props = defineProps<{ pagination: IPagination }>()

const pages = computed(() => {
    const pagination = props.pagination

    let result: Array<any> = [1, 2, 3, 4, 5, 6, pagination.pageCount]

    if (pagination.pageCount > 7) {
        if (pagination.page >= 1 && pagination.page < 5) {
            result[result.length - 2] = null
        } else if (
            pagination.page >= 5 &&
            pagination.page <= pagination.pageCount - 4 &&
            pagination.pageCount >= 9
        ) {
            result[1] = null
            result[2] = pagination.page - 1
            result[3] = pagination.page
            result[4] = pagination.page + 1
            result[result.length - 2] = null
        } else if (
            pagination.page > pagination.pageCount - 5 &&
            pagination.page <= pagination.pageCount
        ) {
            result[1] = null
            result[result.length - 5] = pagination.pageCount - 4
            result[result.length - 4] = pagination.pageCount - 3
            result[result.length - 3] = pagination.pageCount - 2
            result[result.length - 2] = pagination.pageCount - 1
            result[result.length - 1] = pagination.pageCount
        }
    } else {
        result = []
        for (let index = 0; index < pagination.pageCount; index++) {
            result.push(index + 1)
        }
    }

    return result
})

const emit = defineEmits(["change"])

const pageDecrease = () => {
    if (props.pagination.page > 1) {
        props.pagination.page -= 1
    } else {
        props.pagination.page = 1
    }

    emit("change", props.pagination.page)
}

const pageChange = (value: number) => {
    props.pagination.page = value
    emit("change", props.pagination.page)
}

const pageIncrease = () => {
    if (props.pagination.page < props.pagination.pageCount) {
        props.pagination.page += 1
    } else {
        props.pagination.page = props.pagination.pageCount
    }

    emit("change", props.pagination.page)
}
</script>

<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li
                class="page-item"
                @click="pageDecrease"
                :class="{ disabled: pagination.page == 1 }"
            >
                <a class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <template v-for="index in pages" :key="index">
                <li
                    class="page-item"
                    :class="{ active: pagination.page == index }"
                    @click="pageChange(index)"
                >
                    <a
                        class="page-link"
                        v-if="index"
                        @click="pagination.page = index"
                        >{{ index }}</a
                    >
                    <a class="page-link" v-else>...</a>
                </li>
            </template>
            <li
                class="page-item"
                @click="pageIncrease"
                :class="{
                    disabled: pagination.page == pagination.pageCount,
                }"
            >
                <a class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.page-item {
    &:not(.disabled) {
        cursor: pointer;
    }
}
</style>
