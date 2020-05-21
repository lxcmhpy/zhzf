<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="visible" @close="visible = false" :close-on-click-modal="false" width="80%" class="mini-content table-wapper-x">
      <el-button type="primary" size="medium" icon="el-icon-search" @click="bindLaws">绑定法条</el-button>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="graybg">
            认定依据
            <el-form :inline="true" :model="lawCognizanceForm" ref="lawCognizanceForm">

              <el-form-item label="条" prop="itemPun">
                <el-input v-model="lawCognizanceForm.itemPun" placeholder="条"></el-input>
              </el-form-item>
              <el-form-item label="款" prop="clausePun">
                <el-input v-model="lawCognizanceForm.clausePun" placeholder="款"></el-input>
              </el-form-item>
              <el-form-item label="项" prop="iitemPun">
                <el-input v-model="lawCognizanceForm.iitemPun" placeholder="项"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="getlawCognizanceListSearch">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="resetForm('lawCognizanceForm')">重置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="addCognizance">添加</el-button>
              </el-form-item>
            </el-form>

            <div>
              <el-table :data="tableData" stripe style="width: 100%" height="400px" @selection-change="handleLawCognizanceChange">
                <el-table-column type="selection" width="35">
                </el-table-column>
                <el-table-column prop="bnslawNameCog" label="法规名称" align="center"></el-table-column>
                <el-table-column prop="bnsLawNoteCog" label="认定依据" align="center">
                  <el-table-column prop="itemCog" label="条" align="center"></el-table-column>
                  <el-table-column prop="clauseCog" label="款" align="center"></el-table-column>
                  <el-table-column prop="iitemCog" label="项" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="bnsLawNoteCog" label="法规原文" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="getlawRegulationsDentail(scope.row)">修改</el-button>
                    <el-button type="text" @click="deletelawRegulations(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="paginationBox">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="graybg">

            处罚依据
            <el-form :inline="true" :model="lawRegulationsSearchForm" ref="lawRegulationsSearchForm">

              <el-form-item label="条" prop="itemPun">
                <el-input v-model="lawRegulationsSearchForm.itemPun" placeholder="条"></el-input>
              </el-form-item>
              <el-form-item label="款" prop="clausePun">
                <el-input v-model="lawRegulationsSearchForm.clausePun" placeholder="款"></el-input>
              </el-form-item>
              <el-form-item label="项" prop="iitemPun">
                <el-input v-model="lawRegulationsSearchForm.iitemPun" placeholder="项"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="getlawRegulationsListSearch">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="resetFormPun('lawRegulationsSearchForm')">重置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="addPunishment">添加</el-button>
              </el-form-item>
            </el-form>
            <div >
              <el-table :data="tableDataPun" stripe height="400px" @selection-change="handleLawPunishChange">
                <el-table-column type="selection" width="35">
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
                <el-table-column fixed="right" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="getlawRegulationsDentail(scope.row)">修改</el-button>
                    <el-button type="text" @click="deletelawRegulations(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="paginationBox">
              <el-pagination @size-change="handleSizeChangePun" @current-change="handleCurrentChangePun" :current-page="currentPagePun" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPagePun"></el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="addlawRegulations">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加认定依据 -->
    <addLawCognizanceBasis ref="addLawCognizanceBasisRef" @getPageComp="getPageInfoList"></addLawCognizanceBasis>
    <!-- 添加处罚依据 -->
    <addLawPunishmentBasis ref="addLawPunishmentBasisRef" @getPageComp="getPageInfoList">
    </addLawPunishmentBasis>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import addLawCognizanceBasis from "./addLawCognizanceBasis";
