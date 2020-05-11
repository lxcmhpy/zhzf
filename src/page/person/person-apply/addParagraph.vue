<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form
      :model="addPersonForm"
      :rules="rules"
      label-position="right"
      label-width="80px"
      ref="paragraphForm"
    >
      <!-- <el-row style="height:36px;">
        <el-form-item label="年份" prop="reviewYear">
          <el-select
            v-model="addPersonForm.reviewYear"
            placeholder="年份"
            remote
            @focus="getYear('年份','getYearList')"
          >
            <el-option
              v-for="value in getYearList"
              :key="value.id"
              :label="value.name"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row> -->
      <el-row >
        <el-form-item label="年份" prop="reviewYear">
          <el-input v-model="addPersonForm.reviewYear" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row >
        <el-form-item label="成绩" prop="reviewScore">
          <el-select
            v-model="addPersonForm.reviewScore"
            placeholder="成绩"
            @focus="getDepatements('人员年审-年审成绩','resultList')"
          >
            <el-option
              v-for="value in resultList"
              :key="value.id"
              :label="value.name"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注:" prop="note">
          <el-input v-model="addPersonForm.note" type="textarea" rows='2'></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button   @click="visible = false">取 消</el-button>
      <el-button :disabled="btnDisabled" type="primary" @click="submitParagraph()">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      searchType: [
        { value: 0, label: "本机构" },
        { value: 1, label: "本机构及子机构" }
      ],
      imageUrl: "",
      visible: false,
      getYearList: [],
      resultList: [],
      addPersonForm: {
        reviewScore: "", //年审成绩
        reviewYear: "", //年审年份
        personsId: "", //id
        reviewId:"",
        note: "", //备注
        idNo: "", //身份证号
        personName: "", //执法人名
        birthDate: "" //出生日期
      },
      type: "", //年审： 0，复审： 1
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
      rules: {
        reviewScore: [{ required: true, message: '请选择成绩', trigger: 'change' }]
      },
      btnDisabled: false
    };
  },
  methods: {
    // 提交年审
    submitParagraph(){
      this.btnDisabled = false;
      this.$refs.paragraphForm.validate((valid) => {
        if (valid) {
          this.btnDisabled = true;
          this.handleYear();
        } else {
          this.btnDisabled = false;
          return false;
        }
      });
    },
    //点击下拉框的时候后头获取下拉框数据
    getDepatements(name, codeName) {
      if (this.resultList.length === 0) {
        this.$store.dispatch("findAllDrawerByName", name).then(
          res => {
            if (res.code === 200) {
              if (codeName === "resultList") { // 查询成绩下拉
                this.resultList = res.data;
              }
            } else {
              console.info("没有查询到数据");
            }
          }
        );
      }
    },
    //确认年审/复审
    handleYear() {
      let _this = this;
      let data = {
        reviewScore: _this.addPersonForm.reviewScore,
        reviewYear: _this.addPersonForm.reviewYear,
        reviewIds:_this.addPersonForm.reviewId,
        personIds: _this.addPersonForm.personsId,
        note: _this.addPersonForm.note
      };
      if (this.type == "0") {
        _this.$store.dispatch("approveAr", data).then(res => {
          _this.btnDisabled = false;
          if (res.code === 200) {
            this.$emit('getApplyList');
            this.$message({ type: "success", message: "年审成功!" });
          } else {
            this.$message({ type: 'error', message: err.msg || '' });
          }
          this.closeDialog();
        }, err => {
          _this.btnDisabled = false;
          this.$message({ type: 'error', message: err.msg || '' });
        });
      } else {
        _this.$store.dispatch("reApproveAr", data).then(res => {
          _this.btnDisabled = false;
          if (res.code === 200) {
            this.$emit('getAllPersons');
            this.$message({ type: "success", message: "复审成功!" });
          } else {
            this.$message({ type: 'error', message: err.msg || '' });
          }
          this.closeDialog();
        }, err => {
          _this.btnDisabled = false;
          this.$message({ type: 'error', message: err.msg || '' });
        });
      }
    },
    //点击下拉框的时候后头获取下拉框Year数据
    getYear(name, codeName) {
      this.$store.dispatch("getYearMoudle", name).then(
        //查询执法领域
        res => {
          if (res.code === 200) {
            if (this.getYearList.size == undefined) {
              this.getYearList = [];
              if (codeName === "getYearList") {
                //this.getYearList=res.data;
                for (let i = res.data.minYear; i <= res.data.maxYear; i++) {
                  this.getYearList.push({ id: i, name: i });
                }
              }
            }
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    showModal(id, type,reviewYear) {
      this.type = type;
      this.addPersonForm.personsId = id;
      this.addPersonForm.reviewYear = reviewYear;
      this.addPersonForm.reviewId = id;
      this.visible = true;
      //this.handelType = type;
      if (type == "0") {
        this.dialogTitle = "年度审核";
      } else {
        this.dialogTitle = "年度复审";
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["paragraphForm"].resetFields();
      this.visible = false;
    }
  }
};
</script>

<style  lang="scss" scoped>
>>>.el-date-editor.el-input, >>>.el-select{
  width: 100%;
}
>>>.el-icon-date{
  line-height: 32px;
}
</style>