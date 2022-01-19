<template>
  <el-table v-if="tableData.length > 0" :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="200" align="center">
    </el-table-column>
    <el-table-column
      prop="type"
      label="收支类型"
      width="150"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="mydescribe"
      label="收支描述"
      width="150"
      align="center"
    ></el-table-column>
    <el-table-column prop="income" label="收入" width="150" align="center">
    </el-table-column>
    <el-table-column prop="expend" label="支出" width="150" align="center">
    </el-table-column>

    <el-table-column
      prop="cash"
      label="账户现金"
      align="center"
      width="150"
    ></el-table-column>
    <el-table-column prop="remark" label="备注" align="center" width="150">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "fundList",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios
        .get("/api/profile/")
        .then((res) => {
          //   console.log(res);
          this.tableData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>