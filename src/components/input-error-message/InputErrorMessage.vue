<template>
    <div v-if="message" class="co-has-error" :class="[wrapperClass]">
        <span class="co-icon-wrapper">
            <svg-icon name="alert" width="16" height="16" />
        </span>
        <span class="co-text">{{ message }}</span>

    </div>
</template>
  
<script>
import SvgIcon from '@/components/icon/SvgIcon.vue'

export default {
    props: {
        components: {
            SvgIcon
        },
        wrapperClass: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ''
        },
    }
}
</script>
<style lang="scss" scoped>
.co-has-error {
    color: $co-validate-text-color;
    display: flex;
    ::v-deep svg {
        path {
            fill: $co-validate-text-color;
        }
    }
}
</style>
