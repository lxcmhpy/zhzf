<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" style="overflow: hidden;">
      <div class="handlePart">
        <div class="search toggleBox">
          <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item label-width="0">
                <el-button size="medium" class="commonBtn searchBtn" type="primary" @click="addRecordDialog()">添加记录</el-button>
              </el-form-item>
              <el-form-item label="业务类型" prop='checkType'>
                <el-select v-model="searchForm.checkType" placeholder="请选择">
                  <el-option v-for="(item,index) in domainList" :key="index" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处置状态" prop='fileStatus'>
                <el-select v-model="searchForm.fileStatus" placeholder="请选择">
                  <el-option v-for="(item,index) in statusList" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车牌号" prop='vehicleShipId'>
                <el-input v-model="searchForm.vehicleShipId" placeholder="请输入车牌号"></el-input>
              </el-form-item>
            </el-form>
            <div class="search-btns">
              <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="getTableData()"></el-button>
              <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="resetForm('searchForm')"></el-button>
              <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="tablePart" style="clear: both;">
        <el-table :data="recordList" stripe style="width: 100%" height="100%">
          <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车牌号" align="center"></el-table-column>
          <el-table-column prop="checkType" label="类型" align="center"></el-table-column>
          <el-table-column prop="detectStation" label="检测站" align="center"></el-table-column>
          <el-table-column prop="totalWeight" label="初检车货总重" align="center"></el-table-column>
          <el-table-column prop="overRatio" label="初检超载率" align="center"></el-table-column>
          <el-table-column prop="fileStatus" label="处置状态" align="center">
            <template slot-scope="scope">
              {{scope.row.fileStatus==0?'进行中':'已归档'}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="viewRecord(scope.row)" type="text">查看</el-button>
              <!-- <el-button :disabled="!inspectionFileEdit" type="text" @click="delModle(scope.row.id)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="paginationBox">
          <div v-if="total > 10">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.current" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="form.size"></el-pagination>
          </div>
          <div class="noMore" v-else>没有更多了</div>
        </div> -->
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-form :inline="true" :model="recordType" class ref="recordType" :rules="typerule">
          <el-form-item prop='type'>
            <el-radio-group v-model="recordType.type">
              <ul class="notice-icon-list">
                <li v-for="(item,index) in checkList" :key="index">
                  <i class="iconfont law-icon_cheliang"></i><br/>
                  <el-radio :label="item" >{{item}}</el-radio>
                </li>
                <!-- <el-radio label="大件许可">大件许可</el-radio>
                <el-radio label="绿通车">绿通车</el-radio>
                <el-radio label="危化车">危化车</el-radio>
                <el-radio label="路警联合">路警联合</el-radio> -->
              </ul>

            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRecord('recordType')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { getPcQueryCarInfoApi, changeFileStatus, delDocumentById, getDictListDetailByNameApi } from "@/api/inspection";
export default {

  data() {
    return {
      compData: [],
      viewFlag: [],
      recordList: [],
      currentFileId: '',
      total: 0,
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      fileList: [],
      domainList: [],
      statusList: [{ name: '进行中', value: 0 }, { name: '已归档', value: 1 }],
      checkList: ['特种车', '大件许可','绿通车', '不足1t','危化车','路警联合'],
      searchForm: {
        vehicleShipId: "",
        fileStatus: "",
        checkType: "",
      },
      isShow: false,
      dialogVisible: false,
      recordType: {
        type: ''
      },
      typerule: {
        type: [
          { required: true, message: '请选择记录类型', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    addNewModle() {
      this.$refs.addModleRef.showModal();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 选择模板
    editRecord(item) {
      // 写文书
      if (item.pdfStorageId && item.status != '暂存') {
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.push({
          name: "inspection_myPDF",
          params: { id: item.id, storagePath: item.pdfStorageId }
        });
      } else {
        this.$store.commit("set_inspection_fileId", item.id)
        this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
        this.$router.push({
          name: item.path,
          params: { id: item.id, addOrEiditFlag: 'add' }
          // query: { id: item.id, addOrEiditFlag: 'add' }
        });
        // 写表单
        this.$emit('changeModleId', item);
      }
    },
    // 查看模板
    viewRecord(item) {
      this.$store.commit("set_inspection_fileId", item.id)
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$store.commit("set_inspection_OverWeightId", { id: item.id, firstcheckId: item.firstCheckId });
      this.$router.push({
        name: "inspection_overWeightForm",
      });
    },
    // 修改模板
    editModle(item) {
      console.log('选中的模板', item)
      this.$store.commit("set_inspection_fileId", item.id)
      this.$refs.addModleRef.showModal(item);
    },
    // 删除模板
    delModle(item) {
      console.log('选中的模板', item)
      this.$confirm('确认删除当前记录文书？', "删除记录文书", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delDocumentById(item).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getTableData()
            }
          },
          error => {
            // reject(error);
          })

      })

    },
    // 预览
    preview() {
      this.$refs.previewRef.showModal(this.compData);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getTableData()
    },
    getTableData() {
      this.recordList = []
      let data = {
        checkType: this.searchForm.checkType,
        fileStatus: this.searchForm.fileStatus,
        vehicleShipId: this.searchForm.vehicleShipId,
        current: this.currentPage,
        size: this.pageSize,
      };
      getPcQueryCarInfoApi(data).then(
        res => {
          console.log(res)
          if (res.code == 200) {
            this.recordList = res.data.records
            this.total = res.data.total
          }
        },
        error => {
          // reject(error);
        })
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    addRecordDialog() {
      this.dialogVisible = true
    },
    addRecord(formName) {
      console.log('提那');
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('yanzheng')
          this.$store.commit("set_inspection_OverWeightId", '');
          this.$router.push({
            name: 'inspection_overWeightForm',
          });
        }
      })
    },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1: _this.domainList = res.data; break;//业务类型
              // case 2: _this.statusList = res.data; break;//处置状态
            }
          },

          error => {
            // reject(error);
          })
      });

    },
  },
  mounted() {
    this.getTableData();
    this.getDrawerList([
      { name: '路警联合-业务类型', option: 1 },
      { name: '路警联合-处置状态', option: 2 }])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>