<template v-if="caseInfo">
  <div>
    <el-dialog custom-class="leftDialog leftDialog2 archiveCatalogueBox documentFormCat" :visible.sync="visible" @close="closeDialog" top="0px" width="405px" :modal="false" :show-close="false" :append-to-body="true">
      <template slot="title">
        <div class="catalogueTitle">
          文书列表
          <!-- <span style="color:#E54241">（{{fileList.length}}）</span> -->
        </div>
      </template>
      <div v-if="!inspectionOverWeightId">
        请先保存表单
      </div>
      <div class="userList caseAndEvidenceListDiaClass">
        <li v-for="(item,index) in fileList" :label="item.storageId" :key="item.storageId" style="font-size: 16px;line-height: 36px;cursor: pointer;">
          <span class="name">{{index + 1}}、</span>
          <span class="name">{{item.docName}}</span>
          <span class="name" style="margin-left:20px;color:bule">{{item.status?item.status:'未完成'}}</span>
        </li>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
        <el-button @click="routerArchiveCatalogueDetail" type="primary">打印</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getTemplateDocList, getDocListById, findCarInfoFileByIdApi } from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      visible: false,
      fileList: [],
      mlList: [],
      pdfVisible: false,
      host: "",
      checkedDocId: [],
      indexPdf: 0,
      nowShowPdfIndex: 0,
      docSrc: '', //文书的pdf地址
      isIndeterminate: true,
      checkAll: false,
      getData: false,

    };
  },
  inject: ["reload"],
  // props: ["caseInfo"],
  computed: { ...mapGetters(["caseId", 'inspectionOverWeightId']) },
  methods: {
    showModal(pageDomId) {
      this.visible = true;
      if (pageDomId) this.getByMlCaseId(pageDomId);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取文书列表
    getByMlCaseId(pageDomId) {
      findCarInfoFileByIdApi(pageDomId).then(
        res => {
          console.log(res)
          if (res.code == 200) {
            this.fileList = res.data
          }
        },
        error => {
          // reject(error);
        })

    },

    routerArchiveCatalogueDetail() {
      let _thats = this
      this.docSrc = this.host + this.checkedDocId[0];
      this.nowShowPdfIndex = 0;
      this.indexPdf = 0;
      this.pdfVisible = true
      this.archiveSuccess = true;
      this.showCover = 'pdf';
    },
    // routerArchiveCatalogueDetail () {
    //     debugger
    //     let _thats = this
    //     this.checkedDocId.forEach((v)=>{
    //        debugger
    //        _thats.mlList.push(this.host + v)
    //     });
    //     this.indexPdf = 0;
    //     this.pdfVisible = true
    //     console.log('选中的id',this.checkedDocId)
    // },
    alertPDF(item) {
      let data = {
        caseId: item.caseBasicinfoId,
        docId: item.caseDoctypeId,
      };
      let _that = this
      findByCaseIdAndDocIdApi(data).then(res => {
        _that.mlList = _that.host + res.data[0].storageId;

      }, err => {
        console.log(err);
      })
      this.indexPdf = 0;
      this.pdfVisible = true
    },
    //显示封面
    showCover() {
      if (this.$route.name != 'case_handle_archiveCover') {
        let item = { name: 'cover' }
        this.$router.push({ name: 'case_handle_archiveCover', params: { clickIsDoc: JSON.stringify(item) } });
        return;
      }
      this.$emit('showCoverEmit')
    },
    //上下翻页显示pdf
    showNext(flag) {
      if (flag == 'last') {
        if (this.nowShowPdfIndex) {
          this.nowShowPdfIndex--;
          this.docSrc = this.host + this.checkedDocId[this.nowShowPdfIndex];
        }
      } else {
        if (this.nowShowPdfIndex != this.checkedDocId.length - 1) {
          this.nowShowPdfIndex++;
          this.docSrc = this.host + this.checkedDocId[this.nowShowPdfIndex];
        }
      }
    },
    //全选
    handleCheckAllChange(val) {
      if (val) {
        this.fileList.forEach(item => {
          //复选框存入id
          this.checkedDocId.push(item.storageId);
        });
      } else {
        this.checkedDocId = [];
      }
      this.isIndeterminate = false;
    },
  },
  mounted() {
    // this.host = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST
    let class1 = document.getElementsByClassName("documentFormCat");
    let class2 = class1[0].parentNode;
    class2.style.right = '60px';
    class2.style.top = '60px';
    class2.style.overflow = 'hidden';
  }
};
</script>
