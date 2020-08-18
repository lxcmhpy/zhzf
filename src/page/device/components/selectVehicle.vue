<template>
  <el-dialog
    :title="dialogtitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="80%"
    class="fullscreen"
    append-to-body
  >
    <el-form
      class="search-form"
      :model="queryForm"
      ref="queryFormRef"
      label-position="right"
      label-width="80px"
      :inline="true"
    >
      <div>
        <el-row>
          <el-form-item label="车牌号" prop="vehicleNumber">
            <el-input v-model="queryForm.vehicleNumber"></el-input>
          </el-form-item>
          <el-form-item label="使用单位" prop="useUnit">
            <elSelectTree
                ref="queryFormUseUnitTreeObj"
                :options="organList"
                :accordion="true"
                :props="orgTreeProps"
                style="width:200px" 
                :filterable="true"
                @getValue="queryFormUseUnitClick">
            </elSelectTree>
            <el-input style="display:none" v-model="queryForm.useUnit"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button
                title="搜素"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-sousuo"
                @click="currentPage = 1; queryVehicleList();"
            ></el-button>
            <el-button
                title="重置"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-zhongzhi"
                @click="reset"
            ></el-button>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
    <div>
      <el-table
        :data="tableData"
        ref="vehicleTable"
        resizable
        stripe
        style="width:100%"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
        :max-height="280"
      >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column prop="vehicleNumber" label="车牌号" align="left" width="120px"></el-table-column>
        <el-table-column prop="useUnitName" label="使用单位" align="center" ></el-table-column>
        <el-table-column prop="vehicleCategory" label="车辆类别" align="center" width="120px"></el-table-column>
        <el-table-column prop="useCondition" label="使用状况" align="center" width="120px"></el-table-column>
        <el-table-column prop="perNumber" label="使用证号" align="center" width="140px"></el-table-column>
        <el-table-column prop="state" label="证件状态" width="120px" align="center"></el-table-column>
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
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
    import {
        listVehicle,
    } from "@/api/device/deviceVehicle.js";
    import elSelectTree from '@/components/elSelectTree/elSelectTree';
    export default {
        data() {
            return {
                queryForm: {
                    vehicleNumber: "",
                    useUnit:""
                },
                visible: false,
                dialogtitle: "选择车辆",
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                tableData: [],
                tableLoading: false,
                organList:[],
                billType:'',
                orgTreeProps: {
                    label: "label",
                    value: "id"
                },
            };
        },
        components: {
            elSelectTree,
        },
        methods: {
            queryFormUseUnitClick(val) {
                this.$refs.queryFormUseUnitTreeObj.$children[0].handleClose();
                this.queryForm.useUnit  = val
            },
            confirm(){
                if(this.$refs.vehicleTable.selection.length==0){
                    this.$message({
                        type: "error",
                        message:"请选择车辆"
                    });
                    return;
                }
                if(this.$refs.vehicleTable.selection.length==1){
                    this.$emit("VehicleOk",this.$refs.vehicleTable.selection[0]);
                    this.closeDialog();
                }else{
                    this.$message({
                        type: "error",
                        message:"只能选择一个车辆"
                    });
                }
            },
            showModal(billType,organList) {
                this.visible = true
                this.billType=billType
                this.organList=organList
                this.queryVehicleList()
            },
            async queryVehicleList(){
                this.queryForm.pageSize = this.pageSize
                this.queryForm.currentPage = this.currentPage
                this.queryForm.billType = this.billType
                let res = await listVehicle(this.queryForm)
                this.totalPage = res.data.total;
                this.tableData = res.data.records;
            },
            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryVehicleList();
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryVehicleList();
            },
            reset() {
                this.$refs["queryFormRef"].resetFields();
                if(this.$refs.queryFormUseUnitTreeObj){
                    this.$refs.queryFormUseUnitTreeObj.clearHandle()
                }
            },
            closeDialog() {
                this.visible = false;
                this.$refs["queryFormRef"].resetFields();
                if(this.$refs.queryFormUseUnitTreeObj){
                    this.$refs.queryFormUseUnitTreeObj.clearHandle()
                }
            },
        },
    };
</script>
<style lang="scss" scoped>
.exam-person-dialog {
  >>> .el-dialog {
    min-width: 976px;
    max-width: 1016px;
  }
  >>> .el-dialog__body {
    padding-bottom: 10px;
  }
  .paginationBox {
    margin-top: 10px;
    text-align: center;
    >>> .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
  }
}
</style>