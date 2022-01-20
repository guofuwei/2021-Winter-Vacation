<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">社团管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="registerUser.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="院系" prop="faculty">
            <el-select v-model="registerUser.faculty" placeholder="请选择院系">
              <el-option label="电子信息与通信学院" value="电子信息与通信学院">
              </el-option>
              <el-option label="光学与电子信息学院" value="光学与电子信息学院">
              </el-option>
              <el-option label="社会学院" value="社会学院"> </el-option>
              <el-option label="管理学院" value="管理学院"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="班级" prop="classroom">
            <el-select
              v-model="registerUser.classroom"
              placeholder="请选择班级"
            >
              <el-option
                v-for="(classroom, index) in classrooms_list"
                :key="index"
                :label="classroom"
                :value="classroom"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="学号" prop="studentid">
            <el-input
              v-model="registerUser.studentid"
              placeholder="请输入学号"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerUser.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="password2">
            <el-input
              v-model="registerUser.password2"
              placeholder="请输入确认密码"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item label="身份" prop="identity">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="普通学生" value="普通学生"> </el-option>
              <el-option label="部门管理员" value="部门管理员"> </el-option>
              <el-option label="系统管理员" value="系统管理员"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('registerForm')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        faculty: "",
        classroom: "",
        studentid: "",
        password: "",
        identity: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 30,
            message: "长度在2到30个字符之间",
            trigger: "blur",
          },
        ],
        faculty: [
          {
            required: true,
            message: "院系不能为空",
            trigger: "blur",
          },
        ],
        classroom: [
          {
            required: true,
            message: "班级不能为空",
            trigger: "blur",
          },
        ],
        studentid: [
          {
            required: true,
            message: "学号不能为空",
            trigger: "blur",
          },
          {
            min: 5,
            max: 11,
            message: "长度在6-11之间",
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
        identity: [
          {
            required: true,
            message: "身份不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    classrooms_list() {
      if (this.registerUser.faculty == "电子信息与通信学院") {
        return ["通信1801班", "通信1802班", "电信1903班", "电磁2001班"];
      } else if (this.registerUser.faculty == "光学与电子信息学院") {
        return ["光电1902班", "光电2011班", "光电2012班", "光电2013班"];
      } else if (this.registerUser.faculty == "社会学院") {
        return ["社科2001班", "社科2004班"];
      } else if (this.registerUser.faculty == "管理学院") {
        return ["管理2101班", "管工2001班"];
      } else {
        return [];
      }
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/user/register", this.registerUser)
            .then((res) => {
              // 注册成功
              this.$message({
                message: "账号注册成功",
                type: "success",
              });
            })
            .catch((err) => {
              console.error(err);
            });
          this.$router.push("/login");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>


<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 200px;
  position: absolute;
  top: 5%;
  left: 34%;
  padding: 0px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 10px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style> 