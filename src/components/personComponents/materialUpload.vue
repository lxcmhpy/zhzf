<template>
  <div style="width:100%;float:left;margin-top:30px;margin-bottom:30px;">
    <div class="card-title">
      <font class="font" style="font-size:25px;"><span class="titleflag"></span>{{ uploadTitle }}</font>
    </div>
    <div ref="degreeXX" class="block upload-material">
      <ul v-if="degreeFiles && degreeFiles.length" class="el-upload-list el-upload-list--picture-card">
        <li v-for="(item, $index) in degreeFiles" :key="item.uid" tabindex="0" class="el-upload-list__item is-ready">
          <img :src="item.url" alt="" class="el-upload-list__item-thumbnail" @click="previewImg(item.url)" >
          <div v-if="params.type !== 'view'" class="el-upload-list-action">
            <span class="item-name">{{ item.name }}</span>
            <div class="edit-select-file">
              <el-upload
                action="#"
                accept=".jpg, .png"
                list-type="picture-card"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleEditChange">
                <span class="item-handle-btn edit-item" @click="editItemImg($index)">修改</span>
              </el-upload>
              <span class="item-handle-btn delete-item" @click="deleteItem(item, $index)">删除</span>
            </div>
          </div>
        </li>
      </ul>
      <el-upload
        v-if="params.type !== 'view'"
        class="upload-person-material"
        action="#"
        multiple
        accept=".jpg, .png"
        list-type="picture-card"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange"
        :file-list="degreeFiles">
        <el-button slot="trigger" size="medium">上传照片</el-button>
        <el-button
          v-if="showSubmitBtn > -1"
          style="margin: 20px 18px 0;"
          size="medium"
          type="success"
          @click="submitUpload">上传到服务器</el-button>
      </el-upload>
      <el-dialog title="查看" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name:'materialUpload', // 上传证明材料
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: 'add', id: '' }
      },
      required: true
    },
    savePic: {
      type: String,
      default: '',
      required: true
    },
    materialType: {
      type: String,
      default: '',
      required: true
    },
    uploadTitle: {
      type: String,
      default: '',
      required: true
    }
  },
  data(){
    return {
      imageUrl: '',
      degreeFiles: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      editImgIndex: null,
      eduPics: []
    }
  },
  computed: {
    showSubmitBtn(){
      return this.degreeFiles.findIndex(item => item.status === 'ready');
    }
  },
  created(){
    this.showUploadImg();
  },
  methods:{
    // 上传照片回显
    showUploadImg(){
      if(this.savePic){
        const imgs = this.savePic.split('###')
        imgs.forEach((item, index) => {
          this.degreeFiles.push({ url: item, uid: index, isSave: true });
          this.eduPics.push(item);
        })
      }
    },
    handleChange(file,fileList){
      const fileIndex = fileList.findIndex(item => item.uid === file.uid);
      const isGt2M = file.size / 1024 / 1024 > 2
      if(isGt2M) {
        this.$message({ message: '上传文件大小不能超过 2MB!', type: 'warning'});
        fileList.splice(fileIndex, 1);
      }
      this.degreeFiles = fileList;
    },
    // 上传到服务器
    submitUpload(){
      if(this.degreeFiles && this.degreeFiles.length){
        const formData = new FormData();
        this.degreeFiles.forEach(item => {
          if(item.status === 'ready'){
            formData.append('file', item.raw);
          }
        });
        this.saveMaterialNo(formData);
      }
    },
    // 点击图片弹出预览
    previewImg(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    // 删除图片
    deleteItem(row, index){
      this.degreeFiles.splice(index, 1);
      if(row.isSave || row.status === 'success'){
        this.eduPics.splice(index, 1);
        this.deleteImgRefresh();
      }
    },
    // 修改图片
    editItemImg(index) {
      this.editImgIndex = index;
    },

    // 修改图片重新选择图片
    handleEditChange(file, fileList){
      const currentFile = this.degreeFiles.filter(item => item.uid === file.uid);
      const isGt2M = file.size / 1024 / 1024 > 2
      if(isGt2M) {
        this.$message({ message: '上传文件大小不能超过 2MB!', type: 'warning'});
        fileList.splice(fileIndex, 1);
      }else{
        fileList.splice(0, fileList.length);
        this.degreeFiles.splice(this.editImgIndex, 1, file);
        if(currentFile.status === 'success'){
          const formData = new FormData();
          formData.append('file', file.raw);
          this.saveMaterialNo(formData, this.editImgIndex);
        }
      }
    },
    // 保存图片
    saveMaterialNo(formData, fileIndex){
      const loading = this.$loading({
        lock: true,
        text: '正在上传',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      this.$store.dispatch('uploadMaterial', formData).then(res => {
        if(res.code === 200){
          if(fileIndex === undefined){
            res.data.forEach(item => {
              this.eduPics.push(item.storagePath)
            })
            this.degreeFiles.forEach(item => item.status = 'success');
          }else{
            this.eduPics.splice(fileIndex, 1, res.data[0].storagePath);
            this.degreeFiles[fileIndex].status = 'success';
          }
          const saveFile = { personId: this.params.id };
          saveFile[this.materialType] = this.eduPics.join('###');
          this.$store.dispatch('personUploadMaterial', saveFile).then(res => {
            loading.close();
            this.$message({ type: 'success', message: '上传成功' });
            this.$emit('saveMaterialSuccess', { type: this.materialType, data: saveFile[this.materialType] });
          }, err => {
            loading.close();
            this.$message({ type: 'error', message: err.msg || '' });
          })
        }
      }), err => {
        loading.close();
        this.$message({type: 'error', message: err.msg || ''});
      };
    },
    // 删除图片后更新人员信息
    deleteImgRefresh(){
      const loading = this.$loading({
        lock: true,
        text: '正在删除',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      const saveFile = { personId: this.params.id };
      saveFile[this.materialType] = this.eduPics.join('###');
      this.$store.dispatch('personUploadMaterial', saveFile).then(res => {
        loading.close();
        this.$message({ type: 'success', message: '删除成功' });
        this.$emit('saveMaterialSuccess', { type: this.materialType, data: saveFile[this.materialType] });
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      })
    }

  }
}
</script>
<style lang="scss"  src="@/assets/css/personManage.scss" scoped>
/* @import "@/assets/css/personManage.scss"; */
</style>