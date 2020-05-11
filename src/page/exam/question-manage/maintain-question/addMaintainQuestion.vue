<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="52%">
        
        <el-form :inline="true" :model="addMaintainQuestionForm" label-position="right"  label-width="100px" ref="addMaintainQuestionFormRef" :rules="rules">
            <el-row style="margin-left:-55px;">
                <el-form-item label="题型" prop="questionType">
                    <el-select v-model="addMaintainQuestionForm.questionType" placeholder="选择题型" remote  @focus="getDictInfo('人员信息-执法领域','questionTypeList')">
                        <el-option
                            v-for="value in questionTypeList" :key="value.id" :label="value.name" :value="value.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="难度" prop="questionLevel">
                    <el-select v-model="addMaintainQuestionForm.questionLevel" placeholder="选择难度" remote  @focus="getDictInfo('人员信息-执法领域','level')">
                        <el-option
                            v-for="value in levelList" :key="value.id" :label="value.name" :value="value.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="" prop="outlineName" class="form-class" id="questionId">
                    <el-button style="background-color:#4aafa7;color:white;height:35px;" type="primary">题干</el-button>
                    <span>请在下方输入题目描述</span>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="14" class="form_class">
                    <el-form-item>
                        <el-input type="textarea" :rows="4" cols="80%"  placeholder="请输入内容" v-model="addMaintainQuestionForm.questionName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :span="4">
                    <el-form-item>
                        <el-upload
                            action=""
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            >
                            <i class="el-icon-plus" ></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="10%" :src="dialogImageUrl" alt="" :span="4">
                        </el-dialog>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row id="optionId">
                <!-- 选项页面 -->
                <el-row>
                    <el-form-item label="" prop="outlineName" class="form-class">
                        <el-button style="background-color:#4aafa7;color:white;height:35px;" type="primary">选项</el-button>
                        <span>{{questionTypeName}}单选题的选项范围从2到20,并在左侧选择多个为正确答案</span>
                    </el-form-item>
                </el-row>
                 <el-table :data="data">
                    <el-table-column min-width="25%" prop="check">
                        <template slot-scope="scope">
                            <el-radio label="checked"  @click="clickitem()">答案：{{data[scope.$index].checked}}</el-radio>
                        </template>
                    </el-table-column>
                     
                    <el-table-column id="ceshiId" min-width="100%" prop="answerName">
                        <template slot-scope="scope">
                         <el-input type="textarea" :rows="4" cols="57.5%" placeholder="" v-model="data[scope.$index].answerName"></el-input>
                        </template>
                    </el-table-column>
                     
                   
                    <el-table-column min-width="60%" prop="imgUrl">
                          <template slot-scope="scope">
                        <el-upload
                            action=""
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="" v-model="data[scope.$index].imgUrl">
                        </el-dialog>
                         </template>
                    </el-table-column>
                    
                    <el-table-column min-width="33%">
                        <template slot-scope="scope">
                            <el-button type="text" :disabled="scope.$index===0" @click="upRemove(scope.$index,scope.row)">上移</el-button>
                            <el-button type="text" :disabled="scope.$index===(data.length-1)" @click="downRemove(scope.$index)">下移</el-button>
                            <el-button type="text" @click="delet(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                 </el-table>
                <el-row>
                    <el-form-item>
                        <el-button type="button" @click="add" icon="el-icon-plus" style="width:200px;margin-left:350px;">添加选项</el-button>
                    </el-form-item>
                </el-row>
            </el-row>
            <el-row id="answerId">
                <el-form-item label="" prop="outlineName" class="form-class">
                    <el-button style="background-color:#4aafa7;color:white;height:35px;" type="primary">解析</el-button>
                    <span>下方填写该问题的答案解释</span>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item>
                    <el-input type="textarea" :rows="4" cols="100%" placeholder="请输入内容" v-model="addMaintainQuestionForm.questionName"></el-input>
                </el-form-item>
            </el-row>
            <div class="item" style="text-align:right">
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submit('addMaintainQuestionForm')">保 存</el-button>
                    <el-button  @click="visible = false">离 开</el-button>
                </span>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    data(){
        return{
             data: [],
            checked:true,
            relyonTable:[],
            isDisabled:true,
            visible: false,
            addMaintainQuestionForm: {
                parentId: "",
                parentName: "",
                outlineId:"",
                outlineName: "",
                questionName:"",
                
            },
            rules: {
                //outlineName: [{ required: true, message: "大纲名称不能为空", trigger: "blur" }],
            },
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2  查看3
            questionTypeName:"",//题型名称
            questionTypeList:[{id:"0",name:"单选题"},{id:"1",name:"多选题"},{id:"2",name:"判断题"}],//问题类型列表
            levelList:[{id:"0",name:"简单"},{id:"1",name:"中等"},{id:"2",name:"困难"}],//题目难度列表
           // checked:false,//选择正确答案,
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        getDictInfo(row,type){

        },
        moveUpRelyon(index,row){//上移
            let _this = this 
            if(index>0){
                let rowDate=_this.relyonTable[index-1];
                _this.relyonTable.splice(index-1,1);
                _this.relyonTable.splice(index,0,rowDate);
            }else{
                _this.$message({
                    type:"warning",
                    message:"已经是第一条了，不可以上移",
                });
            }
        },
        moveDownRelyon(index,row){//下移
            let _this = this 
            if((index+1)===_this.relyonTable.length){
                _this.$message({
                    type:"warning",
                    message:"已经是最后一条了，不可以下移",
                })
            }else{
                let rowDate=_this.relyonTable[index-1];
                _this.relyonTable.splice(index+1,1);
                _this.relyonTable.splice(index,0,rowDate);
            }
        },
        handleDeleteRelyon(index,row){//删除
            this.relyonTable.splice(index,1);
        },
        addRowRelyon(){//添加一行
            let rowDate=this.$refs.relyonTable.firstChild;
            debugger;
            console.info("rowDate============="+rowDate);
        },
        //新增
        add(){
            if(this.data.length >7){
                 this.$message({
                    type:"warning",
                    message:"您不能添加更多的选项！",
                })
            }else{
                 let name = this.getChecked(this.data.length);
                 this.data.push({"checked":name});
            }
           
            // this.number = this.number+1;
        },
        //获取选项
        getChecked(val){
            if(val == 0){
                return "A";
            }else if(val == 1){
                return "B";
            }else if(val == 2){
                return "C";
            }else if(val == 3){
                return "D";
            }else if(val == 4){
                return "E";
            }else if(val == 5){
                return "F";
            }else if(val == 6){
                return "G";
            }else if(val == 7){
                return "H";
            }
        },
        //删除
        delet(index){
            this.data.splice(index, 1);
            this.updatChecked();
            
        },
        //修改选项
        updatChecked(){
            for(let i = 0;i<this.data.length;i++){
                this.data[i].checked = this.getChecked(i);
            }
        },
        //上移
        upRemove(index,row){
             let _this = this 
            if(index>0){
                let rowDate=_this.data[index-1];
                _this.data.splice(index-1,1);
                _this.data.splice(index,0,rowDate);
            }else{
                _this.$message({
                    type:"warning",
                    message:"已经是第一条了，不可以上移",
                });
            }
             this.updatChecked();
        },
        clickitem(){
            this.checked == true ? this.checked = false : this.checked = true;
            alert(this.checked)
           // e === this.checked?this.checked=false : this.checked = true;
        },
        //下移
        downRemove(index,row){
            let _this = this 
            if((index+1)===_this.data.length){
                _this.$message({
                    type:"warning",
                    message:"已经是最后一条了，不可以下移",
                })
            }else{
                let rowDate=_this.data[index+1];
                _this.data.splice(index+1,1);
                _this.data.splice(index,0,rowDate);
            }
                this.updatChecked();
        },
        selectRowRelyon(val){//选择当前行
            this.selectRowRelyon=val;
        },
        //提交
        submit() {
            let _this = this
            if(_this.addMaintainQuestionForm.outlineName===""){
                _this.$message({
                    type:'warning',
                    message:'大纲名称不能为空',
                });
                return;
            }
            if(_this.handelType==1){
                _this.$store.dispatch("addExamOutlineInfo", _this.addMaintainQuestionForm).then(res => {
                    _this.$emit("getAllOutline");
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
                _this.$store.dispatch("updateExamOutlineInfo", _this.addMaintainQuestionForm).then(res => {
                    _this.$emit("getAllOutline");
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
            if(type==1){//新增
                _this.dialogTitle = "新增大纲";
                _this.isDisabled=false;
            }else if(type==2){//修改,查看
                if(type==2){
                    _this.dialogTitle = "修改";
                    _this.isDisabled=false;
                }else if(type==3){
                    _this.dialogTitle = "详情";
                    _this.isDisabled=true;
                }
				_this.addMaintainQuestionForm.outlineId=row.outlineId;
                _this.addMaintainQuestionForm.outlineName=row.outlineName;
                _this.addMaintainQuestionForm.parentId=row.parentId;
                _this.addMaintainQuestionForm.parentName=row.parentName;
            }
        },
         //聚焦清除错误信息
        focusName() {
            this.errorName = false;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
            this.$refs["addMaintainQuestionFormRef"].resetFields();
            this.errorName = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 500px;
    font-size: inherit;
    color: #606266;
    background-color: #FFF;
    background-image: none;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
</style>
<style>
.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200px;
    height: 90px;
    line-height: 90px;
    vertical-align: top;
}
</style>
