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
    // 页面
    pageForm: {
        fileList: [],
        selected: '轮播图'
    },
    // 物流公司输入判断
    pageRules: {
        fileList: [{ type: 'array', required: true, message: "请上传图片", trigger: "change" }],
        selected: [
            { required: true, message: "请选择类型", trigger: "change" },
        ],
    },
    noticeForm: {
        title: "",
        content: "",
        startTime1: "",
        startTime2: "",
        endTime1: "",
        endTime2: "",
    },
    noticeRules: {
        title: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
        content: [
            { required: true, message: "请输入公告正文", trigger: "blur" },
        ],
        startTime1: [
            {
                type: "date",
                required: true,
                message: "请选择开始日期",
                trigger: "change",
            },
        ],
        startTime2: [
            {
                type: "date",
                required: true,
                message: "请选择时间",
                trigger: "change",
            },
        ],
        endTime1: [
            {
                type: "date",
                required: true,
                message: "请选择开始日期",
                trigger: "change",
            },
        ],
        endTime2: [
            {
                type: "date",
                required: true,
                message: "请选择时间",
                trigger: "change",
            },
        ],
    },
    sendLogisticForm: {
        logisticCode: "",
        logistic: "",
    },
    sendLogisticRule: {
        logisticCode: {
            required: true,
            message: "请输入物流单号",
            trigger: "blur",
        },
        logistic: {
            required: true,
            message: "请选择物流公司",
            trigger: "change",
        },
    }
}