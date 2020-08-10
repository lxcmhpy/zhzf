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
          <el-form-item label="装备名称" prop="name" class-form="form-class">
            <el-input v-model="queryForm.name"></el-input>
          </el-form-item>
          <el-form-item label="装备类型" prop="deviceType" class-form="form-class">
            <elSelectTree
                ref="queryFormDeviceTypeTreeObj"
                :options="deviceTypeList"
                :accordion="true"
                :props="orgTreeProps"
                @getValue="queryFormDeviceTypeClick">
            </elSelectTree>
            <el-input style="display:none" v-model="queryForm.deviceType"></el-input>
          </el-form-item>
          <el-form-item label="" class-form="form-class">
            <el-button
                title="搜素"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-sousuo"
                @click="currentPage = 1; queryDeviceList();"
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
        ref="deviceTable"
        resizable
        stripe
        style="width:100%"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
        :max-height="280"
      >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column prop="code" label="装备编号" align="left" width="120px"></el-table-column>
        <el-table-column prop="name" label="装备名称" align="center" width="120px"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="100"></el-table-column>
        <el-table-column prop="deviceType" label="装备类型" align="center" width="120px"></el-table-column>
        <el-table-column prop="brand" label="品牌型号" align="center" min-width="140px"></el-table-column>
        <el-table-column prop="useUnit" label="使用单位" min-width="140px" align="center"></el-table-column>
        <el-table-column prop="storageLocation" label="存放位置" min-width="160px" align="center" fixed="right"></el-table-column>
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
        listDevice,
    } from "@/api/device/deviceInventory.js";
    import { queryDeviceTypeTree} from "@/api/device/deviceType.js";
    import elSelectTree from '@/components/elSelectTree/elSelectTree';
    export default {
        data() {
            return {
                queryForm: {
                    name: "",
                    deviceType: "",
                    useUnit:""
                },
                visible: false,
                dialogtitle: "选择装备",
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总数
                tableData: [],
                tableLoading: false,
                deviceTypeList:[],
                useUnit:'',
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
            confirm(){
                if(this.$refs.deviceTable.selection.length>0){
                    this.$emit("addItemList",this.$refs.deviceTable.selection);
                    this.closeDialog();
                }else{
                    this.$message({
                        type: "error",
                        message:"请选择装备"
                    });
                }
            },
            showModal(billType,useUnit) {
                this.visible = true
                this.useUnit=useUnit
                this.billType=billType
                this.queryDeviceList()
                this.getDeviceTypeTree()
            },
            async queryDeviceList(){
                this.queryForm.pageSize = this.pageSize
                this.queryForm.currentPage = this.currentPage
                this.queryForm.useUnit = this.useUnit
                this.queryForm.billType = this.billType
                let res = await listDevice(this.queryForm)
                this.totalPage = res.data.total;
                this.tableData = res.data.records;
            },
            async getDeviceTypeTree(){
                let res = await queryDeviceTypeTree()
                this.deviceTypeList=res.data
                res.data.forEach(p=>p.disabled=true)
            },
            queryFormDeviceTypeClick(val) {
                if(null != val && val.length==2){
                    this.$refs.queryFormDeviceTypeTreeObj.valueId=''
                    this.$refs.queryFormDeviceTypeTreeObj.valueTitle=''
                    this.$message({type:'error',message:'请选择末级设备类型'})
                }else{
                    this.$refs.queryFormDeviceTypeTreeObj.$children[0].handleClose();
                    this.queryForm.deviceType  = val
                }
            },
            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryDeviceList();
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryDeviceList();
            },
            reset() {
                this.$refs["queryFormRef"].resetFields();
                if(this.$refs.queryFormDeviceTypeTreeObj){
                    this.$refs.queryFormDeviceTypeTreeObj.clearHandle()
                }
            },
            closeDialog() {
                this.visible = false;
                this.$refs["queryFormRef"].resetFields();
                if(this.$refs.queryFormDeviceTypeTreeObj){
                    this.$refs.queryFormDeviceTypeTreeObj.clearHandle()
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
.search-form {
  >>> .el-form-item {
    margin-bottom: 10px;
  }
  >>> .el-input__inner {
    width: 176px;
  }
}
</style>