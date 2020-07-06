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
            @close="deleteOne(index,tag)"
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
     submitPdfByPersonApi,handleTJApproveDocApi,
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
    computed: {...mapGetters(['caseId','docId','docDataId','caseLinktypeId'])},
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
          // caseLinktypeId:this.caseLinktypeId,
          docTypeId:this.docId
          // docId:this.docDataId
        }
        console.log('获取审批人员传参',data);
        this.$store.dispatch("getApprovePeople", data).then(
          res => {
            let data = res.data;
            data.splice(0, 1);
            // let swap = data[1];
            // data[1] = data[2];
            // data[2] = swap;
            _this.approvalPeopleList = data;
          },
          err => {
            console.log(err);
          }
        );
      },
      deleteOne(index, tag) {
        this.approvalPeopleList[index].approveUserVo.splice(this.approvalPeopleList[index].approveUserVo.indexOf(tag), 1);
      },
      deleteTwo(tag) {
        // this.secondApprovePeople.splice(this.secondApprovePeople.indexOf(tag), 1);
      },
      submitPdf() {
        // let data={
        //   caseId:this.caseInfo.caseId,
        //   caseLinktypeId:this.caseInfo.caseLinktypeId,

        //   }
        let _this = this
        // let a = {
        //   approve1: "987964a3772e74aecc173479473f5cf3",
        //   approve2: "13475aa147aa5766e574b07ddb2b768d"
        // }
        // let data = {
        //   caseId:_this.caseId,
        //   handlePerson:JSON.stringify(a)
        // }
        // this.caseInfo.handlePerson = JSON.stringify(a)
        let data = {
          caseId: this.caseId,
          caseLinktypeId:this.caseLinktypeId,
          docId:this.docDataId
        }
        console.log('提交审批传的参数', data)
        handleTJApproveDocApi(data).then(
          res => {
            console.log("pdf提交", res);
            _this.$message({
              type: "success",
              message: "提交成功"
            });
            _this.$store.dispatch("deleteTabs", _this.$route.name);
            // _this.$store.commit("setCaseId", _this.caseInfo.caseId);
            if(this.docDataId){ //环节下的文书提交审批后
              _this.$router.go(-2)
            }else{    //单环节文书提交审批后
              _this.$router.push({
                name: "case_handle_flowChart"
              });
            }
            
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  };
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
/* @import "@/assets/css/caseHandle/index.scss"; */
</style>
