<template>
  <div class="print_box" id="audioEvidenceRecord_print">
    <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
      <div style="position:relation" v-for="(item,index) in docData.evidenceData" :key="index">
        <div class="print_info">
          <el-button
            class="deletePageBtn"
            type="primary"
            v-show="index!=0"
            @click="deletePage(index)"
          >删除本页</el-button>
          <div class="doc_topic">视听资料（电子数据）证据记录单</div>
          <div class="doc_number"></div>
          <el-row :gutter="19" class="nianBox" width="90%">
            <div class="imgBox" ref="imgBoxRef2">
              <img :src="item.pic1" alt width="100%" :height="imgHeightArr[index][0]" />
              <div class="imgBoxBtn" style="">
                <el-button size="mini" @click="chooseImg(index,1,item.picSrc1)">选择照片</el-button>
                <el-button size="mini" @click="deleteImg(index,1)">删除</el-button>
              </div>
            </div>
          </el-row>
          <table class="print_table" border="1" bordercolor="black" width="100%">
            <tr>
              <td rowspan="2" colspan="2">
                <p class="p_begin">
                  证明事项：
                  <span>
                    <el-form-item
                      :prop="'evidenceData.' + index + '.certification'"
                      style="width:75%"
                    >
                      <el-input
                        type="textarea"
                        v-model="item.certification"
                        :autosize="{ minRows: 1, maxRows: 3}"
                        maxlength="50"
                      ></el-input>
                    </el-form-item>
                  </span>
                </p>
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td align="left" width="60%">
                <p class="p_begin">
                  采集时间：
                  <span>
                    <el-form-item>
                      <el-date-picker
                        v-model="item.pTime"
                        style="width:240px"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="   年  月  日  时 分 秒"
                      ></el-date-picker>
                    </el-form-item>
                  </span>
                </p>
              </td>
              <td align="left">
                <p class="p_begin">
                  采集人：
                  <span>
                    <el-form-item style="width:180px">
                      <el-select v-model="item.pPeo">
                        <el-option
                          v-for="(item,index) in staffList"
                          :key="index"
                          :value="item"
                          :label="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td align="left" colspan="2">
                <p class="p_begin">
                  采集地点：
                  <span>
                    <el-form-item :prop="'evidenceData.' + index + '.pPla'" style="width:75%">
                      <el-input
                        type="textarea"
                        v-model="item.pPla"
                        :autosize="{ minRows: 1, maxRows: 3}"
                        maxlength="50"
                      ></el-input>
                    </el-form-item>
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td align="left" colspan="2">
                <p class="p_begin">
                  证据类型：
                  <span>
                    <el-form-item
                      prop="eviType"
                      :rules="fieldRules('eviType',propertyFeatures['eviType'])"
                    >
                      <el-checkbox-group
                        :max="1"
                        v-model="item.eviType"
                        :disabled="fieldDisabled(propertyFeatures['eviType'])"
                      >
                        <el-checkbox label="1">原物</el-checkbox>
                        <el-checkbox label="2">复制件</el-checkbox>
                        <el-checkbox label="3">其他</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td align="left" colspan="2">
                <p class="p_begin">
                  证据存储介质：
                  <span>
                    <el-form-item
                      prop="eviMedium"
                      :rules="fieldRules('eviMedium',propertyFeatures['eviMedium'])"
                    >
                      <el-checkbox-group
                        :max="1"
                        v-model="item.eviMedium"
                        :disabled="fieldDisabled(propertyFeatures['eviMedium'])"
                      >
                        <el-checkbox label="4">U盘</el-checkbox>
                        <el-checkbox label="5">光盘</el-checkbox>
                        <el-checkbox label="6">移动硬盘</el-checkbox>
                        <el-checkbox label="7">其他</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td align="left" colspan="2">
                <p class="p_begin">
                  <span>
                    执法人员：{{docData.staff}}
                    &nbsp;&nbsp;
                    执法证号：{{docData.certificateId}}；
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td align="left" rowspan="2" colspan="2">
                <p class="p_begin">
                  现场人员意见：
                  <span>
                    <el-form-item :prop="'evidenceData.' + index + '.pOpinion'" style="width:75%">
                      <el-input
                        type="textarea"
                        v-model="item.pOpinion"
                        :autosize="{ minRows: 1, maxRows: 3}"
                        maxlength="50"
                      ></el-input>
                    </el-form-item>
                  </span>
                </p>
                <div class="pdf_seal">
                  <p>签名：{{docData.approvePeo}}</p>
                  <p>
                    <span v-if="docData.approveTime">{{docData.approveTime}}</span>
                    <span v-else>年 月 日</span>
                  </p>
                </div>
              </td>
            </tr>
            <tr></tr>
          </table>
        </div>
      </div>
      <div style="text-align:center">
        <el-button type="primary" @click="addPage">添加一页</el-button>
      </div>
    </el-form>

    <!-- 悬浮按钮 -->
    <casePageFloatBtns
      :pageDomId="'audioEvidenceRecord_print'"
      :formOrDocData="formOrDocData"
      @saveData="saveData"
      @backHuanjie="submitData"
    ></casePageFloatBtns>

    <chooseOrUploadEvidence ref="chooseOrUploadEvidenceRef" @choosePic="showChoosePic"></chooseOrUploadEvidence>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import iLocalStroage from "@/common/js/localStroage";
