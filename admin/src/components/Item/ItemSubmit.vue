<template>
  <div class="form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品图片" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="ruleForm.imageUrl"
            :src="ruleForm.imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品类别" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择商品类别">
          <el-option
            v-for="item in selectItem"
            :label="item"
            :key="item"
            :value="item"
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
      <el-form-item label="商品剩余量" prop="name">
        <el-input
          type="number"
          v-model="ruleForm.num"
          placeholder="请输入商品剩余量"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="待上架" :value="0"></el-radio>
          <el-radio label="已上架" :value="1"></el-radio>
          <el-radio label="已下架" :value="2"></el-radio>
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
export default {
  name: "ItemSubmit",
  data() {
    return {
      selectItem: [
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
      ruleForm: {
        imageUrl: "",
        name: "",
        type: "",
        money: "",
        num: "",
        status: "",
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        imageUrl: [
          { required: true, message: "请上传商品图片", trigger: "change" },
        ],
        type: [
          {
            required: true,
            message: "请选择上传类型",
            trigger: "change",
          },
        ],
        money: [{ required: true, message: "请输入商品金额", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品剩余数量", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择商品状态", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.ruleForm.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
