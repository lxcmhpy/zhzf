<template>
  <div class="height100">
    <div class="handlePart">
      <div class="search toggleBox">
        <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
          <el-form :inline="true" :model="searchForm" class ref="searchForm">
            <el-form-item label="姓名：" prop='name'>
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="单位：" prop='selectValue'>
              <!-- <el-input v-model="searchForm.company"></el-input>
            </el-form-item>
            <el-form-item label="查询范围" prop='selectValue'> -->
              <el-select v-model="searchForm.selectValue">
                <el-option v-for="item in searchType" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
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
              <a class="el-button el-button--primary el-button--medium" href="./static/excel/检查专家模板.xlsx" download="检查专家模板.xlsx">Excel模板导出</a>
              <!-- <el-button type="primary" size="medium" icon="el-icon-search" @click="downloadModle">Excel模板导出</el-button> -->
            </el-form-item>
            <el-form-item>
              <el-upload style="width: auto;display: inline-block;" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="importModle">
                <el-button type="primary" size="medium">导入Excel</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="exportMethod('exportExpert','检查专家表.xls')">导出所有专家</el-button>
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
    <el-dialog :title='dialogStatus+"检查专家"' :close-on-click-modal="false" :visible.sync="dialogFormVisible" @close="resetForm('addForm')">
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
               <el-popover placement="bottom" trigger="click" style="z-index:3300" v-model="visiblePopover">
                <div class="departOrUserTree" style="width:600px;height:436px">
                  <div class="treeBox" style="height: 100%;">
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
                <el-input slot="reference" v-model="addForm.company" placeholder="请选择机构" :disabled="true" style="width:100%">
                </el-input>
              </el-popover>
              <!-- <el-input v-model="addForm.company"></el-input> -->
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
              <el-input v-model="addForm.fixedTelephone"></el-input>
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
import { getAllExpertApi, addExpertApi, getDictListDetailByNameApi, delExpertApi, importExpertExcelApi, exportExpertApi } from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinPerson } from "@/common/js/personComm";
import { mixinInspection } from "@/common/js/inspectionComm";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
export default {
  mixins: [mixinPerson, mixinInspection],
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      organData: [],//机构列表
      defaultExpandedKeys: [],
      visiblePopover: false,
      multipleSelection: [],
      searchForm: {
        company: "",
        name: '',
        selectValue: 0
      },
      isShow: false,
      addForm: {
        name: '',
        sex: '',
        expertNum: '',
        company: '',
        companyId: '',
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
        status: '启用',
      },
      formLabelWidth: '100px',
      // dialogStatus: '',
      rules: {
        sex: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        company: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        politicalStatus: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        unitAddress: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        job: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        status: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        name: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        contactType: [
          { validator: validatePhone, trigger: "blur" }
        ],
        fixedTelephone: [
          { validator: validatePhone, trigger: "blur" }
        ],
      },
      optionsZC: [],
      optionsZZMM: [],
      optionsZYLY: [],
      searchType: [{ value: 0, label: '本单位' }, { value: 1, label: '本单位及子单位' }],
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
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
      this.addForm.company = data.label;
      this.addForm.companyId = data.id;
      this.visiblePopover = false;
    },
    // 查询列表时
    getTableData() {
      let data = {
        name: this.searchForm.name,
        company: iLocalStroage.gets("userInfo").organName,
        organId: this.searchForm.selectValue==1?iLocalStroage.gets("userInfo").organId:'',
        current: this.currentPage,
        size: this.pageSize,
      };
      this.getPageList("getAllExpert", data);
    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
          return false;
        }
      });
    },
    delMethod(id) {
      this.deleteById("delExpert", id);
    },
    // 导入
    importModle(param) {
      // let currentFileId = this.currentFileId
      var fd = new FormData()
      fd.append("file", param.file);
      importExpertExcelApi(fd).then(res => {
        if (res.code === 200) {
          this.$message({ type: "success", message: res.msg });
          this.currentPage = 1;
          this.getTableData()
        }
      }
      );
    },
    radomExpertNum() {
      return Math.random() * 100 + 10000;
    },
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
    // exportMethod() {
    //   exportExpertApi().then(res => {
    //    // debugger
    //     // this.getObjectURL(res)
    //     console.log('res:',res);
    //    // let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' }); //需要下载的文件格式，xls文件
    //   //  console.log('blob',blob)
    //     //浏览器兼容，Google和火狐支持a标签的download，IE不支持
    //     if (window.navigator && window.navigator.msSaveBlob) {
    //       //IE浏览器、微软浏览器
    //       /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
    //         IE可不重命名，以防万一，所以都写上比较好 */
    //       //window.navigator.msSaveBlob(blob, '检查专家表.xls');
    //     } else {
    //       //其他浏览器
    //       let link = document.createElement('a'); // 创建a标签
    //       link.style.display = 'none';
    //       link.setAttribute('download','检查专家表.xls')
    //       let objectUrl = URL.createObjectURL(res);
    //       link.href = objectUrl;
    //       link.click();
    //      URL.revokeObjectURL(objectUrl);
    //     }
    //   }
    //   ).catch(err=>{console.log(err);throw new Error(err)})
    // },
  },
  mounted() {
    this.getTableData()
    // 获取抽屉
    this.getDrawerList([
      { name: '职称', option: 2 },
      { name: '专业领域', option: 3 },
      { name: '人员信息-政治面貌', option: 4 }])
    this.getAllOrgan('root');
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>