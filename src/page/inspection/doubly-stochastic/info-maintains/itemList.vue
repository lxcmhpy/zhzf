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
            <!-- <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
            </el-button> -->
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
              <a class="el-button el-button--primary el-button--medium" href="./static/excel/事项清单模板.xlsx" download="事项清单模板.xlsx">Excel模板导出</a>
            </el-form-item>
            <el-form-item>
              <el-upload style="width: auto;display: inline-block;" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="importModle">
                <el-button type="primary" size="medium">导入Excel</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="exportMethod('exportItem','事项清单表.xls')">导出所有事项清单</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="tablePart" v-if="searchForm.checkDomain=='省交通运输厅领域'">
      <el-table :data="tableData" key="table1" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
        <el-table-column prop="checkItem" label="抽查事项名称" align="center"></el-table-column>
        <el-table-column prop="checkBasis" label="抽查依据" align="center"></el-table-column>
        <el-table-column prop="checkSubject" label="抽查主体" align="center"></el-table-column>
        <!-- <el-table-column prop="checkType" label="抽查内容" align="center"></el-table-column> -->
        <el-table-column prop="checkType" label="抽查类别" align="center"></el-table-column>
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
    <div class="tablePart" v-if="searchForm.checkDomain=='省市场监管领域'">
      <el-table :data="tableData" key="table2" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
        <el-table-column prop="checkType" label="抽查类别" align="center"></el-table-column>
        <el-table-column prop="checkItem" label="抽查事项" align="center"></el-table-column>
        <el-table-column prop="itemType" label="事项类别" align="center"></el-table-column>
        <el-table-column prop="checkObject" label="检查对象" align="center"></el-table-column>
        <el-table-column prop="checkMode" label="检查方式" align="center"></el-table-column>
        <el-table-column prop="checkSubject" label="检查主体" align="center">
          <template slot-scope="scope">
            <!-- 避免视图不刷新 -->
            {{scope.row.checkSubject}}
          </template>
        </el-table-column>
        <el-table-column prop="checkBasis" label="检查依据" align="center"></el-table-column>
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
    <el-dialog :title='dialogStatus+"省交通厅领域检查事项"' :close-on-click-modal="false" :visible.sync="dialogFormVisible" @close="resetForm('addForm')">
      <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="抽查类别" prop="checkType">
              <el-select v-model="addForm.checkType" placeholder="请选择" @change="changeCheckType(addForm.checkType,'省交通运输厅领域')">
                <el-option v-for="item in optionsCCLBJT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抽查事项" prop="checkItem">
              <el-select v-model="addForm.checkItem" placeholder="请选择" >
                <el-option v-for="item in optionsCCSXJT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="事项类别" prop="itemType">
              <el-select v-model="addForm.itemType" placeholder="请选择">
                <el-option v-for="item in optionsSXLB" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查对象" prop="checkObject">
              <!-- <el-input type="text" v-model="addForm2.checkObject"></el-input> -->
              <el-select v-model="addForm.checkObject" placeholder="请选择">
                <el-option v-for="item in optionsCCDXJT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查方式" prop="checkMode">
              <el-select v-model="addForm.checkMode" placeholder="请选择">
                <el-option v-for="item in optionsCCFS" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查主体" prop="checkSubject">
              <el-select v-model="addForm.checkSubject" placeholder="请选择">
                <el-option v-for="item in optionsCCZTJT" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="检查依据" prop="checkBasis">
          <el-input type="textarea" v-model="addForm.checkBasis"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addForm.remark"></el-input>
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
    <el-dialog :title='dialogStatus2+"市场领域检查事项"' :close-on-click-modal="false" :visible.sync="dialogFormVisible2" @close="resetForm('addForm2')">
      <el-form :model="addForm2" :label-width="formLabelWidth" :rules="rules2" ref="addForm2">
        <el-row>
          <el-col :span="12">
            <el-form-item label="抽查类别" prop="checkType">
              <el-select v-model="addForm2.checkType" placeholder="请选择" @change="changeCheckType(addForm2.checkType,'省市场监管领域')">
                <el-option v-for="item in optionsCCLBSC" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抽查事项" prop="checkItem">
              <el-select v-model="addForm2.checkItem" placeholder="请选择">
                <el-option v-for="item in optionsCCSXSC" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="事项类别" prop="itemType">
              <el-select v-model="addForm2.itemType" placeholder="请选择">
                <el-option v-for="item in optionsSXLB" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查对象" prop="checkObject">
              <!-- <el-input type="text" v-model="addForm2.checkObject"></el-input> -->
              <el-select v-model="addForm2.checkObject" placeholder="请选择">
                <el-option v-for="item in optionsCCDXSC" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查方式" prop="checkMode">
              <el-select v-model="addForm2.checkMode" placeholder="请选择">
                <el-option v-for="item in optionsCCFS" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查主体" prop="checkSubject">
              <el-select v-model="addForm2.checkSubject" placeholder="请选择">
                <el-option v-for="item in optionsCCZTSC" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="检查依据" prop="checkBasis">
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
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="submitForm2('addForm2')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addItemListApi, getAllRandomItemApi, getDictListDetailByNameApi, getAllCheckObject, delRandomItemApi, importItemExcelApi, getIsRandomNameApi } from "@/api/inspection";
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
        checkType: '',
        checkObject: '',
        checkBasis: '',
        checkItem: '',
        checkContent: '',
        status: '启用',
      },
      addForm2: {
        checkSubject: '',
        checkMode: '',
        checkBasis: '',
        checkItem: '',
        checkContent: '',
        checkObject: '',
        itemType: '',
        checkType: '',
        status: '启用',
        remark: ''
      },
      dialogStatus: '',
      dialogStatus2: '',
      formLabelWidth: '120px',
      rules: {
        checkSubject: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkMode: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkBasis: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkType: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkItem: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        status: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkContent: [
          { required: true, message: "必填项", trigger: "change" }
        ]
      },
      rules2: {
        checkSubject: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkMode: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkBasis: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkItem: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        status: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkContent: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkObject: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        itemType: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        checkType: [
          { required: true, message: "必填项", trigger: "change" }
        ],
      },
      optionsCCZTJT: [],
      optionsCCZTSC: [],
      optionsCCFS: [],
      optionsSXLB: [],
      optionsCCDXJT: [],
      optionsCCDXSC: [],
      optionsCCLBJT: [],
      optionsCCLBSC: [],
      optionsCCSXJT: [],
      optionsCCSXSC: [],
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
              } else {
                this.$message({ type: "error", message: err.msg || '' });
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
          addItemListApi(this.addForm2).then(
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
              } else {
                this.$message({ type: "error", message: err.msg || '' });
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
      this.addForm2.checkDomain = this.searchForm.checkDomain
      this.dialogStatus2 = '新增'
      this.dialogFormVisible2 = true
    },
    // 修改
    editMethod2(row) {
      this.addForm2 = JSON.parse(JSON.stringify(row))
      this.dialogStatus2 = '修改'
      this.dialogFormVisible2 = true
    },
    // 导入
    importModle(param) {
      console.log(param);
      // let currentFileId = this.currentFileId
      var fd = new FormData()
      fd.append("file", param.file);
      importItemExcelApi(fd).then(res => {
        if (res.code === 200) {
          this.$message({ type: "success", message: res.msg });
          this.currentPage = 1;
          this.getTableData()
        }
      }
      );
    },
    searchTableData() {
      this.$forceUpdate();
      this.currentPage = 1;
      this.getTableData()
    },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1: _this.optionsSXLB = res.data; break;//事项类别
              case 2: _this.optionsCCFS = res.data; break;//抽查方式
              case 3: _this.optionsCCZTSC = res.data; break;//抽查主体-市场
              case 10: _this.optionsCCZTJT = res.data; break;//抽查主体-交通
              case 4: _this.optionsCCLBSC = res.data; break;//抽查类别-市场
              case 5: _this.optionsCCSXJT = res.data; break;//抽查事项-交通
              case 6: _this.optionsCCSXSC = res.data; break;//抽查事项-市场
              case 7: _this.optionsCCDXSC = res.data; break;//抽查对象-市场
              case 9: _this.optionsCCDXJT = res.data; break;//抽查对象-交通
              case 8: _this.optionsCCLBJT = res.data; break;//抽查类别-交通

            }
          },
          error => {
            // reject(error);
          })
      });
    },
    getAllCheckObjects() {
      getAllCheckObject().then(res => {
        if (res.code == 200) {
          this.optionsJCDX = res.data;
        }
      })
    },
    changeCheckType(taskName, checkDomain) {
      let _this = this
      let data = {
        taskName: taskName,
        checkDomain: checkDomain
      }
      getIsRandomNameApi(data).then(
        res => {
          if (res.code == 200 && res.data == false) {

          } else {
            this.$message({ type: "error", message: '请先停用重名选项后再选择！' });
            _this.addForm.checkItem = ''
            _this.addForm2.checkType = ''
          }

        },
        error => {
          // reject(error);
        })
    }
  },
  mounted() {
    this.getTableData()
    this.getAllCheckObjects();
    // 获取抽屉
    this.getDrawerList([{ name: '事项类别', option: 1 },
    { name: '抽查方式', option: 2 },
    { name: '抽查主体-市场', option: 3 },
    { name: '抽查主体-交通', option: 10 },
    { name: '抽查类别-市场', option: 4 },
    { name: '抽查事项-交通', option: 5 },
    { name: '抽查事项-市场', option: 6 },
    { name: '抽查对象-市场', option: 7 },
    { name: '抽查对象-交通', option: 9 },
    { name: '抽查类别-交通', option: 8 },
    ])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>