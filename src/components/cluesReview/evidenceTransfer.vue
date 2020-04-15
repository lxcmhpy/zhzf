<template>
  <div class="table-style">
    <div class="shadow-box bg-white">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue">&nbsp;</span>
          <span class="title-text">转办证据</span>
        </div>
        <div class="evidence-img">
          <ul>
              <li v-for="(item, index) in imgList" :key="item.id" :class="(index+1)%4==0?'margin-right0':''">
                  <div class="img-url">
                  <img :src="item.url" alt=""/>
                  </div>
                  <div class="img-title">
                  {{item.name}}
                  </div>
              </li>
              <li>
                  <div class="img-url-upload">
                  <img src="@/../static/images/img/cluesReview/icon_weizhi.png" alt=""/>
                  </div>
                  <div class="img-title">
                  点击上传
                  </div>
              </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [{
          id:'',  
          url:'@/../static/images/img/cluesReview/pic1.jpg',
          name:'上传文件的名称',
      },{
          id:'',  
          url:'@/../static/images/img/cluesReview/pic2.jpg',
          name:'上传文件的名称',
      },{
          id:'',  
          url:'@/../static/images/img/cluesReview/pic3.jpg',
          name:'上传文件的名称',
      },{
          id:'',  
          url:'@/../static/images/img/cluesReview/pic4.jpg',
          name:'上传文件的名称',
      },{
          id:'',  
          url:'@/../static/images/img/cluesReview/pic4.jpg',
          name:'上传文件的名称',
      },
      ],
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/cluesReview.scss";
</style>
