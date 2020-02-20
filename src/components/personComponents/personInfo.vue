<template>
  <div style="left: 18%">
    <div style="width:1000px;height: 38%;text-align: center">
      <template>
        <personDetailInfo/>
      </template>
    </div>
    <div>
      <br><br>
    </div>
    <div style="width:1000px;height: 62%;left:18%;border:1px solid #e4e7ed;">
      <template>
          <keep-alive>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="审批信息" name="one">
                <approval/>
              </el-tab-pane>
              <el-tab-pane label="教育信息" name="two">
                <education/>
              </el-tab-pane>
              <el-tab-pane label="培训信息" name="three">
                <train/>
              </el-tab-pane>
              <el-tab-pane label="考试信息" name="four">
                <exam/>
              </el-tab-pane>
              <el-tab-pane label="奖励信息" name="five">
                <reward/>
              </el-tab-pane>
              <el-tab-pane label="惩罚信息" name="six">
                <punishment/>
              </el-tab-pane>
              <el-tab-pane label="年审信息" name="seven">
                <annual-review/>
              </el-tab-pane>
              <el-tab-pane label="审批记录" name="night">
                <approvalRecord/>
              </el-tab-pane>
              <el-tab-pane label="调岗信息" name="nine">
                <adjusting-posts/>
              </el-tab-pane>
              <el-tab-pane label="证件信息" name="ten">
                <certificates/>
              </el-tab-pane>
            </el-tabs>
          </keep-alive>
      </template>
    </div>
  </div>
</template>

<script>
    import train from './train'
    import reward from './reward'
    import punishment from './punishment'
    import personDetailInfo from './personDetailInfo'
    import exam from './exam'
    import education from './education'
    import certificates from './certificates'
    import approval from './approval'
    import annualReview from './annualReview'
    import adjustingPosts from './adjustingPosts'
    import approvalRecord from './approvalRecord'

    export default {
        name: "personInfo",//人员详情总页面
        data(){
          return {
            activeName:'one',
          }
        },
        components:{
          train,
          reward,
          punishment,
          personDetailInfo,
          exam,
          education,
          certificates,
          approval,
          annualReview,
          adjustingPosts,
          approvalRecord
        },
        methods:{
          handleClick(tab, event) {
            //console.log(tab, event);
          },

        },
    }
</script>

<style scoped>

</style>
