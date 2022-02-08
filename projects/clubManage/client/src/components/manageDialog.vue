<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :modal-append-to-body="false"
    >
      <div>
        <el-col :span="12">
          <div class="acttype">
            <el-button
              type="primary"
              size="common"
              icon="search"
              @click="newDepartMan()"
            >
              新增部门管理员
            </el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="searchact">
            <el-button
              type="primary"
              size="common"
              icon="search"
              @click="newCollageMan()"
            >
              新增学院管理员
            </el-button>
          </div>
        </el-col>
      </div>
      <div class="table_container">
        <el-table :data="manageData.depart_man" style="width: 100%" border>
          <el-table-column
            prop="name"
            label="部门管理员"
            align="center"
            width="200"
          >
          </el-table-column>

          <el-table-column
            prop="studentid"
            label="学号"
            width="200"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="operation"
            label="操作"
            width="190"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteDepartMan(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <br />

      <el-table :data="manageData.collage_man" style="width: 100%" border>
        <el-table-column
          prop="name"
          label="学院管理员"
          align="center"
          width="200"
        >
        </el-table-column>

        <el-table-column
          prop="studentid"
          label="学号"
          width="200"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="operation"
          label="操作"
          width="190"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteCollageMan(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <NewManager
      :newManageDialog="newManageDialog"
      :formData="formData"
    ></NewManager>
  </div>
</template>

<script>
import NewManager from "../components/newManager.vue";
export default {
  name: "myactdialog",
  data() {
    return {
      newManageDialog: {
        show: false,
        title: "",
      },
      formData: {
        depart_id: this.manageData.depart_id,
        collage_id: this.manageData.collage_id,
        title: "",
        name: "",
        studentid: "",
      },
    };
  },
  props: {
    dialog: Object,
    manageData: Object,
  },
  methods: {
    deleteDepartMan(index, row) {
      this.$axios.delete(`/api/manage/delete1/${row.studentid}`).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.dialog.show = false;
        this.$emit("update");
      });
    },
    deleteCollageMan(index, row) {
      this.$axios.delete(`/api/manage/delete2/${row.studentid}`).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.dialog.show = false;
        this.$emit("update");
      });
    },
    newDepartMan() {
      this.newManageDialog = {
        show: true,
        title: "新增部门管理员",
      };
      this.formData = {
        depart_id: this.manageData.depart_id,
        collage_id: this.manageData.collage_id,
        title: "新增部门管理员",
        name: "",
        studentid: "",
      };
    },
    newCollageMan() {
      this.newManageDialog = {
        show: true,
        title: "新增学院管理员",
      };
      this.formData = {
        depart_id: this.manageData.depart_id,
        collage_id: this.manageData.collage_id,
        title: "新增学院管理员",
        name: "",
        studentid: "",
      };
    },
  },
  components: {
    NewManager,
  },
};
</script>

<style scoped>
.searchact {
  float: right;
  position: relative;
  bottom: 10px;
  font-size: 26px;
}
.acttype {
  float: left;
  position: relative;
  bottom: 10px;
  font-size: 26px;
}
</style>