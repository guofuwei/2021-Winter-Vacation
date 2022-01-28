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
            <el-select v-model="formData.faculty" placeholder="请选择院系">
              <el-option label="电子信息与通信学院" value="电子信息与通信学院">
              </el-option>
              <el-option label="光学与电子信息学院" value="光学与电子信息学院">
              </el-option>
              <el-option label="社会学院" value="社会学院"> </el-option>
              <el-option label="管理学院" value="管理学院"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="classroom" label="班级:">
            <el-select v-model="formData.classroom" placeholder="请选择班级">
              <el-option
                v-for="(classroom, index) in classrooms_list"
                :key="index"
                :label="classroom"
                :value="classroom"
              >
              </el-option>
            </el-select>
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
  computed: {
    classrooms_list() {
      if (this.formData.faculty == "电子信息与通信学院") {
        return ["通信1801班", "通信1802班", "电信1903班", "电磁2001班"];
      } else if (this.formData.faculty == "光学与电子信息学院") {
        return ["光电1902班", "光电2011班", "光电2012班", "光电2013班"];
      } else if (this.formData.faculty == "社会学院") {
        return ["社科2001班", "社科2004班"];
      } else if (this.formData.faculty == "管理学院") {
        return ["管理2101班", "管工2001班"];
      } else {
        return [];
      }
    },
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
                message: "信息修改成功",
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