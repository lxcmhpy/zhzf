<template v-if="caseInfo">
  <div>
    <el-dialog custom-class="leftDialog leftDialog2 archiveCatalogueBox documentFormCat margin-bottom0" :visible.sync="visible" @close="closeDialog" top="0px" width="405px" :modal="false" :show-close="false" :append-to-body="true" style="top:60px;right:60px">
      <template slot="title">
        <div class="catalogueTitle">
          照片证据列表
          <!-- <span style="color:#E54241">（{{caseList.length}}）</span> -->
        </div>
      </template>
      <div class="userList">
        <li v-for="item in tableData" :label="item.storageId" :key="item.storageId" style="margin-bottom:20px;cursor   : pointer;">
          <span style="margin-top:20px;margin-bottom:10px;    display: block;">{{format(item.docId)}}</span>
          <img :src="item.url" width="100%" height="auto" @click.stop="imgDetail(scope.row)" />
        </li>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { findByCaseBasicInfoIdApi, findByCaseIdAndDocIdApi, findVoByDocCaseIdApi } from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
import { uploadCommon, findCommonFileApi } from "@/api/upload";
export default {
  data() {
    return {
      visible: false,
      caseList: [],
      mlList: [],
      pdfVisible: false,
      checkedDocId: [],
      tableData: [],
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
    showModal(carinfoId) {
      //      console.log('show');

      this.visible = true;
      // if (!this.getData) this.getByMlCaseId();
      if (carinfoId) {
        let data = {
          caseId: carinfoId.id || '',
          current: 1,
          size: 20,
        };
        console.log("证据目录参数", data);
        let _this = this;
        findCommonFileApi(data).then((res) => {
          console.log("res", res);
          _this.tableData = res.data.records;
          _this.tableData.forEach(element => {
            _this.$util.partLoading_getFileStream(element.storageId).then(res => {
              _this.$set(element, 'url', res)
            });
          });
        });
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取已完成文书列表
    getByMlCaseId() {
      this.getData = true;
      let _this = this
      findVoByDocCaseIdApi(this.caseId.id).then(
        res => {
          console.log(res);
          _this.caseList = res.data;
        },
        error => {
          console.log(error);
        }
      );
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

    //全选
    handleCheckAllChange(val) {
      //      debugger
      //      console.log(val);
      if (val) {
        this.caseList.forEach(item => {
          //复选框存入id
          this.checkedDocId.push(item.storageId);
        });
      } else {
        this.checkedDocId = [];
      }
      this.isIndeterminate = false;
    },
    format(docId) {
      switch (docId) {
        case '000001':
          return '车辆照片证据';
          break;
        case '000002':
          return '驾驶人/企业';
          break;
        case '000003':
          return '初检称重';
          break;
        case '000004':
          return '卸载复检';
          break;
        case '000005':
          return '处罚决定';
          break;
        case '000006':
          return '其他';
          break;
      }
    },
  },
  mounted() {
    let class1 = document.getElementsByClassName("documentFormCat");
    let class2 = class1[0].parentNode;
    class2.style.right = '60px';
    class2.style.top = '60px';
    class2.style.overflow = 'hidden';
  }
};
</script>
