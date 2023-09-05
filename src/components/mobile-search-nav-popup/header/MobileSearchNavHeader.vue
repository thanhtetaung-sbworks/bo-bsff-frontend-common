<template>
    <div class="co-header co-flex-center">
        <div class="co-title co-flex-center">
            <span class="co-icon-wrapper">
                <svg-icon name="search" width="24" height="24" />
            </span>
            <span class="co-text">探す</span>
        </div>
        <div @click="closeModal" class="co-close-btn">
            <span class="co-icon-wrapper">
                <svg-icon name="action_close" width="24" height="24" custom-class="co-close-icon" />
            </span>
            <span class="co-text">閉じる</span>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$store.commit("navSearch/closeSearchModel")
        },
    }
}
</script>
<style lang="scss" scoped>
.co-header {
    font-weight: bold;
    height: 60px;
    position: relative;
    border-bottom: 1px solid $co-red-border-color;
    .co-title {
        gap: 5px;
        .co-icon-wrapper {
            ::v-deep svg {
                display: block;
                path {
                    fill: $co-body-text-color;
                }
            }
        }
    }
    .co-close-btn {
        position: absolute;
        display: flex;
        flex-direction: column;
        font-size: 0.6rem;
        top: 11px;
        right: 20px;
        .co-text {
            color: $co-body-text-color;
            font-weight: normal;
        }
        .co-icon-wrapper {
            ::v-deep svg {
                display: block;
                path {
                    fill: $co-primary;
                }
            }
        }
    }
}
</style>