<template>
<div>
<el-dialog title="文件预览" :modal="false" :visible.sync="visible"
    :show-close="false" width="820px" height="400px" class= "detailDialog" :append-to-body="true">
      <div>
        <div>
          <!-- <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>点击上传附件</em></div>
          <div class="el-upload__tip" slot="tip" style="text-align: center">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->
        <el-form ref="form" :model="form" style="width: 800px; height:400px;text-align: center;">
          <imgPreview :imgSrc="myFileUrl" :imgBoxWidth="800" :imgBoxHeight="400"></imgPreview>
          <!-- <img :src="myFileUrl" width="430px" height="400" align="center"/> -->
          <!-- <img v-if="form.evType =='照片'" :src="host+form.storageId"  width="430px" height="400" align="center"/> -->
          <!-- <video v-if="form.evType =='音视频'" :src="host+form.storageId" controls="controls" width="400px" height="380">your browser does not support the video tag</video> -->
        </el-form>
        </div>
       
      </div>
    </el-dialog> 
</div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import imgPreview from "@/components/imgPreview.vue"
export default {
    data(){        
        return{
            visible: false,
            form:{},
            host:"",
            myFileUrl:'',
        }
    },
    components:{
      imgPreview
    },
    methods:{
        showModal(data) {
            console.log("详情",data);
            this.visible = true;
            this.form = {
                id: data.id,
                caseId: data.caseId,
                storageId: data.storageId,
                evPath: data.evPath,
                evType: data.evType,
                userName: data.userName,
                createTime: data.createTime,
                recordPlace: data.recordPlace,
                status: data.status,
                note: data.note
            };
            this.$util.com_getFileStream(data.storageId).then(res=>{
              this.myFileUrl = res;
            }).catch(err=>{console.log(err)})
        },
    }
}
</script>
<style lang="scss" src="@/assets/css/systemManage.scss"></style>
<style lang="scss">
/* @import "@/assets/css/systemManage.scss"; */
.detailDialog{
    .el-dialog__body {
        height  :400px;
    }
}
</style>