<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div style="margin-bottom:24px">
        <el-button icon="el-icon-plus" type="primary" size="medium" @click="addNewModle">新增模板</el-button>
        <div class="search-input-right-box">
          模板名称
          <span class="search-input-right">
            <el-input v-model="searchModleName"></el-input>
          </span>
          <el-button icon="el-icon-search" type="primary" size="medium" @click="addNewModle"></el-button>
        </div>
      </div>
      <div v-for="(item,index) in modleList" :key="index" class="card-content">
        <div class="card-title" v-if="index==0">{{item.domain}}
          <!-- ({{item.templateList.length}}) -->
          <!-- {{typeof(item.templateList.length)}} -->
        </div>
        <div class="card-title" v-if="index!=0">{{item.domain}}
          <!-- ({{item.templateList.length}}) -->
        </div>
        <ul class="card-ul">
          <li v-for="(modle,index) in item.templateList" :key="index" @click="writeRecord(modle)">
            <div class="card-img-content-box">
              <div class="card-img-content">
                <img v-if='modle.icon' :src="'./static/images/img/record/'+modle.icon+'.png'" alt="">
                <span v-else style="color: #667589;font-size: 36px;">{{modle.title.charAt(0)}}</span>
              </div>
            </div>
            <div class="card-des">{{modle.title}}</div>
            <span style="color: blue;font-size: 14px;" @click="editModle(modle)">修改模板</span>
            <span style="color: blue;font-size: 14px;" @click="delModle(modle)">删除模板</span>
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
import { findAllRecordModleApi, findRecordlModleByNameApi, findRecordModleByIdApi, removeMoleByIdApi } from "@/api/Record";

export default {
  components: {
    preview,
    addModle
  },

  data() {
    return {
      compData: [],
      modleList: [{
        title: '常用记录表单',
        length: 4,
        dataList: [{
          icon: 'icon_yzt',
          name: '运政通用记录',
        }, {
          icon: 'icon_hyj',
          name: '货运检查记录表',
        }, {
          icon: 'icon_kyj',
          name: '客运检查记录表',
        }],
      },
      ],
      searchModleName: '',
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
    writeRecord(item) {
      console.log('选中的模板', item)
      // 写记录
      this.$router.push({
        name: 'inspection_writeRecordInfo',
        params: item
      });
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
      findAllRecordModleApi().then(
        res => {
          console.log(res)
          if (res.data) {
            this.modleList = res.data

          }
        },
        error => {
          // reject(error);
        })

    }
  },
  mounted() {
    this.searchList()
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>