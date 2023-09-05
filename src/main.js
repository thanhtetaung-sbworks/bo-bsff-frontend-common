import plugins from "@/plugins";
import * as components from './components';

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import Datepicker from 'vuejs-datepicker'
import { ja } from "vuejs-datepicker/dist/locale";

import storeNavSearch from './store/mobile-search-popup/nav-search'
import store from './store/store.js';

let Repository;

const BoBsffFrontendCommon = {
  install(Vue, options) {

    if (!options || !options.store) {
      throw new Error('Please initialise plugin with a Vuex store.')
    }

    Vue.prototype.$BoBsffFrontendCommon = {};
    Vue.prototype.$BoBsffFrontendCommon.config = options.config || {};

    options.store.registerModule('navSearch', storeNavSearch, {namespaced: true})
    options.store.registerModule('searchPopup', store, {namespaced: true})

    Object.keys(components).forEach(component => {
      let componentName = components[component].name;
      Vue.component(componentName, components[component]);
    })

    Repository = Vue.prototype.$Repository;

    if (! options.installedPlugins.includes('floating-vue')) {
      Vue.use(FloatingVue);
    }

    if (! options.installedPlugins.includes('vuejs-datepicker')) {
      Vue.component('date-picker', Datepicker);
      Vue.prototype.Datepicker = Object.assign({}, Vue.prototype.Datepicker, {language: {ja: ja}});
    }

    const context = {
      router: options.router,
      store: options.store
    };

    function inject(name, value) {
      const prop = "$" + name.replace(/^\$+/g, "");
      Vue.prototype[prop] = Vue.observable(value);
      context[prop] = Vue.prototype[prop];
    }    

    for (const plugin of plugins) {
      Vue.use({
        install() {
          plugin(context, inject);
        }
      });
    }

  }
}

export default BoBsffFrontendCommon;
export { Repository };