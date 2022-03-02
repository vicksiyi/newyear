<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="图片上传" prop="fileList">
      <el-upload
        name="image"
        action="http://localhost:8080/api/upload/images"
        list-type="picture-card"
        :headers="headers"
        :before-upload="beforeUploadLimit"
        :on-success="handleSwiperSuccess"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="类型选择" prop="selected">
      <el-select
        style="width: 100%"
        v-model="ruleForm.selected"
        placeholder="请选择"
      >
        <el-option
          v-for="item in types"
          :key="item.id"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <div>
        <el-button
          @click="submitForm('ruleForm')"
          style="margin-top: 20px; width: 100%"
          type="primary"
          >提交图片</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { pageForm, pageRules } from "@/common/rules";
import Upload from "@/common/upload";
import Form from "@/common/form";
import { add } from "@/api/page";
import Loading from "@/common/loading";
export default {
  name: "Upload",
  data() {
    return {
      ruleForm: pageForm,
      rules: pageRules,
      selected: "",
    };
  },
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    ...mapState({
      types: (state) => state.page.types,
    }),
  },
  methods: {
    handleRemove(file, fileList) {
      const name = file.response.file;
      const index = this.fileList.indexOf(name);
      this.ruleForm.fileList.splice(index, 1);
    },
    handleSwiperSuccess(res, file) {
      this.ruleForm.fileList.push(res.file);
    },
    beforeUploadLimit(file) {
      return (
        Upload.beforeUploadLimitImage(this, file) &&
        Upload.beforeUploadLimitLength(this, this.ruleForm.fileList, 2)
      );
    },
    // 上传图片到OSS
    uploadImageList(fileList, type) {
      // fileList
      const params = {
        headers: this.headers,
        data: { files: fileList, type: type },
      };
      const loading = Loading.start(this);
      add(params)
        .then((_result) => {
          Loading.end(loading);
          Form.tips(this, _result.data.code, _result.data.msg);
          this.ruleForm = Object.assign({}, pageForm);
          this.$emit("closeDrawer");
        })
        .catch((err) => {
          Loading.end(loading);
          Form.tips(this, 400, "未知错误");
        });
    },
    submitForm(forName) {
      Form.validate(this, forName).then((res) => {
        if (res) {
          let index = this.types.indexOf(this.selected);
          index = index === -1 ? 0 : index;
          this.uploadImageList(this.ruleForm.fileList, index);
        }
      });
      //   this.$emit("addImage", this.fileList, this.selected());
    },
  },
};
</script>

<style scoped>
.page-content {
  padding: 20px;
}
</style>