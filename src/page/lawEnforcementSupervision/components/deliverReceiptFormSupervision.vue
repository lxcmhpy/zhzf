<template v-if="caseInfo">
<div>
  <el-dialog
    custom-class="leftDialog leftDialog2 archiveCatalogueBox deliverSupervisionCaBox"
    :visible.sync="visible"
    @close="closeDialog"
    top="0px"
    width="405px"
    :modal="false"
    :show-close="false"
    :append-to-body="true"
  >
    <template slot="title">
        <div class="catalogueTitle">
            送达回证
            <!-- 案件：{{caseInfo.caseNumber}} -->
        </div>
    </template>
    <!-- <div class="haha" v-show="visible">
      <div class="archiveCatalogueHead">卷宗目录</div>
      <div class="archiveCatalogueCon"></div>
      <div class="archiveCatalogueFoot">排序管理</div>

    </div> -->
    <div >
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
                <td>序号</td>
                <td>文书名称</td>
                <!-- <td>页码</td> -->
            </tr>
            <tr v-for="(item,index) in caseList" :key="index" @click="showCasePdf(item)">
                <td>{{index+1}}</td>
                <td>{{item.docName}}</td>
                <!-- <td>{{item.page}}</td> -->
            </tr>
        </table>
    </div>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="routerArchiveCatalogueDetail" type="primary">打印</el-button>
    </span> -->
  </el-dialog>
  <el-dialog
        :visible.sync="pdfVisible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="800px"
         append-to-body>
        <div >
        <div style="height:auto;">
        <!-- <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image> -->
            <div lazy id="myPdfBOx">
                <!-- <object >
                    <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                    :src="mlList" type="application/pdf" internalinstanceid="29">
                </object> -->
                <iframe :src="'/static/pdf/web/viewer.html?file='+encodeURIComponent(pdfUrl)" frameborder="0" style="width:790px;height:1119px"></iframe>
            </div>
        </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { findByCaseBasicInfoIdApi,findByCaseIdAndDocIdApi,getDeliverReceiptByCaseIdApi,getFileStreamByStorageIdApi } from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    return {
      visible: false,
      caseList:[],
      mlList: "",
      pdfVisible: false,
      // doccloseDialog: false,
      host:'',
      getData:false,
      pdfUrl:''
    };
  },
  inject: ["reload"],
  // props: ["caseInfo"],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal() {
      console.log('show');
      this.visible = true;
      if(!this.getData)  this.getByMlCaseId();

    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    // getByMlCaseId() {
    //      this.$store.dispatch("getByMlCaseIdNew", this.caseId).then(
    //      res=>{
    //          this.caseList = res.data;
    //      },
    //      err=>{
    //        console.log(err)
    //      }
    //    )
    // },
    //获取已完成送达回证列表
    getByMlCaseId() {
      this.getData = true;
        let data = {
            caseId: this.caseId,
        };
      let _this = this
      getDeliverReceiptByCaseIdApi(data).then(
        res => {

          console.log(res);
          _this.caseList = res.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    routerArchiveCatalogueDetail () {
        this.$router.push({name:'case_handle_archiveCatalogueDetail'})
    },
    //跳转到pdf页面
      showCasePdf(item){
        this.$router.push({
            name: 'lawEnforcementSupervision_casePDF',
            params:{currentPdf:JSON.stringify(item),allCasePdf:JSON.stringify(this.caseList)}
        });
      }
  },
  mounted () {
     this.host = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
      let class1 =  document.getElementsByClassName("deliverSupervisionCaBox");
      let class2 = class1[0].parentNode;
      class2.style.right = '60px';
      class2.style.top = '60px';
      class2.style.overflow = 'hidden';
  }
};
</script>
<style lang="scss">
// @import "@/assets/css/caseHandle/index.scss";
// .fullscreen .archiveCatalogueBox{
//     background: #EAEDF4;
//     margin-right: 0;
//     .el-dialog__header {
//         height: 64px;
//         background: #FFFFFF;
//         color: #20232B;
//         padding: 0 0 0 20px;
//         line-height: 64px;
//         .catalogueTitle {
//             font-size: 20px;
//             cursor: pointer;
//         }
//     }
//     table{
//         text-align: center;
//         background: #fdffff;
//         td{
//             padding: 10px 0;
//             min-height: 38px;
//             border: 1px solid #7F8185;
//         }
//         tr{
//             td:nth-child(1),td:nth-child(3){
//                 width: 40px;
//             }
//         }
//     }
// }
</style>
