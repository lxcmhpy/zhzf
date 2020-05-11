<template>
  <div>
    <div class="card-title">
      <font class="font" style="font-size:25px;"><span class="titleflag"></span>审批信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="text" round style="margin-right:25px;float:right;" icon="el-icon-time" size="medium" @click="approvalHistory">审批历史</el-button>
    </div>
    <div >
      <div style="margin-top:35px;margin-bottom:25px;margin-left:25px;">
        <div class="approval-steps" style="margin-bottom: 30px;">
          <div class="steps-label"><i class="dot"/>审批流</div>
          <div v-if="tableData.length" class="steps-wrap">
            <div class="steps-item"
              v-for="(item, $index) in tableData"
              :key="item.approveId">
              <i v-if="$index > 0" class="split-line"/>
              <span class="step-num">{{ $index + 1 }}</span>
              <span class="step-text">{{ item.oname }}</span>
            </div>
          </div>
        </div>
        <div class="approval-steps">
          <div class="steps-label"><i class="dot"/>当前审批单位</div>
          <div class="steps-wrap" v-if="currentOname && currentOname.oname">
            <div class="steps-item current-approval">
              <span class="step-num">1</span>
              <span class="step-text">{{ currentOname.oname }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table
        style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"  resizable   align="center"      
        stripe>
        <el-table-column prop="approveId" label="id" v-if="false"></el-table-column>
        <el-table-column prop="oname" label="审批单位" align="center"></el-table-column>
        <el-table-column prop="approveStatusName" label="审批状态" align="center"></el-table-column>
        <el-table-column prop="userName" label="审批人" align="center"></el-table-column>
        <el-table-column prop="approveInfo" label="审批信息" align="center"></el-table-column>
        <el-table-column prop="operationDate" label="操作审批时间" align="center"></el-table-column>
      </el-table>
      <div class="paginationBox" style="margin-top:-25px;margin-bottom:10px;margin-left:40%;">
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
  </div>
  <approvalHistory ref="approvalHistoryRef" :params="params" @getApprovalHistory="getApprovalRecordInfo"></approvalHistory>
  </div>
</template>
<script>
import approvalHistory from '@/page/person/person-apply/approveHistory';
import {mixinPerson} from '@/common/js/personComm';
export default {
  name: "approval",//审批记录组件
  mixins:[mixinPerson],
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: 'add', id: '' }
      },
      required: true
    }
  },
  data(){
    return {
      tableData:[],
      personId: this.params.id,
      approveId:'',
      currentOname: {oname: ''}
    }
  },
  components:{
    approvalHistory
  },
  methods:{
     //更改每页显示的条数
    handleSizeChange(val) {
      let _this = this
      _this.pageSize = val;
      this.getApprovalRecordInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      let _this = this
      _this.currentPage = val;
      _this.getApprovalRecordInfo();
    },
    approvalHistory(){
      this.$refs.approvalHistoryRef.showModal(this.approveId);
    },
    getApprovalRecordInfo(){
      let _this = this
      if(_this.params.type == 'edit' || _this.params.type == 'view'){
        this.$store.dispatch("getLastApproveRecord", _this.personId).then(res => {
          this.tableData = res.data;
          this.approveId = res.data[0] ? res.data[0].approveId : '';
          // this.oname = res.data[0].oname;
          this.currentOname = this.tableData.find(item => item.approveStatusName === '资格审批');
        });
        err => {
          console.log(err);
        };
      }
    }
  },
  created(){
    this.getApprovalRecordInfo();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
>>>.el-button--text{
  color: #7B7B7B;
  font-weight: 500;
  &:hover{
    color: #4573D0;
  }
}
.approval-steps{
  display: flex;
  .steps-label{
    display: inline-block;
    width: 120px;
    line-height: 24px;
    margin-right: 20px;
    color: #7B7B7B;
    .dot{
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 0px 5px;
      background:#228B22  none repeat scroll 0% 0%;
      margin-top:4px;
    }
  }
  .steps-wrap{
    display: flex;
    flex-wrap: wrap;
    .steps-item{
      margin-bottom: 10px;
      .split-line{
        display: inline-block;
        width: 100px;
        height: 1px;
        background: rgba(123, 123, 123, 0.5);
        margin: 0 20px;
        margin-bottom: 5px;
      }
      .step-num{
        display: inline-block;
        width:24px;
        height:24px;
        line-height: 24px;
        border-radius: 50%;
        background:rgba(69,115,208,1);
        color: #fff;
        font-size: 14px;
        text-align: center;
        margin-right: 6px;
      }
      .step-text{
        color: #20232B;
      }
      &.current-approval{
        .step-text{
          color: #E8A80E;
        }
        .step-num{
          background:rgba(232,168,14,1);
        }
      }
    }
  }
}
</style>

