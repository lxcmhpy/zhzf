<template>
  <el-dialog :title="title" width="420px" :visible.sync="visible" :close-on-click-modal="false">
    <el-row class="title" :gutter="20">
      <el-col :span="2">
        <svg t="1578385152671" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2169" width="20" height="20">
          <path d="M905.05088 103.50976c-24.99328-24.99328-57.75232-37.48992-90.51008-37.48992h-614.4c-32.75776 0-65.51552 12.49664-90.5088 37.48992s-37.4912 57.75232-37.4912 90.51008v614.4c0 32.75776 12.49664 65.51552 37.4912 90.51008 24.99328 24.992 57.75104 37.48992 90.5088 37.48992h614.4c32.75776 0 65.5168-12.49792 90.51008-37.48992 24.99328-24.99456 37.48992-57.75232 37.48992-90.51008v-614.4c0-32.75776-12.49536-65.51552-37.48992-90.51008z m-74.03264 338.1696l-163.96672 119.12832c-4.22656 3.07072-7.56224 7.45088-9.30048 12.8s-1.61536 10.85312 0 15.8208l62.6304 192.7552c2.88256 8.86912-0.08192 18.94656-8.032 24.7232-7.95008 5.77536-18.44992 5.48096-25.9968-0.00256l-163.96544-119.12704c-4.22784-3.06944-9.42336-4.88832-15.04768-4.88832s-10.82112 1.8176-15.04768 4.88832l-163.96544 119.12704c-7.5456 5.48352-18.04672 5.77792-25.99552 0-7.95008-5.77536-10.91584-15.8528-8.03328-24.72192l62.62912-192.75264c1.61408-4.96896 1.73824-10.47424 0-15.82208s-5.07264-9.73056-9.30048-12.8l-163.96672-119.12832c-7.5456-5.48224-11.06944-15.37792-8.03328-24.7232 3.03744-9.344 11.70432-15.27936 21.0304-15.27936h202.67392c5.22496 0 10.49728-1.58208 15.0464-4.88832s7.68512-7.83104 9.30048-12.8l62.6304-192.75776c2.88256-8.86912 11.20384-15.28064 21.02912-15.28064s18.14912 6.41152 21.02912 15.28064l62.6304 192.75776c1.61536 4.96896 4.75008 9.49376 9.30048 12.8s9.82272 4.88832 15.04768 4.88832h202.6752c9.32608 0 17.99424 5.93536 21.0304 15.27936 3.04 9.34528-0.48512 19.24096-8.032 24.7232z" fill="#0074F5" p-id="2170"></path>
        </svg>
      </el-col>
      <el-col :span="18">
        当前环节已完成以下材料：
      </el-col>
    </el-row>

    <el-row class="info" :gutter="20" v-for="item in checkList" :key="item.id">
      <el-col :span="2">
        <span v-if="item.status == '1'">
          <svg t="1578386448666" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3010" width="20" height="20">
            <path d="M63.222927 512c0 0 231.767598 189.584869 254.790964 350.823134 0 0 303.906591-497.491565 641.581264-542.003338 0 0-102.837156-74.943876-69.070098-193.395662 0 0-187.255825 18.684548-540.279067 566.637388L184.79375 413.212066 63.222927 512z" p-id="3011" fill="#17C062"></path>
          </svg>
        </span>
        <span v-if="item.status == '0' ||item.status == ''">
          <svg t="1578386502452" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1278" width="14" height="14">
            <path d="M1023.035952 170.907721l-852.12806 852.128061L0.241225 852.730697l852.248588-852.12806z" p-id="1279" fill="#d81e06"></path>
            <path d="M170.425782 0l852.128061 852.12806L852.248758 1022.794727l-852.12806-852.248588z" p-id="1280" fill="#d81e06"></path>
          </svg>
        </span>
      </el-col>
      <el-col :span="18">
        {{item.name}}
      </el-col>
    </el-row>
    <p>无法进入下一环节！</p>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" :disabled="sureDisab"  @click="enterNext">确 定</el-button> -->
      <el-button type="primary" @click="closeDialog">确定</el-button>
    </span>

  </el-dialog>

</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      visible: false,
      checkList: [],
      title: '无法进入下一环节',
      sureDisab:false,
      caseLinkDataForm:{ //为了在公共方法中使用，所以这样组装
        caseBasicinfoId:'',
        caseLinktypeId:''
      }
    };
  },
  mixins: [mixinGetCaseApiList],
  computed:{...mapGetters(['caseId'])},
  mounted() { },
  inject: ['reload'],
  methods: {
    //新增
    showModal(data,caseData) {
      //显示弹框
      this.checkList = [];
      console.log(data);
      this.caseLinkDataForm.caseLinktypeId = caseData.caseLinktypeId;
      this.caseLinkDataForm.caseBasicinfoId = caseData.caseBasicinfoId;
      // data.forEach(item=>{
      //   if(item.status != 1){
      //     this.title = ''
      //   }
      // })
      // for(let i=0;i<data.length;i++){
      //   if(data[i].status != 1 || data[i].status != "1"){
      //     this.title = '无法进入下一环节';
      //     this.sureDisab = true;
      //     break;
      //   }
      // }
      this.visible = true;
      data.forEach(item=>{
        if(item.isRequired === 0) //后台数据原因 要写===0
          this.checkList.push(item);
      });
      //强制执行后台数据原因
      if(this.caseLinkDataForm.caseLinktypeId==this.BASIC_DATA_SYS.forceExecute_caseLinktypeId){
        data.forEach(item=>{
        if(item.isRequired == "")
          this.checkList.push(item);
      });
      }
      console.log('this.checkList',this.checkList);
      // this.checkList = data
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.checkList = [];
    },
    //进入下一环节
    enterNext(){
      this.com_goToNextLinkTu(this.caseId,this.caseLinkDataForm.caseLinktypeId);
    },
    // 弹框关闭按钮
    resetForm() {
      this.visible = false;
        // this.$nextTick(() => {
        //   this.$refs["addUserForm"].resetFields();
        // });
    },
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
  font-weight: 500;
}
.info {
  font-size: 13px;
  margin-bottom: 10px;
  color: black;
  line-height: 20px;
}
.title {
  font-size: 16px;
  line-height: 18px;
}
p {
  height: 16px;
  font-size: 16px;
  font-family: PingFang SC;

  color: rgba(32, 35, 43, 1);
  line-height: 48px;
  text-indent: 1em;
}
</style>




