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
        ref="pathLossSearchFormRef"
        class="pathLossSearchFormClass"
        label-width="70px"
      >
        <div>
          <div class="item">
            <el-form-item label="所属标准">
              <el-select v-model="pathLossSearchForm.roadLcBz" placeholder="请选择" @change="changeBz">
                <el-option v-for="item in allRoadLcBz" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="类型">
              <el-select v-model="pathLossSearchForm.roadLcType" placeholder="请选择" :disabled="pathLossSearchForm.roadLcBz == ''">
                <el-option
                  v-for="item in allRoadType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="路产名称" label-width="90px">
              <el-input v-model="pathLossSearchForm.roadLcName" placeholder="请输入路产名称"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-button type="primary" @click="searchPathLossBy" size="small">搜索</el-button>
          </div>
        </div>
      </el-form>
      <div>
        <el-table :data="tableData" ref="tableDataRef" stripe border @selection-change="handleSelectionChange" :row-key="getRowKey" height="300">
          <el-table-column type="selection" width="55" :selectable="canSelectable" :reserve-selection="true"></el-table-column>
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column label="路产名称" prop="roadLcName"></el-table-column>
          <el-table-column label="类型" prop="roadLcType"></el-table-column>
          <el-table-column label="单价(元)" prop="roadLcPrice"></el-table-column>
          <el-table-column label="单位" prop="roadLcUnit"></el-table-column>
          <el-table-column label="所属标准" prop="roadLcBz"></el-table-column>
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
import { queryRoadLcDeployApi } from "@/api/caseHandle";
import { getDictListDetailByNameApi } from "@/api/system";
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
      getRowKey(row) {
        return row.id
      },
      visible: false,
      pathLossSearchForm: {
        roadLcBz: "",
        roadLcType: "",
        roadLcName: ""
      },
      currentPage: 1,
      pageSize:10,
      tableData: [],
      totalPage: 0,
      // allRoadLcBz: ["高等级公路标准", "普通公路标准"],
      allRoadLcBz: [],
      allRoadType: [],
      selectRows: [],
      alreadyAddData: []
    };
  },
  inject: ["reload"],
  methods: {
    //选中
    handleSelectionChange(val) {
      // 如果当前选中的数量或单价为空，则默认为0
      this.selectRows = val.map(item => {
        if(!item.quantity) {
          item.quantity = 0
        } else if (!item.roadLcPrice) {
          item.roadLcPrice = 0
        }
        return item
      })
      console.log(val)
    },
    //确认
    selectSure() {
      this.visible = false;
      this.$emit("selectData", this.selectRows);
    },
    async showModal(alreadyAddData) {
      this.visible = true;
      this.currentPage = 1;
      this.pageSize = 10;
      this.pathLossSearchForm.roadLcBz = "";
      this.pathLossSearchForm.roadLcType = "";
      this.pathLossSearchForm.roadLcName = "";
      this.allRoadType = [];
      this.alreadyAddData = alreadyAddData;
      //查询所有的所属标准

      let data1 = await getDictListDetailByNameApi('公路路产所属标准');
      this.allRoadLcBz = data1.data;
      this.searchPathLoss();
    },
    closeDialog() {
      this.visible = false;
    },
    searchPathLossBy(){
      this.currentPage = 1;
      this.pageSize = 10;
      let data = this.pathLossSearchForm;
      // data.current = this.currentPage;
      // data.size = this.pageSize;
      this.searchPathLoss(data);
    },
    searchPathLoss(data={}) {
      this.tableData = [];
      // let data = this.pathLossSearchForm;
      data.current = this.currentPage;
      data.size = this.pageSize;
      queryRoadLcDeployApi(data)
        .then(res => {
          console.log(res);
          this.totalPage = res.data.total;
          this.tableData = res.data.records;
          //默认选中
          // this.selectAlreadyData();
          //设置禁止选择
          // this.canSelectable();

        })
        .catch(err => {
          console.log(err);
        });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      //   _this.pageSize = val;
      this.pageSize = val;
      this.currentPage = 1;
      this.searchPathLoss();
    },
    //更换页码
    handleCurrentChange(val) {
      let _this = this;
      _this.currentPage = val;
      _this.searchPathLoss();
    },
    //更改标准
    changeBz(val) {
      getDictListDetailByNameApi(val).then(
        res => {
          this.allRoadType = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //是否禁止选择
    canSelectable(row, index) {
      let canSelectableFlag = true;

      for (let index2 in this.alreadyAddData) {
          console.log('item',this.alreadyAddData[index2]);
          console.log('row',row);
        if (this.alreadyAddData[index2].id == row.id) {
          canSelectableFlag = false;
          // this.$nextTick(function(){
          //   this.$refs.tableDataRef.toggleRowSelection(row,true);
          // })
          break;
        }
      }
      return canSelectableFlag;
      // this.eviList.forEach(item=>{
      //             if(this.currentPicData.picSrc==item.evPath){
      //               console.log('选中');
      //               this.$nextTick(function(){
      //                 this.$refs.myTable.toggleRowSelection(item,true);
      //               })
      //             }
      //           })
    },
    //设置默认选中
    selectAlreadyData(){
      console.log('sadsjds')
      this.tableData.forEach(item=>{
        this.alreadyAddData.forEach(item2=>{
          if(item2.id == item.id){
            console.log('选中')
            this.$nextTick(function(){
              this.$refs.tableDataRef.toggleRowSelection(item2,true);
            })
            return;
          }
        })
      })
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.pathLossSearchFormClass > div {
  display: flex;
  .item {
    width: 30%;
  }
  .item:last-child {
    width: 10%;
    text-align: center;
    padding-top: 4px;
  }
}
</style>

