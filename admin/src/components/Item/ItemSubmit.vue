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
        <el-upload
          name="image"
          class="avatar-uploader"
          :headers="headers"
          action="http://localhost:8080/api/upload/images"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.url" :src="ruleForm.url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
          @click="submitForm('ruleForm')"
          >添加商品</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addItem, editItem } from "@/api/item/item";
export default {
  name: "ItemSubmit",
  props: {
    itemType: {
      type: Array,
      default() {
        return [];
      },
    },
    status: {
      type: Array,
      default() {
        return [];
      },
    },
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filename: "",
      ruleForm: {
        url: "",
        filename: "",
        title: "",
        type: "",
        money: "",
        num: "",
        status: "",
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        url: [{ required: true, message: "请上传商品图片", trigger: "blur" }],
        type: [
          {
            required: true,
            message: "请选择上传类型",
            trigger: "blur",
          },
        ],
        money: [{ required: true, message: "请输入商品金额", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品剩余数量", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择商品状态", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    isEdit(val) {
      this.isEdit = val;
    },
    item: {
      handler() {
        this.$nextTick(() => {
          this.ruleForm =
            JSON.stringify(this.item) === "{}"
              ? {
                  url: "",
                  filename: "",
                  title: "",
                  type: "",
                  money: "",
                  num: "",
                  status: "",
                }
              : this.item;
        });
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = Object.assign({}, _this.ruleForm);
          data.status = _this.status.indexOf(data.status);
          data.filename && delete data.url;
          const params = {
            headers: _this.headers,
            data: data,
          };
          let _result;
          if (this.isEdit) {
            params.data.type = _this.toType(params.data.type);
            _result = await editItem(params).catch((err) => {
              this.$message.error("未知错误");
            });
          } else {
            _result = await addItem(params).catch((err) => {
              this.$message.error("未知错误");
            });
          }
          if (_result.data.code === 200) {
            this.$message({
              message: `成功${_this.isEdit ? "修改" : "添加"}`,
              type: "success",
            });
            this.$emit("closeDrawer");
          } else this.$message.error(_result.data.msg);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.url = URL.createObjectURL(file.raw);
      this.ruleForm.filename = res.file;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    toType(label) {
      if (typeof label === "number") return label;
      for (let i = 0; i < this.itemType.length; i++) {
        if (this.itemType[i].title == label) return this.itemType[i].id;
      }
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
