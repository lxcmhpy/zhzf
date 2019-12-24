<template>
  <div class="searchAndpageBox" id="roleBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search">查询</el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addBanner">新增</el-button>
            <el-button type="primary" size="medium" icon="el-icon-edit">修改</el-button>
            <el-button type="primary" size="medium" icon="el-icon-delete">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableDatas" stripe style="width: 100%" height="100%">
        <el-table-column type="index" width="60" align="center">
          <template slot="header">序号</template>
        </el-table-column>
        <el-table-column prop="name" label="环节名称" align="center">
        </el-table-column>
        <el-table-column prop="isApproval" label="是否有审批流程" align="center">
        </el-table-column>
        <el-table-column prop="backName" label="所属大环节名称" align="center">
        </el-table-column>
        <el-table-column prop="isAutoPdf" label="是否自动生成pdf" align="center">
        </el-table-column>
        <el-table-column prop="pdfType" label="生成PDF的对应文书类型" align="center">
        </el-table-column>
        <el-table-column prop="order" label="排序" align="center">
        </el-table-column>
        <el-table-column prop="adress" label="页面地址" align="center">
        </el-table-column>
        <el-table-column prop="discripe" label="描述" align="center">
        </el-table-column>
        <el-table-column prop="workId" label="工作流Id" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
    </div>
    <addEditBanner ref="addEditBannerRef"></addEditBanner>
  </div>
</template>
<script>
import addEditBanner from "./addEditBanner";
export default {
  data() {
    return {
      tableData: [], //表格数据
      dicSearchForm: {
        name: ''
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableDatas: [{
        name: '立案',
        isApproval: '是',
        backName: '立案',
        isAutoPdf: '是',
        pdfType: '立案登记表',
        pdfType: '立案登记表',
        order: '1',
        adress: '../../jdfhu',
        discripe: '描述',
        workId: '11'
      }, {
        name: '调查类文书',
        isApproval: '否',
        backName: '调查',
        isAutoPdf: '否',
        pdfType: '',
        order: '2',
        adress: './kdsj',
        discripe: '描述',
        workId: '21',
      }],
      formInline: {
        user: '',
        region: ''
      },
    };
  },
  components: {
    addEditBanner,
  },
  inject: ['reload'],
  methods: {
    //编辑环节
    editRole(row) {
      // this.$refs.addEditBannerRef.showModal(2, row);
    },
    //删除环节
    deleteRole(id) {
      // this.$confirm("确认删除该环节?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$store.dispatch("deleteRole", id).then(
      //       res => {
      //         this.$message({
      //           type: "success",
      //           message: "删除成功!"
      //         });
      //         this.reload();
      //       },
      //       err => {
      //         console.log(err);
      //       }
      //     );
      //   })
      //   .catch(() => { });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      // this.pageSize = val;
      // this.currentPage = 1;
      // this.getSelectOrgan();
    },
    //更换页码
    handleCurrentChange(val) {
      // this.currentPage = val;
      // this.getSelectOrgan();
    },
    //获取环节
    getBanner() {
      // let data = {
      //   current: this.currentPage,
      //   size: this.pageSize,
      //   name: this.dicSearchForm.name
      // };
      // this.$store.dispatch("getBanner", data).then(
      //   res => {
      //     console.log("环节列表", res);
      //     this.tableData = res.data.records;
      //     this.totalPage = res.data.total;

      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    },
    //添加环节
    addBanner() {
      this.$refs.addEditBannerRef.showModal(0, '');
    },
    //绑定菜单权限
    bindMenu(roleId) {
      // this.$refs.bindMenuRef.showModal(roleId);
    },
    //环节绑定机构
    bindOrgan(roleId) {
      // this.$refs.bindOrganRef.showModal(roleId);
    }
  },
  created() {
    // this.getBanner();
  }
};
</script>

<style lang="less">
@import "../../../css/systemManage.less";
</style>
