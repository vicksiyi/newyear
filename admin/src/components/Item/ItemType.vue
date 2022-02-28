<template>
  <div>
    <el-button
      type="primary"
      @click="addItemType"
      size="medium"
      icon="el-icon-plus"
      >添加类别</el-button
    >
    <el-card style="margin-top: 20px" shadow="hover">
      <ShowItemType :getItemType="getItemType"></ShowItemType>
    </el-card>
    <el-drawer
      title="添加类别"
      :visible.sync="drawer"
      :direction="direction"
      :size="600"
    >
      <TypeSubmit @closeDrawer="closeDrawer"></TypeSubmit>
    </el-drawer>
  </div>
</template>

<script>
import ShowItemType from "@/components/Item/ShowItemType";
import TypeSubmit from "@/components/Item/TypeSubmit";
export default {
  name: "ItemType",
  components: { ShowItemType, TypeSubmit },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      getItemType: false,
    };
  },
  methods: {
    addItemType() {
      this.drawer = true;
    },
    closeDrawer() {
      this.getItemType = !this.getItemType;
      this.drawer = false;
    },
  },
};
</script>


<style scoped>
</style>
