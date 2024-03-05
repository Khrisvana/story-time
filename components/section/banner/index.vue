<template>
    <section class="hero">
        <div class="title">
            <h1 class="title__main">
                Welcome to
                <img src="/images/logo.svg" alt="Logo" />
            </h1>
            <p class="title__subtitle">
                The world's most-loved social storytelling platform.
            </p>
            <p class="title__subtitle">
                Story time connects a global community of 90 million readers and
                writers through the power of story.
            </p>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.hero {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.title {
    flex-direction: column;
    text-align: center;

    &__main {
        font-size: 52px;

        & img {
            height: 52px;
        }
    }

    &__subtitle {
        margin-bottom: 0;
        font-size: 32px;
    }
}
</style>
