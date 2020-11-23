<template>
  <el-dialog
    title="处罚类型"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="640px"
  >
    <el-form
      :rules="rules"
      ref="dialogForm"
      :inline="true"
      :model="dialogData"
    >
      <div id="illegalActionPunishDecisionBox">
        <el-checkbox-group v-model="dialogData.checkDec">
          <p>
            <el-checkbox label="罚款" value="0" @change="changeCheckDec"
              >罚款</el-checkbox
            >
            <el-form-item prop="cont1">
              <el-input
                placeholder="请输入罚款金额,小写金额"
                @input="handleChangeMoney"
                v-model="dialogData.cont1"
                :disabled="disabledCont1"
              >
                <template slot="prepend">￥</template>
              </el-input>
            </el-form-item>
            <span style="font-size: 12px">—</span>
            <el-form-item prop="cont1Show">
              <el-input
                placeholder="大写金额"
                v-model="dialogData.cont1Show"
                disabled
              >
              </el-input>
            </el-form-item>
          </p>
          <p>
            <el-checkbox label="责令整改" value="1" @change="changeCheckDec2"
              >责令整改</el-checkbox
            >
            <el-form-item prop="cont2">
              <el-input
                placeholder="请输入责令整改要求"
                v-model="dialogData.cont2"
                :disabled="disabledCont2"
              ></el-input>
            </el-form-item>
          </p>
          <p>
            <el-checkbox label="警告" value="2" @change="changeCheckDec3"
              >警告</el-checkbox
            >
            <el-form-item prop="cont3">
              <el-input
                placeholder="请输入警告内容"
                v-model="dialogData.cont3"
                :disabled="disabledCont3"
              ></el-input>
            </el-form-item>
          </p>
          <p>
            <el-checkbox
              label="没收违法所得"
              value="3"
              @change="changeCheckDec4"
              >没收违法所得</el-checkbox
            >
            <el-form-item prop="cont4">
              <el-input
                placeholder="请输入没收金额,小写金额"
                @input="handleChangeMoney2"
                v-model="dialogData.cont4"
                :disabled="disabledCont4"
              >
                <template slot="prepend">￥</template>
              </el-input>
            </el-form-item>
            <span style="font-size: 12px">—</span>
            <el-form-item prop="cont4Show">
              <el-input
                placeholder="大写金额"
                v-model="dialogData.cont4Show"
                disabled
              >
              </el-input>
            </el-form-item>
          </p>
          <p>
            <el-checkbox
              label="没收非法财产"
              value="4"
              @change="changeCheckDec5"
              >没收非法财产</el-checkbox
            >
            <el-form-item prop="cont5">
              <el-input
                placeholder="请输入非法财产内容"
                v-model="dialogData.cont5"
                :disabled="disabledCont5"
              ></el-input>
            </el-form-item>
          </p>
          <p>
            <el-checkbox
              label="责令停产停业、暂扣或吊销许可整合执照"
              value="5"
              @change="changeCheckDec6"
              >责令停产停业、暂扣或吊销许可整合执照</el-checkbox
            >
            <el-form-item prop="cont6">
              <el-input
                placeholder="非必填"
                v-model="dialogData.cont6"
                :disabled="disabledCont6"
              ></el-input>
            </el-form-item>
          </p>
        </el-checkbox-group>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="markPunishDecision">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import until from "@/common/js/util"
