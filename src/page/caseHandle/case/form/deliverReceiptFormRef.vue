<template v-if="caseInfo">
<div>
  <el-dialog
    custom-class="leftDialog leftDialog2 archiveCatalogueBox deliverCaBox"
    :visible.sync="visible"
    @close="closeDialog"
    :top="fatherCom==='inforCollection' ? '95px':'33px'"
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
  props: {
    fatherCom: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,
      caseList:[],
      mlList: "",
      pdfVisible: false,
      // doccloseDialog: false,
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
    alertPDF (item) {
        let data = {
            caseId:item.caseId,
            docDataId: item.caseSerProofId,
            docId: '2c9029cf6931aa5c01693381ac690018',
        };
        let _that = this;
        console.log('item',item)
       
        this.$store.dispatch("getFile", {
          docId: data.docId,
          caseId: data.caseId,
        }).then(
          res => {
            console.log('地址1',res);
            //单份文书取一个
            if (res.length == 1) {
              this.getFileStream(res[0].storageId)
            }else{
              //多份文书按照docDataId取地址
              for (var i = 0; i < res.length; i++) {
                if (data.docDataId && data.docDataId == res[i].docDataId) {
                  console.log('res[i].storageId', res[i].storageId);
                  this.getFileStream(res[i].storageId)
                  break;
                }
              }
            }
          },
          err => {
            console.log(err);
          }
        );

        this.indexPdf = 0;
        this.pdfVisible = true
    },
    //根据stroagId请求文件流
      getFileStream(storageId){
        //设置地址
        this.$store.commit("setDocPdfStorageId", storageId);
        getFileStreamByStorageIdApi(storageId).then(res=>{
        // getFileStreamByStorageIdApi('12,13ac7d04e13f').then(res=>{

          console.log(res);
          this.getObjectURL(res);
        }).catch(err=>{
          console.log(err);
        })
      },
      // 将返回的流数据转换为url
      getObjectURL(file) { 
        let url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          try {
            url = window.webkitURL.createObjectURL(file);
          } catch (error) {

          }
        } else if (window.URL != undefined) { // mozilla(firefox)
          try {
            url = window.URL.createObjectURL(file);
          } catch (error) {

          }
        }

        this.pdfUrl =url;
      },
    //显示封面
    showCover(){
      if(this.$route.name!='case_handle_archiveCover'){
        let item={name:'cover'}
        this.$router.push({name:'case_handle_archiveCover',params:{clickIsDoc:JSON.stringify(item)}});
        return;
      }
      this.$emit('showCoverEmit')
    }
  },
  mounted () {
      let class1 =  document.getElementsByClassName("deliverCaBox");
      let class2 = class1[0].parentNode;
      class2.style.right = '60px';
      class2.style.top = '60px';
      class2.style.overflow = 'hidden';
  }
};
</script>

