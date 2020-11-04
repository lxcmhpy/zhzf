<template>
  <div class="case">
    <div>
      <!-- <p>ly(2、4、5、6、7、8、9、10文书表单及pdf打印版)</p> -->
      <ul>
        文书：
        <li @click="go('case_handle_importantCaseTeamDissDoc_SC')">重大案件集体讨论记录-SC</li>
        <li @click="go('case_handle_importantCaseCheckOpinion_SC')">重大行政处罚法制审核意见书</li>
        

       
        
       
      </ul>
    </div>

  </div>
</template>
<script>

export default {
  data() {
    return {};
  },

  methods: {
    go(routerName){
      this.$router.push({name:routerName})
    }
  }
};
</script>
<style lang="scss">
.case {
  overflow: hidden;
  position: absolute;
  width: 100%;
  & > div {
    width: 30%;
    float: left;
    border-right: 1px solid #ccc;
    padding: 20px;
    box-sizing: border-box;
    p {
      font-size: 20px;
    }
    li {
      cursor: pointer;
      line-height: 30px;
    }
    .text-red {
      color: red;
    }
  }
}
</style>
