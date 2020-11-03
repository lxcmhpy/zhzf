<template>
  <div>
    <div style="margin: 20px 20px 40px;">
      <el-table
        style="width:100%;"
        :data="tableData"
        resizable
        stripe
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
      >
        <el-table-column type="index" width="100px" label="序号"></el-table-column>
        <!-- <el-table-column prop="topLevel" label="大纲类型"></el-table-column> -->
        <el-table-column prop="outlineName" label="大纲名称"></el-table-column>
        <el-table-column prop="easilyCount" label="简单"></el-table-column>
        <el-table-column prop="commonCount" label="一般"></el-table-column>
        <el-table-column prop="difficultCount" label="困难"></el-table-column>
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
      tableData: [],
      tableLoading: false
    };
  },
  computed: {
    pageId() {
      return this.$route.params.pageId;
    }
  },
  methods: {
    getPageDetailInfo() {
      let _this = this;
      let data = {
        pageId: this.pageId
      };
      _this.tableLoading = true;
      _this.$store.dispatch("questionDistribution", data).then(
        res => {
          _this.tableLoading = false;
          if (res.code === 200) {
            _this.tableData = res.data;
          }
        },
        err => {
          _this.tableLoading = false;
          // _this.$message({ type: "error", message: err.msg || "" });
        }
      );
    }
  },
  created() {
    this.getPageDetailInfo();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>
