<template>
  <div class="msgStyle">
    <div class="first">
        <div >
            欢迎进入考试系统
        </div>
         <div class="text">
        <span>{{year}}</span>年
        <span>{{month}}</span>月
        <span>{{day}}</span>日
        <span>{{hours}}</span>:
        <span>{{minutes}}</span>:
        <span>{{seconds}}</span>
        <p class="text1">*考生可提前30分钟进入相应考试，等待考试开启</p>
    </div>
    </div>
   
     <div class="first">
     <div>请输入监考信息</div>
        <el-form :inline="true" ref="userForm" label-width="95px">
          <el-row>
            <el-form-item label="单位:" prop="personName"  >
              <input class="input" placeholder="请输入单位">
            </el-form-item><br>
            <el-form-item label="姓名:" prop="personName" >
              <input class="input" placeholder="请输入姓名">
            </el-form-item><br>
            <el-form-item label="身份证号:" prop="personName" >
              <input  class="input" placeholder="请输入身份证号">
            </el-form-item><br>
            <el-form-item label="联系方式:" prop="personName" >
              <input class="input" placeholder="请输入联系方式">  
            </el-form-item><br>
            <el-form-item label=" " label-width="13px" style="">
                <el-button type="primary" icon="el-icon-time" size="medium">提交</el-button>
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
        //date:new Date(),
            year:'',
            month:'',
            day:'',
            hours: '',
            minutes: '',
            seconds: '',
            tableDate:[{name:"交通运输职业资格考试1",startTime:"2020.3.4",endTime:"2020.3.4",status:"0"},{name:"交通运输职业资格考试2",startTime:"2020.3.4",endTime:"2020.3.4",status:"1"},{name:"交通运输职业资格考试3",startTime:"2020.3.4",endTime:"2020.3.4",status:"2"}],
    };
  },
  created() {
            let target = new Date("2019-6-6").getTime(); //获取目标时间戳
            setInterval(() => {
                let date = new Date();
                let year = date.getFullYear();
                let month = (date.getMonth()+1);
                let day = date.getDate();
                 let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                this.year = year;
                this.month = month;
                this.day = day;
                this.hours = hours;
                this.minutes = minutes;
                this.seconds = seconds;
            }, 1000)
        }
};
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