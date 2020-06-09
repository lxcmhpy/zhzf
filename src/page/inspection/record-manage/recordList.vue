<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="roleBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="searchForm" class>
            <el-form-item label="业务领域">
              <el-input v-model="searchForm.domain" placeholder="输入业务领域"></el-input>
            </el-form-item>
            <el-form-item label="检查类型">
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="处置情况">
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="发起时间">
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="关键字词">
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTableData">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTableData">生成日志</el-button>
            </el-form-item>
            <el-form-item>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="createTime" label="填报时间  " align="center"></el-table-column>
          <el-table-column prop="domain" label="业务领域" align="center"></el-table-column>
          <el-table-column prop="" label="日志类型" align="center"></el-table-column>
          <el-table-column prop="" label="执法机构" align="center"></el-table-column>
          <el-table-column prop="" label="执法人员" align="center"></el-table-column>
          <!-- <el-table-column prop="" label="创建人" align="center"></el-table-column> -->
          <el-table-column prop="" label="交接班" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="viewRecord(scope.row)" type="text">查看</el-button>
              <el-button @click="editRecord(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="deleteRecord(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
import { findRecordListApi, removeRecordByIdApi, findRecordModleByIdApi, findRecordModleTimeByIdApi } from "@/api/Record";
export default {
  data() {
    return {
      tableData: [], //表格数据
      multipleSelection: [],
      searchForm: {
        domain: "",
        name: ''
      },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数


    }
  },
  methods: {
    getTableData() {
      let data = {
        domain: this.searchForm.domain,
        current: this.currentPage,
        size: this.pageSize,
        // name: this.dicSearchForm.name
      };
      // findRecordListApi(data).then(
      //   res => {
      //     console.log(res)
          let res = {
            "code": 200,
            "msg": "操作成功",
            "data": {
              "records": [
                {
                  "id": "b8a47e287bd9f606b27e7a19d9a64255",
                  "status": null,
                  "domain": "道路运政",
                  "type": "记录",
                  "category": null,
                  "createTime": "2020-06-08 16:55:00",
                  "createUser": "admin1",
                  "updateTime": "2020-06-08 16:55:00",
                  "flag": 0,
                  "templateId": "3e0f85632d404d8fb2831856ea798a7f",
                  "title": "自定义模板",
                  "layout": "[{\"classId\":\"78e9021b974f4deabec246c558fde8ed\",\"classs\":\"自定义组\",\"expand\":false,\"fieldList\":[{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K0\",\"id\":\"8c2861a2a3af9ed77a60d5661a54b015\",\"options\":\"[{\\\"value\\\":\\\"yyyy-MM-dd HH:mm\\\"}]\",\"options1\":[{\"value\":\"yyyy-MM-dd HH:mm\"}],\"remark\":\"请选择\",\"required\":\"true\",\"sort\":0,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"2020-06-08 16:54\",\"title\":\"自定义日期\",\"type\":\"日期型\"},{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K1\",\"id\":\"07e142706593a295a567a43875ffa447\",\"options\":\"[{\\\"value\\\":\\\"抽屉1\\\"},{\\\"value\\\":\\\"抽屉二\\\"},{\\\"value\\\":\\\"抽屉三\\\"}]\",\"options1\":[{\"value\":\"抽屉1\"},{\"value\":\"抽屉二\"},{\"value\":\"抽屉三\"}],\"remark\":\"请选择\",\"required\":\"false\",\"sort\":1,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"抽屉1\",\"title\":\"单选字段\",\"type\":\"单选型\"},{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K2\",\"id\":\"1be6c61455c3705ce52c0d95a198f190\",\"options\":\"[{\\\"value\\\":\\\"抽屉\\\"},{\\\"value\\\":\\\"抽屉2\\\"},{\\\"value\\\":\\\"抽个三\\\"}]\",\"options1\":[{\"value\":\"抽屉\"},{\"value\":\"抽屉2\"},{\"value\":\"抽个三\"}],\"remark\":\"请选择\",\"required\":\"true\",\"sort\":2,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"抽屉2\",\"title\":\"复选字段\",\"type\":\"复选型\"},{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K3\",\"id\":\"be329f41745b1a03ec1734cb78251bc8\",\"options\":\"[]\",\"options1\":[],\"remark\":\"请输入\",\"required\":\"true\",\"sort\":3,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"23\",\"title\":\"数字字段\",\"type\":\"数字型\"},{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K4\",\"id\":\"b95ed2ac854d5141c00d43d5ab3f2a72\",\"options\":\"[]\",\"options1\":[],\"remark\":\"请输入\",\"required\":\"false\",\"sort\":4,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"12\",\"title\":\"文本字段\",\"type\":\"文本型\"}],\"sort\":0}]",
                  "objectType": null,
                  "bindId": null
                },
                {
                  "id": "1a1607044f9f14edd8fee86a2c5fcef9",
                  "status": null,
                  "domain": "道路运政",
                  "type": "记录",
                  "category": null,
                  "createTime": "2020-06-08 16:28:53",
                  "createUser": "admin1",
                  "updateTime": "2020-06-08 16:28:53",
                  "flag": 0,
                  "templateId": "3e0f85632d404d8fb2831856ea798a7f",
                  "title": "自定义模板",
                  "layout": "[{\"classId\":\"78e9021b974f4deabec246c558fde8ed\",\"classs\":\"自定义组\",\"expand\":false,\"fieldList\":[{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K0\",\"id\":\"8c2861a2a3af9ed77a60d5661a54b015\",\"options\":\"[{\\\"value\\\":\\\"yyyy-MM-dd HH:mm\\\"}]\",\"options1\":[{\"value\":\"yyyy-MM-dd HH:mm\"}],\"remark\":\"请选择\",\"required\":\"true\",\"sort\":0,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"2020-06-08 16:28\",\"title\":\"自定义日期\",\"type\":\"日期型\"},{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K1\",\"id\":\"07e142706593a295a567a43875ffa447\",\"options\":\"[{\\\"value\\\":\\\"抽屉1\\\"},{\\\"value\\\":\\\"抽屉二\\\"},{\\\"value\\\":\\\"抽屉三\\\"}]\",\"options1\":[{\"value\":\"抽屉1\"},{\"value\":\"抽屉二\"},{\"value\":\"抽屉三\"}],\"remark\":\"请选择\",\"required\":\"false\",\"sort\":1,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"抽屉二\",\"title\":\"单选字段\",\"type\":\"单选型\"},{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K2\",\"id\":\"1be6c61455c3705ce52c0d95a198f190\",\"options\":\"[{\\\"value\\\":\\\"抽屉\\\"},{\\\"value\\\":\\\"抽屉2\\\"},{\\\"value\\\":\\\"抽个三\\\"}]\",\"options1\":[{\"value\":\"抽屉\"},{\"value\":\"抽屉2\"},{\"value\":\"抽个三\"}],\"remark\":\"请选择\",\"required\":\"true\",\"sort\":2,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"抽屉,抽屉2,抽个三\",\"title\":\"复选字段\",\"type\":\"复选型\"},{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K3\",\"id\":\"be329f41745b1a03ec1734cb78251bc8\",\"options\":\"[]\",\"options1\":[],\"remark\":\"请输入\",\"required\":\"true\",\"sort\":3,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"23\",\"title\":\"数字字段\",\"type\":\"数字型\"},{\"createTime\":\"2020-06-08 16:27:41\",\"field\":\"K4\",\"id\":\"b95ed2ac854d5141c00d43d5ab3f2a72\",\"options\":\"[]\",\"options1\":[],\"remark\":\"请输入\",\"required\":\"false\",\"sort\":4,\"status\":\"1\",\"templateId\":\"3e0f85632d404d8fb2831856ea798a7f\",\"text\":\"文本\",\"title\":\"文本字段\",\"type\":\"文本型\"}],\"sort\":0}]",
                  "objectType": null,
                  "bindId": null
                },
                {
                  "id": "e20d47afbbfbfb7d7e7f396081a8ee8a",
                  "status": null,
                  "domain": "公路路政",
                  "type": "记录",
                  "category": null,
                  "createTime": "2020-06-08 15:45:14",
                  "createUser": "admin1",
                  "updateTime": "2020-06-08 17:17:10",
                  "flag": 0,
                  "templateId": "8722ffea181f4363af43164669d78c3b",
                  "title": "各种字段类型测试",
                  "layout": "[{\"classId\":\"7c61827ed4164fd5afbb76d0b77e8d7e\",\"classs\":\"类型\",\"expand\":false,\"fieldList\":[{\"createTime\":\"2020-06-08 15:27:38\",\"field\":\"key0\",\"id\":\"c80132b66d779fba2b354a0f2b5904e2\",\"options\":\"[{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"}]\",\"options1\":[],\"remark\":\"请问请问\",\"required\":\"true\",\"sort\":7,\"status\":\"1\",\"templateId\":\"8722ffea181f4363af43164669d78c3b\",\"text\":\"21\",\"title\":\"姓名\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-08 15:27:38\",\"field\":\"key1\",\"id\":\"45b8b6e654cfb7201b3af8220dbe5c0e\",\"options\":\"[{\\\"value\\\":\\\"yyyy-MM-dd HH:mm:ss\\\"}]\",\"options1\":[{\"value\":\"yyyy-MM-dd HH:mm:ss\"}],\"remark\":\"驱蚊器\",\"required\":\"false\",\"sort\":8,\"status\":\"1\",\"templateId\":\"8722ffea181f4363af43164669d78c3b\",\"text\":\"2020-06-08 15:45:11\",\"title\":\"日期\",\"type\":\"日期型\"},{\"createTime\":\"2020-06-08 15:27:38\",\"field\":\"key2\",\"id\":\"78d65ff2432d76ebe691a1579a5be29e\",\"options\":\"[{\\\"value\\\":\\\"yyyy-MM-dd HH:mm\\\"}]\",\"options1\":[{\"value\":\"yyyy-MM-dd HH:mm\"}],\"remark\":\"七二\",\"required\":\"false\",\"sort\":9,\"status\":\"1\",\"templateId\":\"8722ffea181f4363af43164669d78c3b\",\"text\":\"2020-06-08 15:45\",\"title\":\"日期2\",\"type\":\"日期型\"},{\"createTime\":\"2020-06-08 15:27:38\",\"field\":\"key3\",\"id\":\"a33dd4c6d6ffd19a6f0b8ad4f854cf85\",\"options\":\"[{\\\"value\\\":\\\"yyyy-MM-dd\\\"}]\",\"options1\":[{\"value\":\"yyyy-MM-dd\"}],\"remark\":\"卫栖梧\",\"required\":\"false\",\"sort\":10,\"status\":\"1\",\"templateId\":\"8722ffea181f4363af43164669d78c3b\",\"text\":\"2020-06-08\",\"title\":\"日期3\",\"type\":\"日期型\"},{\"createTime\":\"2020-06-08 15:27:38\",\"field\":\"key4\",\"id\":\"e15d9542dce19865ee2cd1afe4de5c3a\",\"options\":\"[{\\\"value\\\":\\\"HH:mm\\\"}]\",\"options1\":[{\"value\":\"HH:mm\"}],\"remark\":\"且\",\"required\":\"false\",\"sort\":11,\"status\":\"1\",\"templateId\":\"8722ffea181f4363af43164669d78c3b\",\"text\":\"15:45\",\"title\":\"日期4\",\"type\":\"日期型\"},{\"createTime\":\"2020-06-08 15:27:38\",\"field\":\"key5\",\"id\":\"0946d44b7a8ba1b5625c61acf99563a9\",\"options\":\"[{\\\"value\\\":\\\"1\\\"},{\\\"value\\\":\\\"3\\\"},{\\\"value\\\":\\\"似懂非懂\\\"},{\\\"value\\\":\\\"晴儿晴儿\\\"}]\",\"options1\":[{\"value\":\"1\"},{\"value\":\"3\"},{\"value\":\"似懂非懂\"},{\"value\":\"晴儿晴儿\"}],\"remark\":\"沃尔夫\",\"required\":\"false\",\"sort\":12,\"status\":\"1\",\"templateId\":\"8722ffea181f4363af43164669d78c3b\",\"text\":\"晴儿晴儿\",\"title\":\"单选\",\"type\":\"单选型\"},{\"createTime\":\"2020-06-08 15:27:38\",\"field\":\"key6\",\"id\":\"71e5e7f30767e46007ae9da7359909e5\",\"options\":\"[{\\\"value\\\":\\\"请问\\\"},{\\\"value\\\":\\\"232\\\"},{\\\"value\\\":\\\"二个\\\"},{\\\"value\\\":\\\"七二跟前儿\\\"}]\",\"options1\":[{\"value\":\"请问\"},{\"value\":\"232\"},{\"value\":\"二个\"},{\"value\":\"七二跟前儿\"}],\"remark\":\"为二位\",\"required\":\"false\",\"sort\":13,\"status\":\"1\",\"templateId\":\"8722ffea181f4363af43164669d78c3b\",\"text\":\"232,二个,七二跟前儿\",\"title\":\"多选\",\"type\":\"复选型\"}],\"sort\":0}]",
                  "objectType": null,
                  "bindId": null
                },
                {
                  "id": "ecf031021a15a22fcb859f22bc60104b",
                  "status": null,
                  "domain": "公路路政",
                  "type": "记录",
                  "category": null,
                  "createTime": "2020-06-08 15:14:29",
                  "createUser": "ceshiyixia",
                  "updateTime": "2020-06-08 15:14:29",
                  "flag": 0,
                  "templateId": "30c56a1ea2d54a5f99e08f8380686f38",
                  "title": "pc测试-bug",
                  "layout": "[{\"classId\":\"e779b98dda124b728c6f4b104dc4d3e5\",\"classs\":\"车辆信息\",\"sort\":\"0\",\"fieldList\":[{\"id\":\"73ae4344f9c73c854ae7893071f78a6f\",\"templateId\":\"30c56a1ea2d54a5f99e08f8380686f38\",\"parent\":null,\"title\":\"车牌号码\",\"field\":\"vehicleShipId\",\"type\":\"文本型\",\"required\":\"true\",\"options\":null,\"expression\":null,\"createTime\":\"2020-06-05 10:03:31\",\"sort\":2,\"remark\":null,\"status\":0,\"classId\":\"e779b98dda124b728c6f4b104dc4d3e5\",\"text\":\"12\"},{\"id\":\"87afc0be6eb9a80b00cf6d09ccd918c3\",\"templateId\":\"30c56a1ea2d54a5f99e08f8380686f38\",\"parent\":null,\"title\":\"道路运输证号\",\"field\":\"ccertId\",\"type\":\"文本型\",\"required\":\"true\",\"options\":null,\"expression\":null,\"createTime\":\"2020-06-05 10:03:31\",\"sort\":3,\"remark\":null,\"status\":0,\"classId\":\"e779b98dda124b728c6f4b104dc4d3e5\",\"text\":\"21\"},{\"id\":\"98a947c7efb05082114167f1c99b08d7\",\"templateId\":\"30c56a1ea2d54a5f99e08f8380686f38\",\"parent\":null,\"title\":\"车牌颜色\",\"field\":\"vehicleIdColor\",\"type\":\"单选型\",\"required\":\"true\",\"options\":\"[{\\\"value\\\":\\\"黄色\\\"},{\\\"value\\\":\\\"蓝色\\\"},{\\\"value\\\":\\\"绿色\\\"},{\\\"value\\\":\\\"黄绿\\\"},{\\\"value\\\":\\\"黑色\\\"},{\\\"value\\\":\\\"白色\\\"},{\\\"value\\\":\\\"其他\\\"}]\",\"expression\":null,\"createTime\":\"2020-06-05 10:03:31\",\"sort\":4,\"remark\":null,\"status\":0,\"classId\":\"e779b98dda124b728c6f4b104dc4d3e5\",\"text\":\"黄色\"},{\"id\":\"53ff14b6780261b5a210a597a204107d\",\"templateId\":\"30c56a1ea2d54a5f99e08f8380686f38\",\"parent\":null,\"title\":\"车辆类型\",\"field\":\"vehicleShipType\",\"type\":\"单选型\",\"required\":\"true\",\"options\":\"[{\\\"value\\\":\\\"中小客车\\\"},{\\\"value\\\":\\\"大客车\\\"},{\\\"value\\\":\\\"小型货车\\\"},{\\\"value\\\":\\\"中型货车\\\"},{\\\"value\\\":\\\"大型货车\\\"},{\\\"value\\\":\\\"特大型货车\\\"},{\\\"value\\\":\\\"集装箱车\\\"},{\\\"value\\\":\\\"摩托车\\\"}]\",\"expression\":null,\"createTime\":\"2020-06-05 10:03:31\",\"sort\":5,\"remark\":null,\"status\":0,\"classId\":\"e779b98dda124b728c6f4b104dc4d3e5\",\"text\":\"中小客车\"}]},{\"classId\":\"9a4bfeb016c940bf9d67cc597a18f546\",\"classs\":\"zidngy \",\"sort\":\"1\",\"fieldList\":[{\"id\":\"459d644edcdfbfb3c56347408eca2a43\",\"templateId\":\"30c56a1ea2d54a5f99e08f8380686f38\",\"parent\":null,\"title\":\"we\",\"field\":\"key1\",\"type\":\"文本型\",\"required\":\"false\",\"options\":\"[{\\\"value\\\":\\\"\\\"}]\",\"expression\":null,\"createTime\":\"2020-06-05 10:03:32\",\"sort\":6,\"remark\":null,\"status\":1,\"classId\":\"9a4bfeb016c940bf9d67cc597a18f546\",\"text\":\"12\"},{\"id\":\"e31a3dcddb7d556b6276c46f02320e1d\",\"templateId\":\"30c56a1ea2d54a5f99e08f8380686f38\",\"parent\":null,\"title\":\"fg\",\"field\":\"key2\",\"type\":\"文本型\",\"required\":\"false\",\"options\":\"[{\\\"value\\\":\\\"\\\"}]\",\"expression\":null,\"createTime\":\"2020-06-05 10:03:32\",\"sort\":7,\"remark\":null,\"status\":1,\"classId\":\"9a4bfeb016c940bf9d67cc597a18f546\",\"text\":\"21\"}]}]",
                  "objectType": null,
                  "bindId": null
                },
                {
                  "id": "f68c4f421c4007d213be63c50ba7fd09",
                  "status": null,
                  "domain": "道路运政",
                  "type": "记录",
                  "category": null,
                  "createTime": "2020-06-08 14:52:19",
                  "createUser": "admin1",
                  "updateTime": "2020-06-08 14:55:47",
                  "flag": 0,
                  "templateId": "20d6cd519adb49b5988447e0e1877dde",
                  "title": "顶一下",
                  "layout": "[{\"classId\":\"01ddd5a184fa416e90ec925696659329\",\"classs\":\"个人\",\"expand\":false,\"fieldList\":[{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"party\",\"id\":\"bc4ed20607701757d81d926a06a3b10c\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":4,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"张三\",\"title\":\"当事人姓名\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"partyIdType\",\"id\":\"a4d2fbf7c68a207df3eeef31334c7e2b\",\"options\":\"[{\\\"value\\\":\\\"身份证\\\"},{\\\"value\\\":\\\"护照\\\"}]\",\"options1\":[{\"value\":\"身份证\"},{\"value\":\"护照\"}],\"required\":\"true\",\"sort\":5,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"身份证\",\"title\":\"证件类型\",\"type\":\"单选型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"partyIdNo\",\"id\":\"4ea3c785785f12887c4756597fef3093\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":6,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"123456\",\"title\":\"证件号码\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"partyTel\",\"id\":\"7d88469d6802478d30a8bab0d6653279\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":7,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"12345\",\"title\":\"联系方式\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"partyEcertId\",\"id\":\"a718929a472f944adb93679f7b6d60f8\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":8,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"12345\",\"title\":\"从业资格证号\",\"type\":\"文本型\"}],\"sort\":1},{\"classId\":\"b84a92f10f914c09aa72f3783b015fa9\",\"classs\":\"法人\",\"expand\":false,\"fieldList\":[{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"partyName\",\"id\":\"dfad41201a44f461526833a369c70d9c\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":9,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"title\":\"企业名称\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"partyUnitTel\",\"id\":\"c74e14bceb5537f4453ef2c853b9e6ed\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":10,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"title\":\"企业联系方式\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"partyManager\",\"id\":\"d526919c6e1ed7664b9f4f644319ecb0\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":11,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"title\":\"企业联系人姓名\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"socialCreditCode\",\"id\":\"fc91794944bd63775a42f88441ad4a3b\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":12,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"title\":\"统一社会信用代码\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"roadTransportLicense\",\"id\":\"81fcebb3c626f4456e375e0285284a7e\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":13,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"title\":\"道路经营许可证\",\"type\":\"文本型\"}],\"sort\":2},{\"classId\":\"92c22e9dc09d4ea098fcb20d4d62886f\",\"classs\":\"车辆信息\",\"expand\":false,\"fieldList\":[{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"vehicleShipId\",\"id\":\"1bdb5396b043db4bab172672e322e0de\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":0,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"123456\",\"title\":\"车牌号码\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"ccertId\",\"id\":\"6ceacad55e4ee43833384db5a3329ac0\",\"options\":\"[]\",\"options1\":[],\"required\":\"true\",\"sort\":1,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"456\",\"title\":\"道路运输证号\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"vehicleIdColor\",\"id\":\"ad21c2ac252dbede63803db494672042\",\"options\":\"[{\\\"value\\\":\\\"黄色\\\"},{\\\"value\\\":\\\"蓝色\\\"},{\\\"value\\\":\\\"绿色\\\"},{\\\"value\\\":\\\"黄绿\\\"},{\\\"value\\\":\\\"黑色\\\"},{\\\"value\\\":\\\"白色\\\"},{\\\"value\\\":\\\"其他\\\"}]\",\"options1\":[{\"value\":\"黄色\"},{\"value\":\"蓝色\"},{\"value\":\"绿色\"},{\"value\":\"黄绿\"},{\"value\":\"黑色\"},{\"value\":\"白色\"},{\"value\":\"其他\"}],\"required\":\"true\",\"sort\":2,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"黄绿\",\"title\":\"车牌颜色\",\"type\":\"单选型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"vehicleShipType\",\"id\":\"abeee1e123430df1aaee8179cddacc63\",\"options\":\"[{\\\"value\\\":\\\"中小客车\\\"},{\\\"value\\\":\\\"大客车\\\"},{\\\"value\\\":\\\"小型货车\\\"},{\\\"value\\\":\\\"中型货车\\\"},{\\\"value\\\":\\\"大型货车\\\"},{\\\"value\\\":\\\"特大型货车\\\"},{\\\"value\\\":\\\"集装箱车\\\"},{\\\"value\\\":\\\"摩托车\\\"}]\",\"options1\":[{\"value\":\"中小客车\"},{\"value\":\"大客车\"},{\"value\":\"小型货车\"},{\"value\":\"中型货车\"},{\"value\":\"大型货车\"},{\"value\":\"特大型货车\"},{\"value\":\"集装箱车\"},{\"value\":\"摩托车\"}],\"required\":\"true\",\"sort\":3,\"status\":\"0\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"大型货车\",\"title\":\"车辆类型\",\"type\":\"单选型\"}],\"sort\":0},{\"classId\":\"77ff751b4a6f44a7b2e9d3ccc9e0ec8d\",\"classs\":\"自定义组\",\"expand\":false,\"fieldList\":[{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"K3\",\"id\":\"4c2ee3c542e75636b15b3d18b5831361\",\"options\":\"[]\",\"options1\":[],\"remark\":\"请输入\",\"required\":\"false\",\"sort\":14,\"status\":\"1\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"自定义字段\",\"title\":\"自定义字段\",\"type\":\"文本型\"},{\"createTime\":\"2020-06-05 19:00:17\",\"field\":\"K3\",\"id\":\"b9e01dfcb499d09b2eb34165a581f0f7\",\"options\":\"[{\\\"value\\\":\\\"yyyy-MM-dd HH:mm:ss\\\"}]\",\"options1\":[{\"value\":\"yyyy-MM-dd HH:mm:ss\"}],\"remark\":\"请选择\",\"required\":\"false\",\"sort\":15,\"status\":\"1\",\"templateId\":\"20d6cd519adb49b5988447e0e1877dde\",\"text\":\"2020-06-08 14:55:41\",\"title\":\"时间字段\",\"type\":\"日期型\"}],\"sort\":3}]",
                  "objectType": "个人",
                  "bindId": null
                }
              ],
              "total": 5,
              "size": 10,
              "current": 1,
              "orders": [],
              "searchCount": true,
              "pages": 1
            }
          }
          this.tableData = res.data.records
          this.totalPage = res.data.total
        // },
        // error => {
        //   // reject(error);
        // })

    },
    // 查询
    searchTableData() {
      this.currentPage = 1;
      this.getTableData()
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
    // 查看
    viewRecord(row) {
      this.$router.push({
        name: 'inspection_writeRecordInfo',
        params: row
      });
    },
    // 修改
    editRecord(row) {
      let _this = this
      let list = []
      console.log('编辑', row)
      findRecordModleTimeByIdApi(row.templateId).then(
        res => {
          if (res.code == 200) {
            console.log('row.createTime <= res.data', row.createTime, res.data)
            if (row.createTime >= res.data) {
              // 写记录
              row.addOrEiditFlag = 'edit'
              this.$router.push({
                name: 'inspection_writeRecordInfo',
                params: row
              });
            } else {
              this.$message.error('当前模板已修改，该记录不可修改');
            }
          } else {
            this.$message.error(res.msg);
          }
        },
        error => {

        })

    },
    // 删除
    deleteRecord(id) {
      console.log('选中的模板', id)
      this.$confirm('确认删除？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log('删除', id)
        removeRecordByIdApi(id).then(
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
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('multipleSelection', this.multipleSelection)
    }
  },
  mounted() {
    this.getTableData()
  }
}
</script>