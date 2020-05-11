<template>
  <div class="msgStyle">
    <div class="first">
        <div class="container">
            <img  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=845265002,1740826154&fm=26&gp=0.jpg" width="300" height="400" >
        </div>
        <div>
            <p>张三</p>
            <p>北京市交通运输管理局</p>
        </div>
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
     <div class="first">
            <div>
                <el-table :data="tableDate" resizable stripe style="width:98%">
                    <el-table-column prop="name" label="" align="center">
                         <template slot-scope="scope">
                             <P>{{scope.row.name}}</P>
                             <P>考试时间：{{scope.row.startTime}} 至 {{scope.row.endTime}}</P> 
                        </template>
                    </el-table-column>
                     <el-table-column prop="status" label="" align="center">
                         <template slot-scope="scope">
                         <el-button type="primary" @click="submit" v-if="scope.row.status == '0' ? true:false">进入</el-button>
                         <el-button type="success" plain @click="submit" v-if="scope.row.status == '1' ? true:false">已交卷</el-button>
                         <el-button type="info" round @click="submit" v-if="scope.row.status == '2' ? true:false">未开始</el-button>
                         </template>
                      </el-table-column>
                </el-table>
            </div>
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
  font-size: 20px;
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
</style>