<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%">
    <el-form ref="examDeployFormRef" :model="examDeployForm" label-position="right"  label-width="100px">
      <el-row>
        <el-form-item label="考试名称" prop="examId" >
              <el-select
                v-model="examDeployForm.examId"
                placeholder="考试名称"
                remote
                @focus="getDictInfo()"
              >
                <el-option
                  v-for="value in examList"
                  :key="value.examId"   
                  :label="value.examName"
                  :value="value.examId"
                ></el-option>
              </el-select>
            </el-form-item>
      </el-row>
      <el-row v-if="handelType == 3?false:true">
        <el-form-item label="类名" prop="className">
          <el-input v-model="examDeployForm.className"></el-input>
        </el-form-item>  
      </el-row>
      <el-row v-if="handelType == 3?false:true">
        <el-form-item label="参数名称" prop="params">
          <el-input v-model="examDeployForm.params"></el-input>
        </el-form-item>  
      </el-row>
     
        <el-row>
        <el-form-item label="执行时间" prop="cronExpression1">
          <el-date-picker type="datetime"   v-model="examDeployForm.cronExpression1" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择执行时间" clearable></el-date-picker>
        </el-form-item>   
      </el-row>
       <el-row v-if="handelType == 3?false:true">
        <el-form-item label="是否启用:" prop="status">
          <el-radio v-model="examDeployForm.status" label="0">启用</el-radio>
          <el-radio v-model="examDeployForm.status" label="1">不启用</el-radio>
        </el-form-item>
      </el-row>
       <el-row v-if="handelType == 3?false:true">
        <el-form-item label="说明:" prop="remark">
          <el-input v-model="examDeployForm.remark"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="closeDialog()">取 消</el-button>
      <el-button type="primary" @click="submitStation">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  data(){
    return{
      isDisabled:false,
      visible: false,
     examDeployForm:{
                id:'',
                examId:'',
                examName:'',
                className:'',
                params:'',
                status:'',
                cronExpression1:'',
                status:'1',
                remark:'',
            },
      examList:[],      
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改1 
    }
  },
  methods:{
     getDictInfo(name, codeName) {
      this.$store.dispatch("getExamManageSchedule").then(res => {
        if (res.code === 200) {
          this.examList = res.data;
        } else {
          console.info("没有查询到数据");
        }
      });
    },
    //提交
    submitStation() {
      let _this = this
      if(_this.handelType==0){
        _this.$store.dispatch("addScheduleJobModul", _this.examDeployForm).then(res => {
          _this.$emit("getAddStationPage");
          _this.$message({
              type: "success",
              message:  "添加成功!",
          });
          _this.visible = false;
        }, err => { this.$message({ type: 'error', message: err.msg || '' }) });
      }else if(_this.handelType==1){
        _this.$store.dispatch("updateScheduleJobModul", _this.examDeployForm).then(res => {
          _this.$emit("getAddStationPage");
          _this.$message({
            type: "success",
            message:  "修改成功!",
          });
          _this.visible = false;
        }, err => { this.$message({ type: 'error', message: err.msg || '' }) });
      }else if(_this.handelType==3){
        let data = {
          examId:_this.examDeployForm.examId
        }
          _this.$store.dispatch("cacheQuestionRedis", data).then(res => {
          _this.$emit("getAddStationPage");
          _this.$message({
              type: "success",
              message:  "添加成功!",
          });
          _this.visible = false;
        }, err => { this.$message({ type: 'error', message: err.msg || '' }) });
      }
    },
    showModal(row,type) {
      let _this=this
      _this.visible = true;
      _this.handelType = type;
      _this.isDisabled=false;
      _this.examDeployForm.examId='';
      _this.examDeployForm.examName='';
      _this.examDeployForm.cronExpression1='';
      _this.examDeployForm.status='1';
      _this.examDeployForm.remark='';
      if(type==0){//新增
        _this.dialogTitle = "新增";
      }else if(type==1){//修改
        _this.dialogTitle = "修改";
         _this.examDeployForm.id=row.id;
        _this.examDeployForm.examId=row.examId;
      _this.examDeployForm.examName=row.examName;
      _this.examDeployForm.className=row.className;
      _this.examDeployForm.params=row.params;
      _this.examDeployForm.cronExpression1=row.cronExpression1;
      _this.examDeployForm.status=row.status;
      _this.examDeployForm.remark=row.remark;
      }
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["examDeployFormRef"].resetFields();
    }
  }
}
</script>
<style lang="scss" scoped>
>>>.el-date-editor.el-input, >>>.el-select{
  width: 100%;
}
</style>
