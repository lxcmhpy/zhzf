<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchPageLayout" id="userBox">
    <div class="searchPage toggleBox">
        <div class="handlePart">
            <el-form :inline="true" ref="userForm"  label-width="70px">
                    <el-form-item label="执法机构" prop="organNp
                    
                    ">
                        <el-input v-model="formInline.organNp" placeholder="回车可直接查询"></el-input>
                    </el-form-item>
                    <el-form-item label="" label-width="13px">
                        <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
                        <el-button type="success"  icon="el-icon-refresh" size="medium"  @click="reset">重置</el-button>
                        <el-button type="info" icon="el-icon-plus" size="medium" @click="addOrgApply(0)">新增</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="medium" >删除</el-button>
                    </el-form-item>

            </el-form>
        </div>
        <div class="tablePart">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%;height:100%"
            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column prop="data" label="执法机构"></el-table-column>
                <el-table-column prop="data" label="执法门类"></el-table-column>
                <el-table-column prop="data" label="号段起"></el-table-column>
                <el-table-column prop="data" label="号段止"></el-table-column>
                <el-table-column prop="data" label="备注"></el-table-column>
                <el-table-column label="操作项" width="160">
                <template slot-scope="scope" >
                    <div style="width:160px">
                    <el-button type="text" @click="addOrgApply(1)">修改</el-button>
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
      isShow: false,
      formInline: {
        sysOrganId: "",
        organNp: "",
        organRealNp: "",
        organCl: "",
      },
      tableData: [{data:"测试数据"}], //表格数据
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
    handleEdit(index, row) {
      this.$refs.addUserRef.handelEdit(row);
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
    addOrgApply(type) {
      let parentNode = {
      };
      this.$refs.addParagraph.showModal(type,parentNode);
    },

  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
  
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
