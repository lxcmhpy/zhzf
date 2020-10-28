<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    append-to-body
    width="35%"
    class="add-room fullscreen">
    <el-form :model="addRoomForm" label-position="right"  label-width="100px" ref="addRoomFormRef" :rules="rules">
      <el-row>
        <el-form-item label="考场名称" prop="roomName" class="form-class">
          <el-input v-model="addRoomForm.roomName"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="容纳人数" prop="roomSum" class="form-class">
          <el-input v-model="addRoomForm.roomSum"  @input="trim()"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data(){
    return{
      visible: false,
      addRoomForm: {
        roomId:"",
        examId:"",
        roomSum:"",
        roomName:""
      },
      alreadyNum:"",
      rules: {
        roomName: [{ required: true, message: "考场名称不能为空", trigger: "blur" }],
        roomSum: [{ required: true, message: "容纳人数不能为空", trigger: "blur" }],
      },
      dialogTitle: "", //弹出框title
      handelType: 0 //添加 0  修改2  查看3
    }
  },
  methods:{
    //
    trim(){
        this.addRoomForm.roomSum=this.addRoomForm.roomSum.replace(/[^\d]/g,'');
    },
    //提交
    submit() {
      let _this = this
      if(_this.addRoomForm.roomName===""){
        _this.$message({
          type:'warning',
          message:'考场名称不能为空',
        });
        return;
      }
      if(_this.addRoomForm.roomSum===""){
        _this.$message({
          type:'warning',
          message:'容纳人数不能为空',
        });
        return;
      }

      if(_this.handelType==1){
        let data={
          examId:_this.addRoomForm.examId,
          roomSum:_this.addRoomForm.roomSum,
          roomName:_this.addRoomForm.roomName
        }
        _this.$store.dispatch("addRoomManage", data).then(res => {
          if(res.code == 200){
              _this.$emit("getRoomDispathInfo");
              _this.$message({
            type: "success",
            message:  "添加成功!",
          });
          _this.visible = false;
          }
        }, err => {
          _this.$message({ type: 'error', message: err.msg || '' });
        });
      }else if(_this.handelType==2){
        if(_this.addRoomForm.roomSum < _this.alreadyNum){
        _this.$message({
          type:'warning',
          message:'容纳人数不能小于该考场已分配人数',
        });
        return;
      }
        let data={
           roomId:_this.addRoomForm.roomId,
          examId:_this.addRoomForm.examId,
          roomSum:_this.addRoomForm.roomSum,
          roomName:_this.addRoomForm.roomName
        }
       _this.$store.dispatch("updateRoomManage", _this.addRoomForm).then(res => {
          if(res.code == 200){
              _this.$emit("getRoomDispathInfo");
              _this.$message({
            type: "success",
            message:  "修改成功!",
          });
          _this.visible = false;
          }
        }, err => {
          _this.$message({ type: 'error', message: err.msg || '' });
        });
      }
    },
    showModal(row,type) {
      let _this=this
      _this.visible = true;
      _this.handelType = type;
      if(_this.handelType == 1){
         _this.addRoomForm.roomId="";
          _this.addRoomForm.roomName = "";
        _this.addRoomForm.roomSum = "";
        _this.alreadyNum = "";
        _this.dialogTitle = "新增考场";
      }else if(type == 2){
        _this.dialogTitle = "修改考场";
        _this.addRoomForm.roomName = row.roomName;
        _this.addRoomForm.roomSum = row.roomSum;
        _this.alreadyNum = row.alreadyNum;
        _this.addRoomForm.roomId = row.roomId;
      }
      _this.addRoomForm.examId = row.examId;
      _this.isDisabled=false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addRoomFormRef"].resetFields();
      this.addRoomForm.roomSum = "";
      this.addRoomForm.roomName = "";
    }
  }
}
</script>
<style lang="scss" scoped>
.add-room{
  >>>.el-dialog__header{
    background: #e9edf6;
  }
}
</style>
