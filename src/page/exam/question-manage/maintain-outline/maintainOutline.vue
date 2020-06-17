<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="fullBox departBox">
      <div class="departOrUserTree" v-loading="treeLoading" element-loading-spinner="car-loading">
        <p>
          <i class="left-splitline"></i>大纲列表
        </p>
        <!-- 大纲列表 -->
        <outlineList
          ref="outlineList"
          :treeData="outlineData"
          :treeProps="defaultProps"
          :defaultExpandedKeys="defaultExpandedKeys"
          nodeKey="outlineId"
          @clickTreeNode="handleNodeClick"
        />
      </div>
      <div class="departTable">
        <p class="outline-title">{{selectCurrentTreeName}}</p>
        <div class="handelBtn">
          <div>子大纲列表</div>
          <div v-if="!editable">
            <el-button @click="addOutline" icon="el-icon-plus" type="primary" size="small">新增大纲</el-button>
          </div>
        </div>
        <div class="outline-table">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
          >
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column prop="outlineId" label="大纲id" v-if="false" align="center"></el-table-column>
            <el-table-column prop="outlineName" label="大纲名称" align="center"></el-table-column>
            <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column v-if="!editable" fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click.stop @click="updateOutline(scope.row)" type="text">修改</el-button>
                <el-button type="text" @click.stop @click="deleteOutline(scope.row.outlineId)">删除</el-button>
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
      <addOutline ref="addOrganRef" @getAllOrgan2="getAllOutline"></addOutline>
      <!--<updateOrgan ref="updateOrganRef" @getAllOrgan2="getAllOutline"></updateOrgan>-->
    </div>
  </div>
</template>
<script>
import addOutline from "./addMaintainOutline";
import errorPage from "./../../common/erroPage";
import outlineList from "@/components/examComponents/outlineList";
export default {
  data() {
    return {
      selectCurrentTreeName: "",
      outlineData: [],
      defaultProps: {
        children: "children",
        label: "outlineName"
      },
      tableData: [], //表格数据
      departLevel: 0, //级别
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      currentOutlineId: "", //当前organ的id
      showAddDialog: false,
      systemType: "", //系统类型：部级还是省级
      tableLoading: false,
      treeLoading: false,
      editable: false
    };
  },
  components: {
    addOutline,
    errorPage,
    outlineList
  },
  inject: ["reload"],
  created() {
    this.getSystemParams();
    this.getAllOutline("");
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //点击树事件
    handleNodeClick(data) {
      this.selectCurrentTreeName = data.outlineName;
      this.tableData = [];
      this.currentOutlineId = data.outlineId;
      this.getSelectOutline(this.currentOutlineId);
    },

    //获取大纲
    getAllOutline(outlineId) {
      let _this = this;
      _this.treeLoading = true;
      this.$store.dispatch("examOutlineTreeAllInfo").then(
        res => {
          _this.treeLoading = false;
          if (res.code === 200 && res.data && res.data.length) {
            if (outlineId == "" || outlineId == undefined) {
              _this.defaultExpandedKeys.push(res.data[0].outlineId);
              if (res.data[0].children && res.data[0].children.length > 0) {
                res.data[0].children.forEach(item => {
                  _this.defaultExpandedKeys.push(item.outlineId);
                });
              }
            } else {
              _this.defaultExpandedKeys.push(outlineId);
            }
            _this.outlineData = res.data;
            if (outlineId == "0" || outlineId == "1") {
              _this.currentOutlineId = res.data[0].outlineId;
            } else {
              _this.currentOutlineId = outlineId;
            }
            _this.$refs.outlineList.checkedNode(_this.currentOutlineId);
            _this.getSelectOutline(_this.currentOutlineId);
          }
        },
        err => {
          _this.treeLoading = false;
          console.log(err);
        }
      );
    },
    //获取选中的机构下的机构
    getSelectOutline(currentOutlineId) {
      if (!currentOutlineId) {
        this.tableLoading = false;
        return false;
      }
      this.tableLoading = true;
      this.$store
        .dispatch("examOutlineTreeByParentIdInfo", currentOutlineId)
        .then(
          res => {
            this.tableLoading = false;
            this.tableData = res.data;
          },
          err => {
            this.tableLoading = false;
            console.log(err);
          }
        );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      // this.currentPage = 1;
      this.getSelectOutline();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSelectOutline();
    },
    //新增大纲
    addOutline() {
      let parentNode = {
        parentName: this.selectCurrentTreeName,
        parentId: this.currentOutlineId
      };
      this.$refs.addOrganRef.showModal(1, parentNode);
    },
    //修改机构
    updateOutline(row) {
      let data = {
        outlineId: row.outlineId,
        outlineName: row.outlineName,
        parentName: this.selectCurrentTreeName
      };
      this.$refs.addOrganRef.showModal(2, data);
    },
    //修改根节点机构
    editSelectNode() {
      let data = {
        id: id,
        parentNode: {
          parentNodeId: this.currentOutlineId,
          parentNodeName: this.selectCurrentTreeName
        }
      };
      this.$refs.addOrganRef.showModal(2, data);
    },
    //删除机构
    deleteOutline(outlineId) {
      let _this = this;
      this.$confirm("确认删除该大纲?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm"
      })
        .then(() => {
          _this.$store.dispatch("deleteExamOutlineByIdInfo", outlineId).then(
            res => {
              _this.$message({ type: "success", message: "删除成功!" });
              _this.getAllOutline(_this.currentOutlineId);
            },
            err => {
              _this.$message({ type: "warning", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
    },
    //查询系统类型
    getSystemType() {
      this.$store.dispatch("getSystemParamInfo").then(
        res => {
          _this.systemType = res.data.records;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 获取登录用户所属部门
    getSystemParams() {
      this.$store.dispatch("getSystemParams").then(
        res => {
          if (res.code === 200) {
            // this.editable = res.data === "province";
            this.editable = false;
          }
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
<style lang="scss" scoped>
.departOrUserTree {
  overflow-y: scroll;
  .left-splitline {
    display: inline-block;
    width: 3px;
    height: 18px;
    background: rgba(69, 115, 208, 1);
    float: left;
    margin-right: 8px;
  }
}
.departTable {
  .outline-title {
    border-left: 3px solid #4573d0;
    padding-left: 10px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .outline-table {
    height: calc(100% - 130px);
  }
}
.paginationBox {
  text-align: center;
  >>> .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
}
</style>

