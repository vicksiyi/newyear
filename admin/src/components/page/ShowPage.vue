<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-button
          @click="add()"
          type="primary"
          size="medium"
          icon="el-icon-plus"
          >添加图片</el-button
        >
      </el-col>
      <el-col :span="5">
        <el-select
          :value="selected"
          @change="selectChange"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in selects"
            :key="item.id"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="shows"
      :height="500"
      style="width: auto"
    >
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image
            :preview-src-list="[scope.row.url]"
            style="width: 100px; height: 100px"
            :src="scope.row.url"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === 0 ? 'success' : 'warning'">
            {{ scope.row.type | filterType }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-popconfirm title="是否删除吗？" @confirm="delImage(scope.row.id)">
            <el-button slot="reference" size="mini" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="图片上传"
      :size="600"
      :visible.sync="drawer"
      :direction="direction"
    >
      <Upload :drawer="drawer" @closeDrawer="closeDrawer"></Upload>
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Upload from "@/components/page/Upload";
import Form from "@/common/form";
import { get, del } from "@/api/page";
export default {
  name: "ShowPage",
  components: { Upload },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      loading: false,
    };
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    ...mapState({
      selects: (state) => state.page.types,
      images: (state) => state.page.images,
    }),
    selected() {
      return this.$store.state.page.selected;
    },
    shows() {
      return this.images.filter((val) => {
        return this.selected === ""
          ? true
          : this.$store.state.page.types.indexOf(this.selected) === val.type;
      });
    },
  },
  methods: {
    delImage(id) {
      this.loading = true;
      const params = {
        headers: this.headers,
        id: id,
      };
      del(params)
        .then((res) => {
          this.loading = false;
          this.get();
        })
        .catch((err) => {
          this.loading = false;
          Form.tips(this, 400, "未知错误");
        });
    },
    add() {
      this.drawer = true;
    },
    closeDrawer() {
      this.get();
      this.drawer = false;
    },
    // 获取数据
    get() {
      this.loading = true;
      const params = {
        headers: this.headers,
      };
      get(params)
        .then((res) => {
          this.loading = false;
          this.$store.commit("updateImages", res.data.data);
        })
        .catch((err) => {
          this.loading = false;
          Form.tips(this, 400, "未知错误");
        });
    },
    selectChange(val) {
      this.$store.commit("updateSelected", val);
    },
  },
  filters: {
    filterType(val) {
      if (val > 1) val = 1;
      const types = ["轮播图", "首页图"];
      return types[val];
    },
  },
  mounted() {
    this.get();
  },
};
</script>

<style scoped>
.add-image {
  height: auto;
  font-size: 50px;
  padding: 28%;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.item-img {
  position: relative;
}
.bg {
  position: absolute;
  background: rgba(8, 7, 7, 0.6);
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
}
</style>