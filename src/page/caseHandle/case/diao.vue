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
          现场笔录
        </div>
        <el-form ref="fieldRecordObj" :model="fieldRecordObj" :rules="rules"
                 label-width="135px">
          <div class="border_blue"></div>
          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="执法地点：">
                  <el-input ref="CONTACTOR" clearable class="w-120"
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="执法时间：">
                  <el-date-picker
                    v-model="fieldRecordObj.CONTACTOR"
                    type="daterange"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    range-separator="—"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class=""
                    clearable
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="rows">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="执法人员1：">
                  <el-select v-model="fieldRecordObj.CONTACTOR  " placeholder="请选择">
                    <el-option
                      v-for="item in personnelList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-input ref="CONTACTOR" style="display: none" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="证件号：">
                  <el-select v-model="fieldRecordObj.CONTACTOR  " placeholder="请选择">
                    <el-option
                      v-for="item in personnelList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-input ref="CONTACTOR" style="display: none" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="执法人员2：">
                  <el-select v-model="fieldRecordObj.CONTACTOR  " placeholder="请选择">
                    <el-option
                      v-for="item in personnelList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-input ref="CONTACTOR" style="display: none" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="证件号：">
                  <el-select v-model="fieldRecordObj.CONTACTOR  " placeholder="请选择">
                    <el-option
                      v-for="item in personnelList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-input ref="CONTACTOR" style="display: none" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="记录人：">
                  <el-input ref="CONTACTOR" clearable
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
              </div>
            </div>
            <div class="rows">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="姓名：">
                  <el-input ref="CONTACTOR" clearable
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="性别：">
                  <el-select v-model="fieldRecordObj.CONTACTOR  " placeholder="请选择">
                    <el-option
                      v-for="item in personnelList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-input ref="CONTACTOR" style="display: none" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="身份证号：">
                  <el-input ref="CONTACTOR" clearable
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="与案件关系：">
                  <el-select v-model="fieldRecordObj.CONTACTOR  " placeholder="请选择">
                    <el-option
                      v-for="item in personnelList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-input ref="CONTACTOR" style="display: none" v-model="fieldRecordObj.CONTACTOR"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="联系电话：">
                  <el-input ref="CONTACTOR" clearable
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="单位及职务：">
                  <el-input ref="CONTACTOR" clearable
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="联系地址：">
                  <el-input ref="CONTACTOR" clearable
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="车(船)号：">
                  <el-input ref="CONTACTOR" clearable
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="车(船)型：">
                  <el-input ref="CONTACTOR" clearable
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>

          </div>
          <div class="border_blue"></div>
          <div class="content_text">
            <div class="content_text_title">
              现场情况：（如实施行政强制措施的，包括当场告知当事人采取行政强制措施的理由、依据以及当事人依法享有的权利、救济
              途径，听取当事人陈述、申辩情况。）
            </div>
            <div class="content_text_area">
              <el-form-item prop="CONTACTOR" label="" label-width="0">
                <el-input ref="CONTACTOR" v-model="fieldRecordObj.CONTACTOR"
                          type="textarea" :resize="false"
                          :autosize="{ minRows: 3, maxRows: 6}"
                          placeholder="50个汉字以内"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_text">
            <div class="content_text_title">
              备注：
            </div>
            <div class="content_text_area">
              <el-form-item prop="CONTACTOR" label="" label-width="0">
                <el-input ref="CONTACTOR" v-model="fieldRecordObj.CONTACTOR"
                          type="textarea" :resize="false"
                          :autosize="{ minRows: 3, maxRows: 6}"
                          placeholder="50个汉字以内"></el-input>
              </el-form-item>
            </div>
          </div>

        </el-form>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        fieldRecordObj: {
          CONTACTOR: ''
        },
        rules: {
          CONTACTOR: [
            {required: true, message: '经办人姓名必须填写', trigger: 'blur'}
          ],
        },
        personnelList: [1, 2, 3]
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  div{
    flex-shrink: 0;
  }
  .box {
    width: calc(100% - 44px);
    height: auto;
    min-height: 100%;
    padding: 0 22px 65px 22px;
    margin-bottom: 65px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 6px 4px 0 rgba(94, 137, 181, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    .header {
      width: 100%;
      flex: 0 0 51px;
      border-bottom: 1px solid rgba(221, 221, 221, 1);
      .header_left {
        width: auto;
        height: 100%;
        margin-left: 23px;
        float: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        .header_left_text {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(100, 105, 116, 1);
          line-height: 51px;
          margin-left: 7px;
        }
      }
    }
    .content_box {
      width: 100%;
      flex: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      /deep/ .el-textarea {
        width: 100%;
      }
      /deep/ .el-form {
        width: 100%;
        /deep/ .el-form-item {
          margin-bottom: 10px !important;
          /deep/ .el-input__inner {
            border-radius: 2px;
          }
          /deep/ .el-form-item__error {
            padding-top: 0;
          }
        }
      }
      /deep/ .el-date-editor {
        width: 100%;
        height: 32px!important;
        line-height: 32px!important;
        /deep/ .el-range-input {
          width: 150px;
        }
        /deep/ .el-range-input {
          width: 150px;
        }
        /deep/ .el-range__icon {
          position: absolute;
          right: 10px;
          top: 0;
        }
      }
      /deep/ .el-select {
        width: 100%;
      }
      /deep/ .el-input__inner {
        padding-top: 0!important;
        padding-bottom: 0!important;
      }
      .content {
        width: 818px;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .content_title {
          flex: 0 0 25px;
          margin-top: 32px;
          margin-bottom: 23px;
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 600;
          color: rgba(32, 35, 43, 1);
          text-align: center;
          line-height: 25px;
        }
        .content_form {
          width: 794px;
          height: auto;
          padding: 28px 22px 10px 0;
          background: rgba(252, 252, 252, 1);
          border-left: 1px solid rgba(238, 238, 238, 1);
          border-right: 1px solid rgba(238, 238, 238, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          .row {
            width: 100%;
            display: flex;
          }
          .rows {
            width: 100%;
            display: flex;
            margin-top: 16px;
          }
          .col {
            flex: 1;
          }
        }
        .content_text {
          width: 774px;
          margin-top: 27px;
          margin-bottom: 34px;
          padding: 0 22px 0 22px;
          .content_text_title {
            width: 100%;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(123, 123, 123, 1);
            line-height: 20px;
          }
          .content_text_area {
            width: 100%;
            margin-top: 14px;
          }
        }
      }
    }

  }

  .border_blue {
    width: 100%;
    border-top: 10px solid rgba(69, 115, 208, 1);
  }

  .triangle {
    position: relative;
    width: 0;
    height: 0;
    border-width: 0 6px 6px;
    border-style: solid;
    border-color: transparent transparent rgba(221, 221, 221, 1);
    transform: rotate(-90deg)
  }

  .triangle:after {
    content: "";
    position: absolute;
    top: 2px;
    left: -4px;
    border-width: 0 4px 4px;
    border-style: solid;
    border-color: transparent transparent #fff;
  }


</style>
