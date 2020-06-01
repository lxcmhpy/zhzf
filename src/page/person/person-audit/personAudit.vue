<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="searchPage toggleBox">
        <div class="handlePart">
          <el-form class="search-form" :inline="true" ref="personAduitForm" label-width="70px" :model="formInline">
            <el-row>
              <el-form-item label="姓名" prop="personName">
                <el-input v-model="formInline.personName" placeholder="" ></el-input>
              </el-form-item>
              <el-form-item label="执法证号" prop="ministerialNo" >
                <el-input v-model="formInline.ministerialNo" placeholder=""></el-input>
              </el-form-item>
               <el-form-item label="所属机构" prop="oName">
                <el-input v-model="formInline.oName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label=" " label-width="13px">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="getApproveList"
                ></el-button>
                <el-button
                  title="重置"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-zhongzhi"
                  @click="reset"
                ></el-button>
                <el-button
                  size="medium"
                  class="commonBtn toogleBtn"
                  :title="isShow? '点击收缩':'点击展开'"
                  :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                  @click="isShow = !isShow" ></el-button>
              </el-form-item>
              <!-- <el-form-item label=" " label-width="13px" style="float:right">
                <el-button
                  type="success"
                  icon="el-icon-success"
                  size="medium"
                  @click="doApproveById('审批通过')"
                >审批通过</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-error"
                  size="medium"
                  @click="doApproveById('审批未通过')"
                >审批不通过</el-button>
                <el-button type="primary" icon="el-icon-upload2" size="medium">导出</el-button>
              </el-form-item> -->
            </el-row>
            <el-row v-show="isShow">
              <el-form-item label="执法领域" prop="branch" >
                <el-select
                  v-model="formInline.branch"
                  placeholder="请选择"
                  remote
                  :filterable="branchIdsInfo.length > 5"
                  @focus="getDepatements('执法门类','branchIdsInfo')">
                  <el-option
                    v-for="value in branchIdsInfo" :key="value.id" :label="value.name" :value="value.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职务" prop="post">
                <el-select
                  v-model="formInline.post"
                  placeholder="请选择"
                  remote
                  :filterable="postList.length > 5"
                  @focus="getDepatements('人员信息-职务','postList')">
                  <el-option
                    v-for="value in postList" :key="value.id" :label="value.name" :value="value.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <div class="tablePart">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%;height:100%"
            @selection-change="getPersonIdFromSel"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中...">
            <!-- <el-table-column type="selection" align="center"></el-table-column> -->
            <el-table-column prop="personId" label=" " align="left" v-if="false"></el-table-column>
            <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="sex" label="性别" align="center" :formatter = "sexFormat"></el-table-column>
            <el-table-column prop="postName" label="职务" align="center"></el-table-column>
            <el-table-column prop="ministerialNo" label="执法证号" align="center"></el-table-column>
            <el-table-column prop="personOName" label="所属机构" align="center"></el-table-column>
            <el-table-column prop="branchName" label="执法领域" align="center"></el-table-column>
            <el-table-column label="操作项" width="220" align="center">
              <template slot-scope="scope">
                <div style="width:220px">
                  <el-button type="text" @click="getDetailInfo(scope.row)">查看</el-button>
                  <el-button type="text" @click="doApprove(scope.row,'adopt')">审批通过</el-button>
                  <el-button type="text" @click="doApprove(scope.row,'fail')">审批不通过</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paginationBox" v-show="true">
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
      <!-- 二次确认弹窗 -->
      <tipWindow ref="tips" @getAllPersons="getOrgList"></tipWindow>
      <addParagraph ref="addParagraph" @getAllPersons="getOrgList"></addParagraph>
    </div>
  </div>
</template>
 <script>
import tipWindow from "./tipWindow";
import addParagraph from "./addParagraph";
import {mixinPerson} from "@/common/js/personComm";
export default {
  mixins:[mixinPerson],
  data() {
    return {
      isShow: false,
      tableLoading:false,
       branchIdsInfo: [],//执法领域列表
       postList:[],//职务列表
       oidsInfo:[],//所属机构列表
      formInline: {
        personName: "", //姓名
        ministerialNo: "", //执法证号
        oName: "", //所属机构
        branch: "", //执法领域
        post: "" ,//职务
        oid:"",//证件信息
      },
      tableData: [], //表格数据
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      personIdList: [], //选中的userid
      tableDataTree:[]
    };
  },
  components: {
    tipWindow, addParagraph
  },
  methods: {
    //获取列表复选的personId
    getPersonIdFromSel(val){
      this.personIdList = val.per;
      let _this = this
      _this.personIdList = [];
      val.forEach((item,index) => {
        _this.personIdList.push(item.personId);
      });
    },
    //性别转换
    sexFormat(row, column) {
      if (row.sex === '0') {
        return '男'
      } else if (row.sex === '1') {
        return '女'
      } 
    },
    //分页查询审批列表
    getApproveList() {
      let _this = this
      _this.tableLoading=true;
      let data = {
        personName:_this.formInline.personName,
        ministerialNo: _this.formInline.ministerialNo,
        oName: _this.formInline.oName,
        branch:_this.formInline.branch,
        post:_this.formInline.post,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.$store.dispatch("getApproveMoudle", data).then(res => {
        _this.tableData = res.data.records;
        _this.totalPage = res.data.total;
        _this.tableLoading=false;
      }, err => {
        this.$message.error(err.msg || err.message);
        this.tableLoading=false;
      });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      console.log("每页显示的条数", val);
      this.pageSize = val;
      //this.getOrgList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      console.log("当前页", val);
     // this.currentPage = val;
      //this.getOrgList(val);
    },
    //点击下拉框的时候后头获取下拉框数据
    getDepatements(name,codeName){
      if(this.branchIdsInfo.length===0){
        this.$store.dispatch("findAllDrawerByName",name).then(    //查询执法领域
          res=>{
            if(res.code===200){
              if(codeName==='branchIdsInfo'){
                this.branchIdsInfo=res.data;
              }
              if(codeName==='postList'){
                this.postList=res.data;
              }
              if(codeName==='oidsInfo'){
                this.oidsInfo=res.data;
              }
              if(codeName==='stationStatusInfo'){
                this.stationStatusInfo=res.data;
              }
            }else{
              console.info("没有查询到数据");
            }
          },
          err => {this.$message.error(err.msg || err.message);}
        );
      }
    },
    // 执行审批
    doApprove(data,type) {
      this.$refs.addParagraph.showModal(data.approveId, type);
    },
    // 查看人员信息
    getDetailInfo(row){
      this.openPersonDetail(row, 'view');
    },
    //批量执行审批
    doApproveById(type) {
      if(this.personIdList.length == 0){
        this.$message({
          type: "error",
          message:  "请勾选择人员",
        });
      }else{
        this.$refs.tips.showModal(this.personIdList,type);
      }
    },
    // 重置查询条件
    reset() {
      this.$refs["personAduitForm"].resetFields();
    },
    //子组件回调方法
    getOrgList(){
      this.getApproveList();
    },
  },
  created() {
    this.getApproveList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.search-form{
  >>>.el-input, >>>.el-select{
    width: 180px;
    margin-right: 0;
  }
}
</style>
