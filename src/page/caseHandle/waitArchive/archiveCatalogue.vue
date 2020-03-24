<template v-if="caseInfo">
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
            卷宗目录
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
                <td>页码</td>
            </tr>
            <tr @click="showCover">
                <td>1</td>
                <td>卷宗封面</td>
                <td>1</td>
            </tr>
            <tr @click="showCover">
                <td>2</td>
                <td>卷内目录</td>
                <td>2</td>
            </tr>
            <tr v-for="(item,index) in caseList" :key="index" @click="alertPDF(item)">
                <td>{{index+3}}</td>
                <td>{{item.name ? item.name :item.evName}}</td>
                <td>{{item.page}}</td>
            </tr>
        </table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="routerArchiveCatalogueDetail" type="primary">排序管理</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: false,
      caseList:[]
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
    getByMlCaseId() {
         this.$store.dispatch("getByMlCaseIdNew", this.caseId).then(
         res=>{
             this.caseList = res.data;
         },
         err=>{
           console.log(err)
         }
       )
    },
    routerArchiveCatalogueDetail () {
        this.$router.push({name:'archiveCatalogueDetail'})
    },
    alertPDF (item) {
      console.log(this.$route.name)
      if(this.$route.name!='archiveCover'){
        this.$router.push({name:'archiveCover',params:{clickIsDoc:JSON.stringify(item)}});
        return;
      }
      this.$emit('alertPDF', item)
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
