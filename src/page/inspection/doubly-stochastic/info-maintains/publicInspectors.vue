<template>
  <div class="height100 publicInspectors">
    <div class="handlePart el-form-bottom0">
      <div class="search toggleBox search-mini" style="width:100%">
        <div
          class="handlePart caseHandleSearchPart"
          id="searchBox"
          :class="isShow ? 'autoHeight' : 'aaa'"
          style="margin:0"
        >
          <el-form :inline="true" :model="searchForm" class ref="searchForm">
            <el-form-item>
              双随机一公开执法人员库
            </el-form-item>
            <el-form-item label="姓名" prop="personName">
              <el-input v-model="searchForm.personName"></el-input>
            </el-form-item>
            <el-form-item label="在岗情况" prop="stationStatusName">
              <!-- <el-select v-model="searchForm.stationStatusName" placeholder="请选择">
                <el-option v-for="item in optionsZGQK" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select> -->
              <el-select
                v-model="searchForm.stationStatusName"
                placeholder="请选择"
              >
                <el-option label="在岗" value="在岗"></el-option>
                <el-option label="离岗" value="离岗"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="查询范围" prop="selectValue">
              <el-select v-model="searchForm.selectValue">
                <el-option
                  v-for="item in searchType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="search-btns">
            <el-button
              size="medium"
              title="搜索"
              icon="iconfont law-sousuo"
              @click="searchTableData()"
            ></el-button>
            <el-button
              size="medium"
              class="commonBtn searchBtn"
              title="重置"
              icon="iconfont law-zhongzhi"
              @click="resetSearchData('searchForm')"
            ></el-button>
            <el-button
              size="medium"
              :title="isShow ? '点击收缩' : '点击展开'"
              :icon="isShow ? 'iconfont law-top' : 'iconfont law-down'"
              @click="isShowMethod"
            >
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="handlePart el-form-bottom0" style="height:40px">
      <div class="search" style="width:100%">
        <el-form :inline="true">
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-plus"
              @click="addMethod"
              >新增</el-button
            >
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-delete-solid" @click="delMethod">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="iconfont law-edit" @click="editMethod">修改</el-button>
          </el-form-item> -->
          <div style="width:auto;float:right">
            <el-form-item>
              <a
                class="el-button el-button--primary el-button--medium"
                href="./static/excel/检查人员模板.xlsx"
                download="检查人员模板.xlsx"
                >Excel模板导出</a
              >
              <!-- <el-button type="primary" size="medium" @click="downloadModle">Excel模板导出</el-button> -->
            </el-form-item>
            <el-form-item>
              <el-upload
                style="width: auto;display: inline-block;"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :http-request="importModle"
              >
                <el-button type="primary" size="medium">导入Excel</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                size="medium"
                type="primary"
                @click="exportMethod('公开执法人员表.xls')"
                >导出所有人员</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="tablePart1">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="personName"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
          :formatter="sexFormat"
        ></el-table-column>
        <el-table-column
          prop="branchName"
          label="监督执法种类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="stationStatusName"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="staffingName"
          label="执法人员性质"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="postName"
          label="职务"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="company"
          label="单位"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button @click="editMethod(scope.row)" type="text"
              >修改</el-button
            >
            <el-button type="text" @click="delMethod(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        :page-sizes="[10, 20, 30, 40]"
        layout="prev, pager, next,sizes,jumper"
        :total="totalPage"
      ></el-pagination>
    </div>
    <el-dialog
      :title="dialogStatus + '检查人员'"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      style="width:auto"
      @close="resetForm('addForm')"
    >
      <el-form
        :model="addForm"
        :label-width="formLabelWidth"
        :rules="rules"
        ref="addForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="personName">
              <el-input v-model="addForm.personName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthDate">
              <el-date-picker
                v-model="addForm.birthDate"
                type="date"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="addForm.sex" placeholder="请选择">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="addForm.idCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族" prop="nationName">
              <el-select v-model="addForm.nationName" placeholder="请选择">
                <el-option
                  v-for="item in optionsMZ"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="政治面貌" prop="politicalStatusName">
              <el-select
                v-model="addForm.politicalStatusName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionsZZMM"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="最高学历" prop="highestEducation">
              <el-select
                v-model="addForm.highestEducation"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionsZGXL"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历专业" prop="majorName">
              <el-input v-model="addForm.majorName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="固定电话" prop="contactNum">
              <el-input v-model="addForm.contactNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" prop="phoneNum">
              <el-input v-model="addForm.phoneNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="人员类型" prop="lawOfficeType">
              <el-select v-model="addForm.lawOfficeType" placeholder="请选择">
                <el-option
                  v-for="item in optionsRYLX"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职级" prop="userRank">
              <el-select v-model="addForm.userRank" placeholder="请选择">
                <el-option
                  v-for="item in optionsZJ"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执法人员性质" prop="staffingName">
              <el-select v-model="addForm.staffingName" placeholder="请选择">
                <el-option
                  v-for="item in optionsZFRYXZ"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="单位" prop="company">
              <el-input v-model="addForm.company"></el-input>
            </el-form-item> -->
            <el-form-item
              label="单位"
              prop="company"
              class="lawPersonBox-aline organClass"
            >
              <el-popover
                placement="bottom"
                trigger="click"
                style="z-index:3300"
                v-model="visiblePopover"
              >
                <div class="departOrUserTree" style="width:350px;height:436px">
                  <div class="treeBox">
                    <el-tree
                      class="filter-tree"
                      :data="organData"
                      :props="defaultProps"
                      node-key="id"
                      :filter-node-method="filterNode"
                      :default-expanded-keys="defaultExpandedKeys"
                      @node-expand="nodeExpand"
                      ref="tree"
                      @node-click="handleNodeClick1"
                    >
                      <span
                        class="custom-tree-node"
                        slot-scope="{ node, data }"
                      >
                        <span>
                          <i
                            :class="
                              data.children && data.children.length > 0
                                ? 'iconfont law-icon_shou_bag'
                                : ''
                            "
                          ></i>
                          <span :class="data.children ? '' : 'hasMarginLeft'">{{
                            node.label
                          }}</span>
                        </span>
                      </span>
                    </el-tree>
                  </div>
                </div>
                <el-input
                  slot="reference"
                  v-model="addForm.company"
                  placeholder="请选择机构"
                  :disabled="true"
                  style="width:100%"
                >
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="监督检查种类" prop="branchName">
              <el-select v-model="addForm.branchName" placeholder="请选择">
                <el-option
                  v-for="item in optionsJDJCZL"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监督检查区域" prop="lawArea">
              <el-input v-model="addForm.lawArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="执法证类型" prop="certType">
          <el-select v-model="addForm.certType" placeholder="请选择">
            <el-option
              v-for="item in optionsZFZLX"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件编号" prop="certNumber">
              <el-input v-model="addForm.certNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发证机关" prop="issueAuthority">
              <el-input v-model="addForm.issueAuthority"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="有效期限起始时间" prop="certStartTime">
              <el-date-picker
                v-model="addForm.certStartTime"
                type="date"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期限截至时间" prop="certEndTime">
              <el-date-picker
                v-model="addForm.certEndTime"
                type="date"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监督人员" prop="isSupervisor">
              <el-radio-group v-model="addForm.isSupervisor">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否具有法律职业资格"
              prop="isLawProfession"
              label-width="160px"
            >
              <el-radio-group v-model="addForm.isLawProfession">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否在岗" prop="stationStatusName">
          <el-radio-group v-model="addForm.stationStatusName">
            <el-radio label="在岗">是</el-radio>
            <el-radio label="离岗">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="其他情况" prop="remark">
          <el-input type="textarea" v-model="addForm.remark"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="停用"></el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllPublicPersonApi,
  addPublicPersonApi,
  getDictListDetailByNameApi,
  delPersonApi,
  importPersonExcelApi,
  exportPersonApi
} from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinPerson } from "@/common/js/personComm";
import { mixinInspection } from "@/common/js/inspectionComm";
import { validatePhone, validateIDNumber } from "@/common/js/validator";
export default {
  mixins: [mixinPerson, mixinInspection],
  props: ["freshFlag"],
  watch: {
    freshFlag: {
      handler(val, oldVal) {
        this.getTableData();
      },
      deep: true
    }
  },
  data() {
    return {
      multipleSelection: [],
      searchForm: {
        stationStatusName: "",
        personName: "",
        selectValue: 0
      },
      isShow: false,
      dialogFormVisible: false,
      addForm: {
        personName: "",
        birthDate: "",
        sex: "",
        idCard: "",
        nationName: "",
        politicalStatusName: "",
        highestEducation: "",
        majorName: "",
        contactNum: "",
        phoneNum: "",
        lawOfficeType: "",
        userRank: "",
        staffingName: "",
        company: "",
        branchName: "",
        lawArea: "",
        certType: "",
        certNumber: "",
        issueAuthority: "",
        certStartTime: "",
        certEndTime: "",
        isSupervisor: "",
        isLawProfession: "",
        stationStatusName: "",
        remark: "",
        name: "",
        certStartTime: "",
        certEndTime: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogStatus: "",
      formLabelWidth: "125px",
      rules: {
        personName: [{ required: true, message: "必填项", trigger: "change" }],
        birthDate: [{ required: true, message: "必填项", trigger: "change" }],
        sex: [{ required: true, message: "必填项", trigger: "change" }],
        idCard: [
          { required: true, message: "必填项", trigger: "change" },
          { validator: validateIDNumber, trigger: "change" }
        ],
        politicalStatusName: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        majorName: [{ required: true, message: "必填项", trigger: "change" }],
        highestEducation: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        lawOfficeType: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        userRank: [{ required: true, message: "必填项", trigger: "change" }],
        staffingName: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        company: [{ required: true, message: "必填项", trigger: "change" }],
        branchName: [{ required: true, message: "必填项", trigger: "change" }],
        certNumber: [{ required: true, message: "必填项", trigger: "change" }],
        certType: [{ required: true, message: "必填项", trigger: "change" }],
        nationName: [{ required: true, message: "必填项", trigger: "change" }],
        contactNum: [{ validator: validatePhone, trigger: "change" }],
        phoneNum: [{ validator: validatePhone, trigger: "change" }]
      },
      optionsZGQK: [],
      optionsMZ: [],
      optionsZGXL: [],
      optionsZZMM: [],
      optionsXLZY: [],
      optionsRYLX: [],
      optionsZJ: [],
      optionsZFRYXZ: [],
      optionsZFZLX: [],
      optionsJDJCZL: [],
      defaultExpandedKeys: [],
      organData: [], //机构列表
      defaultProps: {
        children: "children",
        label: "label"
      },
      visiblePopover: false,
      searchType: [
        { value: 0, label: "本机构" },
        { value: 1, label: "本机构及子机构" }
      ]
    };
  },
  methods: {
    // freshFlag(val) {
    //   console.log('val', val)
    // },
    // 查询列表时
    getTableData() {
      let data = {
        personName: this.searchForm.personName,
        stationStatusName: this.searchForm.stationStatusName,
        // workStatus: this.searchForm.stationStatusName,
        company: iLocalStroage.gets("userInfo").organName,
        organId:
          this.searchForm.selectValue == 1
            ? iLocalStroage.gets("userInfo").organId
            : "",
        // oName: '固原综合执法支队',
        current: this.currentPage,
        size: this.pageSize
      };
      this.getPageList("getAllPublicPerson", data);
    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("multipleSelection", this.multipleSelection);
    },
    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      // debugger
      this.getTableData();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.addForm.photo=this.addForm.photo||''
          if (
            Date.parse(this.addForm.certStartTime) >
            Date.parse(this.addForm.certEndTime)
          ) {
            this.$message({
              message: "开始时间不得大于截止时间",
              type: "error"
            });
            return;
          }
          // this.addForm.organName = iLocalStroage.gets("userInfo").organName
          this.$delete(this.addForm, "photo");
          addPublicPersonApi(this.addForm).then(
            res => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.dialogFormVisible = false;
                this.currentPage = 1;
                this.getTableData();
              }
            },
            error => {
              // reject(error);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    delMethod(id) {
      this.deleteById("delPerson", id);
    },
    // 导入
    importModle(param) {
      console.log(param);
      // let currentFileId = this.currentFileId
      var fd = new FormData();
      fd.append("file", param.file);
      // fd.append("organName", iLocalStroage.gets("userInfo").organName);
      importPersonExcelApi(fd).then(res => {
        if (res.code === 200) {
          this.$message({ type: "success", message: res.msg });
          this.currentPage = 1;
          this.getTableData();
        }
      });
    },
    // 导出
    exportMethod(fileName) {
      let data = {
        organName: iLocalStroage.gets("userInfo").organName
      };
      exportPersonApi(data)
        .then(res => {
          //浏览器兼容，Google和火狐支持a标签的download，IE不支持
          //其他浏览器
          let link = document.createElement("a"); // 创建a标签
          link.style.display = "none";
          link.setAttribute("download", fileName); //必须要重命名
          let objectUrl = URL.createObjectURL(res);
          link.href = objectUrl;
          link.click();
          URL.revokeObjectURL(objectUrl);
        })
        .catch(err => {
          console.log(err);
          throw new Error(err);
        });
    },
    getDrawerList(data) {
      let _this = this;
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1:
                _this.optionsZGQK = res.data;
                console.log("_this.optionsZGQK", _this.optionsZGQK);
                break; //在岗情况
              case 2:
                _this.optionsMZ = res.data;
                break; //人员信息-民族
              case 3:
                _this.optionsZGXL = res.data;
                break; //最高学历
              case 4:
                _this.optionsZZMM = res.data;
                break; //政治面貌
              case 5:
                _this.optionsXLZY = res.data;
                break; //学历专业
              case 6:
                _this.optionsRYLX = res.data;
                break; //人员类型
              case 7:
                _this.optionsZJ = res.data;
                break; //职级
              case 8:
                _this.optionsZFRYXZ = res.data;
                break; //执法人员性质
              case 9:
                _this.optionsZFZLX = res.data;
                break; //执法证类型
              case 10:
                _this.optionsJDJCZL = res.data;
                break; //监督检查种类
            }
          },

          error => {
            // reject(error);
          }
        );
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 获取机构
    getAllOrgan(organId) {
      let _this = this;
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
        err => {}
      );
    },
    handleNodeClick1(data) {
      this.addForm.company = data.label;
      // this.addForm.regulatoryUnitId = data.id;
      this.visiblePopover = false;
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
    },
    isShowMethod() {
      this.isShow = !this.isShow;
    }
  },
  mounted() {
    this.getTableData();
    this.getAllOrgan();
    // 获取抽屉
    this.getDrawerList([
      { name: "在岗情况", option: 1 },
      { name: "人员信息-民族", option: 2 },
      { name: "最高学历", option: 3 },
      { name: "人员信息-政治面貌", option: 4 },
      { name: "学历专业", option: 5 },
      { name: "人员类型", option: 6 },
      { name: "职级", option: 7 },
      { name: "执法人员性质", option: 8 },
      { name: "执法证类型", option: 9 },
      { name: "监督检查种类", option: 10 }
    ]);
  }
};
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>
<style lang="scss" src="@/assets/css/systemManage.scss"></style>
<style lang="scss">
.publicInspectors {
  
  .tablePart1 {
    height: calc(100% - 170px);
    .el-table__body-wrapper {
      height: calc(100% - 57px) !important;
    }
  }
  // @media screen and (max-width: 1798px) {
  //     .tablePart1 {
  //   height: calc(100% - 200px);
  // }
  // }
  // @media screen and (max-width: 1798px) {
  //     .tablePart1 {
  //   height: calc(100% - 245px);
  // }
  // }
}
</style>
