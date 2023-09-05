const topTab = {
    namespaced: "lifeInnerTab",
      state: {
        play: 1,
        eat: 0,
      },
      getters: {
        play: state => state.play,
        eat: state => state.eat
      },
      mutations: {
        setNavState(state, { play, eat }) {
          state.play = play;
          state.eat = eat;
        },
      },
      actions: {
        clickPlay({ commit }) {
          commit('setNavState', { play: 1, eat: 0 });
        },
        clickEat({ commit }) {
          commit('setNavState', { play: 0, eat: 1 });
        }
      }
    };
    
    export default topTab;
    