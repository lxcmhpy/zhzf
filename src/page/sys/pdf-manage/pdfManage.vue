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
          <el-form-item label="名称" prop="bindName" v-if="pdfForm.bindType=='2'">
            <el-select v-model="pdfForm.bindName" >
              <el-option v-for="item in pdfAndFormList" :key="item.id" :label="item.linkName" :value="item.linkName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="bindName" v-if="pdfForm.bindType=='3'">
            <el-select v-model="pdfForm.bindName" >
              <el-option v-for="item in pdfAndFormList" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getPdfAndFormList()">确认选择</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="goAddDia('pdfForm')">添加字段</el-button>
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
              <el-switch v-model="scope.row.isEditable" active-color="#13ce66" inactive-color="#ff4949" disabled>
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="是否必填" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isRequired" active-color="#13ce66" inactive-color="#ff4949" disabled>
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="getRelation(scope.row)">值绑定</el-button>
              <el-button type="text" @click="goAddEditDia(scope.row)">修改属性</el-button>
              <el-button type="text" @click="goAddEditDia(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-show="totalPage">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
    </div>
    <!-- 绑定值 -->
    <el-dialog title="绑定值" :visible.sync="dialogVisible" width="800px">
      <div class="handlePart">
        <el-form :inline="true" :model="setForm" label-width="80px" ref="setFormRef">
          <el-form-item label="类型" prop="type">
            <el-select v-model="setForm.resourceType" prop="type" style='width:120px' @change="changeResourceType">
              <el-option v-for="item in resourceTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="type">
            <el-select v-model="setForm.resourceName" prop="type" style='width:240px'>
              <el-option v-for="item in resourceNameList" :key="item.id" :label="item.bindName" :value="item.bindName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getPdfAndFormList" style="margin-left:20px">确认选择</el-button>
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
          <el-table-column label="选择属性" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.relation" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
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
    <el-dialog :title="dialogTitle" :visible.sync="addVisible" width="400px">
      <el-form :model="editForm" label-width="85px" ref="editFormRef">
        <el-form-item label="属性名称">
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
import { getAllPdfListApi, findSetListApi, saveOrUpdatePropertyApi, findAllSetListApi, getQueryLinkListApi, } from '@/api/caseHandle.js'
export default {
  data() {
    return {
      noValue: '无',
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      dialogTitle: "",
      tableData: [],
      resourceData: [],
      pdfForm: {
        organ: "",
        bindType: '1',
        bindName: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
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
        }, {
          id: '1',
          name: '基本信息'
        }],
      pdfAndFormList: [],
      resourceNameList: [],
      resourceTypeList: [{
        id: '1',
        name: '基本信息'
      },
      {
        id: '2',
        name: '表单'
      },
      {
        id: '3',
        name: '文书'
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
        bindName: [{ required: true, message: "请选择名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    changeBindType() {
      this.pdfForm.bindName = '';
      this.pdfAndFormList = '';
      console.log(this.pdfForm.bindType)
      if(this.pdfForm.bindType=='2'){
        this.getFormList()
      }
      if(this.pdfForm.bindType=='3'){
        this.getPdfList()
      }
      
      // this.getPdfAndFormList()
    },
    changeResourceType() {
      this.pdfForm.bindName = '';
      this.pdfAndFormList = ''
      let data = {
        bindName: this.pdfForm.bindName,
        bindType: this.pdfForm.bindType,
        resourceName: this.pdfForm.resourceName,
        resourceType: this.pdfForm.resourceType
      }
      findSetListApi(data).then(
        res => {
          console.log('可移送列表', res)
          this.resourceNameList = res.data.records
          console.log('pdfAndFormList', this.pdfAndFormList)
          this.resourceData = res.data.records
        });
    },
    //表单筛选
    getPdfAndFormList() {
      let data = {
        bindName: this.pdfForm.bindName,
        bindType: this.pdfForm.bindType
      }
      findSetListApi(data).then(
        res => {
          console.log('可移送列表', res)
          this.pdfAndFormList = res.data.records
          console.log('pdfAndFormList', this.pdfAndFormList)
          this.tableData = res.data.records
          this.totalPage = res.data.total
          // 类型转换
          this.tableData.forEach(element => {
            if (element.isEditable == 'true') {
              element.isEditable = true
            }
            else {
              element.isEditable = false
            }
            if (element.isRequired == 'true') {
              element.isRequired = true
            }
            else {
              element.isRequired = false
            }
          });

        });
    },
    getList() {

    },
    // 值绑定
    getRelation(val) {
      this.dialogVisible = true;
      this.setForm = val;

    },

    // 添加修改字段
    goAddEdit(formName) {
      saveOrUpdatePropertyApi(this.editForm).then(res => {
        if (res.code == 200) {
          this.pdfAndFormList = res.data.records
          this.addVisible = false;
          this.getPdfAndFormList(this.pdfForm.bindType);
        } else {
          console.log("fail");
        }
      });
    },
    goSetForm() {
      saveOrUpdatePropertyApi(this.setForm).then(res => {
        if (res.code == 200) {
          this.pdfAndFormList = res.data.records
          this.dialogVisible = false;
          this.getPdfAndFormList(this.pdfForm.bindType);
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    goAddEditDia(val) {
      this.dialogTitle = '修改字段';
      this.addVisible = true;
      this.editForm = val;
    },
    // 关闭弹窗前
    handleClose() {

    },
    //展开
    showSomeSearch() {
      this.isShow = !this.isShow;
    },
    // 重置
    reset() {
      this.$refs["pdfForm"].resetFields();
      this.getPdfAndFormList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPdfAndFormList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getPdfAndFormList(val);
    },

    // 表单抽屉表
    getFormList() {
      let data = {}
      getQueryLinkListApi(data).then(
        res => {
          console.log('抽屉表', res)

          this.pdfAndFormList = res.data
        });
    },
    //  文书抽屉表 
    getPdfList() {
      let data = {}
      getAllPdfListApi(data).then(res => {
        if (res.code == 200) {
          console.log('文书抽屉表', res)
          this.pdfAndFormList = res.data.records
        } else {
          console.log("fail");
        }
      });
    },
  },
  mounted() {
    // this.setDepartTable(this.data)
    this.getFormList();
    this.pdfForm.bindType = this.typeList[0].id
  },
  created() {
    // this.getPdfAndFormList(1);

  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
