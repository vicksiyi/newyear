export default {
    state: {
        notices: [],
        page: 1,
        total: 0,
        isEdit: false,
        notice: {}
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
        },
        updateIsEdit(state, status) {
            state.isEdit = status
        },
        updateIsEdit(state, notice) {
            state.notice = notice
        }
    }
}