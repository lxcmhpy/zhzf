<template>
  <div class="box">
    <div class="header">
      <div class="header_left">
        <div class="triangle"></div>
        <div class="header_left_text">
          返回
        </div>
      </div>
    </div>
    <div class="content_box">
      <div class="content">
        <div class="content_title">
          中止（终结、恢复）行政强制执行通知书
        </div>
        <div class="border_blue"></div>
        <el-form ref="fieldRecordObj" :model="fieldRecordObj" :rules="rules" label-width="135px">
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="案号：">
                  <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="当事人：">
                  <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入个人姓名或单位名称"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="案件名称：">
                  <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.type" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="案由：">
                  <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.type" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <!-- 个人 -->
            <div v-if="fieldRecordObj.type=='个人'">
              <div class="row">
                <div class="col">
                  <el-form-item label="姓名：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="性别：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="年龄：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="所在单位：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="联系地址：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="联系电话：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="邮编：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- 企业 -->
            <div v-if="fieldRecordObj.type=='企业'">
              <div class="row">
                <div class="col">
                  <el-form-item label="单位：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="地址：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="法定代表人：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="职务：">
                    <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>

          </div>

          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <el-form-item label="处理结果：">
              <el-input type="textarea" class="height106" v-model="fieldRecordObj.test" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="执行情况：">
              <el-input type="textarea" class="height122" v-model="fieldRecordObj.test" size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <el-form-item label="处理结果：">
              <el-input type="textarea" class="height106" v-model="fieldRecordObj.test" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="执行情况：">
              <el-input type="textarea" class="height122" v-model="fieldRecordObj.test" size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <!-- 悬浮按钮 -->
      <div class="float-btns">
        <el-button type="primary">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
          </svg><br>
          提交</el-button>
        <el-button type="success">
          <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
            <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF"></path>
            <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF"></path>
          </svg>
          <br>
          暂存
        </el-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      fieldRecordObj: {
        CONTACTOR: '',
        test: "123",
        type: '个人',
      },
      rules: {
        CONTACTOR: [
          { required: true, message: '经办人姓名必须填写', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
