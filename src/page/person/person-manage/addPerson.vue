<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="60%"
    >
    <el-form :inline="true" :model="addPersonForm"  ref="addPersonForm">
        <div class="item">
            <el-form-item label="id" prop="personId" v-show="false">
                <el-input v-model="addPersonForm.personId"></el-input>
            </el-form-item>
            <el-form-item label="人员姓名" prop="personName">
                <el-input v-model="addPersonForm.personName"></el-input>
            </el-form-item>
            <el-form-item label="执法证号" prop="zfzh">
                <el-input v-model="addPersonForm.zfzh"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNo">
                <el-input v-model="addPersonForm.idNo"></el-input>
            </el-form-item>
        </div>
        <div class="item" >
            <el-form-item label="执法门类" prop="zfml">
                <el-input v-model="addPersonForm.zfml"></el-input>
            </el-form-item>
            <el-form-item label="所属机构" prop="ssjg">
                <el-input v-model="addPersonForm.ssjg"></el-input>
            </el-form-item>
            <el-form-item label="证件状态" prop="zjzt">
                <el-input v-model="addPersonForm.zjzt"></el-input>
            </el-form-item>
        </div>
        <div class="item">
            <el-form-item label="性别" prop="sex">
                <el-select v-model="addPersonForm.sex" placeholder="性别">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职务名称" prop="prof">
                <el-input v-model="addPersonForm.prof"></el-input>
            </el-form-item>
        </div>
        <div class="item" style="text-align:center">
            <span slot="footer" class="dialog-footer">
                <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button>
                <el-button type="success" @click="submitPerson('addPersonForm')" icon="el-icon-check">提 交</el-button>
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
            addPersonForm: {
                idNo: "",     //身份证号
                personName:"",//执法人名
                zfzh:"",
                zfml:"",
                zjzt:"",
                ssjg:"",
                sex:"",
                prof:"",
                personId:"",
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2
        }
    },
    methods:{
        //提交怎么
        submitPerson() {
            let data = {
                personId:this.addPersonForm.personId,
                idNo: this.addPersonForm.idNo,
                personName: this.addPersonForm.personName,
                sex: this.addPersonForm.sex,
                zfzh: this.addPersonForm.zfzh,
                zfml:this.addPersonForm.zfml,
                zjzt:this.addPersonForm.zjzt,
                ssjg:this.addPersonForm.ssjg,
                prof:this.addPersonForm.prof
            };
            if(this.handelType==1){
                this.$store.dispatch("addPersonInfo", this.addPersonForm).then(res => {
                    this.$emit("getAllPersons");
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
                console.info(this.addPersonForm);
                this.$store.dispatch("updatePersonInfo", this.addPersonForm).then(res => {
                    this.$emit("getAllPersons");
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
                this.dialogTitle = "新增执法人员";
            }else if(type==2){//修改
                this.addPersonForm.personId=row.personId;
                this.addPersonForm.idNo=row.idNo;
                this.addPersonForm.personName=row.personName;
                this.addPersonForm.zfzh=row.zfzh;
                this.addPersonForm.zfml=row.zfml;
                this.addPersonForm.ssjg=row.ssjg;
                this.addPersonForm.zjzt=row.zjzt;
                this.addPersonForm.set=row.sex;
                this.addPersonForm.prof=row.prof;
            }

         },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addPersonForm"].resetFields();
            this.errorName = false;
        },
    }
}
</script>
<style lang="scss">
@import "@/assets/css/personManage.scss";
</style>
