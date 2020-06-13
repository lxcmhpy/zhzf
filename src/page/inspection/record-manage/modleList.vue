<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" style="overflow: hidden;">
      <div style="margin-bottom:24px">
        <div class="search-input-right-box">
          模板名称
          <span class="search-input-right">
            <el-input v-model="searchModleName"></el-input>
          </span>
          <el-button icon="el-icon-search" type="primary" size="medium" @click="searchListByName"></el-button>
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
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import {  findAllRecordModleApi, findRecordlModleByNameApi, findRecordModleByIdApi, removeMoleByIdApi,
  findRecordModleByNameIdApi} from "@/api/Record";

export default {
  data() {
    return {
      isHome:true,
      searchModleName: '',
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

    }
  },
  methods: {
    // 选择模板
    writeRecord(item) {
      // 写记录
    this.$emit('changeModleId',item);
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
    },
    searchListByName() {
      if (this.searchModleName == '') {
        this.searchList()
      } else {
        findRecordModleByNameIdApi(this.searchModleName).then(
          res => {
            console.log(res)
            if (res.data) {
              this.modleList=[{templateList:[]}];
              this.modleList[0].templateList= res.data
            }
          },
          error => {
            // reject(error);
          })
      }

    }
  },
  mounted() {
    this.searchList()
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>