<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="visible = false"
    :close-on-click-modal="false"
    width="60%"
    class="images-dialog"
  >
    <div>
      <!-- <BaseTable
        @handleClick="handleClick"
        @handleChange="handleChange"
        :inputList="inputList"
        :columns="columns"
        :url="url"
        :isSelection="true"
        :isNumber="true"
      ></BaseTable>-->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleData()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
// import { findNoticeByPage } from "@/api/notice/notice";
// import BaseTable from "@/components/baseTable";
export default {
  //   components: { BaseTable },
  data() {
    return {
      visible: false,
      title: "",
      host: iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST,

      url: "/case/road/roadLcDeploy/list",
      inputList: [
        {
          label: "名称",
          prop: "strName",
          placeholder: "请输入名称",
          disabled: false,
        },
      ],
      columns: [
        {
          label: "名称",
          align: "center",
          prop: "strName",
        },
        {
          label: "文号",
          align: "center",
          prop: "strNumber",
        },
        {
          label: "发布机关",
          align: "center",
          prop: "strOrgan",
        },
        {
          label: "发布日期",
          align: "center",
          prop: "dtmDate",
        },
        {
          label: "实施日期",
          align: "center",
          prop: "shiDate",
        },
      ],
    };
  },
  methods: {
    showModal() {
      this.title = "新增";
      this.visible = true;

      //   this.getDataList(this.searchForm);
    },

    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    handleData() {
      this.$emit("handle-data", this.form);
      this.closeDialog();
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.images-dialog {
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border: 1px dashed #cccccc;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
}
</style>