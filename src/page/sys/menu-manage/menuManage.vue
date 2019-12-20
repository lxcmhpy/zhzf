<template>
  <div class="fullBox" id="roleBox">
    <div class="leftTitle">
      部门列表
    </div>
    <div class="handlePart">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="addItem">新增部门</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="title" label="名称" align="center"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center">
        <!--<template slot-scope="scope">-->
        <!--<i></i>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <div>
            {{scope.row.type === -1?'目录':scope.row.type === 0?'菜单':'按钮'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="parentId" label="上级菜单" align="center"></el-table-column>
      <el-table-column prop="path" label="菜单URL" align="center"></el-table-column>
      <el-table-column prop="component" label="菜单组件" align="center"></el-table-column>
      <el-table-column prop="permTypes" label="授权标识" align="center"></el-table-column>
      <el-table-column prop="sortOrder" label="排序" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="editItem(scope.row)" type="text">编辑</el-button>
          <el-button type="text" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        :page-sizes="[10, 20, 30, 40]"
        layout="prev, pager, next,sizes,jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="isShowDialog"
      :close-on-click-modal="false"
      width="35%">
      <el-form :model="addItemObj" :rules="rules" ref="addItemObj" class="errorTipForm"
               label-width="100px">
        <div class="item">
          <el-form-item label="菜单类型" prop="name">
            <template>
              <el-radio v-for="(item,index) in typeList" v-model="addItemObj.type" :label="item.id">{{item.name}}
              </el-radio>
            </template>
            <el-input style="display: none" v-model="addItemObj.type"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="菜单图标" prop="icon">
            <el-input ref="icon" v-model="addItemObj.icon"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="菜单名称" prop="name">
            <el-input ref="name" v-model="addItemObj.name"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="菜单标题" prop="title">
            <el-input ref="title" v-model="addItemObj.title"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="上级菜单" prop="parentName">
            <el-input ref="parentName" v-model="addItemObj.parentName"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="页面权限类型" prop="permTypes">
            <el-input ref="permTypes" v-model="addItemObj.permTypes"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="按钮权限类型" prop="buttonType">
            <el-select v-model="addItemObj.buttonType" placeholder="请选择">
              <el-option
                v-for="item in buttonTypeList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-input ref="buttonType" style="display: none" v-model="addItemObj.buttonType"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="菜单URL" prop="path">
            <el-input ref="path" v-model="addItemObj.path"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="排序编号" prop="sortOrder">
            <el-input v-model="addItemObj.sortOrder"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="isShowDialog = false">取 消</el-button>
      <el-button type="primary" @click="sureAdd">确 定</el-button>
    </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    watch: {},
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        dialogTitle: '',
        isShowDialog: false,
        typeList: [{id: -1, name: '目录'}, {id: 0, name: '菜单'}, {id: 1, name: '按钮'}],
        buttonTypeList: ['add', 'delete', 'enable', 'other', 'edit'],
        addItemObj: {
          permTypes: '',
          id: '',
          parentId: '',
          parentName: '',
          name: '',
          showAlways: '',
          type: '',
          title: '',
          path: '',
          component: '',
          icon: '',
          url: '',
          buttonType: ''
        },
        rules: {}
      };
    },
    components: {},
    inject: ["reload"],
    methods: {
      searchTable() {
        this.$store.dispatch("getTreePermission").then(
          res => {
            this.tableData = res.data;
          },
          err => {
            console.log(err);
          }
        );
      },
      addItem() {
        this.dialogTitle = '新增'
        this.isShowDialog = true
      },
      sureAdd() {

      },
      editItem() {

      },
      deleteItem() {

      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
    },
    mounted() {
    },
    created() {
      this.searchTable()
    }
  };
</script>
<style lang="less">
  @import "../../../css/systemManage.less";
</style>
