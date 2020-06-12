<template>
  <el-card class="box-card mark-card">
    <div class="page-content">
      <div class="top-handle">
        <div class="back-btn" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>返回
        </div>
      </div>
      <!-- 列表内容区域 -->
      <div class="content-wrap">
        <div class="search-wrap">
          <div class="mark-total">简答题 001/020</div>
          <div class="mark-number">
            <div>
              <span class="number">001</span>
              <span class="name">驾驶机动车在道路上违反道路交通安全法的行</span>
            </div>
          </div>
        </div>
        <div class="outline-table">
          <div class="examinne-answer">
            <p>考生答案：</p>
            <p
              class="text"
            >冠肺炎疫情发生以来，交通运输行业全力投入疫情防控、应急运输保障和复工复产等各项工作，取得了积极成效，但同时也暴露出在应急运输保障、卫生防疫、复工复产等方面技术储备不足的问题。为加快补齐行业在相关领域的技术短板，推进科技创新体系建设。</p>
            <div class="answer-result">
              <span>应得分：30分</span>
              <el-form class="result-form" :inline="true" label-width="100px">
                <el-form-item label="实得分">
                  <el-input v-model="result"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="question-analysisc">
            <p class="answer">
              正确答案：
              <span>
                为了解决以上痛点，江苏交控、腾讯、高灯科技将围绕综合交通出行数据、物联网应用管理等方面开展战略合作，整合江苏高速、高铁、港口、民航数据及物联网资源，
                推进综合交通运行感知服务体系建设，打造江苏省综合交通大脑。
              </span>
            </p>
            <p>试题解析：《道路交通安全法》第一百条：驾驶拼装的机动车或者已达到报废标准的机动车上道路行驶的，公安机关交通管理部门应当予以收缴，强制报废。</p>
          </div>
        </div>
        <!-- <div class="select-btn">
          <el-button class="question-btn">上一题</el-button>
          <el-button class="question-btn">下一题</el-button>
        </div> -->
      </div>
      <div class="fixed-btn">
        <el-button class="edit_btn" type="primary">
          <i class="iconfont law-save"></i>
          <br />保存
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
// import { setToken } from "@/common/js/auth";

export default {
  data() {
    return {
      result: ""
    };
  },
  computed: {
    examperId(){
      return this.$route.query.examperId;
    },
    scorerInfo(){
      return JSON.parse(sessionStorage.getItem('ScorerUserInfo'));
    }
  },
  created(){
    this.getWaitScoreQuestion();
  },
  methods: {
    // 获取评分试题 examperId参考人ID，scorerId评分人ID
    getWaitScoreQuestion(){
      const loading = this.$loading({
        lock: true,
        text: "正在获取试题信息",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      this.$store.dispatch('getWaitScoreQuestion', { examperId: this.examperId, scorerId: this.scorerInfo.scorerId }).then(res => {
        loading.close();
        if(res.code === 200){
          console.log(res);
        }
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      })
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.mark-card {
  width: 100%;
  height: 100%;
  border: none;
  border-top: 14px solid #4573d0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: #fff;
  >>> .el-card__body {
    position: relative;
    height: calc(100% - 40px);
    .el-table__body-wrapper {
      padding-bottom: 0;
    }
  }
  .page-content {
    height: 100%;
    position: relative;
    .top-handle {
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      .back-btn {
        display: inline-block;
        cursor: pointer;
        color: #7b7b7b;
        .el-icon-arrow-left {
          margin-right: 6px;
        }
        &:hover {
          color: #4573d0;
        }
      }
    }
    .content-wrap {
      margin: 20px 0;
      height: calc(100% - 80px);
      overflow-y: scroll;
      .search-wrap {
        margin-bottom: 10px;
        .mark-total {
          font-size: 18px;
          color: #20232b;
        }
        .mark-number {
          margin: 30px 0;
          .number {
            display: inline-block;
            width: 34px;
            height: 20px;
            margin-right: 10px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            background: rgba(51, 114, 241, 1);
            border-radius: 8px 8px 8px 0px;
            color: #fff;
          }
          .name {
            font-size: 16px;
            font-weight: 600;
            color: rgba(32, 35, 43, 1);
          }
        }
      }
      .outline-table {
        // height: calc(100% - 70px);
        .examinne-answer {
          margin: 0 30px 20px;
          padding-top: 15px;
          border: 1px dashed rgb(151, 151, 151);
          font-size:16px;
          line-height: 22px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(69,115,208,1);
          >p{
            padding: 0 20px;
          }
          .text{
            margin-bottom: 30px;
            height: 140px;
            overflow-y: scroll;
          }
        }
        .answer-result{
          height:46px;
          line-height: 46px;
          color: #fff;
          background:rgba(51,114,241,0.85);
          font-size: 14px;
          text-align: right;
          .result-form{
            display: inline-block;
            >>>.el-form-item{
              margin-bottom: 0;
            }
            >>>.el-form-item__label{
              color: #fff;
              line-height: 46px;
              float: left;
            }
            >>>.el-form-item__content{
              margin-top: 3px;
            }
          }
        }
        .question-analysisc {
          background: #f7f7f7;
          padding: 20px;
          font-size: 14px;
          color: rgba(123, 123, 123, 1);
          line-height: 20px;
          .answer {
            margin-bottom: 10px;
            > span {
              color: #2ac46d;
            }
          }
        }
      }
    }
    .select-btn {
      text-align: center;
      margin-top: 20px;
      .question-btn{
        padding: 12px 48px;
        border:1px solid rgba(151,151,151,1);
        font-size: 16px;
        font-weight: 600;
        color:rgba(123,123,123,1);
      }
    }
  }
  .fixed-btn{
    position: fixed;
    right: 74px;
    bottom: 200px;
    .edit_btn{
      width: 48px;
      height: 48px;
      text-align: center;
      padding: 0;
      .iconfont{
        margin-right: 0;
      }
    }
  }
}
</style>
