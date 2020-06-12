<template>
  <div style="width:100%;float:left;margin-bottom:30px;">
    <div class="card-title">
      <font class="font" style="font-size:25px;"><span class="titleflag"></span>身份证
        <el-button
          v-if="params.type !== 'view'"
          style="margin: 0 18px;"
          size="medium"
          type="primary"
          @click="editAble = true">修改</el-button>
        <el-button
          v-show="editAble"
          size="medium"
          type="success"
          @click.native="submitUpload">保存</el-button>
      </font>
    </div>
    <div ref="idNoXX" class="block upload-material">
      <ul v-if="idNoFiles && idNoFiles.length" class="el-upload-list el-upload-list--picture-card">
        <li v-for="(item, $index) in idNoFiles" :key="item.uid" tabindex="0" class="el-upload-list__item is-ready">
          <img v-if="item.status === 'ready'" :src="item.url" alt="" class="el-upload-list__item-thumbnail" @click="previewImg(item)">
          <img v-if="item.isSave || item.status === 'success'" :src="baseUrl + item.url" alt="" class="el-upload-list__item-thumbnail" @click="previewImg(item)">
          <div v-if="editAble" class="el-upload-list-action">
            <span class="item-name">{{ item.name }}</span>
            <div class="edit-select-file">
              <el-upload
                action="#"
                accept=".jpg, .png"
                list-type="picture-card"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleEditChange">
                <span class="item-handle-btn edit-item" @click="editItemImg($index)">替换</span>
              </el-upload>
              <span class="item-handle-btn delete-item" @click="deleteItem(item, $index)">删除</span>
            </div>
          </div>
        </li>
      </ul>
      <el-upload
        v-if="params.type !== 'view' && editAble"
        class="upload-person-material"
        action="#"
        list-type="picture-card"
        accept=".jpg, .png"
        :multiple='multiple'
        :limit="2"
        :auto-upload="false"
        :show-file-list="false"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :file-list="idNoFiles">
        <el-button slot="trigger" size="medium" :disabled="idNoFiles.length > 2">上传照片</el-button>
      </el-upload>
      <el-dialog title="查看" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name:'materialIdNo',//身份证证明材料
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: 'add', id: '' }
      },
      required: true
    },
    idPic: {
      type: Object,
      default: () => {
        return {idcardFront: '' , idcardBack: ''}
      },
      required: true
    },
    baseUrl: {
      type: String,
      default: '',
      required: true
    }
  },
  data(){
    return {
      imageUrl: '',
      idNoFiles: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      multiple: true,
      editImgIndex: null,
      idNoLimit: 2,
      personImage: {
        personId: this.params.id,
        idcardFront: '',
        idcardBack: ''
      },
      editAble: false
    }
  },
  computed: {
    uploadDisabled:function() {
      let _this=this;
      return _this.idNoFiles.length >=2;
    },
    showSubmitBtn(){
      return this.idNoFiles.findIndex(item => item.status === 'ready');
    }
  },
  created(){
    this.showUploadImg();
  },
  methods:{
    // 上传照片回显
    showUploadImg(){
      this.multiple = true;
      if(this.idPic.idcardFront){
        this.idNoFiles.push({ url: this.idPic.idcardFront, uid: 0, isSave: true });
        this.personImage.idcardFront = this.idPic.idcardFront;
        this.multiple = false;
      }
      if(this.idPic.idcardBack){
        this.idNoFiles.push({ url: this.idPic.idcardBack, uid: 1, isSave: true });
        this.personImage.idcardBack = this.idPic.idcardBack;
        this.multiple = false;
      }
    },
    handleChange(file,fileList){
      const fileIndex = fileList.findIndex(item => item.uid === file.uid);
      const isGt2M = file.size / 1024 / 1024 > 2;
      if(isGt2M) {
        this.$message({ message: '上传文件大小不能超过 2MB!', type: 'warning'});
        fileList.splice(fileIndex, 1);
      }
      this.idNoFiles = fileList;
    },
    // 上传到服务器
    submitUpload(){
      if(this.idNoFiles){
        const formData = new FormData();
        let imgChange = false;
        this.idNoFiles.forEach(item => {
          if(item.status === 'ready'){
            imgChange = true;
            formData.append('file', item.raw);
          }
        });
        this.saveMaterialNo(formData, imgChange);
      }
    },
    handleExceed(files, fileList) {
      this.$message.error(`当前限制选择 ${this.idNoLimit} 个文件，本次选择了 ${fileList.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 点击图片弹出预览
    previewImg(item) {
      if(item.isSave || item.status === 'success'){
        this.dialogImageUrl = this.baseUrl + item.url;
      }else{
        this.dialogImageUrl = item.url;
      }
      this.dialogVisible = true;
    },
    // 删除图片
    deleteItem(row, index){
      this.$confirm('确认删除吗？','提示',{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'el-icon-question',
        customClass: 'custom-confirm'
      }).then(() => {
        this.idNoFiles.splice(index, 1);
        if(row.isSave || row.status === 'success'){
          if(index === 0){
            this.personImage.idcardFront = '';
          }else{
            this.personImage.idcardBack = '';
          }
        }
      }).catch(() => {});
    },
    // 修改图片
    editItemImg(index) {
      this.editImgIndex = index;
    },
    // 修改图片重新选择图片
    handleEditChange(file, fileList){
      const currentFile = this.idNoFiles.filter(item => item.uid === file.uid);
      const isGt2M = file.size / 1024 / 1024 > 2;
      if(isGt2M) {
        this.$message({ message: '上传文件大小不能超过 2MB!', type: 'warning'});
        fileList.splice(fileIndex, 1);
      }else{
        fileList.splice(0, fileList.length);
        this.idNoFiles.splice(this.editImgIndex, 1, file);
      }
    },
    // 保存图片
    saveMaterialNo(formData, changed){
      const loading = this.$loading({
        lock: true,
        text: '正在上传',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      if(changed){
        this.$store.dispatch('uploadMaterial', formData).then(res => {
          if(res.code === 200){
            if(res.data && res.data.length === 2){
              this.personImage.idcardFront = res.data[0].storageId;
              this.personImage.idcardBack = res.data[1].storageId;
            }else if(!this.personImage.idcardFront){
              this.personImage.idcardFront = res.data[0].storageId;
            }else if(!this.personImage.idcardBack){
              this.personImage.idcardBack = res.data[0].storageId;
            }
            this.idNoFiles.forEach(item => item.status = 'success');
            this.saveImageToPerson(loading);
          }
        }, err => {
          loading.close();
          this.$message({type: 'error', message: err.msg || ''});
        });
      }else{
        this.saveImageToPerson(loading);
      }
    },
    // 保存图片
    saveImageToPerson(loading){
      this.$store.dispatch('personUploadMaterial', this.personImage).then(res => {
        loading.close();
        this.editAble = false;
        this.$message({ type: 'success', message: '保存成功!' });
        this.$emit('saveIdImgSuccess', this.personImage);
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/personManage.scss";
</style>