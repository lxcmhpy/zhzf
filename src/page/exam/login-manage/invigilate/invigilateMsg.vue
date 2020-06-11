<template>
  <div class="msgStyle">
    <div class="first">
        <div >
            欢迎进入考试系统
        </div>
        <div class="text">
        <span>1</span>年
        <span>1</span>月
        <span>2</span>日
        <span>3</span>:
        <span>4</span>:
        <span>5</span>
        <p class="text1">*考生可提前30分钟进入相应考试，等待考试开启</p>
    </div>
    </div>
  
    <div class="first">
    <div>请输入监考信息</div>
        <el-form :inline="true" ref="userForm" label-width="95px" rules="userFormRef">
          <el-row>
            <el-form-item label="单位:" prop="company"  >
              <input class="input" v-model="userForm.company" placeholder="请输入单位">
            </el-form-item><br>
            <el-form-item label="姓名:" prop="userName" >
              <input class="input" v-model="userForm.userName" placeholder="请输入姓名">
            </el-form-item><br>
            <el-form-item label="身份证号:" prop="idCode" >
              <input  class="input" v-model="userForm.idCode" placeholder="请输入身份证号">
            </el-form-item><br>
            <el-form-item label="联系方式:" prop="telephone" >
              <input class="input" v-model="userForm.telephone" placeholder="请输入联系方式">  
            </el-form-item><br>
            <el-form-item label=" " label-width="13px" style="">
                <el-button type="primary" icon="el-icon-time" size="medium" @click="submitInvigilatorInfo">提交</el-button>
              </el-form-item>
          </el-row>
        </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "pageApplay",
  data() {
    return {
        userForm:{
          company:"",
          userName:"",
          idCode:"",
          telephone:"",
        }
    }
  },
  methods:{
    //提交监考老师信息 
    submitInvigilatorInfo(){
      this.$store.dispatch("getAddInvigilator",this.userForm).then(
        res=>{
          if(res.code===200){
            //跳转到监考老师详情页面

          }else{
            console.info("监考老师详情添加失败");
          }
        });
    },
    //加载考试信息
    getExamInfoByInvigilator(){
      let data={
        //loginName、password的值从登录页面传回来
        loginName:'',
        password:'',
      }
      this.$store.dispatch("getExamInfoByInvigilatorInfo",data).then(
        res=>{
          if(res.code===200){
            

          }else{
            console.info("该考试信息以及考场信息查询失败");
          }
        });
    }
  },
  created() {
    //登录成功后跳转到该页面，同时加载该监考老师考场以及考试信息
    this.getExamInfoByInvigilator();
  }
}
</script>
<style  lang="scss" scoped>
.msgStyle {
  margin: 4% auto auto auto;
  width: 80%;
  height: 80%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
  overflow-y: scroll;
}
.first {
  width: 50%;
  float: left;
  height: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
}
 .second {
  margin: 600px 600px 600px 600px;
  width: 50%;
  float: right;
  height: 100px;
  
}
.container{
     margin: 100px auto 60px 200px;
    width:300px; 
    height:400px;
     background:#ccc;
      text-align:center;
      }
 .text{
    margin: 60px 60px 60px 60px;
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    color: sandybrown;
 }
 .text1{
      margin: 10px auto auto auto;
    text-align: center;
    font-size: 10px;
    color: red;
 } 
 .input{
   outline: none;
   width: 250px;
   height: 40px;
   color: blue;
  // padding: 20px;
  // font-size: 20px;
   text-decoration:underline;
 } 
 .input::-webkit ::-webkit-input-placeholder{
   color: dimgray;
   border-bottom: 1px solid #78ff22;
   font-size: 30px;
   line-height: 30px;
 }   
</style>