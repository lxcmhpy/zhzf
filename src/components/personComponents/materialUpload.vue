<template>
  <div style="width:100%;float:left;margin-top:30px;margin-bottom:30px;">
    <div class="card-title">
      <font class="font" style="font-size:25px;"><span class="titleflag"></span>{{ uploadTitle }}
        <el-button v-if="params.type !== 'view'" style="margin: 2px 18px 0;" size="cats-common" type="primary" @click="editAble = true">修改</el-button>
        <el-button v-show="editAble" style="margin: 2px 0;" size="cats-common" type="success" @click="submitUpload">
          保存</el-button>
      </font>
    </div>
    <div ref="degreeXX" class="block upload-material">
      <ul v-if="degreeFiles && degreeFiles.length" class="el-upload-list el-upload-list--picture-card">
        <li v-for="(item, $index) in degreeFiles" :key="item.uid" tabindex="0" class="el-upload-list__item is-ready">
          <img v-if="item.status === 'ready'" :src="item.url" alt="" class="el-upload-list__item-thumbnail" @click="previewImg(item)">
          <img v-if="item.isSave || item.status === 'success'" :src="item.url" alt="" class="el-upload-list__item-thumbnail" @click="previewImg(item)">
          <div v-if="params.type !== 'view' && editAble" class="el-upload-list-action">
            <span class="item-name">{{ item.name }}</span>
            <div class="edit-select-file">
              <el-upload action="#" accept=".jpg, .png" list-type="picture-card" :auto-upload="false" :show-file-list="false" :on-change="handleEditChange">
                <span class="item-handle-btn edit-item" @click="editItemImg($index)">替换</span>
              </el-upload>
              <span class="item-handle-btn delete-item" @click="deleteItem(item, $index)">删除</span>
            </div>
          </div>
        </li>
      </ul>
      <el-upload v-if="params.type !== 'view' && editAble" class="upload-person-material" action="#" multiple accept=".jpg, .png" list-type="picture-card" :auto-upload="false" :show-file-list="false" :on-change="handleChange" :file-list="degreeFiles">
        <el-button slot="trigger" size="cats-common">上传照片</el-button>
      </el-upload>
      <el-dialog title="查看" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
const AllowImageType = ['image/jpeg', 'image/png'];

export default {
  name: 'materialUpload', // 上传证明材料
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          type: 'add',
          id: ''
        }
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
    },
  },
  data() {
    return {
      imageUrl: '',
      degreeFiles: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      editImgIndex: null,
      eduPics: [],
      editAble: false
    }
  },
  computed: {
    showSubmitBtn() {
      return this.degreeFiles.findIndex(item => item.status === 'ready')
    }
  },
  created() {
    this.showUploadImg()
  },
  methods: {
    // 上传照片回显
    showUploadImg() {
      if (this.savePic) {
        const imgs = this.savePic.split('###')
        imgs.forEach((item, index) => {
          this.eduPics.push(item)
          const imgObj = { url: '', uid: index, isSave: true };
          this.$util.com_getFileStream(item).then( res => {
            imgObj.url = res;
          });
          this.degreeFiles.push(imgObj);
        })
      }
    },
    handleChange(file, fileList) {
      const fileIndex = fileList.findIndex(item => item.uid === file.uid)
      const isGt2M = file.size / 1024 / 1024 > 2;
      if (AllowImageType.indexOf(file.raw.type) < 0) {
        this.catsMessage({
          message: '上传图片格式错误，只支持上传jpg或png格式',
          type: 'info'
        })
        fileList.splice(fileIndex, 1);
        return
      }
      if (isGt2M) {
        this.catsMessage({
          message: '上传文件大小不能超过 2MB!',
          type: 'warning'
        })
        fileList.splice(fileIndex, 1)
      }
      this.degreeFiles = fileList
    },
    // 上传到服务器
    submitUpload() {
      if (this.degreeFiles) {
        const formData = new FormData()
        const changeIndex = []
        this.degreeFiles.forEach((item, index) => {
          if (item.status === 'ready') {
            formData.append('file', item.raw)
            changeIndex.push(index)
          }
        })
        this.saveMaterialNo(formData, changeIndex)
      }
    },
    // 点击图片弹出预览
    previewImg(item) {
      // if (item.isSave || item.status === 'success') {
      //   this.dialogImageUrl = this.baseUrl + item.url
      // } else {
      //   this.dialogImageUrl = item.url
      // }
      this.dialogImageUrl = item.url
      this.dialogVisible = true
    },
    // 删除图片
    deleteItem(row, index) {
      let _this = this
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        iconClass: 'el-icon-question',
        customClass: 'custom-confirm'
      })
        .then(() => {
          _this.degreeFiles.splice(index, 1)
          if (row.isSave || row.status === 'success') {
            _this.eduPics.splice(index, 1)
          }
        })
        .catch(() => {})
    },
    // 修改图片
    editItemImg(index) {
      this.editImgIndex = index
    },

    // 修改图片重新选择图片
    handleEditChange(file, fileList) {
      const currentFile = this.degreeFiles.filter(item => item.uid === file.uid)
      const isGt2M = file.size / 1024 / 1024 > 2;
      if (AllowImageType.indexOf(file.raw.type) < 0) {
        this.catsMessage({
          message: '上传图片格式错误，只支持上传jpg或png格式',
          type: 'info'
        })
        fileList.splice(this.editImgIndex, 1);
        return
      }
      if (isGt2M) {
        this.catsMessage({
          message: '上传文件大小不能超过 2MB!',
          type: 'warning'
        })
        fileList.splice(this.editImgIndex, 1)
      } else {
        fileList.splice(0, fileList.length)
        this.degreeFiles.splice(this.editImgIndex, 1, file)
      }
    },
    // 保存图片
    saveMaterialNo(formData, changeIndex) {
      const loading = this.$loading({
        lock: true,
        text: '正在上传',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      })
      if (changeIndex.length) {
        let _this = this
        this.$store.dispatch('uploadMaterial', formData).then(
          res => {
            if (res.code === 200) {
              if (changeIndex.length === _this.degreeFiles.length) {
                res.data.forEach(item => {
                  _this.eduPics.push(item.storageId)
                })
                _this.degreeFiles.forEach((item, index) => {
                  item.status = 'success'
                  this.$util.com_getFileStream(_this.eduPics[index]).then( res => {
                    item.url = res;
                  });
                  // item.url = _this.eduPics[index]
                })
              } else {
                changeIndex.forEach(item => {
                  _this.eduPics.splice(item, 1, res.data[0].storageId)
                  _this.degreeFiles[item].status = 'success'
                  this.$util.com_getFileStream(res.data[0].storageId).then( res => {
                    _this.degreeFiles[item].url = res;
                  });
                  // _this.degreeFiles[item].url = res.data[0].storageId
                })
              }
              const saveFile = {
                personId: _this.params.id
              }
              saveFile[_this.materialType] = _this.eduPics.join('###')
              _this.saveImageToPerson(saveFile, loading)
            }
          },
          err => {
            loading.close()
            _this.catsMessage({
              type: 'error',
              message: err.msg || ''
            })
          }
        )
      } else {
        this.deleteImgRefresh(loading)
      }
    },
    // 保存图片
    saveImageToPerson(saveData, loading) {
      let _this = this
      this.$store.dispatch('personUploadMaterial', saveData).then(
        res => {
          loading.close()
          _this.editAble = false
          _this.catsMessage({
            type: 'success',
            message: '保存成功'
          })
          _this.$emit('saveMaterialSuccess', {
            type: _this.materialType,
            data: saveData[_this.materialType]
          })
        },
        err => {
          loading.close()
          _this.catsMessage({
            type: 'error',
            message: err.msg || ''
          })
        }
      )
    },

    // 删除图片后更新人员信息
    deleteImgRefresh(loading) {
      const saveFile = {
        personId: this.params.id
      }
      let _this = this
      saveFile[this.materialType] = this.eduPics.join('###')
      this.$store.dispatch('personUploadMaterial', saveFile).then(
        res => {
          loading.close()
          _this.editAble = false
          _this.catsMessage({
            type: 'success',
            message: '保存成功'
          })
          _this.$emit('saveMaterialSuccess', {
            type: _this.materialType,
            data: saveFile[_this.materialType]
          })
        },
        err => {
          loading.close()
          _this.catsMessage({
            type: 'error',
            message: err.msg || ''
          })
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/page/personManage.scss';
</style>
