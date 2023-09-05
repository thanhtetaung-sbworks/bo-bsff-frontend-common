//navSearch
import topTab from "./mobile-search-popup/top-tab.js";
import lifeInnerTab from './mobile-search-popup/life-inner-tab.js';
import stayInnerTab from './mobile-search-popup/stay-inner-tab.js';
import stayPanel from "./mobile-search-popup/stay-panel.js";

const store = {
  namespaced: "searchPopup",
    modules: {
      topTab,
      lifeInnerTab,
      stayInnerTab,
      stayPanel
    },
    state: {
      counter: 0
    },
    getters: {
      counter: state => state.counter
    },
    mutations: {
      increment(state) {
        state.counter += 1;
      }
    }
  };
  
  export default store;