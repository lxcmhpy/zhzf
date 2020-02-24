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
        <div class="catalogueTitle" @click="routerArchiveCatalogueDetail">
            <!-- 卷宗目录 -->
            案件：{{caseInfo.caseNumber}}
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
            <tr v-for="(item,index) in caseList" :key="index">
                <td>{{index+1}}</td>
                <td>{{item.docName}}</td>
                <td>{{item.page}}</td>
            </tr>
        </table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary">排序管理</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      caseId: this.caseInfo.id,
      caseList:[
          {name:"文书名称",page:1},
          {name:"文书名称",page:1},
          {name:"文书名称",page:1},
          {name:"文书名称",page:1},
          {name:"文书名称",page:1},
          {name:"文书名称文书名称文书名称文书名称文书名称文书名称",page:1},
          {name:"文书名称文书名称文书名称文书名称文书名称文书名称",page:1},
          {name:"文书名称文书名称文书名称文书名称文书名称文书名称",page:1},
          {name:"文书名称文书名称文书名称文书名称文书名称文书名称",page:1},
          {name:"文书名称文书名称文书名称文书名称文书名称文书名称",page:1},
          {name:"文书名称文书名称文书名称文书名称文书名称文书名称",page:1},
          {name:"文书名称文书名称文书名称文书名称文书名称文书名称",page:1}
         ]
    };
  },
  inject: ["reload"],
  props: ["caseInfo"],
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    getByMlCaseId(caseId) {
         this.$store.dispatch("getByMlCaseId", caseId).then(
         res=>{
             this.caseList = res.data
         },
         err=>{
           console.log(err)
         }
       )
    },
    routerArchiveCatalogueDetail () {
        this.$router.push({name:'archiveCatalogueDetail',params: {
           caseInfo: this.caseInfo,
           caseList: this.caseList
        }})
    }
  },
  mounted () {
      this.getByMlCaseId(this.caseId)
  }
};
</script>
<style lang="scss">
// @import "@/assets/css/caseHandle/index.scss";
.archiveCatalogueBox{
    background: #EAEDF4;
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
