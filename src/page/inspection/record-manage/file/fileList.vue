<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" style="overflow: hidden;">
      <!-- <el-button icon="el-icon-plus" type="primary" size="medium" @click="addNewModle" v-if="isHome">新增模板</el-button> -->
      <div class="search-input-right-box" style="margin-bottom:24px">
        文书名称
        <span class="search-input-right">
          <el-input v-model="searchModleName"></el-input>
        </span>
        <el-button icon="el-icon-search" type="primary" size="medium" @click="searchListByName"></el-button>
      </div>
      <div class="tablePart" style="clear: both;">
        <el-table :data="modleList" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="docName" label="记录文书" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="保存日期" align="center">
            <template slot-scope="scope">
              {{scope.row.updateTime?scope.row.updateTime.substring(0,10):''}}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button @click="viewRecord(scope.row)" type="text">查看</el-button> -->
              <span v-if="scope.row.status=='完成'">
                <el-button @click="viewRecord(scope.row)" type="text">查看</el-button>
                <el-button :disabled="!inspectionFileEdit" type="text" @click="delModle(scope.row.id)">删除</el-button>
              </span>
              <span v-else>
                <el-button :disabled="!inspectionFileEdit" @click="editRecord(scope.row)" type="text">编辑</el-button>
                <el-upload :disabled="!inspectionFileEdit" style="width: auto;display: inline-block;" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="uploadImg" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                  <el-button :disabled="!inspectionFileEdit" type="text" @click="currentFileId=scope.row.id">上传</el-button>
                </el-upload>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div> -->
    </div>
    <el-button type="primary" style="    width: 70px;    height: 40px;position: fixed;    top: 115px;left: 240px;" @click="back">返回</el-button>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { getDocListById, changeFileStatus, getDocListByName, delDocumentById, updatePicPath } from "@/api/inspection";
import { deleteFileByIdApi, uploadCommon } from "@/api/upload.js";
import Vue from 'vue'
import { mapGetters } from "vuex";
export default {

  data() {
    return {
      isHome: true,
      searchModleName: '',
      compData: [],
      viewFlag: [],
      modleList: [],
      modleSaveList: [],//收藏列表
      modleSaveListDefaut: [],//收藏列表
      currentFileId: '',
      modleSaveListFlag: true,
      showSave: true,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      fileList: [],
      editFlag: true,
    }
  },
  computed: {
    ...mapGetters(["inspectionOrderId", "inspectionFileEdit"])
  },
  methods: {
    addNewModle() {
      this.$refs.addModleRef.showModal();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //查询
    getAddModle(list) {
      console.log("getAddModle", list);
      this.searchList()
    },
    //查询
    getPreviewList(list) {
      console.log("getPreviewList", list);
      setTimeout(() => {
      }, 100);
    },
    // 选择模板
    editRecord(item) {
      // 写文书
      if (item.pdfStorageId && item.status != '暂存') {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.push({
          name: "inspection_myPDF",
          params: { id: item.id, storagePath: item.pdfStorageId }
        });
      } else {
        this.$store.commit("set_inspection_fileId", item.id)
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.push({
          name: item.path,
          params: { id: item.id, addOrEiditFlag: 'add' }
          // query: { id: item.id, addOrEiditFlag: 'add' }
        });
        // 写表单
        this.$emit('changeModleId', item);
      }
    },
    // 查看模板
    viewRecord(item) {
      this.$store.commit("set_inspection_fileId", item.id)
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: "inspection_myPDF",
        params: { id: item.id, storagePath: item.pdfStorageId || item.picStorageId }
      });

    },
    // 修改模板
    editModle(item) {
      console.log('选中的模板', item)
      this.$store.commit("set_inspection_fileId", item.id)
      this.$refs.addModleRef.showModal(item);
    },
    // 删除模板
    delModle(item) {
      console.log('选中的模板', item)
      this.$confirm('确认删除当前记录文书？', "删除记录文书", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delDocumentById(item).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.searchList()
            }
          },
          error => {
            // reject(error);
          })

      })

    },
    uploadImg(param) {
      //上传图片
      console.log(param);
      let currentFileId=this.currentFileId
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append("category", '行政检查');
      fd.append("fileName", param.file.name);
      fd.append('status', '文书')//传记录id
      fd.append('caseId', this.inspectionOrderId)//传记录id
      fd.append('docId', currentFileId)//传文书id
      uploadCommon(fd).then(
        // upload(fd).then(
        res => {
          console.log(res);
          // 保存-修改状态
          let data = {
            id: currentFileId,
            picPath: res.data[0].storagePath,
            picStorageId: res.data[0].storageId
          }
          updatePicPath(data).then(
            res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.searchList()
              } else {
                this.$message.error(res.msg);
              }
            },
            error => {

            })

        },
        error => {
          console.log(error)
        }
      );

    },
    // 预览
    preview() {
      this.$refs.previewRef.showModal(this.compData);
    },
    handleChange(val) {
      console.log(val);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    searchList() {
      let data = this.inspectionOrderId
      getDocListById(data).then(
        res => {
          console.log(res)
          if (res.data) {
            this.modleList = res.data
            this.modleList.forEach(element => {
              element.showFlag = true
            });
          }
        },
        error => {
          // reject(error);
        })
    },
    searchSaveList() {
      let data = iLocalStroage.gets("userInfo").id
      findUserCollectTemplateApi(data).then(
        res => {
          console.log(res)
          if (res.data) {
            this.modleSaveList = res.data
            this.modleSaveListDefaut = JSON.parse(JSON.stringify(res.data));
          }
        },
        error => {
          // reject(error);
        })
    },
    searchListByName() {

      if (this.searchModleName == '') {
        this.showSave = true;
        this.modleSaveList = JSON.parse(JSON.stringify(this.modleSaveListDefaut))
        this.searchList()
      } else {
        this.showSave = false

        this.modleSaveList = []
        let data = {
          docName: this.searchModleName,
          orderId: this.inspectionOrderId,
        }
        getDocListByName(data).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.modleList = res.data||[]
              if (res.data.length != 0) {

              } else {
                // this.$message({ message: '暂无内容', type: 'warning' });
              }
            }
          },
          error => {
            // reject(error);
          })
      }

    },
    changeUp(item) {
      console.log(item)
      this.modleList[item].showFlag = !this.modleList[item].showFlag

      console.log(this.modleList.slice())
      this.modleList = this.modleList.slice()//更新视图

    },
    handleSelectionChange(item) {

    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    back() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: 'inspection_writeRecordInfo',
        params: {
          id: this.inspectionOrderId,
          addOrEiditFlag: 'view'
        }
        // query: { id: this.formOrDocData.pageDomId || this.$route.params.id }
      });
    }
  },
  mounted() {
    this.searchList();
    // this.searchSaveList();
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>