<template>
  <el-dialog
    title="上传证据"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    top="60px"
    width="405px"
  >
    <div>
      <el-form ref="evidenceForm" :model="evidenceForm" :rules="rules" label-width="105px">
        <el-form-item label="证据名称" prop="evName">
          <el-input v-model="evidenceForm.evName"></el-input>
        </el-form-item>
        <el-form-item label="证据附件" prop="hasfile">
          <el-input v-model="evidenceForm.hasfile" v-show="false"></el-input>
          <el-upload
                    class="upload-demo"
                    action
                    :show-file-list="true"
                    :auto-upload="false"
                    :on-change="fileChange" >
                    <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="uploadEvidence">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import {saveOrUpdateEvdencenApi, } from "@/api/caseHandle";
import {
 uploadEvApi,
 findFileByIdApi,
} from "@/api/upload";

export default {
  data() {
    return {
      visible: false,
      evidenceForm: {
        evName: "",
        hasfile: '',
        linkId:'',
      },
      evfile:'',
      rules: {
        evName: [
          { required: true, message: "请输入证据名称", trigger: "blur" }
        ],
        hasfile: [{ required: true, message: "请选择证据", trigger: "blur" }]
      }
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal(data) {
      this.visible = true;
      this.linkId = data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    fileChange(file){
        console.log(file);
        if(file.name){
            this.evidenceForm.hasfile = true;
        }
        this.evfile = file.raw;

    },
    //上传附件
    uploadEvidence() {
      this.$refs["evidenceForm"].validate(valid => {
        if (valid) {
          var fd = new FormData();
          console.log('fileName',this.evidenceForm.evName);
          console.log('file',this.evfile);
          console.log('caseId', this.caseId);
          console.log('docId',this.linkId);

          fd.append("fileName", this.evidenceForm.evName);
          fd.append("file", this.evfile);
          fd.append("caseId", this.caseId);
          fd.append("docId", this.linkId);

          uploadEvApi(fd).then(
            res => {
              console.log(res);
              this.uploadEvidence2(res.data)
            // this.visible = false;
            // this.$emit('findEvidenceEmit')
            //   this.findFile(res.data);
            },
            error => {
              console.log(error);
            }
          );
        }
      });
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
        saveOrUpdateEvdencenApi(data).then(
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

