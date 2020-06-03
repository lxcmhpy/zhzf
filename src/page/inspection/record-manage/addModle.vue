<template>
  <div>
    <!-- 创建模板 -->
    <el-drawer :title="drawerTitle"" :visible.sync="newModleTable" direction="rtl" size="50%" class="dialo dialog_unlaw max-group-prepend card-drawer">
      <div style="padding：22px;" class="demo-drawer__content error-index">
        <el-form :model="formData" :rules="rules" ref="elForm" label-width="100px" class="demo-ruleForm">
          <el-col :span="12">
            <el-form-item label="业务领域" prop="domain">
              <el-select v-model="formData.domain" placeholder="请选择">
                <el-option v-for="item in lawCateList" :key="item.cateId" :label="item.cateName" :value="item.cateName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板标题" prop="title">
              <el-input v-model="formData.title" placeholder="请输入模板标题" clearable>
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
                <el-collapse-item :name="index" style="margin-top:12px">
                  <template slot="title">
                    <i class="iconfont law-icon_zhankai zhankai"></i>
                    <i class="iconfont law-btn_shousuo shousuo"></i>
                    <el-form-item prop="class" label-width="0" style="width:100%;margin-bottom: 10px;">
                      <el-select v-model="item.classs" filterable allow-create clearable placeholder="请输入字段组名称，可为空" @change="changeGroup(item)">
                        <el-option v-for="(commonField,index) in commonFieldList" :key="index" :label="commonField.classs" :value="commonField.classs"></el-option>
                      </el-select>
                    </el-form-item>
                    <i class="el-icon-remove" style="margin-left:18px" @click="delField(item,formData.templateFieldList)"></i>
                  </template>
                  <div v-for="field in item.fieldList" :key="field.id">
                    <el-row :gutter="20">
                      <el-col :span="2">
                        <el-form-item label-width="0">
                          <el-checkbox v-model="field.required" true-label="true" false-label="false">必填</el-checkbox>
                        </el-form-item>
                      </el-col>
                      <!-- {{field}} -->
                      <el-col :span="11">
                        <el-form :model="field">
                          <el-form-item label-width="0" prop="title" :rules="{ required: true, message: '请输入字段名称', trigger: 'blur' }">
                            <el-input v-model="field.title" placeholder="请填写字段名称" clearable :style="{width: '100%'}">
                            </el-input>
                          </el-form-item>
                        </el-form>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label-width="0" style="width:calc(100% - 34px)">
                          <el-select v-model="field.type" placeholder="请选择字段类型" @change="changeFieldType(field)" :disabled="field.status===0?true:false">
                            <el-option label="文本型" value="文本型"></el-option>
                            <!-- <el-option label="抽屉型" value="抽屉型"></el-option> -->
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
                        <el-form-item label="占位符(字段填报说明)：" label-width="165px">
                          <el-input size="mini" v-model="field.remark" clearable>
                          </el-input>
                        </el-form-item>
                        <el-form-item v-for="(radio,index) in field.options" :key="index" label-width="0">
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
                          <el-form-item label="占位符(字段填报说明)：" label-width="165px">
                            <el-input size="mini" v-model="field.remark" clearable>
                            </el-input>
                          </el-form-item>
                          <el-radio-group v-model="field.options[0].value" style="width: 100%;">
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
                    <el-row class="mimi-content" v-if="field.type=='文本型'||field.type=='数字型'||field.type=='表达式'">
                      <el-col :span="22" :offset="2" class="card-bg-content min-lable">
                        <el-form-item label="占位符(字段填报说明)：" label-width="165px">
                          <el-input size="mini" v-model="field.remark" clearable>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-collapse-item>
                <span class="card-add-ziduan" @click="addField(index,item.classs)">
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
                  <img v-if='icon.icon' :src="'./static/images/img/record/'+icon.icon+'.png'" alt="">
                  <span v-else style="color: #667589;font-size: 36px;">{{formdata.title.charAt(0)}}</span>
                </div>
              </li>
              <li slot="reference" class="record-icon-box">
                <div class="record-icon-box-content" style="line-height: 90px;">
                  <img :src="'./static/images/img/record/'+formData.icon+'.png'" alt="">
                  <!-- <span v-else style="color: #667589;font-size: 36px;">{{formdata.title.charAt(0)}}</span> -->
                </div>
              </li>
            </el-popover>

          </el-form-item>
          <el-form-item label="适用范围" prop="scopeOfUse">
            <el-radio-group v-model="formData.scopeOfUse" style="width:100%" class="card-select">
              <div class="el-form-item__content">
                <el-radio label="指定人员使用"></el-radio>
                <el-form-item v-if="formData.scopeOfUse=='指定人员使用'" class="lawPersonBox card-user-box">
                  <el-select ref="templateUserIdList" v-model="formData.templateUserIdList" multiple @remove-tag="removeUsertag">
                    <el-option v-for="item in alreadyChooseUserPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
                  </el-select>
                  <el-button icon="el-icon-plus" @click="addTemplateUser"></el-button>
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
              <el-select ref="templateAdminIdList" v-model="formData.templateAdminIdList" multiple @remove-tag="removeAdmintag">
                <el-option v-for="item in alreadyChooseAdminPerson" :key="item.id" :label="item.lawOfficerName" :value="item.id" placeholder="请添加" :disabled="currentUserLawId==item.id?true:false"></el-option>
              </el-select>
              <el-button icon="el-icon-plus" @click="addtemplateAdminIdList"></el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer footer_fixed">
        <el-button type="primary" @click="submitForm('elForm')">发布</el-button>
        <el-button @click="preview(formData)">预览</el-button>
        <!-- <el-button @click="resetForm('elForm')">重置</el-button> -->
      </div>
    </el-drawer>
    <chooseLawPerson ref="templateAdminRef" @setLawPer="setAdminPerson" @userList="getAllUserList"></chooseLawPerson>
    <chooseLawPerson1 ref="templateUserRef" @setLawPer="setUserPerson" @userList="getAllUserList"></chooseLawPerson1>
    <preview ref="previewRef" @fieldList="getAllFieldList"></preview>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import chooseLawPerson from "@/page/caseHandle/unRecordCase/chooseLawPerson.vue";
