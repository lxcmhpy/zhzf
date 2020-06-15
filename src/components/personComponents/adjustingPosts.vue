<template>
  <div>
    <div>
      <div class="card-title">
        <font class="font" style="font-size:25px;"><span class="titleflag"></span>调动信息</font> 
      </div>
      <el-table
        style="margin-left:25px; width:97%;margin-bottom:35px;"
        :data="tableData"
        resizable
        stripe>
        <el-table-column prop="transferStatusName" label="调岗状态" align="center"></el-table-column>
        <el-table-column prop="outOName" label="调出机构" align="center"></el-table-column>
        <el-table-column prop="outTime" label="调出时间" align="center"></el-table-column>
        <el-table-column prop="createName" label="调出操作人" align="center"></el-table-column>
        <el-table-column prop="inOName" label="调入机构" align="center"></el-table-column>
        <el-table-column prop="inTime" label="调入时间" align="center"></el-table-column>
        <el-table-column prop="modifyName" label="调入操作人" align="center"></el-table-column>
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
  </div>
</template>

<script>
import {mixinPerson} from '@/common/js/personComm';
export default {
  name: "adjustingPosts",//调岗组件
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
      personId: this.params.id,
      tableData:[],
    }
  },
  methods:{
    //更改每页显示的条数
    handleSizeChange(val) {
      let _this = this
      _this.pageSize = val;
      this.getAdjustingPostsInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      let _this = this
      _this.currentPage = val;
      _this.getAdjustingPostsInfo();
    },
    getAdjustingPostsInfo(){
      let _this = this 
      let paramsData={
        current: _this.currentPage,
        size: _this.pageSize,
        personId: _this.personId
      }
      if(_this.params.type == 'edit' || _this.params.type == 'view'){
        _this.getPageList("getTransferListMoudle", paramsData);
      }
    }
  },
  created(){
    let _this = this 
    _this.getAdjustingPostsInfo();
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
