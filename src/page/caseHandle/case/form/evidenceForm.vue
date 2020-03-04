<!-------长软------->
<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="evidenceForm"  ref="evidenceForm">
            <el-form-item>
              <el-button type="primary" icon="add" size="medium"  @click="handleAdd">上传证据</el-button>
            </el-form-item>
            <el-form-item label="证据名称" prop="evName">
              <el-input v-model="evidenceForm.evName"></el-input>
            </el-form-item>
            <el-form-item label="证据类型" prop="evType">
              <el-select v-model="evidenceForm.evType" clearable>
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证据状态" prop="status">
              <el-select v-model="evidenceForm.status" clearable>
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getEviList">查询</el-button>
              <el-button type="primary" size="medium" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePartF">
        <el-table :data="tableData" stripe height="100%">
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="evName" label="证据名称" align="center"></el-table-column>
          <el-table-column prop="evType" label="证据类型" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="0"
                :inactive-value="1"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="evPath" label="附件" align="center"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationF">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加弹出框 -->
    <el-dialog title="上传证据" :visible.sync="addVisible" width="50%" v-loading="addLoading" :before-close="handleClose">
      <div>
        <div style="float: left;width: 45%">
          <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>点击上传附件</em></div>
          <div class="el-upload__tip" slot="tip" style="text-align: center">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </div>
        <div style="float: right;width: 55%">
          <el-form ref="form" :model="form" :rules="addrules">
            <el-form-item label="证据类型" prop="evType" label-width="113px">
              <el-select v-model="form.evType" style="width: 100%">
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证据名称" prop="evName" label-width="113px">
              <el-input v-model="form.evName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记 录 人" prop="recordName" label-width="113px">
              <el-input v-model="form.recordName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记录时间" prop="createTime" label-width="113px" >
              <el-date-picker
                v-model="form.createTime"
                type="datetime"
                placeholder="选择日期时间" style="width: 100%">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="取证地点" prop="evPlace" label-width="113px">
              <el-input v-model="form.evPlace" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状  态" prop="status" label-width="113px">
              <el-radio-group v-model="form.status">
                <el-radio label="0">有效</el-radio>
                <el-radio label="1">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备  注" prop="remark" label-width="113px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入"
                v-model="form.remark">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-left: 42%">
            <el-button size="medium" type="primary" @click="submitForm('form')">提  交</el-button>
            <el-button size="medium" @click="addVisible=false">取  消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑证据" :visible.sync="editVisible" width="35%" v-loading="editLoading" :before-close="handleClose">
      <el-form ref="uForm" :model="uForm" :rules="addrules">
        <el-form-item label="证据类型" prop="evType" label-width="113px">
          <el-select v-model="uForm.evType" style="width: 100%">
            <el-option
              v-for="item in evTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证据名称" prop="evName" label-width="113px">
          <el-input v-model="uForm.evName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="记 录 人" prop="recordName" label-width="113px">
          <el-input v-model="uForm.recordName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="记录时间" prop="createTime" label-width="113px" >
          <el-date-picker
            v-model="uForm.createTime"
            type="datetime"
            placeholder="选择日期时间" style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="取证地点" prop="evPlace" label-width="113px">
          <el-input v-model="uForm.evPlace" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状  态" prop="status" label-width="113px">
          <el-radio-group v-model="uForm.status">
            <el-radio :label="0">有效</el-radio>
            <el-radio :label="1">无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备  注" prop="remark" label-width="113px">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入"
            v-model="uForm.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left: 40%">
        <el-button size="medium" type="primary" @click="submitUForm('uForm')">提  交</el-button>
        <el-button size="medium" @click="editVisible=false">取  消</el-button>
      </div>
    </el-dialog>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'evidenceForm'" ></caseSlideMenu>
  </div>
</template>
<script>
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import { mapGetters } from "vuex";
    export default {
        data() {
            const isSelect = (rule, value, callback) => {
                if (value == undefined) {
                    return callback(new Error("请选择"));
                } else {
                    callback();
                }
            };
            return {
                evTypeOptions : [],
                statusOptions : [],
                /*evTypeOptions : [{
                    value: '视频',
                    label: '视频'
                }, {
                    value: '照片',
                    label: '照片'

                }],
                statusOptions : [{
                    value: 0,
                    label: '有效'
                }, {
                    value: 1,
                    label: '无效'

                }],*/
                value: '',
                //activeName: '1',
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                total: 0, //总数
                tableData: [],
                evidenceForm: {
                    evName: "",
                    evType: "",
                    status: ""
                },
                form: {},
                uForm: {},
                addVisible:false,
                editVisible: false,
                addLoading: false,
                editLoading: false,
                addrules: {
                    evType: [
                        { required: true, message: '证据类型不能为空', trigger: 'blur' , validator: isSelect },
                        { required: true, message: '证据类型不能为空', trigger: 'change' , validator: isSelect }
                    ],
                    evName: [
                        { required: true, message: '证据名称不能为空', trigger: 'blur' },
                    ],
                    recordName: [
                        { required: true, message: '记录人不能为空', trigger: 'blur' },
                    ],
                    createTime: [
                        { required: true, message: '记录时间不能为空', trigger: 'blur' },
                    ],
                    evPlace: [
                        { required: true, message: '取证地点不能为空', trigger: 'blur' },
                    ],
                    status: [
                        { required: true, message: '状态不能为空', trigger: 'blur' },
                    ]
                }
            };
        },
        computed: { ...mapGetters(['caseId']) },
        components: {
          caseSlideMenu
        },
        methods: {
            submitForm(formName){
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      _this.insertEvi();
                    }
                });
            },
            submitUForm(formName){
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      _this.updateEvi();
                    }
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleAdd(index, row) {
                this.form = {};
                this.addVisible = true;
            },
            handleEdit(index, row) {
                const item = this.tableData[index];
                this.uForm = {
                    id: item.id,
                    caseId: item.caseId,
                    evName: item.evName,
                    evType: item.evType,
                    recordName: item.recordName,
                    createTime: item.createTime,
                    evPlace: item.evPlace,
                    status: item.status,
                    remark: item.remark
                };
                this.editVisible = true;
            },
            //表单筛选
            getEviList() {
                let data = {
                    evName:this.evidenceForm.evName,
                    evType:this.evidenceForm.evType,
                    status:this.evidenceForm.status,
                    current: this.currentPage,
                    size: this.pageSize
                };
                let _this = this
                this.$store.dispatch("getEvidence", data).then(res => {
                    _this.tableData = res.data.records;
                    _this.total = res.data.total;
                });

            },
            //插入证据
            insertEvi(){
                let data = {
                  id:this.randomString(32),
                  caseId:this.randomString(32),
                  evName:this.form.evName,
                  evType:this.form.evType,
                  status:this.form.status,
                  createTime:this.formatDateStr(this.form.createTime)
                };
                let _this = this
                this.$store.dispatch("saveOrUpdateEvidence", data).then(res => {
                  if (res.code == 200){
                    _this.$message({
                      message: '添加成功！',
                      type: 'success'
                    });
                    _this.addVisible = false;
                    _this.currentPage = 1;
                    _this.getEviList();
                  }else{
                    _this.$message.error('出现异常，添加失败！');
                  }
                });
            },

            //修改证据
            updateEvi(){
              let data = {
                id: this.uForm.id,
                caseId: this.uForm.caseId,
                evName: this.uForm.evName,
                evType: this.uForm.evType,
                recordName: this.uForm.recordName,
                createTime: this.formatDateStr(this.uForm.createTime),
                evPlace: this.uForm.evPlace,
                status: this.uForm.status,
                remark: this.uForm.remark
              };
               let _this = this
              this.$store.dispatch("saveOrUpdateEvidence", data).then(res => {
                if (res.code == 200){
                  _this.$message({
                    message: '编辑成功！',
                    type: 'success'
                  });
                  _this.editVisible = false;
                  _this.currentPage = 1;
                  _this.getEviList();
                }else{
                  _this.$message.error('出现异常，添加失败！');
                }
              });
            },
            // 重置
            resetSearch() {
                this.$refs["evidenceForm"].resetFields();
            },

            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.getEviList();
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getEviList();
            },
            randomString(e){
                e = e || 32;
                const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
                a = t.length;
                let res = "" ;
                for (let i = 0; i < e; i++){
                  res += t.charAt(Math.floor(Math.random() * a));
                }
                return res;
            },
            formatDateStr(val) {
              if(val == null){
                return null;
              }
              let date = new Date(val);
              let Y = date.getFullYear() + '-';
              let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
              let D = date.getDate() < 10 ? '0' + date.getDate() + ' ': date.getDate() + ' ';
              let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
              let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
              let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
              return Y + M + D + h + m + s;
            },
        },
        mounted() {
        },
        created() {
            this.getEviList();
            let _this = this
            //初始化代码集
            this.$store.dispatch("getDictionary", "574a5a05d004e32fe5d7f73c4b6a22ef").then(res => {
              for(let item of res.data){
                _this.evTypeOptions.push({value:item.name,label:item.notes});
              }
            });
            this.$store.dispatch("getDictionary", "02204fe639c86edbae51e3dfccad36d9").then(res => {
              for(let item of res.data){
                _this.statusOptions.push({value:item.name,label:item.notes});
              }
            });
        }
    };
</script>
<style lang="scss">
  @import "@/assets/css/systemManage.scss";
  .paginationF{
    position: absolute;
    bottom: 10px;
    right: 20px;
    margin: auto;
    text-align: center;
  }
  .tablePartF{
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 4%;
  }
  .el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 360px;
    height: 370px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .fullscreen {
  .hasBigMarginRight{
      margin-right: 65px;
    }
}
</style>
