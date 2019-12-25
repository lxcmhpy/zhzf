<template>
  <div class="searchAndpageBox" id="menuBox">
    <!-- <div class="handlePart">菜单列表</div>
    <div class="rightTitle">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="addItem">新增菜单</el-button>
    </div>-->
    <div class="handlePart">
      <div class="leftTitle">菜单列表</div>
      <div class="rightTitle">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="addItem">新增菜单</el-button>
      </div>
    </div>
    <div class="tablePart">
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        @row-click="tableAdd"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        height="100%"
      >
        <el-table-column prop="title" label="名称" align="center"></el-table-column>
        <el-table-column prop="icon" label="图标" align="center">
          <!--<template slot-scope="scope">-->
          <!--<i></i>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.type === -1?'目录':scope.row.type === 0?'菜单':'按钮'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="parentId" label="上级菜单" align="center" :formatter="searchNameById"></el-table-column>
        <el-table-column prop="path" label="菜单URL" align="center"></el-table-column>
        <el-table-column prop="component" label="菜单组件" align="center"></el-table-column>
        <el-table-column prop="permTypes" label="授权标识" align="center"></el-table-column>
        <el-table-column prop="sortOrder" label="排序" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click.stop="editItem(scope.row)" type="text">编辑</el-button>
            <el-button type="text" @click.stop="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      width="35%"
    >
      <el-form
        :model="addItemObj"
        :rules="rules"
        ref="addItemObj"
        class="errorTipForm"
        label-width="100px"
      >
        <div class="item">
          <el-form-item label="菜单类型" prop="type">
            <template>
              <el-radio
                v-for="item in typeList"
                v-model="addItemObj.type"
                :label="item.id"
                :key="item.id"
              >{{item.name}}
              </el-radio>
            </template>
            <el-input ref="type" style="display: none" v-model="addItemObj.type"></el-input>
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
        <div class="item" v-if="addItemObj.type !== -1">
          <el-form-item label="上级菜单" prop="parentId">
            <elSelectTree
              ref="elSelectTreeObj"
              :options="tableData"
              :accordion="true"
              :props="props"
              @getValue="hindleChanged"
            ></elSelectTree>
            <el-input style="display: none" ref="parentId" v-model="addItemObj.parentId"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="页面权限类型" prop="permTypes">
            <el-input ref="permTypes" v-model="addItemObj.permTypes"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="按钮权限类型" prop="buttonType">
            <el-select v-model="addItemObj.buttonType" multiple :multiple-limit="0" @change="changeButtonType"
                       placeholder="请选择">
              <el-option v-for="item in buttonTypeList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-input ref="buttonType" style="display: none" v-model="addItemObj.buttonType.length"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="菜单URL" prop="path">
            <el-input ref="path" v-model="addItemObj.path"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="前端组件" prop="component">
            <el-input ref="component" v-model="addItemObj.component"></el-input>
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
  import elSelectTree from '../../../components/elSelectTree/elSelectTree'

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
          pLevel: '',
          permTypes: '',
          id: '',
          parentId: '',
          name: '',
          showAlways: '',
          type: '',
          title: '',
          path: '',
          component: '',
          icon: '',
          url: '',
          buttonType: [],
          sortOrder: ''
        },
        rules: {
          title: [{required: true, message: "请输入菜单标题", trigger: "blur"}],
          name: [{required: true, message: "请输入菜单名称", trigger: "blur"}],
          type: [{required: true, message: "请选择菜单类型", trigger: "blur"}],
        },
        props: {
          label: "title",
          value: "id"
        },
        parentData: []
      };
    },
    components: {},
    inject: ["reload"],
    methods: {
      searchTable() {
        this.$store.dispatch("getTreePermission").then(
          res => {
            console.log(res);
            this.tableData = res.data;
            this.total = res.data.length
          },
          err => {
            console.log(err);
          }
        );
      },
      tableAdd(row) {
        this.dialogTitle = '新增'
        this.isShowDialog = true
        this.addItemObj.parentId = row.id
        setTimeout(() => {
          this.$refs.elSelectTreeObj.valueTitle = row.title
          this.$refs.elSelectTreeObj.valueId = row.id
        })
      },
      addItem() {
        this.dialogTitle = '新增'
        this.isShowDialog = true
        setTimeout(() => {
          this.$refs.elSelectTreeObj.clearHandle()
        })
      },
      editItem(row) {
        console.log('row',row);
        let that = this
        that.addItemObj = {
          pLevel: row.pLevel,
          permTypes: row.permTypes,
          id: row.id,
          parentId: row.parentId,
          name: row.name,
          showAlways: row.showAlways,
          type: row.type,
          title: row.title,
          path: row.path,
          component: row.component,
          icon: row.icon,
          url: row.url,
          buttonType: row.buttonType.length > 0 ? row.buttonType.split(',') : [],
          sortOrder: row.sortOrder
        }
        that.dialogTitle = '修改'
        that.isShowDialog = true
        setTimeout(() => {
          let _title = that.searchNameById(row, '', '', '', that.tableData) ? that.searchNameById(row, '', '', '', that.tableData) : ''
          that.$refs.elSelectTreeObj.valueTitle = _title
          that.$refs.elSelectTreeObj.valueId = _title ? row.parentId : ''
        })
      },
      changeButtonType(val) {
      },
      sureAdd() {
        if (this.verifyAcceptObj()) {
          let that = this
          if (that.dialogTitle === '新增' && that.addItemObj.type === -1) {
            that.addItemObj.pLevel = 0
          }
          that.addItemObj.buttonType = that.addItemObj.buttonType.join(',')
          this.$store.dispatch("addPermission", that.addItemObj).then(
            res => {
              if (res.code === 200) {
                that.isShowDialog = false
                this.$message({
                  type: "success",
                  message: that.dialogTitle + '成功！'
                });
                that.searchTable()
              }
            },
            err => {
              this.$message({
                type: "error",
                message: err
              });
            }
          );
        }
      },
      deleteItem(row) {
        let that = this
        this.$store.dispatch("deletePermission", row.id).then(
          res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: '删除成功！'
              });
              that.searchTable()
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      hindleChanged(val) {
        this.addItemObj.parentId = val
      },
      searchNameById(row, column, cellValue, index, data) {
        if (row.parentId === null || row.parentId === undefined || row.parentId.toString().replace(/\s+/g, '') === '') {
          return '无'
        }
        let _data = {}
        if (!data) {
          _data = this.tableData
        } else {
          _data = data
        }
        var Deep, T, F;
        for (F = _data.length; F;) {
          T = _data[--F]
          if (row.parentId === T.id) return T.title
          if (T.children) {
            Deep = this.searchNameById(row, '', '', '', T.children)
            if (Deep) return Deep.title
          }
        }
      },
      searchIdByName(title, data) {
        var Deep, T, F;
        for (F = data.length; F;) {
          T = data[--F]
          if (title === T.title) return T
          if (T.children) {
            Deep = this.searchNameById(title, T.children)
            if (Deep) return Deep.id
          }
        }
      },
      verifyAcceptObj() {
        let result = true
        let _this = this
        for (var field in _this.rules) {
          let obj = this.$refs['addItemObj']
          obj.validateField(field, (validMessage) => {
            if (validMessage !== '' && result === true) {
              result = false
              let fields = _this.$refs[field].elForm.fields

              for (let i in fields) {
                if (fields[i].labelFor === field) {
                  console.log(fields[i].label)
                  _this.$alert((fields[i].label) + '填写错误', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  })
                }
              }
            }
          })
        }
        return result
      }
    },
    mounted() {
    },
    created() {
      this.searchTable()
    },
    components: {
      elSelectTree
    },
    watch: {
      'isShowDialog'(val) {
        if (!val) {
          this.addItemObj = {
            pLevel: '',
            permTypes: '',
            id: '',
            parentId: '',
            name: '',
            showAlways: '',
            type: '',
            title: '',
            path: '',
            component: '',
            icon: '',
            url: '',
            buttonType: [],
            sortOrder: ''
          }
        }
      },
      'addItemObj.type'(val) {
        if (val === -1) {
          this.$refs.elSelectTreeObj.clearHandle()
          this.addItemObj.parentId = ''
        }
      }
    }
  };
</script>

<style lang="less">
  @import "../../../css/systemManage.less";
</style>
