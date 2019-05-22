import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    mutations: {
        receive_user_info(state, { userInfo }) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        recordUser({ commit }, userInfo) {
            commit('receive_user_info', { userInfo })
        }
    }
})