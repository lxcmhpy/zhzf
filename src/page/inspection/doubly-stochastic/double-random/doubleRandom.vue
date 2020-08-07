<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox inspection-info" id="roleBox" style="height:calc(100% - 22px)">
      <div class="handlePart">
        <div class="search toggleBox">
          <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item label="任务名称" prop='taskName'>
                <el-input v-model="searchForm.taskName"></el-input>
              </el-form-item>
              <el-form-item label="抽查主体" prop='taskName'>
                <el-input v-model="searchForm.taskName"></el-input>
              </el-form-item>
              <el-form-item label="检查类型" prop='checkSubject'>
                <el-input v-model="searchForm.checkSubject"></el-input>
              </el-form-item>
            </el-form>
            <div class="search-btns">
              <!-- <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTableData">查询</el-button> -->
              <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="searchTableData()"></el-button>
              <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="resetSearchData('searchForm')"></el-button>
              <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="handlePart">
        <div class="search" style="width:100%">
          <el-form :inline="true">
            <el-form-item label="抽取领域" prop='taskArea'>
              <el-select v-model="searchForm.taskArea" placeholder="请选择" @change="resetSearchData('searchForm')">
                <el-option label="省交通运输厅领域" value="省交通运输厅领域"></el-option>
                <el-option label="省市场监管领域" value="省市场监管领域"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="checkType" label="任务名称" align="center"></el-table-column>
          <el-table-column prop="checkItem" label="抽查主体" align="center"></el-table-column>
          <el-table-column prop="itemType" label="检查类型" align="center"></el-table-column>
          <el-table-column prop="politicalStatus" label="抽查标准" align="center"></el-table-column>
          <el-table-column prop="checkMode" label="抽查方式" align="center"></el-table-column><!-- 显示模板标题 -->
          <el-table-column prop="checkSubject" label="抽查内容" align="center"></el-table-column>
          <el-table-column prop="checkBasis" label="抽查依据" align="center"></el-table-column>
          <el-table-column prop="checkBasis" label="检查范围" align="center"></el-table-column>
          <el-table-column label="任务周期" align="center">
            <template slot-scope="scope">
              {{scope.row.taskStartTime}}-{{scope.row.taskEndTime}}
            </template>
          </el-table-column>
          <el-table-column prop="checkBasis" label="操作人员" align="center"></el-table-column>
          <el-table-column prop="checkBasis" label="监督人员" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button @click="editMethod(scope.row)" type="text">修改</el-button>
              <el-button type="text" @click="delMethod(scope.row.id)">删除</el-button> -->
              <el-button @click="editMethod(scope.row)" type="text">抽取</el-button>
              <el-button type="text" @click="editMethod(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
      <el-dialog title='抽取' :visible.sync="dialogFormVisible" @close="resetForm('addForm')">
        <div>
          <el-carousel ref="randomDom" trigger="click" height="20px" direction="vertical" :autoplay="false">
            <el-carousel-item v-for="(item,index) in taskList" :key="index.toString()" name="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <el-button @click="startRandom" type="text">开始抽取</el-button>
          <el-button type="text" @click="editMethod(scope.row.id)">重置</el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="checkType" label="任务名称" align="center"></el-table-column>
          <el-table-column prop="checkItem" label="检查人员" align="center"></el-table-column>
          <el-table-column prop="itemType" label="检查专家" align="center"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getAllExpertApi, addExpertApi, getDictListDetailByNameApi, delExpertApi } from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinPerson } from "@/common/js/personComm";
import { mixinInspection } from "@/common/js/inspectionComm";
export default {
  mixins: [mixinPerson, mixinInspection],
  data() {
    return {
      multipleSelection: [],
      searchForm: {
        checkSubject: "",
        taskName: '',
        taskArea: '省交通运输厅领域'
      },
      isShow: false,
      addForm: {
        name: '',
        sex: '',
        expertNum: '',
        company: '',
        politicalStatus: '',
        birthDate: '',
        unitAddress: '',
        jobTitle: '',
        job: '',
        evaluationTime: '',
        graduateSchool: '',
        email: '',
        domain: '',
        fixedTelephone: '',
        graduateTime: '',
        practiceQualification: '',
        qualificationTime: '',
        contactType: '',
        baseInfo: '',
        remark: '',
        status: '',
      },
      formLabelWidth: '100px',
      // dialogStatus: '',
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
      optionsZC: [],
      optionsZZMM: [],
      optionsZYLY: [],
      taskList: ['qw', '第三方', '七二', '输入法', '房德罡', '挨个', '台湾人', '阿达', '阿斯顿发生', '的非官方']
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        name: this.searchForm.name,
        company: this.searchForm.company,
        taskArea: this.searchForm.taskArea,
        current: this.currentPage,
        size: this.pageSize,
      };
      this.getPageList("getAllTask", data);
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
          addExpertApi(this.addForm).then(
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
      this.deleteById("addTask", id);
    },
    radomExpertNum() {
      return Math.random() * 100 + 10000;
    },
    startRandom() {
      // this.$refs.randomDom.setActiveItem(2)
      this.taskList.forEach((index,element) => {
        setTimeout(() => {
          this.$refs.randomDom.setActiveItem(index)
        }, 1000);
      });
    },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 2: _this.optionsZC = res.data; break;//职称
              case 3: _this.optionsZYLY = res.data; break;//专业领域
              case 4: _this.optionsZZMM = res.data; break;//政治面貌
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
    // this.getDrawerList([
    //   { name: '职称', option: 2 },
    //   { name: '专业领域', option: 3 },
    //   { name: '人员信息-政治面貌', option: 4 }])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>