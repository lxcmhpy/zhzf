<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchPageLayout" id="userBox">
    <div class="searchPage toggleBox">
        <div class="handlePart">
            <el-form :inline="true" ref="userForm"  label-width="70px">
                <el-row>
                    <el-form-item label=" " label-width="13px">
                        <el-button type="primary" icon="el-icon-download" size="medium">导出</el-button>
                        <el-button type="success" icon="el-icon-plus" size="medium" @click="handleEdit('0')">审批通过</el-button>
                        <el-button type="danger" icon="el-icon-minus" size="medium" @click="handleEdit('1')">审批不通过</el-button>
                        <el-button type="info"  icon="el-icon-refresh" size="medium"  @click="reset">重置查询项</el-button>
                        <el-button type="warning" icon="el-icon-search" size="medium">查询</el-button>
                    </el-form-item>
                </el-row> 
                <el-row>  
                     <el-form-item label="姓名" v-model="formInline.organRealNp">
                        <el-input v-model="formInline.organRealNp"></el-input>
                    </el-form-item>
                    <el-form-item label="执法证号" v-model="formInline.organRealNp">
                        <el-input v-model="formInline.organRealNp"></el-input>
                    </el-form-item>
                    <el-form-item label="所属机构" v-model="formInline.organRealNp">
                        <el-input v-model="formInline.organRealNp"></el-input>
                    </el-form-item>
                    <el-form-item label="执法门类" v-model="formInline.organRealNp">
                    <el-select v-model="formInline.sysOrganId">
                        <el-option label="综合执法" value="1"></el-option>
                        <el-option label="海事执法" value="1"></el-option>
                        <el-option label="工程质量监督" value="1"></el-option>
                        <el-option label="道路运政" value="1"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="职务" >
                    <el-select v-model="formInline.sysOrganId">
                        <el-option label="书记" value="1"></el-option>
                        <el-option label="副书记" value="1"></el-option>
                        <el-option label="党委书记" value="1" ></el-option>
                        <el-option label="党委委员" value="1"></el-option>
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
                <el-table-column label="操作项" width="220">
                <template slot-scope="scope" >
                    <div style="width:220px">
                    <el-button type="text" @click="handleEdit('0')">审批通过</el-button>
                    <el-button type="text" @click="handleEdit('1')">审批不通过</el-button>
                    <el-button type="text" @click="getDetailInfo(scope.row,'0')">查看</el-button>
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
      data:"test",
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

    //执法号段列表查询
    getOrgList(val) {
 
    alert("执行查询");
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
    // 表格编辑
    handleEdit(type) {
      this.$refs.tips.showModal(type);
      // this.$refs.addUserRef.addUserForm = JSON.parse(JSON.stringify(row));
    },
    
    // 表格
    
    //更具id删除
    handleDelete(row) {
 
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
  
  }
};
</script>
<!--
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
-->
