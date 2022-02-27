export default {
    state: {
        itemType: [],
        items: [],
        status: ["待上架", "已上架", "已下架"]
    },
    mutations: {
        // title转id
        LabelToId(state, label) {
            if (typeof label === "number") return label;
            for (let i = 0; i < state.itemType.length; i++) {
                if (state.itemType.title == label) return state.itemType[i].id;
            }
        },
        // 更新itemType
        updateItemType(state, itemType) {
            state.itemType = itemType
        },
        // 根据Id转为Label
        idToLabel(state, id) {
            if (typeof label === "string") return label;
            for (let i = 0; i < state.itemType.length; i++) {
                if (state.itemType.id == id) return state.itemType[i].title;
            }
        },
        // 更新items
        updateItems(state, items) {
            state.items = items;
        }
    }
}