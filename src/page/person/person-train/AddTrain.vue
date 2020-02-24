<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%"
    >
        <el-form :inline="true" :model="addTrainForm" label-position="right"  label-width="100px"  ref="addTrainForm">
            <el-row>
                <el-form-item label="执法人员id 引用" prop="personId" v-show="false">
                    <el-input v-model="addTrainForm.personId" style="width:320px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="培训类型:" prop="trainType">
                    <el-select v-model="addTrainForm.trainType" style="width:320px;" placeholder="培训类型">
                        <el-option label="demo0" value="0"></el-option>
                        <el-option label="demo1" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="培训开始时间:" prop="startTime">
                    <el-date-picker v-model="addTrainForm.startTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    placeholder="请选择培训开始时间" clearable style="width:320px;"></el-date-picker>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="培训结束时间:" prop="endTime">
                    <el-date-picker v-model="addTrainForm.endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    placeholder="请选择培训结束时间" clearable style="width:320px;"></el-date-picker>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="培训成绩:" prop="trainScore" v-show="false">
                    <el-input v-model="addTrainForm.trainScore" style="width:320px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="培训名称:" prop="trainName" v-show="false">
                    <el-input v-model="addTrainForm.trainName" style="width:320px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="培训机构:" prop="trainOrg" v-show="false">
                    <el-input v-model="addTrainForm.trainOrg" style="width:320px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="证书名称:" prop="certificateName" v-show="false">
                    <el-input v-model="addTrainForm.certificateName" style="width:320px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="证书编号:" prop="certificateNo" v-show="false">
                    <el-input v-model="addTrainForm.certificateNo" style="width:320px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="培训结果:" prop="trainResult">
                    <el-input v-model="addTrainForm.trainResult" type="textarea" :rows=2 style="width:320px;" placeholder="请输入培训结果"
                    ></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="备注:" prop="note">
                    <el-input v-model="addTrainForm.note" type="textarea" :rows=2 style="width:320px;" placeholder="请输入备注"
                    ></el-input>
                </el-form-item>
            </el-row>
            <div class="item" style="text-align:center">
                <span slot="footer" class="dialog-footer">
                    <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button>
                    <el-button type="success" @click="submit('addTrainForm')" icon="el-icon-check">提 交</el-button>
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
            addTrainForm: {
                personId: "",
                trainType: "",
                startTime: "",
                endTime: "",
                trainScore: "",
                trainName: "",
                trainOrg: "",
                certificateName: "",
                certificateNo: "",
                trainResult: "",
                note: "",
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
                personId:this.addTrainForm.personId,
                trainType:this.addTrainForm.trainType,
                startTime:this.addTrainForm.startTime,
                endTime:this.addTrainForm.endTime,
                trainScore:this.addTrainForm.trainScore,
                trainName:this.addTrainForm.trainName,
                trainOrg:this.addTrainForm.trainOrg,
                certificateName:this.addTrainForm.certificateName,
                certificateNo:this.addTrainForm.certificateNo,
                trainResult:this.addTrainForm.trainResult,
                note:this.addTrainForm.note,
            };
            if(this.handelType==1){
                this.$store.dispatch("addTrainMoudle", this.addTrainForm).then(res => {
                    this.$emit("getTrainList");
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
                this.$store.dispatch("updateTrainMoudle", this.addTrainForm).then(res => {
                    this.$emit("getTrainList");
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
				this.addTrainForm.trainId=row.trainId;
                this.addTrainForm.personId=row.personId;
                this.addTrainForm.trainType=row.trainType;
                this.addTrainForm.startTime=row.startTime;
                this.addTrainForm.endTime=row.endTime;
                this.addTrainForm.trainScore=row.trainScore;
                this.addTrainForm.trainName=row.trainName;
                this.addTrainForm.trainOrg=row.trainOrg;
                this.addTrainForm.certificateName=row.certificateName;
                this.addTrainForm.certificateNo=row.certificateNo;
                this.addTrainForm.trainResult=row.trainResult;
                this.addTrainForm.note=row.note;
            }

         },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addTrainForm"].resetFields();
            this.errorName = false;
        },
    }
}
</script>

<style  lang="scss" >
@import "@/assets/css/personManage.scss";
</style>
