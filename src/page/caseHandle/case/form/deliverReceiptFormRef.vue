<template v-if="caseInfo">
<div>
  <el-dialog
    custom-class="leftDialog leftDialog2 archiveCatalogueBox"
    :visible.sync="visible"
    @close="closeDialog"
    top="60px"
    width="405px"
    :modal="false"
    :show-close="false"
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="routerArchiveCatalogueDetail" type="primary">打印</el-button>
    </span>
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
      closeDialog: false,
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
      console.log(this.visible);

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
        debugger
        let data = {
            caseId: this.caseId,
        };
      let _this = this
      getDeliverReceiptByCaseIdApi(data).then(
        res => {
            debugger
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
    // alertPDF (item) {
    //     debugger
    //   console.log(this.$route.name)
    //   if(this.$route.name!='archiveCover'){
    //     this.$router.push({name:'archiveCover',params:{clickIsDoc:JSON.stringify(item)}});
    //     return;
    //   }
    //   this.$emit('alertPDF', item)
    // },
    alertPDF (item) {
        debugger
        let data = {
            caseId:item.caseBasicinfoId,
            docId: item.caseDoctypeId,
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
    this.getByMlCaseId();
     var class1 =  document.getElementsByClassName("archiveCatalogueBox");
     console.log('class',class1)
     var class2 = class1[0].parentNode;
     console.log('class',class2)
     class2.style.right = '60px';
     this.host = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST
  }
};
</script>
<style lang="scss">
// @import "@/assets/css/caseHandle/index.scss";
.fullscreen .archiveCatalogueBox{
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
    table{
        text-align: center;
        background: #fdffff;
        td{
            padding: 10px 0;
            min-height: 38px;
            border: 1px solid #7F8185;
        }
        tr{
            td:nth-child(1),td:nth-child(3){
                width: 40px;
            }
        }
    }
}
</style>
