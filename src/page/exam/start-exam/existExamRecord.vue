<template>
  <el-dialog
    title="未参考人员"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="61%"
    class="exam-person-dialog"
  >
    <div style="margin-top: 14px;">
      <el-table
                :data="tableData"
                resizable
                stripe
                style="width: 100%;height:100%;"
                class="batch-table"
                v-loading="tableLoading"
                element-loading-spinner="car-loading"
                element-loading-text="加载中..."
              >
                <!-- <el-table-column type="selection" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号" align="center" min-width="100px"></el-table-column>
                <el-table-column prop="personName" label="姓名" align="left" min-width="100px"></el-table-column>
                <el-table-column prop="idNo" label="身份证号" align="center" width="174px"></el-table-column>
                <el-table-column prop="examStatue" label="考生状态" min-width="120px" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.examStatue === '0'" style="color: #20232B;">未答题</span>
                    <span v-if="scope.row.examStatue === '1'" style="color: #F19004;">答题中</span>
                    <span v-if="scope.row.examStatue === '2'" style="color: #18C061;">已交卷</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="420px" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="viewRecord(scope.row)">添加缺考原因</el-button>
                  </template>
                </el-table-column>
              </el-table>
    </div>
     <examRoomRecord ref="examRoomRecord" />
    <addNote ref="addNote" @getExamRoom="getNoteMsg"></addNote>
  </el-dialog>
</template>
<script>
import addNote from "./addNote";
import examRoomRecord from "./examRoomRecord";
export default {
  mixins: [],
  components: { addNote,examRoomRecord},
  data() {
    return {
      visible: false,

      personName: "",
      idNo: "",
      photoUrl: "",
      examData: {
        operationId: "",
        examId: "",
        roomId: "",
        invigilatorId: "",
        personId: "",
        operationType: "",
        rollingTime: "",
        operationDescription: "",
        type: "",
        happenTime: "",
      },
      paramDate: {
        invigilatorId: "",
        examId: "",
        examperId: "",
      },
      tableData: [],
      tableLoading: false,
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
    };
  },
  computed: {},
  methods: {
    //新增/修改
    addNote(data, type) {
      this.$refs.addNote.showModal(this.paramDate, data, type);
    },
    deleteNote(row) {
      let _this = this;
      _this
        .$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm",
        })
        .then(() => {
          this.$store.dispatch("deleteExamRecordInfo", row.operationId).then(
            (res) => {
              if (res.code == "200") {
                this.getNoteMsg();
              }
            },
            (err) => {
              this.$message({ type: "error", message: err.msg || "" });
            }
          );
        })
        .catch(() => {});
    },
       // 考场记录
    viewRecord(row) {
      let data = {
        invigilatorId: this.paramDate.invigilatorId,
        examId: this.paramDate.examId,
        examperIds: this.paramDate.examperIds,
        roomId: this.paramDate.roomId
      };
        this.$refs.examRoomRecord.showModal(row, data);
    },
    // 考场信息
    getNoteMsg() {
      let data = {
        invigilatorId: this.paramDate.invigilatorId,
        examId: this.paramDate.examId,
        examperId: this.paramDate.examperId,
      };
      this.tableLoading = true;
      this.$store.dispatch("examRecordQueryInfo", data).then(
        (res) => {
          this.tableLoading = false;
          if (res.code == "200") {
            this.tableData = res.data.data;
          }
        },
        (err) => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    showModal(examId,invigilatorId,roomId,examperIds) {
      this.paramDate.examId = examId;
      this.paramDate.invigilatorId = invigilatorId;
      this.paramDate.roomId = invigilatorId;
      this.paramDate.examperId = examperIds;
      this.visible = true;
        let data = {
        invigilatorId:invigilatorId,
        examId: examId,
        roomId: roomId,
        // personName: this.searchForm.personName,
        examStatue: "0",
    
      };
      this.tableLoading = true;
      this.$store.dispatch("examPersonsByInvigilatorId", data).then(
        res => {
          this.tableLoading = false;
          if (res.code == "200") {
            this.tableData = res.data.records;
            this.totalPage = res.data.total;
          }
        },
        err => {
          this.tableLoading = false;
          this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    closeDialog() {
      this.visible = false;
    },
  },
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