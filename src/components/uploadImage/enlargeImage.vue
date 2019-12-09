<template>
  <!-- 放大图片 -->
  <a-modal
    title
    :visible="visible"
    :closable="true"
    :centered="true"
    @cancel="handleCancel"
    :footer="null"
  >
    <div class="large_image">
      <img id="img1">
    </div>
  </a-modal>
</template>
<script>
export default {
  name: "enlargeImage",
  data() {
    return {
      visible: false
    };
  },

  methods: {
    showEnlargeImage(imageSrc) {
      this.visible = true;
      this.$util.showFileImage("img1", imageSrc);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    }
  }
};
</script>