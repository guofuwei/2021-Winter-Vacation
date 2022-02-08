<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-col :span="12">
          <div class="acttype">
            <el-form-item label="活动类型">
              <el-select v-model="search_data.type" placeholder="活动类型">
                <el-option
                  v-for="(formtype, index) in format_type_list"
                  :key="index"
                  :label="formtype"
                  :value="formtype"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="common"
                icon="search"
                @click="handleTypeSearch()"
              >
                筛选
              </el-button>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="searchact">
            <el-form-item label="搜索活动">
              <el-input v-model="search_data.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="common"
                icon="search"
                @click="handleNameSearch()"
              >
                搜索
              </el-button>
            </el-form-item>
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
          prop="act_type"
          label="活动类型"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="申诉发起人"
          width="120"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="date"
          label="申诉发起时间"
          width="210"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="reason"
          label="申诉理由"
          width="210"
          align="center"
        ></el-table-column>

        <el-table-column
          label="申诉处理"
          prop="operation"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="onSubmit(scope.$index, scope.row, 1)"
              v-if="tableData[scope.$index].state == ''"
              >通过</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="onSubmit(scope.$index, scope.row, 2)"
              v-if="tableData[scope.$index].state == ''"
              >驳回</el-button
            >
            <span v-if="tableData[scope.$index].state == '通过'">已通过</span>
            <span v-if="tableData[scope.$index].state == '驳回'">已驳回</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row v-if="tableData.length > 0">
        <el-col :span="24">
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
  </div>
</template>

<script>
export default {
  name: "fundList",
  data() {
    return {
      format_type_list: [
        "全部",
        "思政教育",
        "国防教育",
        "安全教育",
        "社会实践",
        "志愿服务",
        "文化活动",
        "体育活动",
        "学术活动",
        "创新创业",
      ],
      search_data: {
        type: "",
        name: "",
      },
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
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios
        .get("/api/appeal/")
        .then((res) => {
          let time = "";
          let d = null;
          let getData = res.data.data;
          for (let i = 0; i < getData.length; i++) {
            time = getData[i].date;
            d = new Date(time);
            getData[i].date =
              d.getFullYear() +
              "年" +
              (d.getMonth() + 1) +
              "月" +
              d.getDate() +
              "日 " +
              d.getHours() +
              "时" +
              d.getMinutes() +
              "分";
          }
          // console.log(getData);
          this.allTableData = getData;
          this.filterTableData = getData;
          // 设置分页数据
          this.setPaginations();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit(index, row, type) {
      let submitForm = {
        act_id: row.act_id,
        user_id: row.user_id,
      };
      let path = "";
      if (type == 1) {
        path = "/api/appeal/pass";
      } else {
        path = "/api/appeal/reject";
      }
      this.$axios.post(path, submitForm).then((res) => {
        this.$message({
          message: "提交成功",
          type: "success",
        });
        this.getProfile();
      });
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/profile/delete/${row.id}`).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getProfile();
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
    handleTypeSearch() {
      // 筛选
      if (this.search_data.type === "全部" || this.search_data.type === "") {
        this.allTableData = this.filterTableData;
      } else {
        this.allTableData = this.filterTableData.filter((item) => {
          return item.type === this.search_data.type;
        });
      }
      // 分页数据的调用
      this.setPaginations();
    },
    handleNameSearch() {
      // 筛选
      if (this.search_data.name === "") {
        this.allTableData = this.filterTableData;
      } else {
        this.allTableData = this.filterTableData.filter((item) => {
          return item.name.indexOf(this.search_data.name) != -1;
        });
      }
      // 分页数据的调用
      this.setPaginations();
    },
  },
  computed: {
    user() {
      return this.$store.getters;
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