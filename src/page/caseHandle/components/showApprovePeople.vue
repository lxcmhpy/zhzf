<template>
  <el-dialog
    title="选择审批人员"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <div class="showApprovePeople">
      <div class="part" v-for="(item,index) in approvalPeopleList" :key="index">
        <div>{{item.returnValue[0]}}</div>
        <div>
          <el-tag
            :key="tag.userId"
            v-for="tag in item.approveUserVo"
            closable
            :disable-transitions="false"
          >{{tag.userName}}
          </el-tag>
        </div>
      </div>
      <!-- <div class="part">
        <div>执法部门负责人</div>
        <div>
          <el-tag
            :key="tag.userId"
            v-for="tag in secondApprovePeople"
            closable
            :disable-transitions="false"
            @close="deleteOne(tag)"
          >{{tag.userName}}</el-tag>
        </div>
      </div> -->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitPdf">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {
     submitPdfByPersonApi,handleTJApproveDocApi,getLinkTypeInfoByIdApi,
  } from "@/api/caseHandle";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        visible: false,
        caseInfo: "",
        approvalPeopleList: [],
      };
    },
    inject: ["reload"],
    computed: {...mapGetters(['caseId','docId','docDataId','caseLinktypeId','docPdfStorageId'])},
    methods: {
      showModal(data) {
        this.visible = true;
        // this.caseInfo = data;
        this.getApprovePeople();
      },
      //关闭弹窗的时候清除数据
      closeDialog() {
        this.visible = false;
      },
      //获取审核人员
      getApprovePeople() {
        let _this = this;
        let data = {
          caseBasicInfoId: this.caseId,
          docTypeId:this.docId
        }
        console.log('获取审批人员传参',data);
        this.$store.dispatch("getApprovePeople", data).then(
          res => {
            let data = res.data;
            data.splice(0, 1);
            _this.approvalPeopleList = data;
          },
          err => {
            console.log(err);
          }
        );
      },

      async submitPdf() {
        let _this = this
        let huanjieData='';
        try{
          //判断是单文书环节还是文书
          huanjieData = await getLinkTypeInfoByIdApi(this.caseLinktypeId);
        }catch(err){
          _this.$message('判断环节是否生成pdf失败');
        }
        console.log('判断环节是否生成pdf',huanjieData)
        let data = {
          caseId: this.caseId,
          caseLinktypeId:this.caseLinktypeId,
          //单文书环节生成pdf后拿不到docDataId需要给它置空，此时前2个参数必须有值
          docId: huanjieData.data.isPdf == 0 ? '' : this.docDataId,
          storageId:this.docPdfStorageId
       }
        console.log('提交审批传的参数', data)
        try{
          await handleTJApproveDocApi(data)
          _this.$message({
              type: "success",
              message: "提交成功"
           });
        }catch(err){
          _this.$message('提交失败');
        }
        
        if(huanjieData.data.isPdf == 0){ //环节生成pdf
           _this.$router.push({
                name: "case_handle_flowChart"
          });
        }else{  //1 环节不生成pdf
          _this.$router.go(-2)
        }
      }
    }
  };
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
