<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%">
        <el-form
            v-if="visible"
            :model="addEducationForm"
            label-position="right"
            label-width="100px"
            ref="addEducationFormRef"
            :rules="rules">
            <el-row>
                <el-form-item label="毕业时间:" prop="graduationDate">
                    <el-date-picker
                        v-model="addEducationForm.graduationDate"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择毕业时间"
                        :disabled='isDisabled'
                        clearable
                        popper-class="pop-datepicker"
                    ></el-date-picker>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="毕业学校:" prop="school">
                    <el-input v-model="addEducationForm.school"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="毕业专业:" prop="majorName">
                    <!-- <el-input v-model="addEducationForm.major"></el-input> -->
                    <el-select
                      v-model="addEducationForm.majorName"
                      placeholder="毕业专业"
                      :filterable="majorOptions.length > 5"
                      :popper-append-to-body="false"
                      @change="selectVal($event,'major')"
                      @focus="getDictInfo('人员信息-毕业专业','majorOptions')">
                      <el-option
                        v-for="value in majorOptions" :key="value.id" :label="value.name" :value="value.id">
                      </el-option>        
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="学历:"  prop="degreeName">
                    <el-select
                        v-model="addEducationForm.degreeName"
                        placeholder="学历"
                        filterable
                        :popper-append-to-body="false"
                        @change="selectVal($event, 'degree')"
                        @focus="getDictInfo('人员信息-学历', 'degreeInfo')">
                        <el-option
                            v-for="value in degreeInfo" :key="value.id" :label="value.name" :value="value.id">
                        </el-option>        
                    </el-select>
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <div v-if="handelType!=3" style="padding-right: 12px;">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit('addEducationForm')">保 存</el-button>
            </div>
            <div v-if="handelType==3" style="padding-right: 12px;">
                <el-button type="danger" @click="closeDialog">取 消</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>

export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: 'add', id: '' }
      },
      required: true
    }
  },
  data(){
        return{
            isDisabled:false,
            visible: false,
            degreeInfo:[],//学历信息
            majorOptions:[],// 毕业专业
            addEducationForm: {
                personId: this.params.id,
                personName:"",
                degree: "",
                degreeName:"",
                school: "",
                major: "",
                majorName:"",
                graduationDate: "",
                note: "",
            },
            rules: {
                graduationDate: [{ required: true, message: "毕业时间必须填写", trigger: "blur" }],
                school: [{ required: true, message: "毕业学校必须填写", trigger: "blur" }],
                // majorName: [{ required: true, message: "毕业专业必须填写", trigger: "blur" }],
                degreeName: [{ required: true, message: "学历必须填写", trigger: "change" }]
            },
            dialogTitle: "", //弹出框title
            handelType: 0, //添加 0  修改2  查看3
        }
    },
    methods:{
        selectVal(event, name){
            this.addEducationForm[name]=event;
        },
        //提交先校验表单项
        submit() {
            let _this = this;
            _this.$refs.addEducationFormRef.validate((valid) => {
                if (valid) {
                    this.saveFormData();
                } else {
                    return false;
                }
            });
        },
        // 保存表单数据
        saveFormData() {
            let _this = this;
            if(_this.handelType==1){
                _this.$store.dispatch("addEducationMoudle", _this.addEducationForm).then(res => {
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
            }else if(_this.handelType==2){
                _this.$store.dispatch("updateEducationMoudle", _this.addEducationForm).then(res => {
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
            let _this=this
            _this.visible = true;
            _this.handelType = type;
            console.log(_this.addEducationForm);
            if(type==1){//新增
                _this.dialogTitle = "新增";
                _this.isDisabled=false;
            }else if(type==2 || type==3){//修改,查看
                if(type==2){
                    _this.dialogTitle = "修改";
                    _this.isDisabled=false;
                }else if(type==3){
                    _this.dialogTitle = "详情";
                    _this.isDisabled=true;
                }
				_this.addEducationForm.educationId=row.educationId;
                _this.addEducationForm.degree=row.degree;
                _this.addEducationForm.degreeName=row.degreeName;
                _this.addEducationForm.school=row.school;
                _this.addEducationForm.major=row.major;
                _this.addEducationForm.majorName=row.majorName;
                _this.addEducationForm.graduationDate=row.graduationDate;
                _this.addEducationForm.note=row.note;
            }
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.$refs["addEducationFormRef"].resetFields();
            this.emptyForm();
            this.visible = false;
        },
        getDictInfo(name, codeName){//根据数据字典查询
            let _this=this;
            _this.$store.dispatch("findAllDrawerByName",name).then( 
                res=>{
                    if(res.code===200){
                        _this[codeName] = res.data;
                    }
                },
                err => {
                    console.log(err);
                }
            ).catch(()=>{});
        },
        // 清空表单数据
        emptyForm(){
            for(const key in this.addEducationForm){
                this.addEducationForm[key] = '';
            }
            this.addEducationForm.personId = this.params.id
        }
    }
}
</script>
<style lang="scss" scoped>
>>>.el-date-editor.el-input, >>>.el-select{
    width: 100%;
}
>>>.el-icon-date{
    line-height: 36px;
}
>>>.pop-datepicker{
    z-index: 5000;
}
</style>
