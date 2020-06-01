<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchPageLayout" id="userBox">
    <div class="searchPage">
      <div class="handlePart">
        <el-form :inline="true" class="search-form" ref="staffOutForm"  label-width="70px">
          <el-row>  
            <el-form-item label="姓名" >
              <el-input v-model="staffOutForm.personName"></el-input>
            </el-form-item>
            <el-form-item label="执法证号" >
              <el-input v-model="staffOutForm.certNo"></el-input>
            </el-form-item>
            <el-form-item label="调出机构">
              <el-input v-model="staffOutForm.outOName"></el-input>
            </el-form-item>
            <el-form-item label=" " label-width="13px">
              <el-button title="搜索" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo" @click="getStaffOutPage"></el-button>
              <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="reset"></el-button>
              <el-button
                size="medium"
                class="commonBtn toogleBtn"
                :title="isShow? '点击收缩':'点击展开'"
                :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                @click="isShow = !isShow"
              ></el-button>
            </el-form-item>
            <el-form-item label=" " label-width="13px" style="float:right">
              <el-button type="info" icon="el-icon-caret-left" size="medium" @click="cancelStaff">撤销调动</el-button>
            </el-form-item>
          </el-row>
          <el-row v-show="isShow">
            <el-form-item label="执法领域" prop="branchId">
            <el-select v-model="staffOutForm.branchId" placeholder="执法领域" remote  @focus="getDepatements('执法门类','branchIdsInfo')">
                <el-option
                v-for="value in branchIdsInfo" :key="value.id" :label="value.name" :value="value.id">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="职务" prop="post">
            <el-select v-model="staffOutForm.post" filterable placeholder="职务" remote  @focus="getDepatements('人员信息-职务','postIdsInfo')">
                <el-option
                v-for="value in postIdsInfo" :key="value.id" :label="value.name" :value="value.id">
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
          v-loading="tableLoading"
          element-loading-spinner="car-loading"
          element-loading-text="加载中..."
          style="width: 100%;height:100%"
           @selection-change="selectData">
          <el-table-column type="selection" align="center"></el-table-column>
          <!-- <el-table-column prop="transferId" v-if="false" label="" align="center"></el-table-column> -->
          <el-table-column prop="transferStatusName" label="调岗状态" align="center"></el-table-column>
          <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="idNo" label="身份证号" min-width="180px" align="center"></el-table-column>
          <el-table-column prop="outOName" label="调出单位" align="center"></el-table-column>
          <el-table-column prop="outTime" label="调出时间" align="center"></el-table-column>
          <el-table-column prop="reason" label="调岗原因" align="center"></el-table-column> 
          <el-table-column prop="inOName" label="调入单位" align="center"></el-table-column>
          <el-table-column prop="inTime" label="调入时间" align="center"></el-table-column>
          <el-table-column label="操作项" width="160" align="center">
            <template slot-scope="scope" >
              <el-button type="text" @click="getDetailInfo(scope.row,'0')">查看</el-button>
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
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
          ></el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mixinPerson} from "@/common/js/personComm"
export default {
  name:'staffOutList',//人员调出列表
  mixins:[mixinPerson],
  data() {
    return {
      isShow: false,
      staffOutForm: {
        personName: "",  //姓名
        certNo: "",   //执法证号
        oid: "",      //所属机构
        branchName: "", //执法门类
        post:"",  
        oName:"",
        branchName:""
      },
      tableData: [], //表格数据
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      departments: [], //机构下的部门
      currentOrganId: "",
      selectUserIdList: [], //选中的userid
      selectUserIdList: [], //选中的userid
      branchIdsInfo:[],//存储执法领域下拉框数据
      postIdsInfo:[],//存储职务下拉框数据
      oidsInfo:[]//存储所属机构下拉框数据
    };
  },
  components: {},
  methods: {
    cancelStaff(){//撤销调动
      let _this = this
      if(!_this.selectUserIdList.length){
        this.$message.warning('请选择撤销调动人员');
        return false;
      } else if (_this.selectUserIdList.length > 1) {
        this.$message.warning('每次只能选择1名人员撤销调动');
        return false;
      }
      let data = {
        transferId:_this.selectUserIdList[0],
      };
      _this.$store.dispatch("cancelTransfer", data).then(
        res=>{
          if(res.code===200){
            _this.$message({
              type: "success",
              message: "撤销成功!"
            });
            _this.getStaffOutPage();
          }else{
            _this.$message({
              type: "error",
              message: "撤销失败!"
            });
          }
        },
        err => {
          _this.$message({type: 'error', message: err.msg || ''});
        }
      );
    },
    //点击下拉框的时候后头获取下拉框数据
    getDepatements(name,codeName){ 
      let _this = this 
      if(_this.branchIdsInfo.length===0){
        _this.$store.dispatch("findAllDrawerByName",name).then(
          res=>{
            if(res.code===200){
              if(codeName==='branchIdsInfo'){
                _this.branchIdsInfo=res.data;
              }
              if(codeName==='postIdsInfo'){
                _this.postIdsInfo=res.data;
              }
              if(codeName==='oidsInfo'){
                _this.oidsInfo=res.data;
              }
            }else{
              console.info("没有查询到数据");
            }
          }
        );
      }
      _this.$store.dispatch("findAllDrawerByName",name).then(
        res=>{
          if(res.code===200){
            if(codeName==='branchIdsInfo'){
              _this.branchIdsInfo=res.data;
            }
            if(codeName==='postIdsInfo'){
              _this.postIdsInfo=res.data;
            }
            if(codeName==='oidsInfo'){
              _this.oidsInfo=res.data;
            }
          }else{
            console.info("没有查询到数据");
          }
        }
      );
    },
    getStaffOutPage(){//查询列表
      let _this = this 
      let data = {
        branchId:_this.staffOutForm.branchId,
        outOName:_this.staffOutForm.outOName,
        post:_this.staffOutForm.post,
        certNo:_this.staffOutForm.certNo,
        personName:_this.staffOutForm.personName,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getStaffOutList",data);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStaffOutPage();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStaffOutPage();
    },
    //点击添加tab标签，查看人员详情信息
    getDetailInfo(row,param){
      this.openPersonDetail(row, 'view');
    },
    
    reset() {// 重置查询条件
      this.$refs["userForm"].resetFields();
      this.$refs["staffOutForm"].resetFields();
    },
    //获取选中的user
    selectData(val) {
      let _this = this
      _this.selectUserIdList = [];
      val.forEach((item,index) => {
        _this.selectUserIdList.push(item.transferId);
      });
    }
  },
  created() {
    this.getStaffOutPage();
  }
};
</script>

<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style  lang="scss" scoped>
.search-form{
  >>>.el-input, >>>.el-select{
    width: 180px;
    margin-right: 0;
  }
}
</style>
