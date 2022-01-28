<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <router-link :to="item.path" :key="item.name">
            <el-menu-item :index="item.path">
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </router-link>
        </template>
        <template>
          <router-link to="/infoshow">
            <el-menu-item index="1">
              <span slot="title">个人信息</span>
            </el-menu-item>
          </router-link>
          <router-link to="/infoshow">
            <el-menu-item index="2">
              <span slot="title">我的得分</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>                                                     






<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: "",
    };
  },
  created() {
    this.getItems();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    getItems() {
      // console.log(this.user);
      if (this.user.identity == "普通学生") {
        this.items = [
          {
            name: "活动列表",
            path: "actlist",
          },
          {
            name: "我的活动",
            path: "myactlist",
          },
        ];
      } else if (this.user.identity == "部门管理员") {
        this.items = [
          {
            name: "活动列表",
            path: "actlist",
          },
          {
            name: "我的活动",
            path: "myactlist",
          },
          {
            name: "活动申报",
            path: "addact",
          },
          {
            name: "申诉处理",
            path: "appeallist",
          },
        ];
      } else if (this.user.identity == "系统管理员") {
        this.items = [
          {
            name: "活动列表",
            path: "actlist",
          },
          {
            name: "部门管理",
            path: "manage",
          },
          {
            name: "评分规则",
            path: "scoreRule",
          },
          {
            name: "活动审核",
            path: "actAudit",
          },
        ];
      }
    },
  },
};
</script>


<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
