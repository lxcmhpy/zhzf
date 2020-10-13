<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="bnslawBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="bnslawSearchForm" ref="bnslawSearchForm">
            <el-form-item label="法规名称" prop='strName'>
              <el-input v-model="bnslawSearchForm.strName" placeholder="输入法规名称"></el-input>
            </el-form-item>
            <el-form-item label="发布文号" prop="strNumber">
              <el-input v-model="bnslawSearchForm.strNumber" placeholder="发布文号"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" prop="dtmDate">
              <!-- <el-input v-model="bnslawSearchForm.dtmDate" placeholder="发布时间"></el-input> -->
              <el-date-picker v-model="bnslawSearchForm.dtmDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getBtnlawListSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="resetForm('bnslawSearchForm')">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addBtnlaw">添加(法规)</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <!-- <el-table-column prop="bcode" label="法规编码" align="center" width="80px"></el-table-column> -->
          <el-table-column prop="strName" label="法规标题" align="left"></el-table-column>
          <el-table-column prop="strNumber" label="发布文号" align="left"></el-table-column>
          <el-table-column prop="strOrgan" label="发布机关" align="left"></el-table-column>
          <el-table-column prop="dtmDate" label="发布时间" align="center"></el-table-column>
          <el-table-column prop="shiDate" label="实施时间" align="center"></el-table-column>
          <el-table-column prop="status" label="时效性" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.status === 0?'有效':'无效'}}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center" width='280px'>
            <template slot-scope="scope">
              <el-button type="text" @click="getBtnlawVal(scope.row)">法条管理</el-button>
              <el-button type="text" @click="editBtnlaw(scope.row)">编辑</el-button>
              <el-button type="text" @click="getBtnlawDentails(scope.row)">详情</el-button>
              <el-button type="text" @click="deleteBtnlaw(scope.row.id)">删除</el-button>
              <el-upload style="width: auto;display: inline-block;" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="uploadBtnlawVal" multiple :limit="3">
                <el-button type="text" @click="curRowIndex=scope.row">上传</el-button>
              </el-upload>
              <el-button type="text" @click="previewBtnlaw(scope.row.id)">预览</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="visible" @close="closeTitle" :close-on-click-modal="false" width="30%">
        <el-form :model="addBtnlawForm" :rules="rules" ref="addBtnlawForm" label-width="80px">
          <el-form-item label="法规标题" prop="strName">
            <el-input v-model="addBtnlawForm.strName" :disabled="isAdd?true:false"></el-input>
          </el-form-item>
          <el-form-item label="发布文号" prop="strNumber">
            <el-input v-model="addBtnlawForm.strNumber"></el-input>
          </el-form-item>
          <el-form-item label="发布机关" prop="strOrgan">
            <el-input v-model="addBtnlawForm.strOrgan"></el-input>
          </el-form-item>
          <el-form-item label="法规效力" prop="drawerId">
            <el-select v-model="addBtnlawForm.drawerId" placeholder="请选择">
              <el-option v-for="item in lawLimitList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网站链接" prop="webLink">
            <el-input v-model="addBtnlawForm.webLink"></el-input>
          </el-form-item>
          <el-form-item label="业务领域" prop="industryTypeId">
            <el-select v-model="addBtnlawForm.industryTypeId" placeholder="请选择">
              <el-option v-for="item in lawCateList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" prop="dtmDate">
            <el-date-picker v-model="addBtnlawForm.dtmDate" type="date" placeholder="选择发布时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实施时间" prop="shiDate">
            <el-date-picker v-model="addBtnlawForm.shiDate" type="date" placeholder="选择发布时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时效性" prop="status">
            <el-select v-model="addBtnlawForm.status" placeholder="请选择">
              <el-option label="有效" :value="0"></el-option>
              <el-option label="无效" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题注" prop="strNote">
            <el-input type="textarea" :rows="2" v-model="addBtnlawForm.strNote"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="addEditbtnlaw">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 详情 -->
      <el-dialog title="法规详情" :visible.sync="dentailVisible" @close="dentailVisible = false" :close-on-click-modal="false" width="30%">
        <el-form :model="addBtnlawForm" ref="dentailBtnlawForm" label-width="100px" class="dentail-solid">
          <el-form-item label="法规标题：" prop="strName">
            {{addBtnlawForm.strName}}
          </el-form-item>
          <el-form-item label="发布文号：" prop="strNumber">
            {{addBtnlawForm.strNumber}}
          </el-form-item>
          <el-form-item label="发布机关：" prop="strOrgan">
            {{addBtnlawForm.strOrgan}}
          </el-form-item>
          <el-form-item label="法规效力：" prop="drawerName">
            {{addBtnlawForm.drawerName}}
          </el-form-item>
          <el-form-item label="网站链接：" prop="webLink">
            {{addBtnlawForm.webLink}}
          </el-form-item>
          <el-form-item label="业务领域：" prop="industryType">
            {{addBtnlawForm.industryType}}
          </el-form-item>
          <el-form-item label="发布时间：" prop="dtmDate">
            {{addBtnlawForm.dtmDate}}
          </el-form-item>
          <el-form-item label="实施时间：" prop="shiDate">
            {{addBtnlawForm.shiDate}}
          </el-form-item>
          <el-form-item label="时效性：" prop="status">
            {{addBtnlawForm.status === 0?'有效':'无效'}}
          </el-form-item>
          <el-form-item label="题注：" prop="strNote">
            {{addBtnlawForm.strNote}}
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dentailVisible = false">关闭</el-button>
        </span>
      </el-dialog>
      <el-dialog title="预览" :visible.sync="previewVisible" @close="previewVisible = false" :close-on-click-modal="false" width='790'>
        <div v-if="pdfUrl==''" style="text-align:center">暂未上传</div>
        <iframe :src="pdfUrl" frameborder="0" style="width:790px;height:1119px"></iframe>
        <span slot="footer" class="dialog-footer">
          <el-button @click="previewVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import {
  getBnsLawListApi, addBnsLawApi, deleteBnslawApi, getDictListDetailByNameApi, getBnsLawByIdApi
} from "@/api/system";
import { getIndustryCategoryApi } from "@/api/caseHandle.js";
import { uploadCommon, getFile } from "@/api/upload.js";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName: "", //查询名称
      bnslawSearchForm: {
        strName: "",
        strNumber: '',
        dtmDate: '',
      },
      info: "",
      dialogTitle: "",
      visible: false,
      dentailVisible: false,
      previewVisible: false,
      isAdd: false,
      // 添加、修改
      addBtnlawForm: {
        strName: '',
        drawerName: '',
        webLink: '',
        dtmDate: '',
        strNumber: '',
        strOrgan: '',
        industryType: '',
        shiDate: '',
        strNote: '',
        status: 0,
        drawerId: '',
        industryTypeId: '',

      },
      lawCateList: [], //业务领域列表
      lawLimitList: [], //法规效力
      rules: {
        strName: [{ required: true, message: "法规标题必须填写", trigger: "blur" }],
        strNumber: [{ required: true, message: "发布文号必须填写", trigger: "blur" }],
        strOrgan: [{ required: true, message: "发布机关必须填写", trigger: "blur" }],
        drawerId: [{ required: true, message: "法规效力必须填写", trigger: "blur" }],
        industryTypeId: [{ required: true, message: "业务领域必须填写", trigger: "blur" }],
      },
      curRowIndex: '',
      pdfUrl: ''
    };
  },
  inject: ["reload"],
  methods: {
    //获取法规列表
    getBtnlawList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        strName: this.bnslawSearchForm.strName,
        strNumber: this.bnslawSearchForm.strNumber,
        startTime: this.bnslawSearchForm.dtmDate ? this.bnslawSearchForm.dtmDate[0] : '',
        endTime: this.bnslawSearchForm.dtmDate ? this.bnslawSearchForm.dtmDate[1] : '',
      };
      let _this = this;

      getBnsLawListApi(data).then(
        res => {
          console.log('类型', res);
          // this.caseTypeList = res.data.records;
          console.log("法规列表", res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error)
        }
      );
    },
    // 查询
    getBtnlawListSearch() {
      this.currentPage = 1;
      this.getBtnlawList()
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.getBtnlawList()
    },
    //详情
    getBtnlawDentails(row) {
      this.addBtnlawForm = row
      this.dentailVisible = true
    },
    //获取法规值
    getBtnlawVal(row) {
      this.$store.commit("SET_BTNLAW_ID", row.id);
      this.$router.push({
        name: 'lawRegulations',
        params: { strName: row.strName }
      });
    },
    //删除法规
    deleteBtnlaw(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBnslawApi(id).then(
          res => {
            console.log('类型', res);
            if (res.code == 200) {
              this.getBtnlawList()
            } else {
              this.$message({
                type: 'info',
                message: '删除失败'
              });
            }
          },
          error => {
            console.log(error)
          }
        );
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //编辑法规
    editBtnlaw(row) {
      this.visible = true;
      let data = {
        id: row.id
      };
      this.isAdd = true;
      this.dialogTitle = "编辑法规";
      getBnsLawByIdApi(data).then(
        res => {
          this.addBtnlawForm = res.data;
        });
      err => {
        console.log(err);
      };
    },
    closeTitle() {
      this.visible = false;
      this.$refs["addBtnlawForm"].resetFields();
    },
    selectDrawer(vId) {
      let obj = {};
      obj = this.lawLimitList.find((item) => {
        return item.id === vId;
      });
      return obj.name;
    },
    selectIndustry(vId) {
      let obj = {};
      obj = this.lawCateList.find((item) => {
        return item.id === vId;
      });
      return obj.name;
    },
    //添加法规
    addBtnlaw() {
      this.visible = true;
      this.isAdd = false;
      this.dialogTitle = "新增法规";
    },
    addEditbtnlaw() {
      this.$refs["addBtnlawForm"].validate(valid => {
        if (valid) {
          this.addBtnlawForm.drawerName = this.selectDrawer(this.addBtnlawForm.drawerId);
          this.addBtnlawForm.industryType = this.selectIndustry(this.addBtnlawForm.industryTypeId);
          let data = this.addBtnlawForm;
          let _this = this;
          addBnsLawApi(data).then(
            res => {
              if (res.code == '200') {
                this.$message({ message: '添加成功', type: 'success' });
                this.visible = false;
                this.getBtnlawList();
              } else {
                this.$message.error('添加失败');
                return
              }
            },
            error => {
              console.log(error)
            }
          );
        }
      })

    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getBtnlawList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBtnlawList();
    },
    //获取法规值
    getBtnlawKeyList(data) {
      // let this = this
      this.$store.dispatch("getBtnlawListDetail", data).then(
        res => {
          console.log("法规值列表", res);
          if (res.data.length != 0) {
            this.info = "此数据法规已维护法规值，确认删除吗？";
          } else {
            this.info = "确认删除?";
          }
          this.$confirm(this.info, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$store.dispatch("deleteBtnlaw", data).then(
                res => {
                  this.reload();
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                },
                err => {
                  console.log(err);
                }
              );
            })
            .catch(() => { });
        },
        err => {
          console.log(err);
        }
      );
    },
    // 抽屉表
    getlawCateList() {
      // this.$store.dispatch("getEnforceLawType", "1").then(
      //   res => {
      //     console.log('getEnforceLawType', res)
      //     this.lawCateList = res.data;
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
      let dataCate = {};
      getIndustryCategoryApi(dataCate).then(res => {
        console.log("业务领域", res.data);
        this.lawCateList = res.data;
      }, err => {
        console.log(err);
      });
      getDictListDetailByNameApi('法规效力').then(res => {
        this.lawLimitList = res.data;
      }, err => {
        console.log(err);
      });
    },
    uploadBtnlawVal(param) {
      console.log('选中的信息', this.curRowIndex)
      let data = {
        caseId: this.curRowIndex.id,
        docId: this.curRowIndex.id
      }
      getFile(data).then(
        res => {
          let id = res.data.length > 0 ? res.data[0].id : ''
          var fd = new FormData()
          fd.append("file", param.file);
          fd.append("category", '法规法条');
          fd.append("fileName", param.file.name);
          fd.append("id", id);
          fd.append('caseId', this.curRowIndex.id)//传记录id
          fd.append('docId', this.curRowIndex.id)//传记录id
          uploadCommon(fd).then(
            // upload(fd).then(
            res => {
              console.log(res);
            },
            error => {
              console.log(error)
            }
          );
        },
        error => {
          console.log(error)
        }
      );
      console.log('选中的pdfUrl', this.pdfUrl)


    },
    previewBtnlaw(id) {
      this.pdfUrl = ''
      this.previewVisible = true;
      let data = {
        caseId: id,
        docId: id
      }
      getFile(data).then(
        res => {
          if (res.data.length > 0) {
            this.$util.com_getFileStream(res.data[0].storageId).then(res => {
              pthis.pdfUrl = res;
            });
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  },
  created() {
    this.getBtnlawList();
    this.getlawCateList();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
