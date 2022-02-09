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
          :model="departCollageData"
          :rules="form_rules"
          label-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item label="职能部门:" prop="department">
            <el-input
              type="department"
              v-model="departCollageData.department"
            ></el-input>
          </el-form-item>

          <el-form-item label="二级学院:" prop="collage">
            <el-input
              type="collage"
              v-model="departCollageData.collage"
            ></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="danger" @click="dialog.show = false"
              >取消</el-button
            >
            <el-button type="primary" @click="onSubmit('form')"
              >确认修改</el-button
            >
            <el-button
              type="primary"
              @click="handleDeleteDepart()"
              v-if="departCollageData.depart_id != null"
              >删除部门</el-button
            >
            <el-button
              type="primary"
              @click="handleDeleteCollage()"
              v-if="departCollageData.collage_id != null"
              >删除学院</el-button
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
        department: [
          { required: true, message: "部门不能为空!", trigger: "blur" },
        ],
        collage: [
          { required: true, message: "学院不能为空!", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    dialog: Object,
    departCollageData: Object,
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios
            .post(`api/manage/edit/departcollage`, this.departCollageData)
            .then((res) => {
              //   console.log(res.data);
              if (res.data.status == 200) {
                this.$message({
                  message: "编辑部门/学院成功",
                  type: "success",
                });
                this.dialog.show = false;
                this.$router.go(0);
              } else {
                this.$message(res.data.msg);
              }
            });
        }
      });
    },
    handleDeleteCollage() {
      this.$axios
        .delete(
          `/api/manage/delete/collage/${this.departCollageData.collage_id}`
        )
        .then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.$router.go(0);
        });
    },
    handleDeleteDepart() {
      this.$axios
        .delete(`/api/manage/delete/depart/${this.departCollageData.depart_id}`)
        .then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.$router.go(0);
        });
    },
  },
};
</script>

<style scoped>
</style>