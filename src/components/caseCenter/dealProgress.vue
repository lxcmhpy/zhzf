<template>
  <div class="table-style">
    <div class="shadow-box bg-white">
      <div class="info-box">
        <div class="title-box">
          <span class="title-blue"></span>
          <span class="title-text">执行情况</span>
              <el-button type="primary" style="float:right;margin-bottom:5px">查看</el-button>
        </div>
        <table>
          <tr>
            <td class="table-bg">案由</td>
            <td></td>
            <td class="table-bg">案号</td>
            <td class="search-tr">
              <span class="search-text"></span>
              <!-- <el-button type="primary" style="position:absolute;right:-100px;top: 130px;">查看</el-button> -->
            </td>
          </tr>

          <tr>
            <td class="table-bg">立案时间</td>
            <td></td>
            <td class="table-bg">立案机构</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-bg">执法人员</td>
            <td></td>
            <td class="table-bg">结案时间</td>
            <td></td>
          </tr>
        </table>
      </div>

    </div>

  </div>
</template>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
