<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="lawRegulationsBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="lawRegulationsSearchForm" ref="lawRegulationsSearchForm">
            <el-form-item label="法规名称" prop='bnslawNamePun'>
              <el-input v-model="lawRegulationsSearchForm.bnslawNamePun" placeholder="输入法规名称"></el-input>
            </el-form-item>
            <el-form-item label="条" prop="itemPun">
              <el-input v-model="lawRegulationsSearchForm.itemPun" placeholder="发布文号"></el-input>
            </el-form-item>
            <el-form-item label="款" prop="clausePun">
              <el-input v-model="lawRegulationsSearchForm.clausePun" placeholder="发布文号"></el-input>
            </el-form-item>
            <el-form-item label="项" prop="iitemPun">
              <el-input v-model="lawRegulationsSearchForm.iitemPun" placeholder="发布文号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getlawRegulationsListSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="resetForm('lawRegulationsSearchForm')">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addlawRegulations">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="bnslawLawName" label="法规名称" align="center"></el-table-column>
          <el-table-column prop="bnsLawNoteCog" label="认定依据" align="center">
            <el-table-column prop="itemCog" label="条" align="center"></el-table-column>
            <el-table-column prop="clauseCog" label="款" align="center"></el-table-column>
            <el-table-column prop="iitemCog" label="项" align="center"></el-table-column>
          </el-table-column>
          <el-table-column prop="bnslawNamePun" label="法规名称" align="center"></el-table-column>
          <el-table-column prop="bnsLawNoteCog" label="处罚依据" align="center">
            <el-table-column prop="itemPun" label="条" align="center"></el-table-column>
            <el-table-column prop="clausePun" label="款" align="center"></el-table-column>
            <el-table-column prop="iitemPun" label="项" align="center"></el-table-column>
          </el-table-column>
          <el-table-column prop="industryType" label="最高罚款" align="center"></el-table-column>
          <el-table-column prop="lawerLimit" label="罚款下限" align="center"></el-table-column>
          <el-table-column prop="upperLimit" label="罚款上限" align="center"></el-table-column>
          <el-table-column prop="upperLimit" label="处罚标准" align="center"></el-table-column>
          <el-table-column prop="upperLimit" label="法规原文" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="editlawRegulations(scope.row)">编辑</el-button> -->
              <el-button type="text" @click="getlawRegulationsVal(scope.row)">法条管理</el-button>
              <el-button type="text" @click="deletelawRegulations(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
      <!-- <addEditlawRegulations ref="addEditlawRegulationsRef"></addEditlawRegulations> -->
      <!-- <showlawRegulationsKey ref="showlawRegulationsKeyRef"></showlawRegulationsKey> -->
    </div>
  </div>
</template>
<script>
import addEditlawRegulations from "./addBnslaw";
import showlawRegulationsKey from "./addBnslaw";
import { mapGetters } from "vuex";
import {
  getlawRegulationsListApi, deleteLawRegulationsApi
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName: "", //查询名称
      lawRegulationsSearchForm: {
        bnslawNamePun: "",
        iitemPun: '',
        clausePun: '',
        itemPun: '',
      },
      info: ""
    };
  },
  components: {
    addEditlawRegulations,
    showlawRegulationsKey
  },
  inject: ["reload"],
  computed: {
    ...mapGetters(["btnlawId"])
  },
  methods: {
    //获取法规列表
    getlawRegulationsList() {
      let data = this.lawRegulationsSearchForm
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;

      getlawRegulationsListApi(data).then(
        res => {
          console.log('类型', res);
          // this.caseTypeList = res.data.records;
          console.log("法规列表", res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error)
        }
      );
    },
    // 查询
    getlawRegulationsListSearch() {
      this.currentPage = 1;
      this.getlawRegulationsList()
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getlawRegulationsList()
    },
    //获取法规值
    getlawRegulationsVal(row) {
      this.$store.dispatch("lawRegulations", row.id);
      this.$router.push({
        name: 'lawRegulations',
        // params:{
        //   personInfo:data,
        //   pageStatus:param
        // }
      });
    },
    //删除法规
    deletelawRegulations(id) {
      console.log("12345", id);
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLawRegulationsApi(id).then(
          res => {
            console.log('类型', res);
            if (res.code == 200) {
              this.getlawRegulationsList()
            } else {
              this.$message({
                type: 'info',
                message: '删除失败'
              });
            }
          },
          error => {
            console.log(error)
          }
        );
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //添加法规
    addlawRegulations() {
      let data = {
        id: "",
        pid: "",
        leng: this.tableData.length
      };
      this.$refs.addEditlawRegulationsRef.showModal(0, data, "list");
    },
    //编辑法规
    editlawRegulations(row) {
      let data = {
        row: row,
        pid: ""
      };
      this.$refs.addEditlawRegulationsRef.showModal(2, data, "list");
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getlawRegulationsList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlawRegulationsList();
    },
    //获取法规值
    getlawRegulationsKeyList(data) {
      // let this = this
      this.$store.dispatch("getlawRegulationsListDetail", data).then(
        res => {
          console.log("法规值列表", res);
          if (res.data.length != 0) {
            this.info = "此数据法规已维护法规值，确认删除吗？";
          } else {
            this.info = "确认删除?";
          }
          this.$confirm(this.info, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$store.dispatch("deletelawRegulations", data).then(
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
            .catch(() => { });
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.getlawRegulationsList();
    console.log('adfrae',this.btnlawId)
  }
};
</script>

<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
