<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchPageLayout" id="userBox">
    <div class="searchPage toggleBox">
        <div class="handlePart">
            <el-form :inline="true" ref="userForm"  label-width="70px">
                <el-row>
                    <el-form-item label=" " label-width="13px">
                        <el-button type="primary" icon="el-icon-share" size="medium" @click="personYearApply">人员年度考核</el-button>
                        <el-button type="info"  icon="el-icon-refresh" size="medium"  @click="reset">重置查询项</el-button>
                        <el-button type="warning" icon="el-icon-search" size="medium">查询</el-button>
                    </el-form-item>
                </el-row> 
                <el-row>  
                     <el-form-item label="查询项" >
                    <el-select v-model="formInline.sysOrganId">
                        <el-option label="姓名" value="0"></el-option>
                        <el-option label="执法证号" value="1"></el-option>
                        <el-option label="所属机构" value="2"></el-option>
                        <el-option label="执法门类" value="3"></el-option>
                        <el-option label="职务" value="3"></el-option>
                        <el-option label="年审年份" value="3"></el-option>
                        <el-option label="年审成绩" value="3"></el-option>
                    </el-select>
                    </el-form-item>=
                     <el-form-item label="姓名" >
                        <el-input v-model="formInline.sysOrganId"></el-input>
                    </el-form-item>
                    <el-form-item label="执法证号" >
                        <el-input v-model="formInline.organNp"></el-input>
                    </el-form-item>
                    <el-form-item label="所属机构" >
                        <el-input v-model="formInline.organCl"></el-input>
                    </el-form-item>
                    <el-form-item label="执法门类" >
                    <el-select v-model="formInline.organNp">
                        <el-option label="综合执法" value="0"></el-option>
                        <el-option label="海事执法" value="1"></el-option>
                        <el-option label="工程质量监督" value="2"></el-option>
                        <el-option label="道路运政" value="3"></el-option>
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
            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column prop="data" label="姓名"></el-table-column>
                <el-table-column prop="data" label="性别"></el-table-column>
                <el-table-column prop="data" label="职务"></el-table-column>
                <el-table-column prop="data" label="执法证号"></el-table-column>
                <el-table-column prop="data" label="所属机构"></el-table-column>
                <el-table-column prop="data" label="执法门类"></el-table-column>
                <el-table-column label="操作项" width="160">
                <template slot-scope="scope" >
                    <div style="width:160px">
                    <el-button type="text" @click="handleEdit('0')">修改</el-button>
                    </div>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paginationBox" v-show="totalPage">
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
 import addParagraph from "./addParagraph";
 import tipWindow from "./tipWindow";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      isShow: false,
      formInline: {
        sysOrganId: "",
        organNp: "",
        organRealNp: "",
        organCl: "",
      },
      tableData: [{data:"test"}], //表格数据
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
  //点击添加tab标签，查看人员详情信息
        getDetailInfo(row,param){
            this.$store.commit("setPersonInfo", row,param);
            this.$router.replace({
                name: 'personDetailPage',
                params:{
                    personInfo:row,
                    pageStatus:param,
                }
            });
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
            this.$router.replace({
                name: 'personYearPage',
                params:{
                    personInfo:row,
                    pageStatus:param,
                }
            });
            // this.$router.replace({
            //     name: 'paesonYearPage',
            //     params:{
            //         personInfo:row,
            //         pageStatus:param,
            //     }
            // });
        },
    
    //更具id删除
    handleDelete(row) {
 
    },
// 重置查询条件
  reset() {
      alert("aaa");
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
  
  }
};
</script>
<!--
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
-->
