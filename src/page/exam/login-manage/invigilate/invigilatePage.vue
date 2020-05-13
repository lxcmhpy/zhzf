<template>
  <div class="com_searchAndpageBoxPadding">
    <!-- <div class="searchPage toggleBox"> -->
    <div class="leftPart">
      <div class="text">
        <p>距离考试开始</p>
        <p class="text1">
          <span>{{d}}</span>天
          <span>{{h}}</span>小时
          <span>{{m}}</span>分
          <span>{{s}}</span>秒
        </p>
        <p class="line">——————————————————————————————</p>
        <p>考试名称</p>
        <p class="text1">{{examMsg.examName}}</p>
        <p class="line">——————————————————————————————</p>
        <p>考场</p>
        <p class="text1">{{examMsg.examRoom}}</p>
        <p class="line">——————————————————————————————</p>
        <p>考试时间</p>
        <p class="text1">{{examMsg.examTime}}</p>
        <p class="line">——————————————————————————————</p>
        <p>备注：</p>
        <p>1、考生自觉</p>
        <p>2、考生凭借</p>
        <p>3、严禁携带</p>
      </div>
    </div>
    <div class="rightPart">
      <div class="handlePart">
        <el-form :inline="true" ref="userForm" label-width="95px">
          <el-row>
            <el-form-item label="姓名" prop="personName">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="身份证号  " prop="personName">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label=" " label-width="13px">
              <el-button
                title="搜索"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-sousuo"
              ></el-button>
              <el-button
                title="重置"
                class="commonBtn searchBtn"
                size="medium"
                icon="iconfont law-zhongzhi"
              ></el-button>
            </el-form-item>
            <P>
              <el-form-item label=" " label-width="13px" style="float:left">
                <el-button type="primary" icon="el-icon-time" size="medium">批量延迟</el-button>
              </el-form-item>
              <el-form-item label=" " label-width="13px" style="float:left">
                <el-button type="success" icon="el-icon-edit" size="medium">修改信息</el-button>
              </el-form-item>
            </P>
            <P>
              <el-form-item label=" " label-width="13px" style="float:right">
              
                <label v-for="(item, index) in radioData" :key="index">
                  <input type="radio" v-model="radioVal" :value="item.value" @change="getRadioVal" />
                  {{ item.value }}
                </label>
              </el-form-item>
            </P>
          </el-row>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;height:100%"
         
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="peprsonId" label="peprsonId" v-if="false"></el-table-column>
          <el-table-column prop="personName" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="idNo" label="身份证号"></el-table-column>
          <el-table-column prop="personStatus" label="考生状态"></el-table-column>
          <el-table-column prop="examTime" label="答题时间"></el-table-column>
          <el-table-column label="操作项" width="330">
            <template slot-scope="scope">
              <div style="width:330px">
                <el-button type="text" @click="exanRecord('1')">考场记录</el-button>
                <el-button type="text" @click="exanRecord('2')">强制收卷</el-button>
                <el-button type="text" @click="exanRecord('3')">延迟收卷</el-button>
                <el-button type="text" @click="exanRecord('4')">登录重置</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <examRecord ref="examRecordRefs" @getPageComp="getPageInfoList"></examRecord>
      <windowsPage ref="windowsPageRefs" @getPageComp="getPageInfoList"></windowsPage>
    </div>
  </div>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
import examRecord from "./examRecord";
import windowsPage from "./windowsPage";
export default {
  name: "pageApplay",
  data() {
    return {
      examMsg: {
        //考试信息
        startTime: "2020.3.4",
        examName: "公路交通运输技能考试",
        examRoom: "考场教室1",
        examTime: "2020-4-24 15:00 至 2020-4-24 17:00"
      },
      persionMsg: {
        certId: "", //peprsonId
        personName: "", //
        sex: "",
        idNo: "",
        personStatus: "",
        examTime: ""
      }, //考生信息
      tableData: [],
      d: "",
      h: "",
      m: "",
      s: "",
       radioData: [
        { value: '全部' },
        { value: '未答题' },
        { value: '答题中' },
        { value: '已交卷' }
      ],
      radioVal: '全部' 
    };
  },
   components:{
        examRecord,windowsPage
    },
  methods: {
    getPageInfoList(type){
      if(type=='add'){
         this.$refs.windowsPageRefs.showModal(2,'5');
      }
    },
    //考场记录
    exanRecord(type){
      if(type == 1){
         this.$refs.examRecordRefs.showModal(1,'1');
      }else if(type == 2){
         this.$refs.windowsPageRefs.showModal(2,'2');
      }else if(type == 3){
        this.$refs.windowsPageRefs.showModal(2,'3');
      }else if(type == 4){
        this.$refs.windowsPageRefs.showModal(2,'4');
      }
         
    },
    //获取考生信息
    getPersonMsg() {
      let data = [
        {
          certId: "1234", //peprsonId
          personName: "张三", //
          sex: "男",
          idNo: "127837488596867483",
          personStatus: "未答题",
          examTime: "34:24"
        }
      ];
      this.tableData = data;
    },
    //单选框选中
     getRadioVal() {
      console.log(this.radioVal);
    },
    countTime: function() {
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var endDate = new Date("2021-04-24 23:23:23");
      var end = endDate.getTime();
      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24); //天数我没用到，暂且写上
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.m = Math.floor((leftTime / 1000 / 60) % 60);
        this.s = Math.floor((leftTime / 1000) % 60);
      }
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    }
  },
  created() {
    this.countTime();
    this.getPersonMsg();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
.leftPart {
  margin: 2% auto auto 6%;
  float: left;
  width: 20%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  overflow-y: scroll;
}
.rightPart {
  margin: 2% auto auto 1%;
  float: left;
  width: 65%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  overflow-y: scroll;
}
.text {
  line-height: 40px;
  text-align: center;
  font-size: 23px;
  font-weight: 700;
}
.text1 {
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: red;
  font-weight: 600;
}
.line {
  line-height: 60px;
  color: slategray;
}
</style>
