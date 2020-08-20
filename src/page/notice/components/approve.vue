<template>
  <el-dialog
    title="审核意见"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="600px"
  >
    <div>
      <el-form ref="handleForm" :model="dispose" label-width="90px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果">
              <el-radio-group v-model="dispose.result">
                <el-radio label="通过">通过</el-radio>
                <el-radio label="退回">退回</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="意见">
              <el-input type="textarea" v-model="dispose.remark" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="handleData()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      visible: false,
      dispose: {
        result: "",
        remark: "",
      },
    };
  },
  methods: {
    showModal(data) {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },

    handleData() {
      //   if (!this.dispose.disposeWay) {
      //     this.$message({ type: "error", message: "请选择处理方式" });
      //     return;
      //   }
      this.$emit("handle-data", this.dispose);
      this.closeDialog();
    },
  },
  mounted() {},
};
</script>