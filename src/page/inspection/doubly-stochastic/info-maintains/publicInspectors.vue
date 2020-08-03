<template>
  <div class="height100">
    <div class="handlePart">
      <div class="search toggleBox search-mini">
        <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'" style="margin:0">
          <el-form :inline="true" :model="searchForm" class ref="searchForm">
            <el-form-item>
              双随机一公开执法人员库
            </el-form-item>
            <el-form-item label="姓名" prop='personName'>
              <el-input v-model="searchForm.personName"></el-input>
            </el-form-item>
            <el-form-item label="在岗情况" prop='stationStatusName'>
              <el-select v-model="searchForm.stationStatusName" placeholder="请选择">
                <el-option v-for="item in optionsZGQK" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="search-btns">
            <el-button size="medium" title="搜索" icon="iconfont law-sousuo" @click="searchTableData()"></el-button>
            <el-button size="medium" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="handlePart">
      <div class="search" style="width:100%">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addMethod">新增</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-delete-solid" @click="delMethod">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="iconfont law-edit" @click="editMethod">修改</el-button>
          </el-form-item> -->
          <div style="width:auto;float:right">
            <el-form-item>
              <a class="el-button el-button--primary el-button--medium" href="./static/excel/检查人员模板.xlsx" download="检查人员模板.xlsx">Excel模板导出</a>
              <!-- <el-button type="primary" size="medium" @click="downloadModle">Excel模板导出</el-button> -->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="importModle">导入Excel</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary" @click="resetSearchData('searchForm')">导出所有人员</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
        <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center" :formatter="sexFormat"></el-table-column>
        <el-table-column prop="branchName" label="监督执法种类" align="center"></el-table-column>
        <el-table-column prop="stationStatusName" label="状态" align="center"></el-table-column>
        <el-table-column prop="staffingName" label="执法人员性质" align="center"></el-table-column>
        <el-table-column prop="postName" label="职务" align="center"></el-table-column>
        <el-table-column prop="company" label="单位" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="editMethod(scope.row)" type="text">修改</el-button>
            <el-button type="text" @click="delMethod(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
    </div>
    <el-dialog :title='dialogStatus+"检查人员"' :visible.sync="dialogFormVisible" style="width:auto" @close="resetForm('addForm')">
      <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="personName">
              <el-input v-model="addForm.personName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthDate">
              <el-date-picker v-model="addForm.birthDate" type="date" value-format="yyyy-MM-dd">
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
                <el-option v-for="item in optionsMZ" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="政治面貌" prop="politicalStatusName">
              <el-select v-model="addForm.politicalStatusName" placeholder="请选择">
                <el-option v-for="item in optionsZZMM" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="最高学历" prop="highestEducation">
              <el-select v-model="addForm.highestEducation" placeholder="请选择">
                <el-option v-for="item in optionsZGXL" :key="item.id" :label="item.name" :value="item.name"></el-option>
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
                <el-option v-for="item in optionsRYLX" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职级" prop="technicalTitle">
              <el-select v-model="addForm.technicalTitle" placeholder="请选择">
                <el-option v-for="item in optionsZJ" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执法人员性质" prop="staffingName">
              <el-select v-model="addForm.staffingName" placeholder="请选择">
                <el-option v-for="item in optionsZFRYXZ" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="company">
              <el-input v-model="addForm.company"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="监督检查种类" prop="branchName">
              <el-select v-model="addForm.branchName" placeholder="请选择">
                <el-option v-for="item in optionsJDJCZL" :key="item.id" :label="item.name" :value="item.name"></el-option>
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
            <el-option v-for="item in optionsZFZLX" :key="item.id" :label="item.name" :value="item.name"></el-option>
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
              <el-date-picker v-model="addForm.certStartTime" type="date" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期限截至时间" prop="certEndTime">
              <el-date-picker v-model="addForm.certEndTime" type="date" value-format="yyyy-MM-dd">
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
            <el-form-item label="是否具有法律职业资格" prop="isLawProfession" label-width="160px">
              <el-radio-group v-model="addForm.isLawProfession">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否在岗" prop="stationStatusName">
          <el-radio-group v-model="addForm.stationStatusName">
            <el-radio label="在岗"></el-radio>
            <el-radio label="离岗"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="其他情况" prop="remark">
          <el-input type="textarea" v-model="addForm.remark"></el-input>
        </el-form-item>
        <el-form-item prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="停用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllPublicPersonApi, addPublicPersonApi, getDictListDetailByNameApi, delPersonApi } from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinPerson } from "@/common/js/personComm";
