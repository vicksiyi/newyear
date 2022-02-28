<template>
  <div class="form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品图片" prop="url">
        <AvatarUpload
          :url="ruleForm.url"
          @changeFileName="changeFileName"
        ></AvatarUpload>
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input
          v-model="ruleForm.title"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品类别" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择商品类别">
          <el-option
            v-for="item in itemType"
            :label="item.title"
            :key="item.id"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品金额" prop="money">
        <el-input
          type="number"
          v-model="ruleForm.money"
          placeholder="请输入商品金额"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品剩余量" prop="num">
        <el-input
          type="number"
          v-model="ruleForm.num"
          placeholder="请输入商品剩余量"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio
            v-for="(item, index) in status"
            :key="index"
            :label="item"
            :value="index"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          @click="isEdit ? editForm('ruleForm') : addForm('ruleForm')"
          >{{ isEdit ? "修改商品" : "添加商品" }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { addItem, editItem } from "@/api/item/item";
import { itemRules, itemForm } from "@/common/rules";
import AvatarUpload from "@/components/Common/AvatarUpload";
import Form from "@/common/form";
export default {
  name: "ItemSubmit",
  components: { AvatarUpload },
  data() {
    return {
      ruleForm: itemForm,
      rules: itemRules,
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    ...mapState({
      itemType: (state) => state.item.itemType,
      item: (state) => state.item.item,
      status: (state) => state.item.status,
      page: (state) => state.item.page,
    }),
  },
  watch: {
    item: {
      handler() {
        if (JSON.stringify(this.item) !== "{}") {
          this.ruleForm = Object.assign({}, this.item);
          this.ruleForm.status = this.status[this.ruleForm.status];
          this.isEdit = true;
        } else {
          this.ruleForm = Object.assign({}, itemForm);
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 获取请求参数
    getParams() {
      const data = Object.assign({}, this.ruleForm);
      data.status = this.status.indexOf(data.status);
      data.filename && delete data.url;
      const params = {
        headers: this.headers,
        data: data,
      };
      if (this.isEdit) {
        params.data.type = this.toType(params.data.type);
      }
      return params;
    },
    // 添加商品
    addForm(formName) {
      Form.validate(this, formName)
        .then(async (res) => {
          if (res) {
            const params = this.getParams();
            const _result = await addItem(params).catch((err) => {
              this.$message.error("未知错误");
            });
            Form.tips(this, _result.data.code, _result.data.msg);
            this.ruleForm = itemForm;
            this.$emit("closeDrawer"); // 关闭抽屉，并刷新获取数据
          }
        })
        .catch((err) => console.log(err));
    },
    // 编辑商品
    editForm(formName) {
      Form.validate(this, formName).then(async (res) => {
        if (res) {
          const params = this.getParams();
          const _result = await editItem(params).catch((err) => {
            this.$message.error("未知错误");
          });
          Form.tips(this, _result.data.code, _result.data.msg);
          this.$emit("closeDrawer"); // 关闭抽屉，并刷新获取数据
        }
      });
    },
    toType(label) {
      if (typeof label === "number") return label;
      for (let i = 0; i < this.itemType.length; i++) {
        if (this.itemType[i].title == label) return this.itemType[i].id;
      }
    },
    // 上传图片返回的url和filename
    changeFileName(filename, url) {
      this.ruleForm.filename = filename;
      this.ruleForm.url = url;
    },
    mounted() {
      console.log(123123123, this.$store.getters["header/getHeader"]);
    },
  },
};
</script>


<style scoped>
.form {
  padding: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
