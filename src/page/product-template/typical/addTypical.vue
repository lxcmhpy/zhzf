<template>
<el-dialog
    title="标记典型案件"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="80%"
  >
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search">
          <el-form ref="searchFormRef" :inline="true" :model="dicSearchForm" class>
            <el-form-item label="案件编号" prop="caseNumber">
              <el-input v-model="dicSearchForm.caseNumber"></el-input>
            </el-form-item>
            <el-form-item
              label="业务领域"
              prop="zfml">
              <el-select
                v-model="dicSearchForm.zfml"
                placeholder="请选择"
                :loading="selectLoading"
                clearable >
                <el-option
                    v-for="value in branchInfo" :key="value" :label="value" :value="value">
                </el-option>        
              </el-select>
            </el-form-item>
            <el-form-item label="当事人" prop="party">
              <el-input v-model="dicSearchForm.party"></el-input>
            </el-form-item>
            <el-form-item label="受案时间" prop="daterange"> 
              <el-date-picker
                v-model="dicSearchForm.daterange"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="受案机构" prop="organName">
              <elSelectTree
                  ref="elSelectTreeObj"
                  :options="organList"
                  :accordion="true"
                  :props="myprops"
                  :value="selectOrganId"
                  @getName="handleOrgan"
                ></elSelectTree>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getCaseTypes">查询</el-button>
              <el-button type="primary" size="medium" icon="iconfont law-zhongzhi" @click="reset">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addTypical">标记为典型案件</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" @selection-change="changeFun" stripe style="width: 100%" height="100%">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="caseNumber" label="编号" align="center"></el-table-column>
          <el-table-column prop="zfml" label="业务领域" align="center"></el-table-column>
          <el-table-column prop="party" label="当事人" align="center"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车船号牌" align="center"></el-table-column>
          <el-table-column prop="caseName" label="案由" align="center"></el-table-column>
          <el-table-column prop="organName" label="受案机构" align="center"></el-table-column>
          <el-table-column prop="programType" label="是否行政复议" align="center">
            <span slot-scope="scope">
              <span>{{scope.row.isR == '是' ? '是': '否'}}</span>
            </span>
          </el-table-column>
          <el-table-column prop="programType" label="是否行政机构" align="center">
            <span slot-scope="scope">
              <span>{{scope.row.isLi == '是' ? '是': '否'}}</span>
            </span>
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
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</el-dialog>
</template>
<script>
import {getQueryCaseTypeListApi,findClosCaseList,markTypicalCase} from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
import elSelectTree from "@/components/elSelectTree/elSelectTree";
import { getAllOrganApi } from "@/api/system";
import typeicalDetail from "./typeicalDetail";
export default {
  data() {
    return {
      tableData: [], //表格数据
      dicSearchForm: {
        zfml: '',
        party: '',
        organName: '',
        caseNumber: '',
        daterange:[]
      },
      organList:[],//受案机构
      selectLoading: false,
      caseTypeList:[],//案件类型
      branchInfo:['公路路政','道路运政','水路运政','航道运政','港口行政','航道行政','海事行政','工程质量安全监督','其他'],//业务领域
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      checkBoxData:[],
      visible:false,
      myprops: {
          label: "label",
          value: "id",
      },
      selectOrganId: "", //默认选中机构的id
      
    };
  },
  components: {
    typeicalDetail,
    elSelectTree
  },
  inject: ["reload"],
  methods: {
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.currentPage = 1;
      this.pageSize = 10;
      this.totalPage = 0;
      this.dicSearchForm.zfml="";
      this.dicSearchForm.party="";
      this.dicSearchForm.organName="";
      this.dicSearchForm.caseNumber="";
      this.dicSearchForm.daterange=[];
      this.$refs.elSelectTreeObj.clearHandle();
      this.tableData=[];
    },
    //重置
    reset(){
      this.currentPage = 1;
      this.pageSize = 10;
      this.totalPage = 0;
      this.tableData=[];
      // this.dicSearchForm.zfml="";
      // this.dicSearchForm.party="";
      // this.dicSearchForm.organName="";
      // this.dicSearchForm.caseNumber="";
      // this.dicSearchForm.daterange=[];
      this.$refs["searchFormRef"].resetFields();
      this.$refs.elSelectTreeObj.clearHandle();
      this.getCaseTypes();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getCaseTypes();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCaseTypes();
    },
    //获取角色
    showModal(){
      this.getCaseTypes();
      this.visible = true;
    },
    //获取机构
    getAllOrgan() {
      let _this = this
      getAllOrganApi().then((res) => {
        console.log(res)
        this.organList = res.data;
        // this.dicSearchForm.organName = this.selectOrganId = res.data[0].label;
        // this.$refs.elSelectTreeObj.valueTitle = res.data[0].label;
        // this.$refs.elSelectTreeObj.valueId = res.data[0].id;

      })
      .catch((err) => {
          throw new Error(err);
      });
    },
    //获取选中的机构
    handleOrgan(val) {
      this.$refs.elSelectTreeObj.$children[0].handleClose();
      this.dicSearchForm.organName = val;
    },
    getCaseTypes() {
      let acceptStartTime=this.dicSearchForm.daterange[0];
      let acceptEndTime=this.dicSearchForm.daterange[1];
      if(acceptStartTime){
        acceptStartTime=acceptStartTime.substring(0,acceptStartTime.length-3);
      }
      if(acceptEndTime){
        acceptEndTime=acceptEndTime.substring(0,acceptEndTime.length-3);
      }
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        zfml: this.dicSearchForm.zfml,
        party: this.dicSearchForm.party,
        organName: this.dicSearchForm.organName,
        caseNumber: this.dicSearchForm.caseNumber,
        acceptStartTime: acceptStartTime,
        acceptEndTime: acceptEndTime,
      };
      let _this = this;
      findClosCaseList(data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error)
        }
      )
    },
    //查询所有案件类型
    getQueryCaseTypeList() {
      getQueryCaseTypeListApi().then(
        res => {
          this.caseTypeList = res.data;
        },
        error => {
          console.log(error)
        }
      );
    },
    //获取机构
    getAllOrgan(organId) {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.organList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //新增
    addTypical() {
      if(this.checkBoxData.length==0){
        this.$message.error("请选择案件！");
        return;
      }
      let ids="";
      for(let i=0;i<this.checkBoxData.length;i++){
        ids+=this.checkBoxData[i].caseId+",";
      }
      ids=ids.substring(0,ids.length-1);
      markTypicalCase(ids).then(
        res => {
          if(res.code==200){
            this.$message({ type: "success", message: "标记成功!"});
            this.reload();
          }else{
            this.$message.error(res.msg);
          }
        },
        error => {
          console.log(error)
        }
      );
    },
    changeFun(val) {
      this.checkBoxData = val;
    }
  },
  created() {
    this.getQueryCaseTypeList();
    this.getAllOrgan("root");
  }
};
</script>
