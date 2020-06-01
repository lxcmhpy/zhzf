<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%">
    <el-form :model="addAwardForm" label-position="right"  label-width="100px"  ref="addAwardForm" :rules="rules">
        <el-form-item label="id" prop="awardId" v-show="false">
            <el-input v-model="addAwardForm.awardId"></el-input>
        </el-form-item>
        <el-form-item  label="奖励类型:" prop="awardTypeName">
            <el-select v-model="addAwardForm.awardTypeName" placeholder="奖励类型" remote  @change="selectValue($event)"  @focus="getAwardList('人员信息-奖励类型')">
                <el-option v-for="value in awardInfo" :key="value.id" :label="value.name" :value="value.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="奖励日期:" prop="awardDate">
            <el-date-picker v-model="addAwardForm.awardDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择奖励日期时间" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="奖励机构:" prop="awardDept">
            <el-input v-model="addAwardForm.awardDept" type="textarea" placeholder="请输入奖励机构"  :rows='2'></el-input>
        </el-form-item>
        <el-form-item label="奖励原因:" prop="reward">
            <el-input
                v-model="addAwardForm.reward"
                type="textarea"
                placeholder="请输入奖励原因"
                :rows='2'
                maxlength="40"
                show-word-limit></el-input>
        </el-form-item>
    </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog()">取 消</el-button>
            <el-button type="primary" @click="submit('addAwardForm')">保 存</el-button>
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
            awardInfo:[],//奖励类型
            addAwardForm: {
                awardType: "",
                note: "",
                awardDate: "",
                reward: "",
                awardDept: "",
                awardId:"",
                awardTypeName:"",
                personId: this.params.id,
                dataType:"0",//奖励标识
            },
            rules: {
                awardTypeName: [{ required: true, message: "奖励类型必须填写", trigger: "blur" }],
                awardDate: [{ required: true, message: "奖励日期必须填写", trigger: "blur" }],
                reward: [{ required: true, message: "奖励原因必须填写", trigger: "blur" }],
                awardDept: [{ required: true, message: "奖励机构必须填写", trigger: "blur" }]
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2
        }
    },
    methods:{
        selectValue(event){//获取下拉框选中的值
            let _this = this ;
            _this.addAwardForm.awardType = event;
        },
         //获取奖励类型下拉框
        getAwardList(name,codeName){
            let _this= this 
            _this.$store.dispatch("findAllDrawerByName",name).then(
                res=>{
                    if(res.code===200){
                        _this.awardInfo=res.data;
                    }else{
                        console.info("没有查询到数据");
                    }
                }
            );
        },
        //提交
        submit() {
            let _this = this
             _this.$refs.addAwardForm.validate((valid) => {
                if (valid) {
                    if(_this.handelType===1){
                        _this.$store.dispatch("addAwardMoudle", _this.addAwardForm).then(res => {
                            _this.$emit("getAllReward");
                                _this.$message({type: "success", message:  "添加成功!"});
                                _this.closeDialog();
                            }, err => {
                                _this.$message({type: "warning", message:  err.msg || ''});
                            });
                    }else if(_this.handelType===2){//修改
                        _this.$store.dispatch("updateAwardMoudle", _this.addAwardForm).then(res => {
                            _this.$emit("getAllReward");
                                _this.$message({type: "success", message: "修改成功!" });
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
            if(type===1){//新增
                _this.dialogTitle = "新增";
            }else if(type===2){//修改
                _this.dialogTitle = "修改";
                _this.addAwardForm.awardType=row.awardType;
                _this.addAwardForm.note=row.note;
                _this.addAwardForm.awardDate=row.awardDate;
                _this.addAwardForm.reward=row.reward;
                _this.addAwardForm.awardDept=row.awardDept;
                _this.addAwardForm.dataType=row.dataType;
                _this.addAwardForm.awardId=row.awardId;
                _this.addAwardForm.personId=_this.params.id;
                _this.addAwardForm.awardTypeName=row.awardTypeName;
            }
         },
         //聚焦清除错误信息
        focusName() {
            let _this = this 
            _this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            let _this = this
            _this.$refs["addAwardForm"].resetFields();
            _this.emptyForm();
            _this.visible = false;
            _this.errorName = false;
        },
        // 清空表单数据
        emptyForm(){
            for(const key in this.addAwardForm){
                this.addAwardForm[key] = '';
            }
            this.addAwardForm.personId = this.params.id;
            this.addAwardForm.dataType = '0';
        }
    },
    
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
