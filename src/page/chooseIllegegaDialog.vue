<template>
  <div style="height: 100%;" class="dialo">
    <el-drawer title="选择违法行为" :visible.sync="table" size="50%" class="dialog_unlaw" :before-close='closeDialog'>

      <el-form :model="illegalActSearchForm" ref="illegalActSearchForm" class="illegalActSearchForm" label-width="70px">
        <div>
          <div class="item">
            <el-form-item label="执法门类" prop="category">
              <el-input v-model="category" disabled></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="行业类别" prop="hyType">
              <el-select v-model="illegalActSearchForm.hyTypeId" placeholder="请选择" @change="changehyType" clearable>
                <el-option v-for="item in industryCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="行为代码" prop="strNumber">
              <el-input v-model="illegalActSearchForm.strNumber" placeholder="请输入违法性代码"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <!-- <div class="item"> -->
          <el-form-item label="违法行为" prop="strContent" style="width:100%">
            <el-input v-model="illegalActSearchForm.strContent">
              <el-button slot="append" icon="el-icon-search" @click="getIllegaAct"></el-button>
            </el-input>
          </el-form-item>
          <!-- </div> -->
          <!-- <div class="itemSmall">
            <el-button type="primary" @click="getIllegaAct">查 询</el-button>
          </div> -->
        </div>
      </el-form>
      <div style="height:calc(100% - 170px);">
        <el-table :data="tableData" stripe :height="tableHeight" border highlight-current-row @current-change="selectIllegaAct">
          <el-table-column prop="strNumber" label="代码" width="180"></el-table-column>
          <el-table-column prop="strContent" label="违法行为"></el-table-column>
        </el-table>
      </div>
      <div class="paginationBox center">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
    </el-drawer>
  </div>
  <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="backCaseRegister">确 定</el-button>
    </span> -->
  <!-- </el-dialog> -->
</template>
<script>
export default {
  data() {
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
      category:'',
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      industryCategoryList: [], //行业类别下拉框
      currentIllegaAct: "", //选中的违法行为
      tableHeight: window.innerHeight - 293
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      console.log('传输数据', data)
      this.table = true;
      this.category = data.cateName;

      // this.visible = true;
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
        this.$refs['illegalActSearchForm'].resetFields()
      })
    },
    //更改每页显示的条数
    handleSizeChange(val) {
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
    getIndustryCategory() {

      let _this = this
      this.$store.dispatch("getIndustryCategory", this.categoryId).then(
        res => {
          _this.industryCategoryList = res.data;
          console.log('下拉框',_this.industryCategoryList)
          _this.getIllegaAct();
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询违法行为
    getIllegaAct() {

      this.illegalActSearchForm.size = this.pageSize;
      this.illegalActSearchForm.current = this.currentPage;
      // this.categoryId  = 1002000300000000;
      // this.category  = '';
      if (this.category == '水路运政') {
        this.illegalActSearchForm.categoryId = 1002000300000000
      }
      if (this.category == '公路路政') {
        this.illegalActSearchForm.categoryId = 1002000100000000
      }
      if (this.category == '道路运政') {
        this.illegalActSearchForm.categoryId = 1002000200000000
      }

      let _this = this
      this.$store.dispatch("getIllegaAct", this.illegalActSearchForm).then(
        res => {
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total
        },
        err => {
          console.log(err);
        }
      );
    },
    //更改行业类别
    changehyType() {
      console.log(this.illegalActSearchForm.hyType)
      this.getIllegaAct()
    },
    //选中违法行为
    selectIllegaAct(val) {
      console.log(val);
      this.currentIllegaAct = val;
    },
    //返回立案登记
    backCaseRegister() {
      this.visible = false;
      this.$emit('setIllegaAct', this.currentIllegaAct)
    }
  },
  mounted() { }
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/index.scss";
</style>