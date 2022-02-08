<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-col :span="24">
          <div class="acttype">
            <el-form-item label="我的得分"> </el-form-item>
          </div>
        </el-col>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        style="width: 100%"
        max-height="450"
        border
      >
        <el-table-column
          prop="act_name"
          label="活动名称"
          align="center"
          width="110"
        >
        </el-table-column>

        <el-table-column
          prop="type"
          label="活动类型"
          align="center"
          width="110"
        >
        </el-table-column>

        <el-table-column
          label="德育"
          prop="operation"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getDetails(scope.$index, scope.row, 0)"
              >详情</el-button
            >
            {{ tableData[scope.$index].moral_education }}分
          </template>
        </el-table-column>

        <el-table-column
          label="智育"
          prop="operation"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getDetails(scope.$index, scope.row, 1)"
              >详情</el-button
            >
            {{ tableData[scope.$index].intellectual_education }}分
          </template>
        </el-table-column>

        <el-table-column
          label="体育"
          prop="operation"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getDetails(scope.$index, scope.row, 2)"
              >详情</el-button
            >
            {{ tableData[scope.$index].sports_education }}分
          </template>
        </el-table-column>

        <el-table-column
          label="美育"
          prop="operation"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getDetails(scope.$index, scope.row, 3)"
              >详情</el-button
            >
            {{ tableData[scope.$index].aesthetic_education }}分
          </template>
        </el-table-column>

        <el-table-column
          label="劳育"
          prop="operation"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getDetails(scope.$index, scope.row, 4)"
              >详情</el-button
            >
            {{ tableData[scope.$index].labor_education }}分
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row v-if="tableData.length > 0">
        <el-col :span="24" class="pageend">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      <el-card shadow="never" v-if="tableData.length == 0">暂无数据</el-card>
    </div>
    <ScoreDetailDialog
      :dialog="dialog"
      @update="getProfile()"
      :formData="formData"
    ></ScoreDetailDialog>
  </div>
</template>

<script>
import ScoreDetailDialog from "../components/scoreDetailDialog.vue";
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
export default {
  name: "fundList",
  data() {
    return {
      filterTableData: [],
      paginations: {
        page_index: 1, // 当前的页数
        total: 0, // 总数
        page_size: 5, // 当前页显示多少条
        page_sizes: [5, 10, 15, 20], // 每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
      },
      tableData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: "",
      },
      formData: {},
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      let act_id = getQueryVariable("act_id");
      this.$axios
        .get(`/api/score/myscore`)
        .then((res) => {
          let getData = res.data.data;
          // 处理getData
          for (let i = 0; i < getData.length; i++) {
            if (getData[i].moral_education == null) {
              getData[i].moral_education = 0;
            }
            if (getData[i].intellectual_education == null) {
              getData[i].intellectual_education = 0;
            }
            if (getData[i].sports_education == null) {
              getData[i].sports_education = 0;
            }
            if (getData[i].aesthetic_education == null) {
              getData[i].aesthetic_education = 0;
            }
            if (getData[i].labor_education == null) {
              getData[i].labor_education = 0;
            }
          }
          this.allTableData = getData;
          this.filterTableData = getData;
          // 设置分页数据
          this.setPaginations();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDetails(index, row, col) {
      let NameArray = ["德育", "智育", "体育", "美育", "劳育"];
      this.$axios
        .get(
          `/api/score/scoredetail?act_id=${row.act_id}&Name=${NameArray[col]}`
        )
        .then((res) => {
          this.formData = res.data.data;
          console.log(this.formData);
          this.dialog = {
            show: true,
            title: "得分详情",
          };
        });
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 获取当前页
      let index = this.paginations.page_size * (page - 1);
      // 数据总数
      let nums = this.paginations.page_size * page;
      // 容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    setPaginations() {
      // 分页属性
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
  },
  computed: {
    user() {
      return this.$store.getters;
    },
  },
  components: {
    ScoreDetailDialog,
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
.searchact {
  float: right;
  position: relative;
  top: 10px;
  font-size: 26px;
}
.searchact >>> .el-form-item__label {
  font-size: 20px;
  font-weight: bold;
}
.acttype {
  float: left;
  position: relative;
  top: 10px;
  left: 10px;
  font-size: 26px;
}
.acttype >>> .el-form-item__label {
  font-size: 20px;
  font-weight: bold;
}
.el-card {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
</style>