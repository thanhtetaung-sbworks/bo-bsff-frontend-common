<template>
    <div class="co-gray-tab co-life-inner-tab">
        <div class="co-item" :class="{'co-active' : isPlayActive}" @click="clickTab('play')"><div class="co-text-wrap">暮らす・遊ぶ</div></div>
        <div class="co-item" :class="{'co-active' : isEatActive}" @click="clickTab('eat')"><div class="co-text-wrap">食べる</div></div>
    </div>
</template>

<script>
export default {
    computed: {
        isPlayActive() {
            return this.$store.state.searchPopup.lifeInnerTab.play === 1;
        },
        isEatActive() {
            return this.$store.state.searchPopup.lifeInnerTab.eat === 1;
        }
    },
    methods: {
        clickTab(item) {
                const actions = {
                play: 'searchPopup/lifeInnerTab/clickPlay',
                eat: 'searchPopup/lifeInnerTab/clickEat'
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

</style>