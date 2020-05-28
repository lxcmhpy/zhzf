<template>
  <div>
    <div>
      <div class="card-title">
        <font class="font" style="font-size:25px;"><span class="titleflag"></span>考试信息</font> 
        <el-button
          v-if="params.type !== 'view'"
          type="primary"
          style="margin-right:25px;float:right;"
          icon="el-icon-plus"
          size="medium"
          @click="addExam">新增考试</el-button>
      </div>
      <el-table
        style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData" resizable   stripe>
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="examTypeName" label="考试类型" align="center"></el-table-column>
        <el-table-column prop="examTime" label="考试时间" align="center"></el-table-column>
        <el-table-column prop="examScore" label="考试成绩" align="center"></el-table-column>
        <el-table-column prop="passStatus" label="通过状态" :formatter = "format"  align="center"></el-table-column>
        <el-table-column prop="note" label="备注" align="center"></el-table-column>
        <el-table-column v-if="params.type !== 'view'" prop="opt" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text"  @click="editExam(scope.row)" >修改</el-button>
            <el-button type="text"  @click="deleteExam(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationBox" style="margin-top:-25px;margin-bottom:10px;margin-left:40%;">
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
    </div>
    <!-- 新增、修改、查看页面 -->
    <addExamComp ref="addExamCompRef" :params="params" @getExamList="getExam"></addExamComp>
  </div>
</template>

<script>
import addExamComp from '@/page/person/person-train/AddExam';
import {mixinPerson} from '@/common/js/personComm';
export default {
  name: "exam",//考试信息
  mixins:[mixinPerson],
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
    return {
      selectExamDataList:[],
    }
  },
  components:{
    addExamComp
  },
  created(){
    this.getExam();
  },
  methods:{
     //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getExam();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExam();
    },
      format(row, column) {
      if (row.passStatus === '0') {
        return '通过'
      } else if (row.passStatus === '1') {
        return '不通过'
      } 
    },
    getExam(){
      let _this = this 
      let paramsData={
        current: _this.currentPage,
        size: _this.pageSize,
        personId: _this.params.id,
      }
      if(_this.params.type == 'edit' || _this.params.type == 'view'){
        _this.getPageList("examInfoPageListMoudle", paramsData);
      }
    },
    addExam(){//添加
      this.$refs.addExamCompRef.showModal(1, '');
    },
    editExam(row){//编辑
      this.$refs.addExamCompRef.showModal(2, row);
    },
    deleteExam(row){//删除
      let _this = this
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch('deleteExamInfoByIdMoudle', row.examId).then(res => {
          if(res.code === 200){
            this.$message({ type: "success", message: "删除成功!"});
            _this.getExam(); //重新加载页面数据
          }
        }, err => { this.$message({ type: 'error', message: err.msg || '' }) });
      }).catch(() => {});
    },
    selectData(val) {
      this.selectExamDataList = [];
      val.forEach((item) => {
        this.selectExamDataList.push(item.examId);
      });
    }
  }
}
</script>

<style lang="scss" src="@/assets/css/personManage.scss"></style>
<style lang="scss">
 /*  @import "@/assets/css/personManage.scss"; */
  .titleflag {
    width      : 4px;
    height     : 22px;
    margin-right: 8px;
    display    : inline-block;
    background : #4573D0;
  }
</style>
