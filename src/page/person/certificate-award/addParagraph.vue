<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="25%">
        <el-form :inline="true" :model="addPersonForm" label-position="right"  label-width="100px" ref="addPersonForm">
            <el-row style="height:1px;">
                <el-form-item label="id" prop="personId" v-show="false">
                    <el-input v-model="addPersonForm.personId"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;">
                <el-form-item label="执法机构:" prop="attached">
                    <el-select v-model="addPersonForm.attached" style="width: 260px;" placeholder="机构名称">
                        <el-option label="宁夏回族自治区交通运输厅" ></el-option>
                        <el-option label="XX交通局" ></el-option>
                        <el-option label="XX交通局" ></el-option>
                        <el-option label="XX交通局" ></el-option>
                    </el-select>
                </el-form-item>
               
            </el-row>
            <span style="display:inline-block">
                            <input type="checkbox"  >综合执法
                        </span>
                        <span style="display:inline-block">
                        <input type="checkbox"  >工程质量监督
                        </span>
                        <span style="display:inline-block">
                        <input type="checkbox" >公路路政
                        </span>
                        <span style="display:inline-block">
                        <input type="checkbox"  >水路交通行政执法
                        </span>
                        <span style="display:inline-block">
                        <input type="checkbox"  >高速公路路政
                        </span>
            
            <el-form-item label="执法门类:" prop="attached">
                <el-row style="height:36px;">
                        
                    </el-row>
              </el-form-item>
           <el-row style="height:36px;">
                <el-form-item label="号段起:" prop="branchId">
                    <el-input v-model="addPersonForm.branchId" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:40px;">
                <el-form-item label="号段止:" prop="provinceNo">
                    <el-input v-model="addPersonForm.provinceNo" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
             <el-row style="height:40px;">
                <el-form-item label="备注:" prop="ministerialNo">
                    <el-input v-model="addPersonForm.ministerialNo" style="width:260px;"></el-input>
                </el-form-item>
            </el-row>
          
            <div class="item" style="text-align:center;margin-top:10px;">
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button type="danger"  @click="visible = false" icon="el-icon-close">取 消</el-button> -->
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
            alert("aaaa");
            this.visible = true;
            this.handelType = type;
            if(type==1){//新增
                this.dialogTitle = "新增执法号段";
            }else if(type==2){//修改
            //     this.addPersonForm.personId=row.personId;
            //     this.addPersonForm.idNo=row.idNo;
            //     this.addPersonForm.personName=row.personName;
            //     this.addPersonForm.zfzh=row.zfzh;
            //     this.addPersonForm.zfml=row.zfml;
            //     this.addPersonForm.ssjg=row.ssjg;
            //     this.addPersonForm.zjzt=row.zjzt;
            //     this.addPersonForm.set=row.sex;
            //     this.addPersonForm.prof=row.prof;
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
