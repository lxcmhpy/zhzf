<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="60%"
    append-to-body
  >
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="search"  style="height:30px;">
            <el-form :inline="true" :model="bnslawSearchForm" ref="bnslawSearchForm">
              <el-form-item label="法规名称" prop="strName">
                <el-input v-model="bnslawSearchForm.strName" placeholder="输入法规名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="getBtnlawListSearch(1)"></el-button>
                <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="resetForm('bnslawSearchForm')"></el-button>
              </el-form-item>
            </el-form>
        </div>
            <div class="tablePart">
              <el-table :data="tableData" stripe style="width: 100%;height:520px;">
                <el-table-column prop="strName" label="法规标题" align="left"></el-table-column>
              </el-table>
            </div>
            <div class="paginationBox">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next,sizes,jumper"
                :total="totalPage"
              ></el-pagination>
            </div>
        </el-col>
        <el-col :span="16">
          <div class="graybg"></div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="">确 定</el-button> -->
      </span>
  </el-dialog>
</template>

<script>
import { getBnsLawListApi } from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      bnslawSearchForm: {
        strName: "",
        strNumber: ""
      },
      visible: false,
      dialogTitle: "", //弹出框title
      errorName: false //添加name时的验证
    };
  },
  inject: ["reload"],
  created() {
    this.getBtnlawList();
  },
  methods: {
    showModal(type, data, formType) {
      this.visible = true;
      this.dictData = data.row;
      this.formType = formType;
      this.dialogTitle = "绑定法条";
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["bnslawSearchForm"].resetFields();
      this.visible = false;
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //获取法规列表
    getBtnlawList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        strName: this.bnslawSearchForm.strName
      };
      let _this = this;
      getBnsLawListApi(data).then(
        res => {
          console.log("res", res), (_this.tableData = res.data.records);
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error);
        }
      );
    },
    // 查询
    getBtnlawListSearch() {
      this.currentPage = 1;
      this.getBtnlawList();
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getBtnlawList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getBtnlawList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBtnlawList();
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>