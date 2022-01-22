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
          <el-form-item prop="name" label="姓名:">
            <el-input type="name" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item prop="faculty" label="院系:">
            <el-input type="faculty" v-model="formData.faculty"></el-input>
          </el-form-item>

          <el-form-item prop="classroom" label="班级:">
            <el-input type="classroom" v-model="formData.classroom"></el-input>
          </el-form-item>

          <el-form-item prop="studentid" label="学号:">
            <el-input type="studentid" v-model="formData.studentid"></el-input>
          </el-form-item>

          <el-form-item label="身份:">
            <el-select v-model="formData.identity" placeholder="身份">
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="primary" @click="onSubmit('form')"
              >确定 修改</el-button
            >
            <el-button type="primary" @click="dialog.show = false"
              >取 消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "infodialog",
  computed: {
    user() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      format_type_list: ["普通学生", "部门管理员", "系统管理员"],
      form_rules: {
        name: [{ required: true, message: "姓名不能为空!", trigger: "blur" }],
        faculty: [
          { required: true, message: "院系不能为空!", trigger: "blur" },
        ],
        classroom: [
          { required: true, message: "班级不能为空!", trigger: "blur" },
        ],
        studentid: [
          { required: true, message: "学号不能为空!", trigger: "blur" },
        ],
        identity: [
          { required: true, message: "身份不能为空!", trigger: "blur" },
        ],
      },
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
          this.$axios
            .post(`/api/user/changeinfo`, this.formData)
            .then((res) => {
              this.$message({
                message: "数据添加成功",
                type: "success",
              });
              this.dialog.show = false;
              this.$store.dispatch("setUser", this.formData);
              localStorage.setItem("eleToken", res.data.token);
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