<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="30%"
  >
    <el-form :model="addDiscretionForm" :rules="rules" ref="addDiscretionForm" label-width="80px">
      <el-form-item label="违法行为" prop="causeId" class="select-set" v-if="isAdd">
        <el-select
          v-model="addDiscretionForm.causeId"
          placeholder="请选择违法行为"
         
          style="width:100%"
          :popper-append-to-body='false'
          filterable
        >
          <el-option
            v-for="item in caseCauseList"
            :key="item.id"
            :label="item.strContent"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="违法行为" v-else>
            <el-input v-model="addDiscretionForm.causeName"  style = "width:100%" placeholder="请选择违法行为" disabled>
            </el-input>
      </el-form-item>

      <el-form-item label="违法程度" prop="drawerId">
        <el-select v-model="addDiscretionForm.drawerId" placeholder="请选择违法程度" style="width:60%">
          <el-option v-for="item in wfcdList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="违法情节" prop="wfqj">
        <el-input type="textarea" :rows="2" v-model="addDiscretionForm.wfqj"></el-input>
      </el-form-item>
      <el-form-item label="处罚标准" prop="jycf">
        <el-input type="textarea" :rows="2" v-model="addDiscretionForm.jycf"></el-input>
      </el-form-item>
      <el-form-item label="罚款上限" prop="upperLimit">
        <el-input v-model="addDiscretionForm.upperLimit"></el-input>
      </el-form-item>
      <el-form-item label="罚款下限" prop="lawerLimit">
        <el-input v-model="addDiscretionForm.lawerLimit"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addEditDiscretion('addDiscretionForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  addDiscretionApi,
  getDictListDetailByNameApi,
  getCaseCauseListVoApi
} from "@/api/system";
// 验证规则
import {numType} from "@/common/js/validator";
export default {
  data() {
    var validateLimit = (rule, value, callback) => {
      debugger
      if (this.addDiscretionForm.upperLimit  && this.addDiscretionForm.lawerLimit 
        && Number(this.addDiscretionForm.lawerLimit)> Number(this.addDiscretionForm.upperLimit)) {
        return callback(new Error("下限金额不得大于上限金额"));
      }
      callback();
    };
    return {
      visible: false,
      addDiscretionForm: {
        causeId: "",
        causeName: "",
        drawerId: "",
        drawerName: "",
        wfqj: "",
        upperLimit: 0,
        lawerLimit: 0,
        jycf: ""
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2
      wfcdList: [],
      caseCauseList: [],
      isAdd: true,
      rules: {
        causeId: [
          { required: true, message: "违法行为必须填写", trigger: "blur" }
        ],
        upperLimit: [
          { validator: numType, trigger: "blur" },
          { validator: validateLimit, trigger: "blur"}
        ],
        lawerLimit: [
          { validator: numType, trigger: "blur" },
          { validator: validateLimit, trigger: "blur"}
        ],
        drawerId: [
          { required: true, message: "违法程度必须填写", trigger: "blur" }
        ],
        wfqj: [
          { required: true, message: "违法情节必须填写", trigger: "blur" }
        ],
        jycf: [{ required: true, message: "处罚标准必须填写", trigger: "blur" }]
      }
    };
  },
  inject: ["reload"],
  created() {
    this.getDictType();
    this.getCaseCauselist();
  },
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        console.log(data);
        this.isAdd = true;
        this.dialogTitle = "新增";
        this.addDiscretionForm = {};
      } else if (type == 1) {
        console.log("111", data);
        this.isAdd = false;
        this.dialogTitle = "修改";
        this.addDiscretionForm = data;
      }
    },
    addEditDiscretion(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid && !_this.errorName) {
          _this.addOrEditDiscretionSure();
        }
      });
    },
    selectWfcdList(vId){ 
        let obj = {};
        obj = this.wfcdList.find((item)=>{ 
            return item.id === vId;
        });
        return obj.name;
     },
    //新增 修改 自由裁量权
    addOrEditDiscretionSure() {
      this.addDiscretionForm.drawerName = this.selectWfcdList(
        this.addDiscretionForm.drawerId
      );
      console.log("data", this.addCaseCauseForm);
      addDiscretionApi(this.addDiscretionForm).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.visible = false;
          this.currentPage = 1;
          this.reload();
        } else {
          this.$message.error("出现异常，添加失败！");
        }
      });
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["addCaseCauseForm"].resetFields();
      this.visible = false;
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    // 获取下拉框
    getDictType() {
      //获取违法程度
      getDictListDetailByNameApi("违法程度").then(
        res => {
          console.log("违法程度", res);
          this.wfcdList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    getCaseCauselist() {
      //获取违法行为
      let data = {};
      let _this = this;
      getCaseCauseListVoApi(data).then(
        res => {
          console.log("违法行为", res);
          _this.caseCauseList = res.data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>


<style lang="scss" src="@/assets/css/systemManage.scss"></style>
<style lang="scss">
.select-set{
  .el-scrollbar{
    width:450px;
  }
}
</style>
