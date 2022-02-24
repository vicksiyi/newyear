export default {
    namespaced: true,
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
    },
    getters: {
        getHeader: function (state) {
            return { Authorization: state.token }
        }
    }
}