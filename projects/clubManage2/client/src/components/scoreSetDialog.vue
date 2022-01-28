<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item prop="Name" label="评分大类:">
            {{ formData.Name }}
          </el-form-item>

          <el-form-item prop="name" label="评分小类:">
            <el-input type="name" v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item prop="scoreType" label="小类评分设定:">
            <el-select v-model="formData.scoreType" placeholder="小类评分设定">
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="upperLimit" label="大类上限分数:">
            <el-input
              type="upperLimit"
              v-model="formData.upperLimit"
            ></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="danger" @click="dialog.show = false"
              >取消</el-button
            >
            <el-button type="primary" @click="onSubmit('form')"
              >确认 修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "myactdialog",
  data() {
    return {
      format_type_list: [
        "分三档:1分-2分-3分",
        "分三档:1分-3分-5分",
        "分五档:1分-2分-3分-4分-5分",
      ],
      form_rules: {
        name: [
          { required: true, message: "评分小类不能为空!", trigger: "blur" },
        ],
        scoreType: [
          { required: true, message: "评分类型不能为空!", trigger: "blur" },
        ],
        upperLimit: [
          { required: true, message: "大类评分上限不能为空!", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    dialog: Object,
    formData: Object,
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          for (let i = 0; i < this.format_type_list.length; i++) {
            if (this.format_type_list[i] === this.formData.scoreType) {
              this.formData.scoreType = i;
              break;
            }
          }
          this.$axios.post(`api/score/updateset`, this.formData).then((res) => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.dialog.show = false;
            this.$emit("update");
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>