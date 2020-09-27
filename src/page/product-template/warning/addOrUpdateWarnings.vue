<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="80%">
    <el-form :model="addOrUpdateForm" :rules="rules" ref="addOrUpdateForm" label-width="120px">

      <el-form-item label="预警名称" prop="warName">
        <el-input v-model="addOrUpdateForm.warName"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="8">
          <el-form-item label="预警类型" prop="warType">
            <el-select v-model="addOrUpdateForm.warType" placeholder="请选择">
              <el-option v-for="item in warnTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任务类型" prop="taskType">
            <el-select v-model="addOrUpdateForm.taskType" placeholder="请选择">
              <el-option v-for="item in taskTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-row>
            <!-- cycleTime 1_天 -->
            <!-- <el-form-item label="循环时间" prop="cycleTime1">
              <el-col :span="12">
                <el-input v-model="addOrUpdateForm.cycleTime1" placeholder="请输入"></el-input>
              </el-col>
              <el-col :span="12">
                <el-select v-model="addOrUpdateForm.cycleTime2" placeholder="请选择单位">
                  <el-option v-for="item in timeList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
            </el-form-item> -->
          </el-row>
        </el-col>
      </el-row>
      <el-form-item label="配置类型" prop="configType">
        <el-radio v-model="addOrUpdateForm.configType" label="0">文书配置</el-radio>
        <el-radio v-model="addOrUpdateForm.configType" label="1">环节配置</el-radio>
      </el-form-item>
      <div class="random-table-title">开启预警条件</div>
      <el-row v-for="(item,index) in addList" :key="index">
        <el-col :span="5">
          <el-form-item label="分项指标" v-if="addOrUpdateForm.configType!='1'">
            <el-select v-model="item.type" placeholder="请选择" @change="changeType(item.type,index)">
              <el-option v-for="item in bindPdfList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分项指标" v-else>
            <el-select v-model="item.type" placeholder="请选择">
              <el-option v-for="item in bindPdfFieldList" :key="item.id" :label="item.linkName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" v-if="addOrUpdateForm.configType!='1'">
          <el-form-item label="指标项" label-width="80px">
            <el-select v-model="item.indexInfo" placeholder="请选择">
              <el-option v-for="item in pdfFieldList[index]" :key="item.id" :label="item.itemValue" :value="item.bindProperty"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="条件" label-width="60px">
            <el-select v-model="item.condition" placeholder="请选择">
              <el-option v-for="item in standerList" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="值" label-width="60px">
            <el-input v-model="item.val"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="提醒内容" label-width="90px">
            <el-input type="textarea" :rows="1" v-model="item.tipContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" v-if="index==0">
          <el-form-item label-width="2px">
            <el-button style="vertical-align: bottom;height:33px;" size="medium" type="primary" @click="addTargetMethod">添加</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="1" v-else>
          <el-form-item label-width="2px">
            <el-button style="vertical-align: bottom;height:33px;width:58px" size="medium" icon="el-icon-delete" @click="delTargetMethod(index)"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="是否启用" prop="status">
        <el-radio-group v-model="addOrUpdateForm.status">
          <!-- <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio> -->
          <el-radio label="1">启用</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitWarn('addOrUpdateForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addWarInfoLlistApi, findWarInfoByIdApi } from "@/api/caseHandle";
import { getDictListDetailByNameApi, } from "@/api/system";
import { getAllPdfListApi, findSetListApi, saveOrUpdatePropertyApi, findAllSetListApi, getQueryLinkListApi, delBindApi } from '@/api/caseHandle.js'
export default {
  data() {
    return {
      visible: false,
      addOrUpdateForm: {
        warName: "",
        cycleTime: "",
        cycleTime2: "",
        cycleTime1: "",
        warType: "",
        taskType: "",
        configType: "",
        status: "",
      },
      rules: {
        warName: [{ required: true, message: "必填项", trigger: "change" }],
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
      editRouteId: '',
      bindPdfFieldList: [], //分项指标列表
      pdfFieldList: [], //指标项列表
      // levelList: ['立案登记表', '案件处罚决定书', '询问笔录'], //分项指标列表
      bindPdfList: [],//指标项列表
      // gradeList: [],//指标项列表
      standerList: [],//条件列表
      timeList: ['时', '分', '秒', '天'],
      taskTypeList: [{ label: '定时任务', value: '1' }],
      warnTypeList: [{ label: '提醒', value: '3' }, { label: '预警', value: '2' }, { label: '报警', value: '1' }],
      addList: [{}]
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      let _this = this;
      this.visible = true;
      this.handelType = type;
      this.getFormList();
      this.getPdfList();
      if (type == 0) {
        this.dialogTitle = "添加预警信息";
        this.$nextTick(() => {
          this.$refs["addOrUpdateForm"].resetFields();
          console.log('sadsdsf', this.$refs["addOrUpdateForm"].resetFields())
        })
      } else if (type == 2) {
        console.log(data);
        findWarInfoByIdApi(data.id).then(
          res => {
            if (res.code == 200) {
              _this.dialogTitle = "预警信息维护";
              _this.addOrUpdateForm = res.data;
              if (this.addOrUpdateForm.cycleTime != null) {
                let cycleTimeList = this.addOrUpdateForm.cycleTime.split('_')
                this.$set(_this.addOrUpdateForm, 'cycleTime2', cycleTimeList[1])
                this.$set(_this.addOrUpdateForm, 'cycleTime1', cycleTimeList[0])
                // _this.addOrUpdateForm.cycleTime2 == cycleTimeList[1]
                // _this.addOrUpdateForm.cycleTime1 == cycleTimeList[0]
              }
              _this.addList = res.data.sysWarInfoVoList
              if (_this.addOrUpdateForm.configType == 0) {
                _this.addList.forEach((element, index) => {
                  _this.changeType(element.type, index)
                });
              }
              _this.visible = true;
            }
          },
        )
      }
      // 获取抽屉
      this.getDrawerList([
        { name: '预警信息-条件', option: 1 },
        { name: '人员信息-政治面貌', option: 4 }])
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["addOrUpdateForm"].resetFields();
      this.addList = [{}]
      this.addOrUpdateForm.cycleTime2 = ''
      this.addOrUpdateForm.cycleTime1 = ''
      console.log('111', this.$refs["addOrUpdateForm"].resetFields());
      this.visible = false;
    },
    //新增案件类型 修改案件类型
    submitWarn(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.addOrUpdateForm.warInformation = JSON.stringify(_this.addList) || ''
          _this.addOrUpdateForm.cycleTime = _this.addOrUpdateForm.cycleTime1 + '_' + _this.addOrUpdateForm.cycleTime2
          console.log('add', _this.addOrUpdateForm)
          addWarInfoLlistApi(_this.addOrUpdateForm).then(
            res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                _this.reload();
                this.visible = false;
              }
            },
          )

        }
      });
    },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1: _this.standerList = res.data; break;//条件
              case 4: _this.optionsZZMM = res.data; break;//政治面貌
            }
          },

          error => {
            // reject(error);
          })
      });

    },
    addTargetMethod() {
      this.addList.push({})
    },
    delTargetMethod(index) {
      this.addList.splice(index, 1)
    },
    // 表单抽屉表
    getFormList() {
      let data = {}
      getQueryLinkListApi(data).then(
        res => {
          console.log('抽屉表', res)
          this.pdfAndFormList = res.data
          this.bindPdfFieldList = res.data
        });
    },
    //  文书抽屉表 
    getPdfList() {
      let data = {
        size: 100
      }
      getAllPdfListApi(data).then(res => {
        if (res.code == 200) {
          console.log('文书抽屉表', res)
          // this.pdfAndFormList = res.data.records
          this.bindPdfList = res.data.records
        } else {
          console.log("fail");
        }
      });
    },
    changeType(typeId, index) {
      let _this = this
      let data = {
        typeId: typeId,
        itemValue:'时间'
      }
      findAllSetListApi(data).then(
        res => {
          if (res.code == 200) {
            _this.pdfFieldList.splice(index, 0, res.data)
          }
        });
    }
  },
  mounted() {
  }
};

</script>
<style lang="scss" src="@/assets/css/card.scss"></style>