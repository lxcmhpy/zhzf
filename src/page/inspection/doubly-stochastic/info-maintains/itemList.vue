<template>
  <div class="height100">
    <div class="handlePart">
      <div class="search toggleBox">
        <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
          <el-form :inline="true" :model="searchForm" class ref="searchForm">
            <el-form-item label="名称：" prop='checkItem'>
              <el-input v-model="searchForm.checkItem"></el-input>
            </el-form-item>
            <el-form-item label="抽查主体:" prop='checkSubject'>
              <el-input v-model="searchForm.checkSubject"></el-input>
            </el-form-item>
          </el-form>
          <div class="search-btns">
            <!-- <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTableData">查询</el-button> -->
            <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="searchTableData()"></el-button>
            <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="resetSearchData('searchForm')"></el-button>
            <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="handlePart">
      <div class="search" style="width:100%">
        <el-form :inline="true">
          <el-form-item label="任务领域" prop='checkDomain'>
            <el-select v-model="searchForm.checkDomain" placeholder="请选择" @change="searchTableData('searchForm')">
              <el-option label="省交通运输厅领域" value="省交通运输厅领域"></el-option>
              <el-option label="省市场监管领域" value="省市场监管领域"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="searchForm.checkDomain=='省交通运输厅领域'">
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addMethod1">新增</el-button>
          </el-form-item>
          <el-form-item v-if="searchForm.checkDomain=='省市场监管领域'">
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addMethod2">新增</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-delete-solid" @click="delMethod">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="iconfont law-edit" @click="editMethod">修改</el-button>
          </el-form-item> -->
          <div style="width:auto;float:right">
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="downloadModle">Excel模板导出</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="eel-icon-search" @click="importModle">导入Excel</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="exportMethod">导出所有对象</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
        <el-table-column prop="checkItem" label="抽查事项名称" align="center"></el-table-column>
        <el-table-column prop="checkBasis" label="抽查依据" align="center"></el-table-column>
        <el-table-column prop="checkSubject" label="抽查主体" align="center"></el-table-column>
        <el-table-column prop="checkContent" label="抽查内容" align="center"></el-table-column>
        <el-table-column prop="checkMode" label="抽查方式" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="searchForm.checkDomain=='省交通运输厅领域'" @click="editMethod(scope.row)" type="text">修改</el-button>
            <el-button v-if="searchForm.checkDomain=='省市场监管领域'" @click="editMethod2(scope.row)" type="text">修改</el-button>
            <el-button type="text" @click="delMethod(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
    </div>
    <el-dialog :title='dialogStatus+"省厅检查事项"' :visible.sync="dialogFormVisible" @close="resetForm('addForm')">
      <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="抽查主体" prop="checkSubject">
              <el-select v-model="addForm.checkSubject" placeholder="请选择">
                <el-option v-for="item in optionsCCZT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抽查方式" prop="checkMode">
              <el-input v-model="addForm.checkMode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="抽查事项名称" prop="checkItem">
          <el-input type="textarea" v-model="addForm.checkItem"></el-input>
        </el-form-item>
        <el-form-item label="抽查依据" prop="checkBasis">
          <el-input type="textarea" v-model="addForm.checkBasis"></el-input>
        </el-form-item>
        <el-form-item label="抽查内容" prop="checkContent">
          <el-input type="textarea" v-model="addForm.checkContent"></el-input>
        </el-form-item>
        <el-form-item prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="停用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title='dialogStatus2+"市场领域检查事项"' :visible.sync="dialogFormVisible2" @close="resetForm('addForm2')">
      <el-form :model="addForm2" :label-width="formLabelWidth" :rules="rules2" ref="addForm2">
        <el-row>
          <el-col :span="12">
            <el-form-item label="抽查类别" prop="checkType">
              <el-select v-model="addForm2.checkType" placeholder="请选择">
                <el-option v-for="item in optionsCCZT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抽查事项" prop="checkSubject">
              <el-select v-model="addForm2.checkItem" placeholder="请选择">
                <el-option v-for="item in optionsCCZT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="事项类别" prop="itemType">
              <el-select v-model="addForm2.itemType" placeholder="请选择">
                <el-option v-for="item in optionsCCZT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查对象" prop="checkObject">
              <el-input type="text" v-model="addForm2.checkObject"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查方式" prop="checkMode">
              <el-select v-model="addForm2.checkMode" placeholder="请选择">
                <el-option v-for="item in optionsCCZT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查主体" prop="checkSubject">
              <el-select v-model="addForm2.checkSubject" placeholder="请选择">
                <el-option v-for="item in optionsCCZT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="抽查依据" prop="checkBasis">
          <el-input type="textarea" v-model="addForm2.checkBasis"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addForm2.remark"></el-input>
        </el-form-item>
        <el-form-item prop="status">
          <el-radio-group v-model="addForm2.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="停用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm2('addForm2')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addItemListApi, getAllRandomItemApi, getDictListDetailByNameApi, delRandomItemApi } from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinInspection } from "@/common/js/inspectionComm";
