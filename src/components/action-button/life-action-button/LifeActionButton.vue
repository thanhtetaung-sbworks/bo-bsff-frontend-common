<template>
  <div class="co-action-btn-wrapper" :class="[wrapperClass]">
    <button type="button" @click="clicked" class="co-btn co-btn-submit">
      <svg-icon name="action_search" width="16" height="16" />
      <span class="co-text">検索</span>
    </button>

    <a :href="mapLink" class="co-btn co-btn-map-link">
      <svg-icon name="status_map" width="16" height="16" />
      <span class="co-text">地図検索</span>
    </a>
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
    },
    mapLink: {
      type: String,
      default: ""
    },
  },
  methods: {
    clicked() {
      this.$emit('clicked');
    }
  },
};
</script>
  
<style lang="scss" scoped>
.co-action-btn-wrapper {
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
    outline: none;
    align-items: center;
    justify-content: center;
    background: $co-primary;
    color: #fff;
    height: 2.4rem;
    border-radius: 0.25rem;
    font-weight: 700;
    width: 50%;
    font-size: 0.8rem;
    display: flex;
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
    text-decoration: none;
    &:hvoer {
      text-decoration: none;
    }

    ::v-deep path {
      fill: #63666A;
    }
  }
}
</style>
  