import addLawPunishmentBasis from "./addLawPunishmentBasis";
import {
   deleteLawRegulationsApi, addLawRegulationsApi, findLawPunishmentByPageApi, findLawCognizanceByPageApi,bindCauseLawRegulationsApi
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数

      tableDataPun: [], //表格数据
      currentPagePun: 1, //当前页
      pageSizePun: 10, //pagesize
      totalPagePun: 0, //总页数

      searchName: "", //查询名称
      lawRegulationsSearchForm: {
        // bnslawNamePun: "",
        iitemPun: '',
        clausePun: '',
        itemPun: '',
        bnslawLawName: ''
      },
      lawCognizanceForm: {
        // bnslawNamePun: "",
        iitemPun: '',
        clausePun: '',
        itemPun: '',
        bnslawLawName: ''
      },
      info: "",
      addLawRegulationsForm: {

      },
      dialogTitle: '添加法条',
      visible: false,
      dentailVisible: false,
      rules: {
        strName: [{ required: true, message: "法规标题必须填写", trigger: "blur" }],
        strNumber: [{ required: true, message: "发布文号必须填写", trigger: "blur" }],
        strOrgan: [{ required: true, message: "发布机关必须填写", trigger: "blur" }],
        drawerName: [{ required: true, message: "法规效力必须填写", trigger: "blur" }],
      }
    };
  },
  components: {
    addLawPunishmentBasis,
    addLawCognizanceBasis
  },
  inject: ["reload"],
  computed: {
    ...mapGetters(["btnlawId"])
  },
  methods: {
    //获取认定依据列表
    getLawCognizanceBasisList() {
      let data = this.lawCognizanceForm
      data.current = this.currentPage;
      data.size = this.pageSize;
      data.bnslawIdCog = this.btnlawId
      let _this = this;

      findLawCognizanceByPageApi(data).then(
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
    getlawCognizanceListSearch() {
      this.currentPage = 1
      this.getLawCognizanceBasisList()
    },
    //获取处罚依据列表
    getLawPunishmentList() {
      let data = this.lawCognizanceForm
      data.current = this.currentPage;
      data.size = this.pageSize;
      data.bnslawIdPun = this.btnlawId
      let _this = this;

      findLawPunishmentByPageApi(data).then(
        res => {
          console.log('类型', res);
          // this.caseTypeList = res.data.records;
          console.log("法规列表", res);
          _this.tableDataPun = res.data.records;
          _this.totalPagePun = res.data.total;
        },
        error => {
          console.log(error)
        }
      );
    },
    // 查询
    getlawRegulationsListSearch() {
      this.currentPagePun = 1;
      this.getLawPunishmentList()
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getLawCognizanceBasisList()
    },
    //重置
    resetFormPun(formName) {
      this.$refs[formName].resetFields();
      this.currentPagePun = 1;
      this.getLawPunishmentList()
    },
    //获取法规值
    getlawRegulationsDentail(row) {
      this.dentailVisible = true
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
              this.$message({ message: '删除成功', type: 'success' });
              this.getLawCognizanceBasisList()
            } else {
              this.$message.error('删除失败');
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
    add() {
      this.visible = true;
    },
    addlawRegulations() {
      let data = this.addBtnlawForm;
      let _this = this;
      console.log(typeof (this.addBtnlawForm.status))
      addLawRegulationsApi(data).then(
        res => {
          console.log("添加法规", res);
          if (res.code == '200') {
            this.visible = false;
            this.getBtnlawList();
          } else {
            this.$message.error('添加失败');
            return
          }
        },
        error => {
          console.log(error)
          this.$message.error('添加失败');
        }
      );
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
      this.getLawCognizanceBasisList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLawCognizanceBasisList();
    },
    //更改每页显示的条数Pun
    handleSizeChangePun(val) {
      this.pageSizePun = val;
      this.currentPagePun = 1;
      this.getLawPunishmentList();
    },
    //更换页码Pun
    handleCurrentChangePun(val) {
      this.currentPage = val;
      this.getLawPunishmentList();
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
    },
    // 添加处罚依据
    addPunishment() {

      this.$refs.addLawPunishmentBasisRef.showModal(1, "");

    },
    // 添加认定依据
    addCognizance() {
      this.$refs.addLawCognizanceBasisRef.showModal(1, "");
    },
    getPageInfoList() {
      console.log('aa')
    },
    showModal() {
      this.visible = true
      this.getLawCognizanceBasisList();
      this.getLawPunishmentList();
    },
    handleLawCognizanceChange(val) {
      console.log(val)
    },
    handleLawPunishChange(val) {
      console.log(val)
    },
    // 违法行为绑定法条
    bindLaws(){

    }
  },
  created() {

    // this.getLawPunishmentList();
    console.log('adfrae', this.btnlawId)
  }
};
</script>

<style lang="scss">
@import "@/assets/css/systemManage.scss";
.mini-content {
  .el-input {
    width: 100px;
  }
}
.graybg {
  padding: 10px;
  background: #fcfcfc;
  border: 1px solid #eee;
  // box-sizing: border-box;
}
.table-wapper-x {
  .el-table__body-wrapper {
    height: 335px !important;
    padding: 0 !important;
  }
}
</style>
