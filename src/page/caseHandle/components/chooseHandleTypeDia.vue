<template>
  <el-dialog title="添加中止（终结、恢复）强制执行" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="30%">
    <div>
       <el-form ref="approvalForm" :model="approvalForm" label-width="90px">
        <el-form-item>
          <el-radio-group v-model="approvalForm.executeHandle">
            <div>
              <div v-for="(item,index) in handleTypeList" :key="index"><el-radio :label="item.value">{{item.label}}</el-radio></div>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="approvalSure()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      visible: false,
      handleType:0,
      docData:"",
      approvalForm: {
        executeHandle: "",
      },
      caseData: "",
      isSaveLink: '',
      handleTypeList:[
          {
              value:0,
              label:'中止执行'
          },
          {
              value:1,
              label:'终结执行'
          },
          {
              value:2,
              label:'恢复执行,中止情形消失'
          },
          {
              value:3,
              label:'恢复执行,当事人(单位)不履行执行协议'
          }
      ]
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data,caseLinktypeId,isSaveLink) {
      this.visible = true;
      this.isSaveLink = isSaveLink;
      // this.docData = data;
      this.caseData = data;
      this.caseLinktypeId = caseLinktypeId;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    approvalSure() {
      let addMoreData ={
            handelType:'isAddMore',
            approvalForm:this.approvalForm
      }
      this.com_viewDoc(this.caseData,this.caseLinktypeId,addMoreData); 
    }
  }
};
</script>
<style lang="scss" scope>
    .handleTypeListBox{
        margin-top: 15px;
        display: flex;
        flex-wrap:wrap;
        &>div{
            width: 50%;
            margin-bottom: 10px;
        }
    }

</style>
