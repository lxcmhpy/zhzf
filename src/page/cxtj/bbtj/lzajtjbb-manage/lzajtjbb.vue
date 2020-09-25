<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <el-row>
        <el-col :span="6">
          <div>
            <el-tree
              :data="organData"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="organTree"
              highlight-current
            ></el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">

          <el-form-item label="起始年月" prop>
            <el-date-picker
              v-model="value1"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </el-form-item>
          
          <el-form-item label=" " label-width="13px">
            <el-button size="medium" icon="iconfont law-sousuo" @click="select()">查询</el-button>
          </el-form-item>

          <el-form-item label=" " label-width="13px">
                        <el-button size="medium" icon="el-icon-setting" v-popover:popover4  @click="lineSelect()">列过滤</el-button>
          </el-form-item>

        </el-form>
      </div>
       <div class="tablePart">
         <el-popover
          ref="popover4"
          placement="right"
          width="200"
          trigger="click">
          <el-checkbox-group v-model="checkboxVal" v-show="showSelect">
            <el-checkbox label="新增案件量" style="display:block;">
              新增案件量
            </el-checkbox>
            <el-checkbox label="总案件量" style="display:block;">
              总案件量
            </el-checkbox>
            <el-checkbox label="公路" style="display:block;">
              公路
            </el-checkbox>
            <el-checkbox label="道路" style="display:block;">
              道路
            </el-checkbox>
            <el-checkbox label="水路" style="display:block;">
              水路
            </el-checkbox>
            <el-checkbox label="航道" style="display:block;">
              航道
            </el-checkbox>
            <el-checkbox label="港口" style="display:block;">
              港口
            </el-checkbox>
            <el-checkbox label="质监" style="display:block;">
              质监
            </el-checkbox>
            <el-checkbox label="海事" style="display:block;">
              海事
            </el-checkbox>
            <el-checkbox label="综合执法" style="display:block;">
              综合执法
            </el-checkbox>
            <el-checkbox label="其他" style="display:block;">
              其他
            </el-checkbox>
            <el-checkbox label="总结案量" style="display:block;">
              总结案量
            </el-checkbox>
            <el-checkbox label="结案率" style="display:block;">
              结案率
            </el-checkbox>
          </el-checkbox-group>
          </el-popover>
    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="jgmc" label="机构名称" width="180" />
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
        <!-- <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="jgmc" label="机构名称" align="center"></el-table-column>
          <el-table-column prop="xzajl" label="新增案件量" align="center"></el-table-column>
          <el-table-column prop="zajl" label="总案件量" align="center"></el-table-column>
          <el-table-column prop="gl" label="公路" align="center"></el-table-column>
          <el-table-column prop="dl" label="道路" align="center"></el-table-column>
          <el-table-column prop="sl" label="水路" align="center"></el-table-column>
          <el-table-column prop="hd" label="航道" align="center"></el-table-column>
          <el-table-column prop="gk" label="港口" align="center"></el-table-column>
          <el-table-column prop="zj" label="质监" align="center"></el-table-column>
          <el-table-column prop="hs" label="海事" align="center"></el-table-column>
          <el-table-column prop="zhzf" label="综合执法" align="center"></el-table-column>
          <el-table-column prop="qt" label="其他" align="center"></el-table-column>
          <el-table-column prop="zjal" label="总结案量" align="center"></el-table-column>
          <el-table-column prop="jal" label="结案率" align="center"></el-table-column>
        </el-table> -->
      </div>
        </el-col>
      </el-row>
    

      
    </div>
  </div>
</template>


<script>
// import bindOrgan from "../../../sys/role-manage/bindOrgan";
const defaultFormThead = ['新增案件量', '总案件量',
// '公路', '道路',
// '水路', '航道','港口', '质监','海事', '综合执法',
'其他','总结案量','结案率']
export default {
  data() {
    return {
      key: 1, // table key
      formTheadOptions: ['新增案件量', '总案件量','公路', '道路',
'水路', '航道','港口', '质监','海事', '综合执法','其他','总结案量','结案率'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead, // 默认表头
      value3: "",
      value2: "",
      value1: "",
      showSelect:false,
      checked: true,
      currentPage: 1, //当前页
       organData: [],
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      tableData: [
        {
          jgmc: "南昌市交通运输局",
          新增案件量:'0',
          总案件量:'31',
          公路:'0',
          道路:'13',
          水路:'1',
          航道:'2',
          港口:'0',
          质监:'0',
          海事:'15',
          综合执法:'0',
          其他:'0',
          总结案量:'18',
          结案率:'58.06%',

        },
        {
          jgmc: "景德镇市交通运输局",
          新增案件量:'0',
          总案件量:'104',
          公路:'13',
          道路:'82',
          水路:'0',
          航道:'0',
          港口:'0',
          质监:'0',
          海事:'9',
          综合执法:'0',
          其他:'0',
          总结案量:'88',
          结案率:'84.62%',

        },
        {
          jgmc: "萍乡市交通运输局",
          新增案件量:'0',
          总案件量:'53',
          公路:'49',
          道路:'4',
          水路:'0',
          航道:'0',
          港口:'0',
          质监:'0',
          海事:'0',
          综合执法:'0',
          其他:'0',
          总结案量:'49',
          结案率:'92.45%',

        },
        {
          jgmc: "九江市交通运输局",
          新增案件量:'0',
          总案件量:'28',
          公路:'24',
          道路:'4',
          水路:'1',
          航道:'2',
          港口:'0',
          质监:'0',
          海事:'0',
          综合执法:'0',
          其他:'0',
          总结案量:'66',
          结案率:'64.29%',

        },
       {
          jgmc: "新余市交通运输局",
          新增案件量:'0',
          总案件量:'107',
          公路:'52',
          道路:'54',
          水路:'1',
          航道:'0',
          港口:'0',
          质监:'0',
          海事:'0',
          综合执法:'0',
          其他:'0',
          总结案量:'33',
          结案率:'73.33%',

        },
        {
          jgmc: "鹰潭市交通运输局",
          新增案件量:'0',
          总案件量:'31',
          公路:'0',
          道路:'13',
          水路:'1',
          航道:'2',
          港口:'0',
          质监:'0',
          海事:'15',
          综合执法:'0',
          其他:'0',
          总结案量:'108',
          结案率:'81.2%',

        },
       {
          jgmc: "赣州市交通运输局",
          新增案件量:'0',
          总案件量:'31',
          公路:'0',
          道路:'13',
          水路:'1',
          航道:'2',
          港口:'0',
          质监:'0',
          海事:'15',
          综合执法:'0',
          其他:'0',
          总结案量:'76',
          结案率:'69.16%',

        },
      ],
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
      isShow: false
    };
  },
   watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1// 为了保证table 每次都会重渲
    }
  },
  methods: {
    lineSelect(){
      this.showSelect=!this.showSelect;
    },
    //获取机构
    getOrgan() {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.organData = res.data;
          // _this.getRoleBindOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
   
    // 自定义列背景色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 ) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      } else {
        return "background:#ffffff;";
      }
    },
    //表单筛选
    getLogList(val) {
      this.currentPage = val;
      let data = {
        organ: this.logForm.organ,
        type: this.logForm.type,
        operation: this.logForm.operation,
        username: this.logForm.username,
        startTime: this.logForm.dateArray ? this.logForm.dateArray[0] : "",
        endTime: this.logForm.dateArray ? this.logForm.dateArray[1] : "",
        current: this.currentPage,
        size: this.pageSize
      };
      let _this = this;
      this.$store.dispatch("getloglist", data).then(res => {
        _this.tableData = res.data.records;
        _this.totalPage = res.data.total;
      });
      err => {
        console.log(err);
      };
    },

    //展开
    showSomeSearch() {
      this.isShow = !this.isShow;
    },
    // 日志重置
    reset() {
      this.$refs["logForm"].resetFields();
      this.getLogList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLogList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getLogList(val);
    },
    select(){
      
    }
  },
  mounted() {
    this.getOrgan();
  },
  created() {
    // this.getLogList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
