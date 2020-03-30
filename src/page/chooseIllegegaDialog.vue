<template>
  <div style="height: 100%;" class="dialo">
    <el-drawer title="选择违法行为" :visible.sync="table" size="50%" class="dialog_unlaw" :before-close='closeDialog'>

      <el-form :model="illegalActSearchForm" ref="illegalActSearchForm" class="illegalActSearchForm" label-width="70px">
        <div>
          <div class="item">
            <el-form-item label="业务领域" prop="category">
              <el-input v-model="category" disabled></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="行业类别" prop="hyType">
              <el-select v-model="illegalActSearchForm.hyTypeId" placeholder="请选择" @change="changehyType" clearable>
                <el-option v-for="item in industryCategoryList" :key="item.id" :label="item.label" :value="item.id"></el-option>
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
      category: '',
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      industryCategoryList: [], //行业类别下拉框
      currentIllegaAct: "", //选中的违法行为
      tableHeight: window.innerHeight - 293,
      options: [
        {
          value: '0',
          label: '道路运政',
          cateId: "1002000200000000",
          children: [
            {
              value: '01',
              label: '道路旅客运输',
              id: "1002000200010000"
            },
            {
              value: '02',
              label: '道路普通货物运输',
              id: "1002000200020000"
            },
            {
              value: '03',
              label: '道路危险货物运输',
              id: "1002000200030000"
            },
            {
              value: '04',
              label: '国际道路运输',
              id: "1002000200040000"
            },
            {
              value: '05',
              label: '道路运输站（场）',
              id: "1002000200050000"
            },
            {
              value: '06',
              label: '机动车维修',
              id: "1002000200060000"
            },
            {
              value: '07',
              label: '驾驶员培训',
              id: "1002000200070000"
            },
            {
              value: '08',
              label: '道路运输从业人员',
              id: "1002000200080000"
            },
            {
              value: '09',
              label: '城市公交',
              id: "1002000200090000"
            },
            {
              value: '010',
              label: '城市轨道交通',
              id: "1002000200100000"
            },
            {
              value: '011',
              label: '出租汽车',
              id: "1002000200110000"
            },
            {
              value: '012',
              label: '汽车租赁',
              id: "1002000200120000"
            },
          ]
        },
        {
          value: '1',
          label: '公路路政',
          cateId: "1002000100000000",
          children: [
            {
              value: '11',
              label: '公路管理',
              id: "1002000100010000"
            },
            {
              value: '12',
              label: '超载超限',
              id: "1002000100020000"
            },
            {
              value: '13',
              label: '收费公路',
              id: "1002000100030000"
            },
          ]
        },
        {
          value: '2',
          label: '水路运政',
          cateId: "1002000300000000",
          children: []
        },
        {
          value: '3',
          label: '港口行政',
          cateId: "1002000500000000",
          children: [
            {
              value: '31',
              label: '港口建设'
            },
            {
              value: '32',
              label: '港口经营'
            },
            {
              value: '33',
              label: '港口危贷'
            },
          ]
        },
        {
          value: '4',
          label: '航道行政',
          cateId: "1002000400000000",
          children: []
        },
        {
          value: '5',
          label: '海事行政',
          cateId: "1002000700000000",
          children: []
        },
        {
          value: '6',
          label: '工程质量监督',
          children: []
        },
      ],
    };
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      console.log('传输数据', data)
      this.table = true;
      this.category = data.cateName;
      this.illegalActSearchForm.hyTypeId = data.hyTypeId;

      // this.visible = true;
      this.options.forEach(element => {
        console.log(element.label)
        if (this.category == element.label) {
          this.industryCategoryList = element.children
          console.log('this.commonOptions', this.commonOptions)
        }
      });
      // this.getIndustryCategory();
      this.getIllegaAct();

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
    //获取行业类别 根据业务领域
    // getIndustryCategory() {

    //   let _this = this
    //   this.$store.dispatch("getIndustryCategory", this.categoryId).then(
    //     res => {
    //       _this.industryCategoryList = res.data;
    //       console.log('下拉框', _this.industryCategoryList)
    //       _this.getIllegaAct();
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // },
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