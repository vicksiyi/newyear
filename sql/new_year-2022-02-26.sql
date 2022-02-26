/*
 Navicat Premium Data Transfer

 Source Server         : 阿里云
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : 121.41.122.194:3306
 Source Schema         : new_year

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 26/02/2022 18:17:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accessLogs
-- ----------------------------
DROP TABLE IF EXISTS `accessLogs`;
CREATE TABLE `accessLogs`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `openId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户ID',
  `api` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '接口',
  `params` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '请求参数',
  `time` timestamp(0) NOT NULL COMMENT '访问时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `accessLogs_openID`(`openId`) USING BTREE,
  CONSTRAINT `accessLogs_openID` FOREIGN KEY (`openId`) REFERENCES `users` (`openId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of accessLogs
-- ----------------------------

-- ----------------------------
-- Table structure for actionLogs
-- ----------------------------
DROP TABLE IF EXISTS `actionLogs`;
CREATE TABLE `actionLogs`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `adminId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作人员',
  `api` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作API',
  `noticeId` int(0) NULL DEFAULT NULL COMMENT '公告ID',
  `orderId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '订单ID',
  `itemTypeId` int(0) NULL DEFAULT NULL COMMENT '类别ID',
  `itemId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '商品ID',
  `params` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '请求参数',
  `type` int(0) NOT NULL COMMENT '操作类型 0=>增 1=>删 2=>改 3=>查',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '执行备注',
  `time` timestamp(0) NOT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `actionLogs_adminId`(`adminId`) USING BTREE,
  INDEX `actionLogs_noticeId`(`noticeId`) USING BTREE,
  INDEX `actionLogs_orderId`(`orderId`) USING BTREE,
  INDEX `actionLogs_itemTypeId`(`itemTypeId`) USING BTREE,
  INDEX `actionLogs_ItemId`(`itemId`) USING BTREE,
  CONSTRAINT `actionLogs_adminId` FOREIGN KEY (`adminId`) REFERENCES `admins` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `actionLogs_ItemId` FOREIGN KEY (`itemId`) REFERENCES `items` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `actionLogs_itemTypeId` FOREIGN KEY (`itemTypeId`) REFERENCES `itemTypes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `actionLogs_noticeId` FOREIGN KEY (`noticeId`) REFERENCES `notices` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `actionLogs_orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of actionLogs
-- ----------------------------

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `openId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '小程序用户标识',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '收货人',
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '详细地址',
  `time` timestamp(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins`  (
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `time` timestamp(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`uuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES ('0f2befee-953e-11ec-a092-00163e0c2d78', 'admin', '7917f2596f8bb70c954893f200ba6274', '2022-02-24 14:50:31');

-- ----------------------------
-- Table structure for companys
-- ----------------------------
DROP TABLE IF EXISTS `companys`;
CREATE TABLE `companys`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '快递公司',
  `symbol` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '快递公司符号',
  `time` timestamp(0) NOT NULL COMMENT '插入时间',
  PRIMARY KEY (`id`, `name`, `symbol`) USING BTREE,
  UNIQUE INDEX `unique_name`(`name`) USING BTREE,
  UNIQUE INDEX `unique_symbol`(`symbol`) USING BTREE,
  INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of companys
-- ----------------------------
INSERT INTO `companys` VALUES (1, '顺丰', 'SF', '2022-02-24 15:40:54');
INSERT INTO `companys` VALUES (2, '中通', 'ZTO', '2022-02-24 15:41:21');
INSERT INTO `companys` VALUES (4, '圆通', 'YTO', '2022-02-24 17:23:47');
INSERT INTO `companys` VALUES (7, '亚马逊', 'AMAZON', '2022-02-24 17:28:09');
INSERT INTO `companys` VALUES (28, '宅急送', 'ZJS', '2022-02-24 18:08:34');

-- ----------------------------
-- Table structure for express
-- ----------------------------
DROP TABLE IF EXISTS `express`;
CREATE TABLE `express`  (
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `orderId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单ID',
  `addressId` int(0) NOT NULL COMMENT '地址ID',
  `time` timestamp(0) NOT NULL COMMENT '插入时间',
  `update` timestamp(0) NULL DEFAULT NULL COMMENT '更新时间',
  `status` int(0) NOT NULL COMMENT '当前状态 0=>未收到 1=>已收到',
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `express_orderId`(`orderId`) USING BTREE,
  INDEX `express_addressId`(`addressId`) USING BTREE,
  CONSTRAINT `express_addressId` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `express_orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of express
-- ----------------------------

-- ----------------------------
-- Table structure for images
-- ----------------------------
DROP TABLE IF EXISTS `images`;
CREATE TABLE `images`  (
  `id` int(0) NOT NULL COMMENT '自增Id',
  `adminId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '插入管理员ID',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '图片地址',
  `type` int(0) NOT NULL COMMENT '1=>轮播图 2=>首页图',
  `time` timestamp(0) NOT NULL COMMENT '插入时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `images_adminId`(`adminId`) USING BTREE,
  CONSTRAINT `images_adminId` FOREIGN KEY (`adminId`) REFERENCES `admins` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of images
-- ----------------------------

-- ----------------------------
-- Table structure for invites
-- ----------------------------
DROP TABLE IF EXISTS `invites`;
CREATE TABLE `invites`  (
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `orderId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单ID',
  `num` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '取件号',
  `time` timestamp(0) NOT NULL COMMENT '取件时间',
  `status` int(0) NOT NULL COMMENT '状态 0=>未取 1=>已取',
  `update` timestamp(0) NOT NULL COMMENT '更新时间/取货时间',
  `insertTime` timestamp(0) NOT NULL COMMENT '插入时间',
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `invite_orderId`(`orderId`) USING BTREE,
  CONSTRAINT `invite_orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of invites
-- ----------------------------

-- ----------------------------
-- Table structure for itemRelOrder
-- ----------------------------
DROP TABLE IF EXISTS `itemRelOrder`;
CREATE TABLE `itemRelOrder`  (
  `id` int(0) NOT NULL COMMENT '自增ID',
  `itemID` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '物品ID',
  `orderId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单ID',
  `num` int(0) NOT NULL COMMENT '数量',
  `time` timestamp(0) NOT NULL COMMENT '插入时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `rel_item_order_itemId`(`itemID`) USING BTREE,
  INDEX `rel_item_order_orderId`(`orderId`) USING BTREE,
  CONSTRAINT `rel_item_order_itemId` FOREIGN KEY (`itemID`) REFERENCES `items` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rel_item_order_orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of itemRelOrder
-- ----------------------------

-- ----------------------------
-- Table structure for itemTypes
-- ----------------------------
DROP TABLE IF EXISTS `itemTypes`;
CREATE TABLE `itemTypes`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类别名称',
  `priority` int(0) NULL DEFAULT NULL COMMENT '自增-默认优先级最低',
  `status` int(0) NOT NULL COMMENT '0=>不显示 1=>显示',
  `time` timestamp(0) NOT NULL COMMENT '插入时间',
  `updateTime` timestamp(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_itemType_title`(`title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of itemTypes
-- ----------------------------
INSERT INTO `itemTypes` VALUES (1, '盒联1.1m', 1, 1, '2022-02-25 16:27:55', '2022-02-25 17:42:56');
INSERT INTO `itemTypes` VALUES (2, '盒联1.3m', 2, 1, '2022-02-25 16:28:33', '2022-02-25 17:42:32');
INSERT INTO `itemTypes` VALUES (6, '盒联1.6m', 3, 1, '2022-02-25 16:30:45', '2022-02-26 12:35:13');
INSERT INTO `itemTypes` VALUES (7, '盒联2.2m', 4, 1, '2022-02-25 16:30:51', '2022-02-26 12:35:13');
INSERT INTO `itemTypes` VALUES (8, '盒联3.0m', 5, 1, '2022-02-25 16:30:58', '2022-02-26 15:44:50');
INSERT INTO `itemTypes` VALUES (9, '二开直联', 6, 1, '2022-02-25 16:31:05', '2022-02-26 16:43:52');
INSERT INTO `itemTypes` VALUES (10, '二开半直联', 7, 1, '2022-02-25 16:31:21', '2022-02-26 16:43:52');
INSERT INTO `itemTypes` VALUES (11, '三开直联', 8, 1, '2022-02-25 16:31:26', '2022-02-25 16:43:48');
INSERT INTO `itemTypes` VALUES (12, '四开直联', 9, 1, '2022-02-25 16:31:33', '2022-02-25 16:43:54');
INSERT INTO `itemTypes` VALUES (13, '五开直联', 10, 1, '2022-02-25 16:31:39', '2022-02-25 17:43:08');
INSERT INTO `itemTypes` VALUES (14, '红包', 11, 1, '2022-02-25 16:31:44', '2022-02-25 17:29:37');
INSERT INTO `itemTypes` VALUES (15, '中国结', 12, 1, '2022-02-25 16:31:50', '2022-02-25 16:45:37');

-- ----------------------------
-- Table structure for items
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items`  (
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'UUID',
  `typeId` int(0) NOT NULL COMMENT '类别ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '物品名称',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '物品图片',
  `num` int(0) NOT NULL COMMENT '存货',
  `status` int(0) NOT NULL COMMENT '当前物品状态 0=>未上架 1=>已上架 2=>已下架',
  `money` float NOT NULL COMMENT '物品价格',
  `time` timestamp(0) NOT NULL COMMENT '上架时间',
  `updateTime` timestamp(0) NULL DEFAULT NULL COMMENT '最新更新时间',
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `items_itemTypes`(`typeId`) USING BTREE,
  CONSTRAINT `items_itemTypes` FOREIGN KEY (`typeId`) REFERENCES `itemTypes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of items
-- ----------------------------
INSERT INTO `items` VALUES ('0c1f6fc7-96e7-11ec-a092-00163e0c2d78', 7, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/2bcbd22634172f4558f6d76b85ac03d3.jpg', 16, 0, 12.5, '2022-02-26 17:32:42', '2022-02-26 18:15:49');
INSERT INTO `items` VALUES ('0edddad0-96e0-11ec-a092-00163e0c2d78', 8, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/4a31734148455565110f5a1a33ae442f.jpg', 120, 1, 200, '2022-02-26 16:42:40', '2022-02-26 16:42:53');
INSERT INTO `items` VALUES ('189e4599-96c7-11ec-a092-00163e0c2d78', 1, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/46a65314a8cbde1e5067f19a194e9440.png', 20, 1, 22000, '2022-02-26 13:43:59', '2022-02-26 16:43:24');
INSERT INTO `items` VALUES ('4c087083-96cd-11ec-a092-00163e0c2d78', 6, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/2842d8774a7cf163c13a51906b5ac94c.png', 11, 0, 25, '2022-02-26 14:28:22', NULL);
INSERT INTO `items` VALUES ('75ddfdce-96e2-11ec-a092-00163e0c2d78', 8, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/71050bea37d5248f282dc24a0b558d5d.jpg', 20, 1, 20, '2022-02-26 16:59:52', NULL);
INSERT INTO `items` VALUES ('8784b554-96e8-11ec-a092-00163e0c2d78', 15, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/26a6a849f101c71c5612252fb6681f95.png', 66, 0, 12.5, '2022-02-26 17:43:19', NULL);
INSERT INTO `items` VALUES ('8902c655-96e2-11ec-a092-00163e0c2d78', 9, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/a31a51ef557238b188e35caaa06af117.jpg', 20, 0, 19, '2022-02-26 17:00:24', '2022-02-26 17:26:17');
INSERT INTO `items` VALUES ('9175bd47-96e8-11ec-a092-00163e0c2d78', 12, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/d04fb23634569ba6f0e952abf73b01f0.png', 22, 0, 22.5, '2022-02-26 17:43:35', NULL);
INSERT INTO `items` VALUES ('918ec5b4-96c7-11ec-a092-00163e0c2d78', 1, '上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/acc93a538e66808dba4b7db1bfba5f3b.jpg', 20, 1, 20, '2022-02-26 13:47:22', '2022-02-26 17:26:44');
INSERT INTO `items` VALUES ('99602e2a-96e8-11ec-a092-00163e0c2d78', 13, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/92bd1025e654228fe85a723e3f175391.png', 22, 0, 22.5, '2022-02-26 17:43:49', NULL);
INSERT INTO `items` VALUES ('a207bf67-96e8-11ec-a092-00163e0c2d78', 6, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/ec223d8014d4d13ca114ca8a1d9f5945.jpg', 22, 0, 22.5, '2022-02-26 17:44:03', '2022-02-26 18:15:28');
INSERT INTO `items` VALUES ('ac0bb5b1-96e8-11ec-a092-00163e0c2d78', 12, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/657a4887e614ab50521b9d1460752dab.png', 33, 0, 22.5, '2022-02-26 17:44:20', NULL);
INSERT INTO `items` VALUES ('b42f421b-96c7-11ec-a092-00163e0c2d78', 2, '上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/262c53bd60b29794fdbaf2ccd33fff5e.png', 10, 0, 20, '2022-02-26 13:48:20', NULL);
INSERT INTO `items` VALUES ('b47fa065-96e2-11ec-a092-00163e0c2d78', 15, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/5beda562ded829cec9acd64e7bac56cf.png', 24, 1, 19.5, '2022-02-26 17:01:37', NULL);
INSERT INTO `items` VALUES ('b7b3a192-96e8-11ec-a092-00163e0c2d78', 2, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/8037138ea785d6e9e3ff8c4a7b6570d5.png', 33, 0, 22.5, '2022-02-26 17:44:40', NULL);
INSERT INTO `items` VALUES ('bb95a588-96e6-11ec-a092-00163e0c2d78', 8, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/8423459baa3a412ed9099814bc776688.jpg', 20, 0, 12.9, '2022-02-26 17:30:27', NULL);
INSERT INTO `items` VALUES ('c048ff89-96e8-11ec-a092-00163e0c2d78', 8, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/5385e2827d063bac492b4899c007a718.png', 22, 0, 22.5, '2022-02-26 17:44:54', NULL);
INSERT INTO `items` VALUES ('c9eff49d-96e6-11ec-a092-00163e0c2d78', 13, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/82fa1669b513101693c8cf292017a779.png', 21, 0, 23.9, '2022-02-26 17:30:51', NULL);
INSERT INTO `items` VALUES ('d72b2ab2-96e6-11ec-a092-00163e0c2d78', 11, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/516627f7895316312ed69f88d00e092b.jpg', 22, 0, 12.5, '2022-02-26 17:31:13', NULL);
INSERT INTO `items` VALUES ('e6e1bc0c-96e6-11ec-a092-00163e0c2d78', 11, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/ff6c46d048627a13963b9a6cec4954ed.jpg', 20, 0, 25.5, '2022-02-26 17:31:40', NULL);
INSERT INTO `items` VALUES ('f2a935fd-96e6-11ec-a092-00163e0c2d78', 6, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/6e932ae3ab649d32b4a18474ea294d8d.jpg', 22, 0, 24.6, '2022-02-26 17:31:59', NULL);
INSERT INTO `items` VALUES ('fb288b7a-96e6-11ec-a092-00163e0c2d78', 6, '上联：峰峦或再有飞来，坐山门老等，下联：泉水已渐生暖意，放笑脸相迎', 'http://ctw-new-year.oss-cn-beijing.aliyuncs.com/images/item/2022-1-26/fedd263e355b432c3f8539468f679b8e.jpg', 12, 0, 22.5, '2022-02-26 17:32:14', NULL);

-- ----------------------------
-- Table structure for loginLogs
-- ----------------------------
DROP TABLE IF EXISTS `loginLogs`;
CREATE TABLE `loginLogs`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `adminId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号ID',
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '纬度',
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '经度',
  `device` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '登录设备',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '登录IP',
  `time` timestamp(0) NOT NULL COMMENT '登录时间',
  `status` int(0) NOT NULL COMMENT '登录状态 0=>密码错误 1=>登录成功 2=>未知错误',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `loginLog_adminId`(`adminId`) USING BTREE,
  CONSTRAINT `loginLog_adminId` FOREIGN KEY (`adminId`) REFERENCES `admins` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of loginLogs
-- ----------------------------

-- ----------------------------
-- Table structure for logistics
-- ----------------------------
DROP TABLE IF EXISTS `logistics`;
CREATE TABLE `logistics`  (
  `id` int(0) NOT NULL COMMENT '自增ID',
  `companyId` int(0) NOT NULL COMMENT '快递公司ID',
  `expressId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '发货ID',
  `courierNum` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '快递单号',
  `time` timestamp(0) NOT NULL COMMENT '发货时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `logistic_expressId`(`expressId`) USING BTREE,
  INDEX `logistic_companyId`(`companyId`) USING BTREE,
  CONSTRAINT `logistic_companyId` FOREIGN KEY (`companyId`) REFERENCES `companys` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `logistic_expressId` FOREIGN KEY (`expressId`) REFERENCES `express` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of logistics
-- ----------------------------

-- ----------------------------
-- Table structure for notices
-- ----------------------------
DROP TABLE IF EXISTS `notices`;
CREATE TABLE `notices`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '通知内容',
  `startTime` timestamp(0) NOT NULL COMMENT '通知开始时间',
  `endTime` timestamp(0) NOT NULL COMMENT '通知结束时间',
  `time` timestamp(0) NOT NULL COMMENT '通知建立时间',
  `update` timestamp(0) NOT NULL COMMENT '通知更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notices
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单备注',
  `status` int(0) NOT NULL COMMENT '订单状态 0=>未付款 1=>已付款未发货/正在处理中 2=>已发货/已准备好',
  `time` timestamp(0) NOT NULL COMMENT '订单创建时间',
  `openId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '小程序用户唯一标识',
  `type` int(0) NOT NULL COMMENT '取货方式 0=>自取 1=>快递',
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `orders_openId`(`openId`) USING BTREE,
  CONSTRAINT `orders_openId` FOREIGN KEY (`openId`) REFERENCES `users` (`openId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `openId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户ID',
  `time` timestamp(0) NOT NULL COMMENT '创建用户',
  PRIMARY KEY (`id`, `openId`) USING BTREE,
  INDEX `openId`(`openId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'oCBbG4svpBraIoiri05-MbU3fAgs', '2022-02-24 12:47:18');

-- ----------------------------
-- Triggers structure for table accessLogs
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_accessLogs`;
delimiter ;;
CREATE TRIGGER `time_trigger_accessLogs` BEFORE INSERT ON `accessLogs` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table actionLogs
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_actionLogs`;
delimiter ;;
CREATE TRIGGER `time_trigger_actionLogs` BEFORE INSERT ON `actionLogs` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table address
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_address`;
delimiter ;;
CREATE TRIGGER `time_trigger_address` BEFORE INSERT ON `address` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table admins
-- ----------------------------
DROP TRIGGER IF EXISTS `cre_trigger_admins`;
delimiter ;;
CREATE TRIGGER `cre_trigger_admins` BEFORE INSERT ON `admins` FOR EACH ROW BEGIN
			set new.uuid = UUID();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table admins
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_admins`;
delimiter ;;
CREATE TRIGGER `time_trigger_admins` BEFORE INSERT ON `admins` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table companys
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_companys`;
delimiter ;;
CREATE TRIGGER `time_trigger_companys` BEFORE INSERT ON `companys` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table express
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_update_express`;
delimiter ;;
CREATE TRIGGER `time_trigger_update_express` BEFORE UPDATE ON `express` FOR EACH ROW BEGIN
    set new.update = NOW();
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table express
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_express`;
delimiter ;;
CREATE TRIGGER `time_trigger_express` BEFORE INSERT ON `express` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table express
-- ----------------------------
DROP TRIGGER IF EXISTS `cre_trigger_express`;
delimiter ;;
CREATE TRIGGER `cre_trigger_express` BEFORE INSERT ON `express` FOR EACH ROW BEGIN
			set new.uuid = UUID();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table images
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_images`;
delimiter ;;
CREATE TRIGGER `time_trigger_images` BEFORE INSERT ON `images` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table invites
-- ----------------------------
DROP TRIGGER IF EXISTS `cre_trigger_invite`;
delimiter ;;
CREATE TRIGGER `cre_trigger_invite` BEFORE INSERT ON `invites` FOR EACH ROW BEGIN
			set new.uuid = UUID();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table invites
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_invite`;
delimiter ;;
CREATE TRIGGER `time_trigger_invite` BEFORE INSERT ON `invites` FOR EACH ROW BEGIN
			set new.insertTime = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table invites
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_update_invites`;
delimiter ;;
CREATE TRIGGER `time_trigger_update_invites` BEFORE UPDATE ON `invites` FOR EACH ROW BEGIN
    set new.update = NOW();
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table itemRelOrder
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_itemRelOrder`;
delimiter ;;
CREATE TRIGGER `time_trigger_itemRelOrder` BEFORE INSERT ON `itemRelOrder` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table itemTypes
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_itemTypes`;
delimiter ;;
CREATE TRIGGER `time_trigger_itemTypes` BEFORE INSERT ON `itemTypes` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table itemTypes
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_update_itemTypes`;
delimiter ;;
CREATE TRIGGER `time_trigger_update_itemTypes` BEFORE UPDATE ON `itemTypes` FOR EACH ROW BEGIN
    set new.updateTime = NOW();
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table itemTypes
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_itemTypes_priority`;
delimiter ;;
CREATE TRIGGER `time_trigger_itemTypes_priority` BEFORE INSERT ON `itemTypes` FOR EACH ROW BEGIN
			set new.priority = (select priority + 1 from itemTypes order by id DESC limit 1);
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table items
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_items`;
delimiter ;;
CREATE TRIGGER `time_trigger_items` BEFORE INSERT ON `items` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table items
-- ----------------------------
DROP TRIGGER IF EXISTS `cre_trigger_items`;
delimiter ;;
CREATE TRIGGER `cre_trigger_items` BEFORE INSERT ON `items` FOR EACH ROW BEGIN
			set new.uuid = UUID();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table items
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_update_items`;
delimiter ;;
CREATE TRIGGER `time_trigger_update_items` BEFORE UPDATE ON `items` FOR EACH ROW BEGIN
    set new.updateTime = NOW();
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table loginLogs
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_loginLogs`;
delimiter ;;
CREATE TRIGGER `time_trigger_loginLogs` BEFORE INSERT ON `loginLogs` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table logistics
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_logistics`;
delimiter ;;
CREATE TRIGGER `time_trigger_logistics` BEFORE INSERT ON `logistics` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table notices
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_notices`;
delimiter ;;
CREATE TRIGGER `time_trigger_notices` BEFORE INSERT ON `notices` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table notices
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_update_notices`;
delimiter ;;
CREATE TRIGGER `time_trigger_update_notices` BEFORE UPDATE ON `notices` FOR EACH ROW BEGIN
    set new.update = NOW();
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table orders
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_orders`;
delimiter ;;
CREATE TRIGGER `time_trigger_orders` BEFORE INSERT ON `orders` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table orders
-- ----------------------------
DROP TRIGGER IF EXISTS `cre_trigger_orders`;
delimiter ;;
CREATE TRIGGER `cre_trigger_orders` BEFORE INSERT ON `orders` FOR EACH ROW BEGIN
			set new.uuid = UUID();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table users
-- ----------------------------
DROP TRIGGER IF EXISTS `time_trigger_users`;
delimiter ;;
CREATE TRIGGER `time_trigger_users` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
