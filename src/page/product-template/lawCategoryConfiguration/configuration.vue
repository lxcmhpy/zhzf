<template>
<div class="com_searchAndpageBoxPadding">
  <div class="fullBox departBox">
    <div class="departOrUserTree">
      <p>机构列表</p>
      <div class="searchDepartBox">
        <el-input placeholder="输入机构名" v-model="filterText">
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="treeBox">
        <el-tree
          class="filter-tree"
          :data="organData"
          :props="defaultProps"
          node-key="id"
          :filter-node-method="filterNode"
          :default-expanded-keys="defaultExpandedKeys"
          @node-expand="nodeExpand"
          ref="tree"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <span>
              <i
                :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"
              ></i>
              <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="departTable">
      <p>{{selectCurrentTreeName}}</p>
      <div class="handelBtn">
        <div>已绑定业务领域列表</div>
        <div>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="bindLawCategory">绑定业务领域</el-button>
        </div>
      </div>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        height="70%"
      >
        <!-- <el-table-column prop="code" label="部门编码" align="center"></el-table-column> -->
        <el-table-column prop="cateName" label="业务领域名称" align="center"></el-table-column>
        <!-- <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column> -->
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">            
            <el-button type="text" @click="deleteLawCate(scope.row.id)">删除</el-button>
            <el-button type="text" @click="bindCaseType(scope.row)">绑定案件类型</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- </div> -->
      <!-- <div class="paginationBox" v-if="tableData.length > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div> -->
    </div>

    <bindLawCategory ref="bindLawCategoryRef"></bindLawCategory>
    <bindCaseType ref="bindCaseTypeRef"></bindCaseType>
  </div>
</div>
</template>
<script>
import bindLawCategory from "./bindLawCategory";
import bindCaseType from "./bindCaseType";
import { queryLawCateByOrganIdApi,deleteOrganCategoryByIdApi} from "@/api/caseDeploy";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      filterText: "",
      selectCurrentTreeName: "",
      organData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [], //表格数据
      departLevel: 0, //级别
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      currentOrganId: "", //当前organ的id
      departmentLength:0, //部门个数
    };
  },
  components: {
     bindLawCategory,
     bindCaseType
  },
  inject: ["reload"],
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //点击树事件
    handleNodeClick(data) {
      console.log(data);
      this.selectCurrentTreeName = data.label;
      this.tableData = [];
      this.currentOrganId = data.id;
      this.getLawCategoryByOrganId(this.currentOrganId);
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
    },

    //获取机构
    getAllOrgan(organId) {
        console.log("123");
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.defaultExpandedKeys.push(res.data[0].id);
          _this.selectCurrentTreeName = _this.selectCurrentTreeName
            ? _this.selectCurrentTreeName
            : res.data[0].label;
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              _this.defaultExpandedKeys.push(item.id);
            });
          }
          _this.organData = res.data;
          console.log(_this.defaultExpandedKeys);
          console.log(_this.organData);
          if (organId == "root") {
            _this.currentOrganId = res.data[0].id;
          } else {
            _this.currentOrganId = organId;
          }
          _this.getLawCategoryByOrganId();
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取选中的机构已绑定的业务领域
    getLawCategoryByOrganId() {
      let data = {
        organId: this.currentOrganId,
        // current: this.currentPage,
        // size: this.pageSize
      };
      let _this = this
      queryLawCateByOrganIdApi(data).then(
        res => {
          console.log('已绑定的业务领域',res);
          _this.tableData = res.data;
          // _this.totalPage = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    //绑定业务领域
    bindLawCategory(){
      let data={
        organId: this.currentOrganId,
      };
      this.$refs.bindLawCategoryRef.showModal(data);
    },
    //删除已经绑定的业务领域
    deleteLawCate(id) {
      let _this = this
      this.$confirm("确认删除该业务领域?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteOrganCategoryByIdApi(id).then(
            res => {
              _this.getAllOrgan(_this.currentOrganId);
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    //绑定案件类型
    bindCaseType(row){
      let data = {
        organBindCate: row.id
      };
      this.$refs.bindCaseTypeRef.showModal(data);
    },
    
  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
    this.getAllOrgan("root");
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
