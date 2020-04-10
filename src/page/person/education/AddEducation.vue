<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="60%"
    >
    <el-form :inline="true" :model="addEducationForm"  ref="addEducationForm">
        <el-form-item label="学历" prop="degree">
            <el-select v-model="addEducationForm.degree" placeholder="学历">
                <el-option label="demo0" value="0"></el-option>
                <el-option label="demo1" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="毕业院校" prop="school">
            <el-select v-model="addEducationForm.school" placeholder="毕业院校">
                <el-option label="demo0" value="0"></el-option>
                <el-option label="demo1" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="毕业专业" prop="major">
            <el-select v-model="addEducationForm.major" placeholder="毕业专业">
                <el-option label="demo0" value="0"></el-option>
                <el-option label="demo1" value="1"></el-option>
            </el-select>
        </el-form-item>
      <el-form-item label="毕业日期" prop="graduationDate">
        <el-date-picker v-model="addEducationForm.graduationDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          :style="{width: '100%'}" placeholder="请选择毕业日期" clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="addEducationForm.note" type="textarea" placeholder="请输入备注"
          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>
        <div class="item" style="text-align:center">
            <span slot="footer" class="dialog-footer">
                <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button>
                <el-button type="success" @click="submit('addEducationForm')" icon="el-icon-check">提 交</el-button>
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
            addEducationForm: {
                degree: "",
                school: "",
                major: "",
                graduationDate: "",
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
                degree:this.addEducationForm.degree,
                school:this.addEducationForm.school,
                major:this.addEducationForm.major,
                graduationDate:this.addEducationForm.graduationDate,
                note:this.addEducationForm.note,
            };
            let _this = this
            if(this.handelType==1){
                this.$store.dispatch("addEducationMoudle", this.addEducationForm).then(res => {
                    _this.$emit("getEducationList");
                        _this.$message({
                            type: "success",
                            message:  "添加成功!",
                        });
                        _this.visible = false;
                    });
                    err => {
                        console.log(err);
                };
            }else if(this.handelType==2){
                this.$store.dispatch("updateEducationMoudle", this.addEducationForm).then(res => {
                    _this.$emit("getEducationList");
                        _this.$message({
                            type: "success",
                            message:  "修改成功!",
                        });
                        _this.visible = false;
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
                this.dialogTitle = "新增执法人员教育信息";
            }else if(type==2){//修改
				this.addEducationForm.educationId=row.educationId;
                this.addEducationForm.degree=row.degree;
                this.addEducationForm.school=row.school;
                this.addEducationForm.major=row.major;
                this.addEducationForm.graduationDate=row.graduationDate;
                this.addEducationForm.note=row.note;
            }

         },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addEducationForm"].resetFields();
            this.errorName = false;
        },
    }
}
</script>
<style lang="scss">
  @import "@/assets/css/personManage.scss";
</style>
