<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="38%"
  >
    <el-form
      :model="addTrainForm"
      label-position="right"
      label-width="130px"
      ref="addTrainForm"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="执法人员id 引用" prop="personId" v-show="false">
          <el-input v-model="addTrainForm.personId"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="培训类型:" prop="trainType">
          <el-select
            v-model="addTrainForm.trainType"
            placeholder="请输入培训类型"
            @change="selectVal($event)"
            @focus="getDictInfo('人员信息-培训类型')"
          >
            <el-option
              v-for="value in trainTypeInfo"
              :key="value.id"
              :label="value.name"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <!-- <el-row>
                <el-form-item label="培训时间:" prop="startTime">
                    <el-date-picker v-model="addTrainForm.startTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    placeholder="请选择培训时间" clearable></el-date-picker>
                </el-form-item>
      </el-row>-->
      <el-row>
        <el-form-item label="培训开始时间:" prop="trainBeginDate">
          <el-date-picker
            v-model="addTrainForm.trainBeginDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择培训开始时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="培训结束时间:" prop="trainEndDate">
          <el-date-picker
            v-model="addTrainForm.trainEndDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择培训结束时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <!-- <el-row>
                <el-form-item label="培训成绩:" prop="trainScore">
                    <el-input v-model="addTrainForm.trainScore"></el-input>
                </el-form-item>
      </el-row>-->
      <el-row>
        <el-form-item label="培训名称:" prop="trainName">
          <el-input v-model="addTrainForm.trainName" placeholder="请输入培训名称"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="培训结果:" prop="trainResult">
          <el-input v-model="addTrainForm.trainResult" placeholder="请输入培训结果"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="证书名称:" prop="trainCertName">
          <el-input v-model="addTrainForm.trainCertName" placeholder="请输入证书名称"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="证书编号:" prop="trainCertNo">
          <el-input v-model="addTrainForm.trainCertNo" placeholder="请输入证件编号"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog()">取 消</el-button>
      <el-button type="primary" @click="submit('addTrainForm')">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: "add", id: "" };
      },
      required: true
    }
  },
  data() {
    const validateExamBegin = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入培训开始时间"));
      } else {
        if (this.addTrainForm.trainEndDate !== "") {
          const beginTime = new Date(value).getTime();
          const endTime = new Date(this.addTrainForm.trainEndDate).getTime();
          if (beginTime - endTime > 0) {
            callback(new Error("培训开始时间不能大于结束时间"));
          } else {
            this.$refs.addTrainForm.clearValidate("trainEndDate");
          }
        }
        callback();
      }
    };
    const validateExamEnd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入培训结束时间"));
      } else {
        if (this.addTrainForm.trainBeginDate !== "") {
          const beginTime = new Date(this.addTrainForm.trainBeginDate).getTime();
          const endTime = new Date(value).getTime();
          if (beginTime - endTime > 0) {
            callback(new Error("培训结束时间不能小于开始时间"));
          } else {
            this.$refs.addTrainForm.clearValidate("trainBeginDate");
          }
        }
        callback();
      }
    };
    return {
      visible: false,
      trainTypeInfo: [], //培训类型下拉列表
      addTrainForm: {
        personId: this.params.id,
        trainType: "",
        trainBeginDate: "",
        trainEndDate: "",
        trainScore: "",
        trainName: "",
        trainOrg: "",
        trainCertName: "",
        trainCertNo: "",
        trainResult: "",
        note: ""
      },
      rules: {
        trainType: [
          { required: true, message: "培训类型必须填写", trigger: "change" }
        ],
        trainBeginDate: [
          { required: true, validator: validateExamBegin, trigger: "blur" }
        ],
        trainEndDate: [
          { required: true, validator: validateExamEnd, trigger: "blur" }
        ],
        trainName: [
          { required: true, message: "培训名称必须填写", trigger: "blur" }
        ],
        trainResult: [
          { required: true, message: "培训结果必须填写", trigger: "blur" }
        ]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改2
    };
  },
  created() {
    this.getDictInfo("人员信息-培训类型");
  },
  methods: {
    selectVal(event) {
      this.addTrainForm.trainType = event;
    },
    getDictInfo(name) {
      //根据数据字典查询
      let _this = this;
      _this.$store
        .dispatch("findAllDrawerByName", name)
        .then(
          res => {
            if (res.code === 200) {
              _this.trainTypeInfo = res.data;
            }
          },
          err => {
            console.log(err);
          }
        )
        .catch(() => {});
    },
    //提交
    submit() {
      let _this = this;
      _this.$refs.addTrainForm.validate(valid => {
        if (valid) {
          if (_this.handelType == 1) {
            _this.$store
              .dispatch("addTrainInfoMoudle", _this.addTrainForm)
              .then(
                res => {
                  _this.$emit("getTrainList");
                  _this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                  _this.closeDialog();
                  _this.visible = false;
                },
                err => this.$message.error(err.msg)
              );
          } else if (_this.handelType == 2) {
            _this.$store
              .dispatch("updateTrainInfoMoudle", _this.addTrainForm)
              .then(
                res => {
                  _this.$emit("getTrainList");
                  _this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  _this.closeDialog();
                  _this.visible = false;
                },
                err => this.$message.error(err.msg)
              );
          }
        } else {
          return false;
        }
      });
    },
    showModal(type, row) {
      let _this = this;
      _this.visible = true;
      _this.handelType = type;

      if (type == 1) {
        //新增
        this.dialogTitle = "新增";
      } else if (type == 2) {
        //修改
        _this.dialogTitle = "修改";
        _this.addTrainForm.trainId = row.trainId;
        _this.addTrainForm.personId = row.personId;
        _this.addTrainForm.trainType = row.trainType;
        _this.addTrainForm.trainBeginDate = row.trainBeginDate;
        _this.addTrainForm.trainEndDate = row.trainEndDate;
        _this.addTrainForm.trainScore = row.trainScore;
        _this.addTrainForm.trainName = row.trainName;
        _this.addTrainForm.trainOrg = row.trainOrg;
        _this.addTrainForm.trainCertName = row.trainCertName;
        _this.addTrainForm.trainCertNo = row.trainCertNo;
        _this.addTrainForm.trainResult = row.trainResult;
        _this.addTrainForm.note = row.note;
      }
    },
    //聚焦清除错误信息
    focusName() {
      let _this = this;
      _this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      let _this = this;
      _this.visible = false;
      _this.$refs["addTrainForm"].resetFields();
      for (const key in this.addTrainForm) {
        this.addTrainForm[key] = "";
      }
      _this.addTrainForm.personId = this.params.id;
      _this.errorName = false;
    }
  }
};
</script>

<style  lang="scss" scoped>
>>> .el-date-editor.el-input,
>>> .el-select {
  width: 100%;
}
>>> .el-icon-date {
  line-height: 32px;
}
</style>
