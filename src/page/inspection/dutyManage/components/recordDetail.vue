<template>
  <div class="inspect-record-detail">
    <el-row :gutter="20" type="flex">
      <el-col :span="17">
        <el-card shadow="never">
          <el-form
            :model="inspectRecordForm"
            :rules="rules"
            label-position="right"
            label-width="120px"
            ref="inspectRecordFormRef"
            class="inspect-record-from"
          >
            <h3 class="form-tab-title">基本信息</h3>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="巡查时间" prop="inspectionTime">
                  <el-date-picker
                    v-model="inspectRecordForm.inspectionTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查门类" prop="category">
                  <el-select v-model="inspectRecordForm.category" placeholder="请选择">
                    <el-option label="公路巡查" value="1"></el-option>
                    <el-option label="服务去巡查" value="2"></el-option>
                    <el-option label="其他" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查类型" prop="checkType">
                  <el-select v-model="inspectRecordForm.checkType" placeholder="请选择">
                    <el-option label="安全检查" value="1"></el-option>
                    <el-option label="日常巡查" value="2"></el-option>
                    <el-option label="整改督办" value="3"></el-option>
                    <el-option label="其他" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="填报地点" prop="filingPlace">
                  <el-input v-model="inspectRecordForm.filingPlace" placeholder="请输入">
                    <i slot="suffix" class="el-icon-location-outline"></i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执法人员" prop="lawOfficials">
                  <el-input v-model="inspectRecordForm.lawOfficials" placeholder="请输入">
                    <template slot="append">
                      <el-button type="text">查验</el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <h3 class="form-tab-title">检查内容</h3>
              <el-col :span="12">
                <el-form-item label="路段情况" prop="roadSituation">
                  <el-select v-model="inspectRecordForm.roadSituation" placeholder="请选择">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="异常" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路线编号" prop="roadNumber">
                  <el-select v-model="inspectRecordForm.roadNumber" placeholder="请选择">
                    <el-option label="S10" value="1"></el-option>
                    <el-option label="S20" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路段名称" prop="roadName">
                  <el-select v-model="inspectRecordForm.roadName" placeholder="请选择">
                    <el-option label="路段1" value="1"></el-option>
                    <el-option label="路段2" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="行驶方向" prop="travelDirection">
                  <el-select v-model="inspectRecordForm.travelDirection" placeholder="请选择">
                    <el-option label="上行" value="1"></el-option>
                    <el-option label="下行" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="路段信息" prop="roadInfo" class="road-info-input">
                  <el-input v-model="inspectRecordForm.startKm" placeholder="请输入">
                    <i slot="prefix" class="input-tips">K</i>
                  </el-input>
                  <span class="road-info-join">+</span>
                  <el-input v-model="inspectRecordForm.startMm" placeholder="请输入">
                    <i slot="suffix" class="input-tips">M</i>
                  </el-input>
                  <span class="road-info-split">至</span>
                  <el-input v-model="inspectRecordForm.endKm" placeholder="请输入">
                    <i slot="prefix" class="input-tips">K</i>
                  </el-input>
                  <span class="road-info-join">+</span>
                  <el-input v-model="inspectRecordForm.endMm" placeholder="请输入">
                    <i slot="suffix" class="input-tips">M</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <!-- 路段信息正常时显示 -->
              <el-col v-if="inspectRecordForm.roadSituation === '1'" :span="24">
                <el-form-item label="问题摘要" prop="problemAbstract" class="problem-abstract-panel">
                  <div class="abstract-top-handle">
                    <el-select v-model="inspectRecordForm.abstractTemplate" placeholder="模板选择">
                      <el-option label="模板1" value="1"></el-option>
                      <el-option label="模板2" value="2"></el-option>
                    </el-select>
                    <el-button type="text">自动生成</el-button>
                  </div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="inspectRecordForm.problemAbstract"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 路段信息为异常时显示 -->
            <el-row class="abnormal-situation-info">
              <h4 class="abnormal-title">异常情况1</h4>
              <el-col :span="12">
                <el-form-item label="一级分类" prop="roadSituation">
                  <el-select v-model="inspectRecordForm.roadSituation" placeholder="请选择">
                    <el-option label="路产情况" value="1"></el-option>
                    <el-option label="路面情况" value="2"></el-option>
                    <el-option label="建筑控制区情况" value="3"></el-option>
                    <el-option label="其他" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="二级分类" prop="roadNumber">
                  <el-select v-model="inspectRecordForm.roadNumber" placeholder="请选择">
                    <el-option label="二级分类1" value="1"></el-option>
                    <el-option label="二级分类2" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 三级分类根据分级配置判断是否显示 -->
              <el-col v-if="false" :span="12">
                <el-form-item label="三级分类" prop="roadName">
                  <el-select v-model="inspectRecordForm.roadName" placeholder="请选择">
                    <el-option label="三级分类1" value="1"></el-option>
                    <el-option label="三级分类2" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理情况" prop="travelDirection">
                  <el-select v-model="inspectRecordForm.travelDirection" placeholder="请选择">
                    <el-option label="现场处理" value="1"></el-option>
                    <el-option label="电话通知" value="2"></el-option>
                    <el-option label="信息推送" value="3"></el-option>
                    <el-option label="送达处理" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理方式" prop="travelDirection">
                  <el-select v-model="inspectRecordForm.travelDirection" placeholder="请选择">
                    <el-option label="方式1" value="1"></el-option>
                    <el-option label="方式2" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理结果" prop="travelDirection">
                  <el-select v-model="inspectRecordForm.travelDirection" placeholder="请选择">
                    <el-option label="处理完成" value="1"></el-option>
                    <el-option label="处理中" value="2"></el-option>
                    <el-option label="待处理" value="3"></el-option>
                    <el-option label="立案" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否立案" prop="travelDirection">
                  <el-select v-model="inspectRecordForm.travelDirection" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="inspectRecordForm.roadSituation === '1'" :span="24">
                <el-form-item label="问题摘要" prop="problemAbstract" class="problem-abstract-panel">
                  <div class="abstract-top-handle">
                    <el-select v-model="inspectRecordForm.abstractTemplate" placeholder="模板选择">
                      <el-option label="模板1" value="1"></el-option>
                      <el-option label="模板2" value="2"></el-option>
                    </el-select>
                    <el-button type="text">自动生成</el-button>
                  </div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="inspectRecordForm.problemAbstract"
                  ></el-input>
                </el-form-item>
              </el-col>
              <template>
                <el-col :span="12">
                  <el-form-item label="程序类型" prop="travelDirection">
                    <el-select v-model="inspectRecordForm.travelDirection" placeholder="请选择">
                      <el-option label="一般程序" value="1"></el-option>
                      <el-option label="简易程序" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="案件类型" prop="travelDirection">
                    <el-select v-model="inspectRecordForm.travelDirection" placeholder="请选择">
                      <el-option label="处罚" value="1"></el-option>
                      <el-option label="赔补偿" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="违法行为" prop="travelDirection">
                    <el-input v-model="inspectRecordForm.travelDirection"></el-input>
                  </el-form-item>
                </el-col>
              </template>
            </el-row>
            <div class="abnormal-add-btn">
              <el-button type="primary" icon="el-icon-plus" size="medium">新增</el-button>
            </div>
          </el-form>
        </el-card>
        <el-card shadow="never" style="margin-top: 20px;">
          <div class="enclosure-file-table">
            <h3 class="form-tab-title">
              附件信息
              <el-button type="text" class="add-enclosure-file" @click="addEnclosure('type')">
                <i class="add-file-type-icon">+</i>添加
              </el-button>
            </h3>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div v-if="scope.row.files && scope.row.files.length">
                    <ul v-for="file in scope.row.files" :key="file.id" class="file-children-table">
                      <li style="width: 60px;">{{ file.index }}</li>
                      <li style="width: calc(100% - 220px);color: #7b7b7b;">{{ file.name }}</li>
                      <li style="width: 160px;">
                        <el-button type="text">查看</el-button>
                        <el-button type="text">下载</el-button>
                        <el-button type="text">删除</el-button>
                      </li>
                    </ul>
                  </div>
                  <div v-else class="no-enclose-file">暂无数据</div>
                </template>
              </el-table-column>
              <el-table-column label="序号" prop="index" width="60px" align="center"></el-table-column>
              <el-table-column label="材料名称" prop="materialName" align="center"></el-table-column>
              <el-table-column label="操作" width="160px" fixed="right" align="center">
                <el-button type="text" @click="addEnclosure('file')">添加</el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="never" style="height: 100%;">文书列表</el-card>
      </el-col>
    </el-row>
    <!-- 添加附件 -->
    <AddRecordFile ref="AddRecordFileRef" />
  </div>
</template>

<script>
import AddRecordFile from "@/page/inspection/dutyManage/components/addRecordFile.vue";

export default {
  components: { AddRecordFile },
  data() {
    return {
      inspectRecordForm: {
        inspectionTime: "",
        category: "",
        checkType: "",
        roadSituation: "1",
      },
      rules: {
        inspectionTime: [
          { required: true, message: "巡查时间不能为空", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择检查门类", trigger: "change" },
        ],
        checkType: [
          { required: true, message: "请选择检查类型", trigger: "change" },
        ],
        roadSituation: [
          { required: true, message: "请选择路段情况", trigger: "change" },
        ],
      },
      tipsUrl: "@/../static/images/img/personInfo/form_item_tips.svg",
      tableData: [
        {
          id: "1",
          index: "1",
          materialName: "图像",
          files: [
            { id: "1", index: "1.1", name: "现场图片1" },
            { id: "2", index: "1.2", name: "现场图片2" },
            { id: "3", index: "1.3", name: "现场图片3" },
          ],
        },
        {
          id: "2",
          index: "2",
          materialName: "音频",
          files: [],
        },
        {
          id: "3",
          index: "3",
          materialName: "视频",
          files: [],
        },
      ],
    };
  },
  computed: {
    PageType() {
      return this.$route.params.page;
    },
  },
  created() {
    console.log(this.PageType);
  },
  methods: {
    // 添加附件
    addEnclosure(type) {
      this.$refs.AddRecordFileRef.showModal(type);
    },
  },
};
</script>

<style lang="scss" scoped>
.inspect-record-detail {
  position: relative;
  padding: 20px;
  .inspect-record-from {
    >>> .el-select {
      display: block;
    }
    >>> .el-date-editor {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      padding-top: 0;
    }
    >>> .el-date-editor.el-input,
    >>> .el-date-editor.el-input__inner {
      width: 100%;
    }
    .device-form-item-tips {
      display: inline-block;
      position: absolute;
      width: 30px;
      height: 30px;
      top: 4px;
      right: -40px;
      cursor: pointer;
    }
    .abnormal-situation-info {
      padding: 30px 20px;
      margin: 0 -20px;
      background: #f6f8fc;
      border-bottom: 1px dashed #979797;
      .abnormal-title {
        font-size: 14px;
        font-weight: 600;
        color: #e84241;
        line-height: 38px;
        padding-left: 30px;
      }
    }
    .abnormal-add-btn{
      padding: 30px 20px;
      margin: 0 -20px -20px;
      background: #f6f8fc;
      text-align: center;
    }
  }
  .road-info-input {
    >>> .el-input {
      width: 21%;
    }
    .input-tips {
      font-style: inherit;
      font-weight: bold;
      color: #20232b;
    }
    .road-info-join,
    .road-info-split {
      display: inline-block;
      font-size: 24px;
      font-weight: 600;
      color: #7b7b7b;
      line-height: 32px;
      text-align: center;
      width: 3%;
    }
    .road-info-split {
      font-size: 14px;
      color: #7b7b7b;
      width: 7%;
    }
  }
  .problem-abstract-panel {
    position: relative;
    .abstract-top-handle {
      height: 24px;
      line-height: 24px;
      background: #ecf1fa;
      text-align: right;
      padding-right: 20px;
      position: absolute;
      z-index: 100;
      right: 1px;
      left: 1px;
      top: 1px;
    }
    >>> .el-select {
      display: inline-block;
      width: 108px;
      line-height: 24px;
      .el-input__inner {
        border: none;
        background: none;
        height: 24px;
      }
      .el-input__icon {
        line-height: 24px;
      }
    }
    >>> .el-button {
      padding: 0 15px;
    }
    >>> .el-textarea__inner {
      padding-top: 30px;
    }
  }
  .form-tab-title {
    font-size: 18px;
    font-weight: bold;
    color: #20232b;
    padding-left: 10px;
    margin-bottom: 18px;
    border-left: 4px solid #4573d0;
  }
  .enclosure-file-table {
    padding-bottom: 30px;
    .add-enclosure-file {
      padding: 0 16px;
      float: right;
      .add-file-type-icon {
        display: inline-block;
        width: 15px;
        height: 15px;
        line-height: 15px;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        background: #4573d0;
        color: #fff;
        margin-right: 6px;
      }
    }
    .file-children-table {
      padding-left: 48px;
      height: 40px;
      line-height: 40px;
      > li {
        text-align: center;
        float: left;
      }
    }
    .no-enclose-file {
      width: 96%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #7b7b7b;
    }
  }
}
</style>
<style lang="scss">
.form-tips-popper.el-popover {
  background: #303133;
  color: #fff;
  .popper__arrow::after {
    border-top-color: #303133;
  }
}
</style>