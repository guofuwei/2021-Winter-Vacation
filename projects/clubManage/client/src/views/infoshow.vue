<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="12">
        <div class="user">
          <el-button
            size="common"
            type="primary"
            @click="changeInfo()"
            class="changebtn"
            >修改个人信息</el-button
          >
          <div class="user-item">
            <span>姓名:{{ user.name }}</span>
          </div>
          <div class="user-item">
            <span>院系:{{ user.faculty }}</span>
          </div>
          <div class="user-item">
            <span>班级:{{ user.classroom }}</span>
          </div>
          <div class="user-item">
            <span>学号:{{ user.studentid }}</span>
          </div>
          <div class="user-item">
            <span>身份:{{ user.identity }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="userinfo">
          <div class="user-item">
            <span>总分:{{ scoreData[5] }}分</span>
          </div>
          <div class="user-item">
            <span>德育:{{ scoreData[0] }}分</span>
          </div>
          <div class="user-item">
            <span>智育:{{ scoreData[1] }}分</span>
          </div>
          <div class="user-item">
            <span>体育:{{ scoreData[2] }}分</span>
          </div>
          <div class="user-item">
            <span>美育:{{ scoreData[3] }}分</span>
          </div>
          <div class="user-item">
            <span>劳育:{{ scoreData[4] }}分</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <InfoDialog :dialog="dialog" :formData="formData"></InfoDialog>
  </div>
</template>


<script>
import InfoDialog from "../components/infoDialog.vue";
export default {
  name: "infoshow",
  data() {
    return {
      dialog: {
        show: false,
        title: "",
      },
      formData: {},
      scoreData: {},
    };
  },
  created() {
    this.getProfile();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    getProfile() {
      this.$axios.get(`/api/score/scoreinfo`).then((res) => {
        this.scoreData = res.data.data;
      });
    },
    changeInfo() {
      this.dialog = {
        show: true,
        title: "修改个人信息",
      };
      this.formData = {
        name: this.user.name,
        faculty: this.user.faculty,
        classroom: this.user.classroom,
        studentid: this.user.studentid,
        identity: this.user.identity,
        id: this.user.id,
        exp: this.user.exp,
        iat: this.user.iat,
      };
    },
  },
  components: {
    InfoDialog,
  },
};
</script>
<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  position: relative;
  top: 10%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: left;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo span {
  display: block;
  text-align: left;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  position: relative;
  top: 10%;
}
.user-item {
  position: relative;
  top: 30%;
  left: 10%;
  padding: 20px;
  font-size: 20px;
  color: #333;
}
.changebtn {
  position: relative;
  left: 12%;
}
</style>
