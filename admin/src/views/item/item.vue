<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <ItemType></ItemType>
      </el-col>
      <el-col :span="16">
        <Items></Items>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Items from "@/components/Item/Items";
import ItemType from "@/components/Item/ItemType";
import Loading from "@/common/loading";
export default {
  name: "item",
  components: { ItemType, Items },
  data() {
    return {};
  },
  methods: {
    // 添加商品
    addItem() {
      this.isShow = true;
      this.isItem = true;
      this.isEdit = false;
      this.item = {};
      this.drawer = true;
    },
    closeDrawer: function () {
      this.getData();
      this.isShow = false;
      this.drawer = false;
    },
    // 类别筛选获取数据
    async getFilter() {
      this.page = 1;
      this.getData();
    },
    // 编辑商品
    edit(index) {
      this.isShow = true;
      this.isEdit = true;
      this.item = Object.assign({}, this.items[index]);
      this.item.status = this.toStatus(this.item.status);
      this.drawer = true;
    },
    toStatus(index) {
      return this.statusList[index];
    },
    pageChange(page) {
      this.page = page;
      this.getData();
    },
    searchKey() {
      console.log(this.search);
      this.$message({
        type: "warning",
        message: "暂无此功能",
      });
    },
  },
  mounted: function () {
    // this.getData();
  },
  filters: {
    filterStatus(index) {
      const statusList = ["待上架", "已上架", "已下架"];
      return statusList[index];
    },
  },
};
</script>

<style scoped>
</style>