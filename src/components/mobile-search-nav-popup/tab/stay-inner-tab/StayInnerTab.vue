<template>
    <div class="co-gray-tab co-stay-inner-tab">
        <div class="co-item" :class="{'co-active' : isHotelActive}" @click="clickTab('hotel')"><div class="co-text-wrap">国内宿泊施設</div></div>
        <div class="co-item" :class="{'co-active' : isInnActive}" @click="clickTab('inn')"><div class="co-text-wrap">公共の宿</div></div>
        <div class="co-item">
            <div class="co-text-wrap">
                <a :href="stayUrl" target="_blank">
                    海外旅行
                    <img width="10" alt="" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 26.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='レイヤー_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%231F2021;%7D%0A%3C/style%3E%3Cpath class='st0' d='M384,320c-17.7,0-32,14.3-32,32v96H64V160h96c17.7,0,32-14.3,32-32s-14.3-32-32-32H64c-35.3,0-64,28.7-64,64 v288c0,35.3,28.6,64,64,64h288c35.4,0,64-28.7,64-64v-96C416,334.3,401.7,320,384,320z M502.6,9.4C496.8,3.6,488.8,0,480,0H320 c-17.7,0-31.1,14.3-31.1,31.1c0,17.7,14.3,31.1,32,31.1h82.8l-225,228.5c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0l224-226.8 V192c0,17.7,14.3,31.1,31.1,31.1S512,209.7,512,192V31.1C512,23.2,508.4,15.2,502.6,9.4z'/%3E%3C/svg%3E%0A"/>
                </a>
            </div>
        </div>
        <div class="co-item">
            <div class="co-text-wrap">
                <a :href="orderStayUrl" target="_blank">
                    パッケージツアー・旅行代理店、航空券・交通・その他旅行関連
                    <img width="10" alt="" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 26.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='レイヤー_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%231F2021;%7D%0A%3C/style%3E%3Cpath class='st0' d='M384,320c-17.7,0-32,14.3-32,32v96H64V160h96c17.7,0,32-14.3,32-32s-14.3-32-32-32H64c-35.3,0-64,28.7-64,64 v288c0,35.3,28.6,64,64,64h288c35.4,0,64-28.7,64-64v-96C416,334.3,401.7,320,384,320z M502.6,9.4C496.8,3.6,488.8,0,480,0H320 c-17.7,0-31.1,14.3-31.1,31.1c0,17.7,14.3,31.1,32,31.1h82.8l-225,228.5c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0l224-226.8 V192c0,17.7,14.3,31.1,31.1,31.1S512,209.7,512,192V31.1C512,23.2,508.4,15.2,502.6,9.4z'/%3E%3C/svg%3E%0A"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        isHotelActive() {
            return this.$store.state.searchPopup.stayInnerTab.hotel === 1;
        },
        isInnActive() {
            return this.$store.state.searchPopup.stayInnerTab.inn === 1;
        },
        stayUrl() {
            return this.$BoBsffFrontendCommon.config.internalStayUrlSso;
        },
        orderStayUrl() {
            return this.$BoBsffFrontendCommon.config.internalOtherStayUrlSso;
        }
    },
    methods: {
        clickTab(item) {
                const actions = {
                hotel: 'searchPopup/stayInnerTab/clickHotel',
                inn: 'searchPopup/stayInnerTab/clickInn',
                trip: 'searchPopup/stayInnerTab/clickTrip',
                travel: 'searchPopup/stayInnerTab/clickTravel'
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