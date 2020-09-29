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
      <el-table-column prop="recordNum" label="记录编号" align="center" ></el-table-column>
            <el-table-column prop="checkStartTime" label="巡查时间" align="center" min-width="140px">
               <template slot-scope="scope" class="person-table-onerow">
                  <div >{{scope.row.checkStartTime}}</div>
                  <div >{{scope.row.checkEndTime}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="personNames" label="巡查人员" align="center" ></el-table-column>
            <el-table-column prop="roadNum" label="巡查路线" align="center" ></el-table-column>
            <el-table-column prop="roadName" label="路段名称" align="center" ></el-table-column>
            <!-- <el-table-column prop="routeInfo" label="桩号" align="center" ></el-table-column> -->
            <el-table-column prop="routeInfo" label="桩号" align="center" >
              <template slot-scope="scope">
              <div >K{{scope.row.startKilometer}}+{{scope.row.startMeter}}m</div>
              <div >K{{scope.row.endKilometer}}+{{scope.row.endMeter}}m</div>
            </template>
            </el-table-column>
            <el-table-column prop="routeSituation" label="路段情况" align="center" >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.roadCondition === '1'"
                  style="color: #05C051;"
                >正常</span>
                <span
                  v-else-if="scope.row.roadCondition === '2'"
                  style="color: #E84241;"
                >异常</span>
                <span v-else>{{scope.row.roadCondition}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="caseTempNos" label="案件编号" align="center" ></el-table-column>
              <!-- <template slot-scope="scope">
                <span v-if="scope.row.filingCase === '1'">否</span>
                <el-button v-else type="text" @click="checkCase(scope.row)">查看案件</el-button>
              </template> -->
            </el-table-column>
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
     showModal(data) {
       let data1 ={
         checkStartTime:data.checkStartTime,
         checkEndTime:data.checkEndTime,
         personIds:data.personIds,
        current: this.currentPage,
        size: this.pageSize
       }
      this.visible = true;
       getRecordListApi(data1).then(res => {
        if (res.code == "200") {
          if(data.recordsIds != '' && data.recordsIds != [] && data.recordsIds != undefined){
              data.recordsIds.forEach((rec,index1) =>{
                res.data.records.forEach((element,index) => {
                if(element.recordId === rec){
                  res.data.records.splice(index,1);
                }
          });
          })
          }
       
          
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
