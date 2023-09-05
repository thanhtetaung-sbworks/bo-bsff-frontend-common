const stayPanel = {
    namespaced: "stayPanel",
      state: {
        areaMidClassesData: []

      },
      getters: {
        areaMidClassesData: state => state.areaMidClassesData
      },
      mutations: {
        upateAreaMidClassesData(state, payload) {
          state.areaMidClassesData = payload;
        },
      },
      actions: {
        upateAreaMidClassesData({ commit }, payload) {
          commit('upateAreaMidClassesData', payload);
        }
      }
    };
    
    export default stayPanel;
    