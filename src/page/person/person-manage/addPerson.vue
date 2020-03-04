<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="50%">
        <el-form :inline="true" :model="addPersonForm" label-position="right"  label-width="140px" ref="addPersonForm">
            <el-row style="height:1px;">
                <el-form-item label="id" prop="personId" v-show="false">
                    <el-input v-model="addPersonForm.personId"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="姓名:" prop="personName">
                    <el-input v-model="addPersonForm.personName" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="sex">
                    <el-input v-model="addPersonForm.sex" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="民族:" prop="nation">
                    <el-input v-model="addPersonForm.nation" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="学历:" prop="degree">
                    <el-input v-model="addPersonForm.degree" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="身份证号:" prop="idNo">
                    <el-input v-model="addPersonForm.idNo" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="出生日期:" prop="birthDate">
                    <el-input v-model="addPersonForm.birthDate" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="所属机构:" prop="oid">
                    <el-input v-model="addPersonForm.oid" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="执法门类:" prop="branchId">
                    <el-input v-model="addPersonForm.branchId" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="毕业学校:" prop="school">
                    <el-input v-model="addPersonForm.school" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="毕业专业:" prop="major">
                    <el-input v-model="addPersonForm.major" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="政治面貌:" prop="politicalStatus">
                    <el-input v-model="addPersonForm.politicalStatus" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="入党日期:" prop="admissionDate">
                    <el-input v-model="addPersonForm.admissionDate" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="执法证号:" prop="certNo">
                    <el-input v-model="addPersonForm.certNo" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="人员编制:" prop="staffing">
                    <el-input v-model="addPersonForm.staffing" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="职务名称:" prop="post">
                    <el-input v-model="addPersonForm.post" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="执法区域:" prop="area">
                    <el-input v-model="addPersonForm.area" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="证件状态:" prop="certStatus">
                    <el-input v-model="addPersonForm.certStatus" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="人员状态:" prop="personStatus">
                    <el-input v-model="addPersonForm.personStatus" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="分配渠道:" prop="disChannel">
                    <el-input v-model="addPersonForm.disChannel" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="毕业证书编号:" prop="graduationNo">
                    <el-input v-model="addPersonForm.graduationNo" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="参加工作日期:" prop="workDate">
                    <el-input v-model="addPersonForm.workDate" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="从事执法日期:" prop="enfoceDate">
                    <el-input v-model="addPersonForm.enfoceDate" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="海事执法证号:" prop="maritimeNo">
                    <el-input v-model="addPersonForm.maritimeNo" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="资格证书编号:" prop="qualificationNo">
                    <el-input v-model="addPersonForm.qualificationNo" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:40px;">
                <el-form-item label="省内执法证号:" prop="provinceNo">
                    <el-input v-model="addPersonForm.provinceNo" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item label="原持部级执法证号:" prop="ministerialNo">
                    <el-input v-model="addPersonForm.ministerialNo" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:150px;">
                <el-form-item label="照片:" prop="photoUrl">
                    <!-- <div class="block" style="width:260px;">
                        <el-avatar shape="square" :size="150" style="width:260px;background: #E5E8EE;" :src="photoUrl"></el-avatar>
                    </div>-->
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注:" prop="note">
                    <el-input type="textarea" style="width:260px;" :rows="5" v-model="addPersonForm.note"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="附件类型:" prop="attached">
                    <el-select v-model="addPersonForm.attached" style="width: 260px;" placeholder="附件类型">
                        <el-option label="身份证" value="0"></el-option>
                        <el-option label="学历证明" value="1"></el-option>
                        <el-option label="编制证明" value="2"></el-option>
                        <el-option label="其他文件" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="附件:" prop="attached">
                    <el-input v-model="addPersonForm.attached" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <div class="item" style="text-align:center;margin-top:10px;">
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
            imageUrl: '',
            visible: false,
            addPersonForm: {
                personsId:"",//id
                idNo: "",     //身份证号
                personName:"",//执法人名
                birthDate:"",//出生日期
                nation:"",//民族
                degree:"",//学历
                politicalStatus:"",//政治面貌
                admissionDate:"",//入党日期
                school:"",//毕业学校
                major:"",//专业
                graduationNo:"",//毕业证书编号
                oid:"",//所属机构
                post:"",//职务
                area:"",//执法区域
                disChannel:"",//分配渠道
                staffing:"",//人员编制
                workDate:"",//参加工作时间
                photo:"",//照片
                branchId:"",//执法门类
                enfoceDate:"",//从事执法日期
                certNo:"",//执法证号
                qualificationNo:"",//资格证书编号
                provinceNo:"",//现持省内执法证号
                ministerialNo:"",//现持部级执法证号
                maritimeNo:"",//现持海事执法证号
                note:"",//备注
                certStatus:"",//证件状态
                personStatus:"",//人员状态
                attachedUrl:"",//附件路径
                attached:"",//附件
                photoUrl:"",//照片路径
                personType:"",//人员类型
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
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
            let _this = this
            if(this.handelType==1){
                this.$store.dispatch("addPersonInfo", this.addPersonForm).then(res => {
                    _this.$emit("getAllPersons");
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
                this.$store.dispatch("updatePersonInfo", this.addPersonForm).then(res => {
                    _this.$emit("getAllPersons");
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 260px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 260px;
    height: 150px;
    display: block;
  }
</style>
