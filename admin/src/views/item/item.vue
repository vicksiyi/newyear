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
                  {{ scope.$index + 1 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="类别名称" width="100">
              <template slot-scope="scope">
                <div>
                  {{ scope.row }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="type-action">
                  <div>
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-top"
                      :disabled="scope.$index === 0 ? true : false"
                    ></el-button>
                  </div>
                  <div>
                    <el-button
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
                      @click="delType(scope.$index)"
                      type="danger"
                      size="mini"
                      >删除</el-button
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
                :key="item"
                :label="item"
                :value="item"
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
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <p>{{ scope.row.name }}</p>
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
                <el-tag>
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template>
                <el-button type="warning" size="mini">编辑</el-button>
                <el-button type="danger" size="mini">下架</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-drawer
      :title="isItem ? '添加商品' : '添加类别'"
      :visible.sync="drawer"
      :direction="direction"
      :size="600"
    >
      <ItemSubmit v-if="isItem"></ItemSubmit>
      <TypeSubmit v-else></TypeSubmit>
    </el-drawer>
  </div>
</template>

<script>
import ItemSubmit from "@/components/Item/ItemSubmit";
import TypeSubmit from "@/components/Item/TypeSubmit";
export default {
  name: "item",
  components: { ItemSubmit, TypeSubmit },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      isItem: true,
      itemType: [
        "盒联1.1m",
        "盒联1.3m",
        "盒联1.6m",
        "盒联2.2m",
        "盒联3.0m",
        "二开直联",
        "二开半直联",
        "三开直联",
        "四开直联",
        "五开直联",
        "红包",
        "中国结",
      ],
      items: [
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "上联:春夏秋冬行好运 下联:东西南北遇贵人 横批:出入平安",
          money: "11.9",
          status: "已上架",
          num: "20",
          type: "盒联1.1m",
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
      ],
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
      search:""
    };
  },
  methods: {
    delType() {
      this.$confirm("是否删除{}类别?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addItem() {
      this.isItem = true;
      this.drawer = true;
    },
    addType() {
      this.isItem = false;
      this.drawer = true;
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