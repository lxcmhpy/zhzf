<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
    append-to-body
  >
    <el-form :model="cblCyForm" :rules="rules" ref="cblCyForm" class="errorTipForm">
        <div align="center">
            <table class="tg" style="width:900px;">
                <tr>
                    <td class="tg-0lax" colspan="6">基本信息</td>
                </tr>
                <tr>
                    <td class="tg-0pky" style="width:120px;">中文船名</td>
                    <td class="tg-0pky" style="width:220px;">{{cblCyForm.CHUANJI}</td>
                    <td class="tg-0pky" style="width:120px;">英文船名</td>
                    <td class="tg-0pky" colspan="3"></td>
                </tr>
                <tr>
                    <td class="tg-0pky">船舶识别号</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky">IMO编号</td>
                    <td class="tg-0pky" colspan="3">{{cblCyForm.IMOHAO}}</td>
                </tr>
                <tr>
                    <td class="tg-0pky">初次登记号</td>
                    <td class="tg-0pky">{{cblCyForm.CHUANBODENGJIHAO}}</td>
                    <td class="tg-0pky">MMSI编号</td>
                    <td class="tg-0pky" colspan="3"></td>
                </tr>
                <tr>
                    <td class="tg-0pky">船籍港名称</td>
                    <td class="tg-0pky">{{cblCyForm.CHUANJIGANG}}</td>
                    <td class="tg-0pky">船籍港代码</td>
                    <td class="tg-0pky" colspan="3"></td>
                </tr>
                <tr>
                    <td class="tg-0pky">船舶种类名称</td>
                    <td class="tg-0pky">{{cblCyForm.CHUANBOLEIXING}</td>
                    <td class="tg-0pky">船舶种类代码</td>
                    <td class="tg-0pky" colspan="3">{{cblCyForm.CHUANBOLEIXING}}</td>
                </tr>
                <tr>
                    <td class="tg-0pky">船舶总长</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky">型宽</td>
                    <td class="tg-0pky" style="width:120px;"></td>
                    <td class="tg-0pky" style="width:100px;">型深</td>
                    <td class="tg-0pky"></td>
                </tr>
                <tr>
                    <td class="tg-0pky">总吨</td>
                    <td class="tg-0pky">{{cblCyForm.CHUANBOZONGDUN}}</td>
                    <td class="tg-0pky">净吨</td>
                    <td class="tg-0pky">{{cblCyForm.ZAIXIANGDINGE}}</td>
                    <td class="tg-0pky">参考载重吨</td>
                    <td class="tg-0pky">{{cblCyForm.ZAIZHONGDUN}}</td>
                </tr>
                <tr>
                    <td class="tg-0pky">船舶所有人名称</td>
                    <td class="tg-0pky">{{cblCyForm.CHUANBOSUOYOUREN}}</td>
                    <td class="tg-0pky">船舶经营人名称</td>
                    <td class="tg-0pky" colspan="3">{{cblCyForm.CHUANBOJINGYINGREN}}</td>
                </tr>
                <tr>
                    <td class="tg-0lax" colspan="6"><span style="font-weight:700">其他信息</span></td>
                </tr>
                <tr>
                    <td class="tg-0pky">船舶呼号</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky">核定抗风等级</td>
                    <td class="tg-0pky">{{cblCyForm.JINGYINGRENXUKEZHENGHAOMA}}</td>
                    <td class="tg-0pky">夏季满载吃水</td>
                    <td class="tg-0pky"></td>
                </tr>
                <tr>
                    <td class="tg-0pky">货舱数量</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky">压载舱数</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky">水密横舱壁数</td>
                    <td class="tg-0pky"></td>
                </tr>
                <tr>
                    <td class="tg-0pky">最小干舷</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky">甲板层数</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky"></td>
                </tr>
                <tr>
                    <td class="tg-0pky">主机数量</td>
                    <td class="tg-0pky">{{cblCyForm.ZHUJISHULIANG}}</td>
                    <td class="tg-0pky">主机功率</td>
                    <td class="tg-0pky">{{cblCyForm.ZHUJIGONGLU}}</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky"></td>
                </tr>
                <tr>
                    <td class="tg-0pky">主机编号</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky">主机型号</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky"></td>
                </tr>
            </table>
        </div>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      cblCyForm: {
      },
      dialogTitle: "",
    };
  },
  methods: {
    shipLookLook(data) {
      this.visible = true;
      this.dialogTitle = "船舶详情";
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["cblCyForm"].resetFields();
    },
  }
};
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:16px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-0pky{border-color:inherit;text-align:center;vertical-align:center;height: 25px;}
.tg .tg-0lax{background-color:#c0c0c0;border-color:inherit;font-size:20px;text-align:left;vertical-align:center;height: 30px;}
</style>
