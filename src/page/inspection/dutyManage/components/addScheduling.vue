<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    class="add-scheduling-dialog"
  >
    <el-form
      :model="addSchedulingForm"
      label-position="right"
      label-width="110px"
      ref="addSchedulingRef"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="排班门类" prop="cateId" required>
          <el-select v-model="addSchedulingForm.cateId" placeholder="请选择" disabled>
            <el-option
              v-for="item in businessOptions"
              :key="item.cateId"
              :label="item.cateName"
              :value="item.cateId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label=" " prop="patrolType">
          <el-radio v-model="addSchedulingForm.patrolType" label="路巡">路巡</el-radio>
          <el-radio v-model="addSchedulingForm.patrolType" label="网巡">网巡</el-radio>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="排班时间" prop="scheduleTime">
          <!-- <el-time-picker
            is-range
            v-model="addSchedulingForm.scheduleTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            @change="timeChange"
          ></el-time-picker> -->
          <el-date-picker
            v-model="addSchedulingForm.scheduleTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            >
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="是否用车" prop="isUseCar" required>
          <el-select v-model="addSchedulingForm.isUseCar" @change="changeUseCar">
            <el-option key="1" label="是" value="1"></el-option>
            <el-option key="0" label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row v-if="addSchedulingForm.isUseCar === '1'">
        <el-form-item label="  " prop="plateNumbers">
          <el-input v-model="addSchedulingForm.plateNumbers" placeholder="请输入巡查车辆车牌号"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="执法人员" prop="lawPersonListIndex">
          <el-select v-model="addSchedulingForm.lawPersonListIndex" multiple>
            <el-option
              v-for="(item, index) in lawPersonList"
              :key="item.id"
              :label="item.lawOfficerName"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="排班人员" prop="schedulePersonnel">
          <el-input v-model="addSchedulingForm.schedulePersonnel" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="巡查路线" prop="patrolRoute">
          <!-- <el-input v-model="addSchedulingForm.patrolRoute"></el-input> -->
          <el-select
            v-model="addSchedulingForm.patrolRoute"
            multiple
            placeholder="请选择路线"
          >
            <el-option v-for="item in routeList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { vaildateCardNum } from "@/common/js/validator";
import { addCheScheduleApi, updateCheScheduleApi } from "@/api/supervision";
import { findRouteManageByOrganIdApi } from "@/api/system";

export default {
  props: {
    businessOptions: {
      type: Array,
      default: () => [],
    },
    dutyDay: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,
      addSchedulingForm: {
        cateId: "",
        cateName: "",
        patrolType: "路巡",
        isUseCar: "1",
        plateNumbers: "",
        lawPersonListIndex: [],
        schedulePersonnel: "",
        schedulePersonnelId: "",
        patrolRoute: "",
        scheduleTime: [],
        lawEnforcementOfficials: "",
        lawEnforcementOfficialsIds: ""
      },
      lawPersonList: [],
      routeList: [],
      rules: {
        scheduleTime: [
          { required: true, message: "排班时间不能为空", trigger: "blur" },
        ],
        plateNumbers: [
          { required: true, message: "巡查车牌号不能为空", trigger: "blur" },
          { validator: vaildateCardNum, trigger: "blur" },
        ],
        lawPersonListIndex: [
          { required: true, message: "执法人员不能为空", trigger: "change" },
        ],
        schedulePersonnel: [{ required: true, trigger: "blur" }],
        patrolRoute: [
          { required: true, message: "巡查路线不能为空", trigger: "blur" },
        ],
      },
      dialogTitle: "新增排班", //弹出框title
      handelType: "add", //添加 add  修改 edit
      schedulingDay: "",
      curUser: {}
    };
  },
  computed: {
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  created() {
    this.searchLawPerson();
    this.findRouteManageByOrganId();
  },
  methods: {
    // 是否用车
    changeUseCar() {
      this.addSchedulingForm.licensePlate = "";
    },
    // 排班时间变化
    timeChange() {
      console.log(this.addSchedulingForm.scheduleTime);
      
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
    //提交
    submit() {

      this.$refs.addSchedulingRef.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)",
          });
          this.addSchedulingForm.startTime = this.addSchedulingForm.scheduleTime[0];
          this.addSchedulingForm.endTime = this.addSchedulingForm.scheduleTime[1];
          const lawPersonListIndex = this.addSchedulingForm.lawPersonListIndex;

          this.addSchedulingForm.lawEnforcementOfficials = "";
          this.addSchedulingForm.lawEnforcementOfficialsIds = "";
          this.addSchedulingForm.lawEnforcementOfficials = this.addSchedulingForm.lawPersonListIndex.map(i => this.lawPersonList[i].lawOfficerName).join(';');
          this.addSchedulingForm.lawEnforcementOfficialsIds = this.addSchedulingForm.lawPersonListIndex.map(i => this.lawPersonList[i].id).join(';');
          this.addSchedulingForm.patrolRoute = this.addSchedulingForm.patrolRoute.join(';');
          const data = JSON.parse(JSON.stringify(this.addSchedulingForm));

          if(this.handelType == "add"){
            addCheScheduleApi(data).then(
              (res) => {
                if(res.code == 200){
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  this.$parent.getScheduleList();
                }else if( res.code == 500 ){
                  this.$message({
                    type: "warning",
                    message: res.msg
                  });
                }
              },
              (err) => { }
            );
          }else{
            updateCheScheduleApi(data).then(
              (res) => {
                if(res.code == 200){
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  this.$parent.getScheduleList();
                  this.$parent.clearSelectSchedule();
                }else if(res.code == 500){
                  this.$message({
                    type: "warning",
                    message: res.msg
                  });
                }
              },
              (err) => { }
            );
          }
          loading.close();
          this.closeDialog();
        } else {
          return false;
        }
      });
    },
    showModal(type, data) {
      let formData = {};
      this.handelType = type;
      if (type === "add") {
        formData.patrolType = "路巡";
        formData.isUseCar = "0";
        this.dialogTitle = "新增排班";
        formData.cateId = data.cateId;
        formData.cateName = data.cateName;
        formData.schedulePersonnel = this.UserInfo.nickName;
        formData.schedulePersonnelId = this.UserInfo.id;
        formData.oid = this.UserInfo.organId;
        formData.startTime = this.dutyDay + " 08:00:00";
        formData.endTime = this.dutyDay + " 18:00:00";
        formData.scheduleTime = [formData.startTime, formData.endTime];
      }else{
        Object.assign(formData, data);
        this.dialogTitle = "修改排班";
        formData.scheduleTime = [data.startTime, data.endTime];
        const lawEnforcementOfficialsIds = data.lawEnforcementOfficialsIds.split(";");
        formData.lawPersonListIndex = [];
        this.lawPersonList && this.lawPersonList.forEach((item, index) => {
          if(lawEnforcementOfficialsIds.indexOf(item.id) > -1){
            formData.lawPersonListIndex.push(index);
          }
        });
      }
      
      this.schedulingDay = data.day;
      this.visible = true;
      this.addSchedulingForm = formData;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addSchedulingRef"].resetFields();
      for (const key in this.addSchedulingForm) {
        this.addSchedulingForm[key] = "";
      }
    },
    //查找路线
    findRouteManageByOrganId() {
      let data = { organId: this.UserInfo.organId };
      findRouteManageByOrganIdApi(data).then(
        (res) => {
          this.routeList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
>>> .el-select,
>>> .el-date-editor {
  display: block;
}
>>> .el-date-editor.el-input,
>>> .el-date-editor.el-input__inner {
  display: block;
  width: 100%;
}
>>> .el-range-editor.el-input__inner {
  display: inline-block;
  padding: 0 15px;
  height: 32px;
  line-height: 32px;
  .el-range-input {
    height: 28px;
  }
}
</style>
