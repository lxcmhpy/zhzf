<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">
          <el-form-item label=" " label-width="13px">
            <el-button size="small" type="warning" @click="create">生成</el-button>
            <el-button size="small" type="primary" @click="print">打印</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tablePart">
            <el-row>
              <el-col :span="24">
                  <div style="text-align: center;font-size: 25px;">西宁市交通管理局 2020年9月</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                  <div style="text-align: center;font-size: 25px;line-height: 50px;">数据分析报告</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                  <div style="text-align: center;font-size: 20px;line-height: 50px;">2019年9月及本月***数据同期、环比对比分析如下：</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                  <div style="text-align: center;font-size: 20px;line-height: 50px;">一、累计数据同期对比分析：</div>
              </el-col>
            </el-row>
             <el-row>
              <el-col :span="24">
                  <div style="text-align: center;font-size: 15px;line-height: 30px;">
                        <p>2020年1月，我局履行公路管理职责，依法保护路产、维护</p>
                        <p>路权，公路管理投入人员累计{{value1}}人次(含巡查、治超)， {{value2}}车次</p>
                        <p>(含巡查、治超)，巡查里程累计达到{{value3}}公里。 依法查处、办理</p>
                        <p>各类路政案件{{value4}}起，同比下降了{{value5}}%， 共收缴公路赔(补)偿费</p>
                        <p>{{value6}}元，同比下降了{{value7}}%，收取行政处罚金额{{value8}}元，同比下降了</p>
                        <p>{{value9}}%，两项费用合计{{value10}}元，同比下降了{{value11}}%，具体明细如下:</p>
                        <p></p>
                    </div>
              </el-col>
            </el-row> 
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      value1: "100",
      value2: "100",
      value3: "100.2",
      value4: "100",
      value5: "20.5",
      value6: "100.2",
      value7: "30",
      value8: "100.2",
      value9: "20.5",
      value10: "100.2",
      value11: "20.5",
      
      
      checked: true,
      dataForm: {},
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      }
    };
  },
  computed: {
    //因为数据用到了dataform中的数据，所以写在了computed中
    
    
  },

  methods: {
    
  },
  mounted() {},
  created() {}
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
