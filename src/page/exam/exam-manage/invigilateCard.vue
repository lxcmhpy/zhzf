<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="38%"
  >
    <div>
      <div class="header">
        <div class="handlePart">
          <div class="title">
            <p>道路运输驾驶员</p>
            <p>准考证</p>
          </div>
          <div class="top">
           <p><span>姓名：张三</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span >性别：男</span></p>
            <p>工作单位：北京交通运输管理局</p>
             <p>身份证号码：182738783784738473</p>
             <p>考试地点：北京交通运输管理局</p>
             <p>考&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;场：测试101</p>
             <p>考试时间：2020年4月30日</p>
          </div>
          <div class="top1">
            <img
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=845265002,1740826154&fm=26&gp=0.jpg"
              width="200"
              height="250"
            />
          </div>
        </div>
      </div>

    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      examTypeInfo: [],
      examBatchSortInfo: [],
      isDisabled: true,
      visible: false,
      addExamBatchForm: {
        examBatchName: "",
        examBatchType: "",
        examBatchTypeName: "",
        examBatchSort: "",
        examBatchCount: "",
        examBatchReadyStartTime: "",
        examBatchReadyEndTime: "",
        remark: ""
      },
      rules: {
        examBatchName: [
          { required: true, message: "考试名称不能为空", trigger: "blur" }
        ],
        examBatchCount: [
          { required: true, message: "考试人数不能为空", trigger: "blur" }
        ],
        examBatchReadyStartTime: [
          { required: true, message: "考试开始时间不能为空", trigger: "blur" }
        ],
        examBatchReadyEndTime: [
          { required: true, message: "考试结束时间不能为空", trigger: "blur" }
        ]
      },
      tableDate: [{ name: "test" }],
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改2  查看3
    };
  },
  methods: {
      //新增记录
      addRecord(){
          alert("aa");
          this.closeDialog();
         this.$emit("getPageComp",'add');
      },
    //提交
    submit() {
      let _this = this;
      if (_this.addExamBatchForm.examBatchName === "") {
        _this.$message({
          type: "warning",
          message: "考试名称不能为空"
        });
        return;
      }
      if (_this.addExamBatchForm.examBatchCount === "") {
        _this.$message({
          type: "warning",
          message: "考试人数不能为空"
        });
        return;
      }
      if (_this.addExamBatchForm.examBatchReadyStartTime === "") {
        _this.$message({
          type: "warning",
          message: "考试开始时间不能为空"
        });
        return;
      }
      if (_this.addExamBatchForm.examBatchReadyEndTime === "") {
        _this.$message({
          type: "warning",
          message: "考试结束时间不能为空"
        });
        return;
      }
      if (_this.handelType == 1) {
        _this.$store
          .dispatch("addExamOutlineInfo", _this.addExamBatchForm)
          .then(res => {
            _this.$emit("getExamBatchListComp");
            _this.$message({
              type: "success",
              message: "添加成功!"
            });
            _this.visible = false;
          });
        err => {
          console.log(err);
        };
      } else if (_this.handelType == 2) {
        _this.$store
          .dispatch("updateExamOutlineInfo", _this.addExamBatchForm)
          .then(res => {
            _this.$emit("getExamBatchListComp");
            _this.$message({
              type: "success",
              message: "修改成功!"
            });
            _this.visible = false;
          });
        err => {
          console.log(err);
        };
      }
    },
    showModal(type, row) {
      let _this = this;
      _this.visible = true;
      _this.handelType = type;
      if (type == 1) {
        //新增
        _this.dialogTitle = "考场记录";
        _this.isDisabled = false;
      } else if (type == 2) {
        //修改,查看
        if (type == 2) {
          _this.dialogTitle = "修改考试";
          _this.isDisabled = false;
        } else if (type == 3) {
          _this.dialogTitle = "考试详情";
          _this.isDisabled = true;
        }
      }
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      //this.$refs["addExamBatchFormRef"].resetFields();
      this.errorName = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
   margin: 0% auto auto auto;
   text-align: center;
  font-size: 23px;
  font-weight: 800;
  
}
.top {
  margin: 4% auto auto 2%;
  width: 45%;
  height: 100%;
  font-size: 18px;
  font-weight: 900;
  line-height: 200%;
  float: left;
}
.top1 {
  margin: 2% auto auto 0%;
  width: 42%;
  line-height: 180%;
  height: 100%;
  float: right;
  text-align: left;
  font-size: 23px;
  font-weight: 800;
}
.header {
  //  width: 100%;
  height: 350px;
  //  background-color:;
}
</style>
