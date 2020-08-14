<!-- 证件信息 -->
<template>
  <el-dialog
    title="查看证件"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="55%"
    class="fullscreen"
    append-to-body
  >
    <div class="device-detail-dialog">
      <el-tabs class="device-top-tab" v-model="activeName">
        <el-tab-pane label="证件信息" name="base">
          <div class="device-info-wrap">
            <el-row :gutter="20">
              <el-col :span="12">
                <label class="item-label">车牌号</label>
                <div class="item-text">{{deviceUsePer.vehicleNumber}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">使用单位</label>
                <div class="item-text">{{deviceUsePer.useUnitName}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">车辆类型</label>
                <div class="item-text">{{deviceUsePer.vehicleType}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">厂牌型号</label>
                <div class="item-text">{{deviceUsePer.brandModel}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">发动机号</label>
                <div class="item-text">{{deviceUsePer.engineNumber}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">车架号码</label>
                <div class="item-text">{{deviceUsePer.axleNumber}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">使用证号</label>
                <div class="item-text">{{deviceUsePer.usePermitNumber}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">证件状态</label>
                <div class="item-text">{{deviceUsePer.state}}</div>
              </el-col>
              <el-col :span="24">
                <label class="item-label">使用期限</label>
                <div class="item-text">{{deviceUsePer.beginDate}}~{{deviceUsePer.endDate}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">发证机关</label>
                <div class="item-text">{{deviceUsePer.issueOrgan}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">发证时间</label>
                <div class="item-text">{{deviceUsePer.lssueTime}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">签发人</label>
                <div class="item-text">{{deviceUsePer.signer}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">签发时间</label>
                <div class="item-text">{{deviceUsePer.signDate}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">经办人</label>
                <div class="item-text">{{deviceUsePer.manager}}</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">经办时间</label>
                <div class="item-text">{{deviceUsePer.handlingDate}}</div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史记录" name="historyRecord">
          <el-timeline :reverse="reverse" class="record-line">
            <el-timeline-item
              v-for="(record, index) in records"
              :key="index"
              :hide-timestamp="true"
              color="#4573d0"
            >
              <span
                slot="dot"
                class="index-dot"
                :style="{'background': statusColor[record.operationType]}"
              >{{ index + 1 }}</span>
              <div class="device-info-wrap" style="padding-top:0;">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <label class="item-label">证件状态:</label>
                    <div
                      class="item-text"
                      :style="{'color': statusColor[record.operationType]}"
                    >{{ record.operationType }}</div>
                  </el-col>
                  <el-col :span="12">
                    <label class="item-label">操作日期:</label>
                    <div class="item-text">{{ record.operationDate }}</div>
                  </el-col>
                  <el-col :span="24">
                    <label class="item-label">变化原因(单号):</label>
                    <div class="item-text">{{ record.billNo }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
    </div>-->
  </el-dialog>
</template>
<script>
import { findInfoAndHistory } from "@/api/device/deviceCertificate.js";
export default {
  components: {},
  data() {
    return {
      visible: false,
      activeName: "base",
      reverse: false,
      deviceUsePer: {},
      records: [
        // {
        //   statusNo: "0",
        //   status: "待颁发",
        //   handleTime: "2019年09月12日 12:09:35",
        //   handleReason: "FZ4358394589",
        // },
        // {
        //   statusNo: "1",
        //   status: "正常",
        //   handleTime: "2019年09月12日 12:09:35",
        //   handleReason: "FZ4358394589",
        // },
        // {
        //   statusNo: "2",
        //   status: "挂失",
        //   handleTime: "2019年09月12日 12:09:35",
        //   handleReason: "FZ4358394589",
        // },
        // {
        //   statusNo: "3",
        //   status: "已年审",
        //   handleTime: "2019年09月12日 12:09:35",
        //   handleReason: "FZ4358394589",
        // },
        // {
        //   statusNo: "4",
        //   status: "注销",
        //   handleTime: "2019年09月12日 12:09:35",
        //   handleReason: "FZ4358394589",
        // },
      ],
      statusColor: {
        待颁发: "#0074F5",
        正常: "#05C051",
        挂失: "#FF8000",
        已年审: "#0BA5BF",
        注销: "#999999",
      },
    };
  },
  created() {},
  methods: {
    // 打开弹窗
    showModal(id) {
      this.visible = true;
      if (id) this.getData(id);
    },
    // 关闭弹窗
    closeDialog() {
      this.visible = false;
    },
    getData(id) {
      let _this = this;
      findInfoAndHistory(id).then(
        (res) => {
          _this.deviceUsePer = res.data.info;
          _this.records = res.data.history;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.device-detail-dialog {
  .device-top-tab {
    >>> .el-tabs__item {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .device-info-wrap {
    padding: 10px 0;
    line-height: 28px;
    >>> .el-col {
      margin-bottom: 15px;
    }
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
    margin: 10px 25px;
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
