export default {
    state: {
        logistics: [],
        page: 1,
        total: 0
    },
    mutations: {
        updateLogistics(state, logistics) {
            state.logistics = logistics;
        },
        updatePage(state, page) {
            state.page = page;
        },
        updateTotal(state, total) {
            state.total = total;
        }
    }
}