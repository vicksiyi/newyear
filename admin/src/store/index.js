import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab';
import header from './header';
import item from './item';
import logistic from './logistic';
import page from "./page";
import notice from './notice';
import play from "./play";
import order from "./order";
import createPersistedState from "vuex-persistedstate"

// 引入持久化
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        tab,
        header,
        item,
        logistic,
        page,
        notice,
        play,
        order
    },
    // 持久化操作
    plugins: [createPersistedState({
        storage: window.localStorage
    })]
})