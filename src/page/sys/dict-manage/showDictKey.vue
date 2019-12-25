<template>
  <el-dialog
    title="字典详情"
    :visible.sync="visibleDetail"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
  >
    <el-button type="primary" size="medium" icon="el-icon-plus" @click="addDictkey">新增</el-button>

    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="300px">
        <!-- <el-table-column prop="pName" label="字典标签" align="center"></el-table-column> -->
        <el-table-column prop="name" label="字典值" align="center"></el-table-column>
        <el-table-column prop="notes" label="描述" align="center"></el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editDictKey(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteDictKey(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visibleDetail = false">取 消</el-button>
      <!-- <el-button type="primary" @click="addOrEditDict('addDictForm')">确 定</el-button> -->
    </span>
    <addEditDict ref="addEditDictRef" @getDetail="showModal"></addEditDict>
  </el-dialog>
</template>
<script>
import addEditDict from "./addEditDict";
export default {
  data() {
    return {
      visibleDetail: false,
      tableData:[],
      dictId:'', //字典id
      //dictName:'', //name
    };
  },
  components: {
    addEditDict
  },
  inject: ["reload"],
  methods: {
    showModal(row) {
        console.log(row);
      this.visibleDetail = true;
      this.dictId = row.id;
      //this.dictName = row.name;
      this.getDictKeyList();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visibleDetail = false;
    },
    //获取字典值
    getDictKeyList(){
        this.$store.dispatch("getDictListDetail",this.dictId).then(
        res => {
          console.log("字典值列表", res);
          this.tableData = res.data;
          // this.tableData.forEach(item=>{
          //     item.pName = this.dictName
          // })
        },
        err => {
          console.log(err);
        }
      );
    },
    //新增字典值
    addDictkey(){
        let data={
            id:'',
            pid:this.dictId,
            leng:this.tableData.length
        }
      this.$refs.addEditDictRef.showModal(0, data,'detail');
    },
    //编辑字典值
    editDictKey(row){
        let data = {
            row:row,
            pid:this.dictId,
        }
      this.$refs.addEditDictRef.showModal(2, data,'detail');
    },
    //删除字典
    deleteDictKey(id){
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("deleteDict", id).then(
            res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getDictKeyList();
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
  },
  created() {
    // this.getDictKeyList();
  }
};
</script>
<style lang="less">
@import "../../../css/systemManage.less";
</style>