import chooseOrUploadEvidence from "@/page/caseHandle/case/form/chooseOrUploadEvidence.vue";
import {
  queryResizeImageApi,
  findCaseAllBindPropertyApi
} from "@/api/caseHandle";
export default {
  components: {
    casePageFloatBtns,
    chooseOrUploadEvidence
  },
  mixins: [mixinGetCaseApiList],
  computed: {
    ...mapGetters(["caseId"])
  },
  data() {
    return {
      docData: {
        staff: "",
        certificateId: "",
        pPla: "",
        evidenceData: [
          {
            pic1: "",
            certification: "",
            eviType: [],
            eviMedium: [],
            pOpinion: "",
            picSrc1: "",
            picBase64_1: "",
            pTime: "",
            pPla: "",
            pPeo: "",
            pOpinion: "",
            picList: ""
          }
        ]
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        docData: "",
        status: "", //提交状态
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      rules: {
        sh: [{ required: true, message: "请输入示意图简述", trigger: "blur" }],
        note: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "audioEvidenceRecord_print"
      },
      propertyFeatures: "",
      chooseImgSrc: "",
      picData: "",
      imgBase64: "",
      needDealData: true,
      staffList: [],
      imgWidthArr: [["", ""]],
      imgHeightArr: [["", ""]],
      // scaling:1,
      scalingArr: [[1, 1]]
    };
  },
  methods: {
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.caseDocDataForm.caseDoctypeId
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },

    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //保存文书信息
    saveData(handleType) {
      let picTuresIndex = 0;
      let canSubmit = true;
      if (handleType == 1) {
        this.docData.evidenceData.forEach((item, index) => {
          if (!item.picBase64_1) {
            this.$message("必须选择图片！");
            canSubmit = false;
          }
        });
      }

      this.docData.evidenceData.forEach((item, index) => {
        let picListArr = [{ "pictures-1": item.picBase64_1 }];
        item.picList = JSON.stringify(picListArr);
      });
      if (canSubmit) {
        this.com_addDocData(handleType, "docForm");
      }
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
          true
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },

    chooseImg(index, picIndex, picSrc) {
      let selectAllPicPath = [];
      this.docData.evidenceData.forEach(item => {
        selectAllPicPath.push(item.picSrc1);
      });
      let data = {
        pageType: "evidencePastePage",
        pastePage: index,
        picIndex: picIndex,
        picSrc: picSrc,
        selectAllPicPath: selectAllPicPath
      };
      this.$refs.chooseOrUploadEvidenceRef.showModal(data);
    },
    deleteImg(pageIndex, picIndex) {
      let picKey = "pic" + picIndex;
      let noteKey = "note" + picIndex;
      let picSrcKey = "picSrc" + picIndex;
      let picBase64Key = "picBase64_" + picIndex;
      this.docData.evidenceData[pageIndex][picKey] = "";
      this.docData.evidenceData[pageIndex][noteKey] = "";
      this.docData.evidenceData[pageIndex][picSrcKey] = "";
      this.docData.evidenceData[pageIndex][picBase64Key] = "";
    },
    showChoosePic(selpicData) {
      console.log("selpicData", selpicData);
      this.getBase64(selpicData);
    },
    getBase64(selpicData) {
      debugger
      let storageId = selpicData.picData.evPath;
      queryResizeImageApi(storageId) 
        .then(res => {
          debugger
          console.log("获取base64", res);
          let picBase64Key = "picBase64_" + selpicData.picIndex;
          this.docData.evidenceData[selpicData.pastePage][picBase64Key] =
            res.data;
          this.changeImgWidHei(
            storageId,
            selpicData.pastePage,
            selpicData.picIndex
          );

          //图片evPath赋值 为了在证据弹窗中设置选中或禁止选择
          let picSrcKey = "picSrc" + selpicData.picIndex;
          this.docData.evidenceData[selpicData.pastePage][
            picSrcKey
          ] = storageId;
          //文字说明赋值
          let noteKey = "note" + selpicData.picIndex;
          this.docData.evidenceData[selpicData.pastePage][noteKey] =
            selpicData.picData.note;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //添加一页
    addPage() {
      let data = {
        pic1: "",
        picSrc1: "",
        picBase64_1: "",
        pTime: this.docData.evidenceData[0].pTime,
        pPla: this.docData.evidenceData[0].pPla,
        pPeo: this.docData.evidenceData[0].pPeo,
        certification: "",
        eviType: this.docData.evidenceData[0].eviType,
        eviMedium: this.docData.evidenceData[0].eviMedium,
        pOpinion: "",
        picList: ""
      };
      this.docData.evidenceData.push(data);
      this.imgWidthArr.push(["", ""]);
      this.imgHeightArr.push(["", ""]);
      this.scalingArr.push([1, 1]);
    },
    deletePage(index) {
      this.docData.evidenceData.splice(index, 1);
      this.imgWidthArr.splice(index, 1);
      this.imgHeightArr.splice(index, 1);
      this.scalingArr.splice(index, 1);
    },
    //获取执法人员
    getLawOfficer() {
      let data = {
        caseBasicInfoId: this.caseId,
        typeId: this.$route.params.docId
      };
      findCaseAllBindPropertyApi(data).then(
        res => {
          console.log(res);
          let data2 = JSON.parse(res.data.propertyData);
          this.staffList = data2.staff.split(",");
        },
        err => {
          console.log(err);
        }
      );
    },
    getDataAfter() {
      this.docData.evidenceData.forEach((item, index) => {
        if (index > 0) {
          this.imgWidthArr.push(["", ""]);
          this.imgHeightArr.push(["", ""]);
          this.scalingArr.push([1, 1]);
        }
        this.changeImgWidHei(item.picSrc1, index, 1);
      });
      this.imgWidthArr[1][1] = 400;
    },
    //对图片进行处理
    changeImgWidHei(storageId, pastePage, picIndex) {
      //设置临时图片
      let temImg = new Image();
      temImg.src = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + storageId;
      let _this = this;
      temImg.onload = function(e) {
        //赋值给图片地址
        _this.getScaling(temImg.width, temImg.height, pastePage, picIndex);

        console.log(" temImg.width", temImg.width);

        _this.$set(
          _this.imgWidthArr[pastePage],
          picIndex - 1,
          (temImg.width / _this.scalingArr[pastePage][picIndex - 1]).toFixed(1)
        );
        _this.$set(
          _this.imgHeightArr[pastePage],
          picIndex - 1,
          (temImg.height / _this.scalingArr[pastePage][picIndex - 1]).toFixed(1)
        );
        let picKey = "pic" + picIndex;
        _this.docData.evidenceData[pastePage][picKey] = temImg.src;
      };
    },
    //计算图像缩放比
    getScaling(imgWidth, imgHeight, pastePage, picIndex) {
      let maxWidth = this.$refs.imgBoxRef2[0].offsetWidth - 2;
      let maxHeight = this.$refs.imgBoxRef2[0].offsetHeight - 2;
      //宽高比
      let rate = (imgWidth / imgHeight).toFixed(2);
      if (rate >= 1) {
        this.scalingArr[pastePage][picIndex - 1] = (
          imgWidth / maxWidth
        ).toFixed(1);
      } else {
        this.scalingArr[pastePage][picIndex - 1] = (
          imgHeight / maxHeight
        ).toFixed(1);
      }
      console.log("getScaling", this.scalingArr[pastePage][picIndex - 1]);
    }
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
    this.getLawOfficer();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
<style lang="scss">
#audioEvidenceRecord_print {
  .print_info {
    position: relative;
    margin-bottom: 20px;
    .deletePageBtn {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    & tr {
      & td {
        text-align-last: left;
      }
    }
  }
  .nianBox {
    margin-bottom: 20px;
  }
  .imgBox {
    height: 350px;
    width: 100%;
    border: 1px solid #cccccc;
    text-align: center;
    overflow-y: auto;
    position: relative;
    .imgBoxBtn {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}
</style>
