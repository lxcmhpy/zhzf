<template>
  <div class="cats-layout-page-content">
    <div class="searchAndpageBox toggleBox">
      <!-- <div class="handlePart" style="margin-left: 0px;"> -->

      <div class="search">
        <el-form :label-position="labelPosition" :model="search" ref="form" label-width="160px" :inline="true">
          <el-form-item label="所属机构">
            <el-select v-model="search.oId" placeholder="请选择" @change="fetchData">
              <el-option v-for="(item,index) in organList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="考核名称">
              <el-select v-model="search.batchId" placeholder="请选择" >
                <el-option v-for="(item,index) in batchList" :key="index" :label="item.batchName" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
          <!-- <el-form-item>
              <el-button type="primary" size="cats-common" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="cats-common" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-form-item> -->
          <el-form-item v-show="!isSubmit">
            <el-button type="primary" v-show="personList.length>0" size="cats-common" icon="el-icon-plus" @click="randomSamplingStaff">随机抽取</el-button>
            <el-button type="primary" v-show="personList.length>0" size="cats-common" icon="el-icon-plus" @click="submitStaff">确认抽取</el-button>
          </el-form-item>

        </el-form>
      </div>

      <div class="extractPage">
        <div class="com_extract_top">
          <el-transfer width="100%" :titles="['人员列表', '已抽取人员']" v-model="value" :button-texts="['', '']" :data="personList" @change="handleChange">
            <span slot-scope="{ option }">
              <ul class="transfer-list ">
                <li style="flex:0"><span class="left">{{option.key+1}}</span></li>
                <li style="flex:0.5"><span>{{ option.staffName }} </span></li>
                <li><span>{{ option.jobTitle }} </span></li>
                <li><span>{{ option.leaderShip }} </span></li>
                <li><span>{{ option.cityDivision }} </span></li>
              </ul>
            </span>
            <ul class="transfer-list " slot="left-footer">
              <li style="flex:0.2"><span>序号</span></li>
              <li style="flex:0.5"><span>姓名</span></li>
              <li><span>职务</span></li>
              <li><span>是否领导</span></li>
              <li><span>所属城市</span></li>
            </ul>
            <ul class="transfer-list " slot="right-footer">
              <li style="flex:0.2"><span>序号</span></li>
              <li style="flex:0.5"><span>姓名</span></li>
              <li><span>职务</span></li>
              <li><span>是否领导</span></li>
              <li><span>所属城市</span></li>
            </ul>
          </el-transfer>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import {
  findPykhStaffByPage,
  randomSamplingStaffByPage,
  findListVoByBatch,
  findAllDepartment,
  submitProStaff,
  submitStaff
} from '@/api/pykh/catsAppraisalExamPersonUpload.js'
import { getCurrentBatchId } from '@/api/pykh/catsAppraisalStartUp.js'
import iLocalStroage from '@/common/js/localStroage'
import qs from 'qs'

export default {
  data() {
    return {
      value: [],
      search: {
        oId: '',
        batchId: '',
        current: 1,
        size: 1000,
        bsStatus: '1'
        // fjStatus: "1"
      },
      personList: [],
      organId: '',
      labelPosition: 'right',
      batchList: [],
      organList: [],
      isSubmit: false
    }
  },
  methods: {
    fetchData() {
      findPykhStaffByPage(this.search).then(res => {
        // console.info("根据条件分页查询人员列表:",res);
        if (res.code == 200) {
          var personlist = []
          this.value = []
          for (var i = 0; i < res.data.records.length; i++) {
            let code = []
            res.data.records[i].maritimeNo ? code.push(res.data.records[i].maritimeNo) : null
            res.data.records[i].idCard ? code.push(res.data.records[i].idCard) : null
            res.data.records[i].ministerialNo ? code.push(res.data.records[i].ministerialNo) : null

            if (res.data.records[i].staffStatus != 0) {
              this.value.push(i)
            }
            personlist.push({
              key: i,
              label: res.data.records[i].staffName,
              staffName: res.data.records[i].staffName,
              leaderShip: res.data.records[i].leaderShip,
              cityDivision: res.data.records[i].cityDivision,
              jobTitle: res.data.records[i].jobTitle,
              maritimeNo: code.join(','),
              staffId: res.data.records[i].staffId
            })
          }
          if (this.value.length > 0) {
            this.isSubmit = true
            personlist.forEach(item => {
              item.disabled = true
            })
          } else {
            this.isSubmit = false
          }
          this.personList = personlist
        }
        console.info('psersonlist:', this.personList)
      })
    },
    handleChange(value, direction, movedKeys) {
      /* console.log(value, direction, movedKeys);
                var ids= [];
                var personList=this.personList;
                console.info("personlist:",personList)
                for(var j=0;j<value.length;j++){
                  // ids+="idList="+personList[value[j]].staffId+"&"
                  ids.push(personList[value[j]].staffId)
                }
                // console.info("ids:",qs.stringify(ids, { arrayFormat: 'brackets' }))
                var submitProStaffData={};
                submitProStaffData.idList= ids ;
                submitProStaffData.batchId=this.search.batchId;
                let _this = this
                submitStaff(submitProStaffData).then(res=>{
                  if(res.code===200){
                    if(res.data === "操作成功"){
                      _this.catsMessage({type: "success",message: res.data});
                    }else if(res.data === "取消成功"){
                      _this.catsMessage({type: "success",message: res.data});
                      _this.value = []
                    }else{
                      _this.catsMessage({type: "error",message: res.data});
                      _this.value = []
                    }
                  }
                }); */
    },
    submitStaff() {
      var ids = []
      var personList = this.personList
      for (var j = 0; j < this.value.length; j++) {
        ids.push(personList[this.value[j]].staffId)
      }
      if (ids.length === 0) {
        this.catsMessage({
          type: 'warning',
          message: '请先抽取数据'
        })
        return
      }
      var submitProStaffData = {}
      submitProStaffData.idList = ids
      submitProStaffData.batchId = this.search.batchId
      submitProStaffData.organId = this.search.oId
      let _this = this
      submitStaff(submitProStaffData).then(res => {
        if (res.code === 200) {
          if (res.data === '确认成功') {
            _this.personList.forEach(item => {
              item.disabled = true
            })
            _this.isSubmit = true
            _this.catsMessage({
              type: 'success',
              message: res.data
            })
          } else if (res.data === '取消成功') {
            _this.catsMessage({
              type: 'success',
              message: res.data
            })
            _this.value = []
          } else {
            _this.catsMessage({
              type: 'error',
              message: res.data
            })
          }
        }
      })
    },
    randomSamplingStaff() {
      if (this.search.batchId == '' || this.search.OId == '') {
        this.catsMessage({
          message: '请先选择机构和考核名称',
          type: 'error'
        })
      } else {
        this.value = []
        let _this = this
        randomSamplingStaffByPage(this.search.oId, this.search.batchId).then(res => {
          if (res.code == 200) {
            for (var i = 0; i < res.data.length; i++) {
              var id = res.data[i].staffId
              _this.personList.forEach(function(item) {
                if (item.staffId === id) {
                  _this.value.push(item.key)
                }
              })
            }
          }
        })
      }
    },
    getBatch() {
      getCurrentBatchId().then(res => {
        if ((res.code = 200)) {
          this.search.batchId = res.data
        }
      })
    },
    getOrgan() {
      findAllDepartment(this.organId).then(res => {
        console.info('组织机构：', res)
        if ((res.code = 200)) {
          this.organList = res.data
        }
      })
    }
  },
  mounted() {
    let userInfo = iLocalStroage.gets('userInfo')
    console.info('userinfo:', userInfo)
    this.organId = userInfo.organId
    this.getBatch()
    this.getOrgan()
    console.info('persondata:', this.personData)
  }
}
</script>
<style lang="scss" scope src="@/assets/scss/page/catsAppraisalExamination.scss"></style>
<style>
  .extractPage .com_extract_top .el-transfer .el-checkbox-group{
    height: 100%;
  }
  .extractPage .com_extract_top .el-transfer .el-transfer-panel__body{
    height: 100%;
  }
</style>
