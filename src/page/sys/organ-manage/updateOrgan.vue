<template>
  <el-dialog
    :title="dialogTitle"
    custom-class="leftDialog"
    :visible.sync="visible"
    top="0"
    width="45%"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form
      :model="addOrganForm"
      :rules="rules"
      ref="addOrganForm"
      label-width="100px"
      class="addOrganClass"
      :disabled="isDisabled"
    >
      <div class="part">
        <p class="titleP">基本信息</p>
        <div class="item">
          <el-form-item label="机构名称" prop="name">
            <el-input v-model="addOrganForm.name" @focus="focusOrganName" @blur="blurOrganName"></el-input>
          </el-form-item>


          <span class="errorInput" v-if="errorOrganName">该机构名称已存在</span>
        </div>
        <div class="item">
          <el-form-item label="上级机构" prop="pidName">
            <el-input v-model="addOrganForm.pidName"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="机构编码" prop="code">
            <el-input v-model="addOrganForm.code"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="机构类型" prop="organType">
            <el-select v-model="addOrganForm.organType" placeholder>
                <el-option
                  v-for="item in organTypeArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="职权取得方式" prop="accessToAuthority">
            <el-select v-model="addOrganForm.accessToAuthority" placeholder>
                <el-option
                  v-for="item in accessToAuthorityArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="机构性质" prop="organNature">
            <el-select v-model="addOrganForm.organNature" placeholder>
                <el-option
                  v-for="item in organNatureArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item" style="width: 100%">
          <el-form-item label="是否具有独立执法资格" label-width="160px" prop="isIndependentEnforce">
            <el-radio-group v-model="addOrganForm.isIndependentEnforce">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <div class="part">
        <p class="titleP">机构详情</p>
        <div class="item">
          <el-form-item label="机构地址" prop="address">
            <el-input v-model="addOrganForm.address"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="机构邮编" prop="zipCode">
            <el-input v-model="addOrganForm.zipCode"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="addOrganForm.telephone"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="联系人" prop="contactor">
            <el-input v-model="addOrganForm.contactor"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="缴款银行" prop="bank">
            <el-input v-model="addOrganForm.bank"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="账户号" prop="account">
            <el-input v-model="addOrganForm.account"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="复议机构" prop="reconsiderationOrgan1">
            <el-input v-model="addOrganForm.reconsiderationOrgan1"></el-input>
          </el-form-item>
        </div>
         <div class="item">
          <el-form-item label="复议机构2" prop="reconsiderationOrgan2">
            <el-input v-model="addOrganForm.reconsiderationOrgan2"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="诉讼机构" prop="enforcementOrgan1">
            <el-input v-model="addOrganForm.enforcementOrgan1"></el-input>
          </el-form-item>
        </div>
         <div class="item">
          <el-form-item label="诉讼机构2" prop="enforcementOrgan2">
            <el-input v-model="addOrganForm.enforcementOrgan2"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="part">
        <p class="titleP">三定要求</p>
        <div>
          <el-form-item label="资金来源" prop="fundingSource">
            <el-input v-model="addOrganForm.fundingSource"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="法律依据" prop="legalBasis">
            <el-input v-model="addOrganForm.legalBasis"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="主要职权" prop="mainPowers">
            <el-input v-model="addOrganForm.mainPowers"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-form
      :model="addValueForm"
      :rules="rules"
      ref="addValueForm"
      label-width="100px"
      class="addOrganClass"
      v-if="attachedPropertyFlag"
    >
      <div class="part" v-if="attachedPropertyFlag">
        <p class="titleP" v-if="attachedPropertyFlag">附属属性</p>
        <div v-for="item in attachedPropertyList" :key="item.id">
          <el-form-item :label="item.propertyName" :prop="item.propertyEnName">
              <el-input v-model="addValueForm.propertyValue[item.propertyEnName]"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrgan('addOrganForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA';
import {getAttachedPropertyByConditionApi,getAttachedPropertyAnsValueApi,addAttachedPropertyValueApi} from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      addOrganForm: {
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
        mainPowers: "",

      },
      addValueForm:{
        propertyValue:{}
      },
      rules: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }]
      },
      parentNode: "", //新增机构时的上级机构
      dialogTitle: "", //弹出框title
      organId: "", //详情页id
      errorOrganName: false, //添加organname时的验证
      handelType:0,  //添加 0  修改2
      isDisabled:false,  //查看详情禁用form
      accessToAuthorityArray: [], // 职权取得方式
      organNatureArray: [], //机构性质
      organTypeArray: [],
      attachedPropertyList: [],//附属属性列表
      attachedPropertyFlag: false,
      attachedPropertyValueList:[]
    };
  },

  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        this.dialogTitle = "新增机构";

        this.parentNode = data;
        this.addOrganForm.pidName = data.parentNodeName;
        this.isDisabled = false;
      } else if (type == 1) {
        this.dialogTitle = "机构详情";
        this.organId = data;
        this.getOrganDetail(data);
        this.isDisabled = true;
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改机构";
        this.organId = data.id;
        this.parentNode = data.parentNode;
        this.getOrganDetail(data.id);
        this.getAttchedProperties();
        this.getAttchedPropertiesAndValue(data.id);
        this.isDisabled = false;
      }
      this.getBasicData()
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addOrganForm"].resetFields();
      this.$refs["addValueForm"].resetFields();
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
          console.log("数据", this.addOrganForm);
          _this.$store.dispatch("addOrgan", _this.addOrganForm).then(
            res => {
              console.log('this.organId',_this.addOrganForm.pid);
             _this.$emit("getAllOrgan2",_this.addOrganForm.pid);
             // this.$emit("getSelectOrgan");
              console.log("新增机构", res);
              //保存附属属性
              let valueList = [];
              this.attachedPropertyList.forEach(item => {
                  let value = {
                    propertyId: item.id,
                    propertyValue: _this.addValueForm.propertyValue[item.propertyEnName]
                  };
                  valueList.push(value);
              })
              console.log("修改属性值",valueList);
              let data = {
                dataId:res.data.id,
                propertyValueList: valueList
              };
              console.log("1234",data);
              addAttachedPropertyValueApi(data).then(
                 res => {
                  console.log("属性值", res);
                  // _this.addOrganForm = res.data;
                  _this.$message({
                    type: "success",
                    message: _this.handelType == 0 ? "添加成功!" : "修改成功"
                  });
                },
                err => {
                  console.log(err);
                }
              );
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
      console.log("id",id);
      let params = { id: id };
      let _this = this
      this.$store.dispatch("getOrganDetail", params).then(
        res => {
          console.log("机构", res);
          _this.addOrganForm = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询机构表附属属性
    getAttchedProperties(){
      let data = {
        propertyType: "0",
      };
      getAttachedPropertyByConditionApi(data).then(
          res => {
            console.log("附属属性列表",res);
            this.attachedPropertyFlag = true;
            this.attachedPropertyList = res.data;
            res.data.forEach(item => {
              this.$set( this.addValueForm.propertyValue,item.propertyEnName);
              // this.addValueForm.propertyValue[item.propertyEnName]=item.propertyValue;
            })
          },
          err => {
            console.log(err);
          }
        );
    },
    //查询机构表附属属性以及值
    getAttchedPropertiesAndValue(dataId){
      getAttachedPropertyAnsValueApi(dataId).then(
          res => {
            console.log("附属属性值列表",res);
            this.attachedPropertyFlag = true;
            this.attachedPropertyValueList = res.data;
            res.data.forEach(item => {
              this.$set( this.addValueForm.propertyValue,item.propertyEnName);
              this.addValueForm.propertyValue[item.propertyEnName]=item.propertyValue;
            })
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
