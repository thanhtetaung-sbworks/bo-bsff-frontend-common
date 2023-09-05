# bo-bsff-frontend-common
- [Project setup](project-setup)
- [Parent repository setup](parent-repository-setup)
  - [Component setup](component-setup)
- [How to create a commponent](how-to-create-a-commponent)


## Project setup
#### Clone from github
```
git clone git@github.com:SBWorks/bo-bsff-frontend-common.git
```
#### yarn install
```
yarn install
```

#### Develop
```
yarn build-plugin
```

#### Build
```
yarn build
```

## Parent repository setup
come to parent repository, create alias for bo-bsff-frontend-common  in vue.config.js file
````
const path = require('path');
````
```
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        common: path.resolve(__dirname, "../bo-bsff-frontend-common")
      },
    },
```

#### main.js file in parent repository
Below we would pass store, router, repository, config, installed plugin to our common plugin
```
import BoBsffFrontendCommon from 'common';
import Repository from './repositories/repository';

Vue.prototype.$Repository = Repository;
Vue.use(BoBsffFrontendCommon, { 
  store, 
  router, 
  Repository, 
  config : {
    staySearchDomain: process.env.VUE_APP_SEARCH_STAY_DOMAIN,
    shopSearchDomain: process.env.VUE_APP_SHOP_DOMAIN,
    lifeSearchDomain: process.env.VUE_APP_LIFE_DOMAIN,
    internalStayUrlSso: process.env.VUE_APP_INTERNAL_STAY_URL_SSO,
    internalOtherStayUrlSso: process.env.VUE_APP_INTERNAL_OTHER_STAY_URL_SSO,
  },
  installedPlugins: [] //see below to avoid package installation duplication issue
});
```
> add env variable if it doesn't exist in your repository or check in bo-bsff-frontend-stay

#### To avoid package installation duplication issue
Here are plugin list used by bo-bsff-frontend-common
- floating-vue
- vuejs-datepicker

So, if your comsuming application is using above those plugin, using from bo-bsff-frontend-common is the best. Please setup like below in `installedPlugins`
```
installedPlugins: ['floating-vue', 'vuejs-datepicker']
```


## Component setup
You could use from any components from bo-bsff-frontend-common. Below are example of how to setup footer mobile navigation bar

#### Choose a place that you would like to show the component. 
Footer mobile navigation bar is globally to show in all pages. So, I would add that component in src/layouts/Default.vue or the place you want to show
```
<mobile-navigation-bar :items="navItems" :isBoCode="isBoCode" />
```
#### navItems & isBoCode setup 
```
  data() {
    return {
      isBoCode: '',
      navItems: [
      {
          id: 1,
          icon: "home",
          text: "ホーム",
          link: process.env.VUE_APP_TOP_DOMAIN,
        },
        {
          id: 2,
          icon: "search",
          text: "探す",
          link: '',
          commit: 'navSearch/openSearchModel'
        },
        {
          id: 3,
          icon: "my_coupon",
          text: "マイクーポン",
          link: `${process.env.VUE_APP_MYPAGE_DOMAIN}/mypage/coupon?sort=displayFrom`
        },
        {
          id: 4,
          icon: "mypage",
          text: "マイページ",
          link: `${process.env.VUE_APP_MYPAGE_DOMAIN}/mypage`
        },
        {
          id: 5,
          icon: "favorite",
          text: "お気に入り",
          link: `${process.env.VUE_APP_MYPAGE_DOMAIN}/mypage/favorites`
        },
      ]
    };
  },
```
>isBoCode setup is also exists in bo-bsff-frontend-top/src/Layouts/Default.vue

## How to create a commponent
- AreaMidRenderless is for reusable api, functions, data or whatever reusable
- Use CSS class with prefix `co`

```
<template>
  <div class="co-panel">
      <AreaMidRenderless @update="updateAreaMidClasses" />
      <SelectField first-option="大エリア" :options="areaMidClassOptions" v-model="areaMidClassCd" @changed="onChangeMidArea"
        :disabled="areaMidClasses.length === 0" />
  </div>
</template>
    
<script>
import SelectField from "@/components/form-fields/select-field/SelectField.vue";
import AreaMidRenderless from '@/components/renderless/AreaMidRenderless.vue';
export default {
  components: {
    SelectField,
    AreaMidRenderless,
  },
  data() {
    return {
      areaMidClassOptions: [],
      areaMidClasses: [],
    };
  },
  methods: {
    onChangeMidArea(event) {
      this.$refs.AreaSmRenderless.getSmlCodesArea(currentAreMidClass);
    }
  },
};
</script>
<style scoped lang="scss">
.co-panel {
  font-size: 12px;
}
</style>
    
```