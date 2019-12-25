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
        <div class="border_blue"></div>
        <div class="content_form">
          <el-form ref="fieldRecordObj" :model="fieldRecordObj" :rules="rules"
                   label-width="135px">
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
                  <el-input ref="CONTACTOR" clearable class="w-120"
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="rows">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="执法时间：">
                  <el-input ref="CONTACTOR" clearable class="w-120"
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="执法时间：">
                  <el-input ref="CONTACTOR" clearable class="w-120"
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="执法时间：">
                  <el-input ref="CONTACTOR" clearable class="w-120"
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="CONTACTOR" label="执法时间：">
                  <el-input ref="CONTACTOR" clearable class="w-120"
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="CONTACTOR" label="执法时间：">
                  <el-input ref="CONTACTOR" clearable class="w-120"
                            v-model="fieldRecordObj.CONTACTOR" size="small"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
              </div>
            </div>
          </el-form>

        </div>
        <div class="border_blue"></div>
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
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .box {
    width: calc(100% - 44px);
    height: auto;
    min-height: 100%;
    padding: 0 22px 0 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 6px 4px 0 rgba(94, 137, 181, 0.1);
    .header {
      width: 100%;
      height: 51px;
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
    .content_box{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
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
          /deep/ .el-form {
            width: 100%;
            /deep/.el-form-item{
              margin-bottom: 6px!important;
              /deep/.el-input__inner{
                border-radius: 2px;
              }
            }
          }
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
      }
    }

  }
  .border_blue{
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
