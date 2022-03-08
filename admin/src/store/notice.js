export default {
    state: {
        notices: [],
        page: 1,
        total: 0
    },
    mutations: {
        updateNotice(state, notices) {
            state.notices = notices;
        },
        updatePage(state, page) {
            state.page = page;
        },
        updateTotal(state, total) {
            state.total = total;
        }
    }
}