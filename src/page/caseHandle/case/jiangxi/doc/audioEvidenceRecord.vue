<template>
  <div class="print_box" id="evidencePastePageBox">
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
              <img
                :src="item.pic1"
                alt
                width="90%"
                :height="imgHeightArr[index][0]"
              />
              <div class="imgBoxBtn">
                <el-button size="mini" @click="chooseImg(index,1,item.picSrc1)">选择照片</el-button>
                <el-button size="mini" @click="deleteImg(index,1)">删除</el-button>
              </div>
            </div>
          </el-row>
          <table class="print_table" border="1" bordercolor="black" width="100%">
            <tr>
              <td rowspan="2" colspan="2">
                <span style="float:left;">证明事项：</span>
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td align="left" width = "60%">
                <span style="float:left;">采集时间：&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日&nbsp;&nbsp;时&nbsp;&nbsp;分</span>
              </td>
              <td align="left">
                <span style="float:left;">采集人：</span>
              </td>
            </tr>
            <tr>
              <td align="left" colspan="2">
               <span style="float:left;"> 采集地点：</span>
              </td>
            </tr>
            <tr>
              <td align="left" colspan="2">
                <span style="float:left;">证据类型：
                  <el-checkbox>原物</el-checkbox>
                  <el-checkbox>复制件</el-checkbox>
                  <el-checkbox>其他</el-checkbox>
                </span>
              </td>
            </tr>
            <tr>
              <td align="left" colspan="2">
                <span style="float:left;">证据存储介质：
                  <el-checkbox>U盘</el-checkbox>
                  <el-checkbox>关盘</el-checkbox>
                  <el-checkbox>移动硬盘</el-checkbox>
                  <el-checkbox>其他</el-checkbox>
                </span>
              </td>
            </tr>
            <tr>
              <td align="left" colspan="2">
                <span style="float:left;"> 
                  执法人员：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  执法证号：&nbsp;&nbsp;&nbsp;&nbsp; ；
                  执法证号：&nbsp;&nbsp;&nbsp;&nbsp; ；
                </span>
              </td>
            </tr>
            <tr>
              <td align="left" rowspan="2" colspan="2">
                <span style="float:left;">现场人员意见：</span>
                <br/>
                <span style="float:right;">签名：&nbsp;&nbsp;&nbsp;</span>
                <br/>
                <span style="float:right;">日期：&nbsp;&nbsp;&nbsp;</span>
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
      :pageDomId="'reportRecordDoc_print'"
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
  queryImgBase64Api,
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
        pPla: "",
        evidenceData: [
          {
            pic1: "",
            pic2: "",
            picSrc1: "",
            picSrc2: "",
            picBase64_1: "",
            picBase64_2: "",
            pTime: "",
            pPla: "",
            pPeo: "",
            note1: "",
            note2: "",
            picList: ""
          }
        ]
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //表单数据
        docData: "",
        status: ""
      },
      rules: {
        sh: [{ required: true, message: "请输入示意图简述", trigger: "blur" }],
        note: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "hearingRecordDoc_print"
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
            this.$message("每页的第一张图片必须选择！");
            canSubmit = false;
          }
        });
      }

      this.docData.evidenceData.forEach((item, index) => {
        let picListArr = [
          { "pictures-1": item.picBase64_1 },
          { "pictures-2": item.picBase64_2 }
        ];
        item.picList = JSON.stringify(picListArr);
        picListArr.push(keyValue2);
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
        selectAllPicPath.push(item.picSrc2);
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
      let storageId = selpicData.picData.evPath;
      queryImgBase64Api(storageId)
        .then(res => {
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
        pic2: "",
        picSrc1: "",
        picSrc2: "",
        picBase64_1: "",
        picBase64_2: "",
        pTime: this.docData.evidenceData[0].pTime,
        pPla: this.docData.evidenceData[0].pPla,
        pPeo: this.docData.evidenceData[0].pPeo,
        note1: "",
        note2: "",
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
          console.length(err);
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
        this.changeImgWidHei(item.picSrc2, index, 2);
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
#evidencePastePageBox {
  .print_info {
    position: relative;
    margin-bottom: 20px;
    .deletePageBtn {
      position: absolute;
      right: 10px;
      top: 10px;
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
  .noteBox {
    height: 350px;
    border: 1px solid #cccccc;
  }
}
</style>
