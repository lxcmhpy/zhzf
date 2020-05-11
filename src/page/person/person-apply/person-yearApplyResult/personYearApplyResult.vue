
 <template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchPageLayout" id="userBox">
    <div class="searchPage">
        <div class="handlePart">
            <el-form :inline="true" ref="userForm" class="search-form"  :model="formInline" label-width="70px">
               <el-row>
            <el-form-item label="姓名" prop="personName">
              <el-input v-model="formInline.personName"></el-input>
            </el-form-item>
            <el-form-item label="执法证号" prop="ministerialNo">
              <el-input v-model="formInline.ministerialNo"></el-input>
            </el-form-item>
            <el-form-item label="所属机构" prop="oName">
              <el-input v-model="formInline.oName"></el-input>
            </el-form-item>
             <el-form-item label="年份" prop="reviewYear">
              <el-select v-model="formInline.reviewYear" placeholder="年份" remote  @focus="getYear('年份','getYearList')">
                <el-option
                   v-for="value in getYearList" :key="value.id" :label="value.name" :value="value.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" " label-width="13px">
                <el-button title="搜索" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo" @click="getPersonList"></el-button>
                <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="reset"></el-button>
                <el-button
                    size="medium"
                    class="commonBtn toogleBtn"
                    :title="isShow? '点击收缩':'点击展开'"
                    :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                    @click="isShow = !isShow" ></el-button>
            </el-form-item>
          </el-row>
          <el-row v-show="isShow">
            <el-form-item label="执法领域" prop="branchId">
              <el-select v-model="formInline.branchId" placeholder="执法领域" remote  @focus="getDepatements('执法门类','branchIdsInfo')">
                <el-option
                    v-for="value in branchIdsInfo" :key="value.id" :label="value.name" :value="value.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职务" prop="post">
              <el-select v-model="formInline.post" filterable placeholder="职务" remote  @focus="getDepatements('人员信息-职务','postList')">
                <el-option
                    v-for="value in postList" :key="value.id" :label="value.name" :value="value.id">
                </el-option>
              </el-select>
            </el-form-item>
           
            <el-form-item label="成绩" prop="reviewScore">
              <el-select v-model="formInline.reviewScore" placeholder="成绩" remote  @focus="getDepatements('人员年审-年审成绩','reviewScoreList')">
                <el-option
                  v-for="value in reviewScoreList" :key="value.id" :label="value.name" :value="value.id">
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
                @selection-change="selectDate"
                v-loading="tableLoading"
            >
                <!-- <el-table-column type="selection" align="center"></el-table-column> -->
                <el-table-column prop="personId" v-if="false" label=""></el-table-column>
                <el-table-column prop="personName" label="姓名" align="left"></el-table-column>
                <el-table-column prop="sex" label="性别" :formatter = "sexFormat" align="center"></el-table-column>
                <el-table-column prop="postName" label="职务" align="center"></el-table-column>
                <el-table-column prop="ministerialNo" label="执法证号" align="center"></el-table-column>
                <el-table-column prop="personOName" label="所属机构" align="center"></el-table-column>
                <el-table-column prop="branchName" label="执法门类" align="center"></el-table-column>
                <el-table-column prop="reviewYear" label="年审年份" align="center"></el-table-column>
                   <el-table-column prop="reviewScoreName" label="年审成绩" align="center"></el-table-column>
                 
                
                <!-- <el-table-column label="操作项" width="160">
                <template slot-scope="scope" >
                    <div style="width:160px">
                      <el-button type="text" @click="handlePage(scope.row)">复审</el-button>
                    </div>
                </template>
                </el-table-column> -->
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
 <!-- 新增执法号段管理 -->
        <addParagraph ref="addParagraph" @getAllPersons="getOrgList"></addParagraph>
    <!-- 弹窗提示 -->
  <tipWindow ref="tips" @getAllPersons="getOrgList"></tipWindow>
  </div>
