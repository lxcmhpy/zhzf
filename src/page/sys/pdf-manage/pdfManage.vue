<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <el-form :inline="true" :model="pdfForm" label-width="80px" ref="pdfForm">

          <el-form-item label="类型" prop="type">
            <el-select v-model="pdfForm.type" prop="type">
              <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="type">
            <el-select v-model="pdfForm.name" prop="type">
              <el-option v-for="item in pdfAndFormList" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getPdfAndFormList">确认选择</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="goAddEdit">添加字段</el-button>
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
              <el-switch v-model="scope.value" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="是否必填" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.value" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="getRelation(scope.row)">值绑定</el-button>
              <el-button type="text" @click="goAddEdit(scope.row)">修改属性</el-button>
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
        <el-form :inline="true" :model="pdfForm" label-width="80px" ref="pdfForm">
          <el-form-item label="基本信息" prop="type">
            <el-select v-model="pdfForm.type" prop="type" style='width:100px'>
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日志类型" prop="type">
            <el-select v-model="pdfForm.type" prop="type" style='width:100px'>
              <el-option v-for="item in pdfAndFormList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getPdfAndFormList" style="margin-left:20px">确认选择</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="padding-left：30px">
        <el-button type="primary" size="medium">对应关系</el-button>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="relation">
        </el-input>
      </div>

      <div class="tablePart" style="overflow:auto">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:400px;">
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
          <el-table-column prop="organ" label="属性名称" align="center"></el-table-column>
          <el-table-column prop="itemValue" label="中文名称" align="center"></el-table-column>
          <el-table-column prop="type" label="选择属性" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.value" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加字段 -->
    <el-dialog title="添加字段" :visible.sync="addVisible" width="400px">
      <el-form :model="editForm" label-width="85px">
        <el-form-item label="属性名称">
          <el-input v-model="editForm.bindProperty" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文名称">
          <el-input v-model="editForm.itemValue" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="校验规则">
          <el-select v-model="editForm.checkRule" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可编辑">{{editForm.isRequired?true:false}}
          <el-switch v-model="editForm.isEditable"></el-switch>
        </el-form-item>
        <el-form-item label="是否必填">
          <el-switch v-model="editForm.isRequired"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { getAllPdfListApi, findSetListApi } from '@/api/caseHandle.js'
export default {
  data() {
    return {
      noValue: '无',
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      dialogTitle:"",
      tableData: [],
      pdfForm: {
        organ: "",
        type: "",
        name: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      relation: '',
      typeList: [
        {
          id: 0,
          name: '表单'
        },
        {
          id: 1,
          name: '文书'
        }],
      pdfAndFormList: [
        {
          id: 0,
          name: '立案登记'
        },
        {
          id: 1,
          name: '结案报告'
        }],
      isShow: false,
      dialogVisible: false,
      addVisible: false,
      editForm: {
        name: '',
        region: '',
        delivery: ''
      }
    };
  },
  methods: {
    //表单筛选
    getPdfAndFormList(val) {
      let data = {
        bindName: this.pdfForm.name,
        // bindName:pdfForm.name
      }
      findSetListApi(data).then(
        res => {
          console.log('可移送列表', res)
          this.tableData = res.data.records
          this.totalPage = res.data.total
        });
    },
    // 值绑定
    getRelation() {
      this.dialogVisible = true;
    },
    // 添加修改字段
    goAddEdit(val) {
      console.log(val)
      this.addVisible = true;
      this.editForm = val
    },
    // 关闭弹窗前
    handleClose() { },
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
    //  文书抽屉表 
    getPdfList() {
      let data = {
        current: 1,
        size: 100
      }
      getAllPdfListApi(data).then(res => {
        if (res.code == 200) {
          console.log("1456", res);
          this.pdfAndFormList = res.data.records
          console.log("this.userNameList", this.userNameList);
        } else {
          console.log("fail");
        }
      });
    },
    // 环节抽屉表
    getFormList() {

    }
  },
  mounted() {
    // this.setDepartTable(this.data)
    this.getFormList();
    this.getPdfList();
  },
  created() {
    this.getPdfAndFormList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
