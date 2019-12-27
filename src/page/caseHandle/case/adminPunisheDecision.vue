<template>
  <div class="box">
    <div class="header">
      <div class="header_left">
        <div class="triangle"></div>
        <div class="header_left_text">返回</div>
      </div>
    </div>
    <div class="content_box">
      <div class="content">
        <div class="content_title">行政处罚决定书</div>
        <el-form ref="fieldRecordObj" :model="fieldRecordObj" :rules="rules" label-width="135px">
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="案号：">
                  <el-input
                    ref="CONTACTOR"
                    clearable
                    class="w-120"
                    v-model="fieldRecordObj.CONTACTOR"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="rows">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="当事人姓名：">
                  <el-input ref="CONTACTOR" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="身份证号码：">
                  <el-input ref="CONTACTOR" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="住址：">
                  <el-input ref="CONTACTOR" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="联系电话">
                  <el-input ref="CONTACTOR" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="rows">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="企业名称：">
                  <el-input
                    ref="CONTACTOR"
                    clearable
                    v-model="fieldRecordObj.CONTACTOR"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="地址：">
                  <el-input ref="CONTACTOR" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="法定代表人：">
                  <el-input
                    ref="CONTACTOR"
                    clearable
                    v-model="fieldRecordObj.CONTACTOR"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="联系电话：">
                  <el-input ref="CONTACTOR" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="统一社会信用代码：">
                  <el-input
                    ref="CONTACTOR"
                    clearable
                    v-model="fieldRecordObj.CONTACTOR"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <el-form-item label="违法事实及依据：">
              <el-input
                type="textarea"
                class="height106"
                v-model="fieldRecordObj.test"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="违法条款：">
              <el-input
                type="textarea"
                v-model="fieldRecordObj.test"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="处罚依据：">
              <el-input
                type="textarea"
                v-model="fieldRecordObj.test"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="处罚金额：">
              <el-input
                type="textarea"
                v-model="fieldRecordObj.test"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="处罚决定：">
              <el-input
                type="textarea"
                v-model="fieldRecordObj.test"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="其他执行方式：">
              <el-input
                type="textarea"
                v-model="fieldRecordObj.test"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="border_blue"></div>
          <div class="content-form">
            <div class="rows">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="缴费银行：">
                  <el-input
                    ref="CONTACTOR"
                    clearable
                    v-model="fieldRecordObj.CONTACTOR"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label>
                  <el-input ref="CONTACTOR" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content-form">
            <div class="row">
              <el-form-item label="行政复议机构：">
                <el-checkbox></el-checkbox>复议机构名称1
                <el-input style="width:200px;" placeholder="复议机构名称1"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label>
                <!-- &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195; -->
                <el-checkbox></el-checkbox>复议机构名称2
                <el-input style="width:200px;" placeholder="复议机构名称2"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label>
                <!-- &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195; -->
                <el-checkbox></el-checkbox>复议机构名称3
                <el-input style="width:200px;" placeholder="复议机构名称3"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="行政诉讼机构：">
                <el-checkbox></el-checkbox>行政诉讼机构1
                <el-input style="width:200px;" placeholder="行政诉讼机构1："></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label>
                <!-- &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195; -->
                <el-checkbox></el-checkbox>行政诉讼机构2
                <el-input style="width:200px;" placeholder="行政诉讼机构2："></el-input>
              </el-form-item>
            </div>
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
        CONTACTOR: ""
      },
      rules: {
        CONTACTOR: [
          { required: true, message: "经办人姓名必须填写", trigger: "blur" }
        ]
      },
      personnelList: [1, 2, 3]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../../../css/documentForm.less";
@import "../../../css/caseHandle/caseDocument.less";
</style>
