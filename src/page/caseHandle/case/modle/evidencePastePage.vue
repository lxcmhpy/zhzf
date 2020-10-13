<template>
  <div class="print_box" id="evidencePastePageBox">
    <el-form
      :rules="rules"
      ref="docForm"
      :inline-message="true"
      :inline="true"
      :model="docData"
    >
      <div
        style="position: relation"
        v-for="(item, index) in docData.evidenceData"
        :key="index"
      >
        <div class="print_info">
          <el-button
            class="deletePageBtn"
            type="primary"
            v-show="index != 0"
            @click="deletePage(index)"
            >删除本页</el-button
          >
          <div class="doc_topic">证据粘贴页</div>
          <div class="doc_number"></div>
          <el-row :gutter="20">
            <el-col :span="18">粘贴照片栏</el-col
            ><el-col :span="6">文字说明栏</el-col>
          </el-row>
          <el-row :gutter="20" class="nianBox">
            <el-col :span="18">
              <div class="imgBox" ref="imgBoxRef2">
                <img
                  :src="item.pic1"
                  alt=""
                  :width="imgWidthArr[index][0]"
                  :height="imgHeightArr[index][0]"
                />
                <div class="imgBoxBtn">
                  <el-button
                    size="mini"
                    @click="chooseImg(index, 1, item.picSrc1)"
                    >选择照片</el-button
                  ><el-button size="mini" @click="deleteImg(index, 1)"
                    >删除</el-button
                  >
                </div>
              </div>
            </el-col>
            <el-col :span="6" class="noteBox">
              <el-form-item
                :prop="'evidenceData.' + index + '.note1'"
                :rules="[
                  {
                    required: true,
                    message: '请输入文字说明',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  type="textarea"
                  :rows="14"
                  placeholder="请输入"
                  maxlength="100"
                  v-model="item.note1"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="nianBox">
            <el-col :span="18">
              <div class="imgBox">
                <img
                  :src="item.pic2"
                  alt=""
                  :width="imgWidthArr[index][1]"
                  :height="imgHeightArr[index][1]"
                />
                <div class="imgBoxBtn">
                  <el-button
                    size="mini"
                    @click="chooseImg(index, 2, item.picSrc2)"
                    >选择照片</el-button
                  ><el-button size="mini" @click="deleteImg(index, 2)"
                    >删除</el-button
                  >
                </div>
              </div>
            </el-col>
            <el-col :span="6" class="noteBox">
              <el-input
                type="textarea"
                :rows="14"
                placeholder="请输入"
                maxlength="100"
                v-model="item.note2"
              >
              </el-input>
            </el-col>
          </el-row>

          <p class="p_begin">
            拍摄时间：
            <span>
              <el-form-item>
                <el-date-picker
                  v-model="item.pTime"
                  style="width: 200px"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="   年  月  日  时 分 秒"
                >
                </el-date-picker>
              </el-form-item>
            </span>
            拍摄地点
            <span>
              <el-form-item
                :prop="'evidenceData.' + index + '.pPla'"
                style="width: 200px"
              > 
                <el-input
                  type="textarea"
                  v-model="item.pPla"
                  :autosize="{ minRows: 1, maxRows: 3 }"
                  maxLength="50"
                ></el-input>
              </el-form-item>
            </span>
          </p>
          <p class="p_begin">
            拍摄人：
            <span>
              <el-form-item style="width: 215px">
                <!-- <el-select v-model="item.pPeo">
                    <el-option v-for="(item,index) in staffList" :key="index" :value="item" :label="item"></el-option>
                  </el-select> -->

                <el-autocomplete
                  class="inline-input"
                  v-model="item.pPeo"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelectStaff"
                ></el-autocomplete>
              </el-form-item>
            </span>
            执法人员签名：
            <span class="write_line" style="width: 150px"></span>
          </p>
          <!-- <el-row :gutter="20">
          <el-col :span="24">
            当事人或代理人签名：
            <span class="write_line" style="width:300px"></span>
          </el-col>
        </el-row> -->
        </div>
      </div>
      <div style="text-align: center">
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

    <chooseOrUploadEvidence
      ref="chooseOrUploadEvidenceRef"
      @choosePic="showChoosePic"
    ></chooseOrUploadEvidence>
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
  findCaseAllBindPropertyApi,
  queryResizeImageApi,
} from "@/api/caseHandle";
export default {
  components: {
    casePageFloatBtns,
    chooseOrUploadEvidence,
  },
  mixins: [mixinGetCaseApiList],
  computed: {
    ...mapGetters(["caseId"]),
  },
  data() {
    return {
      docData: {
        // picImgEvPath:'',
        // pTime: "",
        pPla: "",
        // pPeo: "",
        note1: "",
        // note2:"",
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
            picList: "",
          },
        ],
        // picList:[],
      },
      handleType: 0, //0  暂存     1 提交
      caseDocDataForm: {
        id: "", //修改的时候用
        caseBasicinfoId: "", //案件ID
        caseDoctypeId: this.$route.params.docId, //文书类型ID
        //表单数据
        docData: "",
        status: "",
        linkTypeId: this.$route.params.caseLinkTypeId,
      },
      rules: {
        sh: [{ required: true, message: "请输入示意图简述", trigger: "blur" }],
        note1: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      formOrDocData: {
        showBtn: [false, true, true, false, false, false, false, false, false], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节
        pageDomId: "hearingRecordDoc_print",
      },
      propertyFeatures: "",
      picData: "",
      imgBase64: "",
      needDealData: true,
      staffList: [],
      imgWidthArr: [["", ""]],
      imgHeightArr: [["", ""]],
      // scaling:1,
      scalingArr: [[1, 1]],
      pPlaFromInfor: "", //绑定的执法地点（拍摄地点）
    };
  },
  methods: {
    //选择拍摄人
    handleSelectStaff(val) {
      console.log("handleSelectStaff -> val", val);
    },
    querySearch(queryString, cb) {
      var staffList = this.staffList;
      var results = queryString
        ? staffList.filter(this.createFilter(queryString))
        : staffList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (staff) => {
        return (
          staff.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.caseDocDataForm.caseDoctypeId,
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },

    //提交
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url,
      });
    },
    //保存文书信息
    saveData(handleType) {
      let picTuresIndex = 0;
      let canSubmit = true;
      if (handleType == 1) {
        this.docData.evidenceData.forEach((item, index) => {
          if (!item.picBase64_1) {
            // this.$message('每页的第一张图片必须选择！')
            canSubmit = false;
            return;
          }
        });
      }
      this.docData.evidenceData.forEach((item, index) => {
        let picListArr = [
          { "pictures-1": item.picBase64_1 },
          { "pictures-2": item.picBase64_2 },
        ];
        item.picList = JSON.stringify(picListArr);
      });
      if (canSubmit) {
        console.log("this.docData.evidenceData", this.docData.evidenceData);
        this.com_addDocData(handleType, "docForm");
      } else {
        this.$message("每页的第一张图片必须选择！");
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
          true,
        ]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },

    chooseImg(index, picIndex, picSrc) {
      let selectAllPicPath = [];
      this.docData.evidenceData.forEach((item) => {
        selectAllPicPath.push(item.picSrc1);
        selectAllPicPath.push(item.picSrc2);
      });
      let data = {
        pageType: "evidencePastePage",
        pastePage: index,
        picIndex: picIndex,
        picSrc: picSrc,
        selectAllPicPath: selectAllPicPath,
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
      // queryImgBase64Api(storageId).then(res=>{
      queryResizeImageApi(storageId)
        .then((res) => {
          console.log("获取base64", res);
          if (res === false) {
            //生成失败
            this.$message.error("生成base64码失败！");
            return;
          }
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
        .catch((err) => {
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
        pTime: "",
        pPla: this.docData.evidenceData[0].pPla,
        pPeo: this.docData.evidenceData[0].pPeo,
        note1: "",
        note2: "",
        picList: "",
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
      // debugger
      let data = {
        typeId: this.$route.params.docId,
        caseBasicInfoId: this.caseId,
      };
      findCaseAllBindPropertyApi(data).then(
        (res) => {
          console.log("/获取执法人员 -> res", res);
          let data2 = JSON.parse(res.data.propertyData);
          if (Object.keys(data2) == 0) {
            console.log("empty obj");
            return;
          }
          if (data2.pPeo) {
            let arr = data2.pPeo.split(",");
            arr.forEach((item) => {
              this.staffList.push({
                value: item,
              });
            });
          }

          // this.staffList=[{
          //   value:'1',
          //   label:'aa'
          // },
          // {
          //   value:'11',
          //   label:'aa11'
          // }]
          this.pPlaFromInfor = data2.pPla;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getDataAfter() {
      //处理图片
      this.docData.evidenceData.forEach((item, index) => {
        if (index > 0) {
          this.imgWidthArr.push(["", ""]);
          this.imgHeightArr.push(["", ""]);
          this.scalingArr.push([1, 1]);
        }
        this.changeImgWidHei(item.picSrc1, index, 1);
        this.changeImgWidHei(item.picSrc2, index, 2);
      });
      //带入拍摄地点 (暂存后不自动带入了)
      if (this.caseDocDataForm.status == "") {
        this.docData.evidenceData[0].pPla = this.pPlaFromInfor;
      }
    },
    //对图片进行处理
    async changeImgWidHei(storageId, pastePage, picIndex) {
      //设置临时图片
      let temImg = new Image();
      if(storageId){
        temImg.src = await this.$util.com_getFileStream(storageId);
      }
      let _this = this;
      temImg.onload = function (e) {
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

        console.log(pastePage, picIndex - 1);
        console.log(" _this.imgWidthArr", _this.imgWidthArr);
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
    },
  },
  mounted() {
    this.getDocDataByCaseIdAndDocId();
  },
  created() {
    this.isOverStatus();
    this.getLawOfficer();
  },
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

  .overflow_lins_textarea {
    & > textarea {
      text-indent: 5em;
    }
  }
  .noteBox {
    height: 350px;
    border: 1px solid #cccccc;
  }
}
</style>


