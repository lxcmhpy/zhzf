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
      <div>已绑定环节列表</div>
      <el-table
        :data="tableData"
        ref="linkTable"
        stripe
        style="width: 100%"
        height="500px"
        @selection-change="selectLink"
      >
        <el-table-column type="selection" align="center" :selectable="disableLink"></el-table-column>
        <el-table-column prop="linkName" label="环节名称" align="center"></el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="bindlinkSort">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  getLinkListByFlowIdNotPageApi,
  linkBindSortApi,
  findTargetLinkApi
} from "@/api/caseDeploy";
export default {
  data() {
    return {
      visible: false,
      dialogTitle: "",
      tableData: [],
      selectLinkIdList: [], //选中的环节id
      flowId: "", //流程Id
      linkId: "", //当前选中环节Id
      directionType: "" //方向标志
    };
  },
  inject: ["reload"],
  methods: {
    disableLink(row, index) {
      return row.linkId != this.linkId;
    },
    showModal(type, data) {
      this.visible = true;
      this.flowId = data.flowId;
      this.linkId = data.linkId;
      this.directionType = type;
      if (type == 0) {
        console.log("本环节数据", data);
        this.dialogTitle = "绑定下一环节";
        this.getLinkListByFlowId(data);
        // this.findTargetLink();
      } else if (type == 1) {
        console.log("本环节数据", data);
        this.dialogTitle = "绑定上一环节";
        this.getLinkListByFlowId(data);
        // this.findTargetLink();
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //查询已绑定环节列表
    getLinkListByFlowId(data) {
      let data1 = {
        // current: this.currentPage,
        // size: this.pageSize,
        flowId: data.flowId
      };
      let _this = this;
      console.log("参数", data);
      getLinkListByFlowIdNotPageApi(data).then(
        res => {
          console.log("已绑定环节列表", res);
          _this.tableData = res.data;
          //回显已经绑定的目标环节
          _this.findTargetLink();
        },
        err => {
          console.log(err);
        }
      );
    },
    selectLink(val) {
      // console.log("选中的数据",val);
      this.selectLinkIdList = val;
    },
    bindlinkSort() {
      let targetLinks = [];
      this.selectLinkIdList.forEach(item => {
        targetLinks.push(item.linkId); //目标环节id
      });
      let data = {
        flowId: this.flowId,
        linkId: this.linkId,
        targetLinks: targetLinks,
        //方向标志
        directionFlag: this.directionType
      };
      console.log("即将绑定的环节", data);
      this.$confirm("确认是否重新绑定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          linkBindSortApi(data).then(
            res => {
              console.log("绑定", res);
              this.visible = false;
              this.$message({
                type: "success",
                message: "绑定成功"
              });
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    //查询已绑定的上一环节或者下一环节，回显数据
    findTargetLink() {
      let data = {
        flowId: this.flowId,
        linkId: this.linkId,
        directionFlag: this.directionType
      };
      findTargetLinkApi(data).then(
        res => {
          console.log("已绑定的目标环节", res);
          this.tableData.forEach(row => {
            res.data.forEach(item => {
              if (item.targetLink == row.linkId) {
                this.$refs.linkTable.toggleRowSelection(row);
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
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
