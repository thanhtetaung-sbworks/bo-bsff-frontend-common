<template>
    <div class="co-default-btn-wrapper" :class="[wrapperClass]">
        <button type="button" @click="clicked" class="co-btn co-btn-submit co-flex-center">
            <svg-icon name="search_solid" width="14" height="14" custom-view-box="0 0 16 16" />
            <span class="co-text">検索</span>
        </button>
    </div>
</template>
    
<script>
import SvgIcon from '@/components/icon/SvgIcon.vue'
export default {
    components: {
        SvgIcon
    },
    props: {
        wrapperClass: {
            type: String,
            default: ""
        }
    },
    methods: {
        clicked() {
            this.$emit('clicked');
        }
    },
};
</script>
    
<style lang="scss" scoped>
.co-btn {
    cursor: pointer;
    outline: none;
    background: $co-primary;
    color: #fff;
    height: 2.4rem;
    border-radius: 0.25rem;
    font-weight: 700;
    width: calc(100% / 2);
    font-size: 0.8rem;
    .text {
        margin-left: 0.5rem;
    }
}

.co-btn-submit {
    ::v-deep path {
        fill: #fff;
    }
}
</style>
    