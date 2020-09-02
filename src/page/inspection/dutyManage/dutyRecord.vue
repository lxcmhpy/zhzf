<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox">
      <div class="handlePart">
        记录管理
      </div>
      <div class="tableHandle"></div>
      <div class="tablePart"></div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
    };
  },
  components: {  },
  created() {
  },
  methods: {
  }
};
</script>

<style  lang="scss" scoped>
.search-form {
  >>> .el-input,
  >>> .el-select {
    width: 180px;
    margin-right: 0;
  }
}
>>> .el-select {
  margin-right: 0;
}
.person-table {
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
}
.tableHandle {
  margin-bottom: 10px;
}
</style>
