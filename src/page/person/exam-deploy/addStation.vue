<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%">
    <el-form ref="examDeployFormRef" :model="examDeployForm" label-position="right"  label-width="100px">
        <!-- <el-form-item label="考试名称" prop="examId" >
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
            </el-form-item> -->
      <el-row>
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="examDeployForm.jobName"></el-input>
        </el-form-item>  
      </el-row>
      <el-row>
        <el-form-item label="任务分组" prop="jobGroup">
          <el-input v-model="examDeployForm.jobGroup"></el-input>
        </el-form-item>  
      </el-row>
      <el-row>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            type="datetime"
            v-model="examDeployForm.startTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择开始时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="cron表达式" prop="cronExpression">
          <el-input v-model="examDeployForm.cronExpression"></el-input>
        </el-form-item>  
      </el-row>
      <el-row>
        <el-form-item label="参数名称" prop="invokeParam">
          <el-input v-model="examDeployForm.invokeParam"></el-input>
        </el-form-item>  
      </el-row>
      <el-row>
        <el-form-item label="类名" prop="className">
          <el-input v-model="examDeployForm.className"></el-input>
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
          quartzId: "",
          jobName: "",
          jobGroup: "",
          startTime: "",
          jobStatus: "",
          cronExpression: "",
          invokeParam: "",
          className: "",
          excuteTimes:"",
          excuteStatus:"",
          createId:"",
          createTime:"",
          modifyTime:"",
          modifyId:"",
      },
      examList:[],      
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改1 
    }
  },
  // created(){
  //   this.getDictInfo();
  // },
  methods:{
     getDictInfo() {
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
      let _this = this;
      let data = {
          jobName: _this.examDeployForm.jobName,
          jobGroup: _this.examDeployForm.jobGroup,
          startTime: _this.examDeployForm.startTime,
          cronExpression: _this.examDeployForm.cronExpression,
          invokeParam: _this.examDeployForm.invokeParam,
          className:_this.examDeployForm.className,
      };
      if(_this.handelType==0){
        _this.$store.dispatch("addScheduleJobModul",data).then(res => {
          _this.$emit("getAddStationPage");
          if(res.code == '200'){
            _this.$message({
              type: "success",
              message:  "添加成功!",
          });
          _this.visible = false;
          }
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
      _this.examDeployForm.quartzId='';
      _this.examDeployForm.jobName='';
      _this.examDeployForm.jobGroup='';
      _this.examDeployForm.startTime='';
      _this.examDeployForm.cronExpression='';
      _this.examDeployForm.invokeParam='';
      _this.examDeployForm.className='';
      if(type==0){//新增
        _this.dialogTitle = "新增";
      }else if(type==1){//修改
      _this.dialogTitle = "修改";
      _this.examDeployForm.quartzId=row.quartzId;
      _this.examDeployForm.jobName=row.jobName;
      _this.examDeployForm.jobGroup=row.jobGroup;
      _this.examDeployForm.startTime=row.startTime;
      _this.examDeployForm.cronExpression=row.cronExpression;
      _this.examDeployForm.invokeParam=row.invokeParam;
      _this.examDeployForm.className=row.className;
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
