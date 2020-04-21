<template v-if="caseInfo">
  <el-dialog
    custom-class="leftDialog leftDialog2 archiveCatalogueBox"
    :visible.sync="visible"
    @close="closeDialog"
    width="405px"
    top="0"
    :modal="false"
    :show-close="false"
    :append-to-body="true"
  >
    <template slot="title">
        <div class="catalogueTitle">
            <img src="../../../../static/images/img/caseList.svg">
            卷宗目录
            <!-- 案件：{{caseInfo.caseNumber}} -->
        </div>
    </template>
    <!-- <div class="haha" v-show="visible">
      <div class="archiveCatalogueHead">卷宗目录</div>
      <div class="archiveCatalogueCon"></div>
      <div class="archiveCatalogueFoot">排序管理</div>

    </div> -->
    <div class="a">
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
                <td>序号</td>
                <td>材料名称</td>
                <td>页码</td>
            </tr>
            <tr v-for="(item,index) in caseList" :key="index" @click="alertPDF(item)" :class="!item.storageId && item.name=='备考表' ? 'activeTd' :''">
                <td>{{index+1}}</td>
                <td>{{item.name ? item.name :item.evName}}</td>
                <td>{{item.page}}</td>

            </tr>
        </table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="routerArchiveCatalogueDetail" type="primary" icon="iconfont law-paixu"> 排序管理</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: false,
      caseList:[],
      getData:false,
    };
  },
  inject: ["reload"],
  // props: ["caseInfo"],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal(refresh) {
      console.log('show');
      this.visible = true;
      console.log(this.visible);
      // if(!this.caseList.length){
      //   this.getByMlCaseId();
      // }
      console.log('this.getData',this.getData)
      if(refresh || !this.getData) this.getByMlCaseId();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      // this.getData = false;
    },
    getByMlCaseId() {
        this.getData = true;
         this.$store.dispatch("getByMlCaseIdNew", this.caseId).then(
         res=>{
           console.log('res.data',res.data);
            res.data = res.data.sort(function(a,b){
              return a.num - b.num;
            });
             this.caseList = res.data;
         },
         err=>{
           console.log(err)
         }
       )
    },
    routerArchiveCatalogueDetail () {
        this.$router.push({name:'case_handle_archiveCatalogueDetail'})
    },
    //点击卷宗目录列表
    alertPDF (item) {
      console.log(this.$route.name)
      if(this.$route.name!='case_handle_archiveCover'){
        this.$router.push({name:'case_handle_archiveCover',params:{clickData:JSON.stringify(item),mulvList:this.caseList}});
        return;
      }
      // this.$emit('alertPDF', {item:item,mulvList:this.caseList})
      console.log('item',item)
      this.$store.commit("setClickArchiveCatalogue", item);
      this.$store.commit("setArchiveCatalogueList", this.caseList);

    },
    //显示封面
    // showCover(){
    //   if(this.$route.name!='archiveCover'){
    //     let item={name:'cover'}
    //     this.$router.push({name:'archiveCover',params:{clickIsDoc:JSON.stringify(item)}});
    //     return;
    //   }
    //   this.$emit('showCoverEmit')
    // },
    currentPages(row,index){
      var rowIndex = index;
      let tempPage = '';
      let qianPage = 0;
      let pageStart=0;
      let pageEnd=0;
      this.caseList.forEach((item,index)=>{
        if(rowIndex > index){
          qianPage = qianPage + Number(item.page);
        }
      })
      if(row.page>1){
        pageStart = qianPage+1;
        pageEnd = qianPage+ Number(row.page);
        tempPage = pageStart + '~' + pageEnd
      }else{
        pageStart = qianPage+1;
        tempPage = pageStart;
      }
      return tempPage
    },
    //设置弹窗左偏移
    setRight(){
      console.log('设置弹窗左偏移')
      let class1 =  document.getElementsByClassName("archiveCatalogueBox");
      let class2 = class1[0].parentNode;
      class2.style.right = '60px';
      class2.style.top = '60px';
      class2.style.overflow = 'hidden';
    }
  },
  mounted () {
    // this.getByMlCaseId();
    //设置弹窗遮罩层不要遮到右侧快捷菜单
    this.setRight();
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
            img{
              height: 30px;
              vertical-align: middle;
            }
        }
    }
    table{
        text-align: center;
        background: #fdffff;
        td{
            padding: 10px 0;
            min-height: 38px;
            border: 1px solid #7F8185;
            cursor: pointer;
        }
        tr{
            td:nth-child(1),td:nth-child(3){
                width: 40px;
            }
        }
        .activeTd{
          td{
            color: red;
          }
        }
    }
}
</style>
