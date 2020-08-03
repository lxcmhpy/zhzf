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
              <a class="el-button el-button--primary el-button--medium" href="./static/excel/检查对象模板.xlsx" download="检查对象模板.xlsx">Excel模板导出</a>
              <!-- <el-button type="primary" size="medium" icon="el-icon-search" @click="downloadModle">Excel模板导出</el-button> -->
            </el-form-item>
            <el-form-item>
              <el-upload style="width: auto;display: inline-block;" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="importModle">
                <el-button type="primary" size="medium">导入Excel</el-button>
              </el-upload>
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
              <el-cascader v-model="addForm.adminDivision" :options="provenceList" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
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
import { getAllRandomObjectApi, addInspectionObjectApi, getDictListDetailByNameApi, delRandomObjectApi, findByAddressCode ,importObjectExcelApi} from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinInspection } from "@/common/js/inspectionComm";
export default {
  mixins: [mixinInspection],
  data() {
    return {
      multipleSelection: [],
      searchForm: {
        objectName: "",
        projectName: '',
      },
      isShow: false,
      dialogFormVisible: false,
      addForm: {
        objectName: '',
        socialCode: '',
        adminDivision: [],
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
      optionsDXLX: [],
      optionsJGDW: [],
      optionsJGLX: [],
      provenceList: []
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
      this.getPageList("getAllRandomObject", data);

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
          let data = JSON.parse(JSON.stringify(this.addForm))
          data.adminDivision = this.addForm.adminDivision.join(',')
          addInspectionObjectApi(data).then(
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
    delMethod(id) {
      this.deleteById("delRandomObject", id);
    },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1: _this.optionsJGLX = res.data; break;//监管类型
              case 2: _this.optionsDXLX = res.data; break;//对象类型
            }
          },
          error => {
            // reject(error);
          })
      });

    },
    findProvence() {
      this.provenceList = []
      let _this = this
      let data = '530000'//云南
      findByAddressCode(data).then(
        res => {
          // this.provenceList.push(res.data)
          let dataList = []
          dataList.push(res.data)
          dataList.forEach(element => {
            console.log('element', element)
            if (element.myChildren) {
              element.value = element.adcode;
              element.label = element.name
              element.children = element.myChildren
              element.myChildren.forEach(item => {
                console.log('item', item)
                item.value = item.adcode;
                item.label = item.name
                if (item.myChildren) {
                  item.children = item.myChildren
                  item.children.forEach(item1 => {
                    item1.value = item1.adcode;
                    item1.label = item1.name
                  });
                }
              });
            }
          })
          _this.provenceList = dataList
        },
        error => {
          // reject(error);
        })
    },
    handleChange(value) {
      console.log(value);
    },
     // 导入
    importModle(param) {
      console.log(param);
      // let currentFileId = this.currentFileId
      var fd = new FormData()
      fd.append("file", param.file);
      importObjectExcelApi(fd).then(res => {
        if (res.code === 200) {
          this.$message({ type: "success", message: res.msg });
          this.currentPage = 1;
          this.getTableData()
        }
      }
      );
    },
  },
  mounted() {
    this.getTableData()
    this.findProvence()
    // 获取抽屉
    this.getDrawerList([{ name: '监管类型', option: 1 },
    { name: '对象类型', option: 2 }])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>