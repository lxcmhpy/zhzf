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
            <li v-for="(item, index) in imgList" :key="item.id" :class="(index+1)%4==0?'margin-right0':''" @click="dialogPDFVisible = true">
              <div class="img-url">
                <img :src="item.url" alt="" />
              </div>
              <div class="img-title">
                {{item.name}}
              </div>
            </li>
            <!-- <li>
                  <div class="img-url-upload">
                  <img src="@/../static/images/img/cluesReview/icon_weizhi.png" alt=""/>
                  </div>
                  <div class="img-title">
                  点击上传
                  </div>
              </li> -->
            <li v-for="index in 2" :key="index" :class="(index+1)%2==1?'margin-right0':''">
              <div class="demo-image__preview">
                <el-image class="img" style="width: 100px; height: 100px" :src="'./static/images/img/temp/sp.jpg'" :preview-src-list="['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg','https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg']">
                </el-image>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <el-dialog title="PDF展示" :visible.sync="dialogPDFVisible" append-to-body width="1200px">
      <div>
        <embed class="print_info" style="padding:0px;width: 730px;position:relative" name="plugin" id="plugin" :src="storagePath" type="application/pdf" internalinstanceid="29">
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogPDFVisible: false,
      storagePath:'',
      imgList: [{
        id: '1',
        url: '@/../static/images/img/cluesReview/pic1.jpg',
        name: '称重数据',
      }, {
        id: '2',
        url: '@/../static/images/img/cluesReview/pic2.jpg',
        name: '现场照片',
      },
        // {
        //     id:'3',
        //     url:'@/../static/images/img/cluesReview/pic3.jpg',
        //     name:'证据材料',
        // },{
        //     id:'4',
        //     url:'@/../static/images/img/cluesReview/pic4.jpg',
        //     name:'相关说明',
        // }
      ],
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/dialogStyle.scss";
</style>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
