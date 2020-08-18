<template>
  <!-- <el-dialog
    v-dialogDrag
    title="督办意见"
    :visible.sync="visible"
    @close="closeDialog"
    :modal="false"
    width="570px"
    custom-class="addSupervisionOpinoin"
    :append-to-body="true"
  > -->
  <div class="addSupervisionOpinoin" v-drag v-show="showAddSupervisionOpinoin">
    <div class="el-dialog__header">
        <span class="el-dialog__title">督办意见</span>
        <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeDialog"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    </div>
    <div class="el-dialog__body">
    <el-form
      :model="addSupervisionOpinoinForm"
      ref="addSupervisionOpinoinForm"
      class="checkSearchForm"
      label-width="80px"
       :rules="rules"
    >
      <div>
        <div class="item">
          <el-form-item label="督办人" prop="userName">
            <el-input v-model="addSupervisionOpinoinForm.userName" disabled></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="督办时间" prop="supTime">
             <el-date-picker v-model="addSupervisionOpinoinForm.supTime" type="datetime" format="yyyy-MM-dd HH:mm"
                              value-format="yyyy-MM-dd HH:mm" disabled></el-date-picker>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="item">
          <el-form-item label="所在机构" prop="organ">
            <el-input v-model="addSupervisionOpinoinForm.organ" disabled></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="联系电话" prop="telPhone">
            <el-input v-model="addSupervisionOpinoinForm.telPhone"></el-input>
          </el-form-item>
        </div>
      </div>
      <div>
        <!-- <div class="item"> -->
        <el-form-item label="督办意见" prop="supOpinion">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="addSupervisionOpinoinForm.supOpinion"
          ></el-input>
        </el-form-item>
        <!-- </div> -->
      </div>
    </el-form>
    </div>
    <div class="el-dialog__footer">
        <span slot="footer" class="dialog-footer">
        <el-button @click="showAddSupervisionOpinoin = false">取 消</el-button>
        <el-button type="primary" @click="addData()">提交</el-button>
        </span>
    </div>
    
  <!-- </el-dialog> -->
  </div>
</template>
<script>
import { queryLawCateByOrganIdApi } from "@/api/caseDeploy";
import iLocalStroage from "@/common/js/localStroage";
import {caseSuperviseSaveOrUpdateApi} from '@/api/lawEnforcementSupervision'
import {validatePhone} from "@/common/js/validator";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showAddSupervisionOpinoin: false,
      addSupervisionOpinoinForm: {
        caseBasicinfoId:'',
        userName: '',
        supTime: "",
        organ: "",
        telPhone:"",
        supOpinion: "",
      },
      lawCateList: [],
      allCaseStatus: [
        { value: "全部" },
        { value: "已结案" },
        { value: "未结案" },
      ],
      allCheckNumber: [{ value: "10条" }, { value: "20条" }, { value: "50条" }],
      allPartyType: [{ value: "个人" }, { value: "法人" }],
      rules:{
        userName:[
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        supTime:[
          { required: true, message: '请填写', trigger: "blur" }
        ],
        organ:[
          { required: true, message: '请填写', trigger: "blur" }
        ],
        telPhone:[
          { validator: validatePhone, trigger: "blur" }
        ],
        supOpinion:[
          { required: true, message: '请填写督办意见', trigger: "blur" }
        ],
        
      },
    };
  },
  computed:{ ...mapGetters(['caseId'])},
  methods: {
    showModel() {
       this.showAddSupervisionOpinoin = true;
       this.$nextTick(function(){
           let class1 = document.getElementsByClassName("addSupervisionOpinoin");
            let class2 = class1[0].parentNode;
            console.log('class2',class2)
            // class2.style.position = "absolute";
            // class2.style.top = "auto";
            let  modelZIndex= class2.getAttribute('style');
            console.log('modelZIndex',modelZIndex)
            this.$emit('sendZIndex',modelZIndex)
       })
       let userData = iLocalStroage.gets('userInfo');
       this.addSupervisionOpinoinForm.userName = userData.nickName;
       this.addSupervisionOpinoinForm.organ = userData.organName;
       this.addSupervisionOpinoinForm.telPhone = userData.mobile;
       this.addSupervisionOpinoinForm.supTime = new Date().format('yyyy-MM-dd HH:mm');
       this.addSupervisionOpinoinForm.caseBasicinfoId = this.caseId;
       
      //   this.getEnforceLawType();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.showAddSupervisionOpinoin = false;
    },
    //获取执法领域
    // getEnforceLawType(){
    //     queryLawCateByOrganIdApi({organId:iLocalStroage.gets("userInfo").organId}).then(res=>{
    //        console.log('res',res)
    //        this.lawCateList = res.data;
    //     }).catch(err=>{throw new Error(err)})
    // },
    
    addData() {
      this.$refs['addSupervisionOpinoinForm'].validate((valid, noPass) => {
          if (valid) {
            caseSuperviseSaveOrUpdateApi(this.addSupervisionOpinoinForm).then(res=>{
              console.log(res);
              this.$message({
                  type: "success",
                  message: "添加成功"
              });
              this.showAddSupervisionOpinoin = false;
            }).catch(err=>{throw new Error(err)})
          }
      })
      
    },
  },
 
directives: {
        drag: {
            // 指令的定义
            bind: function (el) {
                let odiv = el;   //获取当前元素
                el.onmousedown = (e) => {
                    //算出鼠标相对元素的位置
                    let disX = e.clientX - odiv.offsetLeft;
                    let disY = e.clientY - odiv.offsetTop;
                    let left = '';
                    let top = '';
                    document.onmousemove = (e)=>{
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        left = e.clientX - disX;
                        top = e.clientY - disY;
                        //绑定元素位置到positionX和positionY上面
                        //移动当前元素
                        odiv.style.left = left + 'px';
                        odiv.style.top = top + 'px';
                    };
                    document.onmouseup = (e) => {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        }
    },
  mounted() {
    
  }
};
</script>
<style lang="scss" >
.addSupervisionOpinoin{
    position: absolute;
    width: 570px;
    display: inline-block;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    // display: none;
    .el-dialog__header {
        padding: 20px 20px 10px;
    }
    .el-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
    }
    .el-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
    }
    .el-dialog__body {
        padding: 30px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
    }
    .el-dialog__footer {
        padding: 10px 20px 20px;
        text-align: right;
        box-sizing: border-box;
    }
}
.checkSearchForm {
  padding-right: 25px;
  & > div {
    display: flex;
    justify-content: space-between;
  }
  & > div:nth-child(3) {
    flex: 1;
    .el-form-item {
      width: 100%;
      // .el-date-editor{
      //     width:100%
      // }
    }
  }
}
</style>