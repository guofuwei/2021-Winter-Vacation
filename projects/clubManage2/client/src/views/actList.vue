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
          prop="name"
          label="活动名称"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="活动类型"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="initiator"
          label="活动发起人"
          width="120"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="starttime"
          label="活动开始时间"
          width="200"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="endtime"
          label="活动结束时间"
          width="200"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="place"
          label="活动地点"
          width="110"
          align="center"
        ></el-table-column>

        <el-table-column
          label="活动状态"
          prop="state"
          align="center"
          width="110"
        >
        </el-table-column>

        <el-table-column
          label="活动详情"
          prop="operation"
          align="center"
          fixed="right"
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
    <AllActDialog
      :dialog="dialog"
      @update="getProfile()"
      :formData="formData"
    ></AllActDialog>
  </div>
</template>

<script>
import AllActDialog from "../components/allActDialog.vue";
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
      formData: {
        id: "",
        name: "",
        type: "",
        initiator: "",
        thedescribe: "",
        starttime: "",
        endtime: "",
        place: "",
        maxnum: "",
        state: "",
        isJoin: "",
      },
      dialog: {
        show: false,
        title: "",
        option: "",
      },
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios
        .get("/api/activity/")
        .then((res) => {
          let i = 0;
          let time = "";
          let d = null;
          let getData = res.data.data;
          let actData = [];
          // 处理actData
          for (i = 0; i < res.data.actData.length; i++) {
            actData.push(res.data.actData[i].act_id);
          }
          // console.log(actData);
          for (i = 0; i < getData.length; i++) {
            time = getData[i].starttime;
            d = new Date(time);
            getData[i].starttime =
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
            time = getData[i].endtime;
            d = new Date(time);
            getData[i].endtime =
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
            // 开始插入isJoin
            if (actData.includes(getData[i].id)) {
              getData[i].isJoin = "已参加";
            } else {
              getData[i].isJoin = "未参加";
            }
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
    getDetails(index, row) {
      this.dialog = {
        show: true,
        title: "详情",
        option: "allList",
      };
      this.formData = {
        id: row.id,
        name: row.name,
        type: row.type,
        initiator: row.initiator,
        thedescribe: row.thedescribe,
        starttime: row.starttime,
        endtime: row.endtime,
        place: row.place,
        maxnum: row.maxnum,
        state: row.state,
        isJoin: row.isJoin,
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
  components: {
    AllActDialog,
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