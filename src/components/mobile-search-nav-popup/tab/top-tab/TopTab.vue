<template>
    <div class="co-top-tab">
        <div class="co-item" :class="{'co-active' : isLifeActive}" @click="clickTab('life')"><span class="co-text">ライフサービス</span></div>
        <div class="co-item" :class="{'co-active' : isStayActive}" @click="clickTab('stay')"><span class="co-text">トラベル</span></div>
        <div class="co-item" :class="{'co-active' : isShopActive}" @click="clickTab('shop')"><span class="co-text">ベネ通販</span></div>
    </div>
</template>

<script>
export default {
    computed: {
        isLifeActive() {
            return this.$store.state.searchPopup.topTab.life === 1;
        },
        isStayActive() {
            return this.$store.state.searchPopup.topTab.stay === 1;
        },
        isShopActive() {
            return this.$store.state.searchPopup.topTab.shop === 1;
        },
    },
    methods: {
        clickTab(item) {
                const actions = {
                life: 'searchPopup/topTab/clickLife',
                stay: 'searchPopup/topTab/clickStay',
                shop: 'searchPopup/topTab/clickShop',
            };

            const action = actions[item];
            if (action) {
                this.$store.dispatch(action);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.co-top-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  padding: 0.8rem 0;

  .co-item {
    border-right: 1px solid $co-vertical-line-color;
    display: block;

    &:last-child {
      border-right: 0;
    }

    cursor: pointer;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;

    .co-text {
      padding-bottom: 5px;
    }

    &.co-active {
      .co-text {
        color: $co-primary;
        border-bottom: 3px solid $co-primary;
      }
    }
  }
}

</style>