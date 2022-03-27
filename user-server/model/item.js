const Handle = require('../model/handle');
class Item extends Handle {
    constructor() {
        super();
    }
    query() {
        const sql = `select uuid,typeId,title,url,num,status,money from items where status = 1;`;
        return super.commit(sql);
    }
    getType() {
        const sql = `select id,title,priority from itemTypes where status = 1 order by priority;`;
        return super.commit(sql);
    }
    // 获取订单信息
    getOrder(openId) {
        const sql = `select i.itemId, i.orderId,its.title,o.msg,i.num,its.url,its.money,o.status,its.typeId,o.time,it.title as iType, o.type
        from ((itemRelOrder i inner join orders o on o.uuid = i.orderId) inner join items its on its.uuid
        = i.itemId) inner join itemTypes it on it.id = its.typeId
        where o.openId = "${openId}" order by o.time desc`;
        return super.commit(sql);
    }
    // 获取取货号
    getOrderInviteNum(orderId){
        const sql = `select num as inviteNum from invites where orderId = '${orderId}'`;
        return super.commit(sql);
    }
}
const item = new Item();
module.exports = item;