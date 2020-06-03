<template>
  <div class="searchAndpageBox" id="roleBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
          <el-form-item label="模板名称">
            <el-input v-model="searchForm.name" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="案件类型">
            <el-select v-model="searchForm.remark" clearable filterable placeholder="请选择">
              <el-option
                v-for="(res) in caseTypeList"
                :key="res.id"
                :label="res.programType==='0' ?'一般程序'+'：'+res.typeName:'简易程序'+'：'+res.typeName"
                :value="res.programType==='0' ?'一般程序'+'：'+res.typeName:'简易程序'+'：'+res.typeName"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="searchForm.remark" clearable placeholder="请输入环节名称"></el-input> -->
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-search"
              @click="getCatalogSearch"
            >查询</el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addCatalog">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" :index="showIndex" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="模板名称" align="center"></el-table-column>
        <el-table-column prop="caseType" label="所属案件类型" align="center"></el-table-column>
        <el-table-column prop="remark" label="描述" align="center"></el-table-column>
        <el-table-column prop="sort" label="顺序" align="center"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <div style="width:160px">
              <el-button type="text" @click.stop @click="editCatalog(scope.row)">修改</el-button>
              <el-button type="text" @click.stop @click="deleteCatalog(scope.row)">删除</el-button>
              <el-button type="text" @click.stop @click="bindDoc(scope.row)">绑定文书</el-button>
            </div>
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
    <addEditCatalog ref="addEditCatalogRef"></addEditCatalog>
    <catalogLinkDocList ref="catalogLinkDocListRef"></catalogLinkDocList>
  </div>
</template>
<script>
import addEditCatalog from "./addEditCatalog";
import catalogLinkDocList from "./catalogLinkDocList";
export default {
  data() {
    return {
      tableData: [], //表格数据
      caseTypeList: [],
      searchForm: {
        name: "",
        remark: ""
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  components: {
    addEditCatalog,
    catalogLinkDocList
  },
  inject: ["reload"],
  methods: {
    bindDoc(row) {
      this.$refs.catalogLinkDocListRef.showModal(row);
    },
    //编辑环节
    editCatalog(row) {
      this.$refs.addEditCatalogRef.showModal(2, row);
    },
    //删除环节
    deleteCatalog(row) {
      this.$confirm("确认删除该环节?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("deleteCatalog", row.id).then(
            res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.reload();
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getCatalog();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCatalog();
    },
    // 查询
    getCatalogSearch() {
      this.currentPage = 1;
      this.getCatalog();
    },
    //获取目录
    getCatalog() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        name: this.searchForm.name,
        caseType: this.searchForm.remark
      };
      let _this = this;
      this.$store.dispatch("getCatalogList", data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //添加环节
    addCatalog() {
      let sort = this.totalPage;
      this.$refs.addEditCatalogRef.showModal(0, sort);
    },
    //查询案件类型列表
    getCaseType() {
      this.$store.dispatch("getCaseTypeList", 0).then(
        //查询案件类型列表(启用)
        res => {
          if (res.code === 200) {
            this.caseTypeList = res.data;
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    showIndex(index){
      return (this.currentPage-1)*this.pageSize+index+1;
    }
  },
  mounted() {
    this.getCaseType();
  },
  created() {
    this.getCatalog();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
