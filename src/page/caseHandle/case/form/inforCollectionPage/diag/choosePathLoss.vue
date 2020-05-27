<template>
  <div class="dialo">
    <el-dialog
      title="添加"
      :visible.sync="visible"
      width="50%"
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <el-form
        :model="pathLossSearchForm"
        :rules="rules"
        ref="illegalActSearchFormRef"
        class="illegalActSearchForm"
        label-width="70px"
      >
        <div>
          <div class="item">
            <el-form-item label="所属标准">
              <el-input v-model="pathLossSearchForm.roadLcBz" placeholder="请选择所属标准"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="类型">
              <el-input v-model="pathLossSearchForm.roadLcType" placeholder="请输入类型"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="路产名称">
              <el-input v-model="pathLossSearchForm.roadLcName" placeholder="请输入路产名称"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-button type="primary">搜索</el-button>
          </div>
        </div>
      </el-form>
      <div>
        <el-table :data="tableData" stripe border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="strNumber" label="代码" width="180"></el-table-column>
          <el-table-column prop="strContent" label="违法行为"></el-table-column>
        </el-table>
      </div>
      <div class="paginationBox center">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="selectSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var valiDatLength = (rule, value, callback) => {
      console.log(value);
      var re = /^[0-9]{7}$/;
      if (value && !re.test(value)) {
        return callback(new Error("请输入7位数字"));
      }
      callback();
    };
    return {
      visible: false,
      pathLossSearchForm: {},
      currentPage:1,
    };
  },
  inject: ["reload"],
  methods: {
      //选中    
      handleSelectionChange(val){
          console.log(val);
      },
      //确认
      selectSure(){

      },
      showModal() {
        this.visible = true;
      },
      closeDialog(){
        this.visible = false;
      },
       //更改每页显示的条数
    handleSizeChange(val) {
      let _this = this
    //   _this.pageSize = val;
    //   this.getApprovalRecordInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      let _this = this
      _this.currentPage = val;
    //   _this.getApprovalRecordInfo();
    },
  },
  mounted() {}
};
</script>
