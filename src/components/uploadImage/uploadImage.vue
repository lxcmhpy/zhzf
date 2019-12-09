<template>
  <!-- 图片上传 -->
  <div class="upload_image">
    <template v-for="(item,index) in fileList">
      <div
        :class="fileList[index].showIcon==true? 'pic_upload border_dash':'pic_upload border_solid' "
      >
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          @change="showFile(index)"
          class="img_input"
          :id="setFileId('file',index)"
          value="{$banner['banner_image']}"
        >
        <!--draggable:是否可拖动；@dragstart:元素被拖动;-->
        <div
          class="add_icon"
          v-if="fileList[index].showIcon"
          @click="clickImage(index)"
          @dragenter="ignoreDrag($event)"
          @dragover="ignoreDrag($event)"
          @drop="drop($event,index)"
        >
          <i class="anticon anticon-plus"></i>
        </div>
        <div
          class="img_content"
          v-else
          @mousemove="imgMouseShow(index,true)"
          @mouseout="imgMouseShow(index,false)"
        >
          <img src :id="setFileId('img',index)">
          <!-- 蒙层 -->
          <div :class="fileList[index].imgLayer==true?'img_icon':'hide'">
            <a-icon type="link" class="img_icon_btn" @click="enlargeImage(index)"/>
            <a-icon type="delete" class="img_icon_btn" @click="deleteImage(index)"/>
          </div>
        </div>
      </div>
    </template>
    <enlargeImage ref="enlargeImage"></enlargeImage>
  </div>
</template>

<script>
import Cookies from "@/js/cookies";
import enlargeImage from "@/components/uploadImage/enlargeImage";
//图片上传
export default {
  name: "uploadImage",
  props: {
    showNum: { type: Number, default: 1 } //上传图片数量
  },
  data() {
    return {
      fileList: new Array(this.showNum) //图片文件集合
    };
  },
  components: {
    enlargeImage
  },
  methods: {
    ignoreDrag(ev) {
      // 确保其他元素不会取得该事件
      ev.stopPropagation();
      ev.preventDefault();
    },
    //放置方法：把被拖元素追加到放置元素（目标元素）中
    drop(ev, index) {
      // 确保其他元素不会取得该事件
      ev.stopPropagation();
      ev.preventDefault();
      var data = ev.dataTransfer.files[0];
      this.showPictur(index, data);
    },
    /**控制图片蒙层
     * @param index 数组
     * @param state 是否蒙层 true/false
     */
    imgMouseShow(index, state) {
      this.$set(this.fileList[index], `imgLayer`, state);
      this.$data.fileList = Object.assign({}, this.$data.fileList);
    },

    /**点击弹出input图片上传
     * @param index 数组
     */
    clickImage(index) {
      let fileId = this.setFileId("file", index); //获取input id值
      let clickId = document.getElementById(fileId);
      clickId.click();
    },

    /**设置文件id
     * @param type 类型 file/img
     * @param index 数组
     */
    setFileId(type, index) {
      return type + "_" + index;
    },

    /**显示图片方法
     * @param file 图片文件
     * @param index 数组
     */
    showPictur(index, file) {
      let imgId = this.setFileId("img", index); //获取input id值
      console.log("showPictur", file);
      if (file) {
        if (file.type != "image/png" && file.type != "image/jpeg") {
          console.log("格式错误");
          this.$message.error('格式错误');
        } else if (file.size / 1024 / 1024 > 1) {
          this.$message.error('da');
        } else {
          this.$set(this.fileList[index], `showIcon`, false);
          this.$set(this.fileList[index], `fileImage`, file);
          //一定要加上这句，fileList[index].showIcon 才会渲染
          this.$data.fileList = Object.assign({}, this.$data.fileList);
          this.$util.showFileImage(imgId, this.fileList[index].fileImage);
          this.imgMouseShow(index, false);
        }
      } else {
        this.$set(this.fileList[index], `showIcon`, true);
        this.$set(this.fileList[index], `fileImage`, "");
        //一定要加上这句，fileList[index].showIcon 才会渲染
        this.$data.fileList = Object.assign({}, this.$data.fileList);
        this.$util.showFileImage(imgId, "");
      }
      console.log("showPictur", this.fileList);
    },

    /**选择文件显示图片在方框中
     * @param index file数组序号
     */
    showFile(index) {
      console.log("showFile", index);
      let fileId = this.setFileId("file", index); //获取input id值
      let file = document.getElementById(fileId);
      this.showPictur(index, file.files[0]);
      console.log("showFile", this.fileList);
    },

    /**删除图片
     * @param index file数组序号
     */
    deleteImage(index) {
      let fileId = this.setFileId("file", index); //获取input id值
      let imgId = this.setFileId("img", index); //获取input id值
      let file = document.getElementById(fileId);
      console.log("deleteImage", index, fileId, imgId, file);
      console.log("file.files[index]", file.files, file.files[index]);
      this.showPictur(index, "");
      document.getElementById(fileId).value = "";
    },

    enlargeImage(index) {
      let file = this.fileList[index].fileImage;
      console.log("showFile enlargeImage", file);
      this.$refs.enlargeImage.showEnlargeImage(file);
    },

    //获取图片文件
    getImageFile() {
      if (this.showNum > 1) {
        return this.fileList;
      } else {
        return this.fileList[0];
      }
    },
    init() {
      for (let n = 0; n < this.showNum; n++) {
        this.fileList[n] = {
          fileImage: "",
          showIcon: true, //+图标显示
          imgLayer: false //图片蒙层显示
        };
      }
      console.log("init", this.fileList);
    }
  },
  created() {
    this.init();
  }
};
</script>

