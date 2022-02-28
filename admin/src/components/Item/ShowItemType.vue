<template>
  <el-table
    v-loading="loading"
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
              :disabled="scope.$index === itemType.length - 1 ? true : false"
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
</template>

<script>
import { mapState, mapGetters } from "vuex";
import {
  getItemType,
  downItemType,
  upItemType,
  swapItemType,
} from "@/api/item/type";
export default {
  name: "ShowItemType",
  props: {
    getItemType: {
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
      itemType: (state) => state.item.itemType,
    }),
  },
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    getItemType(res) {
      this.getData();
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
          message: `成功交换位置`,
        });
        this.getData();
      } else this.$message.error(_result.data.msg);
    },
    // 隐藏&显示
    switchType(index, type) {
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
    getData() {
      this.loading = true;
      getItemType({ headers: this.headers })
        .then((result) => {
          this.loading = false;
          this.$store.commit("updateItemType", result.data.data);
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("未知错误");
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>


<style scoped>
.type-action {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
