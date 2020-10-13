<template>
  <div class="height100">
    <div class="handlePart">
      <div class="search toggleBox">
        <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
          <el-form :inline="true" :model="searchForm" class ref="searchForm">
            <el-form-item label="对象名称：" prop='objectName'>
              <el-input v-model="searchForm.objectName"></el-input>
            </el-form-item>
            <el-form-item label="项目名称：" prop='projectName'>
              <el-input v-model="searchForm.projectName"></el-input>
            </el-form-item>
            <el-form-item label="查询范围" prop='selectValue'>
              <el-select v-model="searchForm.selectValue">
                <el-option v-for="item in searchType" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
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
              <el-button type="primary" size="medium" icon="el-icon-search" @click="exportMethod('检查对象表.xls')">导出所有对象</el-button>
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
        <el-table-column prop="regulatoryUnit" label="监管单位" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text">修改</el-button>
            <el-button type="text" @click="delMethod(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
    </div>
    <el-dialog :title='dialogStatus+"检查对象"' :close-on-click-modal="false" :visible.sync="dialogFormVisible" @close="resetForm('addForm')">
      <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addForm">
        <el-form-item label="对象名称" prop="objectName">
          <el-input v-model="addForm.objectName"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码" prop="socialCode" label-width="140px">
              <el-input v-model="addForm.socialCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- {{addForm.adminDivision}} -->
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
        <el-form-item label="监管单位" prop="regulatoryUnit" class="lawPersonBox-aline organClass">
          <el-popover placement="bottom" trigger="click" style="z-index:3300" v-model="visiblePopover">
            <div class="departOrUserTree" style="width:600px;height:436px">
              <div class="treeBox">
                <el-tree class="filter-tree" :data="organData" :props="defaultProps" node-key="id" :filter-node-method="filterNode" :default-expanded-keys="defaultExpandedKeys" @node-expand="nodeExpand" ref="tree" @node-click="handleNodeClick1">
                  <span class="custom-tree-node" slot-scope="{ node,data }">
                    <span>
                      <i :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"></i>
                      <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
                    </span>
                  </span>
                </el-tree>
              </div>
            </div>
            <el-input slot="reference" v-model="addForm.regulatoryUnit" placeholder="请选择机构" :disabled="true" style="width:100%">
            </el-input>
          </el-popover>
        </el-form-item>
        <!-- <el-form-item label="监管单位" prop="regulatoryUnit">
          <el-select v-model="addForm.regulatoryUnit" placeholder="请选择">
            <el-option v-for="item in optionsJGDW" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item> -->
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
import {
  getAllRandomObjectApi, addInspectionObjectApi, getDictListDetailByNameApi, delRandomObjectApi,
  findByAddressCode, importObjectExcelApi, exportObjectApi
} from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinInspection } from "@/common/js/inspectionComm";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
export default {
  mixins: [mixinInspection],
  data() {
    return {
      multipleSelection: [],
      searchForm: {
        objectName: "",
        projectName: '',
        selectValue: 0
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
        status: '启用',
      },
      formLabelWidth: '125px',
      dialogStatus: '',
      rules: {
        objectName: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        projectName: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        superviseType: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        socialCode: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        objectType: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        idCard: [
          { validator: validateIDNumber, trigger: "blur" }
        ],
        contactNumber: [
          { validator: validatePhone, trigger: "blur" }
        ],
        status: [
          { required: true, message: "必填项", trigger: "change" }
        ],
      },
      optionsDXLX: [],
      optionsJGDW: [],
      optionsJGLX: [],
      provenceList: [],
      LawOfficerList: [],//执法人员列表
      alreadyChooseAdminPerson: [],//已选择管理人员列表
      alreadyChooseUserPerson: [],//已选择使用人员列表
      defaultExpandedKeys: [],
      organData: [],//机构列表
      lawCateList: [], //业务领域列表
      globalCont: 1,//key1
      globalContGroup: 1,//key1
      defaultProps: {
        children: "children",
        label: "label"
      },
      visiblePopover: false,
      searchType: [{ value: 0, label: '本机构' }, { value: 1, label: '本机构及子机构' }],
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      this.tableData=[]
      let data = {
        projectName: this.searchForm.projectName,
        objectName: this.searchForm.objectName,
        regulatoryUnit: iLocalStroage.gets("userInfo").organName,
        organId:  this.searchForm.selectValue==1?iLocalStroage.gets("userInfo").organId:'',
        current: this.currentPage,
        size: this.pageSize,
      };
      this.getPageList("getAllRandomObject", data);

    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.defaultDisplay = true
      this.getTableData()
    },
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(_this.addForm))
          data.adminDivision = _this.addForm.adminDivision ? _this.addForm.adminDivision.join(',') : ''
          addInspectionObjectApi(data).then(
            res => {
              if (res.code == 200) {
                _this.$message({
                  type: "success",
                  message: res.msg
                });
                _this.dialogFormVisible = false
                _this.currentPage = 1;
                _this.getTableData()
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
            if (element.myChildren) {
              element.value = element.adcode;
              element.label = element.name
              element.children = element.myChildren
              element.myChildren.forEach(item => {
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
    editClick(row) {
      let data = JSON.parse(JSON.stringify(row))
      data.adminDivision = data.adminDivision ? data.adminDivision.split(',') : ''
      this.editMethod(data)
    },
    handleChange(value) {
      console.log(value);
    },
    // 导入
    importModle(param) {
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 获取机构
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
          if (organId == "root") {
            _this.currentOrganId = res.data[0].id;
          } else {
            _this.currentOrganId = organId;
          }
        },
        err => {
        }
      );
    },
    handleNodeClick1(data) {
      this.addForm.regulatoryUnit = data.label;
      this.addForm.regulatoryUnitId = data.id;
      this.visiblePopover = false;
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
    },
    // 导出
    exportMethod(fileName) {
      let data = {
        organName: iLocalStroage.gets("userInfo").organName
      }
      exportObjectApi(data).then(res => {
        //浏览器兼容，Google和火狐支持a标签的download，IE不支持
        //其他浏览器
        let link = document.createElement('a'); // 创建a标签
        link.style.display = 'none';
        link.setAttribute('download', fileName)//必须要重命名
        let objectUrl = URL.createObjectURL(res);
        link.href = objectUrl;
        link.click();
        URL.revokeObjectURL(objectUrl);
      },
      ).catch(err => { console.log(err); throw new Error(err) })
    },
  },
  mounted() {
    this.getTableData()
    this.findProvence()
    this.getAllOrgan('root');
    // 获取抽屉
    this.getDrawerList([{ name: '监管类型', option: 1 },
    { name: '对象类型', option: 2 }])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>
<style lang="scss" src="@/assets/css/systemManage.scss"></style>