<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="departOrUserTree">
        <p>设备资源列表</p>
        <el-input placeholder="输入机构名" v-model="filterText">
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
        <div class="treeBox" style="max-height:calc(100vh - 220px)">
          <el-tree
            highlight-current
            class="filter-tree"
            :data="organData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            ref="tree"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span><img class="tree-node-icon" :src="'./static/images/img/lawSupervise/'+data.icon+'.png'">{{data.label}}</span>
            </span>
          </el-tree>
        </div>
      </div>
      <div class="searchPage toggleBox">
         <p>{{selectOrganName}}</p>
        <div class="handlePart">
          <el-form :inline="true" ref="deviceForm" :model="formInline" label-width="70px">
            <el-form-item label="查询范围">
              <el-select v-model="formInline.selectValue">
                <el-option
                  v-for="item in searchType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备类型" prop="deviceType">
              <el-select v-model="formInline.deviceType">
                    <el-option
                      v-for="item in typeData"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="设备名称" prop="name">
              <el-input v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="设备状态" prop="status">
                  <el-select v-model="formInline.status">
                    <el-option
                      v-for="item in status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
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
            <el-form-item>
              <el-upload
                class="upload-demo"
                action=""
                :http-request="uploadDevice"
                :show-file-list="false"
                accept=".xlsx"
              >
                <el-button type="primary" size="medium" icon="el-icon-plus">导入</el-button>
              </el-upload>
            </el-form-item>
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
            <el-table-column prop="deviceType" label="设备类型" :formatter="formatDeviceType"></el-table-column>
            <el-table-column prop="name" label="设备名称"></el-table-column>
            <el-table-column prop="organName" label="所属机构"></el-table-column>
            <el-table-column width="50" prop="status" label="状态">
              <template slot-scope="scope">
                <div>{{scope.row.status === 0?'在用':'禁用'}}</div>
              </template>
            </el-table-column>
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
          custom-class="deviceMngDialog"
          :visible.sync="visible"
          top="0"
          width="40%"
          @close="closeDialog"
          :close-on-click-modal="false">
          <el-form
            :model="addForm"
            ref="addForm"
            :rules="rules"
            label-width="100px"
            class="addOrganClass" >
            <div class="part">
              <p class="titleP">设备说明</p>
              <el-row>
                  <el-form-item label="所属机构" prop="organId">
                      <elSelectTree
                        ref="addFormUseUnitTreeObj"
                        :options="getOrganList"
                        :value="addForm.organId"
                        :accordion="true"
                        :props="orgTreeProps"
                        :filterable="true"
                        style="width: 100%;"
                        :disabled="this.formReadOnly"
                        @getValue="addFormUseUnitClick">
                    </elSelectTree>
                    <el-input style="display:none" v-model="addForm.organId"></el-input>
                  </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系人" prop="contactor">
                    <el-input v-model="addForm.contactor" style="width: 100%;" readonly ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="联系电话" prop="telephone">
                  <el-input v-model="addForm.telephone" style="width: 100%;" readonly></el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="设备类型" prop="deviceType">
                  <el-select v-model="addForm.deviceType" placeholder="请选择设备类型" style="width: 100%;" :disabled="this.formReadOnly" @change="changeDeviceType">
                    <el-option
                      v-for="item in typeData"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="12">
                <el-form-item label="设备名称" prop="name">
                  <el-input v-model="addForm.name" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="设备简称" prop="shortName">
                  <el-input v-model="addForm.shortName" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="设备有效期" prop="deviceDate">
                  <el-date-picker
                    :readonly="this.formReadOnly"
                    v-model="deviceDate"
                    unlink-panels
                    type="daterange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="设备状态">
                  <el-switch
                    v-model="addForm.status"
                    :active-value=0
                    :inactive-value=1
                    :disabled="this.formReadOnly"
                  ></el-switch>
                </el-form-item>
              </el-row>
               <el-row v-show="this.hasAddress">
                <el-form-item label="位置信息">
                  <el-input v-model="addForm.property1" placeholder="经度" style="width: 30%;" :readonly="this.formReadOnly"></el-input>
                  <el-input v-model="addForm.property2" placeholder="纬度" style="width: 30%;" :readonly="this.formReadOnly"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-show="this.hasAddress">
                <el-form-item>
                  <el-input v-model="addForm.address" placeholder="详细地址" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="备注">
                  <el-input v-model="addForm.note" style="width: 100%;" :readonly="this.formReadOnly"></el-input>
                </el-form-item>
              </el-row>
            </div>
            <div class="part">
              <p class="titleP">其他材料</p>
              <el-form-item label="设备照片">
                <el-upload
                  action="#"
                  accept=".jpg, .png"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :http-request="saveImageFile"
                  :file-list="imageList"
                  :disabled="formReadOnly"
                  :on-remove="(file, fileList)=>deleteFile(file, fileList,'图片')">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="相关附件">
                <el-upload
                  class="upload-demo"
                  action="#"
                  accept=".pdf,.PDF"
                  :http-request="saveAttachFile"
                  :on-preview="handlePDFPreview"
                  multiple
                  :on-remove="(file, fileList)=>deleteFile(file, fileList,'附件')"
                  :limit="3"
                  :disabled="formReadOnly"
                  :file-list="attachList">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer" v-show="!this.formReadOnly">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button @click="addOrUpdate('addForm')"  type="primary" class="btn-custom" >
              <span>确 定</span>
            </el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogImageVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-dialog
          :visible.sync="dialogPDFVisible"
          width="1000px"
          height="1000px"
          append-to-body
          >
          <object>
              <embed class="print_info" style="padding:0px;width: 900px;margin:0 auto;height:1000px" name="plugin" id="plugin" :src="dialogPDFUrl" type="application/pdf" internalinstanceid="29">
          </object>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
import { queryDeviceListPage,findDeviceById,saveOrUpdateDevice,deleteDeviceById,upload,deleteFileByIdApi,queryDeviceTypeAll,getCurrentAndNextOrganApi} from "@/api/lawSupervise.js";
import iLocalStroage from '@/common/js/localStroage';
import elSelectTree from '@/components/elSelectTree/elSelectTree';
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    data() {
      return {
        imageList: [],
        attachList: [],
        deviceDate:['',''],
        dialogImageUrl: '',
        dialogImageVisible: false,
        dialogPDFUrl: '',
        dialogPDFVisible: false,
        visible:false,
        formReadOnly:false,
        hasAddress:true,
        status: [
          {label: '在用', value: 0},
          {label: '禁用', value: 1}
        ],
        formInline: {
          name: "",
          deviceType: "",
          status: 0,
          selectValue: 1
        },
        addForm:{
        },
        rules: {
            organId: [
                {required: true, message: "请输入所属机构", trigger: "blur"}
            ],
            deviceType: [
                {required: true, message: "请输入设备类型", trigger: "blur"}
            ],
            name: [
                {required: true, message: "请输入设备名称", trigger: "blur"}
            ],
            /* deviceDate:[
              { type: 'array', required: true,  trigger: 'blur,change',validator:this.validateDate}
            ] */
        },
        getOrganList:[],
        searchType: [{value: 1, label: '本机构'}, {value: 0, label: '本机构及子机构'}],
        filterText: "",
        selectDeviceType: "",
        currentOrganId: "",
        organData: [],
        /* typeData:[
          {label:'非现场检测设备',id:'01',icon:'icon_zhifadian'},
          {label:'执法车辆',id:'02',icon:'icon_cl11'},
          {label:'执法船舶',id:'03',icon:'icon_cb11'}], */
        typeData:[],
        defaultProps: {
          children: "children",
          label: "label"
        },
        tableData: [], //表格数据
        currentPage: 1, //当前页
        pageSize: 10, //pagesize
        totalPage: 0, //总数
        selectDataIdList: [], //选中的记录
        selectOrganName:'',
        selectOrgan:{},
        title:'新增设备',
        visiblePopover: false,
        orgTreeProps: {
            label: "label",
            value: "id"
        },
      };
    },
    components: {
        elSelectTree
    },
    methods: {
      /* validateDate(rule, value, callback) {
        debugger
        if(this.deviceDate && this.deviceDate.length==2 && this.deviceDate[0]!==''){
          callback();
        }else{
          callback(new Error("请选择设备有效期"));
        }
      }, */
      addFormUseUnitClick(val) {
        this.$refs.addFormUseUnitTreeObj.$children[0].handleClose();
        if(val){
            let node = this.$refs.addFormUseUnitTreeObj.$refs.selectTree.getNode(val)
            if(node){
                this.$set(this.addForm,'organId',node.data.id)
                this.$set(this.addForm,'organName',node.data.label)
                this.$set(this.addForm,'contactor',node.data.contactor)
                this.$set(this.addForm,'telephone',node.data.telephone)
            }
        }
      },
      //删除附件
      deleteFile(file, fileList,type){
        let _this = this
        deleteFileByIdApi(file.storageId).then(res=>{
           if(type=="图片"){
             _this.imageList.splice(_this.imageList.findIndex(item => item.storageId === file.storageId), 1)
           }else{
            _this.attachList.splice(_this.attachList.findIndex(item => item.storageId === file.storageId), 1)
           }
          //fileList.splice(fileList.findIndex(item => item.storageId === file.storageId), 1)
        },err=>{
          console.log(err)
        })
      },
      saveAttachFile(param){
        this.saveFile(param,'附件')
      },
      saveImageFile(param){
        this.saveFile(param,'图片')
      },
      saveFile (param,type) {
        var fd = new FormData()
        fd.append("file", param.file);
        fd.append("category", '执法监管');
        fd.append("fileName", param.file.name);
        fd.append('status', type)//传记录id
        fd.append('caseId', param.file.name+new Date().getTime())//传记录id
        fd.append('docId', param.file.name+new Date().getTime())//传记录id
        let _this = this
        upload(fd).then(
            res => {
              if(type=="图片"){
                _this.imageList.push({
                  url:iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+res.data[0].storageId,
                  storageId:res.data[0].storageId,
                  name:res.data[0].fileName
                });
              }else{
                 _this.attachList.push({
                  url:iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+res.data[0].storageId,
                  storageId:res.data[0].storageId,
                  name:res.data[0].fileName
                });
              }
            },
            error => {
                console.log(error)
            }
        );
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogImageVisible = true;
      },
      handlePDFPreview(file){
        this.dialogPDFUrl = file.url;
        this.dialogPDFVisible = true;id
      },
      changeDeviceType(id){
        this.hideAddress(id)
      },
      formatDeviceType (row) {
        let data = this.typeData.filter(p=>p.code==row.deviceType)
        if(data && data.length>0){
          return data[0].name
        }
        return ''
      },
      addOrUpdate(formName){
        let _this = this
        this.$refs[formName].validate(valid => {
          if (valid) {
            _this.addForm.propertyValue=_this.addForm.property1+','+_this.addForm.property2
            if(_this.deviceDate[0]){
              _this.addForm.startDate = _this.deviceDate[0]
              _this.addForm.endDate = _this.deviceDate[1]
            }
            let storageIds = []
            _this.imageList.forEach(item=>{
              storageIds.push(item.storageId)
            })
            _this.attachList.forEach(item=>{
              storageIds.push(item.storageId)
            })
            _this.addForm.storageIds = storageIds
            _this.addForm.fileList=[]
            saveOrUpdateDevice(_this.addForm).then(
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
      uploadDevice(param){
        console.log(param);
        var fd = new FormData();
        fd.append("file", param.file);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.pLabel.indexOf(value) !== -1;
      },
      reset() {
        this.$refs["deviceForm"].resetFields();
      },
      //点击树事件
      handleNodeClick(data) {
        this.selectOrganName=data.pLabel
        console.log(data);
        this.tableData = [];
        if(data.type){
          this.currentOrganId = data.pid
          this.formInline.deviceType = data.id
          this.selectDeviceType = data.id
        }else{
          this.currentOrganId = data.id
          this.formInline.deviceType = ''
        }
        this.selectOrgan = data
        this.getDataList(1);
      },
      //表单筛选
      getDataList(val) {
        this.currentPage = val
        let data = {
          name: this.formInline.name,
          deviceType: this.formInline.deviceType,
          organId: this.currentOrganId,
          selectValue: this.formInline.selectValue,
          current: this.currentPage,
          size: this.pageSize,
          status: this.formInline.status
        };
        let _this = this
        queryDeviceListPage(data).then(res => {
          console.log(res);
          _this.totalPage = res.data.total;
          _this.tableData = res.data.records;
        });
        err => {
          console.log(err);
        };
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
      // 表格id删除
      handleDelete(row) {
        let _this = this
        this.$confirm("确认删除该设备?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteDeviceById(row.id,row.deviceType).then(
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
      //新增
      addData() {
        this.visible=true
        this.formReadOnly = false
        this.addForm = {status:0,organId:this.currentOrganId,deviceType:this.selectDeviceType}
        this.imageList=[]
        this.attachList=[]
        this.deviceDate=['','']
        this.title='新增设备'
        if(this.currentOrganId !== ''){
            this.addForm.contactor = this.selectOrgan.contactor
            this.addForm.telephone = this.selectOrgan.telephone
            this.addForm.organName = this.selectOrgan.label
            this.addForm.organId = this.selectOrgan.id
        }
        this.hideAddress(this.selectDeviceType)
      },
      hideAddress(data){
        if(data=='02' || data=='03'){
          this.hasAddress = false
        }else{
          this.hasAddress = true
        }
      },
      // 表格编辑
      handleEdit(index, row) {
        this.title='修改设备'
        this.findDeviceById(row)
        this.formReadOnly = false
        this.imageList=[]
        this.attachList=[]
      },
      //查看详情
      showDataDetail(row){
        this.title='设备详情'
        this.findDeviceById(row)
        this.formReadOnly = true
        this.imageList=[]
        this.attachList=[]
      },
      findDeviceById(row){
        let _this = this
        findDeviceById(row.id,row.deviceType).then(
          res => {
            _this.addForm = res.data
            let position = res.data.propertyValue ? res.data.propertyValue.split(','):['',''];
            let lng = parseFloat(position[0]);
            let lat = parseFloat(position[1]);
            _this.addForm.property1=lng
            _this.addForm.property2=lat
            let deviceDate = ['','']
            if(res.data.startDate){
              deviceDate[0]=res.data.startDate+' 00:00:00'
              deviceDate[1]=res.data.endDate+' 00:00:00'
            }
            _this.deviceDate=deviceDate
            if(res.data.fileList){
              res.data.fileList.forEach(item=>{
              if(item.status=='图片'){
                _this.imageList.push({
                  url:iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+item.storageId,
                  storageId:item.storageId,
                  name:item.name
                })
              }else{
                _this.attachList.push({
                  url:iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+item.storageId,
                  storageId:item.storageId,
                  name:item.name
                })
              }
            })
            }
            _this.visible=true
            if(_this.addForm.deviceType=='01'){
              _this.hasAddress = true
            }else{
              _this.hasAddress = false
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      //获取选中的记录
      selectData(val) {
        console.log(val);
        this.selectDataIdList = [];
        let _this = this
        val.forEach(item => {
          _this.selectDataIdList.push(item.id);
          console.log(_this.selectDataIdList);
        });
      },
      //关闭弹窗的时候清除数据
      closeDialog() {
        this.visible = false;
        this.$refs["addForm"].resetFields();
      },
      organTreeByCurrUser(organId) {
        let _this = this;
        let params = {
            name: '',
            organId: organId,
            type: 0
        }
        getCurrentAndNextOrganApi().then(
            res => {
                _this.getOrganList = JSON.parse(JSON.stringify(res.data))
                _this.organData = res.data;
                _this.organData.forEach((item,i)=>{
                    item.icon = 'icon_jc1';
                    item.pLabel = item.label
                    addChildren(item);
                })

                function addChildren(item) {
                  item.children = item.children ? item.children : [];
                  _this.typeData.forEach(item1=>{
                    item.children.splice(0,0,{
                      id:item1.code,pid:item.id,pLabel:item.label,label:item1.name,icon:item1.icon,type:1
                    })
                  })
                  let len = item.children.length -_this.typeData.length;
                  while (len > 0) {
                      item.children.forEach((obj,i)=> {
                          if (i > _this.typeData.length-1) {
                              obj.icon='icon_jc1'
                              obj.pLabel = obj.label
                              addChildren(obj);
                              len--;
                          }
                      })
                  }
                }
            }
        )
      },
      /* //获取当前机构及其子机构
      getCurrentOrganAndChild() {
        let _this = this
        getCurrentAndNextOrganApi().then(
          res => {
            _this.getOrganList = res.data;
          },
          err => {
            console.log(err);
          }
        );
      }, */
      queryDeviceTypeAll(){
        let _this = this
        queryDeviceTypeAll({}).then(
          res => {
            console.log(res);
            _this.typeData = res.data;
            _this.organTreeByCurrUser(_this.userInfo.organId);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    mounted() {
      this.userInfo = iLocalStroage.gets("userInfo");
      this.queryDeviceTypeAll()
      //this.getCurrentOrganAndChild()
    },
    created() {
    }
  };
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
