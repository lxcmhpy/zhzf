<template>
  <el-dialog
    title="考场记录"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="61%"
    class="exam-person-dialog"
  >
    <div class="examinee-info">
      <div>
        <img
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=845265002,1740826154&fm=26&gp=0.jpg"
          width="160px"
          height="224px"
        />
      </div>
      <div class="name-info">
        <p>姓名：<span>{{personName}}</span></p>
        <p>身份证号：<span>{{idNo}}</span></p>
      </div>
    </div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="medium"
      @click="addNote('','1')"
    >添加记录</el-button>
    <div style="margin-top: 14px;">
      <el-table
        :data="tableData"
        resizable
        stripe
        style="width:100%"
        @selection-change="selectUser"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
        :max-height="280"
      >
        <el-table-column prop="roomName" label="考场" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="rollingTypeName" label="记录类型" align="center" width="120px"></el-table-column>
        <el-table-column prop="happenTime" label="发生时间" align="center" width="174px"></el-table-column>
        <el-table-column prop="rollingTime" label="记录时间" align="center"></el-table-column>
        <el-table-column prop="forceReason" label="记录内容" align="center" min-width="80px"></el-table-column>
        <el-table-column label="操作" min-width="120px" align="left">
          <template slot-scope="scope">
            <el-button type="text"   @click="addNote(scope.row,'2')">修改</el-button>
            <el-button type="text" @click="deleteNote(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
     <addNote ref="addNote" ></addNote>
  </el-dialog>
  
</template>
<script>
import addNote from "./addNote";
export default {
  mixins: [],
  components: { addNote },
  data() {
    return {
      visible: false,
      selectUserIdList: [],
      
      personName:"",
      idNo:"",
      photoUrl:"",
      examData:{
        examId:'',  
        roomId:'',
        invigilatorId:'',
        personId:'',
        rollingType:'',
        rollingTime:'',
        forceReason:'',
        type:'',
        happenTime:'',
      },
      paramDate:{
          invigilatorId:"",
          examId:"",
          examperId:"",
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      tableData: [],
      tableLoading: false
    };
  },
  methods: {
    //新增/修改
    addNote(data,type){
       this.$refs.addNote.showModal(this.paramDate,data,type);
    },
    deleteNote(row){
      console.info(JSON.stringify(row))
       this.$store.dispatch("deleteExamRecordInfo", row.rollingId).then(res => {
          if(res.code == '200'){
            this.getNoteMsg();
          };
        }, err => {
          this.$message({ type: 'error', message: err.msg || '' });
        });
    },
      //考生信息
    getNoteMsg(){
         let data = {
          invigilatorId:this.paramDate.invigilatorId,
          examId: this.paramDate.examId,
          examperId:this.paramDate.examperId
      }
        this.$store.dispatch("examRecordQueryInfo", data).then(res => {
          if(res.code == '200'){
            this.tableData = res.data.data;
          };
        }, err => {
          this.$message({ type: 'error', message: err.msg || '' });
        });
    },
    showModal(data,data1) {
      this.personName = data.personName;
      this.idNo = data.idNo;
      this.photoUrl = data.photoUrl;
      this.paramDate.invigilatorId = data1.invigilatorId;
      this.paramDate.examId = data1.examId;
      this.paramDate.examperId =data.examperId;
      this.visible = true;
      this.getNoteMsg();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
    },
      //获取选中的user
    selectUser(val) {
      console.log(val);
    },
    closeDialog() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.exam-person-dialog{
  >>>.el-dialog{
    margin: 0 auto;
    min-width: 976px;
    max-width: 1016px;
  }
  >>>.el-dialog__body{
    padding-bottom: 10px;
  }
  .paginationBox{
    margin-top: 10px;
    text-align: center;
    >>>.el-input__inner{
      height: 28px;
      line-height: 28px;
    }
  }
  .examinee-info{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .name-info{
      font-size:24px;
      color:rgba(153,153,153,1);
      line-height:38px;
      margin-left: 20px;
      >p span{
        color: #20232B;
      }
    }
  }
}
</style>