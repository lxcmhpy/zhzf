<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox inspection-info" id="roleBox" style="height:calc(100% - 22px)">
      <div class="handlePart">
        <div class="search toggleBox">
          <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item label="名称" prop='taskName'>
                <el-input v-model="searchForm.taskName"></el-input>
              </el-form-item>
              <el-form-item label="抽查主体" prop='checkSubject'>
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
            <el-form-item label="任务领域" prop='taskArea'>
              <el-select v-model="searchForm.taskArea" placeholder="请选择" @change="resetSearchData('searchForm')">
                <el-option label="省交通运输厅领域" value="省交通运输厅领域"></el-option>
                <el-option label="省市场监管领域" value="省市场监管领域"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="searchForm.taskArea=='省交通运输厅领域'">
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addMethod">新增</el-button>
            </el-form-item>
            <el-form-item v-if="searchForm.taskArea=='省市场监管领域'">
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addMethod2">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart" v-if="searchForm.taskArea=='省交通运输厅领域'">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="checkType" label="任务名称" align="center"></el-table-column>
          <el-table-column prop="checkItem" label="抽查主体" align="center" :formatter="sexFormat"></el-table-column>
          <el-table-column prop="itemType" label="检查类型" align="center"></el-table-column>
          <el-table-column prop="politicalStatus" label="抽查标准" align="center"></el-table-column>
          <el-table-column prop="checkMode" label="抽查方式" align="center"></el-table-column><!-- 显示模板标题 -->
          <el-table-column prop="checkSubject" label="抽查内容" align="center"></el-table-column>
          <el-table-column prop="checkBasis" label="抽查依据" align="center"></el-table-column>
          <el-table-column label="任务周期" align="center">
            <template slot-scope="scope">
              {{scope.row.taskStartTime}}-{{scope.row.taskEndTime}}
            </template>
          </el-table-column>
          <el-table-column prop="checkRange" label="检查范围" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button @click="editMethod(scope.row)" type="text">修改</el-button>
              <el-button @click="editMethod(scope.row)" type="text">查看详情</el-button>
              <el-button type="text" @click="delMethod(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tablePart" v-if="searchForm.taskArea=='省市场监管领域'">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="checkType" label="抽查类别" align="center"></el-table-column>
          <el-table-column prop="checkItem" label="抽查事项" align="center" :formatter="sexFormat"></el-table-column>
          <el-table-column prop="itemType" label="事项类别" align="center"></el-table-column>
          <!-- 字段 -->
          <el-table-column prop="checkObject" label="检查对象" align="center"></el-table-column>
          <el-table-column prop="checkMode" label="检查方式" align="center"></el-table-column><!-- 显示模板标题 -->
          <el-table-column prop="checkSubject" label="检查主体" align="center"></el-table-column>
          <el-table-column prop="checkBasis" label="检查依据" align="center"></el-table-column>
          <el-table-column label="任务周期" align="center">
            <template slot-scope="scope">
              {{scope.row.taskStartTime}}-{{scope.row.taskEndTime}}
            </template>
          </el-table-column>
          <el-table-column prop="checkRange" label="检查范围" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button @click="editMethod(scope.row)" type="text">修改</el-button>
              <el-button @click="editMethod(scope.row)" type="text">查看详情</el-button>
              <el-button type="text" @click="delMethod(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
      <el-dialog :title='dialogStatus+"省交通运输厅领域任务"' :visible.sync="dialogFormVisible" @close="resetForm('addForm')">
        <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务名称" prop="taskName">
                <el-select v-model="addForm.taskName" placeholder="请选择">
                  <el-option v-for="item in optionsRWMC" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抽查事项" prop="checkItem">
                <el-select v-model="addForm.checkItem" placeholder="请选择">
                  <el-option v-for="item in optionsCCSX" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查主体" prop="checkSubject">
                <el-input v-model="addForm.checkSubject" :disabled="true" placeholder="选择检查任务名称后自动带出"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查方式" prop="checkMode">
                <el-select v-model="addForm.checkMode" multiple placeholder="请选择">
                  <el-option v-for="item in optionsCCFS" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作人员" prop="operatePerson">
                <el-input v-model="addForm.operatePerson"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监督人员" prop="supervisePerson">
                <el-input v-model="addForm.supervisePerson"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查对象" prop="checkObject">
                <el-input v-model="addForm.checkObject"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事项类别" prop="itemType">
                <el-select v-model="addForm.itemType" placeholder="请选择">
                  <el-option v-for="item in optionsSSLB" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="抽查依据" prop="checkBasis">
            <el-input v-model="addForm.checkBasis" :disabled="true" placeholder="选择检查任务名称后自动带出"></el-input>
          </el-form-item>
          <el-form-item label="抽查内容" prop="checkContent">
            <el-input v-model="addForm.checkContent" :disabled="true" placeholder="选择检查任务名称后自动带出"></el-input>
          </el-form-item>
          <el-form-item label="抽查标准" prop="checkStandard">
            <el-input v-model="addForm.checkStandard"></el-input>
          </el-form-item>
          <el-form-item label="检查范围" prop="checkRange">
            <el-input v-model="addForm.checkRange"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addForm.remark"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="4">
              <el-form-item label="抽查对象数" prop="checkObjectNum">
                <el-input v-model="addForm.checkObjectNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="项/总数" prop="qualificationTime" label-width="70px">
                <el-input v-model="addForm.qualificationTime"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="执法人员" prop="lawEnforceNum">
                <el-input v-model="addForm.lawEnforceNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="人/总数" prop="fixedTelephone" label-width="70px">
                <el-input v-model="addForm.contactType"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="专家" prop="expertNum">
                <el-input v-model="addForm.expertNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="人/总数" prop="fixedTelephone" label-width="70px">
                <el-input v-model="addForm.contactType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="专业领域" prop="taskArea">
                <el-select v-model="addForm.taskArea" placeholder="请选择">
                  <el-option v-for="item in optionsZYLY" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="E-mail" prop="email">
                <el-input v-model="addForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-form-item label="抽查时限" prop="remark">
            <el-date-picker v-model="addForm.remark" type="daterange" range-separator="至">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm',0)">暂存</el-button>
          <el-button type="primary" @click="submitForm('addForm',1)">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog :title='dialogStatus2+"省市场监管领域任务"' :visible.sync="dialogFormVisible2" @close="resetForm('addForm2')">
        <el-form :model="addForm2" :label-width="formLabelWidth" :rules="rules2" ref="addForm2">
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务名称" prop="taskName">
                <el-select v-model="addForm2.taskName" placeholder="请选择">
                  <el-option v-for="item in optionsRWMC" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抽查事项" prop="checkItem">
                <el-select v-model="addForm2.checkItem" placeholder="请选择">
                  <el-option v-for="item in optionsCCSX" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查主体" prop="checkSubject">
                <el-input v-model="addForm2.checkSubject" :disabled="true" placeholder="选择检查任务名称后自动带出"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查方式" prop="checkMode">
                <el-input v-model="addForm2.checkMode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作人员" prop="operatePerson">
                <el-input v-model="addForm2.operatePerson"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监督人员" prop="supervisePerson">
                <el-input v-model="addForm2.supervisePerson"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查对象" prop="checkItem">
                <el-input v-model="addForm2.checkItem"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事项类别" prop="itemType">
                <el-input v-model="addForm2.itemType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="检查依据" prop="checkBasis">
            <el-input v-model="addForm.checkBasis" :disabled="true" placeholder="选择检查任务名称后自动带出"></el-input>
          </el-form-item>
          <el-form-item label="检查范围" prop="checkRange">
            <el-input v-model="addForm2.checkRange"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addForm2.remark"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="4">
              <el-form-item label="抽查对象数" prop="checkObjectNum">
                <el-input v-model="addForm2.checkObjectNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="项/总数" prop="qualificationTime" label-width="70px">
                <el-input v-model="addForm2.qualificationTime"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="执法人员" prop="lawEnforceNum">
                <el-input v-model="addForm2.lawEnforceNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="人/总数" prop="fixedTelephone" label-width="70px">
                <el-input v-model="addForm2.contactType"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="专家" prop="expertNum">
                <el-input v-model="addForm2.expertNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="人/总数" prop="fixedTelephone" label-width="70px">
                <el-input v-model="addForm2.contactType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="专业领域" prop="taskArea">
                <el-select v-model="addForm.taskArea" placeholder="请选择">
                  <el-option v-for="item in optionsZYLY" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="E-mail" prop="email">
                <el-input v-model="addForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-form-item label="抽查时限" prop="remark">
            <el-date-picker v-model="addForm2.remark" type="daterange" range-separator="至">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2('addForm2',0)">暂存</el-button>
          <el-button type="primary" @click="submitForm2('addForm2',1)">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addTaskApi, getDictListDetailByNameApi,} from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinPerson } from "@/common/js/personComm";
