//页面加载
class Loading {
    start(_this, text = "Loading") {
        const loading = _this.$loading({
            lock: true,
            text: text,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
        });
        return loading;
    }
    end(loading) {
        loading.close();
    }
}

export default new Loading();