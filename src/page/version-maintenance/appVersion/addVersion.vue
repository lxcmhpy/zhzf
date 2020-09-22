<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%">
        <el-form
            v-if="visible"
            :model="addVersionForm"
            label-position="right"
            label-width="100px"
            ref="addVersionFormRef"
            :rules="rules">
        
            <el-row>
                <el-form-item label="版本名称:" prop="appVersion">
                    <el-input v-model="addVersionForm.appVersion"></el-input>
                </el-form-item>
            </el-row>
             <el-row>
                <el-form-item label="版本号:" prop="appVersionCode">
                    <el-input v-model="addVersionForm.appVersionCode"></el-input>
                </el-form-item>
            </el-row>
           <el-row>
                <el-form-item label="是否强制更新:" prop="appForcedUpgrade">
                  <el-radio-group v-model="addVersionForm.appForcedUpgrade">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-row> 
            <el-row>
                <el-form-item label="下载地址:" prop="appUpgrade">
                    <el-input type="textarea" v-model="addVersionForm.appUpgrade"></el-input>
                </el-form-item>
            </el-row>
             <div v-if="handelType == 3">
                  <el-row>
                    <el-form-item label="创建时间" prop="createTime">
                        <el-input  v-model="addVersionForm.createTime"></el-input>
                    </el-form-item>
                  </el-row>  
                 <el-row>
                    <el-form-item label="操作人" prop="modifyId">
                        <el-input  v-model="addVersionForm.modifyId"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="操作时间" prop="modifyTime">
                        <el-input  v-model="addVersionForm.modifyTime"></el-input>
                    </el-form-item>
                  </el-row>    
            </div>
            <el-row>
                <el-form-item label="更新内容:" prop="appMessage">
                    <el-input type="textarea" v-model="addVersionForm.appMessage"></el-input>
                </el-form-item>
            </el-row>     
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="handelType==1 || handelType==2" >
                <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="submit('addVersionForm')">保 存</el-button>
        </div>
          <div slot="footer" class="dialog-footer" v-if="handelType==3" >
                <el-button type="primary" @click="closeDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>

export default {
  data(){
        return{
            isDisabled:false,
            visible: false,
            addVersionForm: {
                appId:"",
                appVersion: "",//版本名称
                appVersionCode:"",  //版本号
                appMessage: "",//更新内容
                appUpgrade:"", //下载地址
                appForcedUpgrade: "1",  //是否强制跟新  0：否  1：是
                modifyId:"",
                modifyTime:"",
                createTime:"",
            },
            
            rules: {
                appVersion: [{ required: true, message: "版本名称必须填写", trigger: "blur" }],
                appVersionCode: [{ required: true, message: "版本号必须填写", trigger: "blur" }],
                appMessage: [{ required: true, message: "更新内容必须填写", trigger: "blur" }],
                appUpgrade: [{ required: true, message: "下载地址必须填写", trigger: "change" }]
            },
            dialogTitle: "", //弹出框title
            handelType: 0, //添加 0  修改2  查看3
        }
    },
    methods:{
        //提交先校验表单项
        submit() {
            let _this = this;
            _this.$refs.addVersionFormRef.validate((valid) => {
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
                _this.$store.dispatch("addVersionModel", _this.addVersionForm).then(res => {
                    _this.$emit("getVersionList");
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
                var data = {
                appId:_this.addVersionForm.appId,
				appVersion:_this.addVersionForm.appVersion,
                appVersionCode:_this.addVersionForm.appVersionCode,
                appMessage:_this.addVersionForm.appMessage,
                appUpgrade:_this.addVersionForm.appUpgrade,
                appForcedUpgrade:_this.addVersionForm.appForcedUpgrade,
                }
                _this.$store.dispatch("updateVersionModel", data).then(res => {
                    _this.$emit("getVersionList");
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
            console.log(_this.addVersionForm);
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
                _this.addVersionForm.appId = row.appId;
				_this.addVersionForm.appVersion=row.appVersion;
                _this.addVersionForm.appVersionCode=row.appVersionCode;
                _this.addVersionForm.appMessage=row.appMessage;
                _this.addVersionForm.appUpgrade=row.appUpgrade;
                _this.addVersionForm.appForcedUpgrade=row.appForcedUpgrade;
                _this.appForcedUpgrade.createTime=row.createTime;
                _this.addVersionForm.modifyId=row.modifyId;
                _this.addVersionForm.modifyTime=row.modifyTime;
            }
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.$refs["addVersionFormRef"].resetFields();
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
            for(const key in this.addVersionForm){
                this.addVersionForm[key] = '';
            }
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
