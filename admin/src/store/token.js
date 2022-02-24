export default {
    state: {
        token: ''
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
        }
    },
    actions: {
        setTokenAsync({ commit }, val) {
            commit('setToken', val)
        }
    }
}