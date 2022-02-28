<template>
  <dir>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button
          @click="addItem()"
          type="primary"
          size="medium"
          icon="el-icon-plus"
          >添加商品</el-button
        >
      </el-col>
      <el-col :span="6">
        <el-select
          :value="filterType"
          @change="filterChange"
          clearable
          placeholder="类别筛选"
        >
          <el-option
            v-for="(item, index) in itemType"
            :key="index"
            :label="item.title"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-input
              v-model="search"
              @change="searchChange"
              clearable
              placeholder="请输入搜索名称"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-button
              @click="searchKey"
              icon="el-icon-search"
              circle
            ></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-card style="margin-top: 20px" shadow="hover">
      <ShowItems @showDrawer="showDrawer" :drawer="drawer"></ShowItems>
      <el-row style="margin-top: 20px" :gutter="20">
        <el-col :span="8" :offset="8">
          <el-pagination
            background
            :current-page="page"
            layout="prev, pager, next"
            :page-size="20"
            :total="total"
          >
          </el-pagination
        ></el-col>
      </el-row>
    </el-card>
    <el-drawer
      :title="JSON.stringify(item) === '{}' ? '添加商品' : '编辑商品'"
      :visible.sync="drawer"
      :direction="direction"
      :size="600"
    >
      <ItemSubmit @closeDrawer="closeDrawer"></ItemSubmit>
    </el-drawer>
  </dir>
</template>

<script>
import { mapState } from "vuex";
import ShowItems from "@/components/Item/ShowItems";
import ItemSubmit from "@/components/Item/ItemSubmit";
export default {
  name: "Items",
  components: { ShowItems, ItemSubmit },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      search: "",
    };
  },
  computed: {
    ...mapState({
      itemType: (state) => state.item.itemType,
      item: (state) => state.item.item,
      searchInit: (state) => state.item.search,
      total: (state) => state.item.total,
      page: (state) => state.item.page,
      filterType: (state) => state.item.filterType,
    }),
  },
  methods: {
    addItem() {
      this.$store.commit("updateItem", {});
      this.drawer = true;
    },
    showDrawer() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },
    filterChange(index) {
      this.$store.commit("updateFilterType", index);
    },
    searchChange(val) {
      if (!val) {
        this.$store.commit("updateSearch", val);
      }
    },
    searchKey() {
      this.$store.commit("updateSearch", this.search);
    },
  },
  mounted() {
    this.search = this.searchInit;
  },
};
</script>


<style scoped>
</style>
