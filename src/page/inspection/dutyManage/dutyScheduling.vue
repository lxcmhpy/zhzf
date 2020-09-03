<template>
  <div class="com_searchAndpageBoxPadding scheduling-page">
    <div class="searchAndpageBox" style="height: 100%; min-height: 580px;">
      <div class="content-wrap">
        <Calendar @selectedDay="setSelectedDay" />
      </div>
      <div class="scheduling-wrap">
        <div class="select-business-type">
          <el-select v-model="businessType" placeholder="请选择">
            <el-option
              v-for="item in businessOptions"
              :key="item.cateId"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </div>
        <div class="scheduling-handle-wrap">
          <el-button icon="el-icon-plus" plain @click="addSchedulingFun">新增</el-button>
          <el-button icon="el-icon-edit" plain>修改</el-button>
        </div>
        <!-- 排班列表 -->
        <div class="scheduling-list-wrap">
          <div class="duty-item-box">
            <div class="duty-item-top">
              <span class="item-index">第一组</span>
              <span class="item-handle-btn">
                <span class="iconfont law-guiji"></span>
                <span class="el-icon-delete" @click="deleteScheduling"></span>
              </span>
            </div>
            <div class="scheduling-content">
              <p class="cnt-item">
                <span class="cnt-label">执法班次</span>
                <span class="cnt-text">2020-09-01 23:00:00<span style="margin:0 15px;">至</span>2020-09-01 13:00:00</span>
              </p>
              <p class="cnt-item">
                <span class="cnt-label">执法人员</span>
                <span class="cnt-text">附明朝; 刘辉说; 如俄日</span>
              </p>
              <p class="cnt-item">
                <span class="cnt-label">巡查路线</span>
                <span class="cnt-text">云南省马连道道路6号院1层</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增排班 -->
    <AddScheduling ref="AddSchedulingRef" :businessOptions="businessOptions" />
  </div>
</template>
<script>
import Calendar from "@/components/calendar/calendar.vue";
import AddScheduling from '@/page/inspection/dutyManage/components/addScheduling';

export default {
  data() {
    return {
      dutyDay: "",
      businessType: "",
      businessOptions: [],
    };
  },
  components: { Calendar, AddScheduling },
  created() {
    this.getEnforceLawType();
  },
  methods: {
    // 日历选择日期
    setSelectedDay(data) {
      this.dutyDay = data.replace(/\//g, "-");
    },
    // 新增排班
    addSchedulingFun(){
      const data = { day: this.dutyDay, businessType: this.businessType };
      this.$refs.AddSchedulingRef.showModal('add', data);
    },
    // 删除排班
    deleteScheduling(){
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'custom-question',
        customClass: 'custom-confirm'
      }).then(() => {
        console.log('删除成功');
      }).catch(() => {});
    },
    // 获取业务类型
    getEnforceLawType() {
      this.$store.dispatch("getEnforceLawType", "1").then(
        (res) => {
          this.businessOptions = res.data;
          this.businessType = res.data[0].cateName;
        },
        (err) => {}
      );
    },
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
      }
    }
  }
}
</style>
