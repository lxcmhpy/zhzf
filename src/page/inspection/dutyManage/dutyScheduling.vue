<template>
  <div class="com_searchAndpageBoxPadding scheduling-page">
    <div class="searchAndpageBox" style="height: 100%; min-height: 580px;">
      <div class="content-wrap">
        <Calendar @selectedDay="setSelectedDay" />
      </div>
      <div class="scheduling-wrap">
        <div class="select-business-type">
          <el-select v-model="businessIndex" placeholder="请选择" @change="onBusinessChange">
            <el-option
              v-for="(item, index) in businessOptions"
              :key="item.cateId"
              :label="item.cateName"
              :value="index"
            ></el-option>
          </el-select>
        </div>
        <div class="scheduling-handle-wrap">
          <el-button icon="el-icon-plus" plain @click="addSchedulingFun">新增</el-button>
          <el-button icon="el-icon-edit" plain @click="editSchedulingFun">修改</el-button>
        </div>
        <div class="scheduling-center-line"/>
        <!-- 排班列表 -->
        <div 
            v-if="scheduleList && scheduleList.length > 0"
            class="scheduling-list-wrap">
          <div 
            v-for="(schedule,index) in scheduleList" 
            :key="index" 
            class="duty-item-box"
            :class="{'active': selectSchedule.scheduleId && selectSchedule.scheduleId === schedule.scheduleId}"
            @click="onScheduleClick(schedule)"
            >
            <div class="duty-item-top">
              <span class="item-index">第 {{ index + 1 }} 组</span>
              <span class="item-handle-btn">
                <!-- <span class="iconfont law-guiji"></span> -->
                <span class="el-icon-delete" @click="deleteScheduling(schedule.scheduleId)"></span>
              </span>
            </div>
            <div class="scheduling-content">
              <p class="cnt-item">
                <span class="cnt-label">执法班次</span>
                <span class="cnt-text">{{schedule.startTime}}<span style="margin:0 15px;">至</span>{{schedule.endTime}}</span>
              </p>
              <p class="cnt-item">
                <span class="cnt-label">执法人员</span>
                <span class="cnt-text">{{schedule.lawEnforcementOfficials}}</span>
              </p>
              <p class="cnt-item">
                <span class="cnt-label">巡查路线</span>
                <span class="cnt-text">{{schedule.patrolRoute}}</span>
              </p>
            </div>
          </div>
        </div>
        <div v-else class="schedutin-none-data">暂无数据</div>
      </div>
    </div>
    <!-- 新增排班 -->
    <AddScheduling ref="AddSchedulingRef" :dutyDay="dutyDay" :businessOptions="businessOptions" />
  </div>
</template>
<script>
import Calendar from "@/components/calendar/calendar.vue";
import AddScheduling from '@/page/inspection/dutyManage/components/addScheduling';
import { getScheduleListApi, deleteCheScheduleApi } from "@/api/supervision";

export default {
  data() {
    return {
      dutyDay: "",
      businessIndex: 0,
      businessOptions: [],
      scheduleList: [],
      selectSchedule: {},//当前所选排班
    };
  },
  components: { Calendar, AddScheduling },
  created() {
    this.getEnforceLawType();
  },
  methods: {
    // 日历选择日期
    setSelectedDay(data) {
      console.log(data)
      this.dutyDay = data.replace(/\//g, "-");
      this.getScheduleList();
    },
    // 新增排班
    addSchedulingFun(){
      const curBusiness = this.businessOptions[this.businessIndex] || {};
      const data = { day: this.dutyDay, cateId: curBusiness.cateId, cateName: curBusiness.cateName };
      this.$refs.AddSchedulingRef.showModal('add', data);
    },
    editSchedulingFun(){
      if(this.selectSchedule.scheduleId){
        this.$refs.AddSchedulingRef.showModal('edit', this.selectSchedule);
      }else{
        this.$message({
          type: "warning",
          message: "请选择排班！"
        });
      }
    },
    // 删除排班
    deleteScheduling(scheduleId){
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'custom-question',
        customClass: 'custom-confirm'
      }).then(() => {
        deleteCheScheduleApi(scheduleId).then(
          (res) => {
            if (res.code == 200) {
              console.log('删除成功');
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getScheduleList();
            }
          },
          (err) => {}
        );
      }).catch(() => {});
    },
    // 获取业务类型
    getEnforceLawType() {
      this.$store.dispatch("getEnforceLawType", "1").then(
        (res) => {
          this.businessOptions = res.data;
          this.businessType = res.data[0].cateName;
          
          this.getScheduleList();
        },
        (err) => {}
      );
    },
    onBusinessChange(){
      this.getScheduleList();
    },
    //获取排班列表
    getScheduleList(){
      const curBusiness = this.businessOptions[this.businessIndex] || {};
      const params = { size: -1, cateId: curBusiness.cateId, startTime: this.dutyDay }
      getScheduleListApi(params).then(
        res => {
          if (res.code == 200) {
            this.scheduleList = res.data.records;
          }
        },
        error => {
          // reject(error);
        });
    },
    onScheduleClick(schedule){
      console.log(schedule,'click');
      this.selectSchedule = schedule;
    },
    clearSelectSchedule(){
      this.selectSchedule = {};
    }
  },
};
</script>


<style  lang="scss" scoped>
.scheduling-page {
  .content-wrap {
    float: left;
    width: 48%;
    height: 100%;
    position: relative;
  }
  .scheduling-wrap {
    position: absolute;
    top: 0px;
    right: -10px;
    width: 48%;
    bottom: 0px;
    background: rgba(140, 172, 235, 0.8);
    .select-business-type {
      width: 30%;
      margin: 40px 40px 20px;
      >>> .el-input__inner {
        background: none;
        border: none;
        font-size: 24px;
        color: #fff;
        font-weight: 600;
      }
      >>> .el-input__icon {
        color: #fff;
        font-size: 24px;
        line-height: 32px;
        font-weight: 600;
      }
    }
    .scheduling-handle-wrap {
      margin: 0 55px 10px;
      >>> .el-button {
        font-size: 16px;
        padding: 10px 20px;
      }
    }
    .scheduling-list-wrap {
      position: relative;
      height: calc(100% - 150px);
      overflow-y: scroll;
      .duty-item-box {
        padding: 20px 0;
        border-bottom: 1px dashed #fff;
        .duty-item-top,
        .scheduling-content {
          margin: 0 55px;
        }
        .duty-item-top {
          border-bottom: 2px solid #fff;
          line-height: 32px;
          display: flex;
          justify-content: space-between;
          color: #fff;
          .item-handle-btn>span{
            cursor: pointer;
            margin-left: 10px;
            &:hover{
              color: #4573D0;
            }
          }
        }
        .scheduling-content{
          margin-top: 10px;
          margin-bottom: 10px;
          .cnt-item{
            margin: 10px 0;
            line-height: 30px;
            .cnt-label{
              display: block;
              color: #fff;
              float: left;
            }
            .cnt-text{
              display: block;
              margin-left: 80px;
              padding: 0 12px;
              color: #fff;
              background: rgba(69, 115, 208, .5);
            }
          }
        }
        &:hover{
          background: rgba(140, 172, 235, 0.5);
        }
        &.active {
          background: rgba(69, 115, 208, 0.5);
        }
      }
    }

    .scheduling-center-line {
      height: 1px;
      box-shadow: 0px 5px 10px #383737;
    }

    .schedutin-none-data {
      line-height: 60px;
      text-align: center;
      color: white;
    }
  }
}
</style>