</div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
 <script>
 import addParagraph from "./../addParagraph";
 import tipWindow from "./../tipWindow";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      isShow: false,
      tableLoading:false,
      branchIdsInfo: [],//执法领域列表
       postList:[],//职务列表
       reviewScoreList:[],//成绩列表
       getYearList:[],//年份列表
       oidsInfo:[],//所属机构列表
      formInline: {
        personId:'',
        personName: "",  //姓名
        ministerialNo: "",   //执法证号
        oName: "",     //所属机构
        oid:"",//
        branchId: "", //执法门类
        post:"",      //职务
        postName:"",//职务名称
        reviewYear:"", // 年份
        reviewScore:"",// 成绩
      },
      tableData: [], //表格数据
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      departments: [], //机构下的部门
      currentOrganId: "",
      selectUserIdList: [], //选中的userid
    };
  },
  components: {
    addParagraph,
    tipWindow
  },
  methods: {
    selectDate(val){
      let _this = this
      _this.selectUserIdList = [];
      val.forEach((item,index) => {
          _this.selectUserIdList.push(item.personId);
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
   //根据查询条件查询人员基本信息
      handleYear(row){
        let _this = this
           _this.$store.dispatch("approveAr", this.selectUserIdList).then(res => {
               if(res.code===200){
                  console.info("年审成功");

                  this.getPersonList();
               }
            });
            err => {
                console.log(err);
            };
      },
//复审
      handlePage(row){
         this.$refs.addParagraph.showModal(row.personId,'1');
      },
        getPersonList() {
            let _this = this
            _this.tableLoading=true;
            let data = {
                personName:_this.formInline.personName,
                idNo: _this.formInline.idNo,
                ministerialNo: _this.formInline.ministerialNo,
                idNo: _this.formInline.idNo,
                branchId:_this.formInline.branchId,
                oid:_this.formInline.oid,
                certStatus:_this.formInline.certStatus,
                personType:_this.formInline.personType,
                post:_this.formInline.post,
                reviewYear:_this.formInline.reviewYear,
                reviewScore:_this.formInline.reviewScore,
                current: _this.currentPage,
                size: _this.pageSize
            };
            _this.$store.dispatch("queryRArDataMoudle", data).then(res => {
                _this.tableData = res.data.records;
                _this.totalPage = res.data.total;
                _this.tableLoading=false;
            });
            err => {
                console.log(err);
                this.tableLoading=false;
            };
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
                            if(codeName==='resultList'){
                                this.resultList=res.data;
                            }
                        }else{
                            console.info("没有查询到数据");
                        }
                    }
                );
            }
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
                            if(codeName==='reviewScoreList'){
                                this.reviewScoreList=res.data;
                            }
                        }else{
                            console.info("没有查询到数据");
                        }
                    }
                );
            }
        },
        //点击下拉框的时候后头获取下拉框Year数据
        getYear(name,codeName){
                this.$store.dispatch("getYearMoudle",name).then(    //查询执法领域
                    res=>{
                        if(res.code===200){
                            if(this.getYearList.size==undefined ){
                                this.getYearList=[];
                               if(codeName==='getYearList'){
                                //this.getYearList=res.data;
                                for(let i=res.data.minYear;i<=res.data.maxYear;i++){
                                  console.info("------------------"+i);
                                  this.getYearList.push({id:i,name:i});
                                }
                            }
                            }
                           
                        }else{
                            console.info("没有查询到数据");
                        }
                    }
                );
        },
    //执法号段列表查询
    getOrgList(val) {
 
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      console.log("每页显示的条数", val);
      this.pageSize = val;
      this.getOrgList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      console.log("当前页", val);
      this.currentPage = val;
      this.getOrgList(val);
    },
    // 表格编辑
     handleEdit(type) {
      this.$refs.tips.showModal(type);
      // this.$refs.addUserRef.addUserForm = JSON.parse(JSON.stringify(row));
    },
     //点击添加tab标签，查看人员详情信息
        
        personYearApply(row,param){
            let _this = this 
                     _this.$store.commit("setPersonInfo",'','');
                     _this.$router.replace({
                     name: 'personYearApply',
                   params:{
                 }
            });
        },
    //更具id删除
    handleDelete(row) {
 
    },
    //获取当前年份
     getNowYear(){
        let date = new Date;
        let year = date.getFullYear();
        this.formInline.reviewYear = year;
    },
// 重置查询条件
  reset() {
      this.$refs["userForm"].resetFields();
    },
   
    //新增
    addOrgApply() {
      let parentNode = {
      };
      this.$refs.addParagraph.showModal("1",parentNode);
    },

  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
      //this.getNowYear();
        this.getPersonList();
    }
};
</script>
<style lang="scss" scoped>
.search-form{
  >>>.el-input, >>>.el-select{
    width: 180px;
    margin-right: 0;
  }
}
</style>
 