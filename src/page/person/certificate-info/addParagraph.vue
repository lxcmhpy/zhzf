<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="35%">
        <el-form :model="addPersonForm" label-position="right"  label-width="100px"  ref="addPersonForm">
            <div v-if="change">是否确认到期换证？</div>
            <el-row style="height:80px;" v-if="exist">
                <el-form-item label="变化原因" prop="reason">
                    <el-input v-model="addPersonForm.reason"  type="textarea" rows=""></el-input>
                </el-form-item>
            </el-row>
            <el-row style="height:36px;" v-if="false">
                <el-form-item label="实卡归属" prop="attribution">
                     <el-select v-model="addPersonForm.attribution" placeholder="实卡归属" remote  @focus="getDepatements('证件信息-实卡归属','attributionList')">
                        <el-option
                            v-for="value in attributionList" :key="value.id" :label="value.name" :value="value.id">
                      </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row style="height:90px;" v-if="false">
                <el-form-item label="备注:" prop="remark">
                    <el-input v-model="addPersonForm.remark"  type="textarea" rows=""></el-input>
                </el-form-item>
            </el-row>
           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submitPerson()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>

export default {
    data(){
        return{
             searchType:[{value:0,label:'本机构'},{value:1,label:'本机构及子机构'}],
            imageUrl: '', 
            visible: false,
            attributionList:[],//实卡归属列表
            addPersonForm: {
                remark:"",//备注
                attribution:"", //实卡归属
                certId:"", 
                reason:"", // 变化原因
                type:"",//操作类型
            },
            exist:true,
            change:false,
            show:"",
            dialogTitle: "", //弹出框title
            errorName: false, //添加name时的验证
            handelType: 0, //添加 0  修改2
        }
    },
    methods:{
       
         //点击下拉框的时候后头获取下拉框数据
        getDepatements(name,codeName){
                this.$store.dispatch("findAllDrawerByName",name).then(    //查询执法领域
                    res=>{
                        if(res.code===200){
                            if(codeName==='branchIdsInfo'){
                                this.branchIdsInfo=res.data;
                            }
                            if(codeName==='attributionList'){
                                console.log("数据字典"+JSON.stringify(res.data))
                                this.attributionList=res.data;
                            }
                            if(codeName==='oidsInfo'){
                                this.oidsInfo=res.data;
                            }
                            if(codeName==='stationStatusInfo'){
                                this.stationStatusInfo=res.data;
                            }
                        }else{
                            console.info("没有查询到数据");
                        }
                    }
                );
        },
        //提交
        submitPerson() {
            let data = {
                remark:this.addPersonForm.remark,
                attribution: this.addPersonForm.attribution,
                certId: this.addPersonForm.certId,
                reason: this.addPersonForm.reason,
            };
            let type = this.addPersonForm.type;
            if(type == 1){ //挂失
                this.$store.dispatch("lossDocMoudle", data).then(res => {
                    console.log("返回参数"+JSON.stringify(res));console.log("返回参数"+JSON.stringify(res));
                    this.visible = false;
                    if(res.code == '200'){
                        this.$emit("getAllPersons");
                        this.$message({
                            type: "success",
                            message:  "挂失成功!",
                        });
                    }else{
                         this.$message({
                            type: "error",
                            message:  "挂失失败!",
                        });
                    }
                    }, err => {
                        this.visible = false;
                        this.$message({ type: 'warning', message: err.msg || '' });
                    });
            }else if(type == 2){ //暂扣
                 this.$store.dispatch("withholdMoudle", data).then(res => {
                     console.log("返回参数"+JSON.stringify(res));
                    this.visible = false;
                    if(res.code == '200'){
                        this.$emit("getAllPersons");
                        this.$message({
                            type: "success",
                            message:  "暂扣成功!",
                        });
                    }else{
                         this.$message({
                            type: "error",
                            message:  "暂扣失败!",
                        });
                    }   
                 }, err => {
                    this.visible = false;
                    this.$message({ type: 'warning', message: err.msg || '' });
                 });
            }else if(type == 3){ //解除暂扣
                this.$store.dispatch("unWithholdMoudle", data).then(res => {
                    console.log("返回参数"+JSON.stringify(res));
                    this.visible = false;
                    if(res.code == '200'){
                        this.$emit("getAllPersons");
                        this.$message({
                            type: "success",
                            message:  "解除暂扣成功!",
                        });
                    }else{
                         this.$message({
                            type: "error",
                            message:  "解除暂扣失败!",
                        });
                    }
                }, err => {
                    this.visible = false;
                    this.$message({ type: 'warning', message: err.msg || '' });
                });
            }else if(type == 4){ //注销
                this.$store.dispatch("logoffMoudle", data).then(res => {
                    if(res.code == '200'){
                        this.$emit("getAllPersons");
                        this.$message({
                            type: "success",
                            message:  "注销成功!",
                        });
                    }else{
                         this.$message({
                            type: "error",
                            message:  "注销失败!",
                        });
                    }
                }, err => {
                    this.visible = false;
                    this.$message({ type: 'warning', message: err.msg || '' });
                });
            }else if(type == 5){ //吊销
                this.$store.dispatch("revokeMoudle", data).then(res => {
                    this.visible = false;
                    if(res.code == '200'){
                        this.$emit("getAllPersons");
                        this.$message({
                            type: "success",
                            message:  "吊销成功!",
                        });
                    }else{
                         this.$message({
                            type: "error",
                            message:  "吊销失败!",
                        });
                    }
                }, err => {
                    this.visible = false;
                    this.$message({ type: 'warning', message: err.msg || '' });
                });
            }else if(type == 6){
                 this.$store.dispatch("unLossDocMoudle", data).then(res => {
                    this.visible = false;
                    if(res.code == '200'){
                        this.$emit("getAllPersons");
                        this.$message({
                            type: "success",
                            message:  "解除挂失成功!",
                        });
                    }else{
                         this.$message({
                            type: "error",
                            message:  "解除挂失失败!",
                        });
                    }
                 }, err => {
                    this.visible = false;
                    this.$message({ type: 'warning', message: err.msg || '' });
                 });
            }else if(type == 7){
                let data1 = {
                certId: this.addPersonForm.certId,
              };
              console.info(JSON.stringify(data1))
                 this.$store.dispatch("changeCertByEndDateMoudle", data1).then(res => {
                    this.visible = false;
                    if(res.code == '200'){
                        this.$emit("getAllPersons");
                        this.$message({
                            type: "success",
                            message:  "到期换证成功",
                        });
                    }else{
                         this.$message({
                            type: "error",
                            message:  "到期换证失败!",
                        });
                    }
                 }, err => {
                    this.visible = false;
                    this.$message({ type: 'warning', message: err.msg || '' });
                 });
            }
                
            },
        showModal(type,data) {
            this.visible = true;
            this.change = false;
            this.handelType = type;
            this.addPersonForm.certId = data.certId;
            this.addPersonForm.type = type;
            if(type==1){
                this.dialogTitle = "证件管理-挂失";
            }else if(type==2){
                this.dialogTitle = "证件管理-暂扣";
            }else if(type==3){
                this.dialogTitle = "证件管理-解除暂扣";
            }else if(type==4){
                this.show=false;
                this.dialogTitle = "证件管理-注销";
            }else if(type==5){
                this.show=false;
                this.dialogTitle = "证件管理-吊销";
            }else if(type == 6){
                this.dialogTitle = "证件管理—解除挂失";
            }else if(type == 7){
                 this.dialogTitle = "证件管理—到期换证";
                 this.exist = false;
                 this.change = true
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
         },
    }
</script>
<style lang="scss">
@import "@/assets/css/personManage.scss";
</style>
<style lang="scss" scoped>
>>>.el-date-editor.el-input, >>>.el-select{
  width: 100%;
}
>>>.el-select{
  display: block;
}
</style>
