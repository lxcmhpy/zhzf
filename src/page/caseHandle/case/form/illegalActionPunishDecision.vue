<template>
  <el-dialog
    title="处罚类型"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="550px"
  >
    <div id="illegalActionPunishDecisionBox">
      <el-checkbox-group v-model="checkDec">
        <p><el-checkbox label="罚款" value="0" @change="changeCheckDec">罚款</el-checkbox><el-input placeholder="请输入罚款金额" v-model="cont1" :disabled="checkDec[0]=='罚款'?false:true"></el-input></p>
        <p><el-checkbox label="责令整改" value="1" @change="changeCheckDec2">责令整改</el-checkbox><el-input placeholder="请输入责令整改要求" v-model="cont2" :disabled="checkDec[0]=='责令整改'||checkDec[1]=='责令整改'?false:true"></el-input></p>
        <p><el-checkbox label="警告" value="2" @change="changeCheckDec3">警告</el-checkbox><el-input placeholder="请输入警告内容" v-model="cont3" :disabled="checkDec[0]=='警告'||checkDec[1]=='警告'||checkDec[2]=='警告'?false:true"></el-input></p>
        <p><el-checkbox label="没收违法所得" value="3" @change="changeCheckDec4">没收违法所得</el-checkbox><el-input placeholder="请输入罚款金额" v-model="cont4" :disabled="checkDec[0]=='没收违法所得'||checkDec[1]=='没收违法所得'||checkDec[2]=='没收违法所得'||checkDec[3]=='没收违法所得'?false:true"></el-input></p>
        <p><el-checkbox label="没收非法财产" value="4" @change="changeCheckDec5">没收非法财产</el-checkbox><el-input placeholder="请输入非法财产内容" v-model="cont5" :disabled="checkDec[0]=='没收非法财产'||checkDec[1]=='没收非法财产'||checkDec[2]=='没收非法财产'||checkDec[3]=='没收非法财产'||checkDec[4]=='没收非法财产'?false:true"></el-input></p>
        <p><el-checkbox label="责令停产停业、暂扣或吊销许可整合执照" value="5" @change="changeCheckDec6">责令停产停业、暂扣或吊销许可整合执照</el-checkbox><el-input placeholder="非必填" v-model="cont6" :disabled="checkDec[0]=='责令停产停业、暂扣或吊销许可整合执照'||checkDec[1]=='责令停产停业、暂扣或吊销许可整合执照'||checkDec[2]=='责令停产停业、暂扣或吊销许可整合执照'||checkDec[3]=='责令停产停业、暂扣或吊销许可整合执照'||checkDec[4]=='责令停产停业、暂扣或吊销许可整合执照'||checkDec[5]=='责令停产停业、暂扣或吊销许可整合执照'?false:true"></el-input></p>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="markPunishDecision">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            visible: false,
            checkDec:[],
            cont1:"",
            cont2:"",
            cont3:"",
            cont4:"",
            cont5:"",
            cont6:"",
            fullDecision:"",

        }
    },
    methods:{
        showModal() {
            this.visible = true;
        },
        //关闭弹窗的时候清除数据
        closeDialog() {
            this.visible = false;
        },
        changeCheckDec(val){
            console.log("check",val);
            this.cont1 = '';
        },
        changeCheckDec2(val){
            console.log("check",val);
            this.cont2 = '';
        },
        changeCheckDec3(val){
            console.log("check",val);
            this.cont3 = '';
        },
        changeCheckDec4(val){
            console.log("check",val);
            this.cont4 = '';
        },
        changeCheckDec5(val){
            console.log("check",val);
            this.cont5 = '';
        },
        changeCheckDec6(val){
            console.log("check",val);
            this.cont6 = '';
        },
        markPunishDecision(){
            console.log("111",this.checkDec)
        //    if(this.checkDec[0] == '罚款'){
        //        this.fullDecision = this.checkDec[0] + this.cont1
        //    }else if(this.checkDec[0] == '责令整改'){
        //        this.fullDecision = this.checkDec[0] + this.cont2
        //    }else if(this.checkDec[0] == '警告'){
        //        this.fullDecision = this.checkDec[0] + this.cont3
        //    }else if(this.checkDec[0] == '没收违法所得'){
        //        this.fullDecision = this.checkDec[0] + this.cont4
        //    }else if(this.checkDec[0] == '没收非法财产'){
        //        this.fullDecision = this.checkDec[0] + this.cont5
        //    }else if(this.checkDec[0] == '责令停产停业、暂扣或吊销许可整合执照'){
        //        this.fullDecision = this.checkDec[0] + this.cont6
        //    }
            this.fullDecision = '';
           for(let i = 0; i < this.checkDec.length; i++){
               if(this.checkDec[i] == '罚款'){
                    this.fullDecision += this.checkDec[i] + this.cont1
                }else if(this.checkDec[i] == '责令整改'){
                    this.fullDecision += "," + this.checkDec[i] + this.cont2
                }else if(this.checkDec[i] == '警告'){
                    this.fullDecision += "," + this.checkDec[i] + this.cont3
                }else if(this.checkDec[i] == '没收违法所得'){
                    this.fullDecision += "," + this.checkDec[i] + this.cont4
                }else if(this.checkDec[i] == '没收非法财产'){
                    this.fullDecision += "," + this.checkDec[i] + this.cont5
                }else if(this.checkDec[i] == '责令停产停业、暂扣或吊销许可整合执照'){
                    this.fullDecision += "," + this.checkDec[i] + this.cont6
                }
           }
           console.log("222",this.fullDecision);
        //    去掉首位逗号
           this.fullDecision=this.fullDecision;
           if (this.fullDecision.substr(0,1)==',') 
           this.fullDecision=this.fullDecision.substr(1);

           let punishDecisionData = {
               checkDec:this.checkDec[0],
               amount:this.checkDec[0] == '罚款' ? this.cont1 : '',
               fullDecision:this.fullDecision,
           }
            // this.visible = false;
            this.$emit('sendPunishDecis',punishDecisionData);
            this.visible = false;

        },

    }
}
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/caseDocModle.scss";
</style>