import chooseLawPerson1 from "@/page/caseHandle/unRecordCase/chooseLawPerson.vue";
import preview from "./previewDialog.vue";
import { mapGetters } from "vuex";
import { saveOrUpdateRecordModleApi, findCommonFieldApi, findAllCommonFieldApi, findRecordModleByIdApi, findRecordlModleFieldByIdeApi } from "@/api/Record";
export default {
  components: {
    chooseLawPerson,
    chooseLawPerson1,
    preview
  },
  data() {
    return {
      drawerTitle:'drawerTitle',
      newModleTable: false,
      currentUserLawId: '',
      activeNames: [0],
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
        templateUserIdList: '',
        templateAdmin: '',
        templateAdminId: '',
        templateAdminIdList: '',
        templateType: '记录',//模板类型
        createName: '',//创建人
        organId: '',//创建人机构id
        organName: '',//创建人机构名称
        icon: 'icon_qit',
        domain: '公路路政',
        title: 'pc测试',
        templateFieldList: [
          {
            // value: ,
            sort: 0,//新加-前端定义
            classs: '',
            fieldList: [
              {
                id: '',//字段id-修改
                type: '文本型',//必要-字段类型，不可改
                field: 'key0',//必要-字段英文名
                title: '姓名',//必要-字段中文名
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
        this.drawerTitle='修改模板'
      }
      this.findCommonField()
      this.getEnforceLawType();
      this.setLawPersonCurrentP();
      this.getAllOrgan('root');
      this.newModleTable = true;
      this.$nextTick(() => {
        this.resetForm('elForm')
      });
    },
    // 根据id查找
    findDataByld() {
      let _this = this
      findRecordlModleFieldByIdeApi(this.editId).then(
        res => {
          let list = res.data
          let sort = 1
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
              console.log('list',list)
              _this.formData = res.data
              _this.formData.templateFieldList = list
            },
            error => {
              reject(error);
            })
        },
        error => {
          reject(error);
        })

    },
    // 获取通用字段
    findCommonField() {
      findAllCommonFieldApi().then(
        res => {
          this.commonFieldList = res.data
          this.commonFieldList.forEach(element => {
            element.fieldList.forEach(item => {
              if (item.options) {
                item.options = JSON.parse(item.options)
              }
            });
          });
          console.log('common', this.commonFieldList)

        },
        error => {
          // reject(error);
        })

    },
    addGroup() {
      this.formData.templateFieldList.push({ "sort": this.globalContGroup, fieldList: [] })
      let pushDataList = JSON.parse(JSON.stringify(this.defautfieldList));
      pushDataList.field = 'key' + this.globalContGroup
      console.log('pushDataList', pushDataList)
      this.formData.templateFieldList[this.globalContGroup].fieldList.push(pushDataList)
      this.activeNames.push(this.globalCont)
      this.globalContGroup++
      this.globalCont++;
      console.log('formData.templateFieldList', this.formData.templateFieldList)
    },

    addField(index, classs) {
      if (this.activeNames.indexOf(index) == -1) {
        this.activeNames.push(index)
      }
      // console.log(index)
      console.log('defautfieldList', this.defautfieldList)
      // console.log('classs', classs)
      let pushDataList = JSON.parse(JSON.stringify(this.defautfieldList));
      pushDataList.field = 'key' + this.globalCont
      this.globalCont++
      console.log('pushDataList', pushDataList)
      this.formData.templateFieldList[index].fieldList.push(pushDataList)
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
      if (options.length <= 5) {
        options.push({ value: '' })
      }
      else {
        this.$message({ message: '最多支持六个选项!', type: 'warning' });
      }
    },
    submitForm(formName) {
      console.time('global')
      //设置classs\templetId
      // let sort = 1
      // this.formData.templateFieldList.forEach(element => {
      //   console.log(element)
      //   element.sort = sort;
      //   sort++
      //   // element.fieldList.forEach(item => {
      //   //   console.log(item.classs)
      //   //   item.classs = element.classs;
      //   //   item.templateId = this.formData.id || '';
      //   // });

      // });

      console.timeEnd('global')

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formData.templateFieldList.length == 0 || (this.formData.templateFieldList.length == 1 && this.formData.templateFieldList[0].fieldList.length == 0)) {
            this.$message('该请至少添加一个字段！');
          }
          else {
            // alert('submit!');
            let data = JSON.parse(JSON.stringify(this.formData))
            data.templateFieldList = JSON.stringify(data.templateFieldList)
            data.templateUserIdList = '';
            data.templateAdminIdList = '';
            data.count = this.globalCont
            this.formData.templateOrganId = this.organData.find(item => item.templateOrgan === this.formData.templateOrgan);
            console.log('提交的字段', data)

            console.log('this.formData.templateOrganId', this.formData.templateOrganId)
            saveOrUpdateRecordModleApi(data).then(
              res => {
                console.log(res)
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  this.$emit("getAddModle", 'sucess');
                  this.newModleTable = false;
                } else {
                  this.$message.error(res.msg);
                }
              },
              error => {
                // reject(error);
              })

          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 添加管理者
    addTemplateUser() {
      this.$refs.templateUserRef.showModal(this.formData.templateUserIdList, this.alreadyChooseUserPerson);
    },
    addtemplateAdminIdList() {
      this.$refs.templateAdminRef.showModal(this.formData.templateAdminIdList, this.alreadyChooseAdminPerson);
    },
    //查询执法人员
    getAllUserList(list) {
      this.allUserList = list;
      setTimeout(() => {
      }, 100);
    },
    //设置使用人员
    setUserPerson(userlist) {
      console.log('选择的执法人员', userlist);
      this.alreadyChooseUserPerson = userlist;
      this.formData.templateUserIdList = [];

      let staffIdArr = [];
      let staffArr = [];
      let certificateIdArr = [];

      this.alreadyChooseUserPerson.forEach(item => {
        this.formData.templateUserIdList.push(item.id);
        //给表单数据赋值
        staffIdArr.push(item.id);
        staffArr.push(item.lawOfficerName);
        certificateIdArr.push(item.userId);
      });
      // this.formData.staffId = staffIdArr.join(',');
      this.formData.templateUser = staffArr.join(',');
      this.formData.templateUserId = certificateIdArr.join(',');
    },
    //设置管理人员
    setAdminPerson(userlist) {
      console.log('选择的执法人员', userlist);
      this.alreadyChooseAdminPerson = userlist;
      this.formData.templateAdminIdList = [];
      let staffIdArr = [];
      let staffArr = [];
      let certificateIdArr = [];

      this.alreadyChooseAdminPerson.forEach(item => {
        this.formData.templateAdminIdList.push(item.id);
        //给表单数据赋值
        staffIdArr.push(item.id);
        staffArr.push(item.lawOfficerName);
        certificateIdArr.push(item.userId);
      });
      // this.formData.staffId = staffIdArr.join(',');
      this.formData.templateAdmin = staffArr.join(',');
      this.formData.templateAdminId = certificateIdArr.join(',');
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
            _this.alreadyChooseAdminPerson = [];
            _this.alreadyChooseUserPerson = [];
            res.data.forEach(item => {
              if (
                item.userId == iLocalStroage.gets("userInfo").id
              ) {
                currentUserData.id = item.id;
                currentUserData.lawOfficerName = item.lawOfficerName;
                currentUserData.selectLawOfficerCard = item.lawOfficerCards.split(",")[0]
                _this.alreadyChooseAdminPerson.push(currentUserData);
                _this.alreadyChooseUserPerson.push(currentUserData);
                _this.formData.templateAdminIdList.push(currentUserData.id);
                _this.formData.templateUserIdList.push(currentUserData.id);
                _this.currentUserLawId = currentUserData.id;
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
      if (this.currentUserLawId == val) {
        this.formData.templateUserIdList.push(val);
        this.$message('该执法人员不能删除！');
      }
    },
    removeAdmintag(val) {
      if (this.currentUserLawId == val) {
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
    changeGroup(group) {
      // console.log(group)
      var defaut = this.commonFieldList.find(item => item.classs === group.classs)
      // console.log('this.defautfieldList', this.defautfieldList)
      if (defaut) {
        // 通用字段
        group.fieldList = defaut.fieldList
      } else if (!group.fieldList || group.fieldList.length == 0) {
        console.log(group.fieldList)
        group.fieldList = [];
        let defautfieldList = JSON.parse(JSON.stringify(this.defautfieldList))
        defautfieldList.title = '';
        group.fieldList.push(defautfieldList)
      }
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>