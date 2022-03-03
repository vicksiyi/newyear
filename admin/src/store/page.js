export default {
    state: {
        types: ["轮播图", "首页图"],
        selected: "",  // 用于筛选
        images: []
    },
    mutations: {
        updateSelected(state, selected) {
            state.selected = selected;
        },
        updateImages(state, images) {
            state.images = images;
        },
        typesToId(state, label) {
            const index = state.types.indexOf(label);
            return index === -1 ? 0 : index;
        }
    }
}