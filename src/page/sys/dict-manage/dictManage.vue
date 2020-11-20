<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="dictBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="dicSearchForm" ref="dicSearchForm">
            <el-form-item label="名称" prop="name">
              <el-input v-model="dicSearchForm.name" placeholder="输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getDictList(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-right" @click="resetForm('dicSearchForm')">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addDict">添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="openNewWeb">打开百度</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column prop="notes" label="描述" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.status === 0?'有效':'无效'}}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column> -->
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editDict(scope.row)">编辑</el-button>
              <el-button type="text" @click="getDictVal(scope.row)">字典值</el-button>
              <el-button type="text" @click="deleteDict(scope.row.id)">删除</el-button>
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
      <addEditDict ref="addEditDictRef"></addEditDict>
      <showDictKey ref="showDictKeyRef"></showDictKey>
    </div>
  </div>
</template>
<script>
import addEditDict from "./addEditDict";
import showDictKey from "./showDictKey";

export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName: "", //查询名称
      dicSearchForm: {
        name: ""
      },
      info: ""
    };
  },
  components: {
    addEditDict,
    showDictKey
  },
  inject: ["reload"],
  methods: {
    //获取字典列表
    getDictList(current) {
      let data = {
        current: current,
        size: this.pageSize,
        name: this.dicSearchForm.name
      };
      let _this = this;
      this.$store.dispatch("getDictList", data).then(
        res => {
          console.log("字典列表", res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getDictList(1);
    },
    //获取字典值
    getDictVal(row) {
      this.$refs.showDictKeyRef.showModal(row);
    },
    //删除字典
    deleteDict(id) {
      console.log("12345", id);
      this.getDictKeyList(id);
      // let _this = this;
    },
    //添加字典
    addDict() {
      let data = {
        id: "",
        pid: "",
        leng: this.totalPage
      };
      this.$refs.addEditDictRef.showModal(0, data, "list");
    },
    //编辑字典
    editDict(row) {
      let data = {
        row: row,
        pid: ""
      };
      this.$refs.addEditDictRef.showModal(2, data, "list");
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getDictList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDictList(val);
    },
    //获取字典值
    getDictKeyList(data) {
      // let this = this
      this.$store.dispatch("getDictListDetail", data).then(
        res => {
          console.log("字典值列表", res);
          if (res.data.length != 0) {
            this.info = "此数据字典已维护字典值，确认删除吗？";
          } else {
            this.info = "确认删除?";
          }
          this.$confirm(this.info, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$store.dispatch("deleteDict", data).then(
                res => {
                  this.reload();
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                },
                err => {
                  console.log(err);
                }
              );
            })
            .catch(() => {});
        },
        err => {
          console.log(err);
        }
      );
    },
    openNewWeb(){
      this.$router.push({name:'myIframe'})
    }
  },
  created() {
    this.getDictList(1);
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
