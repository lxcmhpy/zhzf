<template>
  <el-dialog title="车辆查验" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="876px" class="vehicle-dialog">
    <div class="check-vehicle">
      <div class="top">
        <el-input ref="TOORGANID" class="focusHide" v-model="checkSearchForm.number" placeholder="请输入车牌号">
          <el-select v-model="checkSearchForm.color" slot="prepend">
            <el-option label="全部" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="banner">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="道路运输证">
            <span slot="label"><i class="el-icon-date"></i>道路运输证</span>
          </el-tab-pane>
          <el-tab-pane name="所属企业">
            <span slot="label"><i class="el-icon-date"></i>所属企业</span>
          </el-tab-pane>
          <el-tab-pane name="大件运输许可">
            <span slot="label"><i class="el-icon-date"></i>大件运输许可</span>
          </el-tab-pane>
          <el-tab-pane name="行驶轨迹">
            <span slot="label"><i class="el-icon-date"></i>行驶轨迹</span>
          </el-tab-pane>
          <el-tab-pane name="违法记录">
            <span slot="label"><i class="el-icon-date"></i>违法记录</span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="table" v-if="activeName=='道路运输证'">
        <table>
          <tr>
            <td class="table-bg">车牌号</td>
            <td></td>
            <td class="table-bg">车牌颜色</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">车辆类型</td>
            <td>张婷婷</td>
            <td class="table-bg"></td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">车辆营运状态</td>
            <td></td>
            <td class="table-bg"></td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">道路运输证号</td>
            <td></td>
            <td class="table-bg">发证机构</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">有效期起</td>
            <td></td>
            <td class="table-bg">有效期止</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">经营范围</td>
            <td  colspan="3"></td>
          </tr>
        </table>
      </div>
      <div class="table" v-if="activeName=='所属企业'">
        <table>
          <tr>
            <td class="table-bg">经营业户名称</td>
            <td></td>
            <td class="table-bg">企业组织机构代码</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">经营业户所在地行政区划代码</td>
            <td></td>
            <td class="table-bg">负责人姓名</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">经营许可证号</td>
            <td></td>
            <td class="table-bg">发证机关</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">经济类型</td>
            <td></td>
            <td class="table-bg">经营范围</td>
            <td></td>
          </tr>
           <tr>
            <td class="table-bg">有效期起</td>
            <td></td>
            <td class="table-bg">有效期止</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="table" v-if="activeName=='大件运输许可'">
        <table>
          <tr>
            <td class="table-bg"></td>
            <td></td>
            <td class="table-bg"></td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg"></td>
            <td></td>
            <td class="table-bg"></td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg"></td>
            <td></td>
            <td class="table-bg"></td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg"></td>
            <td></td>
            <td class="table-bg"></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="map" v-if="activeName=='行驶轨迹'">4</div>
      <div class="list" v-if="activeName=='违法记录'">5</div>
    </div>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
export default {
  data() {
    return {
      visible: false,
      activeName: '道路运输证',
      checkSearchForm: {
        number: '',
        color: ''
      }
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(data) {
      console.log(data);
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.checkSearchForm = {
        number: '',
        color: ''
      };
    },
    gotoCoerciveMeasureDoc() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'removeOrPrelong' })
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
  mounted() { }
};
</script>
<style lang="scss">
@import "@/assets/css/cluesReview.scss";
</style>
