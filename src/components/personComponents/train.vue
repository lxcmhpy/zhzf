<template>
  <div>
    <div>
        <el-row>
          <el-button type="primary" icon="el-icon-plus"  @click="addTrain"  size="mini" round>新增</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteTrain" size="mini" round>删除</el-button>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%;height:582px"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="trainType" label="培训类型"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
          <el-table-column prop="trainResult" label="培训结果"></el-table-column>
          <el-table-column prop="trainName" label="培训名称"></el-table-column>
          <el-table-column prop="trainOrg" label="培训机构"></el-table-column>
          <el-table-column prop="certificateName" label="证书名称"></el-table-column>
          <el-table-column prop="certificateNo" label="证书编号"></el-table-column>
          <el-table-column prop="opt" label="操作">
              <el-button type="text"  @click="editTrain(scope.row)" >修改</el-button>
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
        >
      </el-pagination> 
    </div>

    <!-- 新增、修改、查看页面 -->
    <addTrainComp ref="addTrainCompRef" @getAllTrain="getTrain"></addTrainComp>
  </div>
</template>

<script>
    import addTrainComp from './../../page/person/person-train/AddTrain'
    export default {
        name: "train.vue",//培训组件
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
        addTrainComp
      },
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
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
          let paramsData={
            current: this.currentPage,
            size: this.pageSize,
            personId: this.$route.params.personInfo.personId,
          }
          this.$store.dispatch("getTrainListMoudle",paramsData)
            .then(res=>{
                this.tableData = res.data.records;
                this.totalPage = res.data.total;
          });
          error=>{
            console.info(error);
          };
        },
        deleteTrain(row){
          this.$confirm("确定要删除所选的培训信息吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$store.dispatch("deleteEducationMoudle", this.multipleSelection).then(
                res => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    //重新加载页面数据
                    this.getPersonList();
                },
                err => {
                console.log(err);
                }
            );
          })
          .catch(() => {});
        },
      addTrain(){//添加     
        this.$refs.addTrainCompRef.showModal(1, '');
      },
      editTrain(row){//编辑 
        this.$refs.addTrainCompRef.showModal(2, row);
      },
    },
    created(){
        this.getTrain();
    }
  }
</script>

<style scoped>
  @import "./../../css/personManage.less";
</style>
