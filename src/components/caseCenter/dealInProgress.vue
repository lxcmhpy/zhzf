<template>
  <div class="table-style">
    <div class="shadow-box bg-white">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue"></span>
          <span class="title-text">执行情况</span>
              <el-button type="primary" style="float:right;margin-bottom:5px"  @click="goConfirmCase">查看</el-button>
        </div>
        <table>
          <tr>
            <td class="table-bg">案由</td>
            <td></td>
            <td class="table-bg">案号</td>
            <td class="search-tr">
              <span class="search-text"></span>
              <!-- <el-button type="primary" style="position:absolute;right:-100px;top: 130px;">查看</el-button> -->
            </td>
          </tr>

          <tr>
            <td class="table-bg">立案时间</td>
            <td></td>
            <td class="table-bg">立案机构</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">执法人员</td>
            <td></td>
            <td class="table-bg">结案时间</td>
            <td></td>
          </tr>
        </table>
      </div>

    </div>
    <confirmCaseDialog ref="confirmCaseDialogRef" @getNewData="goConfirmCaseData"></confirmCaseDialog>

  </div>
</template>
<script>
import confirmCaseDialog from '@/components/cluesReview/confirmCase.vue'

export default {
   components: {
    confirmCaseDialog
  },
  data() {
    
    return {
      

    }
  },
  methods: {

    goConfirmCaseData(){},
    getNewData(){},
    goConfirmCase(){
      console.log('跳转案件')
      let data={
        title:'查看案件详情',
        message:'是否进入案件办理系统，查看当前案件详情'
      }
      this.$refs.confirmCaseDialogRef.showModal(data);
    }
  },


}
</script>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
