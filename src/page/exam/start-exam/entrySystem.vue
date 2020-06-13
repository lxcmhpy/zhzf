<template>
  <div class="entry-exam">
    <div class="page-contain">
      <el-card class="box-card outer-card">
        <el-row>
          <el-col :span="14">
            <div class="system-title">欢迎进入考试系统</div>
            <div class="exam-info">
              <div class="time-info">
                <img src="../../../../static/images/img/exam/clocks.png" alt />
                <span class="time-prompt">距离考试开始</span>
                <span class="count-down">15</span>
                <span class="count-down">34</span>
              </div>
              <div class="exam-name">考试名称：公路交通运输技能考试部职业资格考试</div>
              <div class="exam-prompt">
                <p>考场：考场1</p>
                <p style="margin: 20px 0;">考试时间：2018年12月12日 15:00 至 2018年12月12日 17:00</p>
                <p>备注：</p>
                <p class="f-s-12">1.考生应自觉服从监考员等考试工作人员管理,不准以任何理由妨碍监考员等考试工作人员履行职责...</p>
                <p class="f-s-12">2.考生凭准考证、有效居民身份证按规定时间参加考试。</p>
                <p class="f-s-12">3.严禁考生携带手机等各种通讯工具、手表、电子存储记忆录放。</p>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="entry-login">
              <el-card class="box-card">
                <div class="form-title">请输入监考个人信息:</div>
                <el-form
                  :model="entryForm"
                  :rules="rules"
                  ref="entryForm"
                  label-width="90px"
                  label-position="left"
                  class="entry-form"
                >
                  <el-form-item label="单位" prop="company">
                    <el-input v-model="entryForm.company"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" prop="userName">
                    <el-input v-model="entryForm.userName"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号" prop="idCode">
                    <el-input v-model="entryForm.idCode" maxlength="18"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" prop="telephone">
                    <el-input v-model="entryForm.telephone" maxlength="11"></el-input>
                  </el-form-item>
                  <el-form-item style="text-align: center;">
                    <el-button type="primary" class="submit-entry" @click="submitEntry">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { setToken } from "@/common/js/auth";

export default {
  data() {
    return {
      entryForm: {
        company: "",
        userName: "",
        idCode: "",
        telephone: "",
        invigilatorId: this.$route.query.id,
        loginName: this.$route.query.name
      },
      rules: {
        company: [{ required: true, message: "请输入单位", trigger: "blur" }],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCode: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    invigilatorInfo() {
      return JSON.parse(sessionStorage.setItem("ExamUserInfo"));
    }
  },
  methods: {
    // 提交
    submitEntry() {
      this.$refs.entryForm.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在提交",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          // 提交操作
          this.$store.dispatch("invigilatorSubmitInfo", this.entryForm).then(
            res => {
              // setToken(res.data);
              setToken("TokenKey", res.data, 110);
              this.$router.push({
                path: "/invigilator",
                query: {
                  name: this.entryForm.loginName,
                  id: this.entryForm.invigilatorId
                }
              });
            },
            err => {
              console.log(err);
            }
          );
          loading.close();
        } else {
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.entry-exam {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../../../static/images/img/exam/page_top.png") no-repeat;
  background-size: 32%;
  overflow: scroll;
}
.page-contain {
  margin: 56px auto 96px;
  max-width: 1440px;
  min-width: 1280px;
  background-color: #fff;
  position: relative;
  .outer-card {
    border: none;
    background-color: #fff;
    background: url("../../../../static/images/img/exam/card_top.png") no-repeat;
    background-size: 25%;
    min-height: 620px;
  }
  .system-title {
    font-size: 34px;
    color: rgba(32, 35, 42, 1);
    line-height: 50px;
    margin-left: 124px;
  }
  .exam-info {
    position: absolute;
    background: url("../../../../static/images/img/exam/card_left.png")
      no-repeat;
    background-size: 94% 100%;
    padding-left: 80px;
    overflow: hidden;
    left: 0;
    top: 90px;
    bottom: 0;
    width: 50%;
    min-height: 494px;
    .time-info {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
      .time-prompt {
        font-size: 18px;
        color: #fff;
        margin: 0 20px;
      }
      .count-down {
        display: inline-block;
        width: 36px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background: rgba(247, 158, 15, 1);
        box-shadow: 0px 1px 3px 0px rgba(101, 70, 20, 0.2);
        border-radius: 2px;
        margin-right: 8px;
      }
    }
    .exam-name {
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
      margin: 0 10% 20px;
    }
    .exam-prompt {
      margin: 0 12%;
      color: #fff;
      line-height: 20px;
      .f-s-12 {
        font-size: 12px;
      }
    }
  }
  .entry-login {
    margin: 80px 15%;
    position: relative;
    .form-title {
      font-size: 18px;
      color: rgba(32, 35, 42, 1);
      margin-bottom: 20px;
    }
    >>> .el-form-item__label {
      position: absolute;
      left: 20px;
      z-index: 100;
    }
    >>> .el-form-item__content {
      margin-left: 0 !important;
    }
    >>> .el-input__inner {
      padding-left: 90px;
      border-top: none;
      border-left: none;
      border-right: none;
    }
    .submit-entry {
      margin-top: 20px;
      padding: 12px 40px;
    }
  }
}
</style>
