<template>
  <el-dialog
    title="修改证据名称"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    top="60px"
    width="400px"
  >
    <div>
      <el-form ref="evidenceForm" :model="evidenceForm" :rules="rules" label-width="105px">
        <el-form-item label="证据名称" prop="evName">
          <el-input v-model="evidenceForm.evName"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editEvi">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import { updateEvdenceNameApi } from "@/api/caseHandle";


export default {
  data() {
    return {
      visible: false,
      evidenceForm: {
        evName: ""
      },
      evfile: "",
      rules: {
        evName: [{ required: true, message: "请输入证据名称", trigger: "blur" }]
      },
      evId:'',
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal(data) {
        console.log(data);
        this.evId = data.id;
        this.evidenceForm.evName = data.evName;
        this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    editEvi() {
      let _this = this
      this.$refs["evidenceForm"].validate(valid => {
        if (valid) {
            let data = {
                id:_this.evId,
                evName:_this.evidenceForm.evName
            }
          updateEvdenceNameApi(data).then(
            res => {
              console.log(res);
              _this.visible = false;

            _this.$emit('findEvidenceEmit');
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    },
    //上传附件2
    uploadEvidence2(id) {
      let data = {
        caseId: this.caseId,
        evName: this.evidenceForm.evName,
        evType: "照片",
        status: 1,
        fileId: id
      };
      let _this = this
      saveOrUpdateEvdencenApi2(data).then(
        res => {
          console.log(res);
          _this.visible = false;
          _this.$emit("findEvidenceEmit");
          //   this.findFile(res.data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>

