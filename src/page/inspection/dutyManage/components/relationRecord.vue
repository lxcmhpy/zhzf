<template>
  <!-- 现场记录 -->
  <el-dialog
    title="现场记录"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="64%"
    class="relation-record-dialog"
  >
    <el-table
      ref="journalTableRef"
      :data="tableData"
      resizable
      stripe
      v-loading="tableLoading"
      element-loading-spinner="car-loading"
      element-loading-text="加载中..."
      style="width: 100%;height:100%;"
      @selection-change="selectRecord"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="recordNum" label="记录编号" align="left" width="100px"></el-table-column>
      <el-table-column prop="checkStartTime" label="巡查时间" align="center" min-width="140px"></el-table-column>
      <el-table-column prop="address" label="定位地点" align="center" min-width="220px"></el-table-column>
      <el-table-column prop="roadName" label="路段名称" align="center" min-width="180px"></el-table-column>
      <el-table-column prop="roadCondition" label="路段信息" align="center" min-width="220px"></el-table-column>
      <el-table-column prop="routeSituation" label="路段情况" align="center" width="120px"></el-table-column>
      <el-table-column prop="lawPerson" label="案件编号" align="center" min-width="140px"></el-table-column>
    </el-table>
      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="selectList.length === 0">关 联</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getRecordListApi} from '@/api/supervision';
export default {
  props: {},
  data() {
    return {
      visible: false,
      selectList: [],
      tableLoading: false,
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10,   //pagesize
      totalPage: 0,   //总页数
    };
  },
  computed: {},
  created() {},
  methods: {
    // 获取现场记录列表
    getRecordList(){
        console.log('查询列表');
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRecordList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRecordList();
    },
    // 选择关联记录
    selectRecord(val){
      this.selectList = val;
    },
    // 关联
    submit() {
       let data= [];
      data=this.selectList;
      this.$emit("returnDataRecord",data);
      this.visible = false;
    },
     showModal(businessType,recordIds) {
      this.visible = true;
      let data={
       // cateId:businessType,
      }
       getRecordListApi(data).then(res => {
        if (res.code == "200") {
          recordIds.forEach((rec,index1) =>{
                res.data.records.forEach((element,index) => {
                if(element.recordId == rec){
                  res.data.records.splice(index,1);
                }
          });
          })
          
          this.tableData = res.data.records;
          //this.totalPage = res.data.total;
        }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
