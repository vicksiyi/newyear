export default {
    state: {
        notPlays: [],
        notPlay: {}
    },
    mutations: {
        updateNotPlays(state, notPlays) {
            state.notPlays = notPlays;
        },
        updateNotPlay(state, notPlay) {
            state.notPlay = notPlay;
        }
    }
}