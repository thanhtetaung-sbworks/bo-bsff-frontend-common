export default {
  namespaced: 'navSearch',
  state() {
    return {
      isOpen: false,
    }
  },
  getters: {
      isOpen: (state) => {
        return state.notify;
      }
  },
  mutations: {
    openSearchModel(state) {
      state.isOpen = true;
    },
    closeSearchModel(state) {
      state.isOpen = false;
    }
  }
}
