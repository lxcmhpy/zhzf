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
            <el-form-item label="执法门类">
              <el-input v-model="illegalActSearchForm.cateId"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="行业类别">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="行为代码">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="itemBig">
            <el-form-item label="行为代码">
              <el-input></el-input>
            </el-form-item>
          </div>
          <div class="itemSmall">
            <el-button type="primary" @click="getIllegaAct">确 定</el-button>
          </div>
        </div>
      </el-form>
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column prop="name" label="代码" width="180"></el-table-column>
        <el-table-column prop="address" label="违法行为"></el-table-column>
      </el-table>
      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
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
      illegalActSearchForm: {
        cateId:"",
      },
      tableData:[],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
    };
  },
  inject: ["reload"],
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      // this.getSelectOrgan();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.getSelectOrgan();
    },
    //获取行业类别 根据执法门类
    getIndustryCategory(){
      this.$store.dispatch("getIndustryCategory","1").then(
        res => {
         
        },
        err => {
          console.log(err);
        }
      );
    },
    //查询违法行为
    getIllegaAct(){
      this.$store.dispatch("getIllegaAct","1").then(
        res => {
         
        },
        err => {
          console.log(err);
        }
      );
    },
    //返回立案登记
    backCaseRegister() {
      this.visible = false;
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@import "../../../css/caseHandle/index.less";
</style>
