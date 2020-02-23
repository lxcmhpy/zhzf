<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%"
    >
    <el-form :inline="true" :model="addPunishmentForm" label-position="right"  label-width="100px"  ref="addPunishmentForm">
        <el-form-item label="id" prop="awardId" v-show="false">
            <el-input v-model="addPunishmentForm.awardId"></el-input>
        </el-form-item>
        <el-form-item  label="惩罚类型" prop="awardType">
            <el-select v-model="addPunishmentForm.awardType" placeholder="惩罚类型" style="width:320px;">
                <el-option label="demo0" value="0"></el-option>
                <el-option label="demo1" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="惩罚日期" prop="awardDate">
            <el-date-picker v-model="addPunishmentForm.awardDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            style="width:320px;" placeholder="请选择惩罚日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="惩罚原因" prop="reward">
            <el-input v-model="addPunishmentForm.reward" type="textarea" placeholder="请输入惩罚原因"
            :rows=2 style="width:320px;"></el-input>
        </el-form-item>
        <el-form-item label="惩罚机构" prop="awardDept" v-show="false">
            <el-input v-model="addPunishmentForm.awardDept" style="width:320px;"></el-input>
        </el-form-item>
         <el-form-item label="备注" prop="note">
            <el-input v-model="addPunishmentForm.note" type="textarea" placeholder="请输入备注"
            :rows=2 style="width:320px;"></el-input>
        </el-form-item>
        <div class="item" style="text-align:center">
            <span slot="footer" class="dialog-footer">
                <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button>
                <el-button type="success" @click="submit('addPunishmentForm')" icon="el-icon-check">提 交</el-button>
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
            addPunishmentForm: {
                awardType: "",
                note: "",
                awardDate: "",
                reward: "",
                awardDept: "",
                dataType: "",
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
                awardType:this.addPunishmentForm.awardType,
                note:this.addPunishmentForm.note,
                awardDate:this.addPunishmentForm.awardDate,
                reward:this.addPunishmentForm.reward,
                awardDept:this.addPunishmentForm.awardDept,
                dataType:this.addPunishmentForm.dataType,
                personId:this.addPunishmentForm.personId,
                awardId:this.addPunishmentForm.awardId
            };
            if(this.handelType==1){
                this.$store.dispatch("addAwardMoudle", this.addPunishmentForm).then(res => {
                    this.$emit("getAllPunishment");
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
                console.info(this.addPunishmentForm.awardId);
                this.$store.dispatch("updateAwardMoudle", this.addPunishmentForm).then(res => {
                    this.$emit("getAllPunishment");
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
                this.addPunishmentForm.awardType=row.awardType;
                this.addPunishmentForm.note=row.note;
                this.addPunishmentForm.awardDate=row.awardDate;
                this.addPunishmentForm.reward=row.reward;
                this.addPunishmentForm.awardDept=row.awardDept;
                this.addPunishmentForm.dataType=row.dataType;
                this.addPunishmentForm.awardId=row.awardId;
            }

         },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addPunishmentForm"].resetFields();
            this.errorName = false;
        },
    }
}
</script>
<style lang="less">
  @import "../../../css/personManage.less";
</style>
