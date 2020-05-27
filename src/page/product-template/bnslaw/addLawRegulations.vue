<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      @close="visible = false"
      :close-on-click-modal="false"
      width="90%"
      class="mini-content table-wapper-x"
    >
      <el-button type="primary" size="medium" icon="el-icon-search" @click="bindLaws">绑定法条</el-button>
      <el-row :gutter="20">
        <el-col :span="11">
          <div class="graybg">
            认定依据
            <el-form :inline="true" :model="lawCognizanceForm" ref="lawCognizanceForm">
              <el-form-item label="条" prop="itemCog">
                <el-input v-model="lawCognizanceForm.itemCog" placeholder="条"></el-input>
              </el-form-item>
              <el-form-item label="款" prop="clauseCog">
                <el-input v-model="lawCognizanceForm.clauseCog" placeholder="款"></el-input>
              </el-form-item>
              <el-form-item label="项" prop="iitemCog">
                <el-input v-model="lawCognizanceForm.iitemCog" placeholder="项"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="getlawCognizanceListSearch"
                >查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="resetForm('lawCognizanceForm')"
                >重置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-plus"
                  @click="addCognizance"
                >添加</el-button>
              </el-form-item>
            </el-form>

            <div>
              <el-table
                :data="tableData"
                ref="cog"
                id="cog"
                stripe
                style="width: 100%"
                height="400px"
                @selection-change="handleLawCognizanceChange"
              >
                <el-table-column type="selection" width="25"></el-table-column>
                <el-table-column prop="bnslawNameCog" label="法规名称" align="center"></el-table-column>
                <el-table-column prop="bnsLawNoteCog" label="认定依据" align="center">
                  <el-table-column prop="itemCog" label="条" align="center" width="40"></el-table-column>
                  <el-table-column prop="clauseCog" label="款" align="center" width="40"></el-table-column>
                  <el-table-column prop="iitemCog" label="项" align="center" width="40"></el-table-column>
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
        </el-col>
        <el-col :span="13">
          <div class="graybg">
            处罚依据
            <el-form :inline="true" :model="lawPunishmentSearchForm" ref="lawPunishmentSearchForm">
              <el-form-item label="条" prop="itemPun">
                <el-input v-model="lawPunishmentSearchForm.itemPun" placeholder="条"></el-input>
              </el-form-item>
              <el-form-item label="款" prop="clausePun">
                <el-input v-model="lawPunishmentSearchForm.clausePun" placeholder="款"></el-input>
              </el-form-item>
              <el-form-item label="项" prop="iitemPun">
                <el-input v-model="lawPunishmentSearchForm.iitemPun" placeholder="项"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="getlawPunishmentListSearch"
                >查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="resetFormPun('lawPunishmentSearchForm')"
                >重置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-plus"
                  @click="addPunishment"
                >添加</el-button>
              </el-form-item>
            </el-form>
            <div>
              <el-table
                :data="tableDataPun"
                stripe
                height="400px"
                ref="pun"
                id="pun"
                @selection-change="handleLawPunishChange"
              >
                <el-table-column type="selection" width="25"></el-table-column>
                <el-table-column prop="bnslawNamePun" label="法规名称" align="center"></el-table-column>
                <el-table-column prop="bnsLawNoteCog" label="处罚依据" align="center">
                  <el-table-column prop="itemPun" label="条" align="center" width="40"></el-table-column>
                  <el-table-column prop="clausePun" label="款" align="center" width="40"></el-table-column>
                  <el-table-column prop="iitemPun" label="项" align="center" width="40"></el-table-column>
                </el-table-column>
                <el-table-column prop="highLimit" label="最高罚款" align="center"></el-table-column>
                <el-table-column prop="lawerLimit" label="罚款下限" align="center"></el-table-column>
                <el-table-column prop="upperLimit" label="罚款上限" align="center"></el-table-column>
                <el-table-column prop="cfbz" label="处罚标准" align="center"></el-table-column>
                <el-table-column prop="bnsLawNotePun" label="法规原文" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="getlawPunishmentDentail(scope.row)">修改</el-button>
                    <el-button type="text" @click="deletelawPunishment(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="paginationBox">
              <el-pagination
                @size-change="handleSizeChangePun"
                @current-change="handleCurrentChangePun"
                :current-page="currentPagePun"
                background
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next,sizes,jumper"
                :total="totalPagePun"
              ></el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 添加认定依据 -->
    <addLawCognizanceBasis ref="addLawCognizanceBasisRef" @getListEmit="getList()"></addLawCognizanceBasis>
    <!-- 添加处罚依据 -->
    <addLawPunishmentBasis ref="addLawPunishmentBasisRef" @getListEmit="getList()"></addLawPunishmentBasis>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import addLawCognizanceBasis from "./addLawCognizanceBasis";
