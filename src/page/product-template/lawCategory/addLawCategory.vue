<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="80%"
    height="70%"
  >
    <!--机构列表-->
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
          ref="tree"
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
    <!--执法门类列表-->
    <div class="zfml">
      <p>执法门类</p>
      <div class="search">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-delete">删除</el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addZfml">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="treeBox">
        <el-tree
          class="filter-tree"
          :data="organData"
          :props="defaultProps"
          node-key="id"
          :filter-node-method="filterNode"
          :default-expanded-keys="defaultExpandedKeys"
          ref="tree"
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
    <!--案件类型列表-->
    <div class="caseType">
      <p>案件类型</p>
      <div class="search">
        <el-form :inline="true" >
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-plus">绑定</el-button>
          </el-form-item>
        </el-form>
        <div class="tablePart">
          <el-table :data="tableData" stripe style="width: 100%" height="100%">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="cateName" label="序号" align="center"></el-table-column>
            <el-table-column prop="organTypeName" label="案件类型" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <addZfml ref="addzfmlRef"></addZfml>
  </el-dialog>
</template>
<script>
import addZfml from "./addZfml";
export default {
  data() {
    return {
      filterText: "",
      selectCurrentTreeName: "",
      organData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      defaultExpandedKeys: [], //默认展开的key
      visible: false,
        addLawCateOrganType: {
           name: "",
           description: ""
        },
      rules: {
        // name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorOrganName: false, //添加organname时的验证
      handelType: 0, //添加 0  修改2
      editRoleId: "",
      tableData: [], //表格数据
    };
  },
  components: {
    addZfml
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      console.log(type);
      if (type == 0) {
        this.dialogTitle = "执法门类配置（新增）";

        // this.parentNode = data;
        // this.addOrganForm.pidName = data.parentNodeName;
        // this.isDisabled = false;
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改角色";
        this.addRoleForm.name = data.name;
        this.addRoleForm.description = data.description;
        this.editRoleId = data.id;
        // this.organId = data.id;
        // this.parentNode = data.parentNode;
        // this.getOrganDetail(data.id);
        // this.isDisabled = false;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    //   this.$refs["addRoleForm"].resetFields();
      //this.errorOrganName = false;
    },
    //获取机构
    getAllOrgan(organId) {
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
        //   _this.getSelectOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    addZfml() {
      this.$refs.addzfmlRef.showModal(0, "");
    }
  },
  created() {
    this.getAllOrgan("root");
  }
};
</script>
