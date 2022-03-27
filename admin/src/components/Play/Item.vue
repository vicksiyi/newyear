<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ itemType }}</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-image
          @click="show"
          style="width: 50px; height: 50px"
          :src="imageUrl"
          fit="cover"
        ></el-image>
      </el-col>
      <el-col :span="12">
        <p class="content">{{ content }}</p>
      </el-col>
      <el-col :span="7">
        <p class="num">x{{ num }}</p>
        <p class="money">￥{{ money }}</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "Item",
  props: ["imageUrl", "num", "money", "itemType", "content"],
  methods: {
    show() {
      let _this = this;
      this.$confirm(
        "<img src='" + _this.imageUrl + "' style='width:400px;'>",
        "查看图片",
        {
          dangerouslyUseHTMLString: true,
          customClass: "messageBox_class",
          showCancelButton: false,
        }
      );
    },
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 10px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix span {
  font-size: 20px;
}
.content {
  font-size: 14px;
}
.num {
  text-align: center;
  font-size: 20px;
  line-height: 30px;
}
.money {
  text-align: center;
  font-size: 13px;
  color: #e6a23c;
  margin-top: 20px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
p {
  font-size: 12px;
  color: #909399;
}
</style>