<template>
  <div style="left: 18%">
    <div style="width:1000px;height: 38%;text-align: center">
      <template>
        <personDetailInfo/>
      </template>
    </div>
    <div style="width:1000px;height:650px;left:18%;border:1px solid #e4e7ed;">
        <template >
            <keep-alive>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="审批信息" name="one">
                    <approval/>
                  </el-tab-pane>
                  <el-tab-pane label="教育信息" name="two" lazy>
                    <education/>
                  </el-tab-pane>
                  <el-tab-pane label="培训信息" name="three" lazy>
                    <train/>
                  </el-tab-pane>
                  <el-tab-pane label="考试信息" name="four" lazy>
                    <exam/>
                  </el-tab-pane>
                  <el-tab-pane label="奖励信息" name="five" lazy>
                    <reward/>
                  </el-tab-pane>
                  <el-tab-pane label="惩罚信息" name="six" lazy>
                    <punishment/>
                  </el-tab-pane>
                  <el-tab-pane label="年审信息" name="seven" lazy>
                    <annualReview/>
                  </el-tab-pane>
                  <el-tab-pane label="审批记录" name="night" lazy>
                    <approvalRecord/>
                  </el-tab-pane>
                  <el-tab-pane label="调岗信息" name="nine" lazy>
                    <adjustingPosts/>
                  </el-tab-pane>
                  <el-tab-pane label="证件信息" name="ten" lazy>
                    <certificates/>
                  </el-tab-pane>
                </el-tabs>
            </keep-alive>
        </template>
      </div>
    </div>
</template>

<script>
    import approval from './approval'
    import personDetailInfo from './personDetailInfo'
    import train from './train'
    import reward from './reward'
    import punishment from './punishment'
    import exam from './exam'
    import education from './education'
    import certificates from './certificates'
    import annualReview from './annualReview'
    import adjustingPosts from './adjustingPosts'
    import approvalRecord from './approvalRecord'

    export default {
        name: "personInfo",//人员详情总页面
        data(){
          return {
            activeName:'one',
            divStyle:"divStyle",
          }
        },
        components:{
          personDetailInfo,
          approval,
          education,
          train,
          exam,
          reward,
          punishment,
          annualReview,
          approvalRecord,
          adjustingPosts,
          certificates,
        },
        methods:{
          handleClick(tab, event) {
            
          },
        },
    }
</script>

<style scoped>
 @import "./../../css/personManage.less";
</style>
