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

 Date: 23/02/2022 17:35:59
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
  `time` datetime(0) NOT NULL COMMENT '访问时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `accessLogs_openID`(`openId`) USING BTREE,
  CONSTRAINT `accessLogs_openID` FOREIGN KEY (`openId`) REFERENCES `users` (`openId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
  `time` datetime(0) NOT NULL COMMENT '操作时间',
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
  `time` datetime(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins`  (
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `time` datetime(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`uuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for companys
-- ----------------------------
DROP TABLE IF EXISTS `companys`;
CREATE TABLE `companys`  (
  `id` int(0) NOT NULL COMMENT '自增ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '快递公司',
  `symbol` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '快递公司符号',
  `time` datetime(0) NOT NULL COMMENT '插入时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for express
-- ----------------------------
DROP TABLE IF EXISTS `express`;
CREATE TABLE `express`  (
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `orderId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单ID',
  `addressId` int(0) NOT NULL COMMENT '地址ID',
  `time` datetime(0) NOT NULL COMMENT '更新时间',
  `status` int(0) NOT NULL COMMENT '当前状态 0=>未收到 1=>已收到',
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `express_orderId`(`orderId`) USING BTREE,
  INDEX `express_addressId`(`addressId`) USING BTREE,
  CONSTRAINT `express_addressId` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `express_orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for images
-- ----------------------------
DROP TABLE IF EXISTS `images`;
CREATE TABLE `images`  (
  `id` int(0) NOT NULL COMMENT '自增Id',
  `adminId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '插入管理员ID',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '图片地址',
  `type` int(0) NOT NULL COMMENT '1=>轮播图 2=>首页图',
  `time` datetime(0) NOT NULL COMMENT '插入时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `images_adminId`(`adminId`) USING BTREE,
  CONSTRAINT `images_adminId` FOREIGN KEY (`adminId`) REFERENCES `admins` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for invites
-- ----------------------------
DROP TABLE IF EXISTS `invites`;
CREATE TABLE `invites`  (
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `orderId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单ID',
  `num` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '取件号',
  `time` datetime(0) NOT NULL COMMENT '取件时间',
  `status` int(0) NOT NULL COMMENT '状态 0=>未取 1=>已取',
  `update` datetime(0) NOT NULL COMMENT '更新时间/取货时间',
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `invite_orderId`(`orderId`) USING BTREE,
  CONSTRAINT `invite_orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for itemRelOrder
-- ----------------------------
DROP TABLE IF EXISTS `itemRelOrder`;
CREATE TABLE `itemRelOrder`  (
  `id` int(0) NOT NULL COMMENT '自增ID',
  `itemID` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '物品ID',
  `orderId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单ID',
  `num` int(0) NOT NULL COMMENT '数量',
  `time` datetime(0) NOT NULL COMMENT '插入时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `rel_item_order_itemId`(`itemID`) USING BTREE,
  INDEX `rel_item_order_orderId`(`orderId`) USING BTREE,
  CONSTRAINT `rel_item_order_itemId` FOREIGN KEY (`itemID`) REFERENCES `items` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rel_item_order_orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for itemTypes
-- ----------------------------
DROP TABLE IF EXISTS `itemTypes`;
CREATE TABLE `itemTypes`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类别名称',
  `priority` int(0) NOT NULL COMMENT '自增-默认优先级最低',
  `time` datetime(0) NOT NULL COMMENT '插入时间',
  `update` datetime(0) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
  `money` int(0) NOT NULL COMMENT '物品价格',
  `time` datetime(0) NOT NULL COMMENT '上架时间',
  `update` datetime(0) NOT NULL COMMENT '最新更新时间',
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `items_itemTypes`(`typeId`) USING BTREE,
  CONSTRAINT `items_itemTypes` FOREIGN KEY (`typeId`) REFERENCES `itemTypes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
  `time` datetime(0) NOT NULL COMMENT '登录时间',
  `status` int(0) NOT NULL COMMENT '登录状态 0=>密码错误 1=>登录成功 2=>未知错误',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `loginLog_adminId`(`adminId`) USING BTREE,
  CONSTRAINT `loginLog_adminId` FOREIGN KEY (`adminId`) REFERENCES `admins` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for logistics
-- ----------------------------
DROP TABLE IF EXISTS `logistics`;
CREATE TABLE `logistics`  (
  `id` int(0) NOT NULL COMMENT '自增ID',
  `companyId` int(0) NOT NULL COMMENT '快递公司ID',
  `expressId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '发货ID',
  `courierNum` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '快递单号',
  `time` datetime(0) NOT NULL COMMENT '发货时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `logistic_expressId`(`expressId`) USING BTREE,
  INDEX `logistic_companyId`(`companyId`) USING BTREE,
  CONSTRAINT `logistic_companyId` FOREIGN KEY (`companyId`) REFERENCES `companys` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `logistic_expressId` FOREIGN KEY (`expressId`) REFERENCES `express` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for notices
-- ----------------------------
DROP TABLE IF EXISTS `notices`;
CREATE TABLE `notices`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '通知内容',
  `startTime` datetime(0) NOT NULL COMMENT '通知开始时间',
  `endTime` datetime(0) NOT NULL COMMENT '通知结束时间',
  `time` datetime(0) NOT NULL COMMENT '通知建立时间',
  `update` datetime(0) NOT NULL COMMENT '通知更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `uuid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单备注',
  `status` int(0) NOT NULL COMMENT '订单状态 0=>未付款 1=>已付款未发货/正在处理中 2=>已发货/已准备好',
  `time` datetime(0) NOT NULL COMMENT '订单创建时间',
  `openId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '小程序用户唯一标识',
  `type` int(0) NOT NULL COMMENT '取货方式 0=>自取 1=>快递',
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `orders_openId`(`openId`) USING BTREE,
  CONSTRAINT `orders_openId` FOREIGN KEY (`openId`) REFERENCES `users` (`openId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `openId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户ID',
  `time` datetime(0) NOT NULL COMMENT '创建用户',
  PRIMARY KEY (`id`, `openId`) USING BTREE,
  INDEX `openId`(`openId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
