<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="60%">
        <div>
            <el-table
                style="margin-left:25px;width:97%;margin-bottom:35px;"
                :data="tableData" resizable  align="center"  stripe>
                <el-table-column prop="oname" label="审批单位" align="center"></el-table-column>
                <el-table-column prop="approveStatusName" label="审批状态" align="center"></el-table-column>
                <el-table-column prop="userName" label="审批人" align="center"></el-table-column>
                <el-table-column prop="approveInfo" label="审批信息" align="center"></el-table-column>
                <el-table-column prop="applicationDate" label="审批时间" align="center"></el-table-column>
            </el-table>
        </div>
    </el-dialog>
</template>
<script>

export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: 'add', id: '' }
      },
      required: true
    }
  },
    data(){
        return{
            tableData: [], 
            visible: false,
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            approveId:"",
            currentPage: 1, //当前页
            pageSize: 10,   //pagesize
            totalPage: 0,   //总页数
        }
    },
    methods:{
        getApprovelListInfo(approveId){
            let data={
                personId: this.params.id,
            }
            if(this.params.type == 'edit'){
                this.$store.dispatch("getApproveListMoudle", data).then(
                res => {
                    this.tableData = res.data;
                });
                err => {
                    console.log(err);
                };
            }
        },
        showModal(approveId) {
            this.approveId=approveId;
            this.visible = true;
            this.dialogTitle = "审批历史记录";
            this.getApprovelListInfo();
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.errorName = false;
        },
    },
    created(){
        this.getApprovelListInfo();
    }
}
</script>
<style lang="scss" src="@/assets/css/personManage.scss">
/* @import "@/assets/css/personManage.scss"; */
</style>
