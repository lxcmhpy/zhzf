<template>
 <el-dialog
  title="模版问题列表"
  :visible.sync="visible"
  :close-on-click-modal="false"
  :key="timer"
  @close="closeDialog"
  width="35%"
 >
    <div class="handlePart">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="addRequest">新增</el-button>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" width="60" align="center">
          <template slot="header">序号</template>
        </el-table-column>
        <el-table-column prop="request" :show-overflow-tooltip="true" label="名称" align="center"></el-table-column>
        <el-table-column prop="answer" :show-overflow-tooltip="true" label="回答" align="center"></el-table-column>
        <el-table-column prop="sort" :show-overflow-tooltip="true" label="排序" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editRequest(scope.row)" >修改</el-button>
            <el-button type="text" @click="deleteRequest(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addRequest ref="addRequestRef" @resetRequest="resetRequest"></addRequest>
 </el-dialog>
</template>
<script>
 import addRequest from "./addRequest";
import { getRequestListByModelIdApi,deleteRequestApi} from "@/api/caseHandle";
export default {
  data() {
    this.timer = new Date().getTime();
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      total: 0,
      visible:false,
      modelId:"",
      timer:""
    };
  },
  components: {
    addRequest
  },
  inject:['reload'],
  methods: {
    showModal(modelId) {
      this.visible = true;
      this.modelId = modelId;
      this.getRequestList()
    },
    getRequestList() {
      //根据模板Id查询模版问题
      let _this = this;
      getRequestListByModelIdApi(this.modelId).then(
        res => {
          _this.tableData = res.data;
        },
        error => {
          console.log(error)
        }
      );
    },
    resetRequest(modelId){
      this.modelId = modelId;
      this.getRequestList()
    },
    //删除
    deleteRequest(id){
      let _this = this
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          deleteRequestApi(id).then(
            res => {
              _this.getRequestList()
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    //添加
    addRequest(){
      let data={
            modelId: this.modelId
        }
      this.$refs.addRequestRef.showModal(0,data);
    },
    //编辑
    editRequest(row){
      let data = row;
      this.$refs.addRequestRef.showModal(2, data);
    },

    closeDialog() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
