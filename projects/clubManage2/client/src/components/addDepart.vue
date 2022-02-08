<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :modal-append-to-body="false"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="新增部门" name="first">
          <div class="form">
            <el-form
              ref="form2"
              :model="formData2"
              :rules="form_rules2"
              label-width="120px"
              style="margin: 10px; width: auto"
            >
              <el-form-item label="部门名称:" prop="depart">
                <el-input type="depart" v-model="formData2.depart"></el-input>
              </el-form-item>

              <el-form-item class="text_right">
                <el-button type="danger" @click="dialog.show = false"
                  >取消</el-button
                >
                <el-button type="primary" @click="onSubmit2('form2')"
                  >新增部门</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新增学院" name="second">
          <div class="form">
            <el-form
              ref="form"
              :model="formData"
              :rules="form_rules"
              label-width="120px"
              style="margin: 10px; width: auto"
            >
              <el-form-item label="部门:" prop="depart">
                <el-select v-model="formData.depart" placeholder="部门">
                  <el-option
                    v-for="(formtype, index) in formData.depart_list"
                    :key="index"
                    :label="formtype"
                    :value="formtype"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="学院名称:" prop="collage">
                <el-input type="collage" v-model="formData.collage"></el-input>
              </el-form-item>

              <el-form-item class="text_right">
                <el-button type="danger" @click="dialog.show = false"
                  >取消</el-button
                >
                <el-button type="primary" @click="onSubmit('form')"
                  >新增学院</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "myactdialog",
  data() {
    return {
      form_rules: {
        depart: [{ required: true, message: "部门不能为空!", trigger: "blur" }],
        collage: [
          { required: true, message: "学院名称不能为空!", trigger: "blur" },
        ],
      },
      form_rules2: {
        depart: [
          { required: true, message: "部门名称不能为空!", trigger: "blur" },
        ],
      },
      activeName: "first",
    };
  },
  props: {
    dialog: Object,
    formData: Object,
    formData2: Object,
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.formData.depart) {
            this.formData.depart_id =
              this.formData.depart_id_list[
                this.formData.depart_list.indexOf(this.formData.depart)
              ];
          }
          this.$axios.post(`/api/manage/add`, this.formData).then((res) => {
            this.$message({
              message: "学院新增成功",
              type: "success",
            });
            this.dialog.show = false;
            this.$emit("update");
          });
          //   console.log(this.formData);
        }
      });
    },
    onSubmit2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          this.$axios.post(`/api/manage/add2`, this.formData2).then((res) => {
            this.$message({
              message: "部门新增成功",
              type: "success",
            });
            this.dialog.show = false;
            this.$emit("update");
          });
          //   console.log(this.formData);
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
</style>