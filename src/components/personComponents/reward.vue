<template>
  <div>
    <div>
      <div style="margin-top:35px;margin-bottom:25px;margin-left:25px;">
          <font style="font-size:25px;"><span class="titleflag"></span>奖励信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary"  @click="addReward"  round style="margin-right:25px;float:right;" icon="el-icon-plus" size="medium">新增奖励</el-button>
      </div>
      <!--<el-row>
        <el-button type="primary" icon="el-icon-plus"  @click="addReward" size="mini" round>新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteReward" size="mini" round>删除</el-button>
      </el-row>-->
      <el-table
        style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"
        resizable 
        stripe
        @selection-change="handleSelectionChange">
        <el-table-column prop="awardId" type="selection" width="55"></el-table-column>
        <el-table-column prop="personId" label="姓名"></el-table-column>
        <el-table-column prop="awardType" label="奖励类型"></el-table-column>
        <el-table-column prop="awardDate" label="奖励日期"></el-table-column>
        <el-table-column prop="awardDept" label="奖励机构"></el-table-column>
        <el-table-column prop="reward" label="奖励原因"></el-table-column>
        <el-table-column prop="opt" label="操作">
          <template slot-scope="scope">
              <el-button type="text"  @click="editReward(scope.row)" >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 新增、修改、查看页面 -->
    <addRewardComp ref="addRewardCompRef" @getAllReward="getReward"></addRewardComp>
  </div>
</template>

<script>
import addRewardComp from './../../page/person/person-award/AddAward'
    export default {
        name: "reward",//奖励组件
      data(){
        return {
          currentPage: 1, //当前页
          pageSize: 10,   //pagesize
          totalPage: 0,   //总页数
          tableData: [],
          multipleSelection: []
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
            this.pageSize = val;
            this.getReward();
        },
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getReward();
        },
        getReward(){//初始化人员培训信息
          let paramsData={
            current: this.currentPage,
            size: this.pageSize,
            personId: this.$route.params.personInfo.personId,
            dataType:'0',//惩罚类型
          }
          let _this = this
          this.$store.dispatch("getAwardListMoudle",paramsData)
            .then(res=>{
                _this.tableData = res.data.records;
                _this.totalPage = res.data.total;
          });
          error=>{
            console.info(error);
          };
        },
        deleteReward(row){
            let _this = this
          if(this.multipleSelection.length==0){
              this.$message({message:'请选择需要删除的信息',type: 'warning'});
          }else{
            this.$confirm("确定要删除所选的奖励信息吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              _this.$store.dispatch("deleteAwardModudle", _this.multipleSelection).then(
                  res => {
                      _this.$message({
                          type: "success",
                          message: "删除成功!"
                      });
                      //重新加载页面数据
                      _this.getReward();
                  },
                  err => {
                  console.log(err);
                  }
              );
            })
            .catch(() => {});
          }
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
