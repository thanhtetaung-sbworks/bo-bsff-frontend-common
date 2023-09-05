<template>
    <h5 class="co-title" :class="wrapperClass">{{ title }}</h5>
</template>
  
<script>
export default {
    props: {
        wrapperClass: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "text"
        }
    }
};
</script>
  
<style lang="scss" scoped>
.co-title {
    font-size: 0.6rem;
    background-color: #f4f5f6;
    margin: 0;
    padding: 0.2rem 1rem;
    border-top: 1px solid #cacccf;
    font-weight: 700;
}
</style>
  