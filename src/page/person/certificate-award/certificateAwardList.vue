<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchPageLayout" id="userBox">
    <div class="searchPage toggleBox">
        <div class="handlePart">
            <el-form :inline="true" ref="userForm"  label-width="70px">
                <el-row>  
                     <el-form-item label="姓名" >
                        <el-input ></el-input>
                    </el-form-item>
                    <el-form-item label="执法证号" >
                        <el-input ></el-input>
                    </el-form-item>
                    <el-form-item label="执法门类" >
                    <el-select >
                        <el-option label="综合执法" ></el-option>
                        <el-option label="海事执法" ></el-option>
                        <el-option label="工程质量监督" ></el-option>
                        <el-option label="道路运政" ></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="所属机构" label-width="90px">
                        <el-input ></el-input>
                    </el-form-item>
                 <el-form-item label=" " label-width="13px">
                        <el-button title="搜索" class="commonBtn searchBtn" size="medium" icon="iconfont law-sousuo"></el-button>
                        <el-button title="重置" class="commonBtn searchBtn" size="medium" icon="iconfont law-zhongzhi" @click="reset"></el-button>
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
                <el-table-column  label="姓名"></el-table-column>
                <el-table-column  label="性别"></el-table-column>
                <el-table-column  label="执法证号"></el-table-column>
                <el-table-column  label="所属机构"></el-table-column>
                <el-table-column  label="执法门类"></el-table-column>
                <el-table-column  label="执法区域"></el-table-column>
                <el-table-column  label="职务"></el-table-column>
                <el-table-column label="操作项" width="160">
                <template slot-scope="scope" >
                    <div style="width:160px">
                    <el-button type="text" @click="handleEdit(scope.$index, scope.row)">颁发</el-button>
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
 <!-- 颁发证件 -->
        <addParagraph ref="addParagraph" @getAllPersons="getOrgList"></addParagraph>
  
  </div>
</div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
 <script>
 import addParagraph from "./addParagraph";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
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
    addParagraph
  },
  methods: {

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
    handleEdit(index, row) {
      this.$refs.addUserRef.handelEdit(row);
      // this.$refs.addUserRef.addUserForm = JSON.parse(JSON.stringify(row));
    },
    // 表格
// 重置查询条件
  reset() {
      alert("aaa");
      this.$refs["userForm"].resetFields();
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
