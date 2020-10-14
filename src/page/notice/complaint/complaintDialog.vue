<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="visible = false"
    :close-on-click-modal="false"
    width="70%"
    class="complaint-dialog"
  >
    <div style="height:400px">
      <el-form ref="form" :model="form" :rules="rules" label-width="0px">
        <div>
          <div class="title">案件信息</div>
          <table class="table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td width="15%">办件编号</td>
              <td width="35%">{{form.letterNo}}</td>
              <td width="15%">来信时间</td>
              <td width="35%">{{form.sendTime.substring(0,10)}}</td>
            </tr>
            <tr>
              <td>信件标题</td>
              <td colspan="3">{{form.letterTitle}}</td>
            </tr>
            <tr>
              <td>信件内容</td>
              <td colspan="3">
                <div v-html="form.letterContent"></div>
              </td>
            </tr>
            <tr>
              <td>是否公开</td>
              <td colspan="3">{{form.isOpen==1?"是":"否"}}</td>
            </tr>
          </table>
        </div>

        <div>
          <div class="title">来信人信息</div>
          <table class="table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td width="15%">姓名</td>
              <td width="35%">{{form.sendName}}</td>
              <td width="15%">身份证号</td>
              <td width="35%">{{form.sendIdNumber}}</td>
            </tr>
            <tr>
              <td>电话</td>
              <td>{{form.sendPhoneNumber}}</td>
              <td>邮箱</td>
              <td>{{form.sendEmail}}</td>
            </tr>
            <tr>
              <td>联系地址</td>
              <td colspan="3">{{form.sendAddress}}</td>
            </tr>
          </table>
        </div>

        <div v-if="type===2">
          <div class="title">接件信息</div>
          <table class="table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td width="15%">接件人</td>
              <td width="35%">
                <el-form-item prop="acceptedName">
                  <el-input v-model="form.acceptedName"></el-input>
                </el-form-item>
              </td>
              <td width="15%">接件时间</td>
              <td width="35%">
                <el-form-item prop="acceptedTime">
                  <el-date-picker
                    v-model="form.acceptedTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>接件意见</td>
              <td colspan="3">
                <el-form-item prop="acceptedPropose">
                  <el-input type="textarea" :rows="3" v-model="form.acceptedPropose"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
        <div v-else>
          <div class="title">接件信息</div>
          <table class="table" border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td width="15%">接件人</td>
              <td width="35%">{{form.acceptedName}}</td>
              <td width="15%">接件时间</td>
              <td width="35%">{{form.acceptedTime}}</td>
            </tr>
            <tr>
              <td>接件意见</td>
              <td colspan="3">{{form.acceptedPropose}}</td>
            </tr>
          </table>
        </div>

        <div v-if="type===3">
          <div class="title">处理情况</div>
          <table class="table" width="100%" cellspacing="0">
            <tr>
              <td width="15%">回复单位</td>
              <td width="35%">
                <el-form-item prop="replyUnit">
                  <el-input v-model="form.replyUnit"></el-input>
                </el-form-item>
              </td>
              <td width="15%">回复时间</td>
              <td width="35%">
                <el-form-item prop="replyTime">
                  <el-date-picker
                    v-model="form.replyTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>回复内容</td>
              <td colspan="3">
                <el-form-item prop="replyContent">
                  <el-input type="textarea" :rows="3" v-model="form.replyContent"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
        <div v-if="type===1">
          <div class="title">处理情况</div>
          <table class="table" width="100%" cellspacing="0">
            <tr>
              <td width="15%">回复单位</td>
              <td width="35%">{{form.replyUnit}}</td>
              <td width="15%">回复时间</td>
              <td width="35%">{{form.replyTime}}</td>
            </tr>
            <tr>
              <td>回复内容</td>
              <td colspan="3">
                <div v-html="form.replyContent"></div>
              </td>
            </tr>
          </table>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="type===1" @click="visible = false">关闭</el-button>
      <el-button v-if="type!==1" @click="visible = false">取消</el-button>
      <el-button v-if="type!==1" type="primary" @click="handleData()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { findById } from "@/api/notice/complaint";
export default {
  data() {
    return {
      form: {
        letterNo: "",
        sendTime: "",
        letterTitle: "",
        letterContent: "",
        isOpen: "",
        sendName: "",
        sendIdNumber: "",
        sendPhoneNumber: "",
        sendEmail: "",
        sendAddress: "",
        acceptedName: "",
        acceptedTime: "",
        acceptedPropose: "",
        replyUnit: "",
        replyTime: "",
        replyContent: "",
      },
      rules: {},
      visible: false,
      title: "",
      type: "",
    };
  },
  methods: {
    async showModal(type, data) {
      this.type = type;
      this.title = type === 1 ? "详情" : type === 2 ? "接件" : "回复";
      let res = await findById(data.id);
      this.form = res.data;
      if (type === 2) {
        if (!this.form.acceptedName)
          this.$set(
            this.form,
            "acceptedName",
            iLocalStroage.gets("userInfo").nickName
          );
        if (!this.form.acceptedTime)
          this.$set(this.form, "acceptedTime", new Date().format("yyyy-MM-dd"));
      } else if (type === 3) {
        if (!this.form.replyUnit) this.$set(this.form, "replyUnit", "");
        if (!this.form.replyTime)
          this.$set(this.form, "replyTime", new Date().format("yyyy-MM-dd"));
      }

      this.visible = true;
    },

    /* async getData(id) {
      let res = findById(id);
      return res.data;
    }, */

    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },

    handleData() {
      this.form.state = this.type;
      this.$emit("handle-data", this.form);
      this.closeDialog();
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.complaint-dialog {
  .title {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    margin-top: 10px;
  }
  table {
    border: 1px solid #cccccc;
    min-height: 30px;
    line-height: 30px;
    text-align: left;
    border-collapse: collapse;
    padding: 2px;
  }
  table tr th,
  table tr td {
    border: 1px solid #cccccc;
    padding: 10px;
  }
  table .title {
    font-weight: bold;
  }

  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>