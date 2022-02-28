export default {
    state: {
        itemType: [], // 商品类别数据
        items: [],  // 商品数据
        status: ["待上架", "已上架", "已下架"],
        page: 1, //当前商品页数
        filterType: "", // 类别筛选
        search: "", // 搜索内容
        item: {}, // 正在编辑的商品
        total: 0, // 商品总数
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
        },
        // 更新item
        updateItem(state, item) {
            state.item = item;
        },
        // 更新filterType
        updateFilterType(state, filterType) {
            state.filterType = filterType;
        },
        // 更新search
        updateSearch(state, search) {
            state.search = search;
        }
    }
}