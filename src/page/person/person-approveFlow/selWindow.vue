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
       
       <!-- <el-form-item label="">
          <el-select v-model="index" placeholder="节点选择" remote>
                                <el-option
                                    v-for="value in startActivities" :key="value.id" :label="value.oname" :value="value.index">
                                </el-option>
                            </el-select>
       </el-form-item> -->

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
            _this.$store.dispatch("getOriginNoLimit").then(
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
          oname:this.addOrganForm.name
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
     
    //  this.getBasicData()
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.activities = [];
      this.startActivities=[];
      this.visible = false;
      this.$refs["addOrganForm"].resetFields();
      this.errorOrganName = false;
    },
    //聚焦清除错误信息
    focusOrganName() {
      this.errorOrganName = false;
    },
    //失去焦点请求 名称是否重复
    blurOrganName() {
      if(this.addOrganForm.name){
        let _this = this
        this.$store.dispatch("hasOrganName", this.addOrganForm.name).then(
        res => {
          console.log(res);
          if(res.data.id){
            _this.errorOrganName = true;
          }else{
            _this.errorOrganName = false;
          }
        },
        err => {
          console.log(err);
        }
      );

      }

    },
    //新增机构 修改机构
    addOrgan(formName) {
        let _this = this
      this.$refs[formName].validate(valid => {
        if (valid && !this.errorOrganName) {
          _this.addOrganForm.pid = _this.parentNode.parentNodeId;
          _this.addOrganForm.id = _this.handelType == 0 ? '' :  _this.organId;
          _this.$store.dispatch("addOrgan", _this.addOrganForm).then(
            res => {
             _this.$emit("getAllOrgan2",_this.addOrganForm.pid);
             // this.$emit("getSelectOrgan");
              _this.$message({
                type: "success",
                message: _this.handelType == 0 ? "添加成功!" : "修改成功"
              });
              _this.visible = false;
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    },
    //获取机构详情
    getOrganDetail(id) {
      let params = { id: id };
      let _this = this
      this.$store.dispatch("getOrganDetail", params).then(
        res => {
          _this.addOrganForm = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    async getDictListDetailTb (val) {
        let list = await this.$store.dispatch("getDictListDetailTb", val);
        return list.data
    },
    async getBasicData () {
        //   机构类型
        this.organTypeArray = await this.getDictListDetailTb(BASIC_DATA_SYS.organTypeId)
        //   机构性质
        this.organNatureArray = await this.getDictListDetailTb(BASIC_DATA_SYS.organNature);
        //   职权取得方式
        this.accessToAuthorityArray = await this.getDictListDetailTb(BASIC_DATA_SYS.accessToAuthority);
    }
    //获取字典值
    // async getDictKeyList(val){
    //   this.$store.dispatch("getDictListDetail", val).then(
    //     async res => {
    //       console.log("字典值列表", res);
    //       debugger
    //       return res.data;
    //       // this.tableData.forEach(item=>{
    //       //     item.pName = this.dictName
    //       // })
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // }
  },
};
</script>
<style lang="scss" scoped>
>>>.el-select{
  display: block;
}
</style>


