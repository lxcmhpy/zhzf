<template>
  <div>
    <!-- 创建模板 -->
    <el-drawer :title="drawerTitle" :visible.sync="newModleTable" direction="rtl" :wrapperClosable='false' size="50%" :before-close="handleClose" class="dialo dialog_unlaw max-group-prepend card-drawer">
      <div style="padding：22px;" class="demo-drawer__content error-index">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
          <el-col :span="7">
            <el-form-item label="业务领域" prop="domain">
              <el-select v-model="formData.domain" placeholder="选择所属业务领域">
                <el-option v-for="item in lawCateList" :key="item.cateId" :label="item.cateName" :value="item.cateName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item label="模板标题" prop="title">
              <el-input v-model="formData.title" placeholder="请输入模板标题" clearable @input="changeTitle">
              </el-input>
            </el-form-item>
          </el-col>
          <p class="border-title card-title-margin clear">添加指标
            <span class="card-add-btn">
              <el-button icon="el-icon-plus" size="medium" @click="addGroup()">添加新字段组</el-button>
            </span>
          </p>
          <!-- {{formData.templateFieldList}} -->
          <div class="collapse-title-foem">
            <el-collapse v-model="activeNames" class="clear">
              <div v-for="(item,index) in formData.templateFieldList" :key="index">
                <el-collapse-item :name="item.sort" style="margin-top:12px">
                  <template slot="title">
                    <i class="iconfont law-icon_zhankai zhankai"></i>
                    <i class="iconfont law-btn_shousuo shousuo"></i>
                    <el-form-item prop="class" label-width="0" style="width:100%;margin-bottom: 10px;">
                      <el-select v-model="item.classs" filterable allow-create clearable placeholder="请输入字段组名称，可为空" @change="changeGroup(item)">
                        <el-option v-for="(commonField,index) in commonGroupFieldList" :key="index" :label="commonField.classs" :value="commonField.classs"></el-option>
                      </el-select>
                    </el-form-item>
                    <i class="el-icon-remove" style="margin-left:18px" @click="delField(item,formData.templateFieldList)"></i>
                  </template>
                  <!-- 是否转立案字段 -->
                  <span v-if="item.classs=='是否转立案'">
                    <div v-for="field in item.fieldList" :key="field.id">
                      <el-row :gutter="20">
                        <el-col :span="2">
                          <el-form-item label-width="0" prop="required">
                            <el-checkbox v-model="field.required" true-label="true" false-label="false">必填</el-checkbox>
                          </el-form-item>
                        </el-col>
                        <el-col :span="22">
                          <el-form-item label-width="0" style="width:calc(100% - 34px)" prop="type">
                            <el-select v-model="field.type" placeholder="请选择字段类型" @change="changeFieldType(field)" :disabled="field.status===0?true:false">
                              <el-option label="文本型" value="文本型"></el-option>
                              <el-option label="单选型" value="单选型"></el-option>
                              <el-option label="复选型" value="复选型"></el-option>
                              <el-option label="日期型" value="日期型"></el-option>
                              <el-option label="数字型" value="数字型"></el-option>
                              <el-option label="表达式" value="表达式"></el-option>
                            </el-select>
                          </el-form-item>
                          <!-- <i class="el-icon-remove-outline" @click="delField(field,item.fieldList)" style="margin-left:18px;margin-top:-38px;float:right"></i> -->
                        </el-col>
                      </el-row>
                      <el-row class="mimi-content">
                        <el-col :span="22" :offset="2" class="card-bg-content min-lable">
                          <el-form-item v-for="(radio,index) in field.options" :key="index" label-width="0" prop="value">
                            <!-- <i class="el-icon-remove-outline" style="margin-right:14px" @click="delField(radio,field.options)"></i> -->
                            <el-input size="mini" v-model="radio.value" placeholder="请输入选项" clearable style="width: calc(100% - 70px)" :disabled="field.status===0?true:false">
                            </el-input>
                            <!-- <i class="el-icon-circle-plus-outline" style="margin-left:14px" @click="addRadioList(field.options)"></i> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </span>
                  <!-- 字段 -->

                  <!-- <div> -->
                  <el-form ref="childForm" v-for="(field,index1) in formData.templateFieldList[index].fieldList" :key="index1" :model="formData.templateFieldList[index]">
                    <el-row :gutter="20">
                      <el-col :span="2">
                        <el-form-item label-width="0" prop="required">
                          <el-checkbox v-model="field.required" true-label="true" false-label="false">必填</el-checkbox>
                        </el-form-item>
                      </el-col>
                      <!-- {{field}} -->
                      <el-col :span="16">
                        <!-- <el-form :model="field" ref="filedForm"> -->
                        <el-form-item label-width="0" :prop="'fieldList[' + index1 +  '].info'" :rules="{ required: true, message: '请输入字段名称', trigger: 'change' }">
                          <!-- <el-input v-model="field.title" placeholder="请填写字段名称" clearable :style="{width: '100%'}">
                          </el-input> -->

                          <!-- 改成选择字段 -->
                          <el-select v-model="field.info" filterable value-key="id" allow-create clearable placeholder="请填写字段名称" @change="changeField(field.info,field)">
                            <el-option v-for="(commonField,index) in commonFieldList" :key="index" :label="commonField.title" :value="commonField"></el-option>
                          </el-select>

                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label-width="0" style="width:calc(100% - 34px)" prop="type">
                          <el-select v-model="field.type" placeholder="请选择字段类型" @change="changeFieldType(field)" :disabled="field.status===0?true:false">
                            <el-option label="文本型" value="文本型"></el-option>
                            <el-option label="单选型" value="单选型"></el-option>
                            <el-option label="复选型" value="复选型"></el-option>
                            <el-option label="日期型" value="日期型"></el-option>
                            <el-option label="数字型" value="数字型"></el-option>
                            <el-option label="表达式" value="表达式"></el-option>
                          </el-select>
                        </el-form-item>
                        <i class="el-icon-remove-outline" @click="delField(field,item.fieldList)" style="margin-left:18px;margin-top:-38px;float:right"></i>
                      </el-col>
                    </el-row>
                    <el-row class="mimi-content" v-if="field.type=='抽屉型'||field.type=='单选型'||field.type=='复选型'">
                      <el-col :span="22" :offset="2" class="card-bg-content min-lable">
                        <!-- <el-form-item label="占位符(字段填报说明)：" label-width="165px" prop="remark">
                          <el-input size="mini" v-model="field.remark" clearable>
                          </el-input>
                        </el-form-item> -->
                        <el-form-item v-for="(radio,index) in field.options" :key="index" label-width="0" prop="value">
                          <i class="el-icon-remove-outline" style="margin-right:14px" @click="delField(radio,field.options)"></i>
                          <el-input size="mini" v-model="radio.value" placeholder="请输入选项" clearable style="width: calc(100% - 70px)" :disabled="field.status===0?true:false">
                          </el-input>
                          <i class="el-icon-circle-plus-outline" style="margin-left:14px" @click="addRadioList(field.options)"></i>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row class="mimi-content" v-if="field.type=='日期型'">
                      <el-col :span="22" :offset="2" class="card-bg-content min-lable">
                        <el-row>
                          <!-- <el-form-item label="占位符(字段填报说明)：" label-width="165px">
                            <el-input size="mini" v-model="field.remark" clearable>
                            </el-input>
                          </el-form-item> -->
                          <el-radio-group v-model="field.options[0].value" style="width: 100%;margin-top:15px" :disabled="field.status===0?true:false">
                            <el-row>
                              <el-col :span="12">
                                <el-radio label="yyyy-MM-dd HH:mm:ss">精准时间（2020-03-11 12:12:12）</el-radio>
                              </el-col>
                              <el-col :span="12">
                                <el-radio label="yyyy-MM-dd HH:mm">日期和时间（2020-03-11 12:12）</el-radio>
                              </el-col>
                              <el-col :span="12">
                                <el-radio label="yyyy-MM-dd">仅日期（2020-03-11 ）</el-radio>
                              </el-col>
                              <el-col :span="12">
                                <el-radio label="HH:mm">仅时间（09:12）</el-radio>
                              </el-col>
                              <!-- <el-col :span="12">
                                <el-radio label="el-date-picker,daterange">时间段（2020-03-11 12:12-2020-04-11）</el-radio>
                              </el-col> -->
                            </el-row>
                          </el-radio-group>
                        </el-row>
                      </el-col>
                    </el-row>
                    <el-row class="mimi-content" v-if="field.type=='文本型'||field.type=='数字型'||field.type=='表达式'||field.type=='地址型'||field.type=='引用型'">
                      <el-col :span="22" :offset="2" class="card-bg-content min-lable">
                        <el-form-item label="占位符(字段填报说明)：" label-width="165px">
                          <el-input size="mini" v-model="field.remark" clearable>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>

                  <!-- </div> -->

                </el-collapse-item>
                <span class="card-add-ziduan" @click="addField(item,index)" v-if="item.classs!='是否转立案'">
                  <i class="el-icon-circle-plus-outline"></i>
                  添加字段
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
            </el-collapse>
          </div>
          <p class="border-title card-title-margin">应用权限</p>
          <el-form-item label="模板图标">
            <el-popover placement="right" ref="popoverRef" title="选择图标" width="200" trigger="click" content="选择图标">
              <li v-for="icon in iconList" :key="icon.icon" class="record-icon-box" @click="changIcon(icon)">
                <div class="record-icon-box-content">
                  <img :src="'./static/images/img/record/'+icon.icon+'.png'" alt="">
                </div>
              </li>
              <li slot="reference" class="record-icon-box">
                <div class="record-icon-box-content" style="line-height: 90px;">
                  <img v-if='formData.icon!=""&&formData.icon' :src="'./static/images/img/record/'+formData.icon+'.png'" alt="">
                  <span v-else style="margin-top:-17px;color:#667589;font-size:36px;display:block;">{{titileText}}</span>
                </div>
              </li>
            </el-popover>

          </el-form-item>
          <el-form-item label="适用范围" prop="scopeOfUse">
            <el-radio-group v-model="formData.scopeOfUse" style="width:100%" class="card-select">
              <div class="el-form-item__content">
                <el-radio label="指定人员使用"></el-radio>
                <el-form-item v-if="formData.scopeOfUse=='指定人员使用'" class="lawPersonBox card-user-box">
                  <el-select ref="templateUserIdList" value-key="id" v-model="formData.templateUserIdList" multiple filterable @remove-tag="removeUsertag" @change="changeUser">
                    <span class="el-select-dropdown__item" style="background:#eaedf4;height: 34px;display: block;">本机构执法人员({{LawOfficerList.length}})</span>
                    <el-option v-for="item in LawOfficerList" :key="item.id" :label="item.lawOfficerName" :value="item" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="el-form-item__content">
                <el-radio label="机构内使用"></el-radio>
                <el-form-item v-if="formData.scopeOfUse=='机构内使用'" class="lawPersonBox card-user-box">
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
                    <el-input slot="reference" v-model="formData.templateOrgan" placeholder="请输入选项" clearable style="width:100%">
                    </el-input>
                  </el-popover>

                </el-form-item>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="模板管理者">
            <el-form-item class="lawPersonBox card-user-box-big" style="width:100%">
              <el-select ref="templateAdminIdList" value-key="id" v-model="formData.templateAdminIdList" multiple filterable @remove-tag="removeAdmintag">
                <span class="el-select-dropdown__item" style="background:#eaedf4;height: 34px;display: block;">本机构执法人员({{LawOfficerList.length}})</span>
                <el-option v-for="item in LawOfficerList" :key="item.id" :label="item.lawOfficerName" :value="item" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer footer_fixed">
        <el-button type="primary" @click="submitForm('formData')">发布</el-button>
        <el-button @click="preview(formData)">预览</el-button>
        <!-- <el-button @click="resetForm('formData')">重置</el-button>< -->
      </div>
    </el-drawer>
    <preview ref="previewRef" @fieldList="getAllFieldList"></preview>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import preview from "./previewDialog.vue";
