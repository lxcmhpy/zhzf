<!-- 审批单 -->
<template>
  <div class="approval-form-wrap">
    <el-row>
      <el-col :span="4" style="margin-top: 20px;">
        <div
          class="approval-left-menu"
          :class="{'active': currentMenu === '0'}"
          @click="currentMenu = '0'"
        >
          <i class="el-icon-arrow-right"></i>
          <span>申请表</span>
          <a class="status-tip">审批通过</a>
        </div>
        <div
          class="approval-left-menu"
          :class="{'active': currentMenu === '1'}"
          @click="currentMenu = '1'"
        >
          <i class="el-icon-arrow-right"></i>
          申请历史
        </div>
      </el-col>
      <el-col :span="20">
        <div class="approval-right-wrap">
          <!-- 申请表 -->
          <div v-if="currentMenu === '0'" class="approval-table">
            <h3 class="table-title">公路监督检查专用车辆申请表</h3>
            <div style="width: 488px;height:604px;border:1px solid #000;margin:20px auto;">申请表pdf</div>
          </div>
          <!-- 申请历史 -->
          <div v-if="currentMenu === '1'" class="approval-history">
            <el-timeline :reverse="reverse" class="record-line">
              <el-timeline-item
                v-for="(record, index) in records"
                :key="index"
                :hide-timestamp="true"
                color="#4573d0"
              >
                <!-- 审批通过 || 审批不通过 -->
                <span
                  v-if="record.approvalStatusId === '0' || record.approvalStatusId === '3'"
                  slot="dot"
                  class="index-dot"
                    :class="{'passApproval': record.approvalStatusId === '0', 'noApproval': record.approvalStatusId === '3'}"
                >
                  <i
                    :class="{'el-icon-check': record.approvalStatusId === '0', 'el-icon-close': record.approvalStatusId === '3'}"
                  />
                </span>
                <span
                  v-else
                  slot="dot"
                  class="index-dot"
                  :class="{'waitApproval': record.approvalStatusId === '2'}"
                >{{ index + 1 }}</span>
                <div class="device-info-wrap" style="padding-top:0;">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <label class="item-label">审批单位:</label>
                      <div class="item-text">{{ record.approvalDepertment }}</div>
                    </el-col>
                    <el-col :span="12">
                      <label class="item-label">审批人:</label>
                      <div class="item-text">{{ record.approvalPeople }}</div>
                    </el-col>
                    <el-col :span="12">
                      <label class="item-label">审批状态:</label>
                      <div class="item-text">{{ record.approvalStatus }}</div>
                    </el-col>
                    <el-col :span="12">
                      <label class="item-label">审批信息:</label>
                      <div class="item-text">{{ record.approvalInfo }}</div>
                    </el-col>
                    <el-col :span="12">
                      <label class="item-label">审批时间:</label>
                      <div class="item-text">{{ record.approvalTime }}</div>
                    </el-col>
                  </el-row>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 操作按钮 -->
    <div class="float-btns">
      <el-button class="edit_btn" type="primary" @click="editInfo">
        <i class="iconfont law-approval"></i>
        <br />签章
      </el-button>
      <el-button class="edit_btn" type="info" style="margin-left:0;margin-top:10px;" @click="saveInfo">
        <i class="iconfont law-edit"></i>
        <br />审批
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      editBaseInfoForm: {},
      rules: {},
      startEdit: true,
      currentMenu: "0",
      reverse: false,
      records: [
        {
          approvalDepertment: "固原综合执法队",
          approvalPeople: "李志",
          approvalStatus: "审批通过",
          approvalStatusId: "0",
          approvalInfo:
            "哈尔滨工业大学威海校区发布的一则“处分决定”引发公众热议。",
          approvalTime: "2019-09-13 13:34:17",
        },
        {
          approvalDepertment: "固原综合执法队",
          approvalPeople: "李志",
          approvalStatus: "审批中",
          approvalStatusId: "1",
          approvalInfo:
            "哈尔滨工业大学威海校区发布的一则“处分决定”引发公众热议。",
          approvalTime: "2019-09-13 13:34:17",
        },
        {
          approvalDepertment: "固原综合执法队",
          approvalPeople: "李志",
          approvalStatus: "待审批",
          approvalStatusId: "2",
          approvalInfo:
            "哈尔滨工业大学威海校区发布的一则“处分决定”引发公众热议。",
          approvalTime: "2019-09-13 13:34:17",
        },
        {
          approvalDepertment: "固原综合执法队",
          approvalPeople: "李志",
          approvalStatus: "审批不通过",
          approvalStatusId: "3",
          approvalInfo:
            "哈尔滨工业大学威海校区发布的一则“处分决定”引发公众热议。",
          approvalTime: "2019-09-13 13:34:17",
        },
      ],
    };
  },
  created() {},
  methods: {
    // 修改
    editInfo() {
      this.startEdit = true;
    },
    // 保存
    saveInfo() {
      this.startEdit = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.approval-form-wrap {
  padding: 10px 0;
  margin: 20px 50px;
  font-size: 14px;
  .approval-left-menu {
    font-size: 16px;
    font-weight: 560;
    color: #20232c;
    cursor: pointer;
    margin-bottom: 30px;
    position: relative;
    .el-icon-arrow-right {
      font-weight: 600;
      visibility: hidden;
      margin-right: 6px;
    }
    &.active {
      color: #4a76d1;
      .el-icon-arrow-right {
        visibility: inherit;
      }
    }
    .status-tip {
      display: inline-block;
      width: 58px;
      height: 20px;
      background: #05c051;
      border-radius: 8px 8px 8px 0px;
      font-size: 12px;
      color: #fff;
      display: inline-block;
      line-height: 20px;
      text-align: center;
      position: absolute;
      top: -16px;
      margin-left: 10px;
    }
  }
  .page-title {
    font-size: 20px;
    font-weight: 560;
    text-align: center;
    color: #20232c;
    margin-bottom: 20px;
  }
  >>> .el-col {
    margin-bottom: 20px;
  }
  .item-label {
    width: 100px;
    padding-right: 8px;
    display: inline-block;
    text-align: right;
    color: #7b7b7b;
    float: left;
  }
  .item-text {
    margin-left: 110px;
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
  .title-tips {
    color: #b2b2b2;
  }
  .approval-right-wrap {
    border-left: 1px solid #eee;
  }
  .approval-table {
    padding: 15px;
    .table-title {
      font-size: 20px;
      font-weight: 560;
      text-align: center;
      color: #20232c;
      margin-bottom: 20px;
    }
  }
  .approval-history {
    margin: 30px;
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
        &.waitApproval {
          background: #ffffff;
          border: 1px solid #e0e2e5;
          color: #7b7b7b;
        }
        &.passApproval{
            background: #05C051;
        }
        &.noApproval{
            background: #E84241;
        }
      }
    }
  }
}
</style>
