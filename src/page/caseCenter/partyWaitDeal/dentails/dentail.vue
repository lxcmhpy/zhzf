<template>
  <div class="main-box">
    <dealNotes></dealNotes>
    <div class="shadow-box bg-white">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue">&nbsp;</span>
          <span class="title-text">上传材料</span>
        </div>
        <el-form style="margin-top:22px">
             <el-form-item>
          <el-input placeholder="请输入内容" v-model="input2">
            <template slot="append">上传证据</template>
          </el-input>
        </el-form-item>
        </el-form>
       

      </div>

    </div>
    <evidencePackage></evidencePackage>

  </div>
</template>
<script>
import dealNotes from '@/components/caseCenter/dealNotes.vue'
import evidencePackage from '@/components/caseCenter/evidencePackage.vue'
export default {
  components: {
    dealNotes,
    evidencePackage
  },
  data() {
    return {
      input2: ''
    }
  },
}
</script>
<style scoped>
.main-box {
  padding: 22px;
}
</style>
<style lang="scss">
@import "@/assets/css/dialogStyle.scss";
</style>