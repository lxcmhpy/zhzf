<template>
  <el-dialog
    title="重大案件金额设定标准"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="350px"
  >
    <el-form
      :model="caseSearchForm"
      ref="setMoneyForm"
      class="setMoneyForm"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="个人" prop="partMoney">
        <el-input v-model="caseSearchForm.partMoney"></el-input>
      </el-form-item>
      <el-form-item label="企业" prop="compMoney">
        <el-input v-model="caseSearchForm.compMoney"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="setMoney()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { queryLawCateByOrganIdApi } from "@/api/caseDeploy";
import iLocalStroage from "@/common/js/localStroage";
import { getDictListDetailByNameApi, addDictApi } from "@/api/system";
import { money } from "@/common/js/validator"

export default {
  data() {
    return {
      visible: false,
      caseSearchForm: {
        compMoney: "",
        partMoney: "",
      },
      moneyData: [],
      rules:{
        partMoney: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: money, trigger: 'blur' }
        ],
        compMoney: [
          { required: true, message: '请输入', trigger: 'blur' },
            { validator: money, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    showModel() {
      this.visible = true;
      getDictListDetailByNameApi("重大案件金额标准")
        .then((res) => {
          console.log(res);
          this.moneyData = res.data;
          this.caseSearchForm.partMoney = res.data[0].name;
          this.caseSearchForm.compMoney = res.data[1].name;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //设置标准
   setMoney() {
      let data = {
        id: this.moneyData[0].id,
        pid: this.moneyData[0].pid,
        name: this.caseSearchForm.partMoney,
        notes: this.moneyData[0].notes,
        sort: this.moneyData[0].sort,
        status: true,
      };
      let data2 = {
        id: this.moneyData[1].id,
        pid: this.moneyData[1].pid,
        name: this.caseSearchForm.compMoney,
        notes: this.moneyData[1].notes,
        sort: this.moneyData[1].sort,
        status: true,
      };
       this.$refs['setMoneyForm'].validate(async (valid, noPass) => {
          if (valid) {
            await addDictApi(data);
            await addDictApi(data2);
            this.visible = false;
            this.$emit("getNewData");
          }
       })
      
    },
  },
};
</script>
<style lang="scss" >
</style>