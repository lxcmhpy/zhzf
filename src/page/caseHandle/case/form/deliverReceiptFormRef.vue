<template v-if="caseInfo">
<div>
  <el-dialog
    custom-class="leftDialog leftDialog2 archiveCatalogueBox deliverCaBox"
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
            <tr v-for="(item,index) in caseList" :key="index" @click="alertPDF(item)">
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
        width="1000px"
         append-to-body>
        <div >
        <div style="height:auto;">
        <!-- <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image> -->
            <div lazy>
                <object >
                    <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                    :src="mlList" type="application/pdf" internalinstanceid="29">
                </object>
            </div>
        </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { findByCaseBasicInfoIdApi,findByCaseIdAndDocIdApi,getDeliverReceiptByCaseIdApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      caseList:[],
      mlList: "",
      pdfVisible: false,
      // doccloseDialog: false,
      host:'',
    };
  },
  inject: ["reload"],
  // props: ["caseInfo"],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal() {
      console.log('show');
      this.visible = true;
      this.getByMlCaseId();
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
        this.$router.push({name:'archiveCatalogueDetail'})
    },
    alertPDF (item) {
        debugger
        let data = {
            caseId:item.caseId,
            docId: item.caseSerProofId,
        };
        let _that = this
        findByCaseIdAndDocIdApi(data).then(res=>{
            debugger
            _that.mlList = _that.host + res.data[0].storageId;
                
        },err=>{
            console.log(err);
        })
        this.indexPdf = 0;
        this.pdfVisible = true
    },
    //显示封面
    showCover(){
      if(this.$route.name!='archiveCover'){
        let item={name:'cover'}
        this.$router.push({name:'archiveCover',params:{clickIsDoc:JSON.stringify(item)}});
        return;
      }
      this.$emit('showCoverEmit')
    }
  },
  mounted () {
     this.host = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST;
      let class1 =  document.getElementsByClassName("deliverCaBox");
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
