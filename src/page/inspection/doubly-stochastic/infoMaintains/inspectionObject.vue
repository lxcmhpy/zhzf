<template>
  <div class="height100">
    <div class="handlePart">
      <div class="search toggleBox">
        <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
          <el-form :inline="true" :model="searchForm" class ref="searchForm">
            <el-form-item label="主体名称：" prop='objectName'>
              <el-input v-model="searchForm.objectName"></el-input>
            </el-form-item>
            <el-form-item label="项目名称：" prop='projectName'>
              <el-input v-model="searchForm.projectName"></el-input>
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
        <el-table-column prop="objectName" label="对象名称" align="center"></el-table-column>
        <el-table-column prop="socialCode" label="统一社会信用代码" align="center"></el-table-column>
        <el-table-column prop="objectType" label="对象类型" align="center"></el-table-column><!-- 显示模板标题 -->
        <el-table-column prop="legalRepresent" label="法定代表人" align="center"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
        <el-table-column prop="contactNumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="superviseType" label="监管类型" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
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
    <el-dialog :title='dialogStatus+"检查对象"' :visible.sync="dialogFormVisible" @close="resetForm('addForm')">
      <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addForm">
        <el-form-item label="对象名称" prop="objectName">
          <el-input v-model="addForm.objectName"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码" prop="socialCode">
              <el-input v-model="addForm.socialCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政划分" prop="adminDivision">
              <el-input v-model="addForm.adminDivision"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人姓名" prop="legalRepresent">
              <el-input v-model="addForm.legalRepresent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法人身份证号" prop="idCard">
              <el-input v-model="addForm.idCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="对象类型" prop="objectType">
              <el-select v-model="addForm.objectType" placeholder="请选择">
                 <el-option v-for="item in optionsDXLX" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监管类型" prop="superviseType">
              <el-select v-model="addForm.superviseType" placeholder="请选择">
             <el-option v-for="item in optionsJGLX" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="addForm.projectName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="addForm.contactNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="监管单位" prop="regulatoryUnit">
          <el-select v-model="addForm.regulatoryUnit" placeholder="请选择">
             <el-option v-for="item in optionsJGDW" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addForm.remark"></el-input>
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
import { getAllRandomObjectApi, addInspectionObjectApi, getDictListDetailByNameApi, delRandomObjectApi } from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      tableData: [], //表格数据
      multipleSelection: [],
      searchForm: {
        objectName: "",
        projectName: '',
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      isShow: false,
      dialogFormVisible: false,
      addForm: {
        objectName: '',
        socialCode: '',
        adminDivision: '',
        legalRepresent: '',
        idCard: '',
        objectType: '',
        superviseType: '',
        projectName: '',
        contactNumber: '',
        regulatoryUnit: '',
        remark: '',
      },
      formLabelWidth: '125px',
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
      optionsDXLX:[],
      optionsJGDW:[],
      optionsJGLX:[],
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        projectName: this.searchForm.projectName,
        objectName: this.searchForm.objectName,
        current: this.currentPage,
        size: this.pageSize,
      };
      getAllRandomObjectApi(data).then(
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
          addInspectionObjectApi(this.addForm).then(
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
        delRandomObjectApi(id).then(
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
              case 1: _this.optionsJGLX = res.data; break;//监管类型
              case 2: _this.optionsDXLX = res.data; break;//对象类型
              case 3: _this.optionsJGDW = res.data; break;//监管单位
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
    this.getDrawerList([{ name: '监管类型', option: 1 },
    { name: '对象类型', option: 2 },
    { name: '监管单位', option: 3 }])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>