import { mixinInspection } from "@/common/js/inspectionComm";
export default {
  mixins: [mixinPerson, mixinInspection],
  props: ['freshFlag'],
  watch: {
    freshFlag: {
      handler(val, oldVal) {
        this.getTableData()
      },
      deep: true
    },

  },
  data() {
    return {
      multipleSelection: [],
      searchForm: {
        stationStatusName: "",
        personName: '',
      },
      isShow: false,
      dialogFormVisible: false,
      addForm: {
        name: '',
        birthDate: '',
        certStartTime: '',
        certEndTime: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogStatus: '',
      formLabelWidth: '125px',
      rules: {
        pass: [
          { required: true, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, trigger: 'blur' }
        ],
        age: [
          { required: true, trigger: 'blur' }
        ]
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
    }
  },
  methods: {
    // freshFlag(val) {
    //   console.log('val', val)
    // },
    // 查询列表时
    getTableData() {
      let data = {
        personName: this.searchForm.personName,
        workStatus: this.searchForm.workStatus,
        // OName: iLocalStroage.gets("userInfo").organName,
        // oName: '固原综合执法支队',
        current: this.currentPage,
        size: this.pageSize,
      };
      this.getPageList("getAllPublicPerson", data);
    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('multipleSelection', this.multipleSelection)
    },
    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.defaultDisplay = true
      // debugger
      this.getTableData()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.addForm.photo=this.addForm.photo||''
          this.$delete(this.addForm, 'photo')
          addPublicPersonApi(this.addForm).then(
            res => {
              console.log(res)
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.dialogFormVisible = false
                this.currentPage = 1;
                this.getTableData()
              }
            },
            error => {
              // reject(error);
            })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    delMethod(id) {
      this.deleteById("delPerson", id);
    },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1: _this.optionsZGQK = res.data; console.log('_this.optionsZGQK', _this.optionsZGQK); break;//在岗情况
              case 2: _this.optionsMZ = res.data; break;//人员信息-民族
              case 3: _this.optionsZGXL = res.data; break;//最高学历
              case 4: _this.optionsZZMM = res.data; break;//政治面貌
              case 5: _this.optionsXLZY = res.data; break;//学历专业
              case 6: _this.optionsRYLX = res.data; break;//人员类型
              case 7: _this.optionsZJ = res.data; break;//职级
              case 8: _this.optionsZFRYXZ = res.data; break;//执法人员性质
              case 9: _this.optionsZFZLX = res.data; break;//执法证类型
              case 10: _this.optionsJDJCZL = res.data; break;//监督检查种类
            }
          },

          error => {
            // reject(error);
          })
      });

    },
  },
  mounted() {
    this.getTableData()
    // 获取抽屉
    this.getDrawerList([{ name: '在岗情况', option: 1 },
    { name: '人员信息-民族', option: 2 },
    { name: '最高学历', option: 3 },
    { name: '人员信息-政治面貌', option: 4 },
    { name: '学历专业', option: 5 },
    { name: '人员类型', option: 6 },
    { name: '职级', option: 7 },
    { name: '执法人员性质', option: 8 },
    { name: '执法证类型', option: 9 },
    { name: '监督检查种类', option: 10 }])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>