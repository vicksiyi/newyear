export default {
    state: {
        express: {},
        invites: {},
        invite: {},
        exp: {},
        expressId: "",
        orderId: "",
        courierNum: ""
    },
    mutations: {
        updateExpress(state, express) {
            state.express = express;
        },
        updateExp(state, exp) {
            state.exp = exp;
        },
        updateInvites(state, invites) {
            state.invites = invites;
        },
        updateInvite(state, invite) {
            state.invite = invite;
        },
        updateExpressId(state, expressId) {
            state.expressId = expressId;
        },
        updateOrderId(state, orderId) {
            state.orderId = orderId;
        },
        updateCourierNum(state, value) {
            state.courierNum = value
        }
    }
}