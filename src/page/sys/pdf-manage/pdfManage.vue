<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <el-form :inline="true" :model="pdfForm" label-width="80px" ref="pdfForm" :rules="pdfRule">

          <el-form-item label="类型" prop="bindType">
            <el-select v-model="pdfForm.bindType" @change="changeBindType(pdfForm.bindType)">
              <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="typeId" v-if="pdfForm.bindType=='2'">
            <el-select v-model="pdfForm.typeId">
              <el-option v-for="item in bindList" :key="item.id" :label="item.linkName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="typeId" v-if="pdfForm.bindType=='3'">
            <el-select v-model="pdfForm.typeId">
              <el-option v-for="item in bindPdfList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getPdfAndFormList('pdfForm',1)">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="goAddDia('pdfForm')">添加属性</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
          <el-table-column prop="bindProperty" label="属性名称" align="center"></el-table-column>
          <el-table-column label="中文名称" align="center">
            <template slot-scope="scope">
              {{scope.row.itemValue ||noValue}}
            </template>
          </el-table-column>
          <el-table-column label="校验规则" align="center" placeholder="无">
            <template slot-scope="scope">
              {{scope.row.checkRule ||noValue}}
            </template>
          </el-table-column>
          <el-table-column prop="isEditable" label="是否可编辑" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isEditable===true">是</span>
              <span v-if="scope.row.isEditable===false">否</span>
              <span v-if="scope.row.isEditable===''">{{noValue}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="是否必填" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isRequired===true">是</span>
              <span v-if="scope.row.isRequired===false">否</span>
              <span v-if="scope.row.isRequired===''">{{noValue}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="getRelation(scope.row)">值绑定</el-button>
              <el-button type="text" @click="goAddEditDia(scope.row)">修改</el-button>
              <el-button type="text" @click="goDelDia(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-show="totalPage">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
    </div>
    <!-- 绑定值 -->
    <el-dialog title="绑定值" :visible.sync="dialogVisible" width="800px" :before-close="handleBeforeCloseSet">
      <div class="handlePart">

        <el-form :inline="true" :model="setForm" label-width="80px" ref="setFormRef" :rules="bindSearchRule">
          <div style="background:#e9edf6;height: 40px;margin-bottom:22px;">
            <el-form-item label="当前操作" prop="bindType">
              <span style="width:150px;height:40px;display: inline-block;;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                {{setForm.bindProperty}}
              </span>

            </el-form-item>
            <el-form-item label="所属类型" prop="bindType">
              <el-select v-model="pdfForm.bindType" @change="changeBindType(pdfForm.bindType)" disabled style="width:80px">
                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文书或表单" prop="typeId" v-if="pdfForm.bindType=='2'" label-width="100px">
              <el-select v-model="pdfForm.typeId" disabled>
                <el-option v-for="item in bindList" :key="item.id" :label="item.linkName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文书或表单" prop="typeId" v-if="pdfForm.bindType=='3'" label-width="100px">
              <el-select v-model="pdfForm.typeId" disabled>
                <el-option v-for="item in bindPdfList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <el-form-item label="类型" prop="resourceType">
            <el-select v-model="setForm.resourceType" prop="type" style='width:120px' @change="changeResourceType">
              <el-option v-for="item in resourceTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="bindId" v-if="setForm.resourceType=='2'">
            <el-select v-model="setForm.bindId" style='width:240px' @change="changeResourceName">
              <el-option v-for="item in bindList" :key="item.id" :label="item.linkName" :value="item.id" :disabled="item.name==pdfForm.bindName"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="名称" prop="bindId" v-if="setForm.resourceType=='3'">
            <el-select v-model="setForm.bindId" style='width:240px' @change="changeResourceName">
              <el-option v-for="item in bindPdfList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.name==pdfForm.bindName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getPdfAndFormSetList('setFormRef')" style="margin-left:20px">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-bottom:22px">
        <el-row>
          <el-col :span="3">
            <el-button type="primary" size="medium" style="width: 96px;height: 54px;">对应关系</el-button>
          </el-col>
          <el-col :span="21">
            <el-input type="textarea" :rows="2" placeholder="请选择或输入内容，输入以{}分隔，如{a}{b}" v-model="setForm.resourceProperty" spellcheck=“false”>
            </el-input>
          </el-col>
        </el-row>

      </div>

      <div class="tablePart" style="overflow:auto">
        <el-table :data="resourceData" stripe resizable border style="width: 100%;height:400px;">
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
          <el-table-column prop="bindProperty" label="属性名称" align="center"></el-table-column>
          <el-table-column prop="itemValue" label="中文名称" align="center">
            <template slot-scope="scope">
              {{scope.row.itemValue ||noValue}}
            </template>
          </el-table-column>
          <el-table-column label="添加绑定" align="center">
            <template slot-scope="scope">
              <span @click="changeSet(scope.row)">
                <i class="el-icon-circle-plus"></i>添加

              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goSetForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加字段 -->
    <el-dialog :title="dialogTitle" :visible.sync="addVisible" width="400px" :before-close="handleBeforeClose">
      <el-form :model="editForm" label-width="85px" ref="editFormRef" :rules="addRule">
        <el-form-item label="属性名称" prop="bindProperty">
          <el-input v-model="editForm.bindProperty" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文名称">
          <el-input v-model="editForm.itemValue" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="校验规则">
          <el-select v-model="editForm.checkRule" placeholder="请选择">
            <el-option v-for="(item,index) in checkRuleList" :label="item.label" :value="item.label" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可编辑">
          <el-switch v-model="editForm.isEditable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="是否必填">
          <el-switch v-model="editForm.isRequired" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="goAddEdit('editFormRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { getAllPdfListApi, findSetListApi, saveOrUpdatePropertyApi, findAllSetListApi, getQueryLinkListApi, delBindApi } from '@/api/caseHandle.js'
export default {
  data() {
    return {
      noValue: '未设置',
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      dialogTitle: "",
      tableData: [],
      resourceData: [],
      pdfForm: {
        bindType: '1',
        bindName: "",
        typeId: ''
      },
      relation: '',
      typeList: [
        {
          id: '2',
          name: '表单'
        },
        {
          id: '3',
          name: '文书'
        },
        // {
        //   id: '1',
        //   name: '基本信息'
        // }
      ],
      resourceNameList: [],
      resourceTypeList: [

        {
          id: '2',
          name: '表单'
        },
        {
          id: '3',
          name: '文书'
        }, {
          id: '1',
          name: '基本信息'
        }],
      isShow: false,
      dialogVisible: false,
      addVisible: false,
      editForm: {
        resourceName: '',
        resourceType: '',
        resourceProperty: '',
        bindName: '',
        bindType: '',
        bindProperty: '',
        itemValue: '',
        typeId: '',
        isEditable: '',
        isRequired: '',
        checkRule: '',
      },
      dialogTitle: '',
      setForm: {},
      checkRuleList: [
        {
          value: 'validateIDNumber',
          label: '身份证'
        },
        {
          value: 'validatePhone',
          label: '手机号'
        },
        {
          value: 'validateEmail',
          label: '邮箱'
        },
        {
          value: 'numType',
          label: '整数'
        },
      ],
      pdfRule: {
        bindType: [{ required: true, message: "请选择类型", trigger: "blur" }],
        typeId: [{ required: true, message: "请选择名称", trigger: "blur" }],
      },
      addRule: {
        bindProperty: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      bindSearchRule: {
        bindId: [{ required: true, message: "请选择", trigger: "blur" }]
      },
      bindList: [],
      bindPdfList: [],
    };
  },
  methods: {
    changeBindType() {
      this.pdfForm.typeId = '';
    },
    changeResourceType(val) {
      this.setForm.resourceName = '';
      this.setForm.bindId='';
      this.getPdfAndFormSetList('setFormRef');
    },
    changeResourceName() {
      this.$alert('改变绑定的文书或者表单，原有对应关系将清空', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.setForm.resourceProperty = '';
          this.getPdfAndFormSetList('setFormRef');
        }
      });

    },
    //表单筛选
    getPdfAndFormList(formName, currentPage) {
      if (currentPage) {
        this.currentPage = currentPage
      }
      this.tableData = [];
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            // bindName: this.pdfForm.bindName,
            // bindType: this.pdfForm.bindType,
            typeId: this.pdfForm.typeId,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
          }
          findSetListApi(data).then(
            res => {
              console.log('列表', res)
              // this.pdfAndFormList = res.data.records
              console.log('pdfAndFormList', this.pdfAndFormList)
              this.tableData = res.data.records
              this.totalPage = res.data.total
              // 类型转换
              this.tableData.forEach(element => {
                if (element.isEditable == 'true') {
                  element.isEditable = true
                }
                if (element.isEditable == 'false') {
                  element.isEditable = false
                }
                if (element.isRequired == 'true') {
                  element.isRequired = true
                }
                if (element.isRequired == 'false') {
                  element.isRequired = false
                }
              });

            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getPdfAndFormSetList(formName) {
      console.log('search',this.setForm)
      if(this.setForm.resourceType=='1'){
        this.setForm.bindId='basic36b59bd27ff4b6fe96e1b06390d'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
              typeId: this.setForm.bindId
            }

          findAllSetListApi(data).then(
            res => {
              console.log('列表', res)
              this.resourceData = res.data
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    getList() {

    },
    // 值绑定
    getRelation(val) {
      this.resourceData = [];
      this.setForm.typeId = '';
      // var aa=resourceTypeList.find((item)=>{debugger ;return  item.value === data;})
      // console.log(aa)

      this.dialogVisible = true;
      console.log('值绑定', val)
      this.setForm = JSON.parse(JSON.stringify(val));

      if (this.setForm.resourceType == '2') {
        this.resourceNameList = this.bindList
      }
      if (this.setForm.resourceType == '3') {
        this.resourceNameList = this.bindPdfList
      }

      var _this = this
      this.$nextTick(() => {
        this.getPdfAndFormSetList('setFormRef');
      });
    },

    // 添加修改字段
    goAddEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editForm.bindName = this.pdfForm.bindName;
          this.editForm.bindType = this.pdfForm.bindType;

          // if (this.editForm.resourceProperty === '') {
          //   this.editForm.resourceProperty = '{' + this.editForm.bindProperty + '}'
          // }

          if (this.editForm.isEditable === '') {
            this.editForm.isEditable = true
          }
          if (this.editForm.isRequired === '') {
            this.editForm.isRequired = true
          }
          saveOrUpdatePropertyApi(this.editForm).then(res => {
            if (res.code == 200) {
              this.pdfAndFormList = res.data.records
              this.addVisible = false;
              this.$refs.editFormRef.resetFields();
              this.getPdfAndFormList('pdfForm');
              this.$message({
                type: "success",
                message: "操作成功"
              });
            } else {
              console.log("fail");
            }
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    changeSet(val) {
      console.log(val)
      this.setForm.resourceProperty += '{' + val.bindProperty + '}'
    },
    goSetForm() {
      console.log('this.setForm', this.setForm)
      saveOrUpdatePropertyApi(this.setForm).then(res => {
        if (res.code == 200) {
          this.pdfAndFormList = res.data.records
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "绑定成功"
          });
          this.getPdfAndFormList('pdfForm');
        } else {
          console.log("fail");
        }
      });
    },
    goAddDia(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogTitle = '添加字段';
          this.addVisible = true;
          this.editForm = {
            resourceName: '',
            resourceType: '',
            resourceProperty: '',
            bindName: '',
            bindType: '',
            bindProperty: '',
            itemValue: '',
            typeId: '',
            isEditable: '',
            isRequired: '',
            checkRule: '',
          },
            this.editForm.isRequired = false;
          this.editForm.isEditable = true;
          this.editForm.resourceType = '1';
          console.log('id', this.editForm)
          this.editForm.typeId = this.pdfForm.typeId;
          console.log(this.editForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    goAddEditDia(val) {
      this.dialogTitle = '修改字段';
      this.addVisible = true;
      this.editForm = JSON.parse(JSON.stringify(val));
      // this.editForm.bindId=this.pdfForm.typeId
      this.editForm.bindName = '调查类文书'
    },
    changSet() {

    },
    // 关闭弹窗前
    handleClose() {

    },
    //展开
    showSomeSearch() {
      this.isShow = !this.isShow;
    },

    //更改每页显示的条数
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = JSON.parse(JSON.stringify(val));
      this.getPdfAndFormList('pdfForm', val);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getPdfAndFormList('pdfForm', val);
    },

    // 表单抽屉表
    getFormList() {
      let data = {}
      getQueryLinkListApi(data).then(
        res => {
          console.log('抽屉表', res)
          this.pdfAndFormList = res.data
          this.bindList = res.data
        });
    },
    //  文书抽屉表 
    getPdfList() {
      let data = {
        size: 100
      }
      getAllPdfListApi(data).then(res => {
        if (res.code == 200) {
          console.log('文书抽屉表', res)
          // this.pdfAndFormList = res.data.records
          this.bindPdfList = res.data.records
        } else {
          console.log("fail");
        }
      });
    },

    handleBeforeClose(done) {
      // this.$refs['editFormRef'].resetFields()
      this.$refs.editFormRef.resetFields();
      console.log('清空', this.editForm)
      done()
    },
    handleBeforeCloseSet(done) {
      this.$refs['setFormRef'].resetFields()
      console.log('清空11111', this.editForm)
      done()
    },
    // 重置
    reset() {
      this.$refs["pdfForm"].resetFields();
      getPdfAndFormList('pdfForm');
    },
    // 删除
    goDelDia(val) {
      this.$alert('删除后不可恢复，确认删除？', '确认删除', {
        confirmButtonText: '确定',
        callback: action => {
          delBindApi(val).then(res => {
            if (res.code == 200) {
              this.getPdfAndFormList('pdfForm', 1);
            } else {
              console.log("fail");
            }
          });
        }
      });
    },
  },
  mounted() {
    // this.setDepartTable(this.data)
    this.getFormList();
    this.getPdfList();
    this.pdfForm.bindType = this.typeList[0].id
  },
  created() {
    // this.getPdfAndFormList(1);

  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
