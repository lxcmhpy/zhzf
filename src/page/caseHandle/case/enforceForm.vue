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

<style lang="less" scoped>
@import "../../../css/documentForm.less";
</style>
