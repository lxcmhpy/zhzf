<template>
  <div class="box">
    <el-form ref="caseLinkDataForm">
      <el-input ref="id" type="hidden"></el-input>
    </el-form>
    <el-form ref="partyRightsForm" :model="formData" label-width="105px">

      <!-- <div class="header-case">
        <div class="header_left">
          <div class="triangle"></div>
          <div class="header_left_text">
            返回
          </div>
        </div>
      </div> -->
      <div class="content_box">
        <div class="content">
          <div class="content_title">
            当事人权利
          </div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号">
                  <el-input ref="caseNumber" :disabled="true" clearable class="w-120" v-model="formData.caseNumber" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="案由">
                  <el-input ref="caseName" :disabled="true" clearable class="w-120" v-model="formData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseCauseNameCopy" label="违法事实">
                  <el-input type="textarea" ref="caseCauseNameCopy" clearable class="height106" v-model="formData.caseCauseNameCopy" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法条款">
                  <el-input ref="illegalLaw" clearable class="w-120" v-model="formData.illegalLaw" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚条款">
                  <el-input ref="punishLaw" clearable class="w-120" v-model="formData.punishLaw" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="tempPunishAmount" label="拟处罚决定" class="line-height13">
                  <el-input ref="tempPunishAmount" :disabled="true" clearable class="w-120" v-model="formData.tempPunishAmount" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item label="执行方式">
                  <el-row>
                    <el-col :span="4">
                      <el-checkbox label="是否重大案件" v-model="formData.isImportant"></el-checkbox>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
              <div class="col">
                <el-col :span="20">
                  <div align="right">
                    <el-button type="primary" size="small">上传记录</el-button>
                    <el-button type="success" size="small">线上记录</el-button>
                  </div>
                </el-col>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                执法文书
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%" height="100%">
              <el-table-column type="index" label="序号" align="center" width="100px">
              </el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1'">
                    已完成
                  </span>
                  <span v-if="scope.row.status == '0'">
                    暂存
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1'">
                    <!-- 已完成 -->
                    <i type="primary" class="el-icon-view cell-icon" @click="viewDoc(scope.row)"></i>
                    <i type="primary" class="el-icon-printer cell-icon"></i>
                  </span>
                  <span v-if="scope.row.status == '0'">
                    <!-- 暂存 -->
                    <i type="primary" class="el-icon-edit cell-icon" @click="viewDoc(scope.row)"></i>
                    <i type="primary" class="el-icon-delete-solid cell-icon"></i>
                  </span>
                  <span v-if="scope.row.status === ''">
                    <!-- 暂存 -->
                    <i type="primary" class="el-icon-add cell-icon"></i>
                    <i type="primary" class="el-icon-printer cell-icon"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                当事人提交的证据材料
              </div>
            </el-col>
            <el-col :span="8">
              <div class="second_title_btns">
                <el-button type="primary" size="small">上传附件</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="evidenceTableDatas" stripe border style="width: 100%" height="100%">
              <el-table-column prop="index" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="name" label="证据名称" align="center">
              </el-table-column>
              <el-table-column prop="status" label="时间" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <i type="primary" class="el-icon-view cell-icon" @click="evidenceOption(scope)"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- 悬浮按钮 -->
        <div class="float-btns ">

          <el-button type="primary" @click="continueHandle">
            <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
              <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
            </svg><br>
            下一<br>环节</el-button>
          <el-button type="primary" @click="submitCaseDoc(1)">
            <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
              <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
            </svg><br>
            提交</el-button>
          <el-button type="success" @click="submitCaseDoc(0)">
            <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
              <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF"></path>
              <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF"></path>
            </svg>
            <br>
            暂存
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";

export default {
  data() {
    return {
      formData: {
        checkList: "",
        isImportant: ""
      },
      //提交方式
      handleType: 0, //0  暂存     1 提交
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: this.$route.params.id, //案件id
        caseLinktypeId: "2c9029ac6c26fd72016c27247b290003", //表单类型IDer
        //表单数据
        formData: "",
        status: ""
      },
      docTableDatas: [
        // {
        //   index: '1',
        //   name: '听证通知书',
        //   status: '-',
        //   option: '1',
        //   url: 'hearingNoticePdf',
        // }, {
        //   index: '2',
        //   name: '听证笔录',
        //   status: '完成',
        //   option: '2',
        //   url: 'hearingRecordePdf',

        // }, {
        //   index: '3',
        //   name: '陈述申辩书',
        //   status: '未完成',
        //   option: '3',
        // }
      ],
      evidenceTableDatas: [],
      rules: {
        // caseNumber: [
        //   { required: true, message: '案号必须填写', trigger: 'blur' }
        // ],
        // caseName: [
        //   { required: true, message: '案由必须填写', trigger: 'blur' }
        // ],
      },
    }
  },
  mixins: [mixinGetCaseApiList],
  methods: {
    //加载表单信息
    setFormData() {
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId, this.caseLinkDataForm.caseLinktypeId, 'form');
    },
    submitCaseDoc(handleType) {
      //参数  提交类型 、formRef、有无下一环节按钮、下一环节有多个时有弹窗
      this.com_submitCaseForm(handleType, 'caseLinkDataForm', true, '');
    },
    //下一环节
    continueHandle() {
      this.com_goToNextLinkTu(this.caseLinkDataForm.caseLinktypeId);
    },
    // 证据材料- 操作
    evidenceOption(data) {

    },
    //查看文书
    viewDoc(row) {
      this.$router.push({
        name: row.url,
        params: {
          id: row.id,
        }
      });
    },
    //通过案件id和表单类型Id查询已绑定文书
    getDocListByCaseIdAndFormId() {
      let data = {
        // caseBasicinfoId: this.$route.params.id,
        casebasicInfoId: "aa0f2161e5c1ae0d2619203eb63eb78d",
        linkTypeId: "2c9029ac6c26fd72016c27247b290003"
      };
      this.$store.dispatch("getDocListByCaseIdAndFormId", data).then(
        res => {
          this.docTableDatas = res.data;
          console.log('文书列表', this.docTableDatas)
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    // this.setFormData();
  },
  created() {
    this.setFormData();
    //通过案件id和表单类型Id查询已绑定文书
    this.getDocListByCaseIdAndFormId();
  }
}
</script>

<style lang="less" scoped>
@import "../../../../css/documentForm.less";
</style>
