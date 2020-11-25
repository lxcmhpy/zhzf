<!-- 发证申请 -->
<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="equipment-detail">
      <el-tabs  v-model="activeName" style="min-height:800px;position:relative;">
        <el-tab-pane name="base" label="基本信息">
          <ApplyBaseInfo
            v-if="billType=='FZ'"
            :billTypeName="billTypeName" 
            :billType="billType" 
            :addForm="data"
            :id="id"
            :isEdit="isEdit"
            @afterCommit="afterCommit"
            @setEdit="setEdit"
        />
         <OtherApplyBaseInfo 
            v-else
            :billTypeName="billTypeName" 
            :billType="billType" 
            :addForm="data"
            :id="id"
            :isEdit="isEdit"
            @afterCommit="afterCommit"
            @setEdit="setEdit"
        />
        </el-tab-pane>
        <el-tab-pane name="approve" label="审批信息" v-if="commited">
          <ApprovalForm 
            :id="id" 
            :isApprove="isApprove" 
            :status="status" 
            :pdfId="pdfId" 
            :billType="billType"
        />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ApplyBaseInfo from "@/page/device/certificate-bill/applyBaseInfo";
import OtherApplyBaseInfo from "@/page/device/certificate-bill/otherApplyBaseInfo";
import ApprovalForm from "@/page/device/certificate-bill/approvalForm";
import iLocalStroage from "@/common/js/localStroage";

export default {
  components: { ApplyBaseInfo, ApprovalForm,OtherApplyBaseInfo },
  data() {
    return {
        commited:false,
        billType:'',
        url:'',
        billTypeName:'',
        data:{},
        isEdit:true,
        id:'',
        isApprove:false,
        status:'',
        pdfId:'',
        activeName:'base'
    };
  },
  computed: {},
  methods: {
      afterCommit(){
        this.commited=true
        this.$store.dispatch("deleteTabs", this.$route.name);//关闭当前页签
        this.$router.push({
            name: this.url
        });
      },
      setEdit(value){
          this.isEdit= value
      },
  },
    mounted () {
        
    },
    created(){
        if(this.$route.params.billType !== undefined){
            this.billType=this.$route.params.billType
            this.url=this.$route.params.url
            this.billTypeName=this.$route.params.billTypeName
            this.data=this.$route.params.data
            this.isEdit=this.$route.params.isEdit
            this.isApprove=this.$route.params.isApprove
            if(this.data.id){
                this.id=this.data.id
                if(this.data.status!=1){
                    this.commited=true
                }
            }
            if(this.$route.params.status){
                this.status=this.$route.params.status
            }
            if(this.$route.params.pdfId){
                this.pdfId = this.$route.params.pdfId
            }
        }
        if(iLocalStroage.get('certApproveOver')){
            this.status=iLocalStroage.get('certApproveOver')
            iLocalStroage.removeItem('certApproveOver')
            this.activeName='approve'
        }
    }
};
</script>
<style lang="scss" scoped>
.equipment-detail {
  padding: 15px;
  >>> .el-tabs {
    background: #fff;
    .el-tabs__item {
      padding: 0 20px;
      &.is-active {
        background: #fff;
      }
    }
    .el-tabs__header {
      background: #eaedf4;
    }
    .el-tabs__active-bar {
      width: 56px !important;  
      box-sizing: content-box;
      top: 0;
      padding: 0 20px;
      left: -20px;
    }
  }
  .float-btns {
    width: 48px;
    // height: 100px;
    position: fixed;
    right: 70px;
    bottom: 70px;
    z-index: 100;
    &.float-btns .el-button {
      border-radius: 1px;
      width: 48px;
      height: 48px;
      padding: 0;
      text-align: center;
    }
    .iconfont {
      display: inline-block;
      margin-bottom: 12px;
      margin-left: 4px;
    }
  }
}
</style>
<style lang="scss">
.equipment-detail {
  .float-btns {
    width: 48px;
    height: 100px;
    position: fixed;
    right: 70px;
    bottom: 70px;
    z-index: 100;
    &.float-btns .el-button {
      border-radius: 1px;
      width: 48px;
      height: 48px;
      padding: 0;
      text-align: center;
    }
    .iconfont {
      display: inline-block;
      margin-bottom: 4px;
      margin-left: 4px;
    }
  }
}

</style>