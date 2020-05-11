<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchPageLayout" id="userBox">
    <div class="searchPage toggleBox">
        <div class="handlePart">
            <el-form :inline="true" ref="userForm"  label-width="80px" :model="formInline">
                <el-row>  
                     <el-form-item label="姓名"  prop="personName">
                       <el-input v-model="formInline.personName"></el-input>
                    </el-form-item>
                    <el-form-item label="执法证号"  prop="ministerialNo">
                        <el-input v-model="formInline.ministerialNo"></el-input>
                    </el-form-item>
                    <el-form-item label="证件状态" prop="certStatus">
                            <el-select v-model="formInline.certStatus" placeholder="证件状态" remote  @focus="getDepatements('证件信息-证件状态','certStatusList')">
                                <el-option
                                    v-for="value in certStatusList" :key="value.id" :label="value.name" :value="value.id">
                                </el-option>
                            </el-select>
                   </el-form-item>
                    <el-form-item label="所属机构">
                        <!-- <el-select v-model="formInline.oid" placeholder="选择所属机构" remote  @focus="getDepatements('人员信息-所属机构','oidsInfo')">
                            <el-option
                                v-for="value in oidsInfo" :key="value.id" :label="value.name" :value="value.id">
                            </el-option>
                        </el-select> -->
                        <el-input v-model="formInline.oName"></el-input>
                    </el-form-item>
                 <el-form-item label=" " label-width="13px">
                        <el-button title="搜索" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo" @click="getPersonList"></el-button>
                        <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="reset"></el-button>
                    </el-form-item>
                    <el-form-item label=" " label-width="13px" style="float:right">
                         <el-button type="primary" icon="el-icon-sort" size="medium" @click="handleEdit('7','hz')">到期换证</el-button>
                    </el-form-item>
                    <el-form-item label=" " label-width="13px" style="float:right">
                         <el-button type="primary" icon="el-icon-upload2" size="medium">导出</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
            
        </div>
        <div class="tablePart">
            <el-table
                :data="tableData"
                v-loading="tableLoading"
                stripe
                style="width: 100%;height:100%"
                @selection-change="selectUser"
                >
                <el-table-column type="selection" width="60px" align="center"></el-table-column >
                <el-table-column prop="certId" label="certId" v-if="false"></el-table-column >
                <el-table-column prop="attribution" label="attribution" v-if="false"></el-table-column >
                <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
                <el-table-column prop="branchName" label="执法领域" align="center"></el-table-column>
                <el-table-column prop="certNo" label="执法证号" align="center"></el-table-column>
                <el-table-column prop="oname" label="发证机构" align="center"></el-table-column>
                <el-table-column prop="issueDate" label="发证日期" align="center"></el-table-column>
                <el-table-column prop="certStatusName" label="证件状态" align="center"></el-table-column>
                <el-table-column prop="modifyDate" label="证件状态变化日期" align="center"></el-table-column>
                <el-table-column prop="validityperiod" label="有效期" align="center"></el-table-column>
                <el-table-column label="操作项" width="260"  align="center">
                  <template slot-scope="scope" >
                    <el-button type="text"
                      @click="handleEdit('1', scope.row)"
                      v-if="scope.row.certStatusName == '正常'">挂失</el-button>
                    <el-button
                      type="text"
                      @click="handleEdit('6', scope.row)"
                      v-if="scope.row.certStatusName == '挂失'"
                    >解除挂失</el-button>
                    <el-button type="text"
                      @click="handleEdit('2', scope.row)"
                      v-if="scope.row.certStatusName == '正常'"
                    >暂扣</el-button>
                    <el-button type="text"
                      @click="handleEdit('3', scope.row)"
                      v-if="scope.row.certStatusName == '暂扣'"
                    >解除暂扣</el-button>
                    <el-button type="text"
                      @click="handleEdit('4', scope.row)"
                      v-if="scope.row.certStatusName != '注销' && scope.row.certStatusName != '吊销'"
                    >注销</el-button>
                    <el-button
                      type="text"
                      @click="handleEdit('5', scope.row)"
                      v-if="scope.row.certStatusName != '吊销' && scope.row.certStatusName != '注销'"
                    >吊销</el-button>
                    <el-button type="text" @click="getHistory(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paginationBox">
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
    <!-- 证件状态变化 -->
    <addParagraph ref="addParagraph" @getAllPersons="getOrgList"></addParagraph>
    <!--证件变化历史-->
    <certificateDetail ref="certificateDetail" :params="detailParams" @getMsg="getOrgList"></certificateDetail>
  </div>
