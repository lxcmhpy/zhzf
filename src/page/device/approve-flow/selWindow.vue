<template>
<div class="com_searchAndpageBoxPadding">
  <div class="fullBox departBox">
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    width="35%"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form
      :model="addOrganForm"
      :rules="rules"
      ref="addOrganForm"
      class="addOrganClass"
      :disabled="isDisabled"
    >
      <div class="part">
       <el-form-item label=" " prop="inOrgan">
                    <elSelectTree
                        v-if="visible"
                        ref="elSelectTreeObj"
                        :options="tableDataTree"
                        :accordion="true"
                        :props="props"
                        @getValue="hindleChanged">
                    </elSelectTree>
                    <el-input style="display:none"  ref="inOrgan" v-model="addOrganForm.inOrgan"></el-input>
                </el-form-item>
      </div>
    
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="commit">确 定</el-button>
    </span>
    
     </el-dialog>
    </div>
    </div>
</template>

<script>
import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA'
import elSelectTree from '@/components/elSelectTree/elSelectTree';
import { findOrganTreeByCurrUser,getAllOrigin } from "@/api/device/approveFlow.js";
export default {
  data() {
    return {
       tableDataTree:[],//所属机构下拉列表值***
            props: {
                label: "label",
                value: "id"
            },
      visible: false,
      reverse: true,
      addOrganForm: {
        inOrgan:"",
        name: "",
        pidName: "",
        code: "",
        organType: "",
        accessToAuthority: "",
        organNature: "",
        isIndependentEnforce: "",
        address: "",
        zipCode: "",
        telephone: "",
        contactor: "",
        fundingSource: "",
        legalBasis: "",
        mainPowers: ""
      },
      id:"",
       activities: [],
       startActivities:[],
       type:"",
      rules: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }]
      },
      index:"",
      parentNode: "", //新增机构时的上级机构
      dialogTitle: "", //弹出框title
      organId: "", //详情页id
      errorOrganName: false, //添加organname时的验证
      handelType:0,  //添加 0  修改2
      isDisabled:false,  //查看详情禁用form
      accessToAuthorityArray: [], // 职权取得方式
      organNatureArray: [], //机构性质
      organTypeArray: []
    };
  },
 components:{
        elSelectTree
    },
  created(){
        this.searchTable();
    },
  methods: {
     hindleChanged(val) {
            this.$refs.elSelectTreeObj.$children[0].handleClose();
            this.addOrganForm.inOrgan = val
            this.addOrganForm.name = this.$refs.elSelectTreeObj.valueTitle;
        },
     searchTable() {//查询所属机构
            let _this = this
            getAllOrigin().then(
                res => {
                _this.tableDataTree = res.data;
            },
            err => {
                console.log(err);
            });
        },
    //确认选择
    commit(){
      if(this.addOrganForm.inOrgan == "" ){
           this.$message({
                type: "error",
                message: "请选择节点!"
               });
      }else{
        let data = {
          id:this.addOrganForm.inOrgan,
          organName:this.addOrganForm.name
        }
        this.$emit("getAllOrgan2",data,this.type);
      }
      this.closeDialog();
    },
    showModal(type) {
      //初始化列表
      this.visible = true;
      this.type = type;
      if(type === '0'){
         this.dialogTitle = "添加节点";
      }else{
         this.dialogTitle = "修改节点";
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.activities = [];
      this.startActivities=[];
      this.visible = false;
      this.$refs["addOrganForm"].resetFields();
      this.errorOrganName = false;
    },
  },
};
</script>
<style lang="scss" scoped>
>>>.el-select{
  display: block;
}
</style>


