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
              <el-form-item label="抽查主体" prop='checkSubject'>
                <el-input v-model="searchForm.checkSubject"></el-input>
              </el-form-item>
              <el-form-item label="检查类型" prop='checkType' v-if="searchForm.taskArea=='省交通运输厅领域'">
                <el-input v-model="searchForm.checkType"></el-input>
              </el-form-item>
              <el-form-item label="查询范围" prop='selectValue'>
                <el-select v-model="searchForm.selectValue">
                  <el-option v-for="item in searchType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
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
      <div class="tablePart" v-if="searchForm.taskArea=='省交通运输厅领域'">
        <el-table :data="tableData" key="table1" stripe style="width: 100%" height="100%">
          <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
          <el-table-column prop="checkSubject" label="抽查主体" align="center"></el-table-column>
          <el-table-column prop="checkType" label="检查类型" align="center"></el-table-column>
          <el-table-column prop="checkStandard" label="抽查标准" align="center"></el-table-column>
          <el-table-column prop="checkMode" label="抽查方式" align="center"></el-table-column><!-- 显示模板标题 -->
          <el-table-column prop="checkItem" label="抽查内容" align="center"></el-table-column>
          <el-table-column prop="checkBasis" label="抽查依据" align="center"></el-table-column>
          <el-table-column prop="checkRange" label="检查范围" align="center">
            <template slot-scope="scope">
              {{scope.row.checkRange}}
            </template>
          </el-table-column>
          <el-table-column label="任务周期" align="center">
            <template slot-scope="scope">
              {{scope.row.taskStartTime}}-{{scope.row.taskEndTime}}
            </template>
          </el-table-column>
          <el-table-column prop="operatePerson" label="操作人员" align="center"></el-table-column>
          <el-table-column prop="supervisePerson" label="监督人员" align="center"></el-table-column>
          <el-table-column prop="organName" label="单位" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editMethod(scope.row)" type="text" :disabled="scope.row.extractStatus==1">抽取</el-button>
              <el-button type="text" @click="viewMethod(scope.row)" :disabled="scope.row.extractStatus==0">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tablePart" v-if="searchForm.taskArea=='省市场监管领域'">
        <el-table :data="tableData" key="table2" stripe style="width: 100%" height="100%">
          <el-table-column prop="taskName" label="抽查类别" align="center"></el-table-column>
          <el-table-column prop="checkItem" label="抽查事项" align="center"></el-table-column>
          <el-table-column prop="itemType" label="事项类别" align="center"></el-table-column>
          <el-table-column prop="checkObject" label="检查对象" align="center"></el-table-column>
          <el-table-column prop="checkMode" label="抽查方式" align="center"></el-table-column>
          <el-table-column prop="checkSubject" label="检查主体" align="center"></el-table-column>
          <el-table-column prop="checkBasis" label="检查依据" align="center"></el-table-column>
          <el-table-column label="任务周期" align="center">
            <template slot-scope="scope">
              {{scope.row.taskStartTime}}-{{scope.row.taskEndTime}}
            </template>
          </el-table-column>
          <el-table-column prop="checkRange" label="检查范围" align="center">
            <template slot-scope="scope">
              {{scope.row.checkRange}}
            </template>
          </el-table-column>
          <el-table-column prop="operatePerson" label="操作人员" align="center"></el-table-column>
          <el-table-column prop="supervisePerson" label="监督人员" align="center"></el-table-column>
          <el-table-column prop="organName" label="单位" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editMethod(scope.row)" type="text" :disabled="scope.row.extractStatus==1">抽取</el-button>
              <el-button type="text" @click="viewMethod(scope.row)" :disabled="scope.row.extractStatus==0">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
      <el-dialog title='抽取' :close-on-click-modal="false" :visible.sync="dialogFormVisible" @close="resetForm()" width="60%">
        <el-row>
          <el-col :span="18">
            <div class="random-table-title" style="min-width:100px;height:30px">{{ randomContent }}</div>
          </el-col>
          <el-col :span="6">
            <el-button v-if="isRandomFlag" type="primary" size="medium" @click="startRandom()">开始抽取</el-button>
            <el-button v-if="!isRandomFlag" type="primary" size="medium" @click="saveRandom()" :disabled="!isFinishFlag">保存抽取结果</el-button>
            <el-button v-if="!isRandomFlag" type="primary" size="medium" @click="resetRandom()" :disabled="!isFinishFlag">重置</el-button>
          </el-col>
        </el-row>
        <div class="random-table-title" style="margin-top:20px">抽取结果</div>
        <el-table :data="randomList" stripe style="width: 100%" height="100%">
          <el-table-column label="对象名称" align="center">
            <template slot-scope="scope">
              <span v-if="isObjectTrue">{{scope.row.objectName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="检查人员" align="center">
            <template slot-scope="scope">
              <span v-if="isPersonNameTrue">{{scope.row.personName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="检查专家" align="center">
            <template slot-scope="scope">
              <span v-if="isNameTrue">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="medium" v-if="isReRandom" @click="reRadom(scope)">重新抽取</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
        </div>
      </el-dialog>
      <el-dialog title='抽取结果' :visible.sync="dialogResultVisible" @close="resetForm()" width="60%">
        <el-table :data="randomResultList" stripe style="width: 100%" height="100%">
          <el-table-column prop="objectName" label="对象名称" align="center"></el-table-column>
          <el-table-column prop="legalPerson" label="法人名称" align="center"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
          <el-table-column prop="matchPerson" label="匹配人员" align="center"></el-table-column>
          <el-table-column prop="matchExpert" label="匹配专家" align="center"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button> -->
          <el-button type="primary" @click="dialogResultVisible = false">关闭</el-button>

        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getAllExpertApi, addExpertApi, getDictListDetailByNameApi, delExpertApi, getExtractResultApi, addRandomResultApi,
  resetRandomByIdApi, getRandomByIdApi, addRandomResultMoreApi, getAllSourceDataByOrganNameApi
} from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinPerson } from "@/common/js/personComm";
import { mixinInspection } from "@/common/js/inspectionComm";
export default {
  mixins: [mixinPerson, mixinInspection],
  data() {
    return {
      // tableData:[{}],
      multipleSelection: [],
      searchForm: {
        checkSubject: "",
        taskName: '',
        taskArea: '省交通运输厅领域',
        selectValue: 0,
      },
      isShow: false,
      dialogFormVisible: false,
      dialogResultVisible: false,
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
      taskList: [],
      randomContent: '',
      timer: '',
      isRandomFlag: true,
      randomList: [],
      randomResultList: [],
      randomData: [],
      randomResult: [],
      currentId: '',
      isNameTrue: false,
      isReRandom: false,
      isPersonNameTrue: false,
      isObjectTrue: false,
      isFinishFlag: false,
      errorFlag: false,
      searchType: [{ value: 0, label: '本机构' }, { value: 1, label: '本机构及子机构' }],
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        name: this.searchForm.name,
        company: this.searchForm.company,
        taskArea: this.searchForm.taskArea,
        taskName: this.searchForm.taskName,
        checkSubject: this.searchForm.checkSubject,
        checkType: this.searchForm.taskArea == '省交通运输厅领域' ? this.searchForm.checkType : '',
        organName: iLocalStroage.gets("userInfo").organName,//机构名称
        organId: this.searchForm.selectValue == 1 ? iLocalStroage.gets("userInfo").organId : '',
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
    // 抽取效果开始
    startRandom() {
      console.log(this.addForm)
      if (this.addForm.personNum && this.addForm.objectNum) {
        this.$message({
          type: "error",
          message: '请核对抽查对象数和抽查人员数均大于0,再进行抽取！'
        });
        return;
      }
      let _this = this
      // 数据效果
      this.isRandomFlag = false
      this.timer = setInterval(this.scroll, 100);//设置计时器

      console.log(this.addForm)
      let data = {
        expertNum: this.addForm.expertNum || 0,//	抽查专家数
        objectNum: this.addForm.checkObjectNum,//抽查对象数
        organId: iLocalStroage.gets("userInfo").organId,//机构名称id
        personNum: this.addForm.lawEnforceNum,//	抽查人员数
      }
      getExtractResultApi(data).then(
        res => {
          if (res.code == 200) {
            // _this.randomList = res.data.randomObjectVoList

            let personVoList = []
            let expertVoList = []

            let i = 0
            for (i; i < res.data.personVoList.length; i++) {
              let personVoListName = []
              res.data.personVoList[i].forEach(element => {
                personVoListName.push(element.personName)
              });
              console.log('personVoListName', personVoListName)
              personVoList.push({ personName: personVoListName.join(',') })
            }
            let j = 0
            for (j; j < res.data.expertVoList.length; j++) {
              let expertVoListName = []
              res.data.expertVoList[j].forEach(element => {
                expertVoListName.push(element.name)
              });
              expertVoList.push({ name: expertVoListName.join(',') })
            }
            let data2 = []
            // 处理数据
            if (res.data.randomObjectVoList.length > 0 & personVoList.length > 0) {
              res.data.randomObjectVoList.forEach((element, index) => {
                if (expertVoList.length > 0) {
                  data2.push(Object.assign(element, personVoList[index], expertVoList[index]))
                } else {
                  data2.push(Object.assign(element, personVoList[index]))
                }
              });
              // 结束抽取
              setTimeout(() => {
                _this.randomList = data2
                _this.endRandom(data2[data2.length - 1].name || data2[data2.length - 1].personName)
              }, 2000);
            } else {
              // 抽取失败-人数不够
              clearInterval(this.timer);//销毁计时器
              this.timer = null;
              this.$message({
                type: "error",
                message: '抽取失败'
              });
            }
            console.log(data2)
            // data2=res.data.randomObjectVoList.concat(res.data.randomObjectVoList)

            setTimeout(() => {
              // 最后显示的值
              // _this.randomContent = res.data.randomExpertVoList[res.data.randomExpertVoList.length - 1].name
              _this.randomResult = data2
            }, 3000)
          } else {
            // _this.endRandom()
            clearInterval(this.timer);//销毁计时器
            this.timer = null;
            this.$message({
              type: "error",
              message: '抽取失败'
            });
          }
        },
        error => {
          clearInterval(this.timer);//销毁计时器
          this.timer = null;
          this.errorFlag = true;
          this.isFinishFlag = true;
          this.isRandomFlag = true;
          // reject(error);
        })
    },
    scroll() {
      this.animate = true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.randomContent = this.errorFlag ? "" : this.taskList[0]
        this.taskList.push(this.taskList[0]);  // 将数组的第一个元素添加到数组的
        this.taskList.shift();               //删除数组的第一个元素
        this.animate = false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 500)
    },
    // 抽取效果结束
    endRandom(endValue) {
      setTimeout(() => {
        this.isObjectTrue = true
      }, 700)
      setTimeout(() => {
        this.isPersonNameTrue = true
        clearInterval(this.timer);//销毁计时器
        this.timer = null;
      }, 1400)
      setTimeout(() => {
        // 最后显示的值
        this.randomContent = endValue || '';
        this.isNameTrue = true;
        this.isReRandom = true;
        this.isFinishFlag = true
      }, 2100)
    },
    // 重置
    resetRandom() {
      clearInterval(this.timer);//销毁计时器
      this.timer = null;
      this.isRandomFlag = true
      this.isNameTrue = false
      this.isReRandom = false
      this.isPersonNameTrue = false
      this.isObjectTrue = false
      this.isFinishFlag = false
      this.randomResult = []
      // 执行删除方法
      resetRandomByIdApi(this.currentId).then(
        res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            });
          }
        },
        error => {
          // reject(error);
        })
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
    editMethod(row) {
      this.addForm = JSON.parse(JSON.stringify(row))
      this.getLoopData()
      this.dialogFormVisible = true;
      this.currentId = row.id
    },
    getLoopData() {
      getAllSourceDataByOrganNameApi(iLocalStroage.gets("userInfo").organId).then(
        res => {
          console.log(res)
          let data = []
          res.data.randomObjectVoList.forEach(element => {
            data.push(element.objectName)
          });
          res.data.randomPersonVoList.forEach(element => {
            data.push(element.personName)
          });
          res.data.randomExpertVoList.forEach(element => {
            data.push(element.name)
          });
          this.taskList = data
        },
        error => {
          // reject(error);
        })
    },
    viewMethod(row) {
      this.addForm = JSON.parse(JSON.stringify(row))
      // 根据id查询
      getRandomByIdApi(row.id).then(
        res => {
          this.randomResultList = res.data
        },
        error => {
          // reject(error);
        })
      this.dialogResultVisible = true
      this.currentId = row.id
    },
    resetForm() {
      this.isFinishFlag = false;
      this.randomContent = '';
      this.isRandomFlag = true
      this.randomResultList = []
      this.randomList = []
      this.getTableData()
    },
    reRadom(scope) {
      let _this = this
      console.log(scope.row, scope.$index)
      let data = {
        expertNum: this.addForm.expertNum || 0,//	抽查专家数
        objectNum: 1,//抽查对象数
        organId: iLocalStroage.gets("userInfo").organId,//机构名称id
        personNum: this.addForm.lawEnforceNum,//	抽查人员数
      }
      getExtractResultApi(data).then(
        res => {
          let personNameList = []
          let nameList = []
          console.log(res.data.expertVoList[0])
          res.data.personVoList[0].forEach(element => {
            personNameList.push(element.personName)
          });
          if (this.addForm.expertNum > 0) {
            res.data.expertVoList[0].forEach(element => {
              nameList.push(element.name)
            });
          }
          let newData = res.data.randomObjectVoList[0]
          newData.personName = personNameList.join(',')
          newData.name = nameList.join(',')
          console.log(_this.randomList)
          this.$set(_this.randomList, scope.$index, newData)
        })
    },
    saveRandom() {
      let _this = this
      // let data = this.randomResult
      console.log(this.randomList)
      let data = []
      this.randomList.forEach(element => {
        data.push({
          legalPerson: element.legalRepresent,
          matchExpert: element.name,
          matchPerson: element.personName,
          objectName: element.objectName,
          projectName: element.projectName,
          taskId: this.currentId,
        })
      });
      // let data = {
      //   legalPerson: this.randomResult[0].personName,
      //   matchExpert: this.randomResult[0].name,
      //   matchPerson: this.randomResult[0].personName,
      //   objectName: this.randomResult[0].objectName,
      //   projectName: this.randomResult[0].projectName,
      //   taskId: this.currentId,
      // }
      // addRandomResultApi(data).then(
      addRandomResultMoreApi(data).then(
        res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            });
          }
        },
        error => {
          // reject(error);
        })
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