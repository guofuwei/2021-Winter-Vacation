<template>
  <div class="dialog">
    <el-dialog
      :title="appealDialog.title"
      :visible.sync="appealDialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item label="活动名称:" prop="act_name">
            {{ formData.act_name }}
          </el-form-item>

          <el-form-item prop="reason" label="申诉理由:">
            <el-input type="textarea" v-model="formData.reason"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="danger" @click="appealDialog.show = false"
              >取消</el-button
            >
            <el-button type="primary" @click="onSubmit('form')"
              >确认申诉</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "appealdialog",
  data() {
    return {
      form_rules: {
        reason: [
          { required: true, message: "申诉理由不能为空!", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    appealDialog: Object,
    formData: Object,
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios.post(`/api/appeal/add`, this.formData).then((res) => {
            this.$message({
              message: "申诉成功",
              type: "success",
            });
            this.appealDialog.show = false;
            this.$router.go(0);
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>