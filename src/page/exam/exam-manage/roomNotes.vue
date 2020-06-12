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
        :data="tableDate"
        resizable
        stripe
        style="width:98%"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
        :max-height="380">
        <el-table-column prop="personName" label="记录类型" min-width="120px" align="center"></el-table-column>
        <el-table-column prop="sexName" label="发生时间" min-width="160px" align="center"></el-table-column>
        <el-table-column prop="idNo" label="记录时间" min-width="160px" align="center"></el-table-column>
        <el-table-column prop="oname" label="记录内容" min-width="220px" align="center"></el-table-column>
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
  </el-dialog>
</template>
<script>
import {mixinPerson} from "@/common/js/personComm";
export default {
  mixins:[mixinPerson],
  data(){
    return {
      addExamPersonForm:{
        personName:"",
        idNo:"",
        oname:"",
        oid:"",
        branchName:"",
        stationName:"",
        ministerialNo:""
      },
      visible:false,
      dialogtitle:"",
      errorName:"",
      tableDate:[{
        personName:'张三',
        sexName:'男',
        idNo:'62022222222909898',
        oname:'交通部',
        stationName:'岗位名称',
        ministerialNo:'执法证号',
        area:'11111111111111'
      }],
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
      this.getPersonAllInfo();
    },
    getPersonAllInfo(){//查询试卷列表
      let data={}
      // this.getPageList("",data);
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
      height: 28px;
      line-height: 28px;
    }
  }
}
</style>