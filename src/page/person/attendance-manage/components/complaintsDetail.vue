<template>
  <!-- 投诉举报详情 -->
  <div class="com_searchAndpageBoxPadding" style="background:#ffffff;">
    <div class="complaint-detail-wrap">
      <!-- 被投诉人信息 -->
      <div class="complaint-person-info">
        <p class="complaint-info-title">被投诉人基本信息</p>
        <el-form label-width="140px" label-position="right">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="被投诉人姓名:">张三</el-form-item>
              <el-form-item label="身份证号:">640321199008101710</el-form-item>
              <el-form-item label="执法证号:">987654321</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="人员照片:" class="complaint-person-avatar">
                <el-image :src="personImg"></el-image>
                <!-- <el-image :src="lesson.path">
                  <el-image slot="error" :src="lessonDefaultPic"></el-image>
                </el-image>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 投诉信息 -->
      <div class="complaint-list-info">
        <div class="complaint-header-handle">
          <p class="complaint-info-title">投诉信息</p>
          <div class="complaint-btn-wrap">
            <el-button
              type="primary"
              icon="el-icon-plus"
              class="add-complaint-btn"
              @click="addComplaints"
            >新增投诉</el-button>
          </div>
        </div>
        <p v-if="false" class="no-complaint-prompt">暂无数据</p>
        <div class="complaint-list-item">
          <el-form label-width="140px" label-position="right">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="投诉人姓名:">张三</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投诉途径:">匿名邮箱投诉</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投诉人联系方式:">15209681522</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投诉来源:">社会</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投诉时间:">2020年08月10日</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="投诉事项:"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="处理结果:">处理的很好</el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="edit-complaints-wrap">
            <div class="edit-btn" @click="addComplaints">
              <span class="btn">修改</span>
              <i class="split"></i>
            </div>
            <div class="edit-btn" @click="deleteComplaints">
              <span class="btn">删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增投诉信息 -->
    <AddComplaintsInfo ref="AddComplaintsInfoRef" />
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage.js";
import AddComplaintsInfo from "@/page/person/attendance-manage/components/addComplaintsInfo";

export default {
  props: {},
  data() {
    return {
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
    };
  },
  computed: {
    baseUrl() {
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    },
  },
  watch: {},
  components: { AddComplaintsInfo },
  created() {},
  mounted() {},
  methods: {
    // 新增投诉
    addComplaints() {
      this.$refs.AddComplaintsInfoRef.showModal();
    },
    // 删除投诉
    deleteComplaints() {
      this.$confirm("确认删除这条投诉吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm",
      })
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.complaint-detail-wrap {
  position: relative;
  padding: 30px 15%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .complaint-person-info,
  .complaint-list-info {
    padding: 0 30px;
    margin-top: 30px;
    border-bottom: 1px solid #eaedf1;
    .complaint-person-avatar {
      >>> .el-form-item__label {
        margin-right: 20px;
        line-height: 190px;
      }
      >>> .el-image {
        width: 136px;
        height: 190px;
      }
    }
  }
  .complaint-info-title {
    padding-left: 8px;
    border-left: 4px solid #4573d0;
    font-size: 20px;
    color: #20232b;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .complaint-list-info {
    .complaint-header-handle {
      margin-bottom: 20px;
      .complaint-info-title {
        display: inline-block;
      }
      .complaint-btn-wrap {
        display: inline-block;
        float: right;
        margin-right: 5%;
        margin-bottom: 0;
      }
    }
    .no-complaint-prompt {
      line-height: 80px;
      text-align: center;
    }
    .complaint-list-item {
      padding-bottom: 30px;
      border-bottom: 1px solid #eaedf1;
      position: relative;
      &:hover {
        .edit-complaints-wrap {
          display: block;
        }
      }
      .edit-complaints-wrap {
        display: none;
        height: 38px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(74, 175, 167, 0.85);
        .edit-btn {
          display: inline-block;
          width: 48%;
          text-align: center;
          line-height: 38px;
          color: #fff;
          .btn {
            display: inline-block;
            padding: 0px 30%;
            cursor: pointer;
            &:hover {
              color: #000;
            }
          }
          .split {
            display: inline-block;
            width: 1px;
            height: 18px;
            background: #fff;
            float: right;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
