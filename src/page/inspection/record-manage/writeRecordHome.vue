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
        <div class="card-title">{{item.title}}({{item.length}})</div>
        <ul class="card-ul">
          <li v-for="(modle,index) in item.dataList" :key="index" @click="checkModle">
            <div class="card-img-content-box">
              <div class="card-img-content">
                <img :src="modle.icon" alt="">
              </div>
            </div>

            <div class="card-des">{{modle.name}}</div>

          </li>
        </ul>
      </div>
    </div>
    <!-- 创建模板 -->
    <el-drawer title="创建模板" :visible.sync="newModleTable" direction="rtl" size="50%" class="dialo dialog_unlaw max-group-prepend">
      <div style="padding：22px">
        <el-form :model="modleData" :rules="rules" ref="modleData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="业务领域" prop="name">
            <el-input v-model="modleData.name"></el-input>
          </el-form-item>
          <el-form-item label="模板标题" prop="name">
            <el-input v-model="modleData.name"></el-input>
          </el-form-item>
          <p class="border-title card-title-margin">添加指标</p>

          <el-form-item prop="region" label-width="0">
            <el-input placeholder="添加字段" v-model="modleData.name" class="input-with-select">
              <el-select v-model="modleData.region" slot="prepend" placeholder="请输入字段组名称，可为空">
                <el-option label="当事人信息（姓名、联系方式、证件号码、从业资格证号……）" value="1"></el-option>
                <el-option label="企业组织信息（名称、联系人、联系方式、统一信用代码……）" value="2"></el-option>
                <el-option label="车辆相关信息（车牌颜色、车牌号码、道路运输证号……）" value="3"></el-option>
                <el-option label="是否需要转入案件办理（仅记录；记录并转立案）" value="4"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>

          </el-form-item>
          <p class="border-title card-title-margin">应用权限</p>
          <el-form-item label="模板图标" prop="delivery">
            <img src="" alt="">
            <canvas id="myCanvas" width="64" height="64" style="border:1px solid #c3c3c3;">
              您的浏览器不支持 HTML5 canvas 标签。
            </canvas>
          </el-form-item>
          <el-form-item label="适用范围" prop="resource">
            <el-radio-group v-model="modleData.resource" style="width:100%" class="card-select">
              <div class="el-form-item__content">
                <el-radio label="指定人员使用"></el-radio>
                <el-form-item v-if="modleData.resource=='指定人员使用'" prop="delivery" class="lawPersonBox" style="width:calc(100% - 150px);float: right;margin-bottom: 0;">
                  <el-select ref="lawPersonListId" v-model="modleData.lawPersonListId" multiple @remove-tag="removeLawPersontag">
                    <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
                  </el-select>
                  <el-button icon="el-icon-plus" @click="addLawPerson"></el-button>
                </el-form-item>
              </div>
              <div class="el-form-item__content">
                <el-radio label="机构内使用"></el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="模板管理者" prop="region">

          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('modleData')">重置</el-button>
            <el-button type="primary" @click="submitForm('modleData')">预览</el-button>
            <el-button type="primary" @click="submitForm('modleData')">发布</el-button>

          </el-form-item>
        </el-form>
      </div>

    </el-drawer>
    <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson" @userList="getAllUserList"></chooseLawPerson>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import chooseLawPerson from "@/page/caseHandle/unRecordCase/chooseLawPerson.vue";
export default {
  components: {
    chooseLawPerson,
  },
  data() {
    return {
      newModleTable: false,
      currentUserLawId: '',
      alreadyChooseLawPerson: [],//已选择人员列表
      modleList: [{
        title: '常用记录表单',
        length: 4,
        dataList: [{
          icon: './static/images/img/record/icon_yzt.png',
          name: '运政通用记录',
        }, {
          icon: './static/images/img/record/icon_hyj.png',
          name: '货运检查记录表',
        }, {
          icon: './static/images/img/record/icon_kyj.png',
          name: '客运检查记录表',
        }],
      }, {
        title: '公路路政',
        length: 4,
        dataList: [{
          icon: './static/images/img/record/icon_gl.png',
          name: '公路巡查',
        }, {
          icon: './static/images/img/record/icon_lc.png',
          name: '路产损坏记录',
        }, {
          icon: './static/images/img/record/icon_jz.png',
          name: '建筑控制区记录',
        }, {
          icon: './static/images/img/record/icon_qit.png',
          name: '运政通用记录',
        }],
      }, {
        title: '道路运政',
        length: 4,
        dataList: [{
          icon: './static/images/img/record/icon_yzty.png',
          name: '运政通用型检查记录',
        }],
      }],
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
      this.setLawPersonCurrentP()
      this.newModleTable = true;
      this.$nextTick(() => {
        this.draw()
      });
    },
    draw() {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.font = "bolder 36px Arial";
      ctx.textAlign='center'
      ctx.fillStyle='#6D7B8F'
      ctx.fillText("好", 32, 42);
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
    // 添加管理者
    addLawPerson() {
      this.$refs.chooseLawPersonRef.showModal(this.modleData.lawPersonListId, this.alreadyChooseLawPerson);
    },
    //查询执法人员
    getAllUserList(list) {
      console.log("list121212", list);
      this.allUserList = list;
      setTimeout(() => {
      }, 100);
    },
    //设置执法人员
    setLawPerson(userlist) {
      console.log('选择的执法人员', userlist);
      // this.lawPersonList = userlist;
      this.alreadyChooseLawPerson = userlist;
      this.modleData.lawPersonListId = [];
      let staffIdArr = [];
      let staffArr = [];
      let certificateIdArr = [];

      this.alreadyChooseLawPerson.forEach(item => {
        this.modleData.lawPersonListId.push(item.id);
        //给表单数据赋值
        staffIdArr.push(item.id);
        staffArr.push(item.lawOfficerName);
        certificateIdArr.push(item.selectLawOfficerCard);
      });
      // this.modleData.staffId = staffIdArr.join(',');
      // this.modleData.staff = staffArr.join(',');
      // this.modleData.certificateId = certificateIdArr.join(',');

    },
    //默认设置执法人员为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP() {
      let _this = this
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            console.log('执法人员列表', res)
            _this.userList = res.data;
            let currentUserData = {};
            _this.modleData.lawPersonListId = [];
            _this.alreadyChooseLawPerson = [];

            res.data.forEach(item => {
              if (
                item.userId == iLocalStroage.gets("userInfo").id
              ) {
                currentUserData.id = item.id;
                currentUserData.lawOfficerName = item.lawOfficerName;
                currentUserData.selectLawOfficerCard = item.lawOfficerCards.split(",")[0]
                _this.alreadyChooseLawPerson.push(currentUserData);
                _this.modleData.lawPersonListId.push(currentUserData.id);
                _this.currentUserLawId = currentUserData.id;
                _this.modleData.staff = item.lawOfficerName;
                _this.modleData.staffId = item.id;


              }
            });
          },
          err => {
            console.log(err);
          }
        );
    },
    removeLawPersontag(val) {
      if (this.currentUserLawId == val) {
        this.modleData.lawPersonListId.push(val);
        this.$message('该执法人员不能删除！');
      }
    },
    // 选择模板
    checkModle() {
      this.$router.push({
        name: 'inspection_writeRecordInfo',
        params: {
          isApproval: true
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>