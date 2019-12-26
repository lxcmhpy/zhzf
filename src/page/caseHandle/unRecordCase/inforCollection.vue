<template>
  <div id="inforCollectionBox">
    <div class="linkPart">
      <a href="#caseInfo">案件情况</a>
      <a href="#casePerson">当事人</a>
      <a href="#carInfo">车辆信息</a>
      <a href="#breakLaw">违法事实</a>
    </div>
    <el-form
      :model="inforForm"
      :rules="rules"
      ref="inforForm"
      class="errorTipForm"
      label-width="100px"
    >
      <div class="caseFormBac">
        <p id="caseInfo">案件情况</p>
        <div>
          <div class="item">
            <el-form-item label="案件来源" prop="caseType">
              <el-select v-model="inforForm.caseType" placeholder="请选择">
                <el-option
                  v-for="item in allCaseType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-input></el-input>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="案发时间">
              <el-date-picker v-model="inforForm.time1" type="datetime"></el-date-picker>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="受案时间" prop="time2">
              <el-date-picker v-model="inforForm.time2" type="datetime"></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="违法行为">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="程序类型">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="案件类型">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="案发地点">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne" >
            <el-form-item label="执法人员" id="lawPersonBox">
              <!-- <el-input> -->
                <el-select v-model="inforForm.lawPersonList" multiple>
                  <el-option
                    v-for="item in alreadyChooseLawPerson"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button icon="el-icon-plus" @click="addLawPerson"></el-button>
              <!-- </el-input> -->
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="caseFormBac">
        <p id="casePerson">当事人信息</p>
        <div>
          <div class="itemOne">
            <el-form-item label="执法人员">
              <el-radio v-model="inforForm.name2" label="1">个人</el-radio>
              <el-radio v-model="inforForm.name2" label="2">企业组织</el-radio>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="姓名" prop="partyName">
              <el-input v-model="inforForm.partyName"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="证件类型">
              <el-input placeholder="请输入内容" class="input-with-select">
                <el-select slot="prepend" value="0">
                  <el-option label="身份证" value="0"></el-option>
                  <el-option label="护照" value="1"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="性别">
              <el-select placeholder="请选择"></el-select>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="年龄">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="联系电话">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="联系地址">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="邮编">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="工作单位">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="职位">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="从业资格证号">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <p>其他人信息</p>
        <div>
          <div class="item">
            <el-form-item label="与当事人关系">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="与案件关系">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="姓名">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="证件类型">
              <el-input placeholder="请输入内容" class="input-with-select">
                <el-select slot="prepend" placeholder="请选择">
                  <el-option label="餐厅名" value="1"></el-option>
                  <el-option label="订单号" value="2"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemThird">
            <el-form-item label="性别">
              <el-select placeholder="请选择"></el-select>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="年龄">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="itemThird">
            <el-form-item label="联系电话">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="联系地址">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="邮编">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="工作单位">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-form-item label="职位">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="从业资格证号">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="caseFormBac">
        <p>车辆信息</p>
        <div>
          <div class="item">
            <el-form-item label="车牌号">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车牌颜色">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="item">
            <el-form-item label="车牌类型">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="品牌">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="道路运输证号">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="caseFormBac">
        <p>补充信息</p>
        <div>
          <el-button type="primary" size="medium" icon="el-icon-plus">添加超限数据</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus">添加路产损坏信息</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus">添加其他</el-button>
        </div>
      </div>
      <div class="caseFormBac">
        <p>违法事实</p>
        <div>
          <div class="itemOne">
            <el-form-item label="违法行为">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="违法条款">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemOne">
            <el-form-item label="出发依据">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>

    <chooseLawPerson ref="chooseLawPersonRef"></chooseLawPerson>
  </div>
</template>
<script>
import chooseLawPerson from "./chooseLawPerson";

export default {
  data() {
    return {
      inforForm: {
        caseType: "",
        time1:'',
        lawPersonList:'',
        name2: "1",
        partyName:'',
      },
      rules: {
        caseType: [{ required: true, message: "请选择", trigger: "blur" }],
        time2: [{ required: true, message: "请选择时间", trigger: "blur" }],
        partyName:[{ required: true, message: "请选择", trigger: "blur" }],
      },
      //案件类型
      allCaseType: [
        { value: 0, label: "行政检测" },
        { value: 1, label: "投诉举报" },
        { value: 2, label: "上级交办" },
        { value: 3, label: "下级报请" },
        { value: 4, label: "部门移送" },
        { value: 5, label: "其他途径" }
      ],
      //证件类型
      credentialType:[
        { value: 0, label: "身份证" },
        { value: 1, label: "护照" }
      ],
      alreadyChooseLawPerson:[{value:'1',label:'张三'}]
    };
  },
  components: {
    chooseLawPerson
  },
  methods: {
    //选择执法人员
    addLawPerson(){
      this.$refs.chooseLawPersonRef.showModal();
    }
  }
};
</script>
<style lang="less">
@import "../../../css/caseHandle/index.less";
</style>