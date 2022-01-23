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
          <el-form-item label="活动名称:" prop="name">
            {{ formData.name }}
          </el-form-item>

          <el-form-item label="活动类型:" prop="type">
            {{ formData.type }}
          </el-form-item>

          <el-form-item prop="initiator" label="活动发起人:">
            {{ formData.initiator }}
          </el-form-item>

          <el-form-item prop="thedescribe" label="活动描述:">
            {{ formData.thedescribe }}
          </el-form-item>

          <el-form-item prop="starttime" label="开始时间:">
            {{ formData.starttime }}
          </el-form-item>

          <el-form-item prop="endtime" label="结束时间:">
            {{ formData.endtime }}
          </el-form-item>

          <el-form-item prop="place" label="活动地点:">
            {{ formData.place }}
          </el-form-item>

          <el-form-item prop="maxnum" label="最大人数:">
            {{ formData.maxnum }}
          </el-form-item>

          <el-form-item prop="state" label="活动状态:">
            {{ formData.state }}
          </el-form-item>
          <el-form-item
            prop="isJoin"
            label="参加状态:"
            v-if="dialog.option == 'allList'"
          >
            {{ formData.isJoin }}
          </el-form-item>

          <el-form-item class="text_right">
            <el-button
              type="success"
              @click="onSubmit('form')"
              v-if="dialog.option == 'allList' && formData.isJoin == '未参加'"
              >报 名</el-button
            >
            <el-button type="primary" @click="dialog.show = false"
              >确 定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "allactdialog",
  data() {
    return {
      format_type_list: [
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
      form_rules: {},
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
          this.$axios.post(`api/activity/join`, this.formData).then((res) => {
            this.$message({
              message: "报名成功",
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