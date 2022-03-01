<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 商品类型 -->
        <ItemType></ItemType>  
      </el-col>
      <el-col :span="16">
        <!-- 商品 -->
        <Items></Items>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Items from "@/components/Item/Items";
import ItemType from "@/components/Item/ItemType";
export default {
  name: "item",
  components: { ItemType, Items }
};
</script>

<style scoped>
</style>