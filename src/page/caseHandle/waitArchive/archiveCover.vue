<template>
  <div class="box">
    <el-form ref="archiveCoverForm" :model="formData" :rules="rules" label-width="105px">
      <div class="content_box">
        <div class="content">
          <div class="content_title">全国道路运输执法案件</div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="案号">
                  <el-input
                    class="w-120"
                    v-model="formData.caseNumber"
                    size="small"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="案由">
                  <el-input class="w-120" v-model="formData.caseName" size="small" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="当事人">
                  <el-input class="w-120" v-model="formData.party" size="small" :disabled="true"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="立卷人">
                  <el-input class="w-120" v-model="formData.party2" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="执法机关">
                  <el-input class="w-120" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item label="立案时间">
                  <!-- <el-input class="w-120" size="small" v-model="formData.acceptTime"></el-input> -->
                  <el-date-picker
                  class="w-120"
                    v-model="formData.acceptTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="结案时间">
                  <el-date-picker
                    v-model="formData.finishTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="立卷时间">
                  <el-date-picker
                    v-model="formData.lyTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="保管期限">
                  <el-input class="w-120" size="small"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="submitArchive()">
            <i class="iconfont law-save"></i>
            <br />归档
          </el-button>
          <!-- <el-button type="primary" @click="showArchivePDF()">
            <i class="iconfont law-save"></i>
            <br />预览
          </el-button> -->
          <el-button type="primary">
            <i class="iconfont law-save"></i>
            <br />暂存
          </el-button>
        </div>
      </div>
    </el-form>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'archiveCatalogue'" @showArchiveCatalogue="showArchiveCatalogue"></caseSlideMenu>
    <!-- 卷宗目录 -->
    <archiveCatalogue ref="archiveCatalogueRef" :caseInfo="caseInfo"></archiveCatalogue>
  </div>
</template>
<script>
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import archiveCatalogue from "./archiveCatalogue";

export default {
  data() {
    return {
      caseInfo: this.$route.params.caseInfo,
      formData: {
        caseNumber: "",
        caseName: "",
        acceptTime: "",
        lyTime: "",
        finishTime: "",
        party: "",
        party2: ""
      },
      rules: {}
    };
  },
  components: {
    caseSlideMenu,
    archiveCatalogue
  },
  methods: {
    submitArchive() {
        this.$confirm('此操作将完成归档、生成电子卷宗，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {

        });
    },
    showArchivePDF () {

    },
    //点击卷宗目录后 显示卷宗目录
    showArchiveCatalogue(){
        this.$refs.archiveCatalogueRef.showModal();
    }
  },
  mounted() {
    this.formData = this.caseInfo;
    console.log(JSON.stringify(this.caseInfo));
    this.$refs.archiveCatalogueRef.showModal();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
