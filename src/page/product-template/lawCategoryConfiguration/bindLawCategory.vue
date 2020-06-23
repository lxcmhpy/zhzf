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
      <div>未绑定业务领域列表</div>
      <el-table :data="tableData" stripe style="width: 100%" height="500px" @selection-change="selectLink">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="name" label="业务领域名称" align="center"></el-table-column>         
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="bindLawCategory">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { queryNotBindLawCateByOrganIdApi,organBindLawCateApi} from "@/api/caseDeploy";
export default {
  data() {
    return {
      visible: false,
      dialogTitle: "绑定业务领域",
      tableData:[],
      selectCateIdList:[],//选中的环节id
      organId:"" //机构Id
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
        console.log("机构ID",data);
      this.visible = true;
      //获取未绑定的环节
      this.organId = data.organId;
      this.getNotBindLawCateByOrganId();
      
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    
    //获取未绑定的业务领域列表
    getNotBindLawCateByOrganId() {
      let data = {
        organId: this.organId
      };
      let _this = this;
      queryNotBindLawCateByOrganIdApi(data).then(
        res => {
          console.log("未绑定业务领域列表", res);
          _this.tableData = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    selectLink(val){
        console.log("选中的数据",val);
        this.selectCateIdList = val;
        
    },
    bindLawCategory(){
        let _this = this;
        let cateIds = [];
        _this.selectCateIdList.forEach(item => {
            cateIds.push(item.id);
        });
       console.log("已选中的业务领域",cateIds);
       let data = {
           organId: this.organId,
           cateIds: cateIds
      };
      console.log("即将绑定的数据", data);
      this.$confirm("确认是否绑定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          organBindLawCateApi(data).then(
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
    }
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