export default {
  data() {
    var validatedCont1 = (rule, value, callback) => {
      if (this.dialogData.checkDec.includes('罚款') && !this.dialogData.cont1) {
        return callback(new Error("请输入罚款金额"));
      }
      callback();
    };
    var validatedCont4 = (rule, value, callback) => {
      if(this.dialogData.checkDec.includes('没收违法所得') && !this.dialogData.cont4){
        return callback(new Error("请输入没收金额"));
      }
      callback();
    };
    return {
      visible: false,
      dialogData: {
        checkDec: [],
        cont1: "",
        cont1Show: "",
        cont4Show: "",
        cont2: "",
        cont3: "",
        cont4: "",
        cont5: "",
        cont6: "",
        fullDecision: "",
      },
      rules: {
        cont1: [
          { validator: validatedCont1, trigger: "blur" },
          { pattern: /^\d+(.\d{1,2})?$/, message: "必须为数字(可保留两位小数)", trigger: "blur" }
        ],
        cont4: [
          { validator: validatedCont4, trigger: "blur" },
          { pattern: /^\d+(.\d{1,2})?$/, message: "必须为数字(可保留两位小数)", trigger: "blur" }
        ],
      },
      disabledCont1: true,
      disabledCont2: true,
      disabledCont3: true,
      disabledCont4: true,
      disabledCont5: true,
      disabledCont6: true,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    changeCheckDec(val) {
      if(val){
        this.disabledCont1 = false;
      }else{
        this.disabledCont1 = true;
      }
      console.log("check", val,this.disabledCont1);
      this.dialogData.cont1 = "";
      this.dialogData.cont1Show = "";
    },
    changeCheckDec2(val) {
      if(val){
        this.disabledCont2 = false;
      }else{
        this.disabledCont2 = true;
      }
      this.dialogData.cont2 = "";
    },
    changeCheckDec3(val) {
      if(val){
        this.disabledCont3 = false;
      }else{
        this.disabledCont3 = true;
      }
      this.dialogData.cont3 = "";
    },
    changeCheckDec4(val) {
      console.log("check", val,this.disabledCont1);
      if(val){
        this.disabledCont4 = false;
      }else{
        this.disabledCont4 = true;
      }
      console.log("check", val,this.disabledCont1);
      this.dialogData.cont4 = "";
      this.dialogData.cont4Show = "";
    },
    changeCheckDec5(val) {
      if(val){
        this.disabledCont5 = false;
      }else{
        this.disabledCont5 = true;
      }
      this.dialogData.cont5 = "";
    },
    changeCheckDec6(val) {
      if(val){
        this.disabledCont6 = false;
      }else{
        this.disabledCont6 = true;
      }
      console.log("check", val);
      this.dialogData.cont6 = "";
    },
    handleChangeMoney(val){
      const reg = /^\d+(.\d{1,2})?$/;
      if(reg.test(val)){
        this.dialogData.cont1Show = until.upMoney(val) + "（￥" + val +"）";
      }else{
        this.dialogData.cont1Show = "";
      }
      
    },
    handleChangeMoney2(val){
      const reg = /^\d+(.\d{1,2})?$/;
      if(reg.test(val)){
        this.dialogData.cont4Show = until.upMoney(val) + "（￥" + val +"）";
      }else{
        this.dialogData.cont4Show = "";
      }
    },
    markPunishDecision() {
      console.log("111", this.dialogData.checkDec);
      //    if(this.dialogData.checkDec[0] == '罚款'){
      //        this.dialogData.fullDecision = this.dialogData.checkDec[0] + this.dialogData.cont1
      //    }else if(this.dialogData.checkDec[0] == '责令整改'){
      //        this.dialogData.fullDecision = this.dialogData.checkDec[0] + this.dialogData.cont2
      //    }else if(this.dialogData.checkDec[0] == '警告'){
      //        this.dialogData.fullDecision = this.dialogData.checkDec[0] + this.dialogData.cont3
      //    }else if(this.dialogData.checkDec[0] == '没收违法所得'){
      //        this.dialogData.fullDecision = this.dialogData.checkDec[0] + this.dialogData.cont4
      //    }else if(this.dialogData.checkDec[0] == '没收非法财产'){
      //        this.dialogData.fullDecision = this.dialogData.checkDec[0] + this.dialogData.cont5
      //    }else if(this.dialogData.checkDec[0] == '责令停产停业、暂扣或吊销许可整合执照'){
      //        this.dialogData.fullDecision = this.dialogData.checkDec[0] + this.dialogData.cont6
      //    }
      this.dialogData.fullDecision = "";
      for (let i = 0; i < this.dialogData.checkDec.length; i++) {
        if (this.dialogData.checkDec[i] == "罚款") {
          this.dialogData.fullDecision +=
            this.dialogData.checkDec[i] + this.dialogData.cont1Show;
        } else if (this.dialogData.checkDec[i] == "责令整改") {
          this.dialogData.fullDecision +=
            "," + this.dialogData.checkDec[i] + this.dialogData.cont2;
        } else if (this.dialogData.checkDec[i] == "警告") {
          this.dialogData.fullDecision +=
            "," + this.dialogData.checkDec[i] + this.dialogData.cont3;
        } else if (this.dialogData.checkDec[i] == "没收违法所得") {
          this.dialogData.fullDecision +=
            "," + this.dialogData.checkDec[i] + this.dialogData.cont4Show;
        } else if (this.dialogData.checkDec[i] == "没收非法财产") {
          this.dialogData.fullDecision +=
            "," + this.dialogData.checkDec[i] + this.dialogData.cont5;
        } else if (
          this.dialogData.checkDec[i] == "责令停产停业、暂扣或吊销许可整合执照"
        ) {
          this.dialogData.fullDecision +=
            "," + this.dialogData.checkDec[i] + this.dialogData.cont6;
        }
      }
      console.log("222", this.dialogData.fullDecision);
      //    去掉首位逗号
      this.dialogData.fullDecision = this.dialogData.fullDecision;
      if (this.dialogData.fullDecision.substr(0, 1) == ",")
        this.dialogData.fullDecision = this.dialogData.fullDecision.substr(1);

      let punishDecisionData = {
        checkDec: this.dialogData.checkDec.toString(),
        amount: this.dialogData.cont1,
        fullDecision: this.dialogData.fullDecision,
      };
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          this.$emit("sendPunishDecis", punishDecisionData);
          this.visible = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#illegalActionPunishDecisionBox {
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 5px;
  }
  .el-form-item {
    .el-form-item__error {
      position:inherit;
      padding: 5px 0 0 16px;
    }
  }
  .el-input__inner {
    font-size: 12px;
  }
}
</style>
