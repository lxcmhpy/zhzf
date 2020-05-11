<template>
<div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="searchPage toggleBox">
        <div class="handlePart">
        <el-dialog
            :title="dialogTitle"
            :visible.sync="visible"
            @close="closeDialog"
            :close-on-click-modal="false"
            width="25%">
            <el-form :inline="true"  label-position="right"  label-width="100px" >
                <p>{{tips}}</p>
                <div class="item" style="text-align:center;margin-top:10px;">
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submitApprove()">确 定</el-button>
            </div>
        </el-dialog>
        </div>
      </div>
      <!-- 二次确认弹窗 -->
    <addParagraph ref="addParagraph" @getAllPersons="getOrgList"></addParagraph>
    </div>
</div>
</template>

<script>
import addParagraph from "./addParagraph";
export default {
    data(){
        return{
            searchType:[{value:0,label:'本机构'},{value:1,label:'本机构及子机构'}],
            imageUrl: '',
            visible: false,
            approveId:"",//id
            approveInfo:"", // 审批信息
            approveStatus:"", // 审批状态
            dialogTitle: "提示", //弹出框title
            tips:"", //提示信息
        }
    },
    components: { addParagraph },
    methods:{
       getOrgList(){
         },
        //提交审批
        submitApprove() {
            this.visible = false;
            this.$refs.addParagraph.showModal(this.approveId,this.approveStatus);
        },
        //父组件调用
        showModal(approveId,type) {
            if(type == "审批通过"){
                this.tips = "是否确定审批通过？"
            }else{
                this.tips = "是否确定审批不通过？"
            }
            this.approveId = approveId;
            this.approveStatus = type;
            this.visible = true;
           // this.handelType = type;
           
         },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.errorName = false;
        },
    }
}
</script>
