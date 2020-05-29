<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
  >
    <el-button type="primary" size="medium" icon="el-icon-plus" @click="addHylb()">新增</el-button>

    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="300px">
        <el-table-column prop="name" label="执法门类" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editHylb(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteHylb(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
    </span>
    <addOrEditHylb ref="addOrEditHylbRef" @getDetail="showModal"></addOrEditHylb>
  </el-dialog>
  
</template>
<script>
import { getLawCategoryListApi,deleteCategoryByIdApi } from "@/api/caseDeploy";
import addOrEditHylb from "./addOrEditHylb";
export default {
  data() {
    return {
      dialogTitle: "行业类别", //弹出框title
      visible: false, 
      tableData:[],
      pid:"" //业务领域id
    };
  },
  components: {
    addOrEditHylb
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      console.log("pid",data);
      this.visible = true;
      this.pid = data;
      this.getLawCategoryList();
    },
    getLawCategoryList(){
      let data1 = {
        pid: this.pid
      };
      let _this = this;
      getLawCategoryListApi(data1).then(
        res => {
          console.log("行业类别列表", res);
          _this.tableData = res.data;
          // _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      // this.$refs["addZfmlForm"].resetFields();
      //this.errorOrganName = false;
    },
    //新增行业类别
    addHylb(){
      let data = {
        leng: this.tableData.length,
        pid: this.pid
      };
      this.$refs.addOrEditHylbRef.showModal(0, data);
    },
    //修改行业类别
    editHylb(row){
      let newRow = {
        item : JSON.parse(JSON.stringify(row)),
        pid: this.pid
      };
      this.$refs.addOrEditHylbRef.showModal(2, newRow);
    },
    //删除行业类别
    deleteHylb(id){
      this.$confirm("确认删除该业务领域?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCategoryByIdApi(id).then(
            res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getLawCategoryList();
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    }
  },
  created() {

  }
};
</script>