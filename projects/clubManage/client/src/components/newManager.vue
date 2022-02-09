<template>
  <div class="newManageDialog">
    <el-dialog
      :title="newManageDialog.title"
      :visible.sync="newManageDialog.show"
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
          <el-form-item label="姓名:" prop="name">
            <el-input type="name" v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item label="学号:" prop="studentid">
            <el-input type="name" v-model="formData.studentid"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="danger" @click="newManageDialog.show = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="onSubmit('form')"
              v-if="newManageDialog.title == '新增部门管理员'"
              >新增部门管理员</el-button
            >
            <el-button
              type="primary"
              @click="onSubmit('form')"
              v-if="newManageDialog.title == '新增学院管理员'"
              >新增学院管理员</el-button
            >
            <el-button
              type="primary"
              @click="onSubmit2('form')"
              v-if="newManageDialog.title == '编辑部门管理员'"
              >编辑部门管理员</el-button
            >
            <el-button
              type="primary"
              @click="onSubmit2('form')"
              v-if="newManageDialog.title == '编辑学院管理员'"
              >编辑学院管理员</el-button
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
      form_rules: {
        name: [{ required: true, message: "姓名不能为空!", trigger: "blur" }],
        studentid: [
          { required: true, message: "学号不能为空!", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    newManageDialog: Object,
    formData: Object,
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios
            .post(`/api/manage/new/manager`, this.formData)
            .then((res) => {
              //   console.log(res.data);
              if (res.data.status == 200) {
                this.$message({
                  message: "新增管理员成功",
                  type: "success",
                });
                this.newManageDialog.show = false;
                this.$router.go(0);
              } else {
                this.$message(res.data.msg);
              }
            });
        }
      });
    },
    onSubmit2(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios
            .post(`/api/manage/edit/manager`, this.formData)
            .then((res) => {
              if (res.data.status == 200) {
                this.$message({
                  message: "编辑管理员成功",
                  type: "success",
                });
                this.newManageDialog.show = false;
                this.$router.go(0);
              } else {
                this.$message(res.data.msg);
              }
            });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>