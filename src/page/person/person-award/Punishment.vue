<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%"
    >
        <el-form ref="addPunishmentForm" :model="addPunishmentForm" label-position="right"  label-width="100px" :rules="rules">
            <el-form-item label="id" prop="awardId" v-show="false">
                <el-input v-model="addPunishmentForm.awardId"></el-input>
            </el-form-item>
            <el-form-item  label="惩罚类型：" prop="awardTypeName">
                <el-select
                    v-model="addPunishmentForm.awardTypeName"
                    placeholder="惩罚类型"
                    @change="selectVal($event)"
                    filterable
                    remote
                    @focus="getAwardList('人员信息-惩罚类型')">
                    <el-option
                        v-for="value in punishmentInfo" :key="value.id" :label="value.name" :value="value.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="惩罚机构：" prop="awardDept">
                <el-input v-model="addPunishmentForm.awardDept"></el-input>
            </el-form-item>
            <el-form-item label="惩罚日期：" prop="awardDate">
                <el-date-picker v-model="addPunishmentForm.awardDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                placeholder="请选择惩罚日期" clearable></el-date-picker>
            </el-form-item>
            <el-form-item label="惩罚原因：" prop="reward">
                <el-input
                    v-model="addPunishmentForm.reward"
                    type="textarea"
                    placeholder="最多输入四十个字符"
                    :rows='2'
                    maxlength="40"
                    show-word-limit></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog()">取 消</el-button>
            <el-button type="primary" @click="submit('addPunishmentForm')">保 存</el-button>
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
            visible: false,
            punishmentInfo:[],
            addPunishmentForm: {
                awardType: "",
                awardId:"",
                reward: "",
                note: "",
                awardDate: "",
                personId: this.params.id,
                dataType:"1",//惩罚标识
            },
            rules: {
                awardTypeName: [{ required: true, message: "惩罚类型必须填写", trigger: "change" }],
                awardDate: [{ required: true, message: "惩罚日期必须填写", trigger: "blur" }],
                reward: [{ required: true, message: "惩罚原因必须填写", trigger: "blur" }],
                awardDept: [{ required: true, message: "惩罚机构必须填写", trigger: "blur" }]
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2
        }
    },
    methods:{
        selectVal(event){
            let _this = this
            _this.addPunishmentForm.awardType=event;
        },
        //奖励类型
        getAwardList(name,codeName){
            let _this= this
            _this.$store.dispatch("findAllDrawerByName",name).then(    //惩罚类型
                res=>{
                    if(res.code===200){
                        _this.punishmentInfo=res.data;
                    }else{
                        console.info("没有查询到数据");
                    }
                }, err => {this.$message.error(err.msg)}
            );
        },
        //提交
        submit() {
            let _this = this
            _this.$refs.addPunishmentForm.validate((valid) => {
                if (valid) {
                    if(_this.handelType===1){
                        _this.$store.dispatch("addAwardMoudle", _this.addPunishmentForm).then(res => {
                            _this.$emit("getAllPunishment");
                                _this.$message({
                                    type: "success",
                                    message:  "添加成功!",
                                });
                                _this.closeDialog();
                        }, err => {
                            _this.$message({type: "warning", message:  err.msg || ''});
                        });
                    }else if(_this.handelType===2){
                        _this.$store.dispatch("updateAwardMoudle", _this.addPunishmentForm).then(res => {
                            _this.$emit("getAllPunishment");
                                _this.$message({
                                    type: "success",
                                    message:  "修改成功!",
                                });
                                _this.closeDialog();
                        }, err => {
                            _this.$message({type: "warning", message:  err.msg || ''});
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        showModal(type,row) {
            let _this = this
            _this.visible = true;
            _this.handelType = type;
            if(type==1){//新增
                _this.dialogTitle = "新增";
            }else if(type==2){//修改
                _this.dialogTitle = "修改";
                _this.addPunishmentForm.awardType=row.awardType;
                _this.addPunishmentForm.note=row.note;
                _this.addPunishmentForm.awardDate=row.awardDate;
                _this.addPunishmentForm.reward=row.reward;
                _this.addPunishmentForm.awardDept=row.awardDept;
                _this.addPunishmentForm.dataType=row.dataType;
                _this.addPunishmentForm.awardId=row.awardId;
                _this.addPunishmentForm.personId= this.params.id;
                _this.addPunishmentForm.awardTypeName=row.awardTypeName;
            }
         },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            let _this = this 
            _this.$refs["addPunishmentForm"].resetFields();
            _this.emptyForm();
            _this.visible = false;
            _this.errorName = false;
        },
        // 清空表单数据
        emptyForm(){
            for(const key in this.addPunishmentForm){
                this.addPunishmentForm[key] = '';
            }
            this.addPunishmentForm.personId = this.params.id;
            this.addPunishmentForm.dataType = '1';
        }
    },
    created(){
        let _this = this 
    }
}
</script>
<style lang="scss" scoped>
>>>.el-date-editor.el-input, >>>.el-select{
    width: 100%;
}
>>>.el-icon-date{
    line-height: 32px;
}
</style>
