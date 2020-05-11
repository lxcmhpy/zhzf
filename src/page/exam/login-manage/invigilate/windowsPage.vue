<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="25%"
  >
    <el-form
      :inline="true"
      label-position="right"
      label-width="100px"
      ref="addPersonForm"
    >
    <!-- 强制收卷 -->
      <div v-if="forced">
        <el-row style="height:60px;">
          <el-form-item label="强制原因:" prop="forcedReason">
            <el-select
              v-model="forcedReason"
              placeholder
              remote
              @focus="getYear('年份','getYearList')"
              style="width:300px"
            >
              <el-option
                v-for="value in getYearList"
                :key="value.id"
                :label="value.name"
                :value="value.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row style="height:60px;">
          <el-form-item label="备注:" prop="note">
            <el-input v-model="note" type="textarea" rows style="width:300px"></el-input>
          </el-form-item>
        </el-row>
      </div>
      <!-- 延迟收卷 -->
      <div v-if="delay">
        <el-row style="height:60px;">
          <el-form-item label="延迟时间:" prop="delayTime">
            <el-select
              v-model="delayTime"
              placeholder
              remote
              @focus="getYear('年份','getYearList')"
              style="width:300px"
            >
              <el-option
                v-for="value in getYearList"
                :key="value.id"
                :label="value.name"
                :value="value.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row style="height:60px;">
          <el-form-item label="备注:" prop="note">
            <el-input v-model="note" type="textarea" rows style="width:300px"></el-input>
          </el-form-item>
        </el-row>
      </div>
      <!-- 添加记录 -->
      <div v-if="addNotes">
        <el-row style="height:60px;">
          <el-form-item label="记录类型:" prop="noteType">
            <el-select
              v-model="noteType"
              placeholder
              remote
              @focus="getYear('年份','getYearList')"
              style="width:300px"
            >
              <el-option
                v-for="value in getYearList"
                :key="value.id"
                :label="value.name"
                :value="value.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row style="height:60px;">
          <el-form-item label="发生时间:" prop="noteType">
            <el-date-picker
                v-model="appendTime"
                type="datetime"
                placeholder="选择日期时间" style="width:300px">
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row style="height:60px;">
          <el-form-item label="备注:" prop="note">
            <el-input v-model="note" type="textarea" rows style="width:300px"></el-input>
          </el-form-item>
        </el-row>
      </div>
       <!-- 重置登录 -->
      <div v-if="resete">
        <el-row style="height:60px;">
          <el-form-item label="强制原因:" prop="reviforcedReasonewYear">
            <el-select
              v-model="forcedReason"
              placeholder
              remote
              @focus="getYear('年份','getYearList')"
              style="width:300px"
            >
              <el-option
                v-for="value in getYearList"
                :key="value.id"
                :label="value.name"
                :value="value.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row style="height:60px;">
          <el-form-item label="备注:" prop="note">
            <el-input v-model="note" type="textarea" rows style="width:300px"></el-input>
          </el-form-item>
        </el-row>
      </div>
      <div class="item" style="text-align:center;margin-top:10px;">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleYear()" icon="el-icon-check">提 交</el-button>
           <el-button   @click="visible = false" icon="el-icon-close">取 消</el-button>
        </span>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      getYearList:[],
      forced:false,  //强制收卷
      delay:false,//延迟收卷
      addNotes:false,//添加记录
      resete:false,//重置登录

      delayTime:'', //延迟收卷时间qia

      forcedReason:'',//强制原因

      noteType:'',//记录类型
      appendTime:'',//发生时间
      note:'',//备注
      dialogTitle: "", //弹出框title
      handelType: 0 //添加 0  修改2
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //确认年审
    handleYear(row) {
      let _this = this;
      
      _this.$store.dispatch("approveAr", data).then(res => {
        
      });
      this.$emit("getPageInfoList");
      err => {
        console.log(err);
      };
    },
    //点击下拉框的时候后头获取下拉框强制原因数据
    getYear(name, codeName) {
      this.$store.dispatch("getYearMoudle", name).then(
        //查询执法领域
        res => {
          if (res.code === 200) {
            if (this.getYearList.size == undefined) {
              this.getYearList = [];
              if (codeName === "getYearList") {
                //this.getYearList=res.data;
                for (let i = res.data.minYear; i <= res.data.maxYear; i++) {
                  this.getYearList.push({ id: i, name: i });
                }
              }
            }
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    showModal(id, type) {
      this.forced=false,  //强制收卷
      this.delay=false,//延迟收卷
      this.addNotes=false,//添加记录
      this.resete=false,//重置登录
      this.type = type;
      this.visible = true;
      //this.handelType = type;
      if (type == "2") {
        this.dialogTitle = "强制收卷";
        this.forced = true;
        
      } else if (type == "3") {
        this.dialogTitle = "延迟收卷";
        this.delay = true;
      } else if (type == "4") {

        this.dialogTitle = "重置登录";
        this.resete = true;
      }else if(type == '5'){
          this.dialogTitle = "添加记录";
          this.addNotes = true;
      }
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
     // this.$refs["addPersonForm"].resetFields();
      this.errorName = false;
    }
  }
};
</script>

