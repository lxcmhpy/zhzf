<template>
  <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
    <div class="el-table__body-wrapper is-scrolling-none">
      <table class="el-table__body">
        <tr class="el-table__row">
          <td class="el-table_column_center"><p>年龄≧18周岁</p></td>
          <td class="el-table_column_center">44</td>
          <td class="el-table_column_center">符合</td>
          <td class="el-table_column_center"><p>身份证</p></td>
          <td class="el-table_column_center">{{this.$route.params.personInfo.idNo}}</td>
          <td class="el-table_column_center">未上传</td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_center"><p>学历大专以上</p></td>
          <td class="el-table_column_center">大学本科</td>
          <td class="el-table_column_center">不符合</td>
          <td class="el-table_column_center"><p>编制证明 </p></td>
          <td class="el-table_column_center">未上传</td>
          <td class="el-table_column_center"><span style="color:red">不符合</span></td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_center"><p>培训成绩</p></td>
          <td class="el-table_column_center">无成绩</td>
          <td class="el-table_column_center">不符合</td>
          <td class="el-table_column_center"><p>学历证明 </p></td>
          <td class="el-table_column_center">未上传</td>
          <td class="el-table_column_center"><span style="color:red">不符合</span></td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_center"><p>考试成绩</p></td>
          <td class="el-table_column_center">无成绩</td>
          <td class="el-table_column_center">符合</td>
          <td class="el-table_column_center" colspan="3"></td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_center" colspan="2"><p>曾经是否持有证件</p></td>
          <td class="el-table_column_center">是</td>
          <td class="el-table_column_center" colspan="2">旧证件状态</td>
          <td class="el-table_column_center"><p>正常</p></td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_center" colspan="6"><p><i class="el-icon-caret-right"></i>审批进程<i class="el-icon-caret-left"></i></p></td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_center" colspan="3"><p>当前审批单位</p></td>
          <td class="el-table_column_center" colspan="3"><p>无审批单位</p></td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_column_center" colspan="3"><p>审批流</p></td>
          <td class="el-table_column_center" colspan="3"><p>无</p></td>
        </tr>
      </table>
      <el-table
        :data="tableData"
        align="center"
        style="width: 100%;height:315px;">
        <el-table-column prop="oid" label="审批单位"></el-table-column>
        <el-table-column prop="approveStatus" label="审批状态"></el-table-column>
        <el-table-column prop="userId" label="审批人"></el-table-column>
        <el-table-column prop="approveInfo" label="审批信息"></el-table-column>
        <el-table-column prop="operationDate" label="操作审批时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "approval",//审批记录组件
        data(){
          return {
            tableData: [],
            currentPage: 1, //当前页
            pageSize: 20,   //pagesize
          }
        },
        methods:{
          getApprovalRecordInfo(){
            let paramsData={
              current: this.currentPage,
              size: this.pageSize,
              personId: this.$route.params.personInfo.personId,
            }
            this.$store.dispatch("getApproveMoudled",paramsData).then(res=>{
                  this.tableData = res.data.records;
            });
            error=>{
              console.info(error);
            };
          }
        },
        created(){
          this.getApprovalRecordInfo();
        }
    }
</script>

<style scoped>
  @import "./../../css/personManage.less";
</style>

