<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="25%">
        <el-form :inline="true" :model="addExamBatchForm" label-position="right"  label-width="100px" ref="addExamBatchFormRef" :rules="rules">
            <el-row>
                <el-form-item label="考试名称" prop="examName" class="form-class">
                    <el-input v-model="addExamBatchForm.examName" style="width: 320px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="考试类型" prop="examType">
                    <el-select v-model="addExamBatchForm.examType" placeholder="考试类型" style="width: 320px;" remote  @focus="getDictInfo('人员信息-考试类型','examTypeInfo')">
                        <el-option
                            v-for="value in examTypeInfo" :key="value.id" :label="value.name" :value="value.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="试题排序" prop="examSort">
                    <el-select v-model="addExamBatchForm.examSort" placeholder="考试类型" style="width: 320px;" remote  @focus="getDictInfo('人员信息-考试类型','examBatchSortInfo')">
                        <el-option
                            v-for="value in examBatchSortInfo" :key="value.id" :label="value.name" :value="value.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="考试人数" prop="examSum" class="form-class">
                    <el-input v-model="addExamBatchForm.examSum" style="width: 320px;"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="开始时间" prop="examBegin">
                    <el-date-picker v-model="addExamBatchForm.examBegin" style="width: 320px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间" clearable></el-date-picker>
                </el-form-item>
                                
            </el-row>
            <el-row>
                <el-form-item label="结束时间" prop="examEnd">
                    <el-date-picker v-model="addExamBatchForm.examEnd" format="yyyy-MM-dd" style="width: 320px;" value-format="yyyy-MM-dd" placeholder="请选择结束时间" clearable></el-date-picker>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="备注" prop="remark" class="form-class">
                    <el-input v-model="addExamBatchForm.remark" style="width: 320px;"></el-input>
                </el-form-item>
            </el-row>
            <div class="item" style="text-align:right">
                <span slot="footer" class="dialog-footer">
                    <div v-if="handelType!=3">
                        <el-button type="primary" @click="submit">保 存</el-button>
                        <el-button  @click="visible = false">离 开</el-button>
                    </div>
                </span>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            examTypeInfo:[],
            examBatchSortInfo:[],
            isDisabled:true,
            visible: false,
            addExamBatchForm: {
                examName:"", //考试名称
                examType:"",//考试类型
                examTypeName:"",//考试类型名称
                examSort:"",//试题顺序
                examSum: "",//考试人数
                examBegin: "",//考试开始时间
                examEnd:"",//考试结束时间
                remark: "",//备注
            },
            rules: {
                examBatchName: [{ required: true, message: "考试名称不能为空", trigger: "blur" }],
                examBatchCount: [{ required: true, message: "考试人数不能为空", trigger: "blur" }],
                examBatchReadyStartTime: [{ required: true, message: "考试开始时间不能为空", trigger: "blur" }],
                examBatchReadyEndTime: [{ required: true, message: "考试结束时间不能为空", trigger: "blur" }],
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2  查看3
        }
    },
    methods:{
        //提交
        submit() {
            let _this = this
            if(_this.addExamBatchForm.examBatchName===""){
                _this.$message({
                    type:'warning',
                    message:'考试名称不能为空',
                });
                return;
            }
            if(_this.addExamBatchForm.examBatchCount===""){
                _this.$message({
                    type:'warning',
                    message:'考试人数不能为空',
                });
                return;
            }
            if(_this.addExamBatchForm.examBatchReadyStartTime===""){
                _this.$message({
                    type:'warning',
                    message:'考试开始时间不能为空',
                });
                return;
            }
            if(_this.addExamBatchForm.examBatchReadyEndTime===""){
                _this.$message({
                    type:'warning',
                    message:'考试结束时间不能为空',
                });
                return;
            }
            if(_this.handelType==1){
                _this.$store.dispatch("addExamBatch", _this.addExamBatchForm).then(res => {
                    _this.$emit("getExamBatchListComp");
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
                _this.$store.dispatch("addExamBatch", _this.addExamBatchForm).then(res => {
                    _this.$emit("getExamBatchListComp");
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
         //点击下拉框的时查询试卷类型
        getDictInfo(name,codeName){
            this.$store.dispatch("findAllDrawerByName",name).then(   
                res=>{
                    if(res.code===200){
                        if(codeName==='examBatchSortInfo'){
                            this.examTypeInfo=res.data;
                            this.examTypeInfo.unshift({id:'',name:'全部'});
                        }
                    }else{
                        console.info("没有查询到数据");
                    }
                }
            );
        },
        showModal(type,row) {
            let _this=this
            _this.visible = true;
            _this.handelType = type;
            if(type==1){//新增
                _this.dialogTitle = "新增考试";
                _this.isDisabled=false;
            }else if(type==2){//修改,查看
                if(type==2){
                    _this.dialogTitle = "修改考试";
                    _this.isDisabled=false;
                }else if(type==3){
                    _this.dialogTitle = "考试详情";
                    _this.isDisabled=true;
                }
				_this.addExamBatchForm.examName=row.examName;
                _this.addExamBatchForm.examType=row.examType;
                _this.addExamBatchForm.examTypeName=row.examTypeName;
                _this.addExamBatchForm.examBegin=row.examBegin;
                _this.addExamBatchForm.examEnd=row.examEnd;
                _this.addExamBatchForm.examSum=row.examSum;
                _this.addExamBatchForm.remark=row.remark;
                _this.addExamBatchForm.examSort=row.examSort;
            }
        },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addExamBatchFormRef"].resetFields();
            this.errorName = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.el-input__inner{
    width:320px;
}
</style>
