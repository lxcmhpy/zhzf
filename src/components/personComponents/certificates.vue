<template>
  <div>
    <div>
      <div class="card-title">
        <font class="font" style="font-size:25px;"><span class="titleflag"></span>证件信息</font> &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <el-table
        style="margin-left:25px;width:97%;margin-bottom:35px;"
        :data="tableData"  resizable  stripe>
        <el-table-column prop="certNo"  label="certNo" v-if="false"></el-table-column>
        <el-table-column prop="physicalNo"  label="physicalNo" v-if="false"></el-table-column>
        <el-table-column prop="periodBegin"  label="periodBegin" v-if="false"></el-table-column>
         <el-table-column prop="periodEnd"  label="periodEnd" v-if="false"></el-table-column>
        <el-table-column prop="issueDate"  label="issueDate" v-if="false"></el-table-column>
        <el-table-column prop="certStatusName"  label="certStatusName" v-if="false"></el-table-column>
        <el-table-column prop="attributionName"  label="attributionName" v-if="false"></el-table-column>
        <el-table-column prop="personName"  label="姓名" align="center"></el-table-column>
        <el-table-column prop="oname"  label="执法机构" align="center"></el-table-column>
        <el-table-column prop="certNo"  label="执法证号" align="center"></el-table-column>
        <el-table-column prop="issueDate"  label="发证日期" align="center"></el-table-column>
        <el-table-column prop="certStatusName"  label="证件状态" align="center"></el-table-column>
        <el-table-column prop="periodEnd"  label="有效期" align="center"></el-table-column>
        <el-table-column prop="opt" label="操作" align="center">
          <template slot-scope="scope">
              <el-button type="text"  @click="detailInfo(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationBox" style="margin-top:-25px;margin-bottom:10px;text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>

    <certificatesDetail ref="certificatesDetailRef" :params="params"></certificatesDetail>
  </div>
</template>

<script>
import certificatesDetail from '@/page/person/certificate-info/certificateDetail';
import {mixinPerson} from '@/common/js/personComm';
export default {
  name: "certificates",//人员证件信息组件
  mixins:[mixinPerson],
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: 'add', id: '' }
      },
      required: true
    }
  },
  data(){
    return {
      personId:this.params.id,
    }
  },
  components:{
    certificatesDetail
  },
  methods:{
    //更改每页显示的条数
    handleSizeChange(val) {
      let _this = this
      _this.pageSize = val;
      this.getCertificatesInfo();
    },
    //更换页码
    handleCurrentChange(val) {
      let _this = this
      _this.currentPage = val;
      _this.getCertificatesInfo();
    },
    detailInfo(row){
      this.$refs.certificatesDetailRef.showModal(row,'0');
    },
    getCertificatesInfo(){
      let _this = this
      let paramsData={
        current: this.currentPage,
        size: this.pageSize,
        personId: this.personId,
      }
        if(_this.params.type == 'edit' || _this.params.type == 'view'){
          _this.getPageList("queryPersonCert", paramsData);
        }
    }
  },
  created(){
    this.getCertificatesInfo();
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/personManage.scss";
</style>
