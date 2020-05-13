<template>
     <div class="msgStyle">
         <div class="text1">交通运输工程监理工程师职业资格考试</div>
       <div class="text2">
        <span>{{d}}</span>天
        <span>{{h}}</span>小时
        <span>{{m}}</span>分
        <span>{{s}}</span>秒后可进入考试
      </div>
    </div>
</template>
<script>
export default {
    name:'pageApplay',
    data(){
        return{
            d: '',
            h: '',
            m: '',
            s: '',
        }
    },
created() {
    this.countTime()
  },
  methods: {
    countTime: function() {
      //获取当前时间
      var date = new Date()
      var now = date.getTime()
      //设置截止时间
      var endDate = new Date('2021-04-24 23:23:23')
      var end = endDate.getTime()
      //时间差
      var leftTime = end - now
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24)//天数我没用到，暂且写上
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
        this.m = Math.floor((leftTime / 1000 / 60) % 60)
        this.s = Math.floor((leftTime / 1000) % 60)
      }
      console.log(this.s)
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000)
    },
  },
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
 .text1{
    margin: 150px 60px 60px 60px;
    text-align: center;
    font-size: 35px;
    font-weight: 700;
 }
 .text2{
    margin: 10px 40% 500px 40%;
    text-align: center;
    font-size: 22px;
    color: rgba(13, 15, 153, 0.185);
     background: rgba(218, 213, 213, 0.322);
 }  
</style>