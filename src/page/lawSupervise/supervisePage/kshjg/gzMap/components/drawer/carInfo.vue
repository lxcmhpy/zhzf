<template>
  <div class="jiangXiMap-carInfo">
    <el-popover
      placement="left"
      width="400"
      trigger="hover"
      v-for="(item, index) of list"
      :key="index">
      <!-- 弹出框 -->
      <div class="jiangXiMap-carInfo-myPopover">
        <header class="myPopoverHeader">
          <span class="myPopoverHeader-title">{{item.vehicleNumber || '无车牌'}}</span>
          <span class="myPopoverHeader-minTitle">超限率:<span>{{item.overload || ''}}</span></span>
        </header>
        <div class="myPopoverContant">
          <div class="itemContant">
            <span>重点监管:否</span>
          </div>
          <div class="itemContant">
            <span>过检时间:{{item.checkTime}}</span>
          </div>
          <div class="itemContant">
            <span>历史告警(次):</span>
            <span>站点：{{item.siteName}}</span>
          </div>
          <div class="itemContant">
            <span>总重(kg):{{item.totalWeight}}</span>
            <span>超重(kg):{{item.overweight}}</span>
          </div>
        </div>
      </div>
      <!-- 主体内容 -->
      <div slot="reference">
        <div class="jiangXiMap-carInfo-itemInfo" @click="handleItem(item)">
          <div class="infoText">
            <span class="overload">{{item.overload || ''}}</span>
            <span>{{item.vehicleNumber || '无车牌'}}</span>
            <span></span>
          </div>
          <div class="infoText">
            <span class="autoWeight">超限率</span>
            <span>站点:{{ item.siteName }}</span>
            <span>{{ item.checkTime }}</span>
          </div>
        </div>
      </div>
    </el-popover>
    <div class="handleMore">
      <el-button class="handleMore" @click="handleMore" type="text">查看更多</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 展示前五个数据
    list() {
      return (this.config && this.config.records && this.config.records.slice(0,5)) || []
    }
  },

  methods: {
    /**
     * 点击列表元素，跳转路由
     */
    handleItem(data) {
      this.$emit('handleItem', data)
      // this.$router.push({
      //   name: 'law_supervise_examineDoingDetail',
      //   params: {
      //     status: '0',
      //     tabTitle: '线索详情',
      //     offSiteManageId: data.id
      //   }
      // });
    },

    /**
     * 点击查看更多，跳转路由
     */
    handleMore() {
      this.$emit('handleMore')
      // this.$router.push({
      //   name: 'law_supervise_offSiteManage'
      // })
    }
  }
}
</script>

<style lang="scss">
.jiangXiMap-carInfo {
  &-myPopover {
    .myPopoverHeader {
      height: 46px;
      box-sizing: border-box;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-title {
        font-family: "PingFang SC";
        font-size: 18px;
        font-weight: bold;
      }
      &-minTitle {
        font-family: "PingFang SC";
        font-weight: 500;
        font-size: 14px;
      }
    }
    .myPopoverContant {
      .itemContant {
        box-sizing: border-box;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          flex: 1;
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: 500;
        }
      }
    }
  }
  &-itemInfo:hover {
    background: #EBEEF5;
  }
  &-itemInfo {
    height: 70px;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .infoText {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        flex: 2;
        text-align: left;
        font-size: 14px;
        font-family: "PingFang SC";
        font-weight: 500;
      }
      span:nth-child(3) {
        flex: 3;
        text-align: right;
        margin-right: 15px;
      }
      .autoWeight {
        text-align: center;
      }
      .overload {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #4573d0;
      }
    }
  }
  .handleMore {
    text-align: center;
  }
}
</style>