import { mapGetters } from "vuex";
import {  saveOrUpdateRecordModleApi, findCommonGroupFieldApi, findAllCommonGroupFieldApi, findRecordModleByIdApi,
  findRecordlModleFieldByIdeApi, findAllCommonFieldApi, findAllCandidateFieldApi} from "@/api/Record";
import { findLawOfficerListApi } from "@/api/caseHandle";
export default {
  components: {
    preview
  },
  data() {
    return {
      drawerTitle: '创建模板',
      titileText: '',
      newModleTable: false,
      currentUserLawId: '',
      activeNames: [0],
      LawOfficerList: [],//执法人员列表
      alreadyChooseAdminPerson: [],//已选择管理人员列表
      alreadyChooseUserPerson: [],//已选择使用人员列表
      defaultExpandedKeys: [],
      organData: [],//机构列表
      lawCateList: [], //业务领域列表
      globalCont: 1,//key1
      globalContGroup: 1,//key1
      defaultProps: {
        children: "children",
        label: "label"
      },
      visiblePopover: false,
      compData: [],//预览数据
      iconList: [//图标库
        {
          icon: 'icon_yzt',
          name: '运政通用记录',
        }, {
          icon: 'icon_hyj',
          name: '货运检查记录表',
        }, {
          icon: 'icon_kyj',
          name: '客运检查记录表',
        },
        {
          icon: 'icon_gl',
          name: '公路巡查',
        }, {
          icon: 'icon_lc',
          name: '路产损坏记录',
        }, {
          icon: 'icon_jz',
          name: '建筑控制区记录',
        }, {
          icon: 'icon_qit',
          name: '运政通用记录',
        },
        {
          icon: 'icon_yzty',
          name: '运政通用型检查记录',
        }
      ],
      formData: {
        // id:'',
        id: '',//修改必传
        templateOrgan: '',
        templateOrganId: '',
        templateUser: '',
        templateUserId: '',
        templateUserIdList: [],
        templateAdmin: '',
        templateAdminId: '',
        templateAdminIdList: [],
        templateType: '记录',//模板类型
        createName: '',//创建人
        organId: '',//创建人机构id
        organName: '',//创建人机构名称
        icon: '',
        domain: '',
        title: '',
        scopeOfUse: '指定人员使用',
        templateFieldList: [
          {
            // value: ,
            sort: 0,//新加-前端定义
            classs: '',
            classsId: '',
            fieldList: [
              {
                id: '',//字段id-修改
                type: '文本型',//必要-字段类型，不可改
                field: 'key0',//必要-字段英文名
                title: '',//必要-字段中文名
                required: true,
                remark: '',//占位符
                options: [//抽屉值
                  { "value": "", "label": "" },
                ],
                status: '1',//0是不可修改field，1可修改
                // templateId: '',//修改必传=formdata.id
              },
            ],

          }],
        count: 0
      },
      commonGroupFieldList: [],
      commonFieldList: [],
      defautfieldList: {
        // id: '',//字段id
        // classs: '',
        type: '文本型',//必要-字段类型，不可改
        field: '',//必要-字段英文名
        title: '',//必要-字段中文名
        remark: '',//占位符
        required: false,
        options: [
          { "value": "" },
        ],
        status: '1',//0是不可修改field，1可修改
        // templateId: '',//修改必传=formdata.id
      },
      defaultTemplateFieldList: [
        {
          // value: ,
          sort: 0,//新加-前端定义
          classs: '',
          classsId: '',
          fieldList: [
            {
              id: '',//字段id-修改
              type: '文本型',//必要-字段类型，不可改
              field: 'key0',//必要-字段英文名
              title: '',//必要-字段中文名
              required: true,
              remark: '',//占位符
              options: [//抽屉值
                { "value": "", "label": "" },
              ],
              status: '1',//0是不可修改field，1可修改
              // templateId: '',//修改必传=formdata.id
            },
          ],

        }],
      editId: '',
      rules: {
        title: [
          { required: true, message: '请输入模板标题', trigger: 'blur' },
        ],
        domain: [
          { required: true, message: '请输入业务领域', trigger: 'blur' },
        ],
        scopeOfUse: [
          { required: true, message: '请选择适用范围', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    showModal(editdata) {
      if (editdata) {
        this.editId = editdata.id;
        this.findDataByld()
        this.drawerTitle = '修改模板'
        this.globalCont = editdata.count + 1;

      }
      this.findCommonGroupField()
      this.findCommonField()
      this.getEnforceLawType();
      this.setLawPersonCurrentP();
      this.getAllOrgan('root');
      this.getPerson()
      this.newModleTable = true;
    },
    // 根据id查找
    findDataByld() {
      let _this = this
      findRecordlModleFieldByIdeApi(this.editId).then(
        res => {
          let list = res.data
          let sort = 0
          list.forEach(element => {
            element.sort = sort;
            sort++;
            element.fieldList.forEach(item => {
              if (item.options) {
                item.options = JSON.parse(item.options)
              }
            });
          });
          findRecordModleByIdApi(this.editId).then(
            res => {
              if (res.code == 200) {
                // _this.formData ={..._this.formData, ...res.data}
                _this.formData = res.data
                _this.$set(_this.formData, 'templateFieldList', list);
                // _this.formData.templateFieldList = list
                this.globalContGroup = _this.formData.templateFieldList.length;
                // _this.formData.templateAdminIdList = _this.formData.templateAdminId.split(",")
                _this.formData.templateUserIdList = [];
                _this.formData.templateAdminIdList = [];
                if (_this.formData.templateUser) {
                  let user = _this.formData.templateUser.split(",")
                  let userId = _this.formData.templateUserId.split(",")
                  user.forEach((element, index) => {
                    console.log('index', index)
                    _this.formData.templateUserIdList.push({ id: userId[index], lawOfficerName: element })
                  });
                }
                let admin = _this.formData.templateAdmin.split(",")
                let adminId = _this.formData.templateAdminId.split(",")


                admin.forEach((element, index) => {
                  _this.formData.templateAdminIdList.push({ id: adminId[index], lawOfficerName: element })
                });

                console.log('_this.formData.templateUserIdList', _this.formData.templateUserIdList)
                console.log('_this.formData.templateAdminIdList', _this.formData.templateAdminIdList)
                // 修改-无图标时
                if (_this.formData.icon == '' || _this.formData.icon == null) {
                  _this.titileText = _this.formData.title.charAt(0)
                }

              }
            },
            error => {

            })
        },
        error => {

        })

    },
    // 获取通用字段组
    findCommonGroupField() {
      findAllCommonGroupFieldApi().then(
        res => {
          this.commonGroupFieldList = res.data
          this.commonGroupFieldList.forEach(element => {
            element.fieldList.forEach(item => {
              if (item.options) {
                item.options = JSON.parse(item.options)

              }
              // 改成选择字段
              let itemData = JSON.parse(JSON.stringify(item))
              console.log('itemData', itemData)
              item.info = itemData.title
              console.log(item)
            });
          });
          console.log('common', this.commonGroupFieldList)
          // 获取通用字段
          // this.commonFieldList = this.commonGroupFieldList[3].fieldList
        },
        error => {

        })
    },
    // 获取通用字段组
    findCommonField() {
      findAllCandidateFieldApi().then(
        res => {

          // 获取通用字段
          this.commonFieldList = res.data
        },
        error => {

        })
    },

    // 获取机构下的人员
    getPerson() {
      findLawOfficerListApi(iLocalStroage.gets("userInfo").organId).then(
        res => {
          this.LawOfficerList = res.data
        },
        error => {

        })
    },
    addGroup() {
      let indexSort = this.formData.templateFieldList.length
      this.formData.templateFieldList.push({ sort: this.globalContGroup, classs: '', fieldList: [] })
      // debugger
      let pushDataList = JSON.parse(JSON.stringify(this.defautfieldList));
      pushDataList.field = 'key' + this.globalContGroup

      this.formData.templateFieldList[indexSort].fieldList.push(pushDataList)
      this.activeNames.push(this.globalContGroup)
      console.log('activetiname', this.activeNames)
      this.globalContGroup++
      this.globalCont++;
    },

    addField(item, index) {
      console.log('item', item)
      console.log('push前', item.fieldList)

      console.log('field index', item)
      if (this.activeNames.indexOf(item.sort) == -1) {
        this.activeNames.push(item.sort)
      }

      let pushDataList = JSON.parse(JSON.stringify(this.defautfieldList));
      pushDataList.field = 'key' + this.globalCont;
      this.globalCont++
      console.log('pushDataList', pushDataList)
      // let length = item.fieldList.length
      item.fieldList.push(pushDataList);

      this.formData.templateFieldList[index].fieldList.sort()
      // let a = [...item.fieldList,pushDataList];
      // this.formData.templateFieldList[index].fieldList =a;
      // item.fieldList.length++
      // this.$set('item.fieldList', length, pushDataList)
      console.log('push后', item.fieldList)
    },
    delField(field, fieldList) {
      console.log(field)
      if (fieldList.length > 1) {
        var index = fieldList.indexOf(field)
        console.log(index)
        if (index !== -1) {
          fieldList.splice(index, 1)
        }
      } else {
        this.$message({ message: '不可删除，最少支持一个选项!', type: 'warning' });
      }
    },
    addRadioList(options) {
      if (options.length <= 9) {
        options.push({ value: '' })
      }
      else {
        this.$message({ message: '最多支持六个选项!', type: 'warning' });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let canSubmit = true;
          // 验证字段中文名
          for (var i = 0; i < this.$refs["childForm"].length; i++) {
            this.$refs["childForm"][i].validate(isVaild => {
              if (isVaild) {
                console.log("ffff");
              } else {
                canSubmit = false;
                return;
              }
            });
          }
          if (canSubmit) {
            debugger
            console.log(this.formData.templateFieldList, ':', this.defaultTemplateFieldList)
            let fieldList = JSON.stringify(this.formData.templateFieldList)
            let defaultFieldList = JSON.stringify(this.defaultTemplateFieldList)
            console.log(fieldList, ':', defaultFieldList)
            if (fieldList == defaultFieldList) {
              this.$message('该请至少添加一个字段！');
            }
            else {
              this.$confirm('完成当前模板，并发布？', "模板发布", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                console.log('submit')
                let data = JSON.parse(JSON.stringify(this.formData))
                data.templateAdminId = '';
                data.templateUserId = ''
                let sort = this.globalCont
                console.log('复制的', data.templateFieldList)
                data.templateFieldList.forEach(element => {
                  element.fieldList.forEach(item => {
                    item.sort = sort;
                    sort++
                  });
                });
                data.count = sort;
                console.log('templateAdminId', data.templateAdminIdList)
                console.log('templateUserIdList', data.templateUserIdList)
                data.templateAdminIdList.forEach(element => {
                  data.templateAdminId = data.templateAdminId + ',' + element.id
                  data.templateAdmin = data.templateAdmin + ',' + element.lawOfficerName
                });
                data.templateUserIdList.forEach(element => {
                  data.templateUser = data.templateUser + ',' + element.lawOfficerName
                  data.templateUserId = data.templateUserId + ',' + element.id
                });
                // 未做ie浏览器兼容处理
                if (data.templateAdminId.substr(0, 1) == ',') {
                  data.templateAdminId = data.templateAdminId.substr(1)
                }
                if (data.templateAdmin.substr(0, 1) == ',') {
                  data.templateAdmin = data.templateAdmin.substr(1)
                }
                if (data.templateUserId.substr(0, 1) == ',') {
                  data.templateUserId = data.templateUserId.substr(1)
                }
                if (data.templateUser.substr(0, 1) == ',') {
                  data.templateUser = data.templateUser.substr(1)
                }
                data.templateUserIdList = '';
                data.templateAdminIdList = '';
                // this.formData.templateOrganId = this.organData.find(item => item.templateOrgan === this.formData.templateOrgan);
                data.templateFieldList = JSON.stringify(data.templateFieldList)
                console.log('提交的字段', data)
                debugger
                saveOrUpdateRecordModleApi(data).then(
                  res => {
                    console.log(res)
                    if (res.code == 200) {
                      this.$message({
                        type: "success",
                        message: res.msg
                      });
                      this.$emit("getAddModle", 'sucess');
                      this.resetForm('formData')
                      this.newModleTable = false;
                    } else {
                      this.$message.error(res.msg);
                    }
                  },
                  error => {

                  })
              })

            }
          } else {
            this.$message({ message: '字段中文名必填', type: 'warning' });
            return false;
          }

        } else {
          this.$message({ message: '请完善模板内容', type: 'warning' });
          return false;
        }
      });
    },
    //默认设置执法人员为当前用户 需要用用户的id去拿他作为执法人员的id
    setLawPersonCurrentP() {
      let _this = this
      this.formData.organId = iLocalStroage.gets("userInfo").organId;
      this.formData.organName = iLocalStroage.gets("userInfo").organName;
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            console.log('执法人员列表', res)
            _this.userList = res.data;
            let currentUserData = {};
            _this.formData.templateUserIdList = [];
            _this.formData.templateAdminIdList = [];
            res.data.forEach(item => {
              if (
                item.userId == iLocalStroage.gets("userInfo").id
              ) {
                _this.formData.templateAdminIdList.push(item);
                _this.formData.templateUserIdList.push(item);
                _this.currentUserLawId = item.id;
                // 创建人
                _this.formData.createName = item.lawOfficerName;
              }
            });
          },
          err => {
            console.log(err);
          }
        );
    },
    removeUsertag(val) {
      if (this.currentUserLawId == val.id) {
        this.formData.templateUserIdList.push(val);
        this.$message('该执法人员不能删除！');
      }
    },
    removeAdmintag(val) {
      if (this.currentUserLawId == val.id) {
        this.formData.templateAdminIdList.push(val);
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
          if (organId == "root") {
            _this.currentOrganId = res.data[0].id;
          } else {
            _this.currentOrganId = organId;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    handleNodeClick1(data) {
      this.formData.templateOrgan = data.label;
      this.formData.templateOrganId = data.id;
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
          // console.log('列表121', _this.lawCateList)
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
    changeTitle() {
      this.titileText = this.formData.title.charAt(0)
    },
    // 预览
    preview() {
      this.compData = this.formData
      this.$refs.previewRef.showModal(this.compData);
    },
    getAllFieldList(list) {
      console.log('传递数据-预览', list)
    },
    // form类型
    changeFieldType(field) {
      console.log('change', field)
      if (field.type == '日期型') {
        //   // 默认日期类型
        field.options[0].value = 'yyyy-MM-dd HH:mm:ss'
      }
    },
    // 选中组
    changeGroup(group) {
      // debugger
      var defaut = this.commonGroupFieldList.find(item => item.classs === group.classs)
      console.log(defaut)
      if (defaut) {
        // 通用字段
        group.fieldList = defaut.fieldList
        console.log('ggroup.fieldList', group.fieldList)

      } else if (!group.fieldList || group.fieldList.length == 0) {
        console.log(group.fieldList)
        group.fieldList = [];
        let defautfieldList = JSON.parse(JSON.stringify(this.defautfieldList))
        defautfieldList.title = '';
        group.fieldList.push(defautfieldList)
      }
    },
    changeField(info, field) {
      // debugger
      console.log('选中的字段info', info)
      console.log('选中的字段', field)
      if (info.id) {
        // 判断是不是通用字段
        field.id = field.info.id
        field.field = field.info.field
        field.title = field.info.title
        field.type = field.info.type || '文本型'
        field.options = JSON.parse(field.info.options)
        field.sort = field.sort
        field.remark = field.info.remark
        field.required = field.info.required
        field.status = field.info.status
        field.templateId = field.info.templateId
      } else {
        field.title = info
      }

    },
    handleClose() {
      // debugger
      this.resetForm('formData')
      this.newModleTable = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.title = ''
      this.titileText = '';
      this.formData.templateFieldList = [
        {
          // value: ,
          sort: 0,//新加-前端定义
          classs: '',
          classsId: '',
          fieldList: [
            {
              id: '',//字段id-修改
              type: '文本型',//必要-字段类型，不可改
              field: 'key0',//必要-字段英文名
              title: '',//必要-字段中文名
              required: true,
              remark: '',//占位符
              options: [//抽屉值
                { "value": "", "label": "" },
              ],
              status: '1',//0是不可修改field，1可修改
              // templateId: '',//修改必传=formdata.id
            },
          ],

        }];
    },
    changeUser(val) {
      console.log(val)
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>