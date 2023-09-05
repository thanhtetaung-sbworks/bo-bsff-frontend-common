const topTab = {
  namespaced: "topTab",
    state: {
      life: 1,
      stay: 0,
      shop: 0,
    },
    getters: {
      life: state => state.life,
      stay: state => state.stay,
      shop: state => state.shop
    },
    mutations: {
      setNavState(state, { life, stay, shop }) {
        state.life = life;
        state.stay = stay;
        state.shop = shop;
      },
    },
    actions: {
      clickLife({ commit }) {
        commit('setNavState', { life: 1, stay: 0, shop: 0 });
      },
      clickStay({ commit }) {
        commit('setNavState', { life: 0, stay: 1, shop: 0 });
      },
      clickShop({ commit }) {
        commit('setNavState', { life: 0, stay: 0, shop: 1 });
      },
    }
  };
  
  export default topTab;
  