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
            v-for="item in itemType"
            :key="item.id"
            :label="item.title"
            :value="item.id"
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
      <ShowItems
        :update="update"
        @showDrawer="showDrawer"
        :drawer="drawer"
      ></ShowItems>
      <el-row style="margin-top: 20px" :gutter="20">
        <el-col :span="8" :offset="8">
          <el-pagination
            background
            @current-change="pageChange"
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
      update: false,
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
    // 筛选类别
    filterChange(id) {
      this.$store.commit("updatePage", 1);
      if (id) this.$store.commit("updateFilterType", id);
      else this.$store.commit("updateFilterType", "");
      this.update = !this.update;
    },
    // 查询输入变化
    searchChange(val) {
      if (!val) {
        this.$store.commit("updateSearch", val);
        this.update = !this.update; // 更新数据
      }
    },
    // 搜索商品
    searchKey() {
      this.$store.commit("updateSearch", this.search);
      this.$store.commit("updatePage", 1);
      this.update = !this.update;
    },
    // 页码变化
    pageChange(page) {
      this.$store.commit("updatePage", page);
      this.update = !this.update;
    },
  },
  mounted() {
    this.search = this.searchInit;
  },
};
</script>


<style scoped>
</style>
