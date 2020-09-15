<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true">
             <el-form-item label="同步时间">
                <el-date-picker style='width:500px' :picker-options="pickerOptions" unlink-panels v-model="timeList" type="daterange" range-separator="—" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="info" icon="el-icon-search" size="medium" @click="syncData();">同步</el-button>
              <el-button type="primary" size="medium" @click="resetLog">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { collectVehicleWeightEntry } from "@/api/lawSupervise.js";
export default {
  data() {
    let _this = this;
    return {
      timeList: ['', ''],
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          if (minDate) {
            _this.$set(_this.timeList, 0, minDate);
          }
          let max = new Date(maxDate ? maxDate : minDate);
          max.setHours(23);
          max.setMinutes(59);
          max.setSeconds(59);
          _this.$set(_this.timeList, 1, max);
        }
      },
    };
  },
  components: {
  },
  methods: {
    resetLog() {
      this.timeList= ['', '']
    },
    async syncData() {
      let startTime = typeof this.timeList[0] == 'object' ? this.timeList[0].format('yyyy-MM-dd HH:mm:ss') : this.timeList[0];
      let endTime = typeof this.timeList[1] == 'object' ? this.timeList[1].format('yyyy-MM-dd HH:mm:ss') : this.timeList[1];
      if(startTime && endTime){
          let res = await collectVehicleWeightEntry(startTime,endTime)
          this.$message({
            message: '同步完成，共同步'+res.data+'条数据',
            type: 'success'
        });
      }else{
        this.$message({
            message: '请选择同步时间',
            type: 'error'
        });
      }
    }
  }
};
</script>

<style scoped>
</style>