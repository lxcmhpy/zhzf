<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%"
    >
    <el-form :inline="true" :model="addAwardForm" label-position="right"  label-width="100px"  ref="addAwardForm">
        <el-form-item label="id" prop="awardId" v-show="false">
            <el-input v-model="addAwardForm.awardId"></el-input>
        </el-form-item>
        <el-form-item  label="奖励类型:" prop="awardType">
            <el-select v-model="addAwardForm.awardType" placeholder="奖励类型" style="width:320px;">
                <el-option label="demo0" value="0"></el-option>
                <el-option label="demo1" value="1"></el-option>
            </el-select>
        </el-form-item>
      
      <el-form-item label="奖励日期:" prop="awardDate">
        <el-date-picker v-model="addAwardForm.awardDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          style="width:320px;" placeholder="请选择奖励日期时间" clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="奖励原因:" prop="reward">
        <el-input v-model="addAwardForm.reward" type="textarea" placeholder="请输入奖励原因"
          :rows=2 style="width:320px;"></el-input>
      </el-form-item>
        <el-form-item label="奖励机构:" prop="awardDept" v-show="false">
            <el-input v-model="addAwardForm.awardDept" style="width:320px;"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="note">
            <el-input v-model="addAwardForm.note" type="textarea" placeholder="请输入备注"
            :rows=2 style="width:320px;"></el-input>
        </el-form-item>
        <div class="item" style="text-align:center">
            <span slot="footer" class="dialog-footer">
                <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button>
                <el-button type="success" @click="submit('addAwardForm')" icon="el-icon-check">提 交</el-button>
            </span>
        </div>
    </el-form>
    </el-dialog>
</template>
<script>

export default {
    data(){
        return{
            visible: false,
            addAwardForm: {
                awardType: "",
                note: "",
                awardDate: "",
                reward: "",
                awardDept: "",
                dataType: 0,
                personId:"555",
                awardId:"",
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2
        }
    },
    methods:{
        //提交
        submit() {
            let data = {
                awardType:this.addAwardForm.awardType,
                note:this.addAwardForm.note,
                awardDate:this.addAwardForm.awardDate,
                reward:this.addAwardForm.reward,
                awardDept:this.addAwardForm.awardDept,
                dataType:this.addAwardForm.dataType,
                personId:this.addAwardForm.personId,
                awardId:this.addAwardForm.awardId
            };
            if(this.handelType==1){
                this.$store.dispatch("addAwardMoudle", this.addAwardForm).then(res => {
                    this.$emit("getAllReward");
                        this.$message({
                            type: "success",
                            message:  "添加成功!",
                        });
                        this.visible = false;
                    });
                    err => {
                        console.log(err);
                };
            }else if(this.handelType==2){
                this.$store.dispatch("updateAwardMoudle", this.addAwardForm).then(res => {
                    this.$emit("getAllReward");
                        this.$message({
                            type: "success",
                            message:  "修改成功!",
                        });
                        this.visible = false;
                    });
                    err => {
                        console.log(err);
                };
            }

        },
        showModal(type,row) {
            this.visible = true;
            this.handelType = type;
            if(type==1){//新增
                this.dialogTitle = "新增";
            }else if(type==2){//修改
                this.dialogTitle = "修改";
                this.addAwardForm.awardType=row.awardType;
                this.addAwardForm.note=row.note;
                this.addAwardForm.awardDate=row.awardDate;
                this.addAwardForm.reward=row.reward;
                this.addAwardForm.awardDept=row.awardDept;
                this.addAwardForm.dataType=row.dataType;
                this.addAwardForm.awardId=row.awardId;
            }

         },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addAwardForm"].resetFields();
            this.errorName = false;
        },
    }
}
</script>
<style lang="less">
  @import "../../../css/personManage.less";
</style>
