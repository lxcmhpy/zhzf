<template>
  <div>
    <!-- 创建模板 -->
    <el-drawer title="创建模板" :visible.sync="newModleTable" direction="rtl" size="50%" class="dialo dialog_unlaw max-group-prepend card-drawer">
      <div style="padding：22px;" class="demo-drawer__content">
        <el-form :model="formData" :rules="rules" ref="elForm" label-width="100px" class="demo-ruleForm">
          <el-col :span="12">
            <el-form-item label="业务领域" prop="cateId">
              <el-select v-model="formData.cateId" placeholder="请选择">
                <el-option v-for="item in lawCateList" :key="item.cateId" :label="item.cateName" :value="item.cateId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板标题" prop="modleTitle">
              <el-input v-model="formData.modleTitle" placeholder="请输入模板标题" clearable>
              </el-input>
            </el-form-item>
          </el-col>

          <p class="border-title card-title-margin clear">添加指标
            <span class="card-add-btn">
              <el-button icon="el-icon-plus" size="medium" @click="addGroup(3)">添加新字段组</el-button>
            </span>
          </p>
          <div class="collapse-title-foem">
            <el-collapse v-model="activeNames" @change="handleChange" class="clear">
              <div v-for="(item,index) in formData.groupList" :key="index">
                <el-collapse-item :name="index" style="margin-top:12px">
                  <template slot="title">
                    <i class="iconfont law-icon_zhankai zhankai"></i>
                    <i class="iconfont law-btn_shousuo shousuo"></i>
                    <el-form-item prop="class" label-width="0" style="width:100%;margin-bottom: 10px;">
                      <el-select v-model="item.title" filterable allow-create clearable placeholder="请输入字段组名称，可为空">
                        <el-option label="当事人信息（姓名、联系方式、证件号码、从业资格证号……）" value="1"></el-option>
                        <el-option label="企业组织信息（名称、联系人、联系方式、统一信用代码……）" value="2"></el-option>
                        <el-option label="车辆相关信息（车牌颜色、车牌号码、道路运输证号……）" value="3"></el-option>
                        <el-option label="是否需要转入案件办理（仅记录；记录并转立案）" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                    <i class="el-icon-remove" style="margin-left:18px" @click="delGroup(item)"></i>
                  </template>
                  <div v-for="filed in item.filedList" :key="filed.id">
                    <el-row :gutter="20">
                      <el-col :span="2">
                        <el-form-item prop="field101" label-width="0">
                          <el-checkbox v-model="filed.required">必填</el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item prop="field101" label-width="0">
                          <el-input v-model="filed.label" placeholder="请填写字段名称" clearable :style="{width: '100%'}">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item prop="filedType" label-width="0" style="width:calc(100% - 34px)">
                          <el-select v-model="filed.tag" placeholder="请选择字段类型" @change="changeFiledType(filed)">
                            <el-option label="文本" value="el-input"></el-option>
                            <el-option label="抽屉表" value="el-checkbox-group"></el-option>
                            <el-option label="单选" value="el-radio-group"></el-option>
                            <el-option label="日期" value="el-time-picker"></el-option>
                          </el-select>
                        </el-form-item>
                        <i class="el-icon-remove-outline" @click="delFiled(filed,item.filedList)" style="margin-left:18px;margin-top:-38px;float:right"></i>
                      </el-col>
                    </el-row>
                    <!-- <el-row class="mimi-content" v-if="filed.tag=='el-checkbox-group'">
                      <el-col :span="22" :offset="2" class="card-bg-content">
                        <el-form-item prop="field101" label-width="0">
                          <el-input size="mini" v-model="formData.name" placeholder="请输入单行文本" clearable :style="{width: '100%'}">
                          </el-input>
                        </el-form-item>
                        <el-form-item prop="field101" label-width="0">
                          <el-input size="mini" v-model="formData.name" placeholder="请输入单行文本" clearable :style="{width: '100%'}">
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row> -->
                    <el-row class="mimi-content" v-if="filed.tag=='el-radio-group'||filed.tag=='el-checkbox-group'">
                      <el-col :span="22" :offset="2" class="card-bg-content">
                        <el-form-item v-for="(radio,index) in filed.radioList" :key="index" prop="field101" label-width="0">
                          <i class="el-icon-remove-outline" style="margin-right:14px" @click="delRadioList(radio,filed.radioList)"></i>
                          <el-input size="mini" v-model="radio.value" placeholder="请输入选项" clearable style="width: calc(100% - 70px)">
                          </el-input>
                          <i class="el-icon-circle-plus-outline" style="margin-left:14px" @click="addRadioList(filed.radioList)"></i>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row class="mimi-content" v-if="filed.tag=='el-time-picker'">
                      <el-col :span="22" :offset="2" class="card-bg-content">
                        <el-row>
                          <el-radio-group v-model="filed.dataType" style="width: 100%;">
                            <el-row>
                              <el-col :span="12">
                                <el-radio label="el-date-picker,datetime,yyyy-MM-dd HH:mm:ss">精准时间（2020-03-11 12:12:12）</el-radio>
                              </el-col>
                              <el-col :span="12">
                                <el-radio label="el-date-picker,datetime,yyyy-MM-dd HH:mm">日期和时间（2020-03-11 12:12）</el-radio>
                              </el-col>
                            </el-row>
                            <el-row style="margin:15px 0">
                              <el-col :span="12">
                                <el-radio label="el-date-picker,date">仅日期（2020-03-11 ）</el-radio>
                              </el-col>
                              <el-col :span="12">
                                <el-radio label="el-time-select">仅时间（09:12）</el-radio>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="12">
                                <el-radio label="el-date-picker,daterange">时间段（2020-03-11 12:12-2020-04-11）</el-radio>
                              </el-col>
                            </el-row>
                          </el-radio-group>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-collapse-item>
                <span class="card-add-ziduan" @click="addField(index)">
                  <i class="el-icon-circle-plus-outline"></i>
                  添加字段
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
            </el-collapse>
          </div>
          <p class="border-title card-title-margin">应用权限</p>
          <el-form-item label="模板图标" prop="delivery">
            <el-popover placement="right" ref="popoverRef" title="选择图标" width="200" trigger="click" content="选择图标">
              <li v-for="icon in iconList" :key="icon.icon" class="record-icon-box" @click="changIcon(icon)">
                <div class="record-icon-box-content">
                  <img :src="icon.icon" alt="">
                </div>
              </li>
              <li slot="reference" class="record-icon-box">
                <div class="record-icon-box-content" style="line-height: 90px;">
                  <img :src="formData.icon" alt="">
                </div>
              </li>
            </el-popover>

            <!-- <canvas id="myCanvas" width="64" height="64" style="border:1px solid #c3c3c3;">
              您的浏览器不支持 HTML5 canvas 标签。
            </canvas> -->

          </el-form-item>

          <!-- <el-button slot="reference">click 激活</el-button> -->

          <el-form-item label="适用范围" prop="resource">
            <el-radio-group v-model="formData.resource" style="width:100%" class="card-select">
              <div class="el-form-item__content">
                <el-radio label="指定人员使用"></el-radio>
                <el-form-item v-if="formData.resource=='指定人员使用'" prop="delivery" class="lawPersonBox card-user-box">
                  <el-select ref="lawPersonListId" v-model="formData.lawPersonListId" multiple @remove-tag="removeLawPersontag">
                    <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
                  </el-select>
                  <el-button icon="el-icon-plus" @click="addLawPerson"></el-button>
                </el-form-item>
              </div>
              <div class="el-form-item__content">
                <el-radio label="机构内使用"></el-radio>
                <el-form-item v-if="formData.resource=='机构内使用'" prop="delivery" class="lawPersonBox card-user-box">
                  <el-popover placement="bottom" trigger="click" style="z-index:3300" v-model="visiblePopover">
                    <div class="departOrUserTree" style="width:600px">
                      <div class="treeBox">
                        <el-tree class="filter-tree" :data="organData" :props="defaultProps" node-key="id" :filter-node-method="filterNode" :default-expanded-keys="defaultExpandedKeys" @node-expand="nodeExpand" ref="tree" @node-click="handleNodeClick1">
                          <span class="custom-tree-node" slot-scope="{ node,data }">
                            <span>
                              <i :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"></i>
                              <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
                            </span>
                          </span>
                        </el-tree>
                      </div>
                    </div>
                    <el-input slot="reference" v-model="formData.orgData" placeholder="请输入选项" clearable style="width:100%">
                    </el-input>
                  </el-popover>

                </el-form-item>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="模板管理者" prop="region">
            <el-form-item prop="delivery" class="lawPersonBox card-user-box-big">
              <el-select ref="lawPersonListId" v-model="formData.lawPersonListId" multiple @remove-tag="removeLawPersontag">
                <el-option v-for="item in alreadyChooseLawPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select>
              <el-button icon="el-icon-plus" @click="addLawPerson"></el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer footer_fixed">
        <el-button type="primary" @click="submitForm('formData')">发布</el-button>
        <el-button @click="preview('formData')">预览</el-button>
        <!-- <el-button @click="resetForm('elForm')">重置</el-button> -->
      </div>
    </el-drawer>
    <chooseLawPerson ref="chooseLawPersonRef" @setLawPer="setLawPerson" @userList="getAllUserList"></chooseLawPerson>
    <preview ref="previewRef" @userList="getAllUserList"></preview>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import chooseLawPerson from "@/page/caseHandle/unRecordCase/chooseLawPerson.vue";
import preview from "./previewDialog.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    chooseLawPerson,
    preview
  },
  data() {
    return {
      newModleTable: false,
      currentUserLawId: '',
      activeNames: [0],

      alreadyChooseLawPerson: [],//已选择人员列表
      defaultExpandedKeys: [],
      organData: [],//机构列表
      lawCateList: [], //业务领域列表
      globalCont: 1,
      defaultProps: {
        children: "children",
        label: "label"
      },
      visiblePopover: false,
      compData: [],
      iconList: [//图标库
        {
          icon: './static/images/img/record/icon_yzt.png',
          name: '运政通用记录',
        }, {
          icon: './static/images/img/record/icon_hyj.png',
          name: '货运检查记录表',
        }, {
          icon: './static/images/img/record/icon_kyj.png',
          name: '客运检查记录表',
        },
        {
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
        },
        {
          icon: './static/images/img/record/icon_yzty.png',
          name: '运政通用型检查记录',
        }
      ],
      formData: {
        name: '',
        region: '',
        filedType: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        staff: "",
        icon: './static/images/img/record/icon_qit.png',
        cateId: '',
        modleTitle: '',
        modleIcon: '',
        modleLimit: '',
        modleLimitUser: '',
        modleLimitParty: '',
        modleManager: '',
        groupList: [
          {
            value: 1,
            filedList: [
              {
                "label": "姓名",
                "tag": "el-input",
                "tagIcon": "input",
                "placeholder": "请输入单行文本",
                dataType: 'el-date-picker,datetime,yyyy-MM-dd HH:mm:ss',
                radioList: [{ value: "" }],
                checkboxList: [],
                "span": 24,
                "style": {
                  "width": "100%"
                },
                "clearable": true,
                "prepend": "",
                "append": "",
                "maxlength": null,
                "show-word-limit": false,
                "readonly": false,
                "disabled": false,
                "required": true,
                "regList": [],
                "changeTag": true,
                "document": "https://element.eleme.cn/#/zh-CN/component/input",
                "formId": 101,
                "renderKey": 1590390295948,
                "layout": "colFormItem",
                "vModel": "field101",
              },
              {
                "label": "电话",
                "tag": "el-input",
                "tagIcon": "input",
                "placeholder": "请输入单行文本",
                dataType: 'el-date-picker,datetime,yyyy-MM-dd HH:mm:ss',
                radioList: [{ value: "" }],
                "span": 24,
                "style": {
                  "width": "100%"
                },
                "clearable": true,
                "prepend": "",
                "append": "",
                "maxlength": null,
                "show-word-limit": false,
                "readonly": false,
                "disabled": false,
                "required": true,
                "regList": [],
                "changeTag": true,
                "document": "https://element.eleme.cn/#/zh-CN/component/input",
                "formId": 102,
                "renderKey": 1590390307059,
                "layout": "colFormItem",
                "vModel": "field102"
              }
            ],

          }],
        "formRef": "elForm",
        "formModel": "formData",
        "size": "medium",
        "labelPosition": "right",
        "labelWidth": 100,
        "formRules": "rules",
        "gutter": 15,
        "disabled": false,
        "span": 24,
        "formBtns": true
      },
      defautfiledList: { filed: "", radioList: [{}] },
      rules: {
        modleTitle: [
          { required: true, message: '模板标题', trigger: 'blur' },
        ],
        cateId: [
          { required: true, message: '业务领域', trigger: 'blur' },
        ],
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
    showModal() {
      this.getEnforceLawType();
      this.setLawPersonCurrentP();
      this.getAllOrgan('root');
      this.newModleTable = true;
      this.$nextTick(() => {
        // this.draw()
        this.resetForm('elForm')

      });
    },
    addGroup(index) {
      this.formData.groupList.push({ "value": this.globalCont, filedList: [] })
      this.globalCont++;
      console.log('formData.groupList', this.formData.groupList)
    },
    delGroup(item) {
      console.log(item)
      var index = this.formData.groupList.indexOf(item)
      console.log(index)
      if (index !== -1) {
        this.formData.groupList.splice(index, 1)
      }
    },
    addField(index) {
      console.log(index)
      this.formData.groupList[index].filedList.push(this.defautfiledList)
    },
    delFiled(filed, filedList) {
      console.log(filed)
      var index = filedList.indexOf(filed)
      console.log(index)
      if (index !== -1) {
        filedList.splice(index, 1)
      }
    },
    delRadioList(radio, radioList) {
      console.log(radio)
      if (radioList.length > 1) {
        var index = radioList.indexOf(radio)
        console.log(index)
        if (index !== -1) {
          radioList.splice(index, 1)
        }
      }
      else {
        this.$message({ message: '最少支持一个选项!', type: 'warning' });
      }

    },
    addRadioList(radioList) {
      if (radioList.length <= 5) {
        radioList.push({ value: '' })
      }
      else {
        this.$message({ message: '最多支持六个选项!', type: 'warning' });
      }
    },
    draw() {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.font = "bolder 36px Arial";
      ctx.textAlign = 'center'
      ctx.fillStyle = '#6D7B8F'
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
      this.$refs.chooseLawPersonRef.showModal(this.formData.lawPersonListId, this.alreadyChooseLawPerson);
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
      this.formData.lawPersonListId = [];
      let staffIdArr = [];
      let staffArr = [];
      let certificateIdArr = [];

      this.alreadyChooseLawPerson.forEach(item => {
        this.formData.lawPersonListId.push(item.id);
        //给表单数据赋值
        staffIdArr.push(item.id);
        staffArr.push(item.lawOfficerName);
        certificateIdArr.push(item.selectLawOfficerCard);
      });
      // this.formData.staffId = staffIdArr.join(',');
      // this.formData.staff = staffArr.join(',');
      // this.formData.certificateId = certificateIdArr.join(',');

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
            _this.formData.lawPersonListId = [];
            _this.alreadyChooseLawPerson = [];

            res.data.forEach(item => {
              if (
                item.userId == iLocalStroage.gets("userInfo").id
              ) {
                currentUserData.id = item.id;
                currentUserData.lawOfficerName = item.lawOfficerName;
                currentUserData.selectLawOfficerCard = item.lawOfficerCards.split(",")[0]
                _this.alreadyChooseLawPerson.push(currentUserData);
                _this.formData.lawPersonListId.push(currentUserData.id);
                _this.currentUserLawId = currentUserData.id;
                _this.formData.staff = item.lawOfficerName;
                _this.formData.staffId = item.id;


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
        this.formData.lawPersonListId.push(val);
        this.$message('该执法人员不能删除！');
      }
    },
    // 获取机构
    getAllOrgan(organId) {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.defaultExpandedKeys.push(res.data[0].id);
          _this.selectCurrentTreeName = _this.selectCurrentTreeName
            ? _this.selectCurrentTreeName
            : res.data[0].label;
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              _this.defaultExpandedKeys.push(item.id);
            });
          }
          _this.organData = res.data;
          console.log(_this.defaultExpandedKeys);
          console.log(_this.organData);
          if (organId == "root") {
            _this.currentOrganId = res.data[0].id;
          } else {
            _this.currentOrganId = organId;
          }
          //   _this.getSelectOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
    handleNodeClick1(data) {
      this.formData.orgData = data.label;
      this.visiblePopover = false;
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //获取业务领域
    getEnforceLawType() {
      let _this = this
      this.$store.dispatch("getEnforceLawType", "1").then(
        res => {
          _this.lawCateList = res.data;
          console.log('列表121', _this.lawCateList)
        },
        err => {
          console.log(err);
        }
      );
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
    // 选择图标
    changIcon(icon) {
      this.formData.icon = icon.icon;
      this.$refs[`popoverRef`].doClose();
    },
    // 预览
    preview() {
      this.$refs.previewRef.showModal(this.compData);
    },
    handleChange(val) {
      console.log(val);
    },
    // form类型
    changeFiledType(filed) {
      // if (filed.tag == 'el-radio-group') {
      //   // 单选
      //   if (filed.radioList.length == 0) {
      //     this.addRadioList
      //   }
      // }
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