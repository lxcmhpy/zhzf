<template>
  <div class="box">
    <div class="header">
      <div class="header_left">
        <div class="triangle"></div>
        <div class="header_left_text">
          返回
        </div>
      </div>
    </div>
    <div class="content_box">
      <div class="content">
        <div class="content_title">
          送达回证
        </div>
        <div class="border_blue"></div>
        <div class="content_form">
          <el-form ref="fieldRecordObj" :model="fieldRecordObj" label-width="135px">
            <div class="row">
              <div class="col">
                <el-form-item label="案号：">
                  <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="案由：">
                  <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="rows">
              <div class="col">
                <el-form-item label="送达单位：">
                  <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="接收方式：">
                  <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item>
                  <el-input ref="CONTACTOR" clearable class="w-120" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>

          </el-form>

        </div>

        <div class="border_blue"></div>
        <div class="table_form">
            <el-table :data="tableDatas" stripe border style="width: 100%" height="100%">
              <el-table-column prop="name" label="送达文书名称、案号" align="center">
              </el-table-column>
              <el-table-column prop="isApproval" label="送达地点" align="center">
              </el-table-column>
              <el-table-column prop="backName" label="送达日期" align="center">
              </el-table-column>
              <el-table-column prop="isAutoPdf" label="送达方式" align="center">
              </el-table-column>
            </el-table>
        </div>

        <div class="border_blue"></div>
        <div class="content_form bottom_form">
          <el-form ref="fieldRecordObj" :model="fieldRecordObj" label-width="135px">
            <el-form-item label="处理结果：">
              <el-input type="textarea" class="height106" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="执行情况：">
              <el-input type="textarea" class="height122" v-model="fieldRecordObj.CONTACTOR" size="small" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      fieldRecordObj: {
        CONTACTOR: '',
      },
      rules: {
        CONTACTOR: [
          { required: true, message: '经办人姓名必须填写', trigger: 'blur' }
        ],
      },
      tableDatas: [{
        name: '立案',
        isApproval: '是',
        backName: '立案',
        isAutoPdf: '是',
        pdfType: '立案登记表',
        pdfType: '立案登记表',
        order: '1',
        adress: '../../jdfhu',
        discripe: '描述',
        workId: '11'
      }, {
        name: '调查类文书',
        isApproval: '否',
        backName: '调查',
        isAutoPdf: '否',
        pdfType: '',
        order: '2',
        adress: './kdsj',
        discripe: '描述',
        workId: '21',
      }],
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@import "../../../css/documentForm.less";
</style>
