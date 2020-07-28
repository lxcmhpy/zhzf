<template>
  <div class="height100">
    <div class="handlePart">
      <div class="search toggleBox search-mini">
        <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
          <el-form :inline="true" :model="searchForm" class ref="searchForm">
            <el-form-item>
              双随机一公开执法人员库
            </el-form-item>
            <el-form-item label="姓名：" prop='otherUser'>
              <el-input v-model="searchForm.otherUser"></el-input>
            </el-form-item>
            <el-form-item label="在岗情况：" prop='otherUser'>
              <el-select v-model="searchForm.otherUser" placeholder="请选择">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="search-btns">
            <el-button size="medium" title="搜索" icon="iconfont law-sousuo" @click="searchTableData()"></el-button>
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
              <el-button size="medium" type="primary" @click="resetSearchData('searchForm')">导出所有人员</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="domain" label="监督执法种类" align="center"></el-table-column>
        <el-table-column prop="workStatus" label="状态" align="center"></el-table-column>
        <el-table-column prop="organization" label="执法人员性质" align="center"></el-table-column>
        <el-table-column prop="job" label="职务" align="center"></el-table-column>
        <el-table-column prop="company" label="单位" align="center"></el-table-column>
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
    <el-dialog :title='dialogStatus+"检查人员"' :visible.sync="dialogFormVisible" style="width:auto" @close="resetForm('addForm')">
      <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthDate">
              <el-date-picker v-model="addForm.birthDate" type="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="addForm.sex" placeholder="请选择">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="addForm.idCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族" prop="education">
              <el-select v-model="addForm.education" placeholder="请选择">
                <el-option v-for="item in zcList" :key="item.id" :label="item.naem" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="政治面貌" prop="politicalStatus">
              <el-select v-model="addForm.politicalStatus" placeholder="请选择">
                <el-option v-for="item in zzmmList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="最高学历" prop="highestEducation">
              <el-select v-model="addForm.highestEducation" placeholder="请选择">
                <el-option v-for="item in zcList" :key="item.id" :label="item.naem" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历专业" prop="profession">
              <el-input v-model="addForm.profession"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="固定电话" prop="contactNum">
              <el-input v-model="addForm.contactNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" prop="phoneNum">
              <el-input v-model="addForm.phoneNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="人员类型" prop="region">
              <el-select v-model="addForm.region" placeholder="请选择">
                <el-option v-for="item in zcList" :key="item.id" :label="item.naem" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职级" prop="technicalTitle">
              <el-date-picker v-model="addForm.technicalTitle" type="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执法人员性质" prop="organization">
              <el-select v-model="addForm.organization" placeholder="请选择">
                <el-option v-for="item in zcList" :key="item.id" :label="item.naem" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="company">
              <el-date-picker v-model="addForm.company" type="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="监督检查种类" prop="domain">
              <el-select v-model="addForm.domain" placeholder="请选择">
                <el-option v-for="item in zcList" :key="item.id" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监督检查区域" prop="lawArea">
              <el-date-picker v-model="addForm.lawArea" type="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="执法证类型" prop="certType">
          <el-input v-model="addForm.certType"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件编号" prop="certNumber">
              <el-input v-model="addForm.certNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发证机关" prop="issueAuthority">
              <el-input v-model="addForm.issueAuthority"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="有效期限起始时间" prop="certStartTime">
              <el-date-picker v-model="addForm.certStartTime" type="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期限截至时间" prop="certEndTime">
              <el-date-picker v-model="addForm.certEndTime" type="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监督人员" prop="isSupervisor">
              <el-radio-group v-model="addForm.isSupervisor">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否具有法律职业资格" prop="isLawProfession">
              <el-radio-group v-model="addForm.isLawProfession">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否在岗" prop="workStatus">
          <el-radio-group v-model="addForm.workStatus">
            <el-radio label="在岗"></el-radio>
            <el-radio label="离岗"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="其他情况" prop="remark">
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
import { findRecordListApi, } from "@/api/inspection";
import { getDictListDetailByNameApi, } from "@/api/system";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      tableData: [], //表格数据
      multipleSelection: [],
      searchForm: {
        domain: "",
        status: '',
        createUser: iLocalStroage.gets("userInfo").nickName,
        otherUser: '',
        title: '',
        defaultDisplay: true,
        name: ''
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      isShow: false,
      dialogFormVisible: false,
      addForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogStatus: '',
      formLabelWidth: '125px',
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
      zzmmList: [],
      zcList: [],
      options: [],
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        title: this.searchForm.title,
      };
      findRecordListApi(data).then(
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
          console.log(this.addForm, typeof (this.addForm.isWork))
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
    editMethod() { },
    delMethod() {
      this.$confirm('确认删除？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {

      })
    },
    exportMethod() { },
    importModle() { },
    downloadModle() { },
    getDrawerList(data) {
      let _this = this
      getDictListDetailByNameApi(data).then(
        res => {
          _this.options = res.data
        },
        error => {
          // reject(error);
        })
    },
  },
  mounted() {
    // 获取抽屉
    this.getDrawerList('在岗情况')
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>