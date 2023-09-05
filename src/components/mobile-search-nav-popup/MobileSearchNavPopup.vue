<template>
  <div class="co-search-nav-popup-wrapper">
    <div class="co-search-nav-popup" :class="[isSearchPopupShow ? 'co-show' : 'co-hide']">
      <MobileSearchNavHeader />
      
      <LifeCategoryRenderless ref="LifeCategoryRenderless" @update="updateCategory" />
      <AreaMidRenderless ref="AreaMidRenderless" />
      
      <div class="co-mb-panel-section">
        
        <TopTab />
        <LifeInnerTab v-if="isLifeActive" />
        <LifePlayPanel v-if="isLifeActive && isLifePlay" :categories="categories" />
        <LifeEatPanel v-if="isLifeActive && isLifeEat" :categories="categories" />
        
        <StayInnerTab v-if="isStayActive" />
        <AccommodationPanel v-if="isStayActive && isStayHotelActive" :boCode="boCode" />
        <PublicInnPanel v-if="isStayActive && isStayPublicInnActive" :boCode="boCode" />

        <BeneOnlineShop v-if="isShopActive" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import MobileSearchNavHeader from './header/MobileSearchNavHeader.vue';
import TopTab from './tab/top-tab/TopTab.vue';
import LifeInnerTab from './tab/life-inner-tab/LifeInnerTab.vue';
import StayInnerTab from './tab/stay-inner-tab/StayInnerTab.vue';
import LifePlayPanel from './panel/life-play-panel/LifePlayPanel.vue';
import LifeEatPanel from './panel/life-eat-panel/LifeEatPanel.vue';
import AccommodationPanel from './panel/accommodation-panel/AccommodationPanel.vue';
import PublicInnPanel from './panel/public-inn-panel/PublicInnPanel.vue';
import BeneOnlineShop from './panel/BeneOnlineShop/BeneOnlineShop.vue';
import LifeCategoryRenderless from '@/components/renderless/LifeCategoryRenderless.vue';
import AreaMidRenderless from '@/components/renderless/AreaMidRenderless.vue';

export default {
  name: 'MobileSearchNavPopup',
  components: {
    MobileSearchNavHeader,
    TopTab,
    LifeInnerTab,
    StayInnerTab,
    LifePlayPanel,
    LifeEatPanel,
    AccommodationPanel,
    PublicInnPanel,
    BeneOnlineShop,
    LifeCategoryRenderless,
    AreaMidRenderless
},
  props: {
    boCode: {
      type: String,
      default: '',
    },
    mapLink: {
      type: String,
      default: "/map"
    },
    ssoStayUrl: {
      type: String,
      default: ""
    },
    ssoOrderStayUrl: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      categories: [],
      areaMidClassesData: [],
      areaMidClassesDataOption: []
    }
  },
  computed: {
    isSearchPopupShow() {
      return this.$store.state.navSearch.isOpen
    },
    isLifeActive() {
      return this.$store.state.searchPopup.topTab.life === 1;
    },
    isLifePlay() {
      return this.$store.state.searchPopup.lifeInnerTab.play === 1;
    },
    isLifeEat() {
      return this.$store.state.searchPopup.lifeInnerTab.eat === 1;
    },
    isShopActive() {
      return this.$store.state.searchPopup.topTab.shop === 1;
    },
    isStayActive() {
      return this.$store.state.searchPopup.topTab.stay === 1;
    },
    isStayHotelActive() {
      return this.$store.state.searchPopup.stayInnerTab.hotel === 1;
    },
    isStayPublicInnActive() {
      return this.$store.state.searchPopup.stayInnerTab.inn === 1;
    }
  },
  mounted() {
    this.$refs.LifeCategoryRenderless.getLargeCategories();
  },
  methods: {
    updateCategory(data) {
      this.categories = data.categories;
    },
    fixScroll() {
      if (this.$store.state.navSearch.isOpen) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "visible";
      }
    }
  },
  watch: {
    isSearchPopupShow() {
      this.fixScroll()
    }
  },
}
</script>
<style lang="scss" scoped>
.co-search-nav-popup-wrapper {
  z-index: 10000;
  background-color: #fff;
  transition: all .6s;
  box-sizing: border-box;

  .co-search-nav-popup {
    z-index: 10000;
    background-color: #fff;
    transition: all 0.6s;

    &.co-show {
      display: block;
      height: 100dvb;
      width: 100%;
      position: fixed;
      top: 0;
      -webkit-animation: SlideUp .5s ease-in-out forwards;
      animation: SlideUp .5s ease-in-out forwards;
    }

    &.co-hide {
      display: none;
    }
  }
}

//Panel
.co-mb-panel-section {
  position: relative;
  overflow-y: scroll;
  height: calc(100dvh - 90px);
  padding-bottom: 60px;
}
</style>
