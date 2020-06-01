<template>
  <!-- lawPunishmentBasis   处罚依据 -->
  <el-dialog title="处罚依据" :visible.sync="visible"  @close="closeDialog" :close-on-click-modal="false" width="30%">
    <el-form :model="addPageForm" label-width="100px" ref="addPageFormRef" :rules="rules">
      <el-form-item label="法规名称" prop="bnslawIdPun" v-if="isAdd">
        <el-select
          v-model="addPageForm.bnslawIdPun"
          style="width:100%"
          placeholder="请选择法规名称"
          @change="getBnsalwListVo"
        >
          <el-option
            v-for="item in getBnslawList"
            :key="item.id"
            :label="item.strName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="法规名称" v-else>
        <el-input
          v-model="addPageForm.bnslawNamePun"
          style="width:100%"
          placeholder="请选择法规名称"
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="条" prop="itemPun">
        <el-input v-model.number="addPageForm.itemPun" placeholder="条"></el-input>
      </el-form-item>
      <el-form-item label="款" prop="clausePun">
        <el-input v-model.number="addPageForm.clausePun" placeholder="款"></el-input>
      </el-form-item>
      <el-form-item label="项" prop="iitemPun">
        <el-input v-model.number="addPageForm.iitemPun" placeholder="项"></el-input>
      </el-form-item>
      <el-form-item label="罚款下限" prop="lawerLimit">
        <el-input v-model.number="addPageForm.lawerLimit" placeholder="项" @blur ="changeNumberL"></el-input>
      </el-form-item>
      <el-form-item label="罚款上限" prop="upperLimit">
        <el-input v-model.number="addPageForm.upperLimit" placeholder="项" @blur ="changeNumberU"></el-input>
      </el-form-item>
      <el-form-item label="最高罚款" prop="highLimit">
        <el-input v-model.number="addPageForm.highLimit" placeholder="项" @blur ="changeNumberH"></el-input>
      </el-form-item>
      <el-form-item label="处罚标准" prop="cfbz">
        <el-input v-model="addPageForm.cfbz" placeholder="项"></el-input>
      </el-form-item>
      <el-form-item label="法规原文" prop="bnsLawNotePun">
        <el-input v-model="addPageForm.bnsLawNotePun" placeholder="法规原文" type="textarea" :rows="2"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addLawPunishmentApi,getBnsLawByFormApi,getLawPunishmentByIdApi } from "@/api/system";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["btnlawId"])
  },
  data() {
    return {
      addPageForm: {
        bnslawNamePun: "",
        itemPun: "",
        iitemPun: "",
        bnsLawNotePun: "",
        clausePun: "",
        lawerLimit: "",
        upperLimit: "",
        cfbz: "",
        highLimit: "",
        bnslawIdPun: "",
        bnslawLawName: "" //先写死
      },
      getBnslawList:[],
      visible: false,
      isAdd:true,
      rules: {}
    };
  },
  inject: ["reload"],
  methods: {
     selectGet(vId){ 
        let obj = {};
        obj = this.getBnslawList.find((item)=>{ 
            return item.id === vId;
        });
        return obj.strName;
     },
    showModal(type, row) {
      this.visible = true;
      if (type == 1) {
        this.isAdd = true;
        this.addPageForm.bnslawLawName = this.btnlawId;
      } else if (type == 0) {
        this.isAdd = false;
        getLawPunishmentByIdApi(row.row.id).then(
        res => {
          console.log("查询处罚依据", res);
          if (res.code == '200') {
            this.addPageForm = res.data;
          } else {
            this.$message.error('失败');
          }
        },
        error => {
          console.log(error)
        }
      );
      }
    },
       //获取法律法规
    getBnsalwListVo() {
      let _this = this;
      let data ={
          id:"",
      };
      getBnsLawByFormApi(data).then(
        res => {
         _this.getBnslawList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //装换为浮点数
    changeNumberL(){
      debugger
      if(this.addPageForm.lawerLimit != ""){
        this.addPageForm.lawerLimit = parseFloat(this.addPageForm.lawerLimit).toFixed(2);
      }  
    },
    changeNumberU(){
      if(this.addPageForm.upperLimit != ""){
        this.addPageForm.upperLimit = parseFloat(this.addPageForm.upperLimit).toFixed(2);
      }
    },
    changeNumberH(){
      if(this.addPageForm.highLimit != ""){
        this.addPageForm.highLimit = parseFloat(this.addPageForm.highLimit).toFixed(2);
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addPageFormRef"].resetFields();
    },
    addSure() {
      this.addPageForm.bnslawNamePun = this.selectGet(this.addPageForm.bnslawIdPun);
      console.log("addPageForm", this.addPageForm);
      addLawPunishmentApi(this.addPageForm).then(
        res => {
          console.log("添加处罚依据", res);
          if (res.code == "200") {
            this.$message({ message: "添加成功", type: "success" });
            this.visible = false;
            this.$emit("getListEmit");
          } else {
            this.$message.error("添加失败");
            return;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  created() {
    this.getBnsalwListVo();
  },
};
</script>
<style lang="scss" scoped>
.el-input__inner {
  width: 320px;
}
</style>
