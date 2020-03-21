<template>
  <div class="add_dialog dentail_box">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="top">
        <div class="add_dialog_content">
          <div class="border_blue"></div>

          <div class="content_bg">
            <el-form-item label="案号" prop="name">
            </el-form-item>
            <el-form-item label="案由" prop="name">
            </el-form-item>
          </div>
        </div>

      </div>
      <div class="btm">
        <div class="add_dialog_content">
          <div class='record_text'>流转记录</div>
          <div class="block">
            <el-timeline class="times_content">
              <el-timeline-item timestamp="2018/4/12" placement="top" icon="el-icon-time">
                <div class="times_info">
                  <div style="margin-bottom:22px">
                    <span class="tans_box">
                      <i class="el-icon-user-solid"></i>
                      广东省湛江市执法大队 - 李戚薇
                    </span>
                    <span></span>
                    <span class="tans_box">
                      <i class="el-icon-user-solid"></i>
                      广东省湛江市执法大队 - 李戚薇
                    </span>
                  </div>
                  <div>
                    <span class="times_text">备注:</span>
                    <span class="color_7B7B7B">湖是位于南澳洲芒特甘比尔一座死火山低平火山口的一个火山湖。</span>
                  </div>
                  <div>
                    <span class="times_text">附件（3）</span>
                  </div>
                  <div class="document_list">
                    <ul>
                      <li>
                        <i class="el-icon-document-checked"></i>
                        文件名称
                      </li>
                      <li>
                        <i class="el-icon-document-checked"></i>
                        文件名称
                      </li>
                      <li>
                        <i class="el-icon-document-checked"></i>
                        文件名称
                      </li>
                    </ul>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </el-form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: ''
      },
    }
  },
  methods: {

  },
  mounted() {
    console.log(this.$route.params)
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
<style scoped>
.times_content /deep/ .el-timeline-item__node--normal {
  left: -8px;
  width: 25px;
  height: 25px;
}
.times_content /deep/ .el-timeline-item__icon {
  color: #fff;
  font-size: 31px;
  font-weight: 400;
}
.times_content /deep/ .el-timeline-item__node {
  background-color: #4573d0;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>