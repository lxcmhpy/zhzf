<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="departOrUserTree">
        <p>装备类型</p>
        <el-input placeholder="输入装备类型名" v-model="filterText">
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
        <div class="treeBox" style="max-height:calc(100vh - 220px)">
          <el-tree
            highlight-current
            class="filter-tree"
            :data="treeData"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            ref="tree"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node,data }">
            <span>
              <i :class="data.children ? 'iconfont law-icon_zhan_bag' : ''"></i>
              {{ node.label }}
            </span>
          </span>
          </el-tree>
        </div>
      </div>
      <div class="searchPage toggleBox">
        <div class="handlePart">
          <el-form :inline="true" ref="deviceTypeForm" :model="queryForm" label-width="70px">
            <el-form-item label="类型名称" prop="name">
              <el-input v-model="queryForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getDataList(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="reset">重置</el-button>
            </el-form-item>
            <div>
            <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-plus"  @click="addData">新增</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-upload
                class="upload-demo"
                action=""
                :http-request="uploadDeviceType"
                :show-file-list="false"
                accept=".xlsx"
              >
                <el-button type="primary" size="medium" icon="el-icon-plus">导入</el-button>
              </el-upload>
            </el-form-item> -->
            </div>
          </el-form>
        </div>
        <div class="tablePart">
          <el-table
            :data="tableData"
            stripe
            resizable
            border
            style="width: 100%;height:100%"
            @selection-change="selectData"
            @row-click="showDataDetail"
          >
            <el-table-column label="序号" width="70px">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column prop="code" label="编码"></el-table-column>
            <el-table-column prop="name" label="类型名称"></el-table-column>
            <el-table-column prop="parentId" label="上级类型" :formatter="formatDeviceType"></el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <div style="width:160px">
                  <el-button type="text" @click.stop @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                  <el-button type="text" @click.stop @click="handleDelete(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paginationBox" v-if="tableData.length > 0">
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
        <el-dialog :title="title"
                    custom-class="leftDialog"
                    :visible.sync="visible"
                    top="0"
                    width="40%"
                    @close="closeDialog"
                    :close-on-click-modal="false">
            <el-form
                    :model="addForm"
                    ref="addForm"
                    :rules="rules"
                    label-width="150px"
                    class="addOrganClass" >
                <div class="part">
                    <!--卡片字段-->
                    <el-table-column prop="code" label="类型编码"></el-table-column>
                    <el-row>
                        <el-form-item label="类型编码" prop="code">
                            <el-input v-model="addForm.code" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-table-column prop="name" label="类型名称"></el-table-column>
                    <el-row>
                        <el-form-item label="类型名称" prop="name">
                            <el-input v-model="addForm.name" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-table-column prop="parentId" label="上级类型"></el-table-column>
                    <el-row>
                        <el-form-item label="上级类型" prop="parentId">
                            <el-select v-model="addForm.parentId" style="width: 100%;" :disabled="true">
                                <el-option
                                v-for="item in treeData[0].children"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-table-column prop="note" label="备注"></el-table-column>
                    <el-row>
                        <el-form-item label="备注" prop="note">
                            <el-input v-model="addForm.note" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer" v-show="!this.formReadOnly">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button @click="saveOrUpdate('addForm')"  type="primary" class="btn-custom" >
                    <span>确 定</span>
                </el-button>
            </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
import { queryDeviceTypeTree,queryDeviceType,findDeviceTypeById,saveOrUpdateDeviceType,deleteDeviceTypeById} from "@/api/device/deviceType.js";
import iLocalStroage from '@/common/js/localStroage';
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    data() {
      return {
        visible:false,
        formReadOnly:false,
        funName:'装备类型',
        queryForm: {
            name:''
        },
        addForm:{
        },
        rules: {
            code: [
                {required: true, message: "请输入编码", trigger: "blur"}
            ],
            name: [
                {required: true, message: "请输入名称", trigger: "blur"}
            ]
        },
        filterText: "",
        selectNode: {},
        treeData: [],
        tableData: [], //表格数据
        currentPage: 1, //当前页
        pageSize: 10, //pagesize
        totalPage: 0, //总数
        title:'',
        userInfo:{}
      };
    },
    components: {
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      uploadDeviceType(param){
        var fd = new FormData();
        fd.append("file", param.file);
      },
      reset() {
        this.$refs["deviceTypeForm"].resetFields();
      },
      //获取选中的记录
      selectData(val) {
        console.log(val);
      },
      //关闭弹窗的时候清除数据
      closeDialog() {
        this.visible = false;
        this.$refs["addForm"].resetFields();
      },
      //更改每页显示的条数
      handleSizeChange(val) {
        console.log("每页显示的条数", val);
        this.pageSize = val;
        this.getDataList(1);
      },
      //更换页码
      handleCurrentChange(val) {
        console.log("当前页", val);
        this.currentPage = val;
        this.getDataList(val);
      },
      //选中树节点
      handleNodeClick(data) {
        console.log(data);
        this.tableData = [];
        this.selectNode = data
        this.getDataList(1);
      },
      //表单筛选
      async getDataList(val) {
        this.currentPage = val
        let data = {
          name: this.queryForm.name,
          parentId:this.selectNode.id,
          current: this.currentPage,
          size: this.pageSize
        };
        let res = await queryDeviceType(data)
        this.totalPage = res.data.total;
        this.tableData = res.data.records;
      },
      //新增
      addData() {
        if(this.selectNode.id){
            this.visible=true
            this.formReadOnly = false
            this.addForm = {parentId:this.selectNode.id}
            this.title='新增'+this.funName
        }else{
            _this.$message({type: "error",message: "请先选择左侧装备类型!"});
        }
      },
      // 表格id删除
      handleDelete(row) {
        let _this = this
        this.$confirm("确认删除该设备类型?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteDeviceTypeById(row.id).then(
              res => {
                if(res.data==true){
                  _this.$message({type: "success",message: "删除成功!"});
                  _this.getDataList(1)
                }else{
                   _this.$message({type: "error",message: "删除失败!"});
                }
              },
              err => {
                console.log(err);
              }
            );
          })
          .catch(() => {
          });
      },
      async findDeviceTpeyById(id){
          let res = await findDeviceTypeById(id)
          this.addForm = res.data
      },
      // 表格编辑
      handleEdit(index, row) {
        this.title='修改'+this.funName
        this.formReadOnly = false
        this.findDeviceTpeyById(row.id)
        this.visible = true
      },
      //查看详情
      showDataDetail(row){
        this.title=this.funName+'详情'
        this.formReadOnly = true
        this.findDeviceTpeyById(row.id)
        this.visible = true
      },
      saveOrUpdate(formName){
        let _this = this
        this.$refs[formName].validate(valid => {
          if (valid) {
            saveOrUpdateDeviceType(_this.addForm).then(
                res => {
                  _this.$message({
                    type: "success",
                    message:"保存成功!"
                  });
                  _this.visible = false;
                  _this.getDataList(1);
                },
                err => {
                  console.log(err);
                }
              );
          }
        });
      },
      async init(){
        let res = await queryDeviceTypeTree()
        this.treeData = res.data
      },
      formatDeviceType (row) {
        let data = this.treeData[0].children.filter(p=>p.id==row.parentId)
        if(data){
          return data[0].label
        }
        return ''
      },
    },
    mounted() {
      this.userInfo = iLocalStroage.gets("userInfo");
      this.init()
    },
    created() {
    }
  };
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
