<template>
  <el-dialog
    class="exam-page-dialog"
    :title="dialogtitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="61%">
    <div>
      <el-table
        :data="tableData"
        resizable
        stripe
        style="width:98%"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
        :max-height="380">
         <el-table-column prop="roomName" label="考场" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="rollingTypeName" label="记录类型" align="center" width="120px"></el-table-column>
        <el-table-column prop="happenTime" label="发生时间" align="center" width="174px"></el-table-column>
        <el-table-column prop="rollingTime" label="记录时间" align="center"></el-table-column>
        <el-table-column prop="forceReason" label="记录内容" align="center" min-width="80px"></el-table-column> </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        :page-sizes="[10, 20, 30, 40, 50]"
        layout="prev, pager, next,sizes,jumper"
        :total="totalPage"
      ></el-pagination>
    </div>
  </el-dialog>
</template>
<script>
import {mixinPerson} from "@/common/js/personComm";
export default {
  mixins:[mixinPerson],
  data(){
    return {
      addExamPersonForm:{
       examId:'',  
        roomId:'',
        invigilatorId:'',
        personId:'',
        rollingType:'',
        rollingTime:'',
        forceReason:'',
        type:'',
        happenTime:'',
        examperId:'',
      },
      visible:false,
      dialogtitle:"",
      errorName:"",
      tableData:[],
      tableLoading: false
    }
  },
  methods:{
    submit(){  
    },
    showModal(type,data){
      
      let _this = this 
      _this.visible=true;
      _this.dialogtitle="考场记录";
      _this.addExamPersonForm.invigilatorId=data.invigilatorId,
      _this.addExamPersonForm.examId=data.examId,
      _this.addExamPersonForm.examperId=data.examperId,
      this.getPersonAllInfo();
    },
    getPersonAllInfo(){//查询试卷列表
    let _this = this;
        let data = {
          examId: this.addExamPersonForm.examId,
          examperId:this.addExamPersonForm.examperId
      }
     // this.getPageList("examRecordQueryForManange",data);
        this.$store.dispatch("examRecordQueryForManange", data).then(res => {
          if(res.code == '200'){
            this.tableData = res.data;
          };
        }, err => {
          this.$message({ type: 'error', message: err.msg || '' });
        });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPersonAllInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPersonAllInfo();
    },
    closeDialog(){
      this.tableDate.splice(this.tableDate.length);
      this.visible=false;
    }
  }
}
</script>
<style lang="scss" scoped>
.exam-page-dialog{
  >>>.el-dialog{
    min-width: 976px;
    max-width: 1064px;
  }
  >>>.el-dialog__body{
    padding-bottom: 20px;
  }
  .paginationBox{
    margin-top: 10px;
    text-align: center;
    >>>.el-input__inner{
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>