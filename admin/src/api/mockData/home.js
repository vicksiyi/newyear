import Mock from 'mockjs';

let List = [];
export default {
    getStatiscalData: () => {
        for (let i = 0; i < 7; ++i) {
            List.push({
                "盒联1.1m": Mock.Random.float(100, 8000, 0, 0),
                "盒联1.3m": Mock.Random.float(100, 8000, 0, 0),
                "盒联1.6m": Mock.Random.float(100, 8000, 0, 0),
                "盒联2.2m": Mock.Random.float(100, 8000, 0, 0),
                "盒联3.0m": Mock.Random.float(100, 8000, 0, 0),
                "二开直联": Mock.Random.float(100, 8000, 0, 0),
                "二开半直联": Mock.Random.float(100, 8000, 0, 0),
            })
        }
        // let data = ["盒联1.1m", "盒联1.3m", "盒联1.6m", "盒联2.2m", "盒联3.0m",
        //     "二开直联", "二开半直联", "三开直联", "四开直联", "五开直联", "红包", "中国结"]
        let data = ["盒联1.1m", "盒联1.3m", "盒联1.6m", "盒联2.2m", "盒联3.0m",
            "二开直联", "二开半直联"]
        let videoData = [];
        for (let i = 0; i < data.length; ++i) {
            videoData.push({
                name: data[i],
                value: Mock.Random.float(100, 8000, 0, 0)
            })
        }
        let userData = [
            {
                date: '周一',
                new: 5,
                active: 500
            }, {
                date: '周二',
                new: 10,
                active: 550
            }, {
                date: '周三',
                new: 12,
                active: 800
            }, {
                date: '周四',
                new: 60,
                active: 600
            }, {
                date: '周五',
                new: 50,
                active: 200
            }, {
                date: '周六',
                new: 2,
                active: 900
            }, {
                date: '周日',
                new: 5,
                active: 200
            }
        ]
        let orderData = {
            date: ['20220101', '20220102', '20220103', '20220104', '20220105', '20220106', '2022017'],
            data: List
        }
        let tableData = []
        for (let i = 0; i < data.length; ++i) {
            tableData.push({
                type: data[i],
                day: Mock.Random.float(100, 8000, 0, 0),
                month: Mock.Random.float(100, 8000, 0, 0),
                all: Mock.Random.float(100, 8000, 0, 0)
            })
        }
        return {
            code: 20000,
            data: {
                videoData,
                userData,
                orderData,
                tableData
            }
        }
    }
}