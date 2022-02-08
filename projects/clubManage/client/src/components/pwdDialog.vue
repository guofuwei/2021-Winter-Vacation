<template>
  <div class="dialog">
    <el-dialog
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
          <el-form-item prop="oldpassword" label="原密码:">
            <el-input type="password" v-model="formData.oldpassword"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="新密码:">
            <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item prop="password2" label="确定密码:">
            <el-input type="password" v-model="formData.password2"></el-input>
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
  name: "pwddialog",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        oldpassword: "",
        password: "",
        password2: "",
      },
      form_rules: {
        oldpassword: [
          {
            required: true,
            message: "旧密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30之间",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30之间",
            trigger: "blur",
          },
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    dialog: Object,
  },

  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios.post(`/api/user/changepwd`, this.formData).then((res) => {
            this.$message({
              message: "密码修改成功",
              type: "success",
            });
            this.dialog.show = false;
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>