<template>
  <el-table
    v-loading="loading"
    :data="items"
    height="600"
    style="width: 100%; overflow-x: hidden"
  >
    <el-table-column prop="title" label="名称">
      <template slot-scope="scope">
        <p>{{ scope.row.title }}</p>
      </template>
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
        <el-image :src="scope.row.url" lazy></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类别">
      <template slot-scope="scope">
        <div>
          {{ scope.row.type }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="money" label="金额">
      <template slot-scope="scope">
        <div>{{ scope.row.money }}元</div>
      </template>
    </el-table-column>
    <el-table-column prop="num" label="剩余数量">
      <template slot-scope="scope">
        <div>{{ scope.row.num }}个</div>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag :type="tag(scope.row.status)">
          {{ scope.row.status | filterStatus }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="warning" @click="edit(scope.$index)" size="mini"
          >编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getItem } from "@/api/item/item";
export default {
  name: "ShowItems",
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    ...mapState({
      items: (state) => state.item.items,
      itemType: (state) => state.item.itemType,
      status: (state) => state.item.status,
      page: (state) => state.item.page,
      item: (state) => state.item.item,
      filterType: (state) => state.item.filterType,
      search: (state) => state.item.search,
    }),
  },
  watch: {
    drawer(val) {
      if (!val) {
        this.getItems();
      }
    },
    update() {
      this.getItems();
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getItems() {
      this.loading = true;
      getItem({
        headers: this.headers,
        page: this.page,
        params: {
          filterType: this.filterType,
          search: this.search,
        },
      })
        .then((result) => {
          this.loading = false;
          this.$store.commit("updateItems", result.data.data);
          this.$store.commit("updateTotal", result.data.total);
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
    tag(type) {
      const switchType = ["", "success", "info"];
      return switchType[type];
    },
    edit(index) {
      this.$store.commit("updateItem", this.items[index]);
      this.$emit("showDrawer");
    },
  },
  mounted() {
    this.getItems(1); // 获取第一页数据
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
img {
  width: 60px;
  height: 60px;
}
</style>