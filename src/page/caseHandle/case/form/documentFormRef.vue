<template v-if="caseInfo">
  <div>
    <el-dialog
      custom-class="leftDialog leftDialog2 archiveCatalogueBox documentFormCat"
      :visible.sync="visible"
      @close="closeDialog"
      :top="fatherCom==='inforCollection' ? '95px':'33px'"
      width="405px"
      :modal="false"
      :show-close="false"
      :append-to-body="true"
    >
      <template slot="title">
        <div class="catalogueTitle" style="display:flex;justify-content:space-between;">
          <div>文书列表<span style="color:#E54241">（{{caseList.length}}）</span></div>
          <!-- <el-tooltip style="margin-right: 15px;" effect="dark" content="查看更多" placement="top">
            <el-button type="text">详情</el-button>
          </el-tooltip> -->
        </div>
      </template>
      <div class="userList a">
        <el-checkbox-group v-model="checkedDocId" class="checkboxGroup">
          <el-tooltip
            v-for="(item,index) in caseList"
            :label="item.storageId"
            :key="item.storageId"
            effect="dark"
            content="查看文件"
            placement="top-start">
            <el-checkbox
              class="checkboxItem"
              :label="item.storageId">
              <span class="name">{{index + 1}}</span>
              <span class="name" @click="handleCheckName(item)">{{item.docName}}</span>
            </el-checkbox>
          </el-tooltip>
        </el-checkbox-group>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
        >
        <el-tooltip effect="dark" content="批量打印" placement="top">
          <el-checkbox
            :style="fatherCom==='inforCollection' ? 'top: -68px':'top: 15px'"
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          ></el-checkbox>
        </el-tooltip>
        <el-button :style="fatherCom==='inforCollection' ? 'top: -80px':'top: 5px'" @click="routerArchiveCatalogueDetail" type="primary">打印</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="pdfVisible"
      @close="closeDialog"
      :close-on-click-modal="false"
      width="1000px"
      append-to-body>
      <div>
        <div style="height:auto;">
          <!-- <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image> -->
          <!-- <div v-if="mlList.length > 0" lazy>
              <object >
                  <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                  :src="mlList[indexPdf]" type="application/pdf" internalinstanceid="29">
              </object>
          </div> -->
          <div v-show="showCover=='pdf'">
            <!-- <object>
              <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important"
                     name="plugin" id="plugin"
                     :src="docSrc" type="application/pdf" internalinstanceid="29">
            </object> -->
                <iframe :src="'/static/pdf/web/viewer.html?file='+encodeURIComponent(docSrc)" frameborder="0" style="width:790px;height:1119px"></iframe>
          </div>
          <div style="position:absolute;bottom:150px;right: 20px;width:100px;">
            <!-- <el-button @click="updatePDF1">上一张</el-button><br><br>
            <el-button @click="updatePDF2">下一张</el-button> -->
            <el-button @click="showNext('last')" :disabled="!nowShowPdfIndex ? true : false">上一张</el-button>
            <br><br>
            <el-button @click="showNext('next')"
                       :disabled="nowShowPdfIndex == this.checkedDocId.length-1 ? true : false">下一张
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  import {findByCaseBasicInfoIdApi, findByCaseIdAndDocIdApi, findVoByDocCaseIdApi} from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
  export default {
    data() {
      return {
        visible: false,
        caseList: [],
        mlList: [],
        pdfVisible: false,
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
    props: {
      fatherCom: {
        type: String,
        default: ""
      }
    },
    // props: ["caseInfo"],
    computed: {...mapGetters(["caseId"])},
    methods: {
      showModal() {
//      console.log('show');

        this.visible = true;
        if (!this.getData) this.getByMlCaseId();


      },
      //关闭弹窗的时候清除数据
      closeDialog() {
        this.visible = false;
      },
      //获取已完成文书列表
      getByMlCaseId() {
        this.getData = true;
        let _this = this
        findVoByDocCaseIdApi(this.caseId).then(
          res => {
            console.log(res);
            _this.caseList = res.data;
          },
          error => {
            console.log(error);
          }
        );
      },
      // getByMlCaseId() {
      //   let _this = this
      //   findByCaseBasicInfoIdApi(this.caseId).then(
      //     res => {
      //         debugger
      //       console.log(res);
      //       _this.caseList = res.data;
      //     },
      //     error => {
      //       console.log(error);
      //     }
      //   );
      // },
      /**
       * 点击文书名字
       */
      async handleCheckName(data) {
        let arr = []
        arr.push(data.storageId)
        this.docSrc = await this.$util.com_getFileStream(data.storageId)

        this.nowShowPdfIndex = 0;
        this.indexPdf = 0;
        this.pdfVisible = true
        this.archiveSuccess = true;
        this.showCover = 'pdf';
      },

      async routerArchiveCatalogueDetail() {
        this.docSrc = await this.$util.com_getFileStream(this.checkedDocId[0])
        this.nowShowPdfIndex = 0;
        this.indexPdf = 0;
        this.pdfVisible = true
        this.archiveSuccess = true;
        this.showCover = 'pdf';
      },
      
      // alertPDF(item) {
      //   let data = {
      //     caseId: item.caseBasicinfoId,
      //     docId: item.caseDoctypeId,
      //   };
      //   let _that = this
      //   findByCaseIdAndDocIdApi(data).then(res => {
      //     _that.mlList = _that.host + res.data[0].storageId;

      //   }, err => {
      //     console.log(err);
      //   })
      //   this.indexPdf = 0;
      //   this.pdfVisible = true
      // },
      //显示封面
      showCover() {
        if (this.$route.name != 'case_handle_archiveCover') {
          let item = {name: 'cover'}
          this.$router.push({name: 'case_handle_archiveCover', params: {clickIsDoc: JSON.stringify(item)}});
          return;
        }
        this.$emit('showCoverEmit')
      },
      //上下翻页显示pdf
      async showNext(flag) {
        if (flag == 'last') {
          if (this.nowShowPdfIndex) {
            this.nowShowPdfIndex--;
            this.docSrc = await this.$util.com_getFileStream(this.checkedDocId[this.nowShowPdfIndex])
          }
        } else {
          if (this.nowShowPdfIndex != this.checkedDocId.length - 1) {
            this.nowShowPdfIndex++;
            this.docSrc = await this.$util.com_getFileStream(this.checkedDocId[this.nowShowPdfIndex])
          }
        }
      },
      //全选
      handleCheckAllChange(val) {
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
<style lang="scss">
.archiveCatalogueBox {
  .userList {
    .checkboxGroup {
      .checkboxItem {
        height: 31px;
        margin-bottom: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-left: 10px;
        .name {
          z-index: 112233;
        }
      }
      .checkboxItem:hover {
        background: #F1C100;
      }
    }
  }
}
</style>
<style scoped lang="scss">
  .fullscreen .archiveCatalogueBox {
    background: #EAEDF4;
    margin-right: 0;
    .el-dialog__header {
      height: 64px;
      background: #FFFFFF;
      color: #20232B;
      padding: 0 0 0 20px;
      line-height: 64px;
      .catalogueTitle {
        font-size: 20px;
        cursor: pointer;
      }
    }
    table {
      text-align: center;
      background: #fdffff;
      td {
        padding: 10px 0;
        min-height: 38px;
        border: 1px solid #7F8185;
      }
      tr {
        td:nth-child(1), td:nth-child(3) {
          width: 40px;
        }
      }
    }

  }

  .el-checkbox {
    width: 100%;
    margin-bottom: 22px;
    margin-right: 0;
  }

  .el-checkbox :last-child {
    margin-bottom: 0;
  }

  .dialog-footer {
    width: 100%;
  }


  .dialog-footer {
    .el-checkbox {
      width: auto;
      left: 22px;
      position: absolute;
    }
    .el-button {
      position: absolute;
      width: 204px;
      height: 38px;
      left: 60px;
    }
  }

</style>