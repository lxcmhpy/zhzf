<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="80px" ref="logForm">
          <el-form-item label="基本信息" prop="type">
            <el-select v-model="logForm.type" prop="type">
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日志类型" prop="type">
            <el-select v-model="logForm.type" prop="type">
              <el-option v-for="item in pdfAndFormList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getPdfAndFormList">确认选择</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" size="medium" @click="getPdfAndFormList">添加字段</el-button>
          </el-form-item> -->
        </el-form>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
          <el-table-column prop="organ" label="属性名称" align="center"></el-table-column>
          <el-table-column prop="ip" label="中文名称" align="center"></el-table-column>
          <el-table-column prop="organ" label="校验规则" align="center"></el-table-column>
          <el-table-column prop="type" label="是否可编辑" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.value" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="是否必填" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.value" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="getRelation(scope.row)">值绑定</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-show="totalPage">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
    </div>
    <el-dialog title="绑定值" :visible.sync="dialogVisible" width="30%">
      
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="80px" ref="logForm">
          <el-form-item label="基本信息" prop="type" >
            <el-select v-model="logForm.type" prop="type" style='width:100px'>
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日志类型" prop="type">
            <el-select v-model="logForm.type" prop="type" style='width:100px'>
              <el-option v-for="item in pdfAndFormList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getPdfAndFormList" style="margin-left:20px">确认选择</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart" style="overflow:auto">
        <el-table :data="tableData" stripe resizable border style="width: 100%;height:400px;">
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
          <el-table-column prop="organ" label="属性名称" align="center"></el-table-column>
          <el-table-column prop="organ" label="中文名称" align="center"></el-table-column>
          <el-table-column prop="type" label="选择属性" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.value" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="organ" label="对应关系描述" align="center">
             <template slot-scope="scope">
              <el-input v-model="scope.value" clearable>
              </el-input>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [],
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      typeList: [{
        value: null,
        label: '基本信息'
      },
      {
        value: 0,
        label: '表单'
      },
      {
        value: 1,
        label: '文书'
      }],
      pdfAndFormList: [
        {
          value: 0,
          label: '立案登记'
        },
        {
          value: 1,
          label: '结案报告'
        }],
      isShow: false,
      dialogVisible:false
    };
  },
  methods: {
    //表单筛选
    getPdfAndFormList(val) {
      this.currentPage = val
      let data = {
        organ: this.logForm.organ,
        type: this.logForm.type,
        operation: this.logForm.operation,
        username: this.logForm.username,
        startTime: this.logForm.dateArray ? this.logForm.dateArray[0] : '',
        endTime: this.logForm.dateArray ? this.logForm.dateArray[1] : '',
        current: this.currentPage,
        size: this.pageSize
      };
      let _this = this
      this.$store.dispatch("getloglist", data).then(res => {
        _this.tableData = res.data.records;
        _this.totalPage = res.data.total;
      });
      err => {
        console.log(err);
      };
    },
    // 值绑定
    getRelation() {
      this.dialogVisible = true
    },
    // 关闭弹窗前
    handleClose() { },
    //展开
    showSomeSearch() {
      this.isShow = !this.isShow;
    },
    // 重置
    reset() {
      this.$refs["logForm"].resetFields();
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
    }
  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
    this.getPdfAndFormList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