export default {
  mixins: [mixinInspection],
  data() {
    return {
      multipleSelection: [],
      searchForm: {
        checkSubject: '',
        checkItem: '',
        checkDomain: '省交通运输厅领域'
      },
      isShow: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      addForm: {
        checkSubject: '',
        checkMode: '',
        checkBasis: '',
        checkItem: '',
        status: '',
        checkContent: ''
      },
      addForm2: {
        checkSubject: '',
        checkMode: '',
        checkBasis: '',
        checkItem: '',
        status: '',
        checkContent: ''
      },
      dialogStatus: '',
      dialogStatus2: '',
      formLabelWidth: '100px',
      rules: {
        pass: [
          { required: true, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, trigger: 'blur' }
        ],
        age: [
          { required: true, trigger: 'blur' }
        ]
      },
      rules2: {
        pass: [
          { required: true, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, trigger: 'blur' }
        ],
        age: [
          { required: true, trigger: 'blur' }
        ]
      },
      optionsCCZT: [],
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        checkItem: this.searchForm.checkItem,
        checkSubject: this.searchForm.checkSubject,
        checkDomain: this.searchForm.checkDomain,
        current: this.currentPage,
        size: this.pageSize,
      };
      // getAllRandomItemApi(data).then(
      //   res => {
      //     console.log(res)
      //     this.tableData = res.data.records
      //     this.totalPage = res.data.total
      //   },
      //   error => {
      //     // reject(error);
      //   })
      this.getPageList("getAllRandomItem", data);
    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('multipleSelection', this.multipleSelection)
    },

    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.defaultDisplay = true
      // debugger
      this.getTableData()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addItemListApi(this.addForm).then(
            res => {
              console.log(res)
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.dialogFormVisible = false
                this.currentPage = 1;
                this.getTableData()
              }
            },
            error => {
              // reject(error);
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addItemListApi(this.addForm).then(
            res => {
              console.log(res)
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.dialogFormVisible2 = false
                this.currentPage = 1;
                this.getTableData()
              }
            },
            error => {
              // reject(error);
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    delMethod(id) {
      this.deleteById("delRandomItem", id);
    },
    // 添加-弹窗
    addMethod1() {
      this.addForm.checkDomain = this.searchForm.checkDomain
      this.addMethod()
    },
    // 添加-弹窗
    addMethod2() {
      this.addForm.checkDomain = this.searchForm.checkDomain
      this.dialogStatus2 = '新增'
      this.dialogFormVisible2 = true
    },
    // 修改
    editMethod2(row) {
      this.addForm2 = JSON.parse(JSON.stringify(row))
      this.dialogStatus2 = '修改'
      this.dialogFormVisible2 = true
    },
  },
  mounted() {
    this.getTableData()
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>