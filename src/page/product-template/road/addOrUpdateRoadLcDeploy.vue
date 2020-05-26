<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form :model="addOrUpdateRoadLcDeployForm" :rules="rules" ref="addOrUpdateRoadLcDeployForm" label-width="120px">
      <div class="item">
        <el-form-item label="路产名称" prop="roadLcName">
          <el-input v-model="addOrUpdateRoadLcDeployForm.roadLcName"></el-input>
        </el-form-item>
        <el-form-item label="所属标准" prop="roadLcBz">
           <el-select v-model="addOrUpdateRoadLcDeployForm.roadLcBz"  @change="initRoadLcType2">
            <el-option value="高等级公路标准" label="高等级公路标准"></el-option>
            <el-option value="普通公路标准" label="普通公路标准"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="roadLcType">
          <el-select v-model="addOrUpdateRoadLcDeployForm.roadLcType" @click.native="isChoseBz2" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价(元)" prop="roadLcPrice">
           <el-input v-model="addOrUpdateRoadLcDeployForm.roadLcPrice" v-on:input="value=onlyNum(addOrUpdateRoadLcDeployForm.roadLcPrice)"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="roadLcUnit">
           <el-select v-model="addOrUpdateRoadLcDeployForm.roadLcUnit" placeholder="请选择">
            <el-option v-for="item in unitList" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="roadLcNote">
           <el-input v-model="addOrUpdateRoadLcDeployForm.roadLcNote" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrUpdateRoadLcDeploy('addOrUpdateRoadLcDeployForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  getAllFlowApi, getDictListDetailApi,
} from "@/api/system";
export default {
  data() {
    return {
      visible: false,
      addOrUpdateRoadLcDeployForm: {
        roadLcName: "",
        roadLcBz: "",
        roadLcType:"",
        roadLcPrice: "",
        roadLcUnit: "",
        roadLcNote: "",
      },
      rules: {
        roadLcName: [{ required: true, message: "请输入路产名称", trigger: "blur" }],
        roadLcBz : [{ required: true, message: "请选择路产标准", trigger: "blur" }],
        roadLcType : [{ required: true, message: "请选择类型", trigger: "blur" }],
        roadLcPrice : [{ required: true, message: "请输入单价", trigger: "blur" }],
        roadLcUnit : [{ required: true, message: "请选择单位", trigger: "blur" }],
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
      editRoadLcDeployeId: "",
      typeList:[], //类别列表
      unitList:[]
    };
  },
  inject: ["reload"],
  methods: {
    isChoseBz2(){
      if(this.addOrUpdateRoadLcDeployForm.roadLcBz == null || this.addOrUpdateRoadLcDeployForm.roadLcBz == ""){
        this.$message({message: "请先选择所属标准",type:'warning'});
      }
    },
    onlyNum(value){
      this.addOrUpdateRoadLcDeployForm.roadLcPrice = value.replace(/\D/g,'')
    },
    //选中所属标准，加载类型
    initRoadLcType2(type){
      let _this = this;
      let bzId = null;
      if(this.addOrUpdateRoadLcDeployForm.roadLcBz == '0'){
        bzId = '9fba0079cdcf93994a9dc317f3c8ee0d';
      }else{
        bzId = '0c340250837a8cb58e7ce330266ab5c6';
      }
      getDictListDetailApi(bzId).then(res=>{
        console.log(res)
        if(type == 0){
          _this.addOrUpdateRoadLcDeployForm.roadLcType = "";
        }
         _this.typeList = res.data;
      })
    },
    showModal(type, data) {
      debugger
      this.visible = true;
      let _this = this;
      this.handelType = type;
      if (type == 0) {
        this.dialogTitle = "添加路产配置信息";
        this.$nextTick(()=>{
          this.$refs["addOrUpdateRoadLcDeployForm"].resetFields();
          _this.typeList = "";
          console.log('sadsdsf',this.$refs["addOrUpdateRoadLcDeployForm"].resetFields())
        })
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改路产配置信息";
        this.addOrUpdateRoadLcDeployForm.roadLcName = data.roadLcName;
        this.addOrUpdateRoadLcDeployForm.roadLcBz = data.roadLcBz;
        _this.initRoadLcType2();
        this.addOrUpdateRoadLcDeployForm.roadLcType = data.roadLcType;
        this.addOrUpdateRoadLcDeployForm.roadLcPrice = data.roadLcPrice;
        this.addOrUpdateRoadLcDeployForm.roadLcUnit = data.roadLcUnit;
        this.addOrUpdateRoadLcDeployForm.roadLcNote = data.roadLcNote;
        this.editRoadLcDeployeId = data.id;
        
      }
    },
    
    //关闭弹窗的时候清除数据
    closeDialog() {
    
      this.$refs["addOrUpdateRoadLcDeployForm"].resetFields();
      console.log('111',this.$refs["addOrUpdateRoadLcDeployForm"].resetFields());
      this.visible = false;
      //this.errorOrganName = false;
    },
    //新增案件类型 修改案件类型
    addOrUpdateRoadLcDeploy(formName) {
      // this.$refs.roadLcType.query = '';
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.handelType) {
            //修改
            _this.addOrUpdateRoadLcDeployForm.id= this.editRoadLcDeployeId;
            console.log("要修改的路产配置",_this.addOrUpdateRoadLcDeployForm);
            _this.$store.dispatch("addOrUpdateRoadLcDeploy", _this.addOrUpdateRoadLcDeployForm).then(
              res => {
                console.log("修改后的路产配置", res);
                _this.$message({
                  type: "success",
                  message: "修改成功"
                });
                _this.visible = false;
                _this.reload();
              },
              err => {
                console.log(err);
              }
            );
          } else {
            _this.$store.dispatch("addOrUpdateRoadLcDeploy", _this.addOrUpdateRoadLcDeployForm).then(
              res => {
                console.log("路产配置", res);
                _this.$message({
                  type: "success",
                  message:"添加成功!"
                });
                _this.visible = false;
                _this.reload();
              },
              err => {
                console.log(err);
              }
            );
          }
        }
      });
    },
  },
  mounted(){
    this.$nextTick(()=>{
          this.$refs["addOrUpdateRoadLcDeployForm"].resetFields();
          console.log('sadsdsfthis.$refs["addOrUpdateRoadLcDeployForm"]',this.$refs["addOrUpdateRoadLcDeployForm"])
          console.log('sadsdsf',this.$refs["addOrUpdateRoadLcDeployForm"].resetFields())
      })
    let _this = this
    getDictListDetailApi("2645c8d35a7db7a188d9ef92e498cb56").then(res=>{
        console.log(res)
         _this.unitList = res.data;
    })
  }
};
</script>
