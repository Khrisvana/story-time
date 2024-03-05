<template>
    <button class="btn story__bookmark shadow" :class="$attrs">
        <Icon
            name="material-symbols-light:bookmark-add-outline"
        />
    </button>
</template>

<style lang="scss" scoped>
.story__bookmark {
    margin: 0.25rem;
    padding: 0.5rem;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    background-color: white !important;
    font-size: 20px;
    border: none;
    border-radius: 100%!important;
}
</style>