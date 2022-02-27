<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-button
          type="primary"
          @click="addType()"
          size="medium"
          icon="el-icon-plus"
          >添加类别</el-button
        >
        <el-card style="margin-top: 20px" shadow="hover">
          <ShowItemType></ShowItemType>
        </el-card>
      </el-col>
      <el-col :span="16">
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
              v-model="filterType"
              @change="getFilter"
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
          <ShowItems></ShowItems>
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
      </el-col>
    </el-row>
    <el-drawer
      :title="isItem ? (isEdit ? '编辑商品' : '添加商品') : '添加类别'"
      :visible.sync="drawer"
      :direction="direction"
      :size="600"
      v-if="isShow"
    >
      <ItemSubmit
        v-if="isItem"
        @closeDrawer="closeDrawer"
        :itemType="itemType"
        :status="statusList"
        :isEdit="isEdit"
        :item="item"
      ></ItemSubmit>
      <TypeSubmit @closeDrawer="closeDrawer" v-else></TypeSubmit>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ItemSubmit from "@/components/Item/ItemSubmit";
import TypeSubmit from "@/components/Item/TypeSubmit";
import ShowItemType from "@/components/Item/ShowItemType";
import ShowItems from "@/components/Item/ShowItems";
import Loading from "@/common/loading";
export default {
  name: "item",
  components: { ItemSubmit, TypeSubmit, ShowItemType, ShowItems },
  data() {
    return {
      item: {},
      total: 0,
      isEdit: false,
      isShow: false,
      statusList: ["待上架", "已上架", "已下架"],
      drawer: false,
      direction: "rtl",
      isItem: true,
      items: [],
      filterType: "",
      search: "",
      page: 1,
    };
  },
  computed: {
    ...mapState({
      itemType: (state) => state.item.itemType,
    }),
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
    addType() {
      this.isShow = true;
      this.isItem = false;
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
    // 数据加载
    async getData() {
      let _this = this;
      const loading = Loading.start(_this);
      const params = {
        headers: this.headers,
      };
      Promise.all([
        // 判断是否存在类别筛选
        this.filterType
          ? getFilterItem({
              ...params,
              page: this.page,
              typeId: this.filterType,
            })
          : getItem({ ...params, page: this.page }),
        // 判断是不是类别筛选下的数据获取 [总数]
        this.filterType
          ? getFilterNum({
              ...params,
              typeId: this.filterType,
            })
          : getNum({ ...params, page: this.page }),
      ])
        .then((_result) => {
          _this.items = _result[1].data.data;
          _this.total = _result[2].data.total;
          Loading.end(loading);
        })
        .catch((err) => {
          console.log(err);
          Loading.end(loading);
          this.$message.error("未知错误");
        });
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