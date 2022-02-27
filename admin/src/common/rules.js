module.exports = {
    itemForm: {
        url: "",
        filename: "",
        title: "",
        type: "",
        money: "",
        num: "",
        status: "",
    },
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
    }
}