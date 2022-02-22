export default {
    state: {
        isCollapse: false,
        tabLists: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "/home",
        }],
        currentMenu: null
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val;
                let result = state.tabLists.findIndex(item => item.name == val.name);
                if (result === -1) {
                    state.tabLists.push(val);
                } else {
                    state.tabLists.splice(result + 1, state.tabLists.length - 1);
                    state.currentMenu = null
                }
            }
        }
    }
}