<!-- 查看装备信息 -->
<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="48%"
  >
    <div class="device-detail-dialog">
      <el-tabs class="device-top-tab" v-model="activeName">
        <el-tab-pane label="基本信息" name="base">
          <div class="device-info-wrap">
            <el-row :gutter="20">
              <el-col :span="12">
                <label class="item-label">装备编号</label>
                <div class="item-text">JD_4385345</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">装备类型</label>
                <div class="item-text">类型</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">装备名称</label>
                <div class="item-text">小汽车</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">装备型号</label>
                <div class="item-text">型号</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">计量单位</label>
                <div class="item-text">辆</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">SN号</label>
                <div class="item-text">789</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">来源</label>
                <div class="item-text">从哪来</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">购置单位</label>
                <div class="item-text">交通</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">购置日期</label>
                <div class="item-text">2020-08-03</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">购置价格(元)</label>
                <div class="item-text">2000</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">使用单位</label>
                <div class="item-text">交警队</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">使用人</label>
                <div class="item-text">李四</div>
              </el-col>
              <el-col :span="24">
                <label class="item-label">图片</label>
                <el-image class="item-img">
                  <span slot="error">暂无图片</span>
                </el-image>
              </el-col>
              <el-col :span="24">
                <label class="item-label">备注</label>
                <div class="item-text">一段文字</div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="维保信息" name="maintenance">
          <div class="device-info-wrap">
            <el-row :gutter="20">
              <el-col :span="12">
                <label class="item-label">供应商</label>
                <div class="item-text">宝马</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">维保到期</label>
                <div class="item-text">2022-08-03</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">联系人</label>
                <div class="item-text">宝马总部</div>
              </el-col>
              <el-col :span="12">
                <label class="item-label">联系电话</label>
                <div class="item-text">999999</div>
              </el-col>
              <el-col :span="24">
                <label class="item-label">维保说明</label>
                <div class="item-text">说明文字</div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="操作记录" name="handleRecord">
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
                  <el-col :span="12">
                    <label class="item-label">处理日期:</label>
                    <div class="item-text">{{ record.handleTime }}</div>
                  </el-col>
                  <el-col :span="12">
                    <label class="item-label">处理单号:</label>
                    <div class="item-text">{{ record.handleOddNum }}</div>
                  </el-col>
                  <el-col :span="12">
                    <label class="item-label">处理方式:</label>
                    <div class="item-text">{{ record.handleMode }}</div>
                  </el-col>
                  <el-col :span="12">
                    <label class="item-label">处理人:</label>
                    <div class="item-text">{{ record.handleUser }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editDevice">修 改</el-button>
    </div>
    <!-- 修改装备 -->
    <AddDevice ref="addDeviceRef"/>
  </el-dialog>
</template>
<script>
import AddDevice from '@/page/device/components/addDevice/addDevice';

export default {
    components: { AddDevice },
  data() {
    return {
      visible: false,
      dialogTitle: "新增装备",
      activeName: "base",
      reverse: false,
      records: [
        {
          handleTime: "2019年09月12日 12:09:35",
          handleOddNum: "PF202006101112",
          handleMode: '配发（领用）',
          handleUser: '北京市'
        },
        {
          handleTime: "2019年09月12日 12:09:35",
          handleOddNum: "PF202006101112",
          handleMode: '配发（领用）',
          handleUser: '北京市'
        },
        {
          handleTime: "2019年09月12日 12:09:35",
          handleOddNum: "PF202006101112",
          handleMode: '配发（领用）',
          handleUser: '北京市'
        }
      ],
    };
  },
  created() {},
  methods: {
    // 打开弹窗
    showModal() {
      this.visible = true;
    },
    editDevice() {
        this.$refs.addDeviceRef.showModal();
    },
    // 关闭弹窗
    closeDialog() {
      this.visible = false;
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
      width: 90px;
      padding-right: 8px;
      display: inline-block;
      text-align: right;
      color: #7b7b7b;
      float: left;
    }
    .item-text {
      margin-left: 100px;
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
