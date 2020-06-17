<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        resizable
        stripe
        style="width:100%"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
      >
        <el-table-column type="index" width="100PX" label="序号"></el-table-column>
        <el-table-column prop="modifyName" label="审核人"></el-table-column>
        <el-table-column prop="modifyTime" label="审核时间"></el-table-column>
        <el-table-column prop="verifyResult" label="审核结果" :formatter="resultFormatter"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
export default {
  name: "addplayDetail", //审核详情
  mixins: [mixinPerson],
  data() {
    return {
      tableData: []
    };
  },
  computed: {
    pageId() {
      return this.$route.params.pageId;
    }
  },
  methods: {
    resultFormatter(row) {
      if (row.verifyResult === "0") {
        return "通过";
      } else if (row.verifyResult === "1") {
        return "不通过";
      }
    },
    getPageApplayInfo() {
      let _this = this;
      let data = {
        pageId: this.pageId
      };
      // _this.getPageList("pageVerifyListByPageId",data);
      _this.$store.dispatch("pageVerifyListByPageId", data).then(
        res => {
          if (res.code === 200) {
            _this.tableData = res.data;
          }
        },
        err => {
          loading.close();
          _this.$message({ type: "error", message: err.msg || "" });
        }
      );
    }
  },
  created() {
    let _this = this;
    _this.getPageApplayInfo();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>
