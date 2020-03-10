<template>
    <div style="margin-top:-120px;">
        <template >
            <keep-alive>
              <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="基本信息" name="one" style="width:1500px;margin-left:25px;margin-top:25px;">
                    <personDetailInfo/>
                  </el-tab-pane>
                  <el-tab-pane label="教育调动" name="two" lazy style="width:1500px;margin-left:25px;margin-top:25px;">
                    <education/>
                    <adjustingPosts/>
                  </el-tab-pane>
                  <el-tab-pane label="培训考试" name="three" lazy style="width:1500px;margin-left:25px;margin-top:25px;">
                    <train/>
                    <exam/>
                  </el-tab-pane>
                  <el-tab-pane label="奖励惩罚" name="four" lazy style="width:1500px;margin-left:25px;margin-top:25px;">
                    <reward/>
                    <punishment/>
                  </el-tab-pane>
                  <el-tab-pane label="证明材料" name="five" lazy style="width:1500px;margin-left:25px;margin-top:25px;">
                    <material/>
                  </el-tab-pane>
                  <el-tab-pane label="证件信息" name="six" lazy style="width:1500px;margin-left:25px;margin-top:25px;">
                    <approval/>
                    <certificates/>
                    <annualReview/>
                  </el-tab-pane>
              </el-tabs>
            </keep-alive>
        </template>
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
    import material from './material'
    
    export default {
        name: "personInfo",//人员详情总页面
        data(){
          return {
            activeName:'one',
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
          material
        },
        methods:{
          handleClick(tab, event) {

          },
        },
    }
</script>

<style lang="scss" scoped>
 @import "@/assets/css/personManage.scss";
 .el-tabs__nav is-top{
   transform: translateX(400px);
 }
</style>
