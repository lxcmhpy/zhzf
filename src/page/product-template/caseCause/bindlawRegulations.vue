<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="90%"
    append-to-body
  >
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="graybg">
          <!-- <div class="search"  style="height:50px;"> -->
          <el-form :inline="true" :model="bnslawSearchForm" ref="bnslawSearchForm">
            <el-form-item label="法规名称" prop="strName">
              <el-input v-model="bnslawSearchForm.strName" placeholder="输入法规名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="搜索"
                icon="iconfont law-sousuo"
                @click="getBtnlawListSearch(1)"
              ></el-button>
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="重置"
                icon="iconfont law-zhongzhi"
                @click="resetForm('bnslawSearchForm')"
              ></el-button>
            </el-form-item>
          </el-form>
          <!-- </div> -->
          <div class="tablePart">
            <el-table
              :data="tableData"
              stripe
              style="width: 100%;height:550px;"
              @row-click="getlawRegulationsList"
            >
              <el-table-column prop="strName" label="法规标题" align="left"></el-table-column>
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
      <el-col :span="16">
        <div class="graybg">
          <el-form :inline="true" :model="bnslawSearchForm" ref="bnslawSearchForm">
            <el-form-item label="条" prop="item">
              <el-input v-model="bnslawSearchForm.item" placeholder="条" style="width:70px;"></el-input>
            </el-form-item>
            <el-form-item label="款" prop="clause">
              <el-input v-model="bnslawSearchForm.clause" placeholder="条" style="width:70px;"></el-input>
            </el-form-item>
            <el-form-item label="项" prop="iitem">
              <el-input v-model="bnslawSearchForm.iitem" placeholder="条" style="width:70px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="搜索"
                icon="iconfont law-sousuo"
                @click="getlawRegulationsList1"
              ></el-button>
              <el-button
                size="medium"
                class="commonBtn searchBtn"
                title="重置"
                icon="iconfont law-zhongzhi"
                @click="resetForm('bnslawSearchForm')"
              ></el-button>
            </el-form-item>
          </el-form>
          <div>
            <el-table
              :data="tableData1"
              stripe
              style="width: 100%"
              height="550px"
              @selection-change="handleLawCognizanceChange"
            >
              <el-table-column type="selection" width="40" max=1></el-table-column>
              <el-table-column prop="bnslawNameCog" label="法规名称" align="center"></el-table-column>
              <el-table-column prop="bnsLawNoteCog" label="认定依据" align="center" style="width:50px">
                <el-table-column prop="itemCog" label="条" align="center"></el-table-column>
                <el-table-column prop="clauseCog" label="款" align="center"></el-table-column>
                <el-table-column prop="iitemCog" label="项" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="bnslawNamePun" label="法规名称" align="center"></el-table-column>
              <el-table-column prop="bnslawIdPun" label="处罚依据" align="center">
                <el-table-column prop="itemPun" label="条" align="center"></el-table-column>
                <el-table-column prop="clausePun" label="款" align="center"></el-table-column>
                <el-table-column prop="iitemPun" label="项" align="center"></el-table-column>
              </el-table-column>
              <el-table-column prop="highLimit" label="最高罚款" align="center"></el-table-column>
              <el-table-column prop="lawerLimit" label="罚款下限" align="center"></el-table-column>
              <el-table-column prop="upperLimit" label="罚款上限" align="center"></el-table-column>
              <el-table-column prop="cfbz" label="处罚标准" align="center" show-overflow-tooltip="true"></el-table-column>
              <el-table-column
                prop="bnsLawNotePun"
                label="法规原文"
                align="center"
                show-overflow-tooltip="true"
              ></el-table-column>
            </el-table>
          </div>
          <div class="paginationBox">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              background
              :page-sizes="[10, 20, 30, 40]"
              layout="prev, pager, next,sizes,jumper"
              :total="totalPage1"
            ></el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer" align="center">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="bind">绑 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getBnsLawListApi,
  getlawRegulationsListApi,
  bindCauseLawRegulationsApi
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      tableData1: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      currentPage1: 1, //当前页
      // pageSize1: 10, //pagesize
      totalPage1: 0, //总页数
      bnslawSearchForm: {
        // strName: "",
        // strNumber: ""
      },
      visible: false,
      dialogTitle: "", //弹出框title
      // errorName: false ,//添加name时的验证
      caseCauseId: "", //违法行为Id
      bnslawIdPun: "", //处罚依据Id
      bnslawIdPunBind: ""
    };
  },
  inject: ["reload"],
  created() {
    this.getBtnlawList();
  },
  methods: {
    showModal(data) {
      console.log("违法行为", data);
      this.visible = true;
      this.caseCauseId = data.causeId;
      this.dialogTitle = "绑定法条";
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["bnslawSearchForm"].resetFields();
      this.visible = false;
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //获取法规列表
    getBtnlawList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        strName: this.bnslawSearchForm.strName
      };
      let _this = this;
      getBnsLawListApi(data).then(
        res => {
          console.log("res", res), (_this.tableData = res.data.records);
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error);
        }
      );
    },
    // 查询
    getBtnlawListSearch() {
      this.currentPage = 1;
      this.getBtnlawList();
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getBtnlawList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getBtnlawList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBtnlawList();
    },

    //更改每页显示的条数
    handleSizeChange1(val) {
      this.pageSize = val;
      this.currentPage1 = 1;
      this.getlawRegulationsList1();
    },
    //更换页码
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getlawRegulationsList1();
    },
    getlawRegulationsList(row) {
      console.log("id", row);
      this.bnslawIdPun = row.id;
      this.getlawRegulationsList1();
    },
    getlawRegulationsList1() {
      let data = {
        current: this.currentPage1,
        size: this.pageSize,
        bnslawIdPun: this.bnslawIdPun,
        itemCog: this.bnslawSearchForm.item,
        clauseCog: this.bnslawSearchForm.clause,
        iitemCog: this.bnslawSearchForm.iitem,
        // itemPun: this.bnslawSearchForm.item,
        // clausePun: this.bnslawSearchForm.clause,
        // iitemPun: this.bnslawSearchForm.iitem
      };
      console.log("111", data);
      let _this = this;
      getlawRegulationsListApi(data).then(
        res => {
          console.log("res1", res);
          _this.tableData1 = res.data.records;
          _this.totalPage1 = res.data.total;
        },
        error => {
          console.log(error);
        }
      );
    },
    handleLawCognizanceChange(val) {
      console.log("选中的数据", val);
      val.forEach(item => {
        this.bnslawIdPunBind = item.id;
      });
    },
    bind() {
      let data = {
        causeId: this.caseCauseId,
        regulaId: this.bnslawIdPunBind
      };
      console.log("1111",data);
      bindCauseLawRegulationsApi(data).then(
        res => {
          console.log("123", res);
          this.$message({
            type: "success",
            message: "绑定成功!"
          });
          this.visible = false;
          this.reload();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
.graybg {
  padding: 10px;
  background: #fcfcfc;
  border: 1px solid #eee;
  // box-sizing: border-box;
}
</style>