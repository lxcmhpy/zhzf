<template>
  <div class="height100">
    <div class="handlePart">
      <div class="search toggleBox">
        <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
          <el-form :inline="true" :model="searchForm" class ref="searchForm">
            <el-form-item label="姓名：" prop='name'>
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="单位：" prop='company'>
              <el-input v-model="searchForm.company"></el-input>
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
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addMethod">新增</el-button>
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
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center" :formatter="sexFormat"></el-table-column>
        <el-table-column prop="company" label="单位" align="center"></el-table-column>
        <el-table-column prop="birthDate" label="出生日期" align="center"></el-table-column>
        <el-table-column prop="politicalStatus" label="政治面貌" align="center"></el-table-column>
        <el-table-column prop="job" label="职务" align="center"></el-table-column><!-- 显示模板标题 -->
        <el-table-column prop="jobTitle" label="职称" align="center"></el-table-column>
        <el-table-column prop="domain" label="专业领域" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="editMethod(scope.row)" type="text">修改</el-button>
            <el-button type="text" @click="delMethod(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
    </div>
    <el-dialog :title='dialogStatus+"检查专家"' :visible.sync="dialogFormVisible" @close="resetForm('addForm')">
      <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="addForm.sex" placeholder="请选择">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专家编号" prop="expertNum">
              <el-input v-model="addForm.expertNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="company">
              <el-input v-model="addForm.company"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthDate">
              <el-date-picker v-model="addForm.birthDate" type="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="政治面貌" prop="politicalStatus">
              <el-select v-model="addForm.politicalStatus" placeholder="请选择">
                <el-option v-for="item in optionsZZMM" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职务" prop="job">
              <el-input v-model="addForm.job"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位地址" prop="unitAddress">
              <el-input v-model="addForm.unitAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职称" prop="jobTitle">
              <el-select v-model="addForm.jobTitle" placeholder="请选择">
                <el-option v-for="item in optionsZC" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评定时间" prop="evaluationTime">
              <el-date-picker v-model="addForm.evaluationTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="毕业学校" prop="graduateSchool">
              <el-input v-model="addForm.graduateSchool"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业时间" prop="graduateTime">
              <el-date-picker v-model="addForm.graduateTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执业资格" prop="practiceQualification">
              <el-input v-model="addForm.practiceQualification"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="取得时间" prop="qualificationTime">
              <el-date-picker v-model="addForm.qualificationTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="contactType">
              <el-input v-model="addForm.contactType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="固定电话" prop="fixedTelephone">
              <el-date-picker v-model="addForm.fixedTelephone" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="专业领域" prop="domain">
              <el-select v-model="addForm.domain" placeholder="请选择">
                <el-option v-for="item in optionsZYLY" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="E-mail" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="基本简历" prop="baseInfo">
          <el-input type="textarea" v-model="addForm.baseInfo"></el-input>
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
  </div>
</template>
<script>
import { getAllExpertApi, addExpertApi, getDictListDetailByNameApi, delExpertApi } from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinPerson } from "@/common/js/personComm";
export default {
  mixins: [mixinPerson],
  data() {
    return {
      tableData: [], //表格数据
      multipleSelection: [],
      searchForm: {
        company: "",
        name: ''
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      isShow: false,
      dialogFormVisible: false,
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
      formLabelWidth: '100px',
      dialogStatus: '',
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
      optionsZC: [],
      optionsZZMM: [],
      optionsZYLY: [],
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        name: this.searchForm.name,
        company: this.searchForm.company,
        current: this.currentPage,
        size: this.pageSize,
      };
      getAllExpertApi(data).then(
        res => {
          console.log(res)
          this.tableData = res.data.records
          this.totalPage = res.data.total
        },
        error => {
          // reject(error);
        })

    },
    // 查询
    searchTableData() {
      this.currentPage = 1;
      this.getTableData()
    },

    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
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
          addExpertApi(this.addForm).then(
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addMethod() {
      this.dialogStatus = '新增'
      this.dialogFormVisible = true
    },
    editMethod(row) {
      this.addForm = JSON.parse(JSON.stringify(row))
      this.dialogStatus = '修改'
      this.dialogFormVisible = true
    },
    delMethod(id) {
      this.$confirm('确认删除？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delExpertApi(id).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.currentPage = 1;
              this.getTableData()
            }
          },
          error => {
            // reject(error);
          })
      })
    },
    exportMethod() { },
    importModle() { },
    downloadModle() { },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 2: _this.optionsZC = res.data; break;//职称
              case 3: _this.optionsZYLY = res.data; break;//专业领域
              case 4: _this.optionsZZMM = res.data; break;//政治面貌
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
      { name: '职称', option: 2 },
      { name: '专业领域', option: 3 },
      { name: '人员信息-政治面貌', option: 4 }])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>