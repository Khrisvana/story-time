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
@use "sass:math";
@use "assets/styles/main" as v;

@function pxToVw($number, $resolution) {
    @return #{math.div($number, $resolution) * 100}vw;
}

.hero {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding-top: $default-content-margin-top;
}

.title {
    flex-direction: column;
    text-align: center;

    &__main {
        font-size: 52px;

        & img {
            height: 52px;
        }

        @include media-breakpoint-down(md) {
            font-size: 32px;

            & img {
                height: 32px;
            }
        }
    }

    &__subtitle {
        margin-bottom: 0;
        font-size: 32px;

        @include media-breakpoint-down(md) {
            font-size: 24px;
        }
    }
}
</style>
