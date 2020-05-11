<template>
  <div style="height: 100%;" class="dialo">
    <el-drawer title="选择违法行为" :visible.sync="table" size="50%" class="dialog_unlaw" :before-close='closeDialog'>

      <el-form :model="illegalActSearchForm" :rules="rules" ref="illegalActSearchFormRef" class="illegalActSearchForm" label-width="70px">
        <div>
          <div class="item">
            <el-form-item label="业务领域" prop="category">
              <el-input v-model="category"  placeholder="请选择业务领域" disabled></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="行业类别" prop="hyType">
              <el-select v-model="illegalActSearchForm.hyTypeId" placeholder="请选择行业类别" @change="changehyType" clearable>
                <el-option v-for="item in industryCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="行为代码" prop="strNumber">
              <el-input v-model="illegalActSearchForm.strNumber" placeholder="请输入违法行为代码" maxlength="7"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-form-item label="违法行为" prop="strContent" style="width:100%">
            <el-input v-model="illegalActSearchForm.strContent"  placeholder="请输入违法行为关键字">
              <el-button slot="append" icon="el-icon-search" @click="getIllegaAct(true)"></el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div style="height:calc(100% - 170px);">
        <el-table :data="tableData" stripe :height="tableHeight" border highlight-current-row @row-click="selectIllegaAct">
          <el-table-column prop="strNumber" label="代码" width="180"></el-table-column>
          <el-table-column prop="strContent" label="违法行为"></el-table-column>
        </el-table>
      </div>
      <div class="paginationBox center">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    var valiDatLength = (rule, value, callback) => {
      console.log(value)
      var re = /^[0-9]{7}$/;
      if(value && !re.test(value)){
        return callback(new Error("请输入7位数字"));
      }
      callback();
    }
    return {
      visible: false,
      showcateId: false,
      table: false,
      illegalActSearchForm: {
        categoryId: "",
        hyTypeId: "",
        strNumber: "",
        strContent: ""
      },
      category: '',
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      industryCategoryList: [], //行业类别下拉框
      currentIllegaAct: "", //选中的违法行为
      tableHeight: window.innerHeight - 293,
      rules: {
        strNumber:[
          {validator:valiDatLength, trigger: "blur"}
        ],
      },
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.illegalActSearchForm.categoryId = data.cateId;
      this.illegalActSearchForm.hyTypeId = data.hyTypeId;
      this.category = data.cateName;
      this.table = true;
      this.getIndustryCategory();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.illegalActSearchForm = {
        categoryId: "",
        hyTypeId: "",
        strNumber: "",
        strContent: ""
      };
      // this.visible = false;
      this.table = false;
      this.$nextTick(() => {
        this.$refs['illegalActSearchFormRef'].resetFields()
        console.log('reset',this.illegalActSearchForm)
      })
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      console.log('11')
      this.pageSize = val;
      this.currentPage = 1;
      this.getIllegaAct();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getIllegaAct();
    },
    //获取行业类别 根据执法门类
    getIndustryCategory(){
      let _this = this
      this.$store.dispatch("getIndustryCategory",this.illegalActSearchForm.categoryId).then(
        res => {
         _this.industryCategoryList = res.data;
         _this.getIllegaAct();
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询违法行为
    getIllegaAct(validate=false){
      this.illegalActSearchForm.size = this.pageSize;
      this.illegalActSearchForm.current = this.currentPage;
      let _this = this ;
      let validatePass = false;
      if(validate){
           _this.$refs['illegalActSearchFormRef'].validate(valid => {
            if (valid) {
              validatePass = true
            }
          })
      }
      if(!validate || validatePass){
        this.$store.dispatch("getIllegaAct", this.illegalActSearchForm).then(
          res => { 
            _this.tableData = res.data.records;
            _this.totalPage = res.data.total
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    //更改行业类别
    changehyType() {
      this.currentPage = 1;
      this.getIllegaAct()
    },
    //选中违法行为并跳转到立案登记
    selectIllegaAct(val) {
      console.log(val);
      debugger
      this.currentIllegaAct = val;
      this.table = false;
      this.$emit('toCaseRegister', this.currentIllegaAct)
    }
  },
  mounted() { }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
</style>