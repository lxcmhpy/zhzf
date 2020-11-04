<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="60%"
    append-to-body
  >
    <el-row :gutter="20"> 
      <el-col :span="24">
        <div class="graybg">
          <div>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              height="550px"
              @selection-change="handleLawCognizanceChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
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
          <!-- <div class="paginationBox">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              background
              :page-sizes="[10, 20, 30, 40]"
              layout="prev, pager, next,sizes,jumper"
              :total="totalPage1"
            ></el-pagination>
          </div> -->
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer" align="center">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="removeBind">解 绑</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getlawRegulationsListByActionidApi,unbindCauseLawRegulationsApi
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      datas: [],
    //   tableData1: [],
    //   currentPage: 1, //当前页
    //   pageSize: 10, //pagesize
    //   totalPage: 0, //总页数
      bnslawSearchForm: {
        strName: "",
        strNumber: ""
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
    
  },
  methods: {
    showModal(data) {
      console.log("违法行为", data);
      this.visible = true;
      this.caseCauseId = data.id;
      this.dialogTitle = "详情";
      this.getlawRegulationsListByActionid(this.caseCauseId);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["bnslawSearchForm"].resetFields();
      this.visible = false;
    }, 
    //根据违法行为ID查询绑定的法条
    getlawRegulationsListByActionid(data) {
      console.log("111", data);
      let _this = this;
      getlawRegulationsListByActionidApi(data).then(
        res => {
          console.log("res1", res);
          _this.tableData = res.data;
        //   _this.totalPage1 = res.data.total;
        },
        error => {
          console.log(error);
        }
      );
    },
    handleLawCognizanceChange(val) {
      let _this = this;
      let arr = [];
      val.forEach(item => {
        arr.push({
          causeId:this.caseCauseId,
          regulaId: item.id
        });
      });
      this.datas = JSON.stringify(arr);
    },
    removeBind() {
      // let data = {
      //   causeId: this.caseCauseId,
      //   regulaId: this.bnslawIdPunBind
      // };
      console.log("需要解绑的数据",this.datas);
      unbindCauseLawRegulationsApi(this.datas).then(
        res => {
          this.$message({
            type: "success",
            message: "解绑成功!"
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
<style lang="scss" src="@/assets/css/systemManage.scss"></style>
<style lang="scss">
/* @import "@/assets/css/systemManage.scss"; */
.graybg {
  padding: 10px;
  background: #fcfcfc;
  border: 1px solid #eee;
  // box-sizing: border-box;
}
</style>