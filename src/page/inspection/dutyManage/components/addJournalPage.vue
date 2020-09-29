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
                  <el-radio-group v-model="baseInfoForm.patrolType" :disabled="relationType === '1' || PageType === 'handover'">
                    <el-radio label="路巡">路巡</el-radio>
                    <el-radio label="网巡">网巡</el-radio>
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
                <!-- <el-form-item label="执法人员" prop="lawEnforcementOfficials">
                  <el-input
                    v-model="baseInfoForm.lawEnforcementOfficials"
                    :disabled="relationType === '1'"
                    placeholder="不能手填，要求先选择关联记录，人员自动带出"
                  ></el-input>
                </el-form-item> -->
               <el-form-item label="执法人员" prop="lawEnforcementOfficialsIds" > 
                 <el-select
                  v-model="baseInfoForm.lawEnforcementOfficialsIds"
                  multiple
                  @remove-tag="removeRelation"
                  :class="{'disabled': relationType === '1' || PageType === 'handover'}">
                    <el-option
                      v-for="(item, index) in lawPersonList"
                      :key="item.id"
                      :label="item.lawOfficerName"
                      :value="item.userId"
                      :disabled="relationType === '1' || PageType === 'handover'"
                    ></el-option>
                  </el-select>
               </el-form-item>
              </el-col>
              
              <el-col :span="12">
                <el-form-item label="是否用车" prop="isUseCar">
                  <el-radio-group
                    v-model="baseInfoForm.isUseCar"
                    @change="baseInfoForm.carNum === ''"
                    :disabled="relationType === '1' || PageType === 'handover'"
                  >
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                  <el-input
                    v-if="baseInfoForm.isUseCar === '0'"
                    v-model="baseInfoForm.plateNumbers"
                    placeholder="请输入车牌号"
                    class="car-number-input"
                    :disabled="relationType === '1' || PageType === 'handover'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- <el-form-item label="巡查路段" prop="patrolRoute">
                  <el-input
                    v-model="baseInfoForm.patrolRoute"
                    :disabled="relationType === '1'"
                    placeholder="不能手填，要求先选择关联记录，人员自动带出"
                  ></el-input>
                </el-form-item> -->
               <el-form-item label="巡查路线" prop="patrolRoute"> 
                 <el-select v-model="baseInfoForm.patrolRoute"  multiple  
                :class="{'disabled': relationType === '1' || PageType === 'handover'}">
                 >
                    <el-option
                      v-for="(item, index) in patrolRouteList"
                      :key="item"
                      :label="item"
                      :value="item"
                     :disabled="relationType === '1' || PageType === 'handover'"
                    ></el-option>
                  </el-select>
               </el-form-item> 
              </el-col>
              <el-col :span="12">
                <el-form-item prop="inspectionLength" label-width="0">
                  <el-input
                    v-model="baseInfoForm.inspectionLength"
                    class="inspection-length-input"
                     :disabled="relationType === '1' || PageType === 'handover'"
                  >
                    <template slot="append" >km</template>
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
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="recordNum" label="记录编号" align="center" ></el-table-column>
            <el-table-column prop="checkStartTime" label="巡查时间" align="center" min-width="140px">
               <template slot-scope="scope" class="person-table-onerow">
                  <div >{{scope.row.checkStartTime}}</div>
                  <div >{{scope.row.checkEndTime}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="personNames" label="巡查人员" align="center" ></el-table-column>
            <el-table-column prop="roadNum" label="巡查路线" align="center" ></el-table-column>
            <el-table-column prop="roadName" label="路段名称" align="center" ></el-table-column>
            <!-- <el-table-column prop="routeInfo" label="桩号" align="center" ></el-table-column> -->
            <el-table-column prop="routeInfo" label="桩号" align="center" >
              <template slot-scope="scope">
              <div >K{{scope.row.startKilometer}}+{{scope.row.startMeter}}m</div>
              <div >K{{scope.row.endKilometer}}+{{scope.row.endMeter}}m</div>
            </template>
            </el-table-column>
            <el-table-column prop="routeSituation" label="路段情况" align="center" >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.roadCondition === '1'"
                  style="color: #05C051;"
                >正常</span>
                <span
                  v-else-if="scope.row.roadCondition === '2'"
                  style="color: #E84241;"
                >异常</span>
                <span v-else>{{scope.row.roadCondition}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="lawPerson" label="案件编号" align="center" ></el-table-column>
              <!-- <template slot-scope="scope">
                <span v-if="scope.row.filingCase === '1'">否</span>
                <el-button v-else type="text" @click="checkCase(scope.row)">查看案件</el-button>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
        <h3 class="form-tab-title">其他事项</h3>
        <div class="journal-info-panel">
          <!-- 添加日志 -->
          <el-input :disabled="PageType === 'handover'"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder
            v-model="baseInfoForm.other"
          ></el-input>
          
        </div>
        <h3 class="form-tab-title" v-if="PageType === 'handover'">交接班</h3>
        <div class="journal-info-panel">
<!-- 交接班 -->
          <el-form
            :model="baseInfoForm"
            ref="changeShiftsRef"
            :rules="rules"
            label-width="110px"
           
          >
            <el-row :gutter="20"  v-if="PageType === 'handover'">
              <el-col :span="24">
                <el-form-item label="巡查车辆情况" prop="carCondition">
                  <el-radio-group v-model="baseInfoForm.carCondition">
                    <el-radio label="完好">完好</el-radio>
                    <el-radio label="故障">故障</el-radio>
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
                    <el-radio label="齐全">齐全</el-radio>
                    <el-radio label="缺漏或损坏">缺漏或损坏</el-radio>
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
                <el-form-item label="交班人" prop="includingPeople">
                  <el-select v-model="baseInfoForm.includingPeople">
                    <el-option
                      v-for="item in lawPersonList"
                      :key="item.id"
                      :label="item.lawOfficerName"
                      :value="item.userId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="接班人" prop="successor">
                  <el-select v-model="baseInfoForm.successor">
                    <el-option
                      v-for="item in lawPersonList"
                      :key="item.id"
                      :label="item.lawOfficerName"
                      :value="item.userId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="负责人" prop="manager">
                  <el-select v-model="baseInfoForm.manager">
                    <el-option
                      v-for="item in lawPersonList"
                      :key="item.id"
                      :label="item.lawOfficerName"
                      :value="item.userId"
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
      <el-button class="edit_btn" type="info" @click="toClose">
        <i class="el-icon-circle-close"></i>
        <br />取消
      </el-button>
    </div>
    <div v-else class="float-btns">
      <el-button class="edit_btn" type="primary" @click="save">
        <i class="el-icon-circle-close"></i>
        <br />保存
      </el-button>
       <el-button class="edit_btn" type="info" @click="toClose">
        <i class="el-icon-circle-close"></i>
        <br />取消
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
import { findRouteManageByOrganIdApi } from "@/api/system";
import RelationScheduling from "@/page/inspection/dutyManage/components/relationScheduling.vue";
import RelationRecord from "@/page/inspection/dutyManage/components/relationRecord.vue";
import { saveRecordApi,getCheChecklogPageList,updateRecordApi,getCheRecordLogApi,delCheRecordTemplateApi,addCheShiftchangeApi} from '@/api/supervision';
export default {
  components: { RelationScheduling, RelationRecord },
  data() {
    return {
      isShow: false,
      baseInfoForm: {
        title: "", // 日志标题
        patrolType: "路巡", // 巡查类型 （方式）
        inspectionTime: "", // 巡查时间
        startCheckTime:"",//巡查开始时间
        endCheckTime:"",//巡查结束时间
        weather: "", // 天气
        lawEnforcementOfficials: [], // 执法人员
        lawEnforcementOfficialsIds: [], // 执法人员ids
        isUseCar: "0", // 是否用车
        plateNumbers: "", // 车牌号
        patrolRoute: [], // 巡查路段
        inspectionLength: "", // 路段长度km
        other: "", //其他事项
        carCondition: "完好", // 巡查车辆情况
        equipmentCondition: "齐全", // 勘察设备情况
        carConditionDescribe: "", // 巡查车辆情况描述
        equipmentConditionDescribe: "", // 勘察设备情况描述
        includingPeople: "", // 交班人
        successor: "", // 接班人
        manager: "", // 负责人
        scheduleId:"",//排班ID
        recordsIds:[],//记录ids
        
      },
      changeShiftsForm: {
        carCondition: "完好", // 巡查车辆情况
        equipmentCondition: "齐全", // 勘察设备情况
        carConditionDescribe: "", // 巡查车辆情况描述
        equipmentConditionDescribe: "", // 勘察设备情况描述
        shiftHandoverPerson: "", // 交班人
        successor: "", // 接班人
        responsiblePer: "", // 负责人
      },
      rules: {
        title: [
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
        manager: [
          { required: true, message: "请选择负责人", trigger: "blur" },
        ],
        successor: [
          { required: true, message: "请选择接班人", trigger: "blur" },
        ],
        includingPeople: [
          { required: true, message: "请选择交班人", trigger: "blur" },
        ],
      },
      relationType:"0",
      pageType:"",
      lawPersonList: [],
      patrolRouteList:[],
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
    handelType(){
      return this.$route.params.handelType;
    }
  },
  created() {
    this.findRouteManageByOrganId();
    this.searchLawPerson();
    if(this.handelType === '1'){
      
    }else{
        this.getCheckLogInfo();
        this.getRecordMsg();
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
        this.baseInfoForm.lawEnforcementOfficials = res.data.records[0].lawEnforcementOfficials,
        this.baseInfoForm.includingPeople = res.data.records[0].includingPeople,
        this.baseInfoForm.successor = res.data.records[0].successor,
        this.baseInfoForm.inspectionLength =  res.data.records[0].inspectionLength,
        this.baseInfoForm.plateNumbers =  res.data.records[0].plateNumbers,
        this.baseInfoForm.manager = res.data.records[0].manager,
        this.baseInfoForm.lawEnforcementOfficials = res.data.records[0].lawEnforcementOfficials.split(",");
        this.baseInfoForm.lawEnforcementOfficialsIds = res.data.records[0].lawEnforcementOfficialsIds.split(",");
        this.baseInfoForm.patrolRoute = res.data.records[0].patrolRoute.split(";");
        this.baseInfoForm.isUseCar = res.data.records[0].isUseCar
       }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    //移除执法人员 做校验
    removeRelation(tagval){
      this.tableData.forEach(item =>{
        var personIds =  item.personIds.split(";");
        personIds.forEach(element =>{
              if(tagval === element){
                this.$message({ type: 'warning', message:"已关联现场记录钟存在该执法人员，不能删除！" });
                this.baseInfoForm.lawEnforcementOfficialsIds[this.baseInfoForm.lawEnforcementOfficialsIds.length] = tagval;
              }
        })
      })
    },
    //获取关联记录
    getRecordMsg(){
      let data={
        checklogId:this.checklogId
      }
        getCheRecordLogApi(data).then(res => {
        if (res.code == "200") {
          this.tableData = res.data;
          res.data.forEach((element,index) => {
            this.baseInfoForm.recordsIds[this.baseInfoForm.recordsIds.length] = element.recordId;
     });
        }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    //获取排班数据
    getReturnData(data){
      this.relationType = "1";
      this.baseInfoForm.lawEnforcementOfficialsIds = data.lawEnforcementOfficialsIds.split(";");
      
      this.baseInfoForm.patrolRoute = data.patrolRoute.split(";");
      //this.patrolRouteList = data.patrolRoute.split(";");
      this.baseInfoForm.scheduleId = data.scheduleId;
      this.baseInfoForm.plateNumbers = data.plateNumbers;
      this.baseInfoForm.patrolType = data.patrolType;
    },
    //返回关联记录数据
    getReturnDataRecord(data){
    // this.tableData =data;
      data.forEach((element,index) =>{
        this.tableData.splice(this.tableData.length,1,element)
      })

     data.forEach((element,index) => {
       this.baseInfoForm.recordsIds[this.baseInfoForm.recordsIds.length] = element.recordId;
     });
    },
    // 关联排班
    relationScheduFun() {
      this.$refs.relationSchedulingRef.showModal(this.BusinessType);
    },
    // 关联记录
    relationRecordFun() {
      this.$refs.baseInfoFormRef.validate((valid) => {
            if (valid) {
            var ss = this.baseInfoForm.inspectionTime+"";
            var stringResult = ss.split(',');
            this.baseInfoForm.startCheckTime = stringResult[0]; 
            this.baseInfoForm.endCheckTime = stringResult[1];
            //根据巡查人员名称获取id   
        this.baseInfoForm.lawEnforcementOfficials=[];
        this.baseInfoForm.lawEnforcementOfficialsIds.forEach((item,index1)=>{
          this.lawPersonList.forEach((element,index)=>{
               if(item == element.userId){
                 this.baseInfoForm.lawEnforcementOfficials[this.baseInfoForm.lawEnforcementOfficials.length] = element.lawOfficerName;
               }
          })
        })
               let data = {
                  recordsIds:this.baseInfoForm.recordsIds,
                  checkStartTime:this.baseInfoForm.startCheckTime,
                  checkEndTime:this.baseInfoForm.endCheckTime,
                  personIds:this.baseInfoForm.lawEnforcementOfficialsIds.join(",")
              }
              this.$refs.relationRecordRef.showModal(data);
            }else{
              this.$message({ type: "warning", message: "请先填写日志信息" });
            }
        })

    },
    //取消
    toClose(){
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
                this.$router.push({
                  name: "duty_journal",
                });
    },
    // 解除记录关联
    disassociateRelation() {
      if (this.selectList.length === 0) {
        this.$message({ type: "warning", message: "请选择需要解除关联的记录" });
      }else if(this.selectList.length > 1){
        this.$message({ type: "warning", message: "每次只能解除一条关联记录" });
      } else {
        this.$confirm("确定解除关联吗？", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          iconClass: "custom-question",
          customClass: "custom-confirm",
        })
          .then(() => {
           if(this.handelType==='1'){
             this.tableData.forEach((element,index) => {
               if(element.recordId === this.selectList[0]){
                   this.tableData.splice(index,1)
               }
             });
           }else{
              let data={
          checklogId:this.checklogId,
          templateId:this.selectList[0]
         }
          delCheRecordTemplateApi(data).then(res => {
          if (res.code == "200") {
            this.getRecordMsg();
          }
         }, err => {
           this.$message({ type: 'error', message: err.msg || '' });
         });
           }
        
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
        let _this = this;
      _this.selectList = [];
      val.forEach((item, index) => {
        _this.selectList.push(item.recordId);
      });
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
      // 查询巡查路段
      findRouteManageByOrganId() {
      let data = { organId: this.UserInfo.organId };
      findRouteManageByOrganIdApi(data).then(
        (res) => {
          this.patrolRouteList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    
    //保存
    save(){
      //截取巡查时间
        this.$refs.baseInfoFormRef.validate((valid) => {
            if (valid) {
            const loading = this.$loading({
                lock: true,
                text: "正在保存",
                spinner: "car-loading",
                customClass: "loading-box",
                background: "rgba(234,237,244, 0.8)",
            });
      //巡查时间
      var ss = this.baseInfoForm.inspectionTime+"";
      var stringResult = ss.split(',');
        this.baseInfoForm.startCheckTime = stringResult[0]; 
        this.baseInfoForm.endCheckTime = stringResult[1];
     //根据巡查人员名称获取id   
        this.baseInfoForm.lawEnforcementOfficials=[];
        this.baseInfoForm.lawEnforcementOfficialsIds.forEach((item,index1)=>{
          this.lawPersonList.forEach((element,index)=>{
               if(item == element.userId){
                 this.baseInfoForm.lawEnforcementOfficials[this.baseInfoForm.lawEnforcementOfficials.length] = element.lawOfficerName;
               }
          })
        })
      //新增
      if(this.handelType == '1'){
        var data={
        title:this.baseInfoForm.title,
        patrolType:this.baseInfoForm.patrolType,
        status:this.baseInfoForm.status,
        startCheckTime:this.baseInfoForm.startCheckTime,
        endCheckTime:this.baseInfoForm.endCheckTime,
        weather:this.baseInfoForm.weather,
        scheduleId:this.baseInfoForm.scheduleId,
        other:this.baseInfoForm.other,
        inspectionLength:this.baseInfoForm.inspectionLength,
        recordsIds:this.baseInfoForm.recordsIds.join(","),
        isUseCar:this.baseInfoForm.isUseCar,
        plateNumbers:this.baseInfoForm.plateNumbers,
        lawEnforcementOfficials:this.baseInfoForm.lawEnforcementOfficials.join(","),
        lawEnforcementOfficialsIds:this.baseInfoForm.lawEnforcementOfficialsIds.join(","),
        patrolRoute:this.baseInfoForm.patrolRoute.join(","),
      }
         saveRecordApi(data).then(res => {
        if (res.code == "200") {
          this.$message({
              type: "success",
              message: "提交成功",
              onClose: () => {
                this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
                this.$router.push({
                  name: "duty_journal",
                });
              },
            });
        }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
      //修改
      }else if(this.handelType == '2'){
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
        recordsIds:this.baseInfoForm.recordsIds.join(","),
         isUseCar:this.baseInfoForm.isUseCar,
        plateNumbers:this.baseInfoForm.plateNumbers,
        lawEnforcementOfficials:this.baseInfoForm.lawEnforcementOfficials.join(","),
        lawEnforcementOfficialsIds:this.baseInfoForm.lawEnforcementOfficialsIds.join(","),
        patrolRoute:this.baseInfoForm.patrolRoute.join(","),
      }
        updateRecordApi(data).then(res => {
        if (res.code == "200") {
         this.$message({
              type: "success",
              message: "修改成功",
              onClose: () => {
                this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
                this.$router.push({
                  name: "duty_journal",
                });
              },
            });
        }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
      }else if(this.handelType == '3' ){
          this.$refs.changeShiftsRef.validate((valid) => {
            if (valid) {
            const loading = this.$loading({
                lock: true,
                text: "正在保存",
                spinner: "car-loading",
                customClass: "loading-box",
                background: "rgba(234,237,244, 0.8)",
            });
            
        var data={  
          checklogId:this.checklogId,  
          includingPeople: this.baseInfoForm.includingPeople, // 交班人
          successor: this.baseInfoForm.successor, // 接班人
          manager: this.baseInfoForm.manager, // 负责人
          carCondition:this.baseInfoForm.carCondition,
        carConditionDescribe:this.baseInfoForm.carConditionDescribe,
        equipmentCondition:this.baseInfoForm.equipmentCondition,
        equipmentConditionDescribe:this.baseInfoForm.equipmentConditionDescribe,
        }
        addCheShiftchangeApi(data).then(res => {
        if (res.code == "200") {
          this.$message({
              type: "success",
              message: "提交成功",
              onClose: () => {
                this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
                this.$router.push({
                  name: "duty_journal",
                });
              },
            });
        }
      }, err => {
        this.$message({ type: 'error', message: err.msg || '' });
      });
            }
          })
      }
      loading.close();
            }
        })
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
  &.disabled{
    .el-tag__close{
      display: none;
    }
  }
}
.tableHandle {
  margin-bottom: 10px;
}
</style>
