<template>
  <div class="print_box">
    <div class="print_info" id="establish-print">
      <el-form :rules="rules" ref="docForm" :inline-message="true" :inline="true" :model="docData">
        <div class="doc_topic">收费凭据表</div>
        <table class="print_table" border="1" bordercolor="black" width="100%" cellspacing="0">
          <tr>
            <td colspan="4" class="color_DBE4EF">
              <p>
                案由:<el-form-item style="width: calc(100% - 45px);" prop="caseName" :rules="fieldRules('caseName',propertyFeatures['caseName'])">
                <el-input type="textarea" v-model="docData.caseName" :disabled="fieldDisabled(propertyFeatures['caseName'])" :autosize="{ minRows: 2, maxRows: 3}" maxlength="90" placeholder="\"></el-input>
              </el-form-item>
              </p>
            </td>
          </tr>
          <tr>
            <td  style="width:40px">
              <p>案发时间</p>
            </td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="afsj" :rules="fieldRules('afsj',propertyFeatures['afsj'])" class="pdf_datapick">
                <el-date-picker style="width:250px" v-model="docData.afsj" :disabled="fieldDisabled(propertyFeatures['afsj'])" type="datetime" format="yyyy年MM月dd日HH时mm分" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td >案发地点</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="payTime" :rules="fieldRules('afdd',propertyFeatures['afdd'])">
                <el-input type="textarea" v-model="docData.afdd" :disabled="fieldDisabled(propertyFeatures['afdd'])" :autosize="{ minRows: 2, maxRows: 2}" maxlength="90" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td >缴费单位</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="payParty" :rules="fieldRules('payParty',propertyFeatures['payParty'])">
                <el-input type="textarea" v-model="docData.payParty" :disabled="fieldDisabled(propertyFeatures['payParty'])" :autosize="{ minRows: 2, maxRows: 2}" maxlength="90" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td >收费时间</td>
            <td colspan="3" class="color_DBE4EF">
              <el-form-item prop="payTime" :rules="fieldRules('payTime',propertyFeatures['payTime'])">
                <el-date-picker style="width:250px" v-model="docData.payTime" :disabled="fieldDisabled(propertyFeatures['payTime'])" type="datetime" format="yyyy年MM月dd日HH时mm分" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="3" >收费凭证号数</td>
            <td  class="color_DBE4EF">
              <el-form-item prop="payNumber" :rules="fieldRules('payNumber',propertyFeatures['payNumber'])">
                <el-input type="textarea" v-model="docData.payNumber" :disabled="fieldDisabled(propertyFeatures['payNumber'])" :autosize="{ minRows: 2, maxRows: 2}" maxlength="90" placeholder="\"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr style="height: 400px;">
            <td>
              <p colspan="3">收费票据复印件</p>
            </td>
            <td colspan="3"  class="color_DBE4EF table_seal" style="white-space: pre-wrap;word-break:break-all">
              <!-- <div class="pdf_seal">
                <p>粘贴人</p>
              </div> -->
              <div>
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :http-request="uploadImg">
                  <img style="width:100%;height:100%" v-if="docData.picturesUrl" :src="docData.picturesUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </td>
          </tr>
          <tr>
            <td >
              <p colspan="3">备注</p>
              <!-- <p>备注</p> -->
            </td>
            <td colspan="3" class="color_DBE4EF table_seal">
              <el-form-item prop="note" :rules="fieldRules('note',propertyFeatures['note'])">
                <el-input type="textarea" v-model="docData.note" :disabled="fieldDisabled(propertyFeatures['note'])" :autosize="{ minRows: 4, maxRows: 4}" maxlength="50" placeholder="\"></el-input>
              </el-form-item>
              <!-- <div class="pdf_seal">
                <p>粘贴人:</p>
              </div> -->
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <casePageFloatBtns :pageDomId="'question_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
    <caseSlideMenu :activeIndex="''"></caseSlideMenu>
  </div>
</template>
<script>
import showApprovePeople from "@/page/caseHandle/components/showApprovePeople";
import approvalDialog from "@/page/caseHandle/components/approvalDialog";
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'

import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";
import { validateIDNumber, validatePhone, validateZIP } from '@/common/js/validator'
// import { BASIC_DATA_SYS } from '@/common/js/BASIC_DATA.js';
import { BASIC_DATA_QH } from '@/common/js/BASIC_DATA_QH.js';
import { uploadCommon,uploadEvdence } from "@/api/upload.js";
import {
  queryResizeImageApi
} from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      // tableData: {},
      docData: {
        caseTypeKey: "",//案件字
        caseNumber: "",
        caseName: "",
        afsj: "",
        party: "",
        partySex: '',
        partyAge: "",
        payNumber: '',
        payTime: '',
        payParty: '',
        afdd: '',
        caseName: '',
        note: '',
        picturesUrl: '',
        picList: '',
      },
      caseDocDataForm: {
        id: "",   //修改的时候用
        caseBasicinfoId: '',   //案件ID
        caseDoctypeId: this.$route.params.docId,     //文书类型ID
        //文书数据
        docData: "",
        status: "",   //提交状态
        note: "",//文书名字
        docDataId: "", //多份文书的id
        linkTypeId: this.$route.params.caseLinkTypeId //所属环节的id
      },
      rules: {
        caseName: [
          { required: true, message: "案由不能为空", trigger: "blur" }
        ],
        afdd: [
          { required: true, message: "案发地点不能为空", trigger: "blur" }
        ],
        payParty: [
          { required: true, message: "缴费单位不能为空", trigger: "blur" }
        ],
        afsj: [
          { required: true, message: "案发时间不能为空", trigger: "blur" }
        ],
        payTime: [
          { required: true, message: "请选择收费时间", trigger: "change" }
        ],
      },
      nameLength: 23,
      adressLength: 23,
      maxLength: 12,
      approval: this.$route.params.isApproval ? true : false, //   是否是审批人员进入
      formOrDocData: {
        showBtn: [
          false,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ], //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
        pageDomId: 'establish-print'
      },
      huanjieAndDocId: this.BASIC_DATA_QH.establish_JX_huanjieAndDocId, //立案登记表的文书id
      approvalOver: false,//审核完成
      isParty: true, //当事人类型为个人
      editCaseInfo: '', //修改案件基本信息需要传的数据
      propertyFeatures: '', //字段属性配置
      imageUrl: ''
    };
  },
  components: {
    showApprovePeople,
    approvalDialog,
    // overflowInput,
    // overflowInput1,
    casePageFloatBtns,
    caseSlideMenu
  },
  computed: { ...mapGetters(["caseId"]) },
  mixins: [mixinGetCaseApiList],
  methods: {
    setData() {
      this.$store.commit("setCaseLinktypeId", this.BASIC_DATA_QH.case_handle_paymentReceipt_QH_caseDocTypeId);
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(
        this.caseLinkDataForm.caseBasicinfoId,
        this.caseLinkDataForm.caseLinktypeId,
        false
      );
    },
    //根据案件ID和文书Id获取数据
    getDocDataByCaseIdAndDocId() {
      this.caseDocDataForm.caseBasicinfoId = this.caseId;
      let data = {
        caseId: this.caseId,
        docId: this.$route.params.docId
      };
      this.com_getDocDataByCaseIdAndDocId(data);
    },
    //保存文书信息
    saveData(handleType) {
      this.com_addDocData(handleType, "docForm");
    },
    submitData(handleType) {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: this.$route.params.url
      });
    },
    //设置案件来源
    getDataAfter() {

    },
    //获取案件基本信息
    getCaseInfo() {
      let data = {
        id: this.caseId
      };
      this.$store.dispatch("getCaseBasicInfo", data)
        .then(
          res => {
            this.editCaseInfo = {
              id: res.data.id,
              tempNo: res.data.tempNo
            }
          })
        .catch(err => { console.log(err) })
    },
    //修改案件基本信息
    gotoEditCase() {
      this.$router.push({
        name: "case_handle_inforCollect",
        params: { editFlag: true }
      })
    },
    //是否是完成状态
    isOverStatus() {
      if (this.$route.params.docStatus == '1') {
        this.formOrDocData.showBtn = [false, false, false, false, false, false, false, false, false, true]; //提交、保存、暂存、打印、编辑、签章、提交审批、审批、下一环节、返回
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' ||  file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传图片只能是 jpg/png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!');
      }
      return isJPG && isLt2M;
    },
    //上传图片
    uploadImg(param) {
        var fd = new FormData()
        fd.append("file", param.file);
        fd.append('caseId', this.caseId)
        fd.append('docId', this.$route.params.docId);
        fd.append("evName", param.file.name);
        fd.append("evType", param.file.type);
        uploadEvdence(fd).then(
          res => {
            this.getBase64(res.data.storageId)
            this.docData.picturesUrl = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + res.data.storageId
          },
          error => {
          }
        );

    },
    getBase64(storageId) {
      queryResizeImageApi(storageId).then(res => {
        if (res === false) {   //生成失败
          this.$message.error('生成base64码失败！')
          return;
        } else {
          // this.docData.pictures1 = res.data
          let data = [{ 'pictures-1': res.data }]
          this.docData.picList = JSON.stringify(data)
        }
      }).catch(err => { console.log(err) })
    },
  },
  created() {
    // this.setData();
    // this.getCaseInfo();
    this.isOverStatus();
    this.getDocDataByCaseIdAndDocId();
  }
};
</script>
 <style lang="scss" src="@/assets/css/caseHandle/caseDocModle.scss"></style>
 <style lang="scss">
#editCaseInfoBtn {
  margin: 20px;
}
#establish-print {
  .el-form-item__content .el-input__suffix {
    width: 20px;
    right: 0;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  /* border: 1px dashed #d9d9d9; */
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  margin-left: 150px;
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 400px;
  line-height: 300px;
  text-align: center;
}
.avatar {
  /* width: 178px;
  height: 178px; */
  display: block;
}
</style>

