<template>
  <div class="entry-exam">
    <div class="page-contain">
      <el-card class="box-card count-card">
        <p class="name">交通运输工程监理工程师执业资格</p>
        <div class="time">16分24秒后可进入</div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.entry-exam{
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../../../../static/images/img/exam/page_top.png') no-repeat;
  background-size: 32%;
  overflow: scroll;
}
.page-contain{
  position: relative;
  height: 100%;
  overflow: hidden;
  min-height: 400px;
  background: url('../../../../static/images/img/exam/count_down_bottom.png') no-repeat;
  background-position-y: bottom;
  background-position-x: right;
  background-size: 58%;
  .count-card{
    width: 40%;
    margin: 4% auto 0;
    .name{
      font-size:32px;
      font-weight:600;
      color:rgba(32,35,42,1);
      margin: 80px auto 40px;
      text-align: center;
    }
    .time{
      width: 196px;
      height: 52px;
      line-height: 52px;
      text-align: center;
      background:rgba(201,201,201, .25);
      margin: 20px auto;
      font-size: 16px;
      color:rgba(69,115,208,1);
    }
  }
}
</style>
