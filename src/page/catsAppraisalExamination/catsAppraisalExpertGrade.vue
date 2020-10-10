<!-- 案卷评查专家 -->
<template>
  <div class="cats-layout-page-content">
    <div class="searchAndpageBox toggleBox">
      <div class="tablePart">
        <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id">
          <el-table-column prop="caseNo" label="案卷编号" align="center"></el-table-column>
          <el-table-column prop="caseType" label="案卷类型" align="center"></el-table-column>
          <el-table-column prop="businessArea" label="执法门类" align="center"></el-table-column>
          <el-table-column prop="caseCause" label="案由" align="center"></el-table-column>
          <!-- <el-table-column prop="casesMajor" label="是否是重大案卷" align="center"></el-table-column> -->
          <!-- <el-table-column prop="pfStatus" label="状态" :formatter="format"  align="center"></el-table-column> -->
          <el-table-column label="案卷" align="center" width="120">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-search" @click="viewFile(scope.row)">案卷材料</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-button v-if="scope.row.pfStatus != '2'" type="primary" size="small" @click="openDialog(scope.row)">评分</el-button>
              <el-button v-else size="small" type="primary" @click="openDialog(scope.row)">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog :title="form.caseNo" :visible.sync="dialogVisible" v-dialogDrag :close-on-click-modal="false" :modal="false" width="1000px" style="height:95%">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px" size="small">
          <el-table :data="form.pykhScoreDetailsVos" border style="width: 100%;" height="350">
            <el-table-column prop="nrxm" label="评分细则"></el-table-column>
            <el-table-column prop="score" label="分值" width="100px"></el-table-column>
            <el-table-column prop="twoSore" width="100px" label="得分">
              <template slot-scope="scope">
                <el-form-item label-width="0" v-if="form.pfStatus != '2'" :prop="
                                          'pykhScoreDetailsVos.' +
                                              scope.$index +
                                              '.twoSore'
                                      " :rules="rules.twoSore">
                  <el-input v-model="scope.row.twoSore" @blur="
                                              blurValidate(
                                                  scope.row,
                                                  'twoSore'
                                              )
                                          " @focus="
                                              getOldValue(scope.row.twoSore)
                                          "></el-input>
                </el-form-item>
                <span v-else>{{ scope.row.twoSore }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="season" label="扣分原因">
              <template slot-scope="scope">
                <el-form-item label-width="0" v-if="form.pfStatus != '2'" :prop="
                                          'pykhScoreDetailsVos.' +
                                              scope.$index +
                                              '.season'
                                      " :rules="rules.season">
                  <el-input :rows="1" type="textarea" v-model="scope.row.season"></el-input>
                </el-form-item>
                <span v-else>{{ scope.row.season }}</span>
              </template>
            </el-table-column>
          </el-table>

          <div v-if="form.pfStatus != '2'" style="margin:20px;text-align:center">
            <el-button @click="saveRecord">保存</el-button>
            <el-button type="primary" @click="commitData">提交</el-button>
          </div>
        </el-form>
      </el-dialog>

      <el-dialog title="案卷材料" v-dialogDrag :visible.sync="pdfVisible" :close-on-click-modal="false" width="1000px" height="700px" :modal="false" append-to-body>
        <iframe class="print_info" style="padding:0px;width: 960px;margin:0 auto;height:500px" title="dd" :src="storagePath"></iframe>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="scss" scope src="@/assets/scss/page/catsAppraisalExamination.scss"></style>
<script>
import { mapGetters } from 'vuex'
import {
  getCaseInfoByExpertId,
  getCaseInfoDetailByPid,
  updateScoreBatch,
  updateScoreState
} from '@/api/pykh/appraisalExam.js'
import iLocalStroage from '@/common/js/localStroage'
export default {
  data() {
    return {
      userInfo: null,
      // search:{},
      dataList: [],
      orgList: [],
      organId: '',
      dialogVisible: false,
      pdfVisible: false,
      storagePath: null,
      form: {
        pykhScoreDetailsVos: []
      },
      rules: {
        twoSore: [
          {
            required: true,
            message: '请输入得分',
            trigger: 'blur'
          }
        ],
        season: [
          {
            required: true,
            message: '请输入扣分原因',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleCommand() {
      // this.$store.dispatch('deleteAllTabs');
      this.$router.push({
        name: 'login'
      })
    },
    fetchData() {
      let data = {
        assessType: '案卷评查',
        pfStatus: '0'
      }
      let _this = this
      getCaseInfoByExpertId(data).then(res => {
        if (res.code == 200) {
          _this.dataList = res.data
        } else if (res.code == 201) {
          _this.catsMessage({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    openDialog(row) {
      this.dialogVisible = true
      this.form = row
      this.getCaseInfoDetailByPid(row.id)
    },
    saveRecord() {
      let _this = this
      updateScoreBatch(this.form.pykhScoreDetailsVos).then(
        res => {
          _this.catsMessage({
            type: 'success',
            message: '保存成功!'
          })
          _this.dialogVisible = false
        },
        err => {
          console.log(err)
        }
      )
    },
    commitData() {
      var re = /^[0-9]([0-9])*$/
      let validata = this.form.pykhScoreDetailsVos.find(
        value => value.twoSore === null || !re.test(value.twoSore)
      )
      if (validata) {
        this.catsMessage({
          type: 'warning',
          message: '全部评分之后才能提交'
        })
        return
      }
      const data = {
        id: this.form.id,
        assessType: '案卷评查',
        pfstatus: '2'
      }
      let _this = this
      updateScoreBatch(this.form.pykhScoreDetailsVos).then(
        res => {
          updateScoreState(data).then(
            res => {
              _this.catsMessage({
                type: 'success',
                message: '提交成功!'
              })
              _this.dialogVisible = false
              _this.form.pykhScoreDetailsVos = []
              _this.form.pfStatus = '2'
            },
            err => {
              console.log(err)
            }
          )
        },
        err => {
          console.log(err)
        }
      )
    },
    blurValidate(row, key) {
      if (this.oldValue !== row[key]) {
        if (key === 'twoSore' || key === 'oneSore') {
          var re = /^[0-9]([0-9])*$/
          if (!re.test(row[key])) {
            row[key] = ''
            this.catsMessage({
              type: 'error',
              message: '请输入整数'
            })
            return
          }
          if (parseInt(row[key]) > row.score) {
            row[key] = ''
            this.catsMessage({
              type: 'error',
              message: '得分不能高于单项分值'
            })
            return
          }
        }
      }
    },
    getOldValue(val) {
      this.oldValue = val
    },
    getCaseInfoDetailByPid(id) {
      let _this = this
      getCaseInfoDetailByPid(id).then(
        res => {
          _this.form.pykhScoreDetailsVos = res.data
        },
        err => {
          console.log(err)
        }
      )
    },
    viewFile(row) {
      let storagePath1="";
      this.$util.com_getFileStream(row.storageId).then((res) => {
        storagePath1 = res;
      });
      // window.open(
      //   iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST +
      //     row.storageId +
      //     '?time=' +
      //     new Date().getTime()
      // )
      window.open(storagePath1);
    }
  },
  mounted() {
    this.fetchData()
    this.userInfo = iLocalStroage.gets('userInfo')
  },
  computed: {
    ...mapGetters(['systemTitle'])
  }
}
</script>
