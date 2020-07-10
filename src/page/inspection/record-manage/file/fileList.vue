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
          <el-table-column prop="createTime" label="保存日期" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button @click="viewRecord(scope.row)" type="text">查看</el-button> -->
              <span v-if="scope.row.status=='完成'">
                <el-button @click="viewRecord(scope.row)" type="text">查看</el-button>
                <el-button type="text" @click="delModle(scope.row.id)">删除</el-button>
              </span>
              <span v-else>
                <el-button @click="editRecord(scope.row)" type="text">编辑</el-button>
                <el-button type="text" @click="upload(scope.row.id)">上传</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { getDocListById } from "@/api/Record";
import Vue from 'vue'
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
      currentUserLawId: '',
      modleSaveListFlag: true,
      showSave: true,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数

    }
  },
  methods: {
    addNewModle() {
      this.$refs.addModleRef.showModal();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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
      // 写记录
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: item.path,
        params: { id: item.id, addOrEiditFlag: 'add' }
        // query: { id: item.id, addOrEiditFlag: 'add' }
      });
      // 写记录
      this.$emit('changeModleId', item);

    },
    // 修改模板
    editModle(item) {
      console.log('选中的模板', item)
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
        console.log('删除', item.id)
        removeMoleByIdApi(item.id).then(
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
    upload() {

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
      let data = this.$route.params.id
      getDocListById(data).then(
        res => {
          // debugger
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
          title: this.searchModleName,
          templateUserId: iLocalStroage.gets("userInfo").id,
          organId: iLocalStroage.gets("userInfo").organId,
        }
        findRecordModleByNameIdApi(data).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.modleList = [{ templateList: [] }];
              if (res.data.length != 0) {
                this.modleList[0].templateList = res.data
                this.modleList.forEach(element => {
                  element.showFlag = true
                });
              } else {
                this.$message({ message: '暂无内容', type: 'warning' });
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
  },
  mounted() {
    this.searchList();
    // this.searchSaveList();
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>