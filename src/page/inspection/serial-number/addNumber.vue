<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%">
    <el-form ref="addStationFormRef" :model="addStationForm" label-position="right"  label-width="100px">
      <el-row>
        <el-form-item label="前缀:" prop="preName">
          <el-input v-model="addStationForm.preName" placeholder="编号前缀"></el-input>
        </el-form-item>
      </el-row>
      <el-form-item label="后缀:" prop="sufName">
          <el-input v-model="addStationForm.sufName" placeholder="编号后缀"></el-input>
        </el-form-item>
        <el-form-item label="日期格式:" prop="dateFormat">
              <el-select v-model="addStationForm.dateFormat" placeholder="日期格式">
                <el-option label="YYYY" value="YYYY"></el-option>
                <el-option label="YYYY-MM" value="YYYY-MM"></el-option>
              </el-select>
        </el-form-item>
          <el-form-item label="长度" prop="numLength" >
              <el-select v-model="addStationForm.numLength" placeholder="长度">
                <el-option label="2" value="2"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="6" value="6"></el-option>
              </el-select>
        </el-form-item>
      </el-row>
      <el-form-item label="业务类型:" prop="codeInfo">
          <el-input v-model="addStationForm.codeInfo" placeholder="业务类型"></el-input>
        </el-form-item>
      </el-row>
      <el-form-item label="当前账号:" prop="currNo">
          <el-input v-model="addStationForm.currNo" placeholder="当前账号"></el-input>
        </el-form-item>
      </el-row>
      <!-- <el-form-item label="机构id:" prop="organId">
          <el-input v-model="addStationForm.organId"></el-input>
        </el-form-item> -->
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="closeDialog()">取 消</el-button>
      <el-button type="primary" @click="submitStation">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getCheParameterInfoApi,updateCheParameterInfoApi} from '@/api/supervision';
export default {
  data(){
    return{
      isDisabled:false,
      visible: false,
      addStationForm: {
        id:"",
        preName: "",//前缀
        sufName: "",//后缀
        numLength:"",//几位数字
        codeInfo:"",//不同业务用于生成指定的流水号:case_code
        currNo:"",//当前使用账号
        organId:"",//机构Id
        dateFormat:"",//日期格式
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改1 
    }
  },
  methods:{
    //提交
    submitStation() {
      let _this = this
      if(_this.handelType==0){
           getCheParameterInfoApi(this.addStationForm).then(res => {
            if (res.code == "200") {
              this.$message({ type: 'success', message: "保存成功"});
            }
          }, err => {
            this.$message({ type: 'error', message: err.msg || '' });
          });
      }else if(_this.handelType==1){
          updateCheParameterInfoApi(this.addStationForm).then(res => {
            if (res.code == "200") {
              this.$message({ type: 'success', message: "保存成功"});
            }
          }, err => {
            this.$message({ type: 'error', message: err.msg || '' });
          });
      }
    },
    showModal(row,type) {
      let _this=this
      _this.visible = true;
      _this.handelType = type;
      _this.isDisabled=false;
      if(type==0){//新增
        _this.dialogTitle = "新增";
      }else if(type==1){//修改
        _this.dialogTitle = "修改";
         _this.addStationForm.id=row.id,
        _this.addStationForm.preName=row.preName,
        _this.addStationForm.sufName=row.sufName,
        _this.addStationForm.numLength=row.numLength,
        _this.addStationForm.codeInfo=row.codeInfo,
        _this.addStationForm.currNo=row.currNo,
        _this.addStationForm.organId=row.organId,
        _this.addStationForm.dateFormat=row.dateFormat
      }
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addStationFormRef"].resetFields();
    }
  }
}
</script>
<style lang="scss" scoped>
>>>.el-date-editor.el-input, >>>.el-select{
  width: 100%;
}
</style>
