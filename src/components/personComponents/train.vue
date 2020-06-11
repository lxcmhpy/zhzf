<template>
  <div>
    <div>
      <div class="card-title">
        <font class="font" style="font-size:25px;"><span class="titleflag"></span>培训信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          v-if="params.type !== 'view'"
          type="primary"
          @click="addTrain"
          style="margin-right:25px;float:right;"
          icon="el-icon-plus"
          size="medium">新增培训</el-button>
      </div>
      <el-table
        style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"  resizable   stripe
        @selection-change="selectData">
        <!-- <el-table-column prop="trainId" type="selection" width="55"></el-table-column> -->
        <el-table-column prop="trainTypeName" label="培训类型" align="center"></el-table-column>
        <el-table-column prop="trainBeginDate" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="trainEndDate" label="结束时间" align="center"></el-table-column>
        <el-table-column prop="trainResult" label="培训结果" align="center"></el-table-column>
        <el-table-column prop="trainName" label="培训名称" align="center"></el-table-column>
        <!-- <el-table-column prop="trainOrg" label="培训机构" align="center"></el-table-column> -->
        <el-table-column prop="trainCertName" label="证书名称" align="center"></el-table-column>
        <el-table-column prop="trainCertNo" label="证书编号" align="center"></el-table-column>
        <el-table-column v-if="params.type !== 'view'" prop="opt" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text"  @click="editTrain(scope.row)" >修改</el-button>
              <el-button type="text"  @click="deleteTrain(scope.row)" >删除</el-button>
              </template>
        </el-table-column>
      </el-table>
      <div class="paginationBox" style="margin-top:-25px;margin-bottom:10px;text-align:center;">
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
    <addTrainComp ref="addTrainCompRef" :params="params" @getTrainList="getTrain"></addTrainComp>
  </div>
</template>

<script>
import addTrainComp from '@/page/person/person-train/AddTrain';
import {mixinPerson} from '@/common/js/personComm';
export default {
  name: "train",//培训组件
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
      selectTrainDataList:[],
      personId: this.params.id,
    }
  },
  components:{
    addTrainComp
  },
  methods:{
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTrain();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTrain();
    },
    getTrain(){//初始化人员培训信息
      let _this = this 
      let paramsData={
          current: _this.currentPage,
          size: _this.pageSize,
          personId: _this.personId,
      }
      if(_this.params.type == 'edit' || _this.params.type == 'view'){
        _this.getPageList("trainInfoPageListMoudle",paramsData);
      }
    },
    deleteTrain(row){
      let _this = this
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'el-icon-question',
        customClass: 'custom-confirm'
      }).then(() => {
        this.$store.dispatch('deleteTrainInfoByIdMoudle', row.trainId).then(res => {
          if(res.code === 200){
            this.$message({ type: "success", message: "删除成功!"});
            _this.getTrain(); //重新加载页面数据
          }
        }, err => { this.$message({ type: 'error', message: err.msg || '' }) });
      }).catch(() => {});
    },
    addTrain(){//添加
      this.$refs.addTrainCompRef.showModal(1, '');
    },
    editTrain(row){//编辑
      this.$refs.addTrainCompRef.showModal(2, row);
    },
    selectData(val) {
      this.selectTrainDataList = [];
      val.forEach((item) => {
        this.selectTrainDataList.push(item.trainId);
      });
    }
  },
  created(){
    this.getTrain();
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/personManage.scss";
  .titleflag {
    width      : 4px;
    height     : 22px;
    margin-right: 8px;
    display    : inline-block;
    background : #4573D0;
  }
</style>
