<template>
  <div>
    <div>
      <div class="card-title">
        <font class="font" style="font-size:25px;"><span class="titleflag"></span>惩罚信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          v-if="params.type !== 'view'"
          type="primary"
          @click="addPunishment"
          style="margin-right:25px;float:right;"
          icon="el-icon-plus"
          size="medium">新增惩罚</el-button>
      </div>
      <el-table style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"    resizable    stripe
        @selection-change="handleSelectionChange">
        <!-- <el-table-column prop="awardId" type="selection" width="55"></el-table-column> -->
        <el-table-column prop="awardType" label="惩罚类型id" v-if="false" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="awardTypeName" label="惩罚类型" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="awardDate" label="惩罚日期" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="awardDept" label="惩罚机构" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="reward" label="惩罚原因" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column v-if="params.type !== 'view'" prop="opt"  label="操作" align="center">
          <template slot-scope="scope"> 
            <el-button type="text"  @click="editPunishment(scope.row)" >修改</el-button>
            <el-button type="text"  @click="deletePunishment(scope.row)" >删除</el-button>
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
    <addPunishmentComp ref="addPunishmentCompRef" :params="params" @getAllPunishment="getPunishment"></addPunishmentComp>
  </div>
</template>

<script>
import addPunishmentComp from '@/page/person/person-award/Punishment';
import {mixinPerson} from '@/common/js/personComm';
export default {
  name: "punishment",//惩罚组件
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
      multipleSelection: [],//选择框中已经选择的内容
      dataType:"1",//惩罚标识
      personId: this.params.id,
    }
  },
  components:{
    addPunishmentComp
  },
  methods:{
    handleSelectionChange(val) {
      let _this = this
      _this.multipleSelection=[];
      val.forEach((item,val) => {
        _this.multipleSelection.push(item.awardId);
      });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      let _this = this
      _this.pageSize = val;
      _this.getPunishment();
    },
    //更换页码
    handleCurrentChange(val) {
      let _this = this 
      _this.currentPage = val;
      _this.getPunishment();
    },
    //查询列表
    getPunishment(){//初始化人员惩罚信
      let _this = this 
      let paramsData={
        current: _this.currentPage,
        size: _this.pageSize,
        personId: _this.personId,
        dataType:'1',//惩罚
      }
      if(_this.params.type == 'edit' || _this.params.type == 'view'){
        this.getPageList("getAwardListMoudle", paramsData);
      }
    },
    //删除
    deletePunishment(row){
      let _this = this
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch('deleteAwardByIdMoudle', row.awardId).then(res => {
          if(res.code === 200){
            this.$message({ type: "success", message: "删除成功!"});
            _this.getPunishment();//重新加载页面数据
          }
        }, err => {console.log(err);});
      }).catch(() => {});
    },
    //添加
    addPunishment(){
      let _this = this 
      _this.$refs.addPunishmentCompRef.showModal(1, '');
    },
    //编辑
    editPunishment(row){
      let _this = this 
      _this.$refs.addPunishmentCompRef.showModal(2, row);
    },
  },
  created(){
    let _this = this ;
    _this.getPunishment();
  }
}
</script>

<style lang="scss"  src="@/assets/css/personManage.scss" scoped>
/* @import "@/assets/css/personManage.scss"; */
.titleflag {
  width      : 4px;
  height     : 22px;
  margin-right: 8px;
  display    : inline-block;
  background : #4573D0;
}
</style>
