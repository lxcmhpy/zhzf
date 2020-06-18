<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="25%"
    append-to-body
    class="fullscreen"
  >
    <el-form
      :model="examNode"
      label-position="right"
      label-width="100px"
      ref="examNodeRef"
      :rules="rules"
    >
      <div>
        <el-row>
          <el-form-item label="记录类型:" prop="operationType">
            <el-select
              v-model="examNode.operationType"
              placeholder="记录类型"
              remote
              @focus="getDictInfo('考试-记录类型','noteTypeList')"
            >
              <el-option
                v-for="value in noteTypeList"
                :key="value.id"
                :label="value.name"
                :value="value.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="发生时间:" prop="happenTime">
            <el-date-picker
              v-model="examNode.happenTime"
              format="yyyy-MM-dd hh:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="记录内容" prop="operationDescription" placeholder>
            <el-input type="textarea" rows="2" v-model="examNode.operationDescription"></el-input>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      filterText: "",
      isDisabled: true,
      visible: false,
      selectCurrentTreeName: "",
      noteTypeList: [],
      examNode: {
        operationId: "",
        examId: "", //考试编号
        invigilatorId: "", //监考id
        examperId: "", //考生Id
        operationType: "", //记录类型
        operationDescription: "", //原因
        type: "", //标识是记录类型0：还是交卷类型：1
        happenTime: "" //发生时间

              
      },
      rules: {
        operationType: [
          { required: true, message: "记录类型不能为空", trigger: "blur" }
        ],
        happenTime: [
          { required: true, message: "发生时间不能为空", trigger: "blur" }
        ],
        operationDescription: [
          { required: true, message: "记录内容不能为空", trigger: "blur" }
        ]
      },
      tableData: [], //表格数据
      departLevel: 0, //级别
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      currentOutlineId: "", //当前organ的id
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改2  查看3
    };
  },
  created(){
    this.getDictInfo('考试-记录类型','noteTypeList');
  },
  methods: {
    getDictInfo(name, codeName) {
      this.$store.dispatch("drawInfo", name).then(res => {
        if (res.code === 200) {
          if (codeName === "noteTypeList") {
            this.noteTypeList = res.data;
          }
        } else {
          console.info("没有查询到数据");
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getSelectOutline();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSelectOutline();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSelectOutline();
    },
    //提交
    submit() {
      let _this = this;
      if (_this.handelType == 1) {
        _this.$store.dispatch("addExamRecordInfo", _this.examNode).then(res => {
          if(res.data.code == 200){
            _this.$emit("getExamRoom");
            _this.$message({
              type: "success",
              message: "添加成功!"
            });
           _this.visible = false;
          }else{
             _this.$message({
              type: "error",
              message: "添加失败!"
            });
          }
          
        }, err =>{
          this.$message({ type: 'error', message: err.msg || '' });
        });
      } else if (_this.handelType == 2) {
        _this.$store
          .dispatch("updateExamRecordInfo", _this.examNode)
          .then(res => {
            if (res.data.code === 200) {
              _this.$emit("getExamRoom");
              _this.$message({
                type: "success",
                message: "修改成功!"
              });
            }
            _this.visible = false;
          }, err => {
            this.$message({ type: 'error', message: err.msg || '' });
          });
      }
    },
    showModal(row, date, type) {
      let _this = this;
      _this.visible = true;
      _this.handelType = type;
      _this.examNode.examperId = row.examperId;
      _this.examNode.invigilatorId = row.invigilatorId;
      _this.examNode.examId = row.examId;
      _this.examNode.roomId = row.roomId;
      if (type == 1) {
        //新增
        _this.dialogTitle = "添加考场记录";
        _this.isDisabled = false;
      } else if (type == 2) {
        //修改,查看
        _this.examNode.operationType = date.rollingType;
        _this.examNode.happenTime = date.happenTime;
        _this.examNode.operationDescription = date.forceReason;
        _this.examNode.operationId = date.rollingId;
        _this.dialogTitle = "修改考场记录";
        _this.isDisabled = false;
      }
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["examNodeRef"].resetFields();
      this.errorName = false;
    }
  }
};
</script>
<style lang="scss" scoped>
>>> .el-date-editor.el-input,
>>> .el-select {
  width: 100%;
}
</style>