import { mixinInspection } from "@/common/js/inspectionComm";
export default {
  mixins: [mixinPerson, mixinInspection],
  data() {
    return {
      multipleSelection: [],
      searchForm: {
        checkSubject: "",
        taskName: '',
        taskArea: '省交通运输厅领域'
      },
      isShow: false,
      addForm: {
        name: '',
        sex: '',
        expertNum: '',
        company: '',
        politicalStatus: '',
        birthDate: '',
        unitAddress: '',
        jobTitle: '',
        job: '',
        evaluationTime: '',
        graduateSchool: '',
        email: '',
        domain: '',
        fixedTelephone: '',
        graduateTime: '',
        practiceQualification: '',
        qualificationTime: '',
        contactType: '',
        baseInfo: '',
        remark: '',
        status: '',
      },
      addForm2: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '100px',
      dialogStatus: '',
      dialogStatus2: '',
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
      optionsZC: [],
      optionsZZMM: [],
      optionsZYLY: [],
      optionsCCSX: [],
      optionsRWMC: [],
      optionsCCFS: [],
      optionsSSLB: [],
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        name: this.searchForm.name,
        company: this.searchForm.company,
        taskArea: this.searchForm.taskArea,
        current: this.currentPage,
        size: this.pageSize,
      };
      this.getPageList("getAllTask", data);
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
    submitForm(formName, type) {
      this.addForm.taskArea = '省交通运输厅领域'
      if (type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addForm.taskStatus = '保存'
            addTaskApi(this.addForm).then(
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
      } else {
        this.addForm.taskStatus = '暂存'
        addTaskApi(this.addForm).then(
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
      }

    },
    submitForm2(formName, type) {
      this.addForm.taskArea = '市场领域检查事项'
      if (type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addForm.taskStatus = '保存'

            addTaskApi(this.addForm).then(
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
      } else {
        this.addForm.taskStatus = '暂存'
        addTaskApi(this.addForm).then(
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
      }

    },
    delMethod(id) {
      this.deleteById("delTask", id);
    },
    // 添加-弹窗
    addMethod1() {
      this.addForm.checkDomain = this.searchForm.taskArea
      this.addMethod()
    },
    // 添加-弹窗
    addMethod2() {
      this.addForm.checkDomain = this.searchForm.taskArea
      this.dialogStatus2 = '新增'
      this.dialogFormVisible2 = true
    },
    // 修改
    editMethod2(row) {
      this.addForm2 = JSON.parse(JSON.stringify(row))
      this.dialogStatus2 = '修改'
      this.dialogFormVisible2 = true
    },

    getDrawerList(data) {

      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1: _this.optionsRWMC = res.data; break;//任务名称
              case 2: _this.optionsJCLX = res.data; break;//检查类型
              case 3: _this.optionsCCFS = res.data; break;//抽查方式
              case 4: _this.optionsCCSX = res.data; break;//抽查事项
              case 5: _this.optionsSSLB = res.data; break;//事项类别
            }
          },

          error => {
            // reject(error);
          })
      });

    },
  },
  mounted() {
    this.getTableData()
    // 获取抽屉
    this.getDrawerList([
      { name: '任务名称', option: 1 },
      { name: '检查类型', option: 2 },
      { name: '抽查方式', option: 3 },
      { name: '抽查事项', option: 4 },
      { name: '事项类别', option: 5 },
    ])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>