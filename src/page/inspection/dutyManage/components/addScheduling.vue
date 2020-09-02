<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    class="add-scheduling-dialog"
  >
    <el-form
      :model="addCourseForm"
      label-position="right"
      label-width="110px"
      ref="addCourseRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="排班门类" prop="couName" class="form-class">
          <el-input v-model="addCourseForm.couName" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="是否用车" prop="couType">
          <el-select v-model="addCourseForm.couType" @change="changeType">
            <el-option key="1" label="是" value="1"></el-option>
            <el-option key="2" label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="课件观看时长" prop="couTimeHou">
          <el-time-picker
            v-model="addCourseForm.couTimeHou"
            default-value="00:00:00"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            @blur="setCouTime"></el-time-picker>
          <!-- <el-input v-model="addCourseForm.couTime" @input="trimCoutime()"></el-input> -->
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="学分" prop="couCredits" class="form-class">
          <el-input v-model="addCourseForm.couCredits" @input="trim()"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  data() {
    return {
      visible: false,
      addCourseForm: {
        lessonId: '',
        couName: "", // 课程名称
        couType: "", // 课程类型
        couTimeHou: "00:00:00", // 观看时长
        couTime: '',
        couCredits: "", // 学分
        path: '',
        name: '',
        id: '',
        couId: ''
      },
      rules: {
        couName: [
          { required: true, message: "课程名称不能为空", trigger: "blur" }
        ],
        couType: [
          { required: true, message: "课程类型不能为空", trigger: "change" }
        ],
        couTimeHou: [
          { required: true, validator: validateCouTimeHou, trigger: "blur" }
        ],
        couCredits: [
          { required: true, message: "学分不能为空", trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
    };
  },
  created(){},
  methods: {
    //提交
    submit() {
      this.$refs.addCourseRef.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          loading.close();
          this.closeDialog();
        } else {
          return false;
        }
      });
    },
    showModal(type, data) {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addCourseRef"].resetFields();
      this.uploadAccept = '';
      this.currentType = '';
      this.coursewareFileList.splice(0, this.coursewareFileList.length);
      for (const key in this.addCourseForm) {
        this.addCourseForm[key] = "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.add-scheduling-dialog {
  .upload-btn {
    padding: 10px 24px;
    background: linear-gradient(
      180deg,
      rgba(248, 248, 248, 1) 0%,
      rgba(238, 238, 238, 1) 100%
    );
    color: #20232b;
    border: none;
    border-left: 1px solid rgba(221, 221, 221, 1);
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 234, 246, 1) 100%
      );
    }
  }
  .upload-course-file {
    position: relative;
    width: 100%;
    height: 32px;
    line-height: 32px;
    border: 1px solid rgba(221, 221, 221, 1);
    display: flex;
    align-items: center;
    .upload-progress {
      flex: 1;
      >>> .el-progress-bar__outer,
      >>> .el-progress-bar__inner {
        border-radius: 0;
      }
      >>> .el-progress-bar__outer {
        background: rgba(195, 226, 225, 1);
      }
      >>> .el-progress-bar__inner {
        background: rgba(74, 175, 167, 1);
      }
      .file-name-view{
        padding: 0 14px;
        overflow     : hidden;
        text-overflow: ellipsis;
        white-space  : nowrap;
      }
    }
  }
  .upload-import-text {
    color: #999;
    line-height: 28px;
  }
}
>>> .el-select,
>>> .el-date-editor {
  display: block;
}
>>> .el-date-editor.el-input,
>>> .el-date-editor.el-input__inner {
  display: block;
  width: 100%;
}
</style>
