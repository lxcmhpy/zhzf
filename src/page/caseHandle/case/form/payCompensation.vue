<template>
  <div class="box">
    <el-form ref="caseDocForm" :model="formData" :rules="rules" label-width="130px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">收缴赔补偿款</div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="caseNumber"
                  label="案号"
                  :rules="fieldRules('caseNumber',propertyFeatures['caseNumber'])"
                >
                  <el-input
                    ref="caseNumber"
                    clearable
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                    :disabled="fieldDisabled(propertyFeatures['caseNumber'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  prop="caseCauseName"
                  label="案由"
                  :rules="fieldRules('caseCauseName',propertyFeatures['caseCauseName'])"
                >
                  <el-input
                    ref="caseCauseName"
                    clearable
                    class="w-120"
                    v-model="formData.caseCauseName"
                    size="small"
                    :disabled="fieldDisabled(propertyFeatures['caseCauseName'])"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  label="案发日期"
                  prop="afsj"
                  :rules="fieldRules('afsj',propertyFeatures['afsj'])"
                >
                  <el-date-picker
                    :disabled="fieldDisabled(propertyFeatures['afsj'])"
                    style="width: 40%"
                    v-model="formData.afsj"
                    type="date"
                    format="yyyy-MM-dd"
                    placeholder=" -- "
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item
                  label="违法事实"
                  prop="illegalBasis"
                  :rules="fieldRules('illegalBasis',propertyFeatures['illegalBasis'])"
                >
                  <el-input
                    :disabled="fieldDisabled(propertyFeatures['illegalBasis'])"
                    ref="illegalBasis"
                    clearable
                    class="w-120"
                    v-model="formData.caseCauseName"
                    size="small"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <div class="table_form">
            <el-table :data="docTableDatas" stripe border style="width: 100%">
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column prop="name" label="材料名称" align="center"></el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '1' || scope.row.status == '2'">完成</span>
                  <span v-if="scope.row.status == '0'">暂存</span>
                  <span
                    v-if="scope.row.status != '1' && scope.row.status != '0'  && scope.row.status != '2'"
                  >-</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <!-- 已完成 -->
                  <span
                    v-if="scope.row.status == '1' || scope.row.status == '2'"
                    class="tableHandelcase"
                    @click="viewDocPdf(scope.row)"
                  >查看</span>
                  <!-- 未完成 暂存 -->
                  <span v-if="scope.row.status == '0'" class="tableHandelcase">
                    <span @click="viewDoc(scope.row)">编辑</span>
                    <span @click="delDocDataByDocId(scope.row)">清空</span>
                  </span>
                  <!-- 无状态 -->
                  <span
                    v-if="scope.row.status != '1' && scope.row.status != '0' && scope.row.status != '2'"
                    class="tableHandelcase"
                    @click="viewDoc(scope.row)"
                  >添加</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="continueHandle" v-if="!this.$route.params.isComplete">
            <svg
              t="1577515608465"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2285"
              width="24"
              height="24"
            >
              <path
                d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z"
                fill="#FFFFFF"
                p-id="2286"
              />
            </svg>
            <br />提交
          </el-button>

          <el-button type="primary" @click="submitCaseDoc(1)" v-if="!this.$route.params.isComplete">
            <i class="iconfont law-save"></i>
            <br />保存
          </el-button>
          <el-button type="primary" @click="backBtn" v-if="this.$route.params.isComplete">
            <i class="iconfont law-back"></i>
            <br />返回
          </el-button>
        </div>
      </div>
    </el-form>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import {
  submitRelieveApi,
  getDocDataByCaseIdAndDocIdApi
} from "@/api/caseHandle";
export default {
  data() {
    return {
      formData: {
        caseNumber: "",
        party: "",
        partyIdNo: "",
        partyAddress: "",
        partyTel: "",
        payTotal: "",
        partyUnitAddress: "",
        partyUnitTel: "",
        partyManager: "",
        socialCreditCode: "",
        afsj: "",
        caseCauseName: "",
        punishLaw: "",
        detainGoods: "",
        enforceMeasure: "",
        measureStartDate: "",
        measureEndDate: "",
        reconsiderationOrgan: "",
        lawsuitOrgan: "",
        makeDate: "2019",
        illegalBasis: ""
      },
      caseLinkDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "408efab9b0975f9815c71947d45e60f0", //案件ID
        caseLinktypeId: "508555ca2092e1bd252c5f74468adf0a",//this.BASIC_DATA_SYS.takeOverCompensation_caseDoctypeId, //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      saveOrSub: true,
      handleType: 0,
      docTableDatas: [],
      rules: {
        caseNumber: [
          { required: true, message: "案号不能为空", trigger: "blur" }
        ],
        caseCauseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        party: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      },
      originalData: "",
      propertyFeatures: "" //字段属性配置
    };
  },
  computed: {
    ...mapGetters(["caseId"])
  },
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  methods: {
      continueHandle(){},
    //对原始数据做一下处理
    getDataAfter() {
      //this.formData.organName = iLocalStroage.gets("userInfo").organName;
      let params = { id: iLocalStroage.gets("userInfo").organId };
      let _this = this;
      this.$store.dispatch("getOrganDetail", params).then(
        res => {
          let organData = res.data;
          _this.formData.organName = organData.name || "";
          _this.formData.bank =
            organData.bank == null ? "测试银行" : organData.bank;
        },
        err => {
          console.log(err);
        }
      );
      if (this.formData.payTotal) this.combined(this.formData.payTotal);
    },
    //将金额转换为大写(小写)
    combined(val) {
      let buffer = val;
      if (buffer === 0 || buffer == null) {
        this.formData.payTotal = "零" + "（" + val + "）";
      } else {
        let unit = "仟佰拾亿仟佰拾万仟佰拾圆角分";
        let str = "";
        buffer += "00";
        const p = buffer.indexOf(".");
        if (p >= 0) {
          buffer = buffer.substring(0, p) + buffer.substr(p + 1, 2);
        }
        unit = unit.substr(unit.length - buffer.length);
        for (let i = 0; i < buffer.length; i++) {
          str +=
            "零壹贰叁肆伍陆柒捌玖".charAt(buffer.charAt(i)) + unit.charAt(i);
        }
        this.formData.payTotal =
          str
            .replace(/零(仟|佰|拾|角)/g, "零")
            .replace(/(零)+/g, "零")
            .replace(/零(万|亿|圆)/g, "$1")
            .replace(/(亿)万|壹(拾)/g, "$1$2")
            .replace(/^圆零?|零分/g, "")
            .replace(/圆$/g, "圆") +
          "（" +
          val +
          "）";
      }
    },

    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    setData() {
      //this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
      console.log("获取数据", this.formData);
    },
    // 提交表单
    saveData(handleType) {
      //参数  提交类型 、formRef
      this.com_submitCaseForm(handleType, "compensationNoticeForm", true);
    },
    // 多行编辑
    overFlowEdit() {
      this.$refs.overflowInputRef.showModal(0, "", this.maxLengthOverLine);
    },
    // 获取多行编辑内容
    getOverFloeEditInfo(edit) {
      this.formData.illegalFactsEvidence = edit;
    },
    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {
    this.setData();
  }
};
</script>

<style lang="scss" src="@/assets/css/documentForm.scss" scoped>
/* @import "@/assets/css/documentForm.scss"; */
</style>
