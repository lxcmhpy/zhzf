<template>
  <div class="table-style">
    <div class="shadow-box bg-white">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue">&nbsp;</span>
          <span class="title-text">证据包</span>
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
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  props:['name'],
  data() {
    return {
      imgList: [{
          id:'1',
          url:'@/../static/images/img/cluesReview/pic1.jpg',
          name:'上传文件的名称',
      },{
          id:'2',
          url:'@/../static/images/img/cluesReview/pic2.jpg',
          name:'上传文件的名称',
      },{
          id:'3',
          url:'@/../static/images/img/cluesReview/pic3.jpg',
          name:'上传文件的名称',
      },{
          id:'4',
          url:'@/../static/images/img/cluesReview/pic4.jpg',
          name:'上传文件的名称',
      },{
          id:'5',
          url:'@/../static/images/img/cluesReview/pic4.jpg',
          name:'上传文件的名称',
      },
      ],
    }
  }
}
</script>
<style lang="scss" src="@/assets/css/dialogStyle.scss">
/* @import "@/assets/css/dialogStyle.scss"; */
</style>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
