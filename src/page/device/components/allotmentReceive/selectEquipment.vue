<template>
  <el-dialog
    :title="dialogtitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="61%"
    class="fullscreen"
    append-to-body
  >
    <el-form
      class="search-form"
      :model="selectEquipmentForm"
      ref="selectEquipmentFormRef"
      label-position="right"
      label-width="80px"
      :inline="true"
    >
      <div>
        <el-row>
          <el-form-item label="装备名称" prop="name" class-form="form-class">
            <el-input v-model="selectEquipmentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="装备类型" prop="type" class-form="form-class">
            <el-select v-model="selectEquipmentForm.type" placeholder="请选择">
              <el-option label="类型1" value="1"></el-option>
              <el-option label="类型2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" class-form="form-class">
          <el-button
            title="搜素"
            class="commonBtn searchBtn"
            size="medium"
            icon="iconfont law-sousuo"
            @click="currentPage = 1; getEquipmentList();"
          ></el-button>
          <el-button
            title="重置"
            class="commonBtn searchBtn"
            size="medium"
            icon="iconfont law-zhongzhi"
            @click="resetLog"
          ></el-button>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
    <div>
      <el-table
        :data="tableData"
        resizable
        stripe
        style="width:100%"
        @selection-change="selectEquipment"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
        :max-height="280"
      >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column prop="no" label="装备编号" align="left" width="120px"></el-table-column>
        <el-table-column prop="name" label="装备名称" align="center" width="120px"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="100"></el-table-column>
        <el-table-column prop="type" label="装备类型" align="center" width="120px"></el-table-column>
        <el-table-column prop="model" label="品牌型号" align="center" min-width="140px"></el-table-column>
        <el-table-column prop="company" label="使用单位" min-width="140px" align="center"></el-table-column>
        <el-table-column
          prop="location"
          label="存放位置"
          min-width="160px"
          align="center"
          fixed="right"
        ></el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        :page-sizes="[10, 20, 30, 40, 50]"
        layout="prev, pager, next,sizes,jumper"
        :total="totalPage"
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="closeDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      selectEquipmentForm: {
        name: "",
        type: "",
      },
      visible: false,
      dialogtitle: "选择装备",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总数
      tableData: [
        {
          no: "202007110010",
          name: "笔记本电脑",
          status: "闲置",
          type: "基础办案类",
          model: "联想ThinkPad X1 Carbon 2020(04CD)",
          company: "北京市交通运输管理局",
          location: "京市丰台区六里桥莲花池西里 10号黄楼1层"
        },
      ],
      tableLoading: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    // 获取装备列表
    getEquipmentList() {},
    //获取选中的装备
    selectEquipment(val) {},
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getEquipmentList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getEquipmentList();
    },
    resetLog() {
      this.$refs["selectEquipmentFormRef"].resetFields();
      this.currentPage = 1;
      this.getEquipmentList();
    },
    closeDialog() {
      this.visible = false;
      this.$refs["selectEquipmentFormRef"].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.exam-person-dialog {
  >>> .el-dialog {
    min-width: 976px;
    max-width: 1016px;
  }
  >>> .el-dialog__body {
    padding-bottom: 10px;
  }
  .paginationBox {
    margin-top: 10px;
    text-align: center;
    >>> .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
  }
}
.search-form {
  >>> .el-form-item {
    margin-bottom: 10px;
  }
  >>> .el-input__inner {
    width: 176px;
  }
}
</style>