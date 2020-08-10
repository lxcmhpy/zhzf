(<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">
        <viewNotice ref="viewNoticeRef"></viewNotice>
        <div class="search">
          <el-form :inline="true" >
            <!-- <el-form-item label="考核名称">
              <el-select v-model="search.batchId" placeholder="请选择" >
                <el-option v-for="(item,index) in batchList" :key="index" :label="item.batchName" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="业务领域">
              <el-select v-model="search.businessArea" placeholder="请选择" >
                <el-option v-for="(item,index) in businessAreaList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="案卷类型">
              <el-select v-model="search.caseType" placeholder="请选择" >
                <el-option v-for="(item,index) in caseTypeList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
<!--              <el-input v-model="search.caseType" clearable placeholder="请选择"></el-input>-->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchData(1)">查询</el-button>
            </el-form-item>
              <el-form-item v-if="baosongStatus">
                <el-button type="primary" size="medium" icon="el-icon-plus"  @click="add">新增</el-button>
              </el-form-item>
              <el-form-item v-if="baosongStatus">
                <el-link href="./static/excel/案卷信息.xlsx">
                  <el-button type="primary" size="medium" icon="el-icon-plus" >模板下载</el-button>
                </el-link>
              </el-form-item >
              <el-form-item v-if="baosongStatus">
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="uploadCase"
                  :show-file-list="false"
                  accept=".xlsx"
                >
                  <el-button type="primary" size="medium" icon="el-icon-plus">批量导入</el-button>
                </el-upload>
              </el-form-item>
            <el-form-item v-if="baosongStatus">
              <el-button type="primary" size="medium" @click="clickBaosong">报送</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tablePart">
          <!-- @row-click="handleNodeClick" -->
          <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id" >
            <el-table-column prop="caseNo" label="案件编号" align="center"></el-table-column>
            <el-table-column prop="caseParty" label="当事人" align="center"></el-table-column>
            <el-table-column prop="caseType" label="案卷类型" align="center"></el-table-column>
            <el-table-column prop="caseAgency" label="办案/执法机构" align="center"></el-table-column>
            <el-table-column prop="casesMajor" label="是否是重大案件" align="center"></el-table-column>
            <!-- <el-table-column prop="enforcementOfficials1" label="执法人员1" align="center"></el-table-column>
            <el-table-column prop="enforcementOfficials2" label="执法人员2" align="center"></el-table-column> -->
            <el-table-column prop="caseCause" label="案由" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.caseCause" placement="top-start" >
<!--                  <div slot="content">案由：<br />{{scope}}</div>-->
                  <el-button>案由</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column  label="状态" align="center">
              <template slot-scope="scope">
                <el-tag type="warning" v-show="scope.row.bsStatus==0">未报送</el-tag>
                <el-tag type="warning" v-show="scope.row.bsStatus==1 && scope.row.caseStatus==0">未抽取</el-tag>
                <el-tag type="success" v-show="scope.row.caseStatus==1">已抽取</el-tag>
              </template>
            </el-table-column>
              <el-table-column label="操作" align="center" width="120" >
                <template  slot-scope="scope">
                    <div>
                        <div v-if="baosongStatus">
                            <el-button type="text" @click.stop @click="update(scope.row)" v-show="scope.row.caseStatus==0">修改</el-button>
                            <el-button type="text" @click.stop @click="deleteCase(scope.row)" v-show="scope.row.caseStatus==0">删除</el-button>
                        </div>
                        <div v-show="scope.row.caseStatus==1">
                            <el-upload
                                class="upload-demo"
                                accept=".pdf,.PDF"
                                :show-file-list="false"
                                v-show="scope.row.caseStatus==1"
                                :http-request="(params)=>saveFile(params,scope.row)"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple
                                :limit="1">
                                <el-button size="small" type="primary">上传附件</el-button>
                            </el-upload>
                            <el-button type="text" @click.stop @click="view(scope.row)" v-show="scope.row.caseStatus==1 && scope.row.fjStatus==1">查看附件</el-button>
                        </div>
                  </div>
                </template>
              </el-table-column>

          </el-table>
        </div>

        <div class="paginationBox" >
          <div v-if="total/dataList.length > 1">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="current"
              :page-sizes="[20, 40, 60, 80,100]"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
          <div class="noMore" v-else>没有更多了</div>
        </div>

        <el-dialog :visible.sync="visible" title="案件报送" width="480px" >
          <el-form :label-position="labelPosition" :model="form" ref="form" :rules="rules" label-width="160px">
            <!-- <el-form-item label="考核名称">
              <el-select v-model="form.batchId" placeholder="请选择" >
                <el-option v-for="(item,index) in batchList" :key="index" :label="item.batchName" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="案卷编号" prop="caseNo">
              <el-input placeholder="请输入" v-model.trim="form.caseNo" ></el-input>
            </el-form-item>
            <el-form-item label="案由">
              <el-input placeholder="请输入" v-model.trim="form.caseCause" ></el-input>
            </el-form-item>
            <el-form-item label="案卷类型">
              <el-select v-model="form.caseType" placeholder="请选择" >
                <el-option v-for="(item,index) in caseTypeList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当事人">
              <el-input placeholder="请输入" v-model.trim="form.caseParty" ></el-input>
            </el-form-item>
            <el-form-item label="办案/执法机构">
              <el-input placeholder="请输入" v-model.trim="form.caseAgency" ></el-input>
            </el-form-item>
            <el-form-item label="执法人员1">
              <el-input placeholder="请输入" v-model.trim="form.enforcementOfficials1" ></el-input>
            </el-form-item>
            <el-form-item label="执法人员2">
              <el-input placeholder="请输入" v-model.trim="form.enforcementOfficials2" ></el-input>
            </el-form-item>
            <el-form-item label="处理类型">
              <el-select v-model="form.handleType" placeholder="请选择" >
                <el-option v-for="(item,index) in handleTypeList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="涉案金额（元）" prop="amountInvolved">
              <el-input placeholder="请输入" v-model.trim="form.amountInvolved" ></el-input>
            </el-form-item>
            <el-form-item label="业务领域">
              <el-select v-model="form.businessArea" placeholder="请选择" >
                <el-option v-for="(item,index) in businessAreaList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否是重大案件">
              <el-radio-group v-model.trim="form.casesMajor" >
                <el-radio :label="'否'">否</el-radio>
                <el-radio :label="'是'">是</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer" >
            <el-button @click="addOrUpdate"  type="primary" class="btn-custom" >
              <span>确 定</span>
            </el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>


<script>
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import {findPykhCaseByPage,importCase,saveOrUpdateCaseInfo,deleteCaseInfo,StaffAndCaseFile,confirmSubmissionCase } from "@/api/catsAppraisalExamCaseUpload.js";
  import viewNotice from "../noticeManage/viewNotice";
  import iLocalStroage from '@/common/js/localStroage';
  import {money} from '@/common/js/validator';
  export default {
    mixins: [mixinsCommon],
    components: {
      viewNotice
    },
    data() {
      return {
        rules: {
            caseNo: [
                {required: true, message: "请输入案件编号", trigger: "blur"}
            ],
            amountInvolved: [
                { validator: money, trigger: "blur" }
            ]
        },
        current:1,
        size:20,
        total:0,
        dataList:[],
        visible:false,
        labelPosition: 'right',
        organId:'',
        form:{
          caseNo:'',
          caseCause:'',
          caseType:'',
          oId:'',
          caseAgency:'',
          caseParty:'',
          enforcementOfficials1:'',
          enforcementOfficials2:'',
          handleType:'',
          amountInvolved:'',
          businessArea:'',
          casesMajor:''
        },
        search:{
          batchId:'',
          businessArea:'',
          caseType:''
        },
        baosongStatus:true,
        businessAreaList:[
            '公路路政','道路运政','水路运政','航道运政','港口行政','海事行政','工程质量安全监督','其他'
        ],
        caseTypeList:['行政处罚','行政检查','行政强制'],
        handleTypeList:['罚款'],
      }
    },
    methods:{
      saveFile(param, row) {
        var fd = new FormData();
        fd.append("file", param.file);
        fd.append("userId", iLocalStroage.gets("userInfo").id);
        fd.append("category", "案件报送");
        fd.append("caseId", row.caseId);
        fd.append("storageId", row.storageId?row.storageId:'');
        let _this = this;
        StaffAndCaseFile(fd).then(res => {
          if (res.code == 200){
            row.storageId = res.data
            row.fjStatus = '1'
          }else{
            _this.$message.error('出现异常，添加失败！');
          }
        });
      },
      view(row){
        let routerData = {
          storageId: row.storageId
        };
        this.$refs.viewNoticeRef.showPDF(row.storageId);
      },
      fetchData(data){
        data.current=this.current
        data.size=this.size;
        data.oId=this.organId;
        findPykhCaseByPage(data).then(res=>{
          if(res.code==200){
            this.dataList=res.data.records;
            this.total=res.data.total;
            this.current=res.data.current;
          }
        });
      },
      //更改每页显示的条数
    handleSizeChange(val) {
      this.current = 1;
      this.size = val;
      this.fetchData({});
    },
    //更换页码
    handleCurrentChange(val) {
      this.current = val;
      this.fetchData({});
    },
      searchData(current){
        this.current = current;
        let data=this.search;
        console.info("searchData:",data)
        this.fetchData(data);
      },
      resetSearch(){
        this.search={
          batchId:'',
          businessArea:'',
          caseType:''
        }
      },
      add(){
        this.visible = true;
      },
      update(data){
        this.form=data;
        this.visible=true;
      },
      deleteCase(data){
        console.info("***********")
        this.$confirm("确定删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          deleteCaseInfo(data.caseId).then(
            res => {
              if(res.data===true){
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.fetchData({})
              }else{
                this.$message({
                  type: "warning",
                  message: "删除失败!"
                });
              }
            },
            err => {
              console.log(err);
            }
          );
        })
          .catch(() => {});
      },

      addOrUpdate(){
        let _this =this;
        this.$refs['form'].validate((valid) => {
            if (valid) {
              _this.form.oId=this.organId
                saveOrUpdateCaseInfo(_this.form).then(res=>{
                    console.info("保存案件结果：",res)
                    if(res.code==200){
                        _this.visible=false;
                        _this.form={};
                        _this.fetchData({});
                    }else{
                            _this.$message({type: "error",message:res.data});
                        }
                })
            } else {
                _this.errorMsg("您有必填字段未填写！", 'error')
                _this.closeLoading();
                return false;
            }
        })
      },

      uploadCase(param){
        console.log(param);
        var fd = new FormData();
        fd.append("file", param.file);
        fd.append("oId",this.organId)
        importCase(fd).then(
          res => {
            console.log(res);
            if(res.code==200){
              this.fetchData({});
              this.$message({type: "success",message: res.msg});
            }else{
              this.$message({type: "error",message:res.msg});
            }
          },
          error => {
            console.log(error);
          }
        );
      },
      findCaseBsStatus(){
        let data={}
        data.oId=this.organId;
        data.bsStatus=1;
        findPykhCaseByPage(data).then(res=>{
          if(res.code==200){
            if(res.data.total>0){
              this.baosongStatus=false;
            }
          }
        });

      },
      clickBaosong(){
        confirmSubmissionCase(this.organId).then(res=>{
          if(res.code==200){
            this.$message({type: "success",message: res.msg});
            this.findCaseBsStatus();
            this.fetchData({});
          }else{
            this.$message({type: "error",message: res.msg});
          }
        });
      }
    },
    mounted() {
      let userInfo = iLocalStroage.gets("userInfo");
      this.organId = userInfo.organId;
      let initdata={}
      this.findCaseBsStatus();
      this.fetchData(initdata);
    }
  }

</script>
