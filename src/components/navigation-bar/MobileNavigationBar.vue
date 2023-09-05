<template>
  <div class="co-mobile-nav-search">
    <div class="co-navigation-bar">
      <IconLink v-for="item in items" :key="item.id" :item="item" />
    </div>
    <MobileSearchNavPopup v-if="isShow" :boCode="isBoCode" />
  </div>
</template>
<script>
import IconLink from '@/components/icon-link/IconLink.vue';
import MobileSearchNavPopup from '@/components/mobile-search-nav-popup/MobileSearchNavPopup.vue';
export default {
  name: 'MobileNavigationBar',
  components: {
    IconLink,
    MobileSearchNavPopup
  },
  computed: {
    isShow() {
      return this.$store.state.navSearch.isOpen
    }
  },
  props: {
    isBoCode: {
      type: String,
      default: ''
    },
    items: Array,
  }
}
</script>
<style scoped>
.co-mobile-nav-search {
  display: none;
}

@media screen and (max-width: 1023px) {
  .co-mobile-nav-search {
    display: block;
  }

  .co-navigation-bar {
    box-shadow: 0 4px 3px 3px rgba(0, 0, 0, 0.5);
    bottom: 0px;
    position: fixed;
    display: flex;
    justify-content: space-between;
    background-color: #FFF;
    z-index: 100;
    width: 100%;
    padding-bottom: 13px;
  }
}
</style>
