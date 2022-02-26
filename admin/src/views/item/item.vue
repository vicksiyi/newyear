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
          <el-table
            :data="itemType"
            height="400"
            style="width: 100%; overflow-x: hidden; max-height: 400px"
          >
            <el-table-column label="优先级" width="70">
              <template slot-scope="scope">
                <div style="width: 35px; text-align: center">
                  {{ scope.row.priority }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="类别名称" width="100">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="type-action">
                  <div>
                    <el-button
                      @click="swap(scope.$index, 0)"
                      type="primary"
                      size="mini"
                      icon="el-icon-top"
                      :disabled="scope.$index === 0 ? true : false"
                    ></el-button>
                  </div>
                  <div>
                    <el-button
                      @click="swap(scope.$index, 1)"
                      type="primary"
                      size="mini"
                      icon="el-icon-bottom"
                      :disabled="
                        scope.$index === itemType.length - 1 ? true : false
                      "
                    ></el-button>
                  </div>
                  <div>
                    <el-button
                      v-if="scope.row.status === 1"
                      @click="switchType(scope.$index, 0)"
                      type="danger"
                      size="mini"
                      >隐藏</el-button
                    >
                    <el-button
                      v-else
                      @click="switchType(scope.$index, 1)"
                      type="success"
                      size="mini"
                      >显示</el-button
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
            <el-select v-model="value" clearable placeholder="类别筛选">
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
                <el-button icon="el-icon-search" circle></el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-card style="margin-top: 20px" shadow="hover">
          <el-table
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
                <img :src="scope.row.url" alt="" />
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
                <el-button
                  type="warning"
                  @click="edit(scope.$index)"
                  size="mini"
                  >编辑</el-button
                >
                <!-- <el-button type="danger" size="mini">下架</el-button> -->
              </template>
            </el-table-column>
          </el-table>
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
import { mapGetters } from "vuex";
import {
  getItemType,
  downItemType,
  upItemType,
  swapItemType,
} from "@/api/item/type";
import { getItem } from "@/api/item/item";
import ItemSubmit from "@/components/Item/ItemSubmit";
import TypeSubmit from "@/components/Item/TypeSubmit";
export default {
  name: "item",
  components: { ItemSubmit, TypeSubmit },
  data() {
    return {
      item: {},
      isEdit: false,
      isShow: false,
      statusList: ["待上架", "已上架", "已下架"],
      drawer: false,
      direction: "rtl",
      isItem: true,
      itemType: [],
      items: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      search: "",
    };
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  },
  methods: {
    async swap(index, type) {
      let id2;
      const id1 = this.itemType[index].id;
      if (type === 0) id2 = this.itemType[index - 1].id;
      else id2 = this.itemType[index + 1].id;
      const _result = await swapItemType({
        data: { id1: id1, id2: id2 },
        headers: this.headers,
      }).catch((err) => {
        this.$message.error("未知错误");
      });
      if (_result.data.code === 200) {
        this.$message({
          type: "success",
          message: `成功${type === 0 ? "隐藏" : "显示"}`,
        });
        this.getData();
      } else this.$message.error(_result.data.msg);
    },
    // 隐藏&显示
    switchType(index, type) {
      const _this = this;
      const id = this.itemType[index].id;
      this.$confirm(
        `是否${type === 0 ? "隐藏" : "显示"}${
          this.itemType[index].title
        }类别?以及相关数据？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          let _result;
          // 判断隐藏还是显示
          if (type === 0) {
            _result = await downItemType({
              id: id,
              headers: this.headers,
            }).catch((err) => {
              this.$message.error("未知错误");
            });
          } else {
            _result = await upItemType({
              id: id,
              headers: this.headers,
            }).catch((err) => {
              this.$message.error("未知错误");
            });
          }
          if (_result.data.code === 200) {
            this.$message({
              type: "success",
              message: `成功${type === 0 ? "隐藏" : "显示"}`,
            });
            this.getData();
          } else {
            this.$message.error(_result.data.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消${type === 0 ? "隐藏" : "显示"}`,
          });
        });
    },
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
    async getData() {
      let _this = this;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const params = {
        headers: this.headers,
      };
      Promise.all([getItemType(params), getItem({ ...params, page: 0 })])
        .then((_result) => {
          console.log(_result[1].data.data);
          _this.itemType = _result[0].data.data;
          _this.items = _result[1].data.data;
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("未知错误");
        });
      loading.close();
      // this.itemType = _result.data.data;
    },
    tag(type) {
      switch (type) {
        case 0:
          return "";
        case 1:
          return "success";
        default:
          return "info";
      }
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
  },
  mounted: function () {
    this.getData();
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
.type-action {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
img {
  width: 60px;
  height: 60px;
}
</style>