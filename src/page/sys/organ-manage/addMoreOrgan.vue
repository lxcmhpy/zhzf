<template>
  <el-dialog
    title="批量导入"
    :visible.sync="visible"
    width="45%"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-button @click="downTemplate" size="small" class="downTemplateBtn">下载模版</el-button>
    <el-upload
        class="upload-demo"
        :http-request="saveFile"
            :file-list="fileList"
            action="https://jsonplaceholder.typicode.cmo/posts/"
            :on-change="handleChange">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
    </el-upload>
  </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            visible:false,
            fileList:[],
        }
    },
    methods:{
        closeDialog(){
            this.visible = false
        },
        showModal() {
             this.visible = true;
        },
        //下载模版
        downTemplate(){

        },
        saveFile(param){
            console.log(param);
        },
         handleChange(file, fileList) {
          if (fileList.length > 0) {
              this.fileList = [fileList[fileList.length - 1]]  
          }
      },
     
    }
}
</script>
<style lang="scss">
    .downTemplateBtn{
        margin-bottom: 15px;
    }
</style>

