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

          <el-form-item
            v-for="(name, index) in formData.names"
            :label="name"
            :key="index"
          >
            {{ formData.scores[index] }}分
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="primary" @click="dialog.show = false"
              >确认</el-button
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
        ["1分", "2分", "3分"],
        ["1分", "3分", "5分"],
        ["1分", "2分", "3分", "4分", "5分"],
      ],
      form_rules: {},
    };
  },
  props: {
    dialog: Object,
    formData: Object,
  },
  methods: {},
};
</script>

<style scoped>
</style>