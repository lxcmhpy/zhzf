<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div style="margin-bottom:24px">
        <el-button icon="el-icon-plus" type="primary" size="medium" @click="addNewModle">新增模板</el-button>
        <div class="search-input-right-box">
          模板名称
          <span class="search-input-right">
            <el-input v-model="modleData.name"></el-input>
          </span>
          <el-button icon="el-icon-search" type="primary" size="medium" @click="addNewModle"></el-button>
        </div>
      </div>
      <div v-for="(item,index) in modleList" :key="index" class="card-content">
        <div class="card-title" v-if="index==0">{{item.domain}}
          ({{item.templateList.length}})
          {{typeof(item.templateList.length)}}
        </div>
        <div class="card-title" v-if="index!=0">{{item.domain}}
          ({{item.templateList.length}})
        </div>
        <ul class="card-ul">
          <li v-for="(modle,index) in item.templateList" :key="index" @click="checkModle(modle)">
            <div class="card-img-content-box">
              <div class="card-img-content">
                <img v-if='modle.icon' :src="'./static/images/img/record/'+modle.icon+'.png'" alt="">
                <span v-else style="color: #667589;font-size: 36px;">{{modle.title.charAt(0)}}</span>

              </div>
            </div>
            <div class="card-des">{{modle.title}}</div>
            <span style="color: blue;font-size: 14px;" @click="editModle(modle)">修改模板</span>
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
import { findAllRecordModleApi, findRecordlModleByNameApi, findRecordModleByIdApi } from "@/api/Record";

export default {
  components: {
    preview,
    addModle
  },

  data() {
    return {
      newModleTable: false,
      currentUserLawId: '',
      activeNames: ['1'],
      alreadyChooseLawPerson: [],//已选择人员列表
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
        // {
        //   title: '公路路政',
        //   length: 4,
        //   dataList: [{
        //     icon: './static/images/img/record/icon_gl.png',
        //     name: '公路巡查',
        //   }, {
        //     icon: './static/images/img/record/icon_lc.png',
        //     name: '路产损坏记录',
        //   }, {
        //     icon: './static/images/img/record/icon_jz.png',
        //     name: '建筑控制区记录',
        //   }, {
        //     icon: './static/images/img/record/icon_qit.png',
        //     name: '运政通用记录',
        //   }],
        // },
        // {
        //   title: '道路运政',
        //   length: 4,
        //   dataList: [{
        //     icon: './static/images/img/record/icon_yzty.png',
        //     name: '运政通用型检查记录',
        //   }],
        // }
      ],
      modleData: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        staff: "",
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
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
      this.allUserList = list;
      setTimeout(() => {
      }, 100);
    },
    // 选择模板
    checkModle(item) {
      console.log('选中的模板', item)

    },
    // 修改模板
    editModle(item) {
      console.log('选中的模板', item)
      this.$refs.addModleRef.showModal(item);
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
          this.modleList = res.data
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