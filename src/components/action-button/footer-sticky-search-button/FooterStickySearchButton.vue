<template>
    <div class="co-footer-sticky-search-btn-wrapper" :class="[wrapperClass]">
      <button type="button" @click="clicked" class="co-btn co-btn-submit co-flex-center">
        <svg-icon name="action_search" width="16" height="16" />
        <span class="text">検索</span>
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
  .co-footer-sticky-search-btn-wrapper {
    background: #fff;
    position: fixed;
    box-shadow: 0 4px 3px 3px rgba(0, 0, 0, 0.5);
    padding: 16px 17px;
    width: 100%;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    bottom: 0;
    left: 0;
  
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
    }
  
    .co-btn-submit {
      ::v-deep path {
        fill: #fff;
      }
    }
  
    .co-btn-map-link {
      background: #fff;
      border: 1px solid #a8aaad;
      color: #1f2021;
  
      ::v-deep path {
        fill: #63666A;
      }
    }
  }
  </style>
    