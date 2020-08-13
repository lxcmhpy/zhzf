<!-- 审批单 -->
<template>
  <div class="approval-form-wrap">
    <el-row>
      <el-col :span="4" style="margin-top: 20px;">
        <div
          class="approval-left-menu"
          :class="{'active': currentMenu === '0'}"
          @click="clickPDF"
        >
          <i class="el-icon-arrow-right"></i>
          <span>申请表</span>
          <a class="status-tip">{{status}}</a>
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
            <div class="print_box" id="myBox" style="width:790px;margin:0 auto;">
            </div>
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
                  v-if="record.approveStatus === '审批通过' || record.approveStatus === '审批未通过'"
                  slot="dot"
                  class="index-dot"
                    :class="{'passApproval': record.approveStatus === '审批通过', 'noApproval': record.approveStatus === '审批未通过'}"
                >
                  <i
                    :class="{'el-icon-check': record.approveStatus === '审批通过', 'el-icon-close': record.approveStatus === '审批未通过'}"
                  />
                </span>
                <span
                  v-else
                  slot="dot"
                  class="index-dot"
                  :class="{'waitApproval': record.approveStatus === '审批中'}"
                >{{ index + 1 }}</span>
                <div class="device-info-wrap" style="padding-top:0;">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <label class="item-label">审批单位:</label>
                      <div class="item-text">{{ record.organName }}</div>
                    </el-col>
                    <el-col :span="12">
                      <label class="item-label">审批人:</label>
                      <div class="item-text">{{ record.approver }}</div>
                    </el-col>
                    <el-col :span="12">
                      <label class="item-label">审批状态:</label>
                      <div class="item-text">{{ record.approveStatus }}</div>
                    </el-col>
                    <el-col :span="12">
                      <label class="item-label">审批信息:</label>
                      <div class="item-text">{{ record.note }}</div>
                    </el-col>
                    <el-col :span="12">
                      <label class="item-label">审批时间:</label>
                      <div class="item-text">{{ record.checkTime }}</div>
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
      <el-button v-if="isApprove && !sealed" class="edit_btn" type="primary" @click="makeSeal">
        <i class="iconfont law-approval"></i>
        <br />签章
      </el-button>
      <el-button v-if="isApprove && !approved" class="edit_btn" type="info" style="margin-left:0;margin-top:10px;" @click="approveBill">
        <i class="iconfont law-edit"></i>
        <br />审批
      </el-button>
    </div>
    <approvalDialog ref="approvalDialogRef" @getNewData="approvalOver"></approvalDialog>
  </div>
</template>

<script>
import { 
    listApproveInfo,getFileStreamByStorageIdApi
} from "@/api/device/deviceCertificateBill.js";
import iLocalStroage from "@/common/js/localStroage";
import approvalDialog from "@/page/device/components/approvalDialog";
export default {
  components: {approvalDialog},
  data() {
    return {
      editBaseInfoForm: {},
      rules: {},
      currentMenu: "0",
      reverse: false,
      records: [],
      sealed:false,
      approved:false,
      step:0,
      organId:''
    };
  },
  created() {
      this.getApproveInfo()
      this.getFile()
      this.organId=iLocalStroage.gets("userInfo").organId
  },
  props: {
    id: String,
    isApprove:Boolean,
    status:String,
    pdfId:String,
  },
  inject: ['reload'],
  methods: {
      clickPDF(){
          this.currentMenu = '0'
          this.getFile()
      },
      getFile() {
        this.getFileStream(this.pdfId)
      },
      //根据stroagId请求文件流
      getFileStream(storageId){
        getFileStreamByStorageIdApi(storageId).then(res=>{
          this.getObjectURL(res);
        }).catch(err=>{
          console.log(err);
        })
      },
      // 将返回的流数据转换为url
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          try {
            url = window.webkitURL.createObjectURL(file);
          } catch (error) {

          }
        } else if (window.URL != undefined) { // mozilla(firefox)
          try {
            url = window.URL.createObjectURL(file);
          } catch (error) {

          }
        }
        this.pdfUrl =url;
        let myBox = document.getElementById("myBox");
        let iframes = document.getElementsByTagName("iframe");
        for (let i = 0; i < iframes.length; i++) {
          myBox.removeChild(iframes[i]);
        }
        let  myIframe = document.createElement('iframe');
        myIframe.setAttribute("src", '/static/pdf/web/viewer.html?file='+encodeURIComponent(url));
        myIframe.setAttribute('style','width:790px;height:1119px');
        myBox.appendChild(myIframe);
      },
      async getApproveInfo(){
          let res = await listApproveInfo(this.id)
          this.records = res.data
          res.data.forEach(p=>{
              if(p.organId==this.organId){
                this.step=p.step
              }
          })
      },
    //签章
    makeSeal() {
        this.sealed=true
    },
    //审批
    approveBill() {
        this.approved = true
        let approveData = {
            step:this.step,
            billId:this.id,
            storageId:this.pdfId,
            organId:this.organId
        }
        this.$refs.approvalDialogRef.showModal(approveData);
    },
    //审批完成 重新获取pdf
    approvalOver() {
        this.reload();
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
