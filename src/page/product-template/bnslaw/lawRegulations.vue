<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="lawRegulationsBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="lawRegulationsSearchForm" ref="lawRegulationsSearchForm">
            <el-form-item label="法规名称" prop='bnslawLawName'>
              <el-input v-model="lawRegulationsSearchForm.bnslawLawName" placeholder="输入法规名称"></el-input>
            </el-form-item>
            <el-form-item label="条" prop="itemCog">
              <el-input v-model="lawRegulationsSearchForm.itemCog" placeholder="条"></el-input>
            </el-form-item>
            <el-form-item label="款" prop="clauseCog">
              <el-input v-model="lawRegulationsSearchForm.clauseCog" placeholder="款"></el-input>
            </el-form-item>
            <el-form-item label="项" prop="iitemCog">
              <el-input v-model="lawRegulationsSearchForm.iitemCog" placeholder="项"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getlawRegulationsListSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="resetForm('lawRegulationsSearchForm')">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">添加(法条)</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="bnslawNameCog" label="法规名称" align="center"></el-table-column>
          <el-table-column prop="bnsLawNoteCog" label="认定依据" align="center">
            <el-table-column prop="itemCog" label="条" align="center" width="50"></el-table-column>
            <el-table-column prop="clauseCog" label="款" align="center" width="50"></el-table-column>
            <el-table-column prop="iitemCog" label="项" align="center" width="50"></el-table-column>
          </el-table-column>
          <el-table-column prop="bnslawNamePun" label="法规名称" align="center"></el-table-column>
          <el-table-column prop="bnsLawNoteCog" label="处罚依据" align="center">
            <el-table-column prop="itemPun" label="条" align="center" width="50"></el-table-column>
            <el-table-column prop="clausePun" label="款" align="center" width="50"></el-table-column>
            <el-table-column prop="iitemPun" label="项" align="center" width="50"></el-table-column>
          </el-table-column>
          <el-table-column prop="highLimit" label="最高罚款" align="center"></el-table-column>
          <el-table-column prop="lawerLimit" label="罚款下限" align="center"></el-table-column>
          <el-table-column prop="upperLimit" label="罚款上限" align="center"></el-table-column>
          <el-table-column prop="cfbz" label="处罚标准" align="center"></el-table-column>
          <el-table-column prop="bnsLawNotePun" label="法规原文" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="getlawRegulationsDentail(scope.row)">详情</el-button> -->
              <el-button type="text" @click="deletelawRegulations(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
    </div>
    <addLawRegulations ref="addLawRegulationsRef"></addLawRegulations>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import addLawCognizanceBasis from "./addLawCognizanceBasis";
import addLawPunishmentBasis from "./addLawPunishmentBasis";
import addLawRegulations from "./addLawRegulations";
import {
  getlawRegulationsListApi, deleteLawRegulationsApi, addLawRegulationsApi
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
        iitemCog: '',
        clauseCog: '',
        itemCog: '',
        bnslawLawName: ''
      },
      info: "",
      addLawRegulationsForm: {

      },
      dialogTitle: '添加法条',
      visible: false,
      dentailVisible: false,
      //法规标题
      strName:this.$route.params.strName,
    };
  },
  components: {
    addLawRegulations
  },
  inject: ["reload"],
  computed: {
    ...mapGetters(["btnlawId"])
  },
  methods: {
    //获取法条列表
    getlawRegulationsList() {
      let data = this.lawRegulationsSearchForm;
      data.current = this.currentPage;
      data.size = this.pageSize;
      data.bnslawIdPun = this.btnlawId;
      let _this = this;
      getlawRegulationsListApi(data).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error)
        }
      );
    },
    // 查询法条
    getlawRegulationsListSearch() {
      this.currentPage = 1;
      this.getlawRegulationsList()
    },
    //重置法条
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getlawRegulationsList()
    },
    //删除法条
    deletelawRegulations(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLawRegulationsApi(id).then(
          res => {
            console.log('类型', res);
            if (res.code == 200) {
             this.$message({ message: '删除成功',type: 'success'});
              this.getlawRegulationsList()
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
    //添加法条
    add() {
      let data={
        strName: this.strName
      }
      this.$refs.addLawRegulationsRef.showModal(data);
    },
    addlawRegulations() {
      let data = this.addBtnlawForm;
      let _this = this;
      console.log(typeof (this.addBtnlawForm.status))
      addLawRegulationsApi(data).then(
        res => {
          console.log("添加法条", res);
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
    //更改每页显示的条数(法条)
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getlawRegulationsList();
    },
    //更换页码（法条）
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlawRegulationsList();
    },
  },
  created() {
    this.getlawRegulationsList();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
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
</style>
