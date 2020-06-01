<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    append-to-body
  >
    <div class="tablePart">
      <div>案件类型列表</div>
      <el-table :data="tableData" stripe ref="caseTypeTable" style="width: 100%" height="500px" @selection-change="selectLink">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="typeName" label="案件类型名称" align="center"></el-table-column>
        <el-table-column prop="typeName" label="程序类型" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.programType == 0 ? '一般程序': '简易程序'}}</span>
          </span>
        </el-table-column>         
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="bindCaseType">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { queryCaseTypeApi,organLawCateBindCaseTypeApi,findBindTypeByOrganCateIdApi} from "@/api/caseDeploy";
export default {
  data() {
    return {
      visible: false,
      dialogTitle: "绑定案件类型",
      tableData:[],
      selectCaseTypeIdList:[],//选中的案件类型id
      organCateId:"" //机构Id
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
        console.log("机构绑定业务领域ID",data);
      this.visible = true;
      this.organCateId = data.organBindCate;
      //获取案件类型
      this.queryCaseType();      
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取未绑定的业务领域列表
    queryCaseType() {
      let data = {

      };
      let _this = this;
      queryCaseTypeApi(data).then(
        res => {
          console.log("案件类型列表", res);
          _this.tableData = res.data;
          _this.findCaseType();
        },
        err => {
          console.log(err);
        }
      );
    },
    selectLink(val){
        console.log("选中的数据",val);
        this.selectCaseTypeIdList = val;
        
    },
    bindCaseType(){
        let _this = this;
        let caseTypeIds = [];
        _this.selectCaseTypeIdList.forEach(item => {
            caseTypeIds.push(item.id);
        });
       console.log("已选中的案件类型",caseTypeIds);
       let data = {
           organCateId: this.organCateId,
           caseTypeIds: caseTypeIds
      };
      console.log("即将绑定的数据", data);
      this.$confirm("确认是否重新绑定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          organLawCateBindCaseTypeApi(data).then(
            res => {
              console.log("绑定", res);
              this.visible = false;
              this.$message({
                type: "success",
                message: "绑定成功"
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
    //查询已绑定的案件类型，回显数据
    findCaseType() {
      let data = {
        organCateId: this.organCateId,
      };
      findBindTypeByOrganCateIdApi(data).then(
        res => {
          console.log("已绑定的案件类型", res);
          this.tableData.forEach(row => {
            res.data.forEach(item => {
              if (item.caseTypeId == row.id) {
                this.$refs.caseTypeTable.toggleRowSelection(row);
              }
            });
          });
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
</style>