import addLawPunishmentBasis from "./addLawPunishmentBasis";
import {
  deleteLawCognizanceByIdApi,
  deleteLawPunishmentByIdApi,
  addLawRegulationsApi,
  findLawPunishmentByPageApi,
  findLawCognizanceByPageApi,
  bindCauseLawRegulationsApi
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
      lawCognizanceForm: {
        iitemCog: "",
        clauseCog: "",
        itemCog: "",
        bnslawLawName: ""
      },
      lawPunishmentSearchForm: {
        iitemPun: "",
        clausePun: "",
        itemPun: "",
        bnslawLawName: ""
      },
      info: "",
      dialogTitle: "添加法条",
      visible: false,
      dentailVisible: false,
      strName: "", //法规标题
      cognizanceId:"",
      punishmentIds:[],
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
      let data = this.lawCognizanceForm;
      data.current = this.currentPage;
      data.size = this.pageSize;
      data.bnslawIdCog = this.btnlawId;
      let _this = this;
      findLawCognizanceByPageApi(data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error);
        }
      );
    },
    //获取处罚依据列表
    getLawPunishmentList() {
      let data = this.lawPunishmentSearchForm;
      data.current = this.currentPagePun;
      data.size = this.pageSizePun;
      data.bnslawLawName = this.btnlawId;
      let _this = this;
      findLawPunishmentByPageApi(data).then(
        res => {
          _this.tableDataPun = res.data.records;
          _this.totalPagePun = res.data.total;
        },
        error => {
          console.log(error);
        }
      );
    },
    // 查询认定依据
    getlawCognizanceListSearch() {
      this.currentPage = 1;
      this.getLawCognizanceBasisList();
    },
    // 查询处罚依据
    getlawPunishmentListSearch() {
      this.currentPagePun = 1;
      this.getLawPunishmentList();
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getLawCognizanceBasisList();
    },
    //重置
    resetFormPun(formName) {
      this.$refs[formName].resetFields();
      this.currentPagePun = 1;
      this.getLawPunishmentList();
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
      this.currentPagePun = val;
      this.getLawPunishmentList();
    },
    // 添加处罚依据
    addPunishment() {
      let data = {
        strName: this.strName
      };
      this.$refs.addLawPunishmentBasisRef.showModal(1, data);
    },
    // 添加认定依据
    addCognizance() {
      let data = {
        strName: this.strName
      };
      this.$refs.addLawCognizanceBasisRef.showModal(1, data);
    },
    //修改认定依据
    getlawRegulationsDentail(row) {
      let data = {
        row: row
      };
      this.$refs.addLawCognizanceBasisRef.showModal(0, data);
    },
    // 修改处罚依据
    getlawPunishmentDentail(row) {
      let data = {
        row: row
      };
      this.$refs.addLawPunishmentBasisRef.showModal(0, data);
    },
    // 删除认定依据
    deletelawRegulations(id) {
      let _this = this;
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteLawCognizanceByIdApi(id).then(res => {
            _this.getLawCognizanceBasisList();
            _this.$message(
              {
                type: "success",
                message: "删除成功!"
              },
              err => {
                console.log(err);
              }
            );
          });
        })
        .catch(() => {});
    },
    // 删除处罚依据
    deletelawPunishment(id) {
      let _this = this;
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteLawPunishmentByIdApi(id).then(res => {
            _this.getLawPunishmentList();
            _this.$message(
              {
                type: "success",
                message: "删除成功!"
              },
              err => {
                console.log(err);
              }
            );
          });
        })
        .catch(() => {});
    },

    showModal(data) {
      this.strName = data.strName;
      this.visible = true;
      this.getLawCognizanceBasisList();
      this.getLawPunishmentList();
    },
    getList(){
      this.getLawCognizanceBasisList();
      this.getLawPunishmentList();
    },
    bindLaws() {
      let data ={
        cognizanceId:this.cognizanceId,
        punishmentIds:this.punishmentIds,
      };
      addLawRegulationsApi(data).then(
        res => {
           if (res.code == 200) {
            this.$message({
              message: "绑定法条成功！",
              type: "success"
            });
           }
        },
        error => {
          console.log(error);
        }
      );
    },
    handleLawCognizanceChange(val) {
      debugger
      if (val.length > 1) {
        this.$refs.cog.clearSelection();
        this.$refs.cog.toggleRowSelection(val.pop());
      } else {
        this.cognizanceId = val[0].id;
      }
    },
    handleLawPunishChange(val) {
      this.punishmentIds =[];
      val.forEach(item => {
        this.punishmentIds.push(item.id);
      });
      console.log("punishmentIds",this.punishmentIds);
    },
  },
  created() {}
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss"></style>

<style lang="scss">
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
#cog thead .el-table-column--selection .cell {
  display: none;
}
</style>