</div>
</template>

 <script>
 import addParagraph from "./addParagraph";
 import certificateDetail from "./certificateDetail";
export default {
  data() {
    return {
      isShow: false,
      certStatusList:[],//证件状态列表
      oidsInfo:[],//所属结构列表
      formInline: {
        personName: "",  //姓名
        ministerialNo: "",   //执法证号
        attribution:"", //实卡归属
        oName:"", //执法机构
        modifyName:"",//发证人
        issueDate:"",//发证日期
        certStatusName:"",//证件状态名称
        modifyDate:"",//证件状态变化日期
        validityperiod:"",//有效期
        certId:"",
        certStatus:"",//z证件状态
        oid:"",//所属机构
      },
      tableData: [], //表格数据
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      departments: [], //机构下的部门
      currentOrganId: "",
      selectUserIdList: [], //选中的userid
      detailParams: { type: 'edit', id: '' },
      tableLoading: false
    };
  },
  components: {
    addParagraph,
    certificateDetail
  },
  methods: {
    //获取证件信息历史记录
    getHistory(row){
      this.detailParams.id = row.id;
      this.$refs.certificateDetail.showModal(row, '1');
    },
 //根据查询条件查询人员基本信息
    getPersonList() {
      this.tableLoading = true;
      let _this = this
      let data = {
        personName:_this.formInline.personName,
        ministerialNo: _this.formInline.ministerialNo,
        branchName: _this.formInline.branchName,
        oName:_this.formInline.oName,
        certStatus:_this.formInline.certStatus,
        personType:_this.formInline.personType,
        post:_this.formInline.post,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.$store.dispatch("updatePerCertMoudle", data).then(res => {
        _this.tableData = res.data.records;
        _this.totalPage = res.data.total;
        _this.tableLoading = false;
      }), err => {
        _this.tableLoading = false;
        this.$message({type: 'error', message: err.msg || ''});
      };
    },
    //点击下拉框的时候后头获取下拉框数据
    getDepatements(name,codeName){
      if(this.certStatusList.length===0){
        this.$store.dispatch("findAllDrawerByName",name).then(    //查询执法领域
          res=>{
            if(res.code===200){
              if(codeName==='certStatusList'){
                this.certStatusList=res.data;
              }else if(codeName==='oidsInfo'){
                this.oidsInfo=res.data;
              }
            }else{
              console.info("没有查询到数据");
            }
          }
        );
      }
    },
    //状态变化回调方法
    getOrgList(val) {
      this.getPersonList();
    },
    
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrgList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrgList(val);
    },
    // 证件状态变更
    handleEdit(type,row) {
      if(type != 7){
        let _this = this;
        let data = {
        certId:row.certId,
      };
      this.$refs.addParagraph.showModal(type,row);
      }else{
        if(this.selectUserIdList.length <= 0){
          this.$message({
            type: "error",
            message: "请选择一个用户"
          });
        }else if(this.selectUserIdList.length > 1){
          this.$message({
            type: "error",
            message: "只能选择一个用户"
          });
        }else{
           let _this = this;
            let data = {
             certId:this.selectUserIdList[0],
           };
          this.$refs.addParagraph.showModal(type,data);
        }
      }
    },
     //获取选中的user
    selectUser(val) {
      let _this = this
      _this.selectUserIdList = [];
      _this.selectList=[];
      val.forEach((item,index) => {
        _this.selectUserIdList.push(item.certId);
        _this.selectList.push(item.stationStatusName);
      });
    },
// 重置查询条件
    reset() {
      this.$refs["userForm"].resetFields();
    },

  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
    this.getPersonList();
  }
};
</script>

<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>