<template>
    <a :href="computedHref" class="co-link" @click="handleClick">
      <span class="co-icon-wrapper">
        <svg-icon v-if="item.icon" :name="item.icon" width="24" height="24" />
      </span>
      <span v-if="item.text" class="co-menu-text">{{ item.text }}</span>
    </a>
  </template>
  
  <script>
  import SvgIcon from '../icon/SvgIcon.vue'
  
  export default {
    components: {
      SvgIcon
    },
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
    },
    computed: {
      computedHref() {
        return this.item.link;
      }
    },
    methods: {
      handleClick(event) {
          this.$emit('click', event, this.item);
        if (this.item.commit) {
            this.$store.commit(this.item.commit)
            event.preventDefault();
        } else {
            window.location.href = this.item.link
        }
      }
    }
  }
  </script>
<style scoped>
svg {
    display: block;
}
.co-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    outline: none;
    width: 100%;
    flex-grow: 1;
    padding: 10px 2px;
    .icon-wrapper {
        display: block;
    }
    .co-menu-text {
        color: #1f2021;
        font-size: 9.6px;
        font-weight: bold;
    }
}
</style>
