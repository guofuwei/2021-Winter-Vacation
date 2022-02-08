<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
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
          <el-form-item prop="stu_name" label="姓名:">
            {{ formData.stu_name }}
          </el-form-item>

          <el-form-item prop="stu_id" label="学号:">
            {{ formData.stu_studentid }}
          </el-form-item>

          <el-form-item prop="Name" label="评分大类:">
            {{ formData.Name }}
          </el-form-item>

          <el-form-item
            v-for="(name, index) in formData.names"
            :label="name"
            :key="index"
          >
            <el-select v-model="formData.scores[index]" placeholder="打分分数">
              <el-option
                v-for="(formtype, index2) in format_type_list[index]"
                :key="index2"
                :label="formtype"
                :value="formtype"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="danger" @click="dialog.show = false"
              >取消</el-button
            >
            <el-button type="primary" @click="onSubmit('form')"
              >确认提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "myactdialog",
  data() {
    return {
      format_type_list: [
        ["1分", "2分", "3分"],
        ["1分", "3分", "5分"],
        ["1分", "2分", "3分", "4分", "5分"],
      ],
      form_rules: {},
    };
  },
  props: {
    dialog: Object,
    formData: Object,
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //   console.log(this.formData);
          if (this.formData.names.length != this.formData.scores.length) {
            this.$message({
              type: "warning",
              message: "某些小类打分为空",
            });
            return;
          }
          this.$axios.post(`/api/score/newscore`, this.formData).then((res) => {
            this.$message({
              message: "打分成功",
              type: "success",
            });
            this.dialog.show = false;
            this.$emit("update");
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>