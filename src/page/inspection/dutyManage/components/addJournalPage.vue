<template>
  <div class="com_searchAndpageBoxPadding addJournal">
    <div class="searchAndpageBox">
      <div class="add-journal-form">
        <h3 class="form-tab-title">基本信息</h3>
        <div class="journal-info-panel">
          <div v-if="PageType === 'journal'" class="journal-top-handle">
            <el-button icon="el-icon-paperclip" size="medium" plain @click="relationScheduFun">关联排班</el-button>
          </div>
          <el-form
            :model="baseInfoForm"
            :rules="rules"
            ref="baseInfoFormRef"
            label-position="right"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="日志标题" prop="title">
                  <el-input v-model="baseInfoForm.title" :disabled="PageType === 'handover'"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="方式" prop="patrolType">
                  <el-radio-group v-model="baseInfoForm.patrolType" :disabled="PageType === 'handover'">
                    <el-radio label="1">路巡</el-radio>
                    <el-radio label="2">网巡</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="巡查时间" prop="inspectionTime">
                  <el-time-picker
                    is-range
                    v-model="baseInfoForm.inspectionTime"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :disabled="PageType === 'handover'"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="天气" prop="weather">
                  <el-select v-model="baseInfoForm.weather" :disabled="PageType === 'handover'">
                    <el-option label="晴" value="1"></el-option>
                    <el-option label="阴" value="2"></el-option>
                    <el-option label="风" value="3"></el-option>
                    <el-option label="雨" value="4"></el-option>
                    <el-option label="雪" value="5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执法人员" prop="lawEnforcementOfficials">
                  <el-input
                    v-model="baseInfoForm.lawEnforcementOfficials"
                    disabled
                    placeholder="不能手填，要求先选择关联记录，人员自动带出"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否用车" prop="isUseCar">
                  <el-radio-group
                    v-model="baseInfoForm.isUseCar"
                    @change="baseInfoForm.carNum === ''"
                    :disabled="PageType === 'handover'"
                  >
                    <el-radio label="1">是</el-radio>
                    <el-radio label="2">否</el-radio>
                  </el-radio-group>
                  <el-input
                    v-if="baseInfoForm.isUseCar === '1'"
                    v-model="baseInfoForm.carNum"
                    placeholder="请输入车牌号"
                    class="car-number-input"
                    :disabled="PageType === 'handover'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="巡查路段" prop="patrolRoute">
                  <el-input
                    v-model="baseInfoForm.patrolRoute"
                    disabled
                    placeholder="不能手填，要求先选择关联记录，人员自动带出"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="inspectionLength" label-width="0">
                  <el-input
                    v-model="baseInfoForm.inspectionLength"
                    class="inspection-length-input"
                    :disabled="PageType === 'handover'"
                  >
                    <template slot="append">km</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <h3 class="form-tab-title">现场记录</h3>
        <div class="journal-info-panel">
          <div  v-if="PageType === 'journal'" class="journal-top-handle">
            <el-button icon="el-icon-connection" size="medium" plain @click="relationRecordFun">关联记录</el-button>
            <el-button class="disassociate-btn" size="medium" plain @click="disassociateRelation">
              <i class="disassociate-icon"></i>解除关联
            </el-button>
          </div>
          <el-table
            ref="journalTableRef"
            :data="tableData"
            resizable
            stripe
            class="person-table"
            v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中..."
            style="width: 100%;height:100%;"
            @selection-change="selectJournal"
          >
            <el-table-column type="selection" align="center" fixed="left"></el-table-column>
            <el-table-column prop="journalNo" label="记录编号" align="left" width="100px" fixed="left"></el-table-column>
            <el-table-column prop="checkType" label="检查类型" align="center" width="120px"></el-table-column>
            <el-table-column prop="checkCategory" label="检查门类" align="center" width="150px;"></el-table-column>
            <el-table-column prop="inspectionTime" label="巡查时间" align="center" min-width="280px"></el-table-column>
            <el-table-column prop="companyName" label="单位名称" align="center" min-width="220px"></el-table-column>
            <el-table-column prop="routeName" label="路段名称" align="center" min-width="180px"></el-table-column>
            <el-table-column prop="routeInfo" label="路段信息" align="center" min-width="220px"></el-table-column>
            <el-table-column prop="routeSituation" label="路段情况" align="center" width="120px"></el-table-column>
            <el-table-column prop="lawPerson" label="执法人员" align="center" min-width="140px"></el-table-column>
            <el-table-column prop="opt" label="是否立案" align="center" fixed="right" width="140px">
              <template slot-scope="scope">
                <span v-if="scope.row.filingCase === '1'">否</span>
                <el-button v-else type="text" @click="checkCase(scope.row)">查看案件</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <h3 class="form-tab-title">其他事项</h3>
        <div class="journal-info-panel">
          <!-- 添加日志 -->
          <el-input
            v-if="PageType === 'journal'"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder
            v-model="baseInfoForm.other"
          ></el-input>
          <!-- 交接班 -->
          <el-form
            :model="changeShiftsForm"
            ref="changeShiftsRef"
            :rules="rules"
            label-width="110px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="巡查车辆情况" prop="carCondition">
                  <el-radio-group v-model="baseInfoForm.carCondition">
                    <el-radio label="1">完好</el-radio>
                    <el-radio label="2">故障</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="carConditionDescribe" label=" ">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    placeholder
                    v-model="baseInfoForm.carConditionDescribe"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="勘察设备情况" prop="equipmentCondition">
                  <el-radio-group v-model="baseInfoForm.equipmentCondition">
                    <el-radio label="1">齐全</el-radio>
                    <el-radio label="2">缺漏或损坏</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="equipmentConditionDescribe" label=" ">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    placeholder
                    v-model="baseInfoForm.equipmentConditionDescribe"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="PageType === 'handover'">
              <el-col :span="8">
                <el-form-item label="交班人" prop="shiftHandoverPerson">
                  <el-select v-model="changeShiftsForm.shiftHandoverPerson">
                    <el-option
                      v-for="item in lawPersonList"
                      :key="item.id"
                      :label="item.lawOfficerName"
                      :value="item.lawOfficerName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="接班人" prop="successor">
                  <el-select v-model="changeShiftsForm.successor">
                    <el-option
                      v-for="item in lawPersonList"
                      :key="item.id"
                      :label="item.lawOfficerName"
                      :value="item.lawOfficerName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="负责人" prop="responsiblePer">
                  <el-select v-model="changeShiftsForm.responsiblePer">
                    <el-option
                      v-for="item in lawPersonList"
                      :key="item.id"
                      :label="item.lawOfficerName"
                      :value="item.lawOfficerName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div v-if="PageType === 'journal'" class="float-btns">
      <el-button class="edit_btn" type="primary" @click="save">
        <i class="iconfont law-edit"></i>
        <br />保存
      </el-button>
      <el-button class="edit_btn" type="info">
        <i class="el-icon-circle-close"></i>
        <br />取消
      </el-button>
    </div>
    <div v-else class="float-btns">
      <el-button class="edit_btn" type="info">
        <i class="el-icon-circle-close"></i>
        <br />保存
      </el-button>
    </div>
    <!-- 关联排班弹窗 -->
    <RelationScheduling ref="relationSchedulingRef" @returnData="getReturnData" />
    <!-- 关联记录 -->
    <RelationRecord ref="relationRecordRef" @returnDataRecord="getReturnDataRecord"/>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import RelationScheduling from "@/page/inspection/dutyManage/components/relationScheduling.vue";
import RelationRecord from "@/page/inspection/dutyManage/components/relationRecord.vue";
import { saveRecordApi,getCheChecklogPageList,updateRecordApi,getCheRecordLogApi,delCheRecordTemplateApi} from '@/api/supervision';
export default {
  components: { RelationScheduling, RelationRecord },
  data() {
    return {
      isShow: false,
      baseInfoForm: {
        title: "", // 日志标题
        patrolType: "1", // 巡查类型 （方式）
        inspectionTime: "", // 巡查时间
        startCheckTime:"",//巡查开始时间
        endCheckTime:"",//巡查结束时间
        weather: "", // 天气
        lawEnforcementOfficials: "", // 执法人员
        isUseCar: "1", // 是否用车
        carNum: "", // 车牌号
        patrolRoute: "", // 巡查路段
        inspectionLength: "", // 路段长度km
        other: "", //其他事项
        carCondition: "1", // 巡查车辆情况
        equipmentCondition: "1", // 勘察设备情况
        carConditionDescribe: "", // 巡查车辆情况描述
        equipmentConditionDescribe: "", // 勘察设备情况描述
        shiftHandoverPerson: "", // 交班人
        successor: "", // 接班人
        responsiblePer: "", // 负责人
        scheduleId:"",//排班ID
        recordsIds:[],//记录ids
      },
      changeShiftsForm: {
        carCondition: "1", // 巡查车辆情况
        equipmentCondition: "1", // 勘察设备情况
        carConditionDescribe: "", // 巡查车辆情况描述
        equipmentConditionDescribe: "", // 勘察设备情况描述
        shiftHandoverPerson: "", // 交班人
        successor: "", // 接班人
        responsiblePer: "", // 负责人
      },
      rules: {
        journalTitle: [
          { required: true, message: "请输入日志标题", trigger: "blur" },
        ],
        inspectionTime: [
          { required: true, message: "请输入巡查时间", trigger: "blur" },
        ],
        lawEnforcementOfficials: [
          { required: true, message: "执法人员不能为空", trigger: "blur" },
        ],
        patrolRoute: [
          { required: true, message: "巡查路段不能为空", trigger: "blur" },
        ],
        responsiblePer: [
          { required: true, message: "请选择负责人", trigger: "change" },
        ],
        successor: [
          { required: true, message: "请选择接班人", trigger: "change" },
        ],
        shiftHandoverPerson: [
          { required: true, message: "请选择交班人", trigger: "change" },
        ],
      },
      pageType:"",
      lawPersonList: [],
      tableData: [],
      selectList: [],
      other: "",
      tableLoading: false,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
    };
  },
  computed: {
    checklogId(){
       return this.$route.params.checklogId;
    },
    pageName(){
      return this.$route.name;
    },
    BusinessType() {
      return this.$route.params.type;
    },
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
    // PageType区分页面('journal': '添加日志', 'handover': '交接班', 'road': '路政详情')
    PageType() {
      return this.$route.params.page;
    },
  },
  created() {
    console.log(this.BusinessType);
    this.searchLawPerson();
   this.pageType = '1';
    if(this.checklogId != undefined && this.checklogId != ""){
      this.getCheckLogInfo();
      this.getRecordMsg();
      this.pageType = '2';
    }
  },
  methods: {
    //查询修改的日志信息
    getCheckLogInfo(){
      let data={
        checklogId:this.checklogId,
      };
       getCheChecklogPageList(data).then(res => {
        if (res.code == "200") {
        this.baseInfoForm.title = res.data.records[0].title,
        this.baseInfoForm.patrolType = res.data.records[0].patrolType,
        this.baseInfoForm.status = res.data.records[0].status,
         this.baseInfoForm.inspectionTime = [res.data.records[0].startCheckTime,res.data.records[0].endCheckTime],
        this.baseInfoForm.startCheckTime = res.data.records[0].startCheckTime,
        this.baseInfoForm.endCheckTime = res.data.records[0].endCheckTime,
        this.baseInfoForm.weather = res.data.records[0].weather,
        this.baseInfoForm.scheduleId = res.data.records[0].scheduleId,
        this.baseInfoForm.other = res.data.records[0].other,
        this.baseInfoForm.carCondition = res.data.records[0].carCondition,
        this.baseInfoForm.carConditionDescribe = res.data.records[0].carConditionDescribe,
        this.baseInfoForm.equipmentCondition = res.data.records[0].equipmentCondition,
        this.baseInfoForm.equipmentConditionDescribe = res.data.records[0].equipmentConditionDescribe
        this.baseInfoForm.patrolRoute = res.data.records[0].patrolRoute,
        this.baseInfoForm.lawEnforcementOfficials = res.data.records[0].lawEnforcementOfficials
       }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    //获取关联记录
    getRecordMsg(){
      let data={
        checklogId:this.checklogId
      }
        getCheRecordLogApi(data).then(res => {
        if (res.code == "200") {
          this.tableData = res.data.records;
        }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    //获取排班数据
    getReturnData(data){
      this.baseInfoForm.lawEnforcementOfficials = data.lawEnforcementOfficials;
      this.baseInfoForm.patrolRoute =data.patrolRoute;
      this.baseInfoForm.scheduleId = data.scheduleId;
    },
    //返回关联记录数据
    getReturnDataRecord(data){
     this.tableData[this.tableData.length] = data;
     
     data.forEach(element => {
       this.baseInfoForm.recordsIds[this.baseInfoForm.recordsIds.length] = element.recordId;
     });
    },
    // 关联排班
    relationScheduFun() {
      this.$refs.relationSchedulingRef.showModal(this.BusinessType);
    },
    // 关联记录
    relationRecordFun() {
      this.$refs.relationRecordRef.showModal();
    },
    // 解除记录关联
    disassociateRelation() {
      if (this.selectList.length === 0) {
        this.$message({ type: "warning", message: "请选择需要解除关联的记录" });
      } else {
        this.$confirm("确定解除关联吗？", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          iconClass: "custom-question",
          customClass: "custom-confirm",
        })
          .then(() => {
        let data={
          checklogId:this.checklogId
         }
          delCheRecordTemplateApi(data).then(res => {
          if (res.code == "200") {
            this.getRecordMsg();
          }
         }, err => {
           this.$message({ type: 'error', message: err.msg || '' });
         });
          })
          .catch(() => {});
      }
    },
    // 现场记录--查看案件
    checkCase(row) {
      this.$confirm("该功能暂未开发", "提示", {
        confirmButtonText: "确定",
        iconClass: "custom-remind",
        customClass: "custom-confirm",
        showCancelButton: false,
      })
        .then(() => {})
        .catch(() => {});
    },
    // 选中的现场记录
    selectJournal(val) {
      console.log(val);
      this.selectList = val;
    },
    // 查询执法人员
    searchLawPerson() {
      this.$store.dispatch("findLawOfficerList", this.UserInfo.organId).then(
        (res) => {
          this.lawPersonList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //保存
    save(){
      var ss = this.baseInfoForm.inspectionTime+"";
      var stringResult = ss.split(',');
        this.baseInfoForm.startCheckTime = stringResult[0]; 
        this.baseInfoForm.endCheckTime = stringResult[1];
      
      //新增
      if(this.pageType == '1'){
        var data={
        title:this.baseInfoForm.title,
        patrolType:this.baseInfoForm.patrolType,
        status:this.baseInfoForm.status,
        startCheckTime:this.baseInfoForm.startCheckTime,
        endCheckTime:this.baseInfoForm.endCheckTime,
        weather:this.baseInfoForm.weather,
        scheduleId:this.baseInfoForm.scheduleId,
        other:this.baseInfoForm.other,
        carCondition:this.baseInfoForm.carCondition,
        carConditionDescribe:this.baseInfoForm.carConditionDescribe,
        equipmentCondition:this.baseInfoForm.equipmentCondition,
        equipmentConditionDescribe:this.baseInfoForm.equipmentConditionDescribe,
        recordsIds:this.baseInfoForm.recordsIds.join(","),
      }
         saveRecordApi(data).then(res => {
        if (res.code == "200") {
          this.tableData = res.data.records;
        }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
      //修改
      }else if(this.pageType == '2'){
        var data={
        checklogId:this.checklogId, 
        title:this.baseInfoForm.title,
        patrolType:this.baseInfoForm.patrolType,
        status:this.baseInfoForm.status,
        startCheckTime:this.baseInfoForm.startCheckTime,
        endCheckTime:this.baseInfoForm.endCheckTime,
        weather:this.baseInfoForm.weather,
        scheduleId:this.baseInfoForm.scheduleId,
        other:this.baseInfoForm.other,
        carCondition:this.baseInfoForm.carCondition,
        carConditionDescribe:this.baseInfoForm.carConditionDescribe,
        equipmentCondition:this.baseInfoForm.equipmentCondition,
        equipmentConditionDescribe:this.baseInfoForm.equipmentConditionDescribe,
        recordsIds:this.baseInfoForm.recordsIds.join(","),
      }
        updateRecordApi(data).then(res => {
        if (res.code == "200") {
          this.tableData = res.data.records;
        }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
      }
       
    },
  },
};
</script>

<style  lang="scss" scoped>
.addJournal {
  .add-journal-form {
    >>> .el-input,
    >>> .el-select {
      width: 100%;
    }
    >>> .el-date-editor {
      width: 100%;
      line-height: 32px;
    }
    .form-tab-title {
      font-size: 18px;
      font-weight: bold;
      color: #20232b;
      padding-left: 10px;
      margin-bottom: 18px;
      border-left: 4px solid #4573d0;
    }
    .car-number-input {
      width: 120px;
      margin-left: 28px;
    }
    .inspection-length-input {
      width: 150px;
      margin-top: 4px;
    }
  }
  .float-btns {
    width: 48px;
    height: 100px;
    position: fixed;
    right: 70px;
    bottom: 70px;
    z-index: 100;
    &.float-btns .el-button {
      border-radius: 1px;
      width: 48px;
      height: 48px;
      padding: 0;
      text-align: center;
      margin-left: 0;
      margin-top: 10px;
      &:first-child {
        margin-top: 0;
      }
    }
    .iconfont {
      display: inline-block;
      margin-bottom: 4px;
      margin-left: 4px;
    }
    >>> .el-icon-circle-close {
      font-size: 18px;
      margin: 0 0 4px 4px;
    }
  }
  .journal-info-panel {
    width: 86%;
    min-height: 60px;
    margin: 20px 15px;
    .journal-top-handle {
      margin-bottom: 20px;
      >>> .el-button--default {
        color: #4573d0;
        border: 1px solid #4573d0;
        > span {
          font-weight: 600;
        }
        &:hover {
          background: #ecf5ff;
          border-color: #b3d8ff;
        }
      }
      .disassociate-btn {
        color: #4aafa7;
        border: 1px solid #4aafa7;
        .disassociate-icon {
          display: block;
          width: 14px;
          height: 14px;
          float: left;
          background: url(".././../../../../static/images/img/personInfo/icon_jcgl.svg")
            no-repeat;
          margin-right: 8px;
        }
        &:hover {
          background: #f0f9eb;
          border-color: #c2e7b0;
        }
      }
      >>> .el-table__body-wrapper {
        padding-bottom: 0;
      }
      >>> .el-table--scrollable-x .el-table__body-wrapper {
        &::-webkit-scrollbar {
          height: 12px;
        }
        &::-webkit-scrollbar-track {
          height: 12px;
        }
      }
      >>> .el-table__fixed-body-wrapper {
        bottom: 8px;
      }
      >>> .el-table__fixed-right::before,
      >>> .el-table__fixed::before {
        display: none;
      }
    }
  }
}
>>> .el-select {
  margin-right: 0;
}
.tableHandle {
  margin-bottom: 10px;
}
</style>
