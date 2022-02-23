<template>
  <div class="show-item">
    <Item
      v-for="item in 10"
      :key="item"
      itemType="盒联1.1m"
      num="12"
      money="14"
      content="上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安"
      imageUrl="https://img0.baidu.com/it/u=1241289850,504782566&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=707"
    ></Item>
    <el-descriptions border style="margin-top: 20px" :column="1" title="备注">
      <el-descriptions-item label="描述" span="2">
        <p class="msg">
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </p>
      </el-descriptions-item>
      <el-descriptions-item label="总金额">
        <span class="all-money">￥120</span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import Item from "@/components/Order/Item";
export default {
  name: "ShowItem",
  components: { Item },
};
</script>

<style scoped>
.show-item {
  padding: 20px;
}
.all-money {
  float: right;
  margin-right: 20px;
  font-size: 30px;
  color: #e6a23c;
}
.msg {
  width: 220px;
}
</style>