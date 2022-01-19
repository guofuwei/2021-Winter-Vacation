<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-form-item label="按照时间筛选">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
            @click="handleSearch()"
          >
            筛选
          </el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
            v-if="user.identify == 'manager'"
          >
            添加
          </el-button>
        </el-form-item>
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
        <el-table-column prop="id" label="序号" align="center" width="40">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="230" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mydescribe"
          label="收支描述"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column prop="income" label="收入" width="70" align="center">
          <template slot-scope="scope">
            <span style="color: green">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" width="70" align="center">
          <template slot-scope="scope">
            <span style="color: red">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="cash" label="账户现金" align="center" width="70">
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template></el-table-column
        >
        <el-table-column prop="remark" label="备注" align="center" width="140">
        </el-table-column>

        <el-table-column
          label="操作"
          prop="operation"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="user.identify == 'manager'"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="user.identify == 'manager'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
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
    </div>
    <Dialog
      :dialog="dialog"
      @update="getProfile()"
      :formData="formData"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from "../components/dialog.vue";
export default {
  name: "fundList",
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: "",
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
        type: "",
        mydescribe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
      },
      dialog: {
        show: false,
        title: "",
        option: "edit",
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
        .get("/api/profile/")
        .then((res) => {
          // console.log(res.data.data);
          this.allTableData = res.data.data;
          console.log(this.allTableData.length);
          this.filterTableData = res.data.data;
          // 设置分页数据
          this.setPaginations();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit",
      };
      this.formData = {
        id: row.id,
        type: row.type,
        mydescribe: row.mydescribe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
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
    handleSearch() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          message: "请选择时间区间",
          type: "warning",
        });
        this.getProfile();
        return;
      }
      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();
      // console.log(sTime);
      this.allTableData = this.filterTableData.filter((item) => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });
      // 分页数据的调用
      this.setPaginations();
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components: {
    Dialog,
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