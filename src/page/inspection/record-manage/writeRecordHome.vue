<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" style="overflow: hidden;">
      <div style="margin-bottom:24px">
        <el-button icon="el-icon-plus" type="primary" size="medium" @click="addNewModle" v-if="isHome">新增模板</el-button>
        <div class="search-input-right-box">
          模板名称
          <span class="search-input-right">
            <el-input v-model="searchModleName"></el-input>
          </span>
          <el-button icon="el-icon-search" type="primary" size="medium" @click="searchListByName"></el-button>
        </div>
      </div>
      <!-- 收藏 -->
      <div class="card-content">
        <div class="card-title" style="justify-content: flex-start;" v-if="showSave">常用模板
          <span v-if="modleSaveList">({{modleSaveList.length||0}})</span>
          <span v-if="modleSaveList&&modleSaveListFlag" @click="modleSaveListFlag=!modleSaveListFlag" class="show-icon"><i class="el-icon-arrow-down"></i></span>
          <span v-if="modleSaveList&&!modleSaveListFlag" @click="modleSaveListFlag=!modleSaveListFlag" class="show-icon"><i class="el-icon-arrow-up"></i></span>
        </div>
        <ul class="card-ul" v-if="modleSaveListFlag">
          <li v-for="(modle,index) in modleSaveList" :key="index">
            <span @click="writeRecord(modle)">
              <div class="card-img-content-box">
                <div class="card-img-content">
                  <img v-if='modle.icon' :src="'./static/images/img/record/'+modle.icon+'.png'" alt="">
                  <span v-else style="color: #667589;font-size: 36px;">{{modle.title.charAt(0)}}</span>
                </div>
              </div>
              <div class="card-des">{{modle.title}}</div>
            </span>
            <!-- <div class="box-card-img-content">
              <span style="color: blue;font-size: 14px;" @click="editModle(modle)">修改模板</span>
              <span style="color: blue;font-size: 14px;" @click="delModle(modle)">删除模板</span>
            </div> -->
          </li>
        </ul>
      </div>
      <div v-for="(item,index1) in modleList" :key="item.domain" class="card-content">
        <div class="card-title" style="justify-content: flex-start;" v-if="item.domain">{{item.domain}}
          <span v-if="item.templateList">({{item.templateList.length}})</span>
          <span v-if="item.templateList&&item.showFlag" @click="changeUp(index1)" class="show-icon"><i class="el-icon-arrow-down"></i></span>
          <span v-if="item.templateList&&!item.showFlag" @click="changeUp(index1)" class="show-icon"><i class="el-icon-arrow-up"></i></span>
        </div>
        <ul class="card-ul" v-if="item.showFlag">
          <li v-for="(modle,index) in item.templateList" :key="index">
            <span @click="writeRecord(modle)">
              <div class="card-img-content-box">
                <div class="card-img-content">
                  <img v-if='modle.icon' :src="'./static/images/img/record/'+modle.icon+'.png'" alt="">
                  <span v-else style="color: #667589;font-size: 36px;">{{modle.title.charAt(0)}}</span>
                </div>
              </div>
              <div class="card-des">{{modle.title}}</div>
            </span>
            <div class="box-card-img-content">
              <span style="color: blue;font-size: 14px;" @click="editModle(modle)">修改模板</span>
              <span style="color: blue;font-size: 14px;" @click="delModle(modle)">删除模板</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <preview ref="previewRef" @userList="getPreviewList"></preview>
    <addModle ref="addModleRef" @getAddModle="getAddModle"></addModle>
  </div>
</template>
<script>

import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import preview from "./previewDialog.vue";
import addModle from "./addModle.vue";
import {  findRecordlModleByNameApi, findRecordModleByIdApi, removeMoleByIdApi,
  findRecordModleByNameIdApi, findRecordModleByPersonApi, findUserCollectTemplateApi, removeMoleCollectByIdApi} from "@/api/inspection";
import Vue from 'vue'
import { mapGetters } from "vuex";
export default {
  components: {
    preview,
    addModle
  },
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
      showSave: true

    }
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
    writeRecord(item) {
      // 写记录
      this.$router.push({
        name: 'inspection_writeRecordInfo',
        // params: item
        // query: { id: item.id, addOrEiditFlag: 'add' }
        params: {
          id: item.id,
          addOrEiditFlag: 'add'
        }
      });

      // this.$store.commit("set_inspection_orderId", item.id);

    },
    // 修改模板
    editModle(item) {
      console.log('选中的模板', item)
      this.$refs.addModleRef.showModal(item);
    },
    // 删除模板
    delModle(item) {
      console.log('选中的模板', item)
      this.$confirm('确认删除？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log('删除', item.id)
        let data = {
          id: item.id,
          userId: iLocalStroage.gets("userInfo").id
        }

        removeMoleByIdApi(data).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.searchList()
              this.searchSaveList();
            }
          },
          error => {
            // reject(error);
          })

      })

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
      let data = {
        organId: iLocalStroage.gets("userInfo").organId,
        // templateUserId: this.currentUserLawId
        templateUserId: iLocalStroage.gets("userInfo").id
      }
      findRecordModleByPersonApi(data).then(
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
    //默认设置执法人员为当前用户 需要用用户的id去拿他作为执法人员的id
    // setLawPersonCurrentP() {
    //   let _this = this
    //   this.$store
    //     .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
    //     .then(
    //       res => {
    //         console.log('执法人员列表', res)
    //         let currentUserData = {};
    //         res.data.forEach(item => {
    //           if (
    //             item.userId == iLocalStroage.gets("userInfo").id
    //           ) {
    //             _this.currentUserLawId = item.id;
    //             _this.searchList()
    //           }
    //         });
    //       },
    //       err => {
    //         console.log(err);
    //       }
    //     );
    // },
    changeUp(item) {
      console.log(item)
      this.modleList[item].showFlag = !this.modleList[item].showFlag

      console.log(this.modleList.slice())
      this.modleList = this.modleList.slice()//更新视图

    }
  },
  mounted() {
    this.searchList();
    this.searchSaveList();
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>