<template>
  <div class="main overload-document-doc">
    <div class="print_box">
      <div id="delivery-print" class="print_info" style="height: auto">
        <div class="doc_topic">青海省{{ docData.orgName }}超限监测站</div>
        <div class="doc_topic">治理车辆超限超载路警联合执法处理文书</div>
        <div class="doc_number">
          青{{ docData.orgName }}超[{{ new Date().getFullYear() }}]第{{
            docData.orderNum
          }}号
        </div>
        <el-form
          :rules="rules"
          ref="docForm"
          :inline-message="true"
          :inline="true"
          :model="docData"
        >
          <table
            class="print_table"
            border="1"
            bordercolor="black"
            width="100%"
            cellspacing="0"
          >
            <tr>
              <td>
                <p>归档部门</p>
                <p>名称</p>
              </td>

              <td colspan="7" class="color_DBE4EF">
                <el-form-item
                  prop="filingDepartment"
                  :rules="
                    fieldRules(
                      'filingDepartment',
                      propertyFeatures['filingDepartment']
                    )
                  "
                >
                  <el-input
                    type="textarea"
                    v-model="docData.filingDepartment"
                    v-bind:class="{
                      over_flow:
                        docData.filingDepartment.length > 14 ? true : false
                    }"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="
                      fieldDisabled(propertyFeatures['filingDepartment'])
                    "
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>事由</td>
              <td colspan="7" class="color_DBE4EF">
                <el-form-item
                  prop="reason"
                  :rules="fieldRules('reason', propertyFeatures['reason'])"
                >
                  <el-input
                    type="textarea"
                    v-model="docData.reason"
                    v-bind:class="{
                      over_flow: docData.reason.length > 14 ? true : false
                    }"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['reason'])"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <p>被处理人</p>
                <p>&emsp;&emsp;&emsp;&emsp;&emsp;</p>
                <p>(单位)</p>
              </td>
              <td colspan="7" class="color_DBE4EF">
                <el-form-item prop="handledCompany">
                  <el-input
                    type="textarea"
                    v-model="docData.handledCompany"
                    v-bind:class="{
                      over_flow:
                        docData.handledCompany.length > 14 ? true : false
                    }"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="
                      fieldDisabled(propertyFeatures['handledCompany'])
                    "
                  ></el-input
                ></el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <p>检测</p>
                <p>日期</p>
              </td>
              <td colspan="2" class="color_DBE4EF">
                <p>
                  <el-form-item prop="testDate" class="pdf_datapick">
                    <el-date-picker
                      v-model="docData.testDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      placeholder="    年  月  日"
                      value-format="yyyy-MM-dd"
                      @blur="checkDateFn"
                    ></el-date-picker>
                  </el-form-item>
                </p>
              </td>
              <td>
                <p>处理</p>
                <p>日期</p>
              </td>
              <td colspan="8" class="color_DBE4EF">
                <p>
                  <el-form-item prop="handleDate" class="pdf_datapick">
                    <el-date-picker
                      v-model="docData.handleDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      placeholder="    年  月  日"
                      value-format="yyyy-MM-dd"
                      @blur="checkDateFn"
                    ></el-date-picker>
                  </el-form-item>
                </p>
              </td>
            </tr>
            <tr>
              <td>货物名称</td>
              <td>
                <el-form-item prop="goodsName">
                  <el-input
                    type="textarea"
                    v-model="docData.goodsName"
                    v-bind:class="{
                      over_flow: docData.goodsName.length > 14 ? true : false
                    }"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    :maxlength="nameLength"
                    error
                    placeholder="\"
                    :disabled="fieldDisabled(propertyFeatures['goodsName'])"
                  ></el-input
                ></el-form-item>
              </td>
              <td>货物总重</td>
              <td colspan="7">
                <tr>
                  <td>初检</td>
                  <td colspan="3">
                    <el-form-item prop="firstCheckWeight">
                      <el-input
                        v-model="docData.firstCheckWeight"
                        v-bind:class="{
                          over_flow:
                            docData.firstCheckWeight.length > 14 ? true : false
                        }"
                        :maxlength="nameLength"
                        error
                        placeholder="\"
                        :disabled="
                          fieldDisabled(propertyFeatures['firstCheckWeight'])
                        "
                      ></el-input
                    ></el-form-item>
                  </td>
                </tr>
                <tr>
                  <td>复检</td>
                  <td>
                    <el-form-item prop="secondCheckWeight">
                      <el-input
                        v-model="docData.secondCheckWeight"
                        v-bind:class="{
                          over_flow:
                            docData.secondCheckWeight.length > 14 ? true : false
                        }"
                        :maxlength="nameLength"
                        error
                        placeholder="\"
                        :disabled="
                          fieldDisabled(propertyFeatures['secondCheckWeight'])
                        "
                      ></el-input
                    ></el-form-item>
                  </td>
                </tr>
              </td>
            </tr>
            <tr>
              <td>
                <p>执法部门</p>
              </td>
              <td colspan="2">
                青海省{{ docData.orgName }}公路超限监测站<br />
                青海省{{ docData.orgName }}公安交警大队
              </td>
              <td>承办人</td>
              <td>
                <tr>
                  <td>
                    <el-form-item prop="underTakerOne">
                      <el-input
                        v-model="docData.underTakerOne"
                        v-bind:class="{
                          over_flow:
                            docData.underTakerOne.length > 14 ? true : false
                        }"
                        :maxlength="nameLength"
                        error
                        placeholder="\"
                        :disabled="
                          fieldDisabled(propertyFeatures['underTakerOne'])
                        "
                      ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item prop="underTakerTwo">
                      <el-input
                        v-model="docData.underTakerTwo"
                        v-bind:class="{
                          over_flow:
                            docData.underTakerTwo.length > 14 ? true : false
                        }"
                        :maxlength="nameLength"
                        error
                        placeholder="\"
                        :disabled="
                          fieldDisabled(propertyFeatures['underTakerTwo'])
                        "
                      ></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </td>
            </tr>
            <tr>
              <td>
                <p>处理结果</p>
              </td>
              <td colspan="8" class="color_DBE4EF">
                <el-form-item prop="handleResult">
                  <el-input
                    type="textarea"
                    v-model="docData.handleResult"
                    :autosize="{ minRows: 1, maxRows: 2 }"
                    maxlength="30"
                    placeholder="\"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <!-- <div class="footer-text">
          本卷共{{ docData.pieceNumber }}件{{ docData.pageNumber }}页
        </div> -->
      </div>

      <floatBtns
        :formOrDocData="formOrDocData"
        @submitData="submitData"
        @saveData="saveData"
      ></floatBtns>
    </div>

    <!-- 右侧菜单 -->
    <rightMenu></rightMenu>
  </div>
</template>
<script>
// import overflowInput from "../pdf/overflowInput";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import floatBtns from "../compoment/floatBtns.vue";

import rightMenu from "../compoment/rightMenu/index.vue";

import { findCaseAllBindPropertyApi } from "@/api/caseHandle";
import {
  findCarInfoByIdApi,
  getDocListByIdApi,
  createNewPdf
} from "@/api/inspection";

export default {
  mixins: [mixinGetCaseApiList],
  inject: ["reload"],
  computed: {
    ...mapGetters(["inspectionOverWeightId", "penaltyDecisionId"])
  },
  components: {
    floatBtns,
    rightMenu
  },
  data() {
    // var validateArr = (rule, value, callback) => {
    //   if (this.docData.correctWay[0] == "2" && !value) {
    //     return callback(new Error("责令改正日期不能为空"));
    //   }
    //   callback();
    // };
    // var validateAcceptElDel = (rule, value, callback) => {
    //   if (this.docData.isAcceptElDel[0] == "是" && value.resLength == 0) {
    //     return callback(new Error("电子送达方式不能为空"));
    //   }
    //   callback();
    // };
    return {
      docId: "",
      oldData: {},
      saveType: "",
      docData: {
        orgName: "", //归档部门名称（机构名）
        orgWord: "机构", //机构字
        orderNum: "001", //顺序号
        reason: "", //事由
        handledCompany: "", //被处理人(单位)
        testDate: "", //检测日期
        handleDate: "", //检测日期
        goodsName: "", //货物名称
        firstCheckWeight: "", //初检重量
        secondCheckWeight: "", //复检重量
        lawEnforcement: "", //执法部门
        underTakerOne: "", //承办人1
        underTakerTwo: "", //承办人2
        handleResult: "", //处理结果

        // stationName: "某某",
        // pieceNumber: "1", //条数
        // pageNumber: "1", //页数
        filingDepartment: "" //归档部门
      },
      rules: {
        filingDepartment: [
          { required: true, message: "归档部门不能为空", trigger: "blur" }
        ],
        reason: [{ required: true, message: "是由不能为空", trigger: "blur" }],
        handledCompany: [
          {
            required: true,
            message: "被处理人(单位)不能为空",
            trigger: "blur"
          }
        ],
        goodsName: [
          { required: true, message: "货物名称不能为空", trigger: "blur" }
        ],
        firstCheckWeight: [
          { required: true, message: "初检重量不能为空", trigger: "blur" }
        ],
        secondCheckWeight: [
          { required: true, message: "复检重量不能为空", trigger: "blur" }
        ],
        underTakerOne: [
          { required: true, message: "承办人不能为空", trigger: "blur" }
        ],
        underTakerTwo: [
          { required: true, message: "第二个承办人不能为空", trigger: "blur" }
        ],
        handleResult: [
          { required: true, message: "处理结果不能为空", trigger: "blur" }
        ]
      },

      nameLength: 23,
      adressLength: 23,
      maxLength: 23,
      formOrDocData: {
        showBtn: [
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: "delivery-print"
      },
      propertyFeatures: "" //字段属性配置
    };
  },
  methods: {
    // 检查时间先后
    checkDateFn() {
      if (
        Date.parse(this.docData.testDate) > Date.parse(this.docData.handleDate)
      ) {
        this.$message({
          message: "检测时间不得小于处理时间",
          type: "warning"
        });
        this.docData.testDate = "";
        this.docData.handleDate = "";
      }
    },

    //带入数据
    initDocData() {
      let dd = this.docData;
      let od = this.oldData;

      dd.orgName = JSON.parse(localStorage.getItem("userInfo")).organName;
      dd.filingDepartment = dd.orgName;
      dd.handledCompany = dd.orgName + "(" + od.vehicleShipId + ")";
      dd.goodsName = od.loadGoods;
      dd.firstCheckWeight = od.firstCheck.totalWeight;
      dd.secondCheckWeight = od.secondCheck.secondCheckWeight;

      let personArr = od.firstCheck.checkPerson.split(",");
      dd.underTakerOne = personArr[0];
      dd.underTakerTwo = personArr[1];

      dd.lawEnforcement = dd.orgName;
    },

    //根据ID获取数据,构建formParams
    getDocDataByCaseIdAndDocId() {
      findCarInfoByIdApi(this.inspectionOverWeightId).then(res => {
        this.oldData = res.data;
        this.initDocData();
      });
    },

    //保存接口
    saveDoc() {
      let params = {
        id: this.docId,
        docContent: JSON.stringify(this.docData),
        docName: "卷宗封面【青海检查】",
        orderId: this.inspectionOverWeightId,
        sort: 0,
        status: this.saveType == 0 ? "暂存" : "保存"
      };
      console.log(" -> this.docData", this.docData);
      debugger;
      createNewPdf(params).then(res => {
        console.log(" -> res", res);
        this.$message({
          type: "success",
          message: res.msg
        });
        if (res.data.storageId) {
          this.$router.push({
            name: "inspection_overload_pdf",
            params: {
              id: this.inspectionOverWeightId,
              storageId: res.data.storageId
            }
          });
        }
      });
    },

    //保存文书信息
    saveData(handleType) {
      console.log(" -> handleType", handleType);
      this.saveType = handleType;
      this.saveDoc();
      // this.printContent()
      // this.com_addDocData(handleType, "docForm");
    },
    submitData(handleType) {
      console.log("submitData -> handleType", handleType);
      this.saveType = handleType;
      this.saveDoc();
      // this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      // this.$router.push({
      //   name: this.$route.params.url,
      // });
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == "1") {
        this.formOrDocData.showBtn = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          true
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },

    showBack(obj) {
      console.log(
        "🚀 ~ file: overloadDocumentDoc.vue ~ line 516 ~ showBack ~ obj",
        obj
      );
      this.docData = obj;
    },

    getDocListByIdFn() {
      getDocListByIdApi(this.inspectionOverWeightId, true).then(res => {
        if (res.data.length) {
          res.data.forEach(item => {
            if (item.docName === "卷宗封面") {
              this.docId = item.id;
              if (item.docContent && item.docContent.length) {
                this.showBack(JSON.parse(item.docContent));
              } else {
                this.getDocDataByCaseIdAndDocId();
              }
            }
          });
        }
      });
    }
  },
  created() {
    this.getDocListByIdFn();
    // this.getDocDataByCaseIdAndDocId();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
.overload-document-doc {
  .footer-text {
    margin-top: 30px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .espacle {
    textarea {
      min-height: 114px !important;
      line-height: 25px !important;
      // margin-top:-4px !important;
      text-indent: 0px !important;
    }
  }
  #checkStyle {
    .el-checkbox {
      margin-right: 0px;
    }
  }
  #delivery-print {
    height: 1220px;
    .overflow_lins_style .span_bg {
      display: block;
    }
    .overflow_lins_style .overflow_lins .overflow_lins_textarea {
      width: calc(100% - 10px);
      top: 0;
    }
    .illegalFactsTip {
      text-align-last: auto;
    }
    #scenetimeBox .is-required .el-input__inner::-webkit-input-placeholder {
      color: #000;
    }
    .overflow_lins_style .overflow_lins span.overflow_lins_textarea {
      white-space: normal;
      line-height: 23px;
      text-indent: 0;
    }
    .dataTimeReplaceBox {
      position: relative;
      height: 35px;
      .el-form-item__content .el-date-editor--datetime {
        opacity: 0;
        position: absolute;
        z-index: 2;
      }
      .replaceTime {
        position: absolute;
        top: 0;
        left: 10px;
      }
    }
    #noteDesCon {
      .overflow_lins_textarea {
        padding-top: 4px;
        textarea {
          line-height: 24px !important;
        }
      }
      span.overflow_lins_textarea {
        line-height: 24px;
      }
      .span_bg {
        box-sizing: border-box;
        margin: 4px 0;
        height: 20px;
      }
    }
  }
}
</style>
