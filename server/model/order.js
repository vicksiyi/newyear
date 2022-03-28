const Handle = require('../model/handle');
class Order extends Handle {
    constructor() {
        super();
    }
    nextStatus(orderId) {
        const sql = `update orders set status = status + 1 where uuid = '${orderId}';`;
        console.log(sql);
        return super.commit(sql);
    }
    getInvite() {
        const sql = `select i.itemId,o.msg,o.openId,inv.num as inviteNum,i.orderId,its.title,i.num,its.url,its.money,o.status,its.typeId,o.time,it.title as iType, o.type
        from ((itemRelOrder i inner join orders o on o.uuid = i.orderId) inner join items its on its.uuid
        = i.itemId) inner join itemTypes it on it.id = its.typeId inner join invites inv on inv.orderId=i.orderId 
        where type = 0 order by o.time desc;`;
        return super.commit(sql);
    }
    getExpress() {
        const sql = `select i.itemId,ep.uuid as expressId,ad.name,ad.mobile,lg.courierNum,cm.name as companyName,ad.address,o.msg,o.openId,i.orderId,its.title,
        i.num,its.url,its.money,o.status,its.typeId,o.time,it.title as iType, o.type
        from ((itemRelOrder i inner join orders o on o.uuid = i.orderId) 
        inner join items its on its.uuid 
        = i.itemId) inner join itemTypes it on 
        it.id = its.typeId inner join express ep on 
        ep.orderId = i.orderId inner join address ad on
        ad.id = ep.addressId left join logistics lg on
        lg.expressId = ep.uuid  left join companys cm on
        cm.id = lg.companyId  where type = 1 order by o.time desc;`;
        return super.commit(sql);
    }
}
const order = new Order();
module.exports = order;