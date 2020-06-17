<template>
  <el-dialog
    class="add-paper-dialog"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="60%"
  >
    <div class="add-form">
      <el-row>
        <el-col :span="10" class="left-panel">
          <checkboxOutline ref="selectOutline" />
        </el-col>
        <el-col :span="14" class="right-panel">
          <el-form
            :model="addPageForm"
            label-position="right"
            label-width="100px"
            ref="addPageFormRef"
            :rules="rules"
          >
            <el-form-item label="试卷名称" prop="pageName" placeholder>
              <el-input v-model="addPageForm.pageName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="试卷类型" prop="pageType" placeholder>
              <el-radio v-model="addPageForm.pageType" label="1">正式考试卷</el-radio>
              <el-radio v-model="addPageForm.pageType" label="0">模拟练习卷</el-radio>
            </el-form-item> -->
             <el-form-item label="试卷类型" prop="pageType" placeholder>
                  <el-select
                    v-model="addPageForm.pageType"
                    placeholder="试卷类型"
                    remote
                    @focus="getDictInfo1('考试-试卷类型','pageTypeList')"
                  >
                    <el-option
                      v-for="value in pageTypeList"
                      :key="value.id"
                      :label="value.name"
                      :value="value.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
            <el-form-item label="模板选择" prop="pageTemplete" placeholder>
              <el-select
                v-model="addPageForm.pageTemplete"
                placeholder="模板选择"
                remote
                @focus="getDictInfo()"
              >
                <el-option
                  v-for="value in pageTemplateList"
                  :key="value.templeteId"
                  :label="value.templeteName"
                  :value="value.templeteId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="大纲类型" required>
              <div class="slider-panel"><el-slider v-model="value1" width="300%"></el-slider></div>
              <div class="slider-val">
                <span>部级&nbsp;&nbsp;{{ value1 }}%</span>
                <span>省级&nbsp;&nbsp;{{ 100 - value1 }}%</span>
              </div>
            </el-form-item>
            <el-form-item label="试题难度" required>
              <div class="slider-panel facility">
                <el-slider ref="facilityDom" v-model="value2" range width="300%" @input="facilityChange"></el-slider>
              </div>
              <div class="slider-val">
                <span>简单&nbsp;&nbsp;{{ value2[0] }}%</span>
                <span>一般&nbsp;&nbsp;{{ value2[1] - value2[0] }}%</span>
                <span>困难&nbsp;&nbsp;{{ 100 - value2[1] }}%</span>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div v-if="handelType!=3" slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import checkboxOutline from '@/components/examComponents/checkboxOutline'

export default {
  components: { checkboxOutline },
  data() {
    return {
      value: [],
      value1: 50,
      value2: [30, 60],
      filterText: "",
      isDisabled: true,
      visible: false,
      addPageForm: {
        ministerialOutline: '', // 部级大纲list
        provinceOutline: '', //省级大纲list
        pageTemplete: "", //pageTemplete
        pageName: "", //试卷名称
        pageType: "", //试卷类型
        ministerialProportion: 0, //省级大纲占比
        provinceProportion: 0, //部级大纲占比
        easilyProportion: 0, //容易题占比
        commonProportion: 0, //一般题占比
        difficultyProportion: 0 //困难题占比
      },
      rules: {
        pageName: [
          { required: true, message: "试卷名称不能为空", trigger: "blur" }
        ],
        pageType: [
          { required: true, message: "试卷类型不能为空", trigger: "change" }
        ],
        pageTemplete: [
          { required: true, message: "试卷模板不能为空", trigger: "change" }
        ]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2  查看3
      checkedOutlindList: [], //选中的大纲
      pageTemplateList: [], //模板列表
      pageTypeList:[],
      diffList: []
    };
  },
  created(){
    this.getExamDifficulty("考试-试题难度","levelList");
  },
  methods: {
    // 模板选择下拉选项
    getDictInfo(name, codeName) {
      this.$store.dispatch("getAllTempleteForSelected").then(res => {
        if (res.code === 200) {
          this.pageTemplateList = res.data;
        } else {
          console.info("没有查询到数据");
        }
      });
    },
      //点击下拉框的时查询试卷类型
    getDictInfo1(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(res => {
        if (res.code === 200) {
          if (codeName === "pageTypeList") {
            this.pageTypeList = res.data;
          }
        } else {
          console.info("没有查询到数据");
        }
      });
    },
    getExamDifficulty(name, codeName){
      this.$store.dispatch("findAllDrawerByName", name).then(    //查询执法领域
        res=>{
          if(res.code===200){
            this.diffList = res.data;
            this.setExamDiffId('简单');
          }else{
            console.info("没有查询到数据");
          }
        }
      );
    },
    // 困难程度滑块滑动时
    facilityChange(val){
      this.$refs.facilityDom.$el.children[0].style.background = `linear-gradient(90deg, rgba(255,187,150,1) ${val[0]}%,rgba(135,20,0,1) 0%)`;
    },
    // 试题难度拼接id
    setExamDiffId(diffName){
      const diff = this.diffList.find(item => item.name === diffName);
      let diffId = diff ? diff.id : '';
      return diffId;
    },
    //提交
    submit() {
      let _this = this;

      _this.addPageForm.provinceProportion = 100 - _this.value1; // 省级
      _this.addPageForm.ministerialProportion = _this.value1;    // 部级
      _this.addPageForm.easilyProportion = `${this.setExamDiffId('简单')},${_this.value2[0]}`;   // 简单
      _this.addPageForm.commonProportion = `${this.setExamDiffId('一般')},${_this.value2[1] - _this.value2[0]}`; // 一般
      _this.addPageForm.difficultyProportion = `${this.setExamDiffId('困难')},${100 - _this.value2[1]}`;                // 困难

      _this.addPageForm.ministerialOutline = _this.$refs.selectOutline.checkedNode['0'];  // 部级大纲
      _this.addPageForm.provinceOutline =_this.$refs.selectOutline.checkedNode['1'];    // 省级大纲
      
      if(!_this.addPageForm.ministerialOutline && !_this.addPageForm.provinceOutline){
        _this.$message({ type: 'warning', message: '请选择大纲' });
        return false;
      }
      _this.$refs.addPageFormRef.validate((valid) => {
        if (valid) {
          this.savePaper();
        } else {
          return false;
        }
      });
    },
    // 提交新增试卷
    savePaper(){
      const loading = this.$loading({
        lock: true,
        text: '试卷生成中，预计时间1~3分钟，请耐心等待',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      this.$store.dispatch("addPageManage", this.addPageForm).then(res => {
        this.$emit("getPageComp");
        this.$message({
          type: "success",
          message: "新增成功!"
        });
        loading.close();
        this.closeDialog();
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    showModal(type, row) {
      let _this = this;
      _this.visible = true;
      _this.handelType = type;
      _this.$refs.selectOutline && _this.$refs.selectOutline.resetChecked();
      if (type == 1) {
        //新增
        _this.dialogTitle = "新增试卷";
        _this.isDisabled = false;
      } else if (type == 2) {
        //修改,查看
        _this.dialogTitle = "修改";
        _this.isDisabled = false;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addPageFormRef"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
>>>.el-select{
  display: block;
}
.add-paper-dialog {
  >>> .el-dialog__body {
    padding: 0 20px;
    .left-panel {
      min-height: 510px;
      padding: 20px 20px 20px 0;
      border-right: 1px solid #d6dbe3;
    }
    .right-panel{
      padding: 40px 80px;
      .slider-panel{
        margin-top: 30px;
        .el-slider__runway{
          height: 24px;
          border-radius: 0;
          background: #096DD9;
          margin-bottom: 0;
          .el-slider__bar{
            height: 24px;
            border-radius: 0;
            background: #13C2C2;
          }
          .el-slider__button-wrapper{
            top: -28px;
          }
          .el-slider__button{
            width:15px;
            height:20px;
            background: url('../../../../../static/images/img/exam/btn_slider.png');
            border: none;
            border-radius: 0;
          }
        }
        &.facility{
          .el-slider__runway{
            background: linear-gradient(90deg, rgba(255,187,150,1) 30%,rgba(135,20,0,1) 0%);
          }
          .el-slider__bar{
            background: #FA541C;
          }
        }
      }
      .slider-val{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-weight:600;
        color:rgba(32,35,43,1);
      }
    }
  }
}
</style>
