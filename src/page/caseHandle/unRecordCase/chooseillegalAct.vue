<template>
  <el-dialog
    title="选择违法行为"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="40%"
    append-to-body
  >
    <div>
      <el-form
        :model="illegalActSearchForm"
        ref="illegalActSearchForm"
        class="illegalActSearchForm"
        label-width="70px"
      >
        <div>
          <div class="item">
            <el-input v-model="illegalActSearchForm.categoryId" v-if="showcateId"></el-input>
            <el-form-item label="执法门类">
              <el-input v-model="cateName" disabled></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="行业类别">
              <el-select v-model="illegalActSearchForm.hyTypeId" placeholder="请选择" @change="changehyType">
              <el-option
                v-for="item in industryCategoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="行为代码">
              <el-input v-model="illegalActSearchForm.strNumber"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="违法行为">
              <el-input v-model="illegalActSearchForm.strContent"></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-button type="primary" @click="getIllegaAct">确 定</el-button>
          </div>
        </div>
      </el-form>
      <el-table :data="tableData" height="250" border style="width: 100%" highlight-current-row
    @current-change="selectIllegaAct">
        <el-table-column prop="strNumber" label="代码" width="180"></el-table-column>
        <el-table-column prop="strContent" label="违法行为"></el-table-column>
      </el-table>
      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next"
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="backCaseRegister">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      showcateId:false,
      illegalActSearchForm: {
        categoryId:"",
        hyTypeId:"",
        strNumber:"",
        strContent:""
      },
      cateName:"", //执法门类名称
      tableData:[],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      industryCategoryList:[], //行业类别下拉框
      currentIllegaAct:"", //选中的违法行为
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      console.log(data)
      this.illegalActSearchForm.categoryId = data.cateId;
      this.cateName = data.cateName;
      console.log(this.cateName)
      this.visible = true;
      this.getIndustryCategory();

    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
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
    getIndustryCategory(){

      this.$store.dispatch("getIndustryCategory",this.illegalActSearchForm.categoryId).then(
        res => {
         this.industryCategoryList = res.data;
         this.getIllegaAct();
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询违法行为
    getIllegaAct(){
      this.illegalActSearchForm.size = this.pageSize;
      this.illegalActSearchForm.current = this.currentPage;
      this.$store.dispatch("getIllegaAct",this.illegalActSearchForm).then(
        res => {
         this.tableData = res.data.records;
         this.totalPage=res.data.total
        },
        err => {
          console.log(err);
        }
      );
    },
    //更改行业类别
    changehyType(){
      this.getIllegaAct()
    },
    //选中违法行为
    selectIllegaAct(val){
      console.log(val);
      this.currentIllegaAct = val;
    },
    //返回立案登记
    backCaseRegister() {
      this.visible = false;
      this.$emit('setIllegaAct',this.currentIllegaAct)
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/index.scss";
</style>
