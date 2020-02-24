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
import {saveOrUpdateEvdencenApi2, } from "@/api/caseHandle";
import {
 uploadEvApi,
 findFileByIdApi,
} from "@/api/upload";

export default {
  data() {
    return {
      visible: false,
      evidenceForm: {
        evName: ""
      },
      evfile:'',
      rules: {
        evName: [
          { required: true, message: "请输入证据名称", trigger: "blur" }
        ],
      }
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal(data) {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    editEvi(){
      this.visible = false;
    },
    //上传附件2
    uploadEvidence2(id){
        let data = {
            caseId:this.caseId,
            evName:this.evidenceForm.evName,
            evType:'照片',
            status:1,
            fileId:id,
        }
        saveOrUpdateEvdencenApi2(data).then(
            res => {
              console.log(res);
            this.visible = false;
            this.$emit('findEvidenceEmit');
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

