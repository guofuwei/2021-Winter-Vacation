<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-col :span="24">
          <div class="acttype">
            <el-form-item label="大类选择">
              <el-select v-model="search_data.Name" placeholder="评分大类">
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
                @click="handleNameFilter()"
              >
                筛选
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
          prop="Name"
          label="评分大类"
          width="300"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="name"
          label="评分小类"
          width="300"
          align="center"
        ></el-table-column>

        <el-table-column
          label="评分详情"
          prop="operation"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getDetails(scope.$index, scope.row)"
              >详情</el-button
            >
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
    <ScoreSetDialog
      :dialog="dialog"
      @update="getProfile()"
      :formData="formData"
    ></ScoreSetDialog>
  </div>
</template>

<script>
import ScoreSetDialog from "../components/scoreSetDialog.vue";
export default {
  name: "fundList",
  data() {
    return {
      format_type_list: ["全部", "德育", "智育", "体育", "美育", "劳育"],
      search_data: {
        Name: "",
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
      formData: {
        Name: "",
        name: "",
        scoreType: "",
        upperLimit: "",
      },
      dialog: {
        show: false,
        title: "",
        option: "",
      },
      typeList: [
        "分三档:1分-2分-3分",
        "分三档:1分-3分-5分",
        "分五档:1分-2分-3分-4分-5分",
      ],
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios
        .get("/api/score/desc")
        .then((res) => {
          let getData = res.data.data;
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
    getDetails(index, row) {
      this.dialog = {
        show: true,
        title: "详情",
        option: "audit",
      };
      this.formData = {
        id: row.id,
        Name: row.Name,
        name: row.name,
        scoreType: this.typeList[row.scoreType[row.id]],
        upperLimit: row.upperLimit,
      };
      // console.log(row.id);
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
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add",
      };
      this.formData = {
        type: "",
        mydescribe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
      };
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
    handleNameFilter() {
      // 筛选
      if (this.search_data.Name === "" || this.search_data.Name === "全部") {
        this.allTableData = this.filterTableData;
      } else {
        this.allTableData = this.filterTableData.filter((item) => {
          return item.Name === this.search_data.Name;
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
  components: {
    ScoreSetDialog,
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
.audit {
  margin-left: 10px;
}
</style>