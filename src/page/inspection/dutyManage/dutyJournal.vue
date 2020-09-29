<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search toggleBox">
          <div class="handlePart">
            <el-form :inline="true" :model="searchForm" ref="searchFormRef" class="search-form">
              <el-row>
                <el-form-item label="执法机构" prop="oName">
                  <el-input v-model="searchForm.oName" placeholder></el-input>
                </el-form-item>
                <el-form-item label="排班人员" prop="schedulePersonnel">
                  <el-input v-model="searchForm.schedulePersonnel" placeholder></el-input>
                </el-form-item>
                <el-form-item label="任务路线" prop="patrolRoute">
                  <el-input v-model="searchForm.patrolRoute" placeholder></el-input>
                </el-form-item>
                <el-form-item label="执法人员" prop="lawEnforcementOfficials">
                  <el-input v-model="searchForm.lawEnforcementOfficials" placeholder></el-input>
                </el-form-item>
                <el-form-item style="line-height:44px;">
                  <el-button
                    size="medium"
                    class="commonBtn searchBtn"
                    title="搜索"
                    icon="iconfont law-sousuo"
                    @click="currentPage = 1; getJournalList();"
                  ></el-button>
                  <el-button
                    size="medium"
                    class="commonBtn searchBtn"
                    title="重置"
                    icon="iconfont law-zhongzhi"
                    @click="resetSearch"
                  ></el-button>
                  <el-button
                    size="medium"
                    class="commonBtn toogleBtn"
                    :title="isShow? '点击收缩':'点击展开'"
                    :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                    @click="isShow = !isShow"
                  ></el-button>
                </el-form-item>
              </el-row>
              <el-row v-if="isShow">
                <el-form-item label="任务类型" prop="patrolType">
                  <el-select v-model="searchForm.patrolType" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="路巡" value="0"></el-option>
                    <el-option label="网巡" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="任务状态" prop="status">
                  <el-select v-model="searchForm.status" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未完成" value="未完成"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="填报时间" prop="createTime">
                  <el-date-picker
                    v-model="searchForm.createTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div class="tableHandle">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="addJournalFun">新增</el-button>
        <el-button type="info" icon="el-icon-delete-solid" size="medium" @click="deleteJournalFun">删除</el-button>
        <!-- <el-button type="warning" size="medium" @click="handoverFun">
          <i class="icon-handover"></i>交接班
        </el-button> -->
      </div>
      <div class="tablePart">
        <el-table
          ref="journalTableRef"
          :data="tableData"
          resizable
          stripe
          class="person-table"
          v-loading="tableLoading"
          element-loading-spinner="car-loading"
          element-loading-text="加载中..."
          style="width: 100%;height:100%;"
          @selection-change="selectJournal"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="title" label="日志名称" align="left" ></el-table-column>
          <el-table-column prop="oname" label="执法机构" align="left" ></el-table-column>
          <el-table-column prop="schedulePersonnel" label="排班人员" align="center"></el-table-column>
          <el-table-column prop="createTime" label="填报日期" align="center" ></el-table-column>
          <el-table-column prop="plateNumbers" label="车牌/船舶号" align="center" ></el-table-column>
          <el-table-column prop="patrolRoute" label="巡查地点/线路" align="center" ></el-table-column>
          <el-table-column prop="lawEnforcementOfficials" label="执法人员" align="center"></el-table-column>
          <el-table-column prop="patrolType" label="任务类型" align="center" ></el-table-column>
          <!-- <el-table-column prop="status" label="任务状态" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.taskStatus === '已完成'"
                style="color: #05C051;"
              >{{scope.row.taskStatus}}</span>
              <span
                v-else-if="scope.row.taskStatus === '未完成'"
                style="color: #E84241;"
              >{{scope.row.taskStatus}}</span>
              <span v-else>{{scope.row.taskStatus}}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="opt" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handoverFun(scope.row)">交接班</el-button>
              <el-button type="text" @click="editJournalInfo(scope.row)">修改</el-button>
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
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增日志选择执法门类 -->
    <selectLawCategory ref="selectLawCategoryRef" />
  </div>
</template>
<script>
import { getCheChecklogPageList,deleteRecordApi} from '@/api/supervision';
import SelectLawCategory from "@/page/inspection/dutyManage/components/selectLawCategory.vue";
export default {
  data() {
    return {
      isShow: false,
      searchForm: {
        oid:"",//执法机构ID
        oName:"",
        schedulePersonnel:"",//排班人员
        patrolRoute:"",//任务路线
        lawEnforcementOfficials:"",//执法人员
        patrolType:"",//任务类型
        status:"",//任务状态
        createTime:"",//填
        businessType:""

      },
      tableData: [],
      selectList: [],
      tableLoading: false,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
    };
  },
  components: { SelectLawCategory },
  created() {
    this.getJournalList();
    this.getEnforceLawType();
  },
  methods: {
    // 获取日志列表
    getJournalList(){
      // const queryData = Object.assign(this.searchForm, { current: this.currentPage, size: this.pageSize });
      // console.log(queryData);
      let data={
        oName:this.searchForm.oName,
        schedulePersonnel:this.searchForm.schedulePersonnel,
        patrolRoute:this.searchForm.patrolRoute,
        lawEnforcementOfficials:this.searchForm.lawEnforcementOfficials,
        patrolType:this.searchForm.patrolType,
        status:this.searchForm.status,
        createTime:this.searchForm.createTime,
        current: this.currentPage,
        size: this.pageSize

      };
       getCheChecklogPageList(data).then(res => {
        if (res.code == "200") {
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
  
    // 新增
    addJournalFun() {
          this.$router.push({
            name: 'add_duty_journal',
            params: { type: this.searchForm.businessType, page: 'journal',handelType:"1" }
          });
    },
     // 获取执法门类
    getEnforceLawType() {
      this.$store.dispatch("getEnforceLawType", "1").then(
        (res) => {
          res.data.forEach(element =>{
            if(element.cateName == "公路路政"){
              this.searchForm.businessType = element.cateId;
            }
          })
        },
        (err) => {}
      );
    },
    // 删除
    deleteJournalFun(){
      if (this.selectList.length === 0) {
        this.$message({ type: 'warning', message: '请选择要删除的日志' });
      } else if(this.selectList.length > 1){
        this.$message({ type: 'warning', message: '每次只能删除一条日志' });
      }else{
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: 'custom-question',
          customClass: 'custom-confirm'
        }).then(() => {
              deleteRecordApi(this.selectList[0]).then(res => {
            if (res.code == "200") {
              this.getJournalList();
            }
          }, err => {
            this.$message({ type: 'error', message: err.msg || '' });
          });
        }).catch(() => {});
      }
    },
    // 交接班
    handoverFun(row){
      //   if (this.selectList.length === 0) {
      //   this.$message({ type: 'warning', message: '请选择一条日志' });
      // } else if(this.selectList.length > 1){
      //   this.$message({ type: 'warning', message: '每次只能选择一条日志' });
      // }else{
         this.$router.push({
          name: "journal_handover",
        params: { page: "handover",checklogId:row.checklogId,handelType:"3" },
      });
      // }
     
    },
    // 查看交接班
    checkConcat(row) {
      this.$router.push({
        name: "journal_handover",
        params: { page: "handover",checklogId:row.checklogId,handelType:"4"},
      });
    },
    // 修改日志
    editJournalInfo(row) {
      this.$router.push({
            name: 'add_duty_journal',
            params: { type: "11111",checklogId:row.checklogId, page: 'journal',handelType:"2" }
          });
    },
    // 日志查询
    resetSearch() {
      this.$refs["searchFormRef"].resetFields();
      this.currentPage = 1;
      this.getJournalList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getJournalList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getJournalList();
    },
    // 获取选中的日志
    selectJournal(val) {
       let _this = this;
      _this.selectList = [];
      val.forEach((item, index) => {
        _this.selectList.push(item.checklogId);
      });
    },
  },
};
</script>

<style  lang="scss" scoped>
.search-form {
  >>> .el-input,
  >>> .el-select {
    width: 180px;
    margin-right: 0;
  }
  >>> .el-date-editor,
  >>> .el-input__icon {
    line-height: 32px;
  }
  >>> .el-button.commonBtn.el-button--medium {
    padding: 6px 14px;
  }
}
>>> .el-select {
  margin-right: 0;
}
.person-table {
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
}
.tableHandle {
  margin-bottom: 10px;
  .icon-handover {
    display: block;
    width: 14px;
    height: 14px;
    background: url("../../../../static/images/img/personInfo/icon_jiaojieb.svg")
      no-repeat;
    float: left;
    margin-right: 5px;
  }
}
</style>
