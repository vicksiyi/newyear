module.exports = {
    // 商品字段
    itemForm: {
        url: "",
        filename: "",
        title: "",
        type: "",
        money: "",
        num: "",
        status: "",
    },
    // 商品输入判断
    itemRules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        url: [{ required: true, message: "请上传商品图片", trigger: "blur" }],
        type: [
            {
                required: true,
                message: "请选择上传类型",
                trigger: "blur",
            },
        ],
        money: [{ required: true, message: "请输入商品金额", trigger: "blur" }],
        num: [
            { required: true, message: "请输入商品剩余数量", trigger: "blur" },
        ],
        status: [
            { required: true, message: "请选择商品状态", trigger: "blur" },
        ],
    },
    // 物流公司字段
    logisticForm: {
        name: "",
        symbol: "",
    },
    // 物流公司输入判断
    logisticRules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        symbol: [
            { required: true, message: "请输入公司编码", trigger: "blur" },
        ],
    },
}