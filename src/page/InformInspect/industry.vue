<template>
  <div class="check yehu">
    <div class="top shadow">
      <div class="title_content">
        <div class="title_back float" @click="goBack">&lt;返回
        </div>
        <div class="float title_box title">经营业户查验</div>

      </div>

    </div>
    <el-form :inline="true" :model="checkData" class="demo-form-inline">
      <div class="center shadow">
        <div class="center_content">
          <span class="titleflag">
          </span>
          <span class="title">查验条件</span>
          <el-radio-group v-model="checkType" @change="changeType">
            <el-radio :label="1">业户名称查验</el-radio>
            <el-radio :label="2">经营许可证号查验</el-radio>
          </el-radio-group>
        </div>

        <el-form-item label="省份" class="margin28">
          <el-input v-model="checkData.provinceCode" placeholder="输入省份缩写"></el-input>
        </el-form-item>
        <el-form-item label="业户名称" v-if="checkType==1">
          <el-input v-model="checkData.ownerName" placeholder="输入业户名称"></el-input>
        </el-form-item>
        <el-form-item label="经营许可证号" v-if="checkType==2">
          <el-input v-model="checkData.licenseCode" placeholder="输入经营许可证号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getYehuCheck" size="medium">查询类型</el-button>
        </el-form-item>

      </div>
    </el-form>
    <div class="bottom shadow">
      <div class="center_content">
        <span class="titleflag">
        </span>
        <span class="title">查验结果</span>
      </div>
      <div v-if="tableData.lenth>0">请在上方查验条件输入检索内容，显示结果</div>
      <table>
        <tr>
          <td class="color_ff" valign="middle">
            经营业户名称
          </td>
          <td :colspan="3">{{ownerName}}</td>
        </tr>
        <tr>
          <td class="color_ff" width='20%'>
            省份名称
          </td>
          <td width='30%'>1</td>
          <td class="color_ff" width='20%'>
            经营业户所在地行政区划代码
          </td>
          <td width='30%'></td>
        </tr>
        <tr>
          <td class="color_ff">
            经营许可证字
          </td>
          <td></td>
          <td class="color_ff">经营许可证号</td>
          <td>{{licenseCode}}</td>
        </tr>
        <tr>
          <td class="color_ff">经营范围</td>
          <td :colspan="3">1</td>
        </tr>
        <tr>
          <td class="color_ff">有效期起</td>
          <td></td>
          <td class="color_ff">有效期止</td>
          <td></td>
        </tr>
        <tr>
          <td class="color_ff">经营类型</td>
          <td></td>
          <td class="color_ff">经营状态</td>
          <td></td>
        </tr>
        <tr>
          <td class="color_ff">发证机关</td>
          <td></td>
          <td class="color_ff">核发日期</td>
          <td></td>
        </tr>
        <tr>
          <td class="color_ff">企业组织机构代码</td>
          <td></td>
          <td class="color_ff">经营业户负责人姓名</td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/js/mixins";
export default {
  mixins: [mixinGetCaseApiList],
  data() {
    return {
      checkData: {
        provinceCode: '',
        ownerName: '',
        licenseCode: ''
      },
      radio: '1',
      checkType: 1,
      tableData: [],
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    // 返回
    goBack() {
      this.$router.go(-1);//返回上一层
    },
    //查询违法行为
    getYehuCheck() {
      this.$store.dispatch("yehuCheck", this.checkData).then(
        res => {
          console.log(res);
          res.data.forEach(item => {
            this.selectRoleList.push(item.roleId);
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    changeType() {
      this.clearData()
    },
    // 清空数据
    clearData() {
      this.checkData = {
        ownerName: '',
        licenseCode: ''
      }
    }

  }
}
</script>
<style lang='less' scoped>
@import "../../css/industry.less";
</style>