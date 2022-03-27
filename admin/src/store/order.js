export default {
    state: {
        express: {},
        invites: {},
        invite: {},
        exp: {}
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
        }
    }
}