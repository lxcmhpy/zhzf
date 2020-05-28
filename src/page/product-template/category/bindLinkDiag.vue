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
      <div>未绑定环节列表</div>
      <el-table :data="tableData" stripe style="width: 100%" height="500px" @selection-change="selectLink">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="linkName" label="环节名称" align="center"></el-table-column>  
        <el-table-column prop="order" label="环节顺序" align="center">
            <template slot-scope="scope">
                <el-input v-model="scope.row.order"></el-input>
            </template>
        </el-table-column>       
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="bindLink">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getLinkNotInFlowApi ,flowBindLinkApi} from "@/api/caseDeploy";
export default {
  data() {
    return {
      visible: false,
      dialogTitle: "新增环节",
      tableData:[],
      selectLinkIdList:[],//选中的环节id
      flowId:"" //流程Id
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      //获取未绑定的环节
      this.getLinkNotInFlow(data);
      this.flowId = data.flowId;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //新增 修改
    addOrEditFlow(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (_this.handelType) {
          //修改
          _this.addFlowForm.id = _this.editFlowId;
          addOrEditFlowApi(_this.addFlowForm).then(
            res => {
              console.log("流程", res);
              _this.$message({
                type: "success",
                message: "修改成功"
              });
              _this.visible = false;
              _this.reload();
            },
            err => {
              console.log(err);
            }
          );
        } else {
          addOrEditFlowApi(_this.addFlowForm).then(
            res => {
              console.log("流程", res);
              _this.$message({
                type: "success",
                message: "添加成功!"
              });
              _this.visible = false;
              _this.reload();
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    },
    //获取未绑定的环节列表
    getLinkNotInFlow(data) {
      let data1 = {
        flowId: data.flowId
      };
      let _this = this;
      getLinkNotInFlowApi(data1).then(
        res => {
          console.log("未绑定环节列表", res);
          _this.tableData = res.data;
          _this.tableData.forEach(item => {
        //    item.sort = "";
            item.$set('order','')
        });
        console.log("111",this.tableData);
        },
        err => {
          console.log(err);
        }
      );
    },
    selectLink(val){
        console.log("选中的数据",val);
        this.selectLinkIdList = val;
        
    },
    bindLink(){
        let _this = this;
        let linkList = [];
        _this.selectLinkIdList.forEach(item => {
            let date = {
                flowId: this.flowId,
                linkName: item.linkName, //小环节名称
                linkId: item.id, //小环节id
                linkSort: item.order,  //环节顺序
                mainLinkId: item.mainLinkId,    //所属大环节id
                mainLinkName: item.mainLinkName  //大环节名称
            }
        linkList.push(date);
        });
       console.log("已选中的环节",linkList);
       flowBindLinkApi(linkList).then(
        res => {
          console.log("未绑定环节列表", res);
          _this.visible = false;
          _this.reload();
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
