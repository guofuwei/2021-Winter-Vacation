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
            <el-input type="name" v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item label="活动类型:">
            <el-select v-model="formData.type" placeholder="活动类型">
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="initiator" label="活动发起人:">
            {{ formData.initiator }}
          </el-form-item>

          <el-form-item prop="thedescribe" label="活动描述:">
            <el-input type="textarea" v-model="formData.thedescribe"></el-input>
          </el-form-item>

          <el-form-item prop="starttime" label="开始时间:">
            <el-date-picker
              v-model="formData.starttime"
              type="datetime"
              placeholder="选择开始时间"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item prop="endtime" label="结束时间:">
            <el-date-picker
              v-model="formData.endtime"
              type="datetime"
              placeholder="选择结束时间"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item prop="place" label="活动地点:">
            <el-input type="place" v-model="formData.place"></el-input>
          </el-form-item>

          <el-form-item prop="maxnum" label="最大人数:">
            <el-input type="maxnum" v-model="formData.maxnum"></el-input>
          </el-form-item>

          <el-form-item
            prop="state"
            label="活动状态:"
            v-if="dialog.option != 'addAct'"
          >
            <el-input type="state" v-model="formData.state"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="danger" @click="dialog.show = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="onSubmit('form')"
              v-if="dialog.option == 'addAct'"
              >申报活动</el-button
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
      form_rules: {
        name: [
          { required: true, message: "活动名称不能为空!", trigger: "blur" },
        ],
        type: [
          { required: true, message: "活动类型不能为空!", trigger: "blur" },
        ],
        initiator: [
          { required: true, message: "活动组织者不能为空!", trigger: "blur" },
        ],
        thedescribe: [
          { required: true, message: "活动描述不能为空!", trigger: "blur" },
        ],
        starttime: [
          { required: true, message: "活动开始时间不能为空!", trigger: "blur" },
        ],
        endtime: [
          { required: true, message: "活动结束时间不能为空!", trigger: "blur" },
        ],
        place: [
          { required: true, message: "活动地点不能为空!", trigger: "blur" },
        ],
        maxnum: [
          { required: true, message: "活动最大人数不能为空!", trigger: "blur" },
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
          this.$axios.post(`/api/activity/add`, this.formData).then((res) => {
            this.$message({
              message: "活动申报成功",
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