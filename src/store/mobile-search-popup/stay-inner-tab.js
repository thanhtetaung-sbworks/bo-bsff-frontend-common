const topTab = {
    namespaced: "stayInnerTab",
      state: {
        hotel: 1,
        inn: 0,
        trip: 0,
        travel: 0
      },
      getters: {
        hotel: state => state.hotel,
        inn: state => state.inn,
        trip: state => state.trip,
        travel: state => state.travel
      },
      mutations: {
        setNavState(state, { hotel, inn, trip, travel }) {
          state.hotel = hotel;
          state.inn = inn;
          state.trip = trip;
          state.travel = travel;
        },
      },
      actions: {
        clickHotel({ commit }) {
          commit('setNavState', { hotel: 1, inn: 0, trip: 0, travel: 0});
        },
        clickInn({ commit }) {
          commit('setNavState', { hotel: 0, inn: 1, trip: 0, travel: 0});
        },
        clickTrip({ commit }) {
          commit('setNavState', { hotel: 0, inn: 0, trip: 1, travel: 0});
        },
        clickTravel({ commit }) {
          commit('setNavState', { hotel: 0, inn: 0, trip: 0, travel: 1});
        }
      }
    };
    
    export default topTab;
    