<template>
<div class="com_searchAndpageBoxPadding">
  <div class="fullBox departBox">
    <div class="departOrUserTree">
      <!-- <div class="treeBoxTitle"> -->
        <p>机构列表</p>
        <div class="searchDepartBox">
          <el-input placeholder="输入机构名" v-model="filterText">
            <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      <!-- </div> -->

      <div class="treeBox">
        <el-tree
          class="filter-tree"
          :data="organData"
          :props="defaultProps"
          node-key="id"
          :filter-node-method="filterNode"
          :default-expanded-keys="defaultExpandedKeys"
          @node-expand="nodeExpand"
          ref="tree"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <span>
              <i
                :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"
              ></i>
              <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="departTable">
      <p>
        {{selectCurrentTreeName}}
        <!-- <span class="editSelectNode" @click="editSelectNode">
          <i class="iconfont law-btn_bianji"></i>
        </span> -->
      </p>
      <div class="handelBtn top-box">
        <div>子机构列表</div>
        <el-button type="primary" size="medium" @click="allInit">全部初始化</el-button>
      </div>
      <!-- <div class="tableBox"> -->

      <el-table
        :data="tableData"
        v-loading="tableLoading"
        stripe
        style="width: 100%"
        height="70%"
      >
        <el-table-column prop="oid" label=" " align="center" v-if="false"></el-table-column>
        <el-table-column prop="oname" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="isConfig" label="配置状态" align="center" :formatter = "statusFormat"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click.stop @click="doaApploy(scope.row.oid)" type="text">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- </div> -->
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

    <approveDeploy ref="approveDeployRef" @getAllOrgan2="getAllOrgan1('root')"></approveDeploy>
  </div>
</div>
</template>
<script>
import approveDeploy from "./approveDeploy";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      filterText: "",
      selectCurrentTreeName: "",
      organData: [],
      allOrganData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      index:-1,
      tableData: [], //表格数据
      departLevel: 0, //级别
      defaultExpandedKeys: [], //默认展开的key
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      currentOrganId: "", //当前organ的id
      showAddDialog: false,
      paramList: [],
      status:false,
      pid:"",
      tableLoading: false
    };
  },
  components: {
    approveDeploy
  },
  inject: ["reload"],
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //点击树事件
    handleNodeClick(data) {
      this.selectCurrentTreeName = data.label;
      this.tableData = [];
      this.currentOrganId = data.id;
      this.getSelectOrgan(this.currentOrganId);
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
    },
    //配置状态
    statusFormat(row, column) {
      if (row.isConfig === '0') {
        return '已配置'
      } else if (row.isConfig === '1') {
        return '未配置'
      } 
    },
    getAllOrgan1(data){
      this.getAllOrgan(data);
    },
    //获取机构
    getAllOrgan(organId) {
      this.paramList=[];
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.defaultExpandedKeys.push(res.data[0].id);
          _this.selectCurrentTreeName = _this.selectCurrentTreeName
            ? _this.selectCurrentTreeName
            : res.data[0].label;
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              _this.defaultExpandedKeys.push(item.id);
            });
          }
          _this.organData = res.data;
          if (organId == "root") {
            _this.currentOrganId = res.data[0].id;
          } else {
            _this.currentOrganId = organId;
          }
          _this.getSelectOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
    //配置
      searchTable() {//查询所属机构
            let _this = this
            _this.$store.dispatch("getOriginNoLimit").then(
                res => {
                _this.allOrganData = res.data;
            },
            err => {
                console.log(err);
            });
        },
    doaApploy(id){
      let _this = this;
      _this.index = -1;
      this.paramList=[]
      let data = [];
      
      if(_this.allOrganData.length>0){
       _this.getOrgPid(_this.allOrganData,id);
      }
      data = _this.paramList;
      // console.info(">>>>>>>>>>"+JSON.stringify(_this.allOrganData))
      // console.info("aaaadddd"+JSON.stringify(_this.paramList))
       this.$refs.approveDeployRef.showModal(data,id);
    },
    //根据点击机构的id查找pid
    getOrgPid(arr,id){
       let _this = this;
       if(arr != undefined){
       if(arr.length>0){
        arr.forEach(item=>{
          if(item.id == id){
            _this.index = _this.index + 1;
           this.paramList.push({"id":item.id,"oname":item.label,"index":_this.index});
           if(item.pid != 0){
             _this.getOrgPid(_this.allOrganData,item.pid)
           }
           return;
          }
          
        })
        if(arr != undefined){
          for(let i = 0;i<arr.length;i++){
                 _this.getOrgPid(arr[i].children,id)
            }
        }
        
        }
      }
    },
    //获取选中的机构下的机构
    getSelectOrgan() {
      this.tableLoading = true;
      let data = {
        oid: this.currentOrganId,
        current: this.currentPage,
        size: this.pageSize
      };
      this.$store.dispatch("queryApproveProcessPageModul", data).then(
        res => {
          this.tableLoading = false;
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        },
        err => {
          this.tableLoading = false;
          console.log(err);
        }
      );
    },
   getArrayIndex(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i].oid === obj) {
        return i;
      }
    }
    return -1;
},
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getSelectOrgan();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSelectOrgan();
    },
    // 全部初始化
    allInit(){
      const loading = this.$loading({
        lock: true,
        text: '正在初始化',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      this.$store.dispatch('initAllApprove').then(res => {
        loading.close();
        if(res.code === 200){
          this.getSelectOrgan();
        }
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      })
    }

  },
  created() {
    this.getAllOrgan("root");
    this.searchTable();
  }
};
</script>

<style lang="scss">
@import "@/assets/css/systemManage.scss";
.top-box{
  display: flex;
  justify-content: space-between;
}
</style>
