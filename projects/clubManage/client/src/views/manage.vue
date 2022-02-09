<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-col :span="10">
          <div class="acttype">
            <el-form-item label="部门选择">
              <el-select v-model="search_data.depart" placeholder="部门选择">
                <el-option value="全部"></el-option>
                <el-option
                  v-for="(formtype, index) in formData.depart_list"
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
                @click="handleDepartSearch()"
              >
                筛选
              </el-button>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="searchact">
            <el-form-item label="搜索学院">
              <el-input v-model="search_data.collage"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="common"
                icon="search"
                @click="handleCollageSearch()"
              >
                搜索
              </el-button>
            </el-form-item>
            <el-form-item class="btnRight">
              <el-button
                type="primary"
                size="common"
                icon="view"
                @click="handleAdd()"
              >
                新增部门/学院
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
          prop="department"
          label="职能部门"
          align="center"
          width="190"
        >
        </el-table-column>

        <el-table-column
          prop="collage"
          label="二级学院"
          width="190"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="depart_man_user_name_string"
          label="部门管理员"
          width="190"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="collage_man_user_name_string"
          label="二级学院管理员"
          width="190"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="operation"
          label="操作"
          width="320"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getDetails(scope.$index, scope.row)"
              >编辑管理员</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="getDetails2(scope.$index, scope.row)"
              >编辑部门/学院</el-button
            >
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDeleteDepart(scope.$index, scope.row)"
              >删除部门</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteCollage(scope.$index, scope.row)"
              >删除学院</el-button
            > -->
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
    <AddDepart
      :dialog="dialog"
      @update="getProfile()"
      :formData="formData"
      :formData2="formData2"
    ></AddDepart>
    <ManageDialog
      :dialog="dialog2"
      @update="getProfile()"
      :manageData="manageData"
    ></ManageDialog>
    <DepartCollageDialog
      :dialog="dialog3"
      @update="getProfile()"
      :departCollageData="departCollageData"
    ></DepartCollageDialog>
  </div>
</template>

<script>
import AddDepart from "../components/addDepart.vue";
import ManageDialog from "../components/manageDialog.vue";
import DepartCollageDialog from "../components/departCollageDialog.vue";
export default {
  name: "fundList",
  data() {
    return {
      search_data: {
        depart: "",
        collage: "",
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
        depart: "",
        depart_id: "",
        collage: "",
        depart_list: [],
        depart_id_list: [],
      },
      formData2: {
        depart: "",
      },
      manageData: {
        depart_id: 0,
        collage_id: 0,
        depart_man: [],
        collage_man: [],
        id1_list: [],
        id2_list: [],
      },
      departCollageData: {},
      dialog: {
        show: false,
        title: "",
      },
      dialog2: {
        show: false,
        title: "",
      },
      dialog3: {
        show: false,
        title: "",
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
        .get("api/manage/")
        .then((res) => {
          let getData = res.data.data;
          // console.log(getData);
          for (let i = 0; i < getData.length; i++) {
            if (getData[i].depart_man_user_name.length > 0) {
              getData[i].depart_man_user_name_string =
                getData[i].depart_man_user_name.join(" ");
            } else {
              getData[i].depart_man_user_name_string = "暂无管理员";
            }

            if (getData[i].collage_man_user_name.length > 0) {
              getData[i].collage_man_user_name_string =
                getData[i].collage_man_user_name.join(" ");
            } else {
              getData[i].collage_man_user_name_string = "暂无管理员";
            }
            // 统计所有的部门
            if (
              this.formData.depart_list.indexOf(getData[i].department) == -1
            ) {
              this.formData.depart_list.push(getData[i].department);
              this.formData.depart_id_list.push(getData[i].depart_man_id);
            }
            // 处理学院
            if (getData[i].collage == null) {
              getData[i].collage = "暂无";
            }
          }
          // console.log(this.depart_list);
          // console.log(this.formData);
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
      this.dialog2 = {
        show: true,
        title: "编辑管理员",
      };
      this.manageData = {
        depart_id: 0,
        collage_id: 0,
        depart_man: [],
        collage_man: [],
        id1_list: [],
        id2_list: [],
      };
      for (let i = 0; i < row.depart_man_user_name.length; i++) {
        if (this.manageData.id1_list.indexOf(row.depart_man_user_id[i]) == -1) {
          this.manageData.depart_man.push({
            name: row.depart_man_user_name[i],
            studentid: row.depart_man_user_studentid[i],
          });
          this.manageData.id1_list.push(row.depart_man_user_id[i]);
        }
      }
      for (let i = 0; i < row.collage_man_user_name.length; i++) {
        if (
          this.manageData.id2_list.indexOf(row.collage_man_user_id[i]) == -1
        ) {
          this.manageData.collage_man.push({
            name: row.collage_man_user_name[i],
            studentid: row.collage_man_user_studentid[i],
          });
          this.manageData.id2_list.push(row.collage_man_user_id[i]);
        }
      }
      this.manageData.collage_id = row.collage_man_id;
      this.manageData.depart_id = row.depart_man_id;
      // console.log(this.manageData);
    },
    getDetails2(index, row) {
      this.dialog3 = {
        show: true,
        title: "编辑部门/学院",
      };
      this.departCollageData = {
        depart_id: row.depart_man_id,
        collage_id: row.collage_man_id,
        department: row.department,
        collage: row.collage,
      };
      // console.log(this.departCollageData);
    },
    handleDeleteCollage(index, row) {
      this.$axios
        .delete(`/api/manage/delete/collage/${row.collage_man_id}`)
        .then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          router.go(0);
        });
    },
    handleDeleteDepart(index, row) {
      this.$axios
        .delete(`/api/manage/delete/depart/${row.depart_man_id}`)
        .then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          router.go(0);
        });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "新增部门/二级学院",
        option: "addDepart",
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
    handleDepartSearch() {
      // 筛选
      if (this.search_data.depart === "全部") {
        this.allTableData = this.filterTableData;
      } else {
        this.allTableData = this.filterTableData.filter((item) => {
          return item.department === this.search_data.depart;
        });
      }
      // 分页数据的调用
      this.setPaginations();
    },
    handleCollageSearch() {
      // 筛选
      if (this.search_data.name === "") {
        this.allTableData = this.filterTableData;
      } else {
        this.allTableData = this.filterTableData.filter((item) => {
          return item.collage.indexOf(this.search_data.collage) != -1;
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
    AddDepart,
    ManageDialog,
    DepartCollageDialog,
  },
};
</script>
<style scoped>
.title {
  margin-left: 10px;
  font-size: 26px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  margin-left: 30px;
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