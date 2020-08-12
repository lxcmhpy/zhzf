t<template>
  <div class="com_searchAndpageBoxPadding">
      <div class="searchAndpageBox">
      <div class="tablePart">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          highlight-current-row
          height="100%"
        >
          <el-table-column prop="userName" label="督办人" align="center" ></el-table-column>
          <el-table-column prop="supTime" label="督办时间" align="center" ></el-table-column>
          <el-table-column prop="organ" label="所在机构" align="center"></el-table-column>
          <el-table-column prop="telPhone" label="联系电话" align="center" ></el-table-column>
          <el-table-column prop="supOpinion" label="督办意见" align="center"></el-table-column>
          <el-table-column prop="feedContent" label="反馈内容" align="center" ></el-table-column>
          <el-table-column prop="feedTime" label="反馈时间" align="center"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showCaseFeed(scope.row,1)" type="text" v-if="scope.row.feedTime">查看</el-button>
              <el-button @click="showCaseFeed(scope.row,0)" type="text" v-else>督办反馈</el-button>
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
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
   <addSupervisionRecord ref="addSupervisionRecordRef" @getNewData="searchCase"></addSupervisionRecord>
   <!--快速入口 -->
    <caseSlideMenu :activeIndex="'lawEnforcementSupervision_supervisionRecord'"></caseSlideMenu>
  </div>
</template>
<script>
import {findSupervisionRecoredApi} from '@/api/lawEnforcementSupervision'
import {queryLawCateByOrganIdApi} from '@/api/caseDeploy'
import iLocalStroage from "@/common/js/localStroage";
import addSupervisionRecord from './dialog/addSupervisionRecord'
import { mapGetters } from "vuex";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";

export default {
  data() {
    return {
      tableData: [{caseName:1}],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
    };
  },
  components:{
    addSupervisionRecord,
    caseSlideMenu
  },
  computed:{ ...mapGetters(['caseId'])},
  methods: {
    //查询列表
    searchCase() {
        findSupervisionRecoredApi({caseBasicinfoId:this.caseId}).then(res=>{
            console.log(res);
            this.total = res.data.total
            this.tableData = res.data.records;
        }).catch(err=>{throw new Error(err)})
    },
    //查看案件
    showCaseFeed(row,flag) {
        this.$refs.addSupervisionRecordRef.showModel(row.id,flag);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.searchCase();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchCase();
    },
  },
  created(){
      this.searchCase();
  }
};
</script>
<style lang="scss" >
</style>