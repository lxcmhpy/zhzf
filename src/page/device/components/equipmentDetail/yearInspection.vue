<!-- 年检信息 -->
<template>
  <div class="year-inspection-detail">
    <el-timeline :reverse="reverse" class="record-line">
      <el-timeline-item
        v-for="(record, index) in records"
        :key="index"
        :hide-timestamp="true"
        color="#4573d0"
      >
        <span slot="dot" class="index-dot">{{ index + 1 }}</span>
        <div class="device-info-wrap" style="padding-top:0;">
          <el-row :gutter="20">
            <el-col :span="9">
              <div>
                <label class="item-label">年检年份:</label>
                <div class="item-text">{{ record.year }}</div>
              </div>
              <div>
                <label class="item-label">检验有效期至:</label>
                <div class="item-text">{{ record.validTime }}</div>
              </div>
              <div>
                <label class="item-label">检验机构:</label>
                <div class="item-text">{{ record.checkOrgan }}</div>
              </div>
            </el-col>
            <el-col :span="7">
              <label class="item-label">年检标志:</label>
              <el-image
                style="width: 102px; height: 102px"
                :src="inspectImg"
                fit="fill"></el-image>
            </el-col>
            <el-col :span="7">
              <el-button type="primary" size="medium">修改</el-button>
              <el-button type="info" size="medium">删除</el-button>
            </el-col>
          </el-row>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      reverse: false,
      records: [
        {
          year: "2019年",
          validTime: "2020年04月",
          checkOrgan: "北京市昌平区京北车辆管理所",
          signImg: "北京市"
        },
        {
          year: "2019年",
          validTime: "2020年04月",
          checkOrgan: "北京市昌平区京北车辆管理所",
          signImg: "北京市"
        },
        {
          year: "2019年",
          validTime: "2020年04月",
          checkOrgan: "北京市昌平区京北车辆管理所",
          signImg: "北京市"
        }
      ],
      inspectImg: '@/../static/images/img/trained/year_inspect.jpg',
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.year-inspection-detail {
  padding: 30px 50px;
  .device-info-wrap {
    padding: 10px 0;
    line-height: 28px;
    .item-label {
      width: 110px;
      padding-right: 8px;
      display: inline-block;
      text-align: right;
      color: #7b7b7b;
      float: left;
    }
    .item-text {
      margin-left: 120px;
      color: #20232c;
      font-weight: 560;
    }
    .item-img {
      display: block;
      width: 176px;
      height: 96px;
      margin-top: 10px;
      text-align: center;
      line-height: 96px;
    }
  }
  .record-line {
    margin: 10px;
    >>> .el-timeline-item__dot {
      left: -5px;
    }
    .index-dot {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 20px;
      background: #4573d0;
      color: #ffffff;
    }
  }
}
</style>
