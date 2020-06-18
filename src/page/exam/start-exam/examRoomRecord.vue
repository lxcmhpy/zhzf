<template>
  <el-dialog
    title="考场记录"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="61%"
    class="exam-person-dialog"
  >
    <div class="examinee-info">
      <div>
        <img
          v-if="photoUrl"
          :src="baseUrl + photoUrl"
          width="160px"
          height="224px"
        />
        <img
          v-else
          :src="personImg"
          width="160px"
          height="224px"
        />
      </div>
      <div class="name-info">
        <p>
          姓名：
          <span>{{personName}}</span>
        </p>
        <p>
          身份证号：
          <span>{{idNo}}</span>
        </p>
      </div>
    </div>
    <el-button type="primary" icon="el-icon-plus" size="medium" @click="addNote('','1')">添加记录</el-button>
    <div style="margin-top: 14px;">
      <el-table
        :data="tableData"
        resizable
        stripe
        style="width:100%"
        v-loading="tableLoading"
        element-loading-spinner="car-loading"
        element-loading-text="加载中..."
        :max-height="280"
      >
        <el-table-column prop="roomName" label="考场" align="center" width="100px"></el-table-column>
        <el-table-column prop="operationTypeName" label="记录类型" align="center" width="100px"></el-table-column>
        <el-table-column prop="happenTime" label="发生时间" align="center" width="170px">
          <template slot-scope="scope">
            <span>{{ scope.row.happenTime ? scope.row.happenTime : scope.row.rollingTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="modifyTime" label="记录时间" align="center" width="170px"></el-table-column>
        <el-table-column prop="operationDescription" label="记录内容" align="center" min-width="100px"></el-table-column>
        <el-table-column label="操作" width="140px" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="addNote(scope.row,'2')">修改</el-button>
            <el-button type="text" @click="deleteNote(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addNote ref="addNote" @getExamRoom="getNoteMsg"></addNote>
  </el-dialog>
</template>
<script>
import addNote from "./addNote";
export default {
  mixins: [],
  components: { addNote },
  data() {
    return {
      visible: false,

      personName: "",
      idNo: "",
      photoUrl: "",
      examData: {
        operationId:'',
        examId: "",
        roomId: "",
        invigilatorId: "",
        personId: "",
        operationType: "",
        rollingTime: "",
        operationDescription: "",
        type: "",
        happenTime: ""
      },
      paramDate: {
        invigilatorId: "",
        examId: "",
        examperId: ""
      },
      tableData: [],
      tableLoading: false,
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
    };
  },
  computed: {
    baseUrl() {
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  methods: {
    //新增/修改
    addNote(data, type) {
      this.$refs.addNote.showModal(this.paramDate, data, type);
    },
    deleteNote(row) {
      let _this = this;
      _this .$confirm("确认删除吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            iconClass: "el-icon-question",
            customClass: "custom-confirm"
          })
          .then(() => {
               this.$store.dispatch("deleteExamRecordInfo", row.operationId).then(
        res => {
          if (res.code == "200") {
            this.getNoteMsg();
          }
        },
        err => {
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
          })
          .catch(() => {});
 
    },
    // 考场信息
    getNoteMsg() {
      let data = {
        invigilatorId: this.paramDate.invigilatorId,
        examId: this.paramDate.examId,
        examperId: this.paramDate.examperId
      };
      this.tableLoading = true;
      this.$store.dispatch("examRecordQueryInfo", data).then(
        res => {
          this.tableLoading = false;
          if (res.code == "200") {
            this.tableData = res.data.data;
          }
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    showModal(data, data1) {
      this.tableData.splice(0, this.tableData.length);
      this.personName = data.personName;
      this.idNo = data.idNo;
      this.photoUrl = data.photoUrl;
      this.paramDate.invigilatorId = data1.invigilatorId;
      this.paramDate.examId = data1.examId;
      this.paramDate.examperId = data.examperId;
      this.visible = true;
      this.getNoteMsg();
    },
    closeDialog() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.exam-person-dialog {
  >>> .el-dialog {
    margin: 0 auto;
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
  .examinee-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .name-info {
      font-size: 24px;
      color: rgba(153, 153, 153, 1);
      line-height: 38px;
      margin-left: 20px;
      > p span {
        color: #20232b;
      }
    }
  }
}
</style>