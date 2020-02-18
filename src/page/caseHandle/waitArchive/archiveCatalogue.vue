<template>
  <el-dialog
    title="卷宗目录"
    custom-class="leftDialog leftDialog2"
    :visible.sync="visible"
    @close="closeDialog"
    top="60px"
    width="405px"
    :modal="false"
    :show-close="false"
  >
    <!-- <div class="haha" v-show="visible">
      <div class="archiveCatalogueHead">卷宗目录</div>
      <div class="archiveCatalogueCon"></div>
      <div class="archiveCatalogueFoot">排序管理</div>

    </div> -->
    <div class="archiveCatalogueBox">
        <table border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
                <td>序号</td>
                <td>文书名称</td>
                <td>页码</td>
            </tr>
            <tr v-for="(item,index) in caseList" :key="index">
                <td>{{index+1}}</td>
                <td>{{item.name}}</td>
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
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    }
    
  }
};
</script>
<style lang="less">
// @import "../../../css/caseHandle/index.less";
.archiveCatalogueBox{
    table{
        text-align: center;
        td{
            padding: 10px 0;
            border: 1px solid #000;
        }
        tr{
            td:nth-child(1),td:nth-child(3){
                width: 40px;
            }
        }
    }
}
</style>
