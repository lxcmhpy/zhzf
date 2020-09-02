<template>
  <div class="calendar-wrap">
    <!-- 选择年月 -->
    <div class="top-box">
      <span class="el-icon-d-arrow-left calendar-top-btn" @click="preCalendar('selectYear')"></span>
      <span class="el-icon-arrow-left calendar-top-btn" @click="preCalendar('selectMonth')"></span>
      <div class="select-year">
        <el-date-picker
          class="calendar-date-picker"
          v-model="selectData.selectYear"
          type="year"
          :clearable="false"
          :editable="false"
          format="yyyy年"
          value-format="yyyy"
          @change="changeCalendar">
        </el-date-picker>
      </div>
      <div class="select-year">
        <el-date-picker
          class="calendar-date-picker"
          v-model="selectData.selectMonth"
          type="month"
          :clearable="false"
          :editable="false"
          format="MM月"
          value-format="MM"
          popper-class="calendar-picker-month"
          placeholder="选择月"
          @change="changeCalendar">
        </el-date-picker>
      </div>
      <span class="el-icon-arrow-right calendar-top-btn" @click="nextCalendar('selectMonth')"></span>
      <span class="el-icon-d-arrow-right calendar-top-btn" @click="nextCalendar('selectYear')"></span>
    </div>
    <!-- 日期 -->
    <div class="date-box">
      <ul v-if="calendarData && calendarData.length" class="level1-ul">
        <li>
          <ul class="level2-ul day">
            <li v-for="(week, index) in weeks" :key="index">{{ week }}</li>
          </ul>
        </li>
        <li v-for="(item, index) in calendarData" :key="index">
          <ul class="level2-ul level2-ul1 day-item">
            <template v-for="(day, i) in item">
              <li
                :key="i"
                :class="{'active': day.id && day.id === selectDay}"
                @click="changeSelectedDay(day)">
                <span v-if="day" class="day-text">{{ day.day }}</span>
                <span v-if="day" class="day-text2">{{ day.lunarF || day.solarF || day.lunarText }}</span>
              </li>
            </template>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCalendar, getMonthDay } from '@/components/calendar/calendarFun.js';

export default {
  data() {
    return {
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      calendarData: null,
      selectDay: '',
      selectData: {
        selectYear: '',
        selectMonth: ''
      }
    };
  },
  mounted(){
    this.getCurrentCalendar();
  },
  methods: {
    // 获取当前月份日历
    getCurrentCalendar(){
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const date = getMonthDay(year, month);
      let data = getCalendar(year, month, date);
      this.selectData.selectYear = `${year}`;
      this.selectData.selectMonth = `${month}`;
      this.selectDay = `${year}/${month > 10 ? month : '0' + month}/${day > 10 ? day : '0' + day}`;
      this.calendarData = data;
      this.$emit('selectedDay', this.selectDay);
    },
    // 选中日历中的某一天
    changeSelectedDay(day){
      if(day){
        this.selectDay = day.id;
        this.$emit('selectedDay', day.id);
      }
    },
    // 选择年月变化
    changeCalendar(){
      const year = parseInt(this.selectData.selectYear);
      const month = parseInt(this.selectData.selectMonth);
      const date = getMonthDay(year, month);
      let data = getCalendar(year, month, date);
      this.calendarData = data;
    },
    // 上一年或上一月
    preCalendar(item){
      this.selectData[item] = `${this.selectData[item] - 1}`;
      this.changeCalendar();
    },
    // 下一年或下一月
    nextCalendar(item){
      this.selectData[item] = `${parseInt(this.selectData[item]) + 1}`;
      this.changeCalendar();
    }
  }
};
</script>

<style lang="scss">
.calendar-picker-month{
  .el-date-picker__header{
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.calendar-wrap {
  position: relative;
  padding: 20px;
  min-width: 500px;
  .top-box {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    padding-left: 6%;
    span {
      display: inline-block;
      margin-right: 16px;
      cursor: pointer;
      &.calendar-top-btn {
        color: #000;
        font-weight: 600;
        &:hover {
          color: #4573d0;
        }
      }
      &.disabled {
        color: #b2b2b2;
        cursor: not-allowed;
      }
    }
    .select-year {
      display: inline-block;
    }
  }
  .date-box {
    .level2-ul {
      height: 60px;
      margin: 8px 0;
      &.day-item {
        cursor: pointer;
        li {
          &:hover {
            background: rgb(198, 226, 255);
            border-radius: 8px;
            box-shadow: 0px 2px 4px 0px rgba(28, 59, 122, 0.25);
          }
          &.active {
            background: #4573d0;
            border-radius: 8px;
            box-shadow: 0px 2px 4px 0px rgba(28, 59, 122, 0.25);
            .day-text,
            .day-text2 {
              color: #fff;
            }
          }
          &:first-child,
          &:last-child{
              .day-text{
                color: #E64240;
              }
          }
        }
      }
      li {
        display: inline-block;
        width: 14.2%;
        line-height: 30px;
        text-align: center;
        box-sizing: border-box;
        .day-text {
          display: inline-block;
          width: 100%;
          font-size: 20px;
          font-weight: 600;
          color: #20232c;
        }
        .day-text2 {
          font-size: 14px;
          color: #7b7b7b;
        }
      }
      &.day {
        margin: 20px 0;
        li {
          font-size: 20px;
          color: #7b7b7b;
          font-weight: 600;
          line-height: 60px;
        }
      }
    }
  }
  .calendar-date-picker{
    >>>.el-input__prefix,
    >>>.el-input__icon{
      display: none;
    }
    >>>.el-input__inner{
      padding: 0;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color: #4573d0;
      background: none;
      border: none;
      cursor: pointer;
    }
  }
  >>>.el-date-editor.el-input, >>>.el-date-editor.el-input__inner{
    width: 100px;
  }
}
</style>