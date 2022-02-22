<template>
  <div class="notice-submit">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="公告标题" prop="title" required>
        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="公告正文" prop="content" required>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入正文"
          show-word-limit
          maxlength="200"
          v-model="ruleForm.content"
        ></el-input>
      </el-form-item>
      <el-form-item label="开始时间" required>
        <el-col :span="11">
          <el-form-item prop="startTime1">
            <el-date-picker
              type="date"
              placeholder="选择开始日期"
              v-model="ruleForm.startTime1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="startTime2">
            <el-time-picker
              placeholder="选择开始时间"
              v-model="ruleForm.startTime2"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间" required>
        <el-col :span="11">
          <el-form-item prop="endTime1">
            <el-date-picker
              type="date"
              placeholder="选择结束日期"
              v-model="ruleForm.endTime1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endTime2">
            <el-time-picker
              placeholder="选择结束时间"
              v-model="ruleForm.endTime2"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          @click="submitForm('ruleForm')"
          >添加公告</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Submit",
  data() {
    return {
      ruleForm: {
        title: "",
        content: "",
        startTime1: "",
        startTime2: "",
        endTime1: "",
        endTime2: "",
      },
      rules: {
        title: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入公告正文", trigger: "blur" },
        ],
        startTime1: [
          {
            type: "date",
            required: true,
            message: "请选择开始日期",
            trigger: "change",
          },
        ],
        startTime2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        endTime1: [
          {
            type: "date",
            required: true,
            message: "请选择开始日期",
            trigger: "change",
          },
        ],
        endTime2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted: function () {},
};
</script>


<style scoped>
.notice-submit {
  padding: 20px;
}
</style>
