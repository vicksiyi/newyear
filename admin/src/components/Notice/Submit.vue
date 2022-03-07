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
import { mapGetters, mapState } from "vuex";
import Form from "@/common/form";
import { add, update } from "@/api/notice";
import { mergeTime } from "@/common/time";
import { noticeForm, noticeRules } from "@/common/rules";
export default {
  name: "Submit",
  computed: {
    ...mapGetters("header", ["getHeader"]),
    headers() {
      return this.$store.getters["header/getHeader"];
    },
    ...mapState({
      isEdit: (state) => state.notice.isEdit,
      notice: (state) => state.notice.notice,
    }),
  },
  watch: {
    isEdit(val) {
      if (val == true) {
        console.log(true);
      }
    },
  },
  data() {
    return {
      ruleForm: JSON.parse(JSON.stringify(noticeForm)),
      rules: JSON.parse(JSON.stringify(noticeRules)),
    };
  },
  methods: {
    getParams() {
      let data = {
        title: this.ruleForm.title,
        content: this.ruleForm.content,
        startTime: mergeTime(
          this.ruleForm.startTime1,
          this.ruleForm.startTime2
        ),
        endTime: mergeTime(this.ruleForm.endTime1, this.ruleForm.endTime2),
      };
      return {
        headers: this.headers,
        data: data,
      };
    },
    submitForm(formName) {
      Form.validate(this, formName)
        .then(async (res) => {
          if (res) {
            const params = this.getParams();
            const _result = await add(params).catch((err) => {
              this.$message.error("未知错误");
            });
            Form.tips(this, _result.data.code, _result.data.msg);
            this.ruleForm = JSON.parse(JSON.stringify(noticeForm));
            this.$emit("closeDrawer"); // 关闭抽屉，并刷新获取数据
          }
        })
        .catch((err) => console.log(err));
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
