<template>
  <div>
    <div>
      <div style="margin-top:35px;margin-bottom:25px;margin-left:25px;">
        <font style="font-size:25px;"><span class="titleflag"></span>年审信息</font> 
      </div>
      <el-table
        style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"
        resizable 
        stripe>
        <el-table-column prop="reviewYear" label="年审年份" align="center"></el-table-column>
        <el-table-column prop="reviewDate" label="年审日期" align="center"></el-table-column>
        <el-table-column prop="reviewScoreName" label="年审成绩" align="center"></el-table-column>
        <el-table-column prop="note" label="备注" align="center"></el-table-column>
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
  </div>
</template>

<script>
import {mixinPerson} from '@/common/js/personComm';
export default {
  name: "annualReview",//年审记录
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
    }
  },
  methods:{
      //更改每页显示的条数
    handleSizeChange(val) {
      let _this = this
      _this.pageSize = val;
      this.getAnnualReviewInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      let _this = this
      _this.currentPage = val;
      _this.getAnnualReviewInfo();
    },
    getAnnualReviewInfo(){
      let _this = this
      let paramsData={
        current: _this.currentPage,
        size: _this.pageSize,
        personId: _this.personId,
      }
      if(_this.params.type == 'edit'){
        _this.getPageList("getQueryArDataByPersonId",paramsData);
      }
    }
  },
  created(){
    this.getAnnualReviewInfo();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>
