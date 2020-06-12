<template>
  <div>
    <div>
      <div class="card-title">
        <font class="font" style="font-size:25px;"><span class="titleflag"></span>奖励信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          v-if="params.type !== 'view'"
          type="primary"
          style="margin-right:25px;float:right;"
          icon="el-icon-plus"
          size="medium"
          @click="addReward">新增奖励</el-button>
      </div>
      <el-table  style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"    resizable     stripe
        @selection-change="handleSelectionChange">
        <!-- <el-table-column prop="awardId" type="selection" width="55"></el-table-column> -->
        <el-table-column prop="awardTypeName" label="奖励类型" align="center"></el-table-column>
        <el-table-column prop="awardDate" label="奖励日期" align="center"></el-table-column>
        <el-table-column prop="awardDept" label="奖励机构" align="center"></el-table-column>
        <el-table-column prop="reward" label="奖励原因" align="center"></el-table-column>
        <el-table-column v-if="params.type !== 'view'" prop="opt" label="操作" align="center">
          <template slot-scope="scope">
              <el-button type="text"  @click="editReward(scope.row)" >修改</el-button>
              <el-button type="text"  @click="deleteReward(scope.row)" >删除</el-button>
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
    <addRewardComp ref="addRewardCompRef" :params="params" @getAllReward="getReward"></addRewardComp>
  </div>
</template>

<script>
import addRewardComp from '@/page/person/person-award/AddAward';
import {mixinPerson} from '@/common/js/personComm';
export default {
  name: "reward",//奖励组件
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
      multipleSelection: [],
      personId: this.params.id,
    }
  },
  components:{
    addRewardComp
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = [];
      let _this = this
      val.forEach((item,val) => {
        _this.multipleSelection.push(item.awardId);
      });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      let _this = this
      _this.pageSize = val;
      _this.getReward();
    },
    //更换页码
    handleCurrentChange(val) {
      let _this = this
      _this.currentPage = val;
      _this.getReward();
    },
    getReward(){//初始化人员奖励
      let _this = this
      let paramsData={
        current: _this.currentPage,
        size: _this.pageSize,
        personId: _this.params.id,
        dataType:'0',//奖励
      }
      if(_this.params.type == 'edit' || _this.params.type == 'view'){
        _this.getPageList("getAwardListMoudle",paramsData);
      }
    },
    deleteReward(row){
      let _this = this
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'el-icon-question',
        customClass: 'custom-confirm'
      }).then(() => {
        this.$store.dispatch('deleteAwardByIdMoudle', row.awardId).then(res => {
          if(res.code === 200){
            this.$message({ type: "success", message: "删除成功!"});
            _this.getReward();
          }
        }, err => {console.log(err);});
      }).catch(() => {});
    },
    addReward(){//添加
      this.$refs.addRewardCompRef.showModal(1, '');
    },
    editReward(row){//编辑
      this.$refs.addRewardCompRef.showModal(2, row);
    },
  },
  created(){
    this.getReward();
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
