webpackJsonp([44,60,67],{"+Jot":function(e,t){},"A+Mu":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});new(a("7+uW").default);function r(e,t,a){!/^1(3|4|5|6|7|8)\d{9}$/.test(t)&&t&&a(new Error("手机号格式错误")),a()}function s(e,t,a){!/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(t)&&t&&a(new Error("身份证格式错误")),a()}var i={data:function(){var e=this;return{depss:[],visible:!1,titleMap:{addEquipment:"新增用户",editEquipment:"编辑用户"},dialogStatus:"",parentNode:"",getOrganList:[],departments:[],addUserForm:{id:"",username:"",password:"123456",mobile:"",nickName:"",IDnumber:"",category:"",organId:"",organTitle:"",departmentId:"",departmentTitle:"",Provincial:"",Ministerial:"",Maritime:"",Other:""},rules:{username:[{required:!0,message:"请输入登录用户名",trigger:"blur"},{min:6,message:"长度大于6个字符",trigger:"blur"},{validator:function(t,a,r){e.$store.dispatch("hasUsername",a).then(function(e){r()}).catch(function(e){r("用户名重复")})},trigger:"blur"}],mobile:[{validator:r,trigger:"blur"}],organId:[{required:!0,message:"请选择机构",trigger:"change"}],IDnumber:[{validator:s,trigger:"blur"}]},rowData:""}},mounted:function(){},methods:{showModal:function(e){var t=this;this.visible=!0,this.dialogStatus="addEquipment",this.$nextTick(function(){t.$refs.addUserForm.resetFields()}),this.parentNode=e,this.getCurrentOrganAndChild()},closeDialog:function(){this.visible=!1,this.$refs.addUserForm.resetFields()},handelEdit:function(e){this.visible=!0,this.dialogStatus="editEquipment",this.parentNode={parentNodeId:e.organId,parentNodeName:e.userDeparment},this.getCurrentOrganAndChild(),this.rowData=e},getCurrentOrganAndChild:function(){var e=this;this.$store.dispatch("getCurrentAndNextOrgan",this.parentNode.parentNodeId).then(function(t){e.getOrganList=t.data},function(e){})},getDepartment:function(e){var t=this,a={organId:e};this.$store.dispatch("getDepartmentsNoPage",a).then(function(e){t.departments=e.data},function(e){})},save:function(){var e=this;this.$refs.addUserForm.validate(function(t){if(t)if("addEquipment"===e.dialogStatus)e.addUserForm,e.$store.dispatch("addUser",e.addUserForm).then(function(t){e.$message({showClose:!0,message:"新增用户成功",type:"success"}),e.visible=!1,e.$emit("uploadaaa","1")}).catch(function(t){e.$message({showClose:!0,message:t,type:"error"})});else if("editEquipment"===e.dialogStatus){e.addUserForm;e.addUserForm.id,e.addUserForm.username,e.addUserForm.mobile,e.addUserForm.nickName,e.addUserForm.IDnumber,e.addUserForm.category,e.addUserForm.organId,e.addUserForm.organTitle,e.addUserForm.departmentId,e.addUserForm.departmentTitle,e.addUserForm.Provincial,e.addUserForm.Ministerial,e.addUserForm.Maritime,e.addUserForm.Other;e.$store.dispatch("updateUser",e.addUserForm).then(function(t){e.$message({showClose:!0,message:"修改用户成功",type:"success"}),e.$emit("uploadaaa"),e.visible=!1}).catch(function(t){e.$message({showClose:!0,message:t,type:"error"})})}})},resetForm:function(){var e=this;this.visible=!1,this.$nextTick(function(){e.$refs.addUserForm.resetFields()})}},watch:{visible:function(e){!1===e&&(this.addUserForm={id:"",username:"",password:"",mobile:"",nickName:"",IDnumber:"",category:"",organId:"",organTitle:"",departmentId:"",departmentTitle:"",Provincial:"",Ministerial:"",Maritime:"",Other:""})}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.titleMap[e.dialogStatus],"custom-class":"leftDialog",visible:e.visible,top:"0",width:"40%","close-on-click-modal":!1},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"addUserForm",staticClass:"addOrganClass",attrs:{model:e.addUserForm,rules:e.rules,"label-width":"100px","close-on-click-modal":!1},on:{close:e.closeDialog}},[a("div",{staticClass:"part"},[a("p",{staticClass:"titleP"},[e._v("登录信息")]),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"登录用户名",prop:"username"}},[a("el-input",{ref:"username",attrs:{disabled:"editEquipment"===e.dialogStatus},model:{value:e.addUserForm.username,callback:function(t){e.$set(e.addUserForm,"username",t)},expression:"addUserForm.username"}})],1)],1)]),e._v(" "),a("div",{staticClass:"part"},[a("p",{staticClass:"titleP"},[e._v("基本信息")]),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"真实姓名"}},[a("el-input",{model:{value:e.addUserForm.nickName,callback:function(t){e.$set(e.addUserForm,"nickName",t)},expression:"addUserForm.nickName"}})],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"身份证号码",prop:"IDnumber"}},[a("el-input",{ref:"IDnumber",model:{value:e.addUserForm.IDnumber,callback:function(t){e.$set(e.addUserForm,"IDnumber",t)},expression:"addUserForm.IDnumber"}})],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"联系方式",prop:"mobile"}},[a("el-input",{ref:"mobile",model:{value:e.addUserForm.mobile,callback:function(t){e.$set(e.addUserForm,"mobile",t)},expression:"addUserForm.mobile"}})],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"执法门类"}},[a("el-input",{model:{value:e.addUserForm.category,callback:function(t){e.$set(e.addUserForm,"category",t)},expression:"addUserForm.category"}})],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"执法机构",prop:"organId"}},[a("el-select",{attrs:{placeholder:"请选择执法机构"},on:{change:e.getDepartment},model:{value:e.addUserForm.organId,callback:function(t){e.$set(e.addUserForm,"organId",t)},expression:"addUserForm.organId"}},e._l(e.getOrganList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"所属部门",prop:"departmentId"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addUserForm.departmentId,callback:function(t){e.$set(e.addUserForm,"departmentId",t)},expression:"addUserForm.departmentId"}},e._l(e.departments,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1)]),e._v(" "),a("div",{staticClass:"part"},[a("p",{staticClass:"titleP"},[e._v("证件信息")]),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"省级证件号"}},[a("el-input",{model:{value:e.addUserForm.Provincial,callback:function(t){e.$set(e.addUserForm,"Provincial",t)},expression:"addUserForm.Provincial"}})],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"部级证件号"}},[a("el-input",{model:{value:e.addUserForm.Ministerial,callback:function(t){e.$set(e.addUserForm,"Ministerial",t)},expression:"addUserForm.Ministerial"}})],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"海事证件号"}},[a("el-input",{model:{value:e.addUserForm.Maritime,callback:function(t){e.$set(e.addUserForm,"Maritime",t)},expression:"addUserForm.Maritime"}})],1)],1),e._v(" "),a("div",{staticClass:"item"},[a("el-form-item",{attrs:{label:"其他证件号"}},[a("el-input",{model:{value:e.addUserForm.Other,callback:function(t){e.$set(e.addUserForm,"Other",t)},expression:"addUserForm.Other"}})],1)],1)])]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.resetForm}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")])],1)],1)},staticRenderFns:[]},l=a("VU/8")(i,n,!1,null,null,null);t.default=l.exports},G4vk:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={data:function(){return{visible:!1,roleList:[],selectRoleList:[],userIds:""}},inject:["reload"],methods:{showModal:function(e){this.visible=!0;var t=e.organId;this.userIds=e.userIdList,this.getRoleList(t)},closeDialog:function(){this.visible=!1},getRoleList:function(e){var t=this;this.$store.dispatch("getOrganBindRole",e).then(function(e){e.data,t.roleList=e.data},function(e){})},bindRoleSure:function(){var e=this,t={userIds:this.userIds.join(","),roleIds:this.selectRoleList.join(",")};this.$store.dispatch("userBindRole",t).then(function(t){e.$message({showClose:!0,message:"绑定成功",type:"success"}),e.visible=!1,e.reload()},function(e){})},findBindRole:function(e){var t=this;this.$store.dispatch("queryUserBindRole",this.userId).then(function(e){e.data.forEach(function(e){t.selectRoleList.push(e.roleId)})},function(e){})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"角色绑定",visible:e.visible,"close-on-click-modal":!1,width:"35%"},on:{"update:visible":function(t){e.visible=t},close:e.closeDialog}},[a("el-checkbox-group",{model:{value:e.selectRoleList,callback:function(t){e.selectRoleList=t},expression:"selectRoleList"}},e._l(e.roleList,function(t,r){return a("el-checkbox",{key:r,attrs:{label:t.id}},[e._v(e._s(t.name))])}),1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.bindRoleSure()}}},[e._v("确 定")])],1)],1)},staticRenderFns:[]};var i=a("VU/8")(r,s,!1,function(e){a("pW91")},null,null);t.default=i.exports},QT8h:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("A+Mu"),s=a("G4vk"),i={watch:{filterText:function(e){this.$refs.tree.filter(e)}},data:function(){return{formInline:{nickName:"",enforceNo:"",username:"",mobile:""},searchType:[{value:0,label:"本机构"},{value:1,label:"本机构及子机构"}],filterText:"",selectCurrentTreeName:"机构人员列表",organData:[],defaultProps:{children:"children",label:"label"},tableData:[],departLevel:0,defaultExpandedKeys:[],currentPage:1,pageSize:10,totalPage:0,departments:[],currentOrganId:"",selectUserIdList:[]}},components:{addUser:r.default,bindRole:s.default},methods:{filterNode:function(e,t){return!e||-1!==t.label.indexOf(e)},handleNodeClick:function(e){this.selectCurrentTreeName=e.label,this.tableData=[],this.currentOrganId=e.id,this.currentOrganId,this.getUserList()},getAllOrgan:function(){var e=this;this.$store.dispatch("getAllOrgan").then(function(t){e.defaultExpandedKeys.push(t.data[0].id),t.data[0].children&&t.data[0].children.length>0&&t.data[0].children.forEach(function(t){e.defaultExpandedKeys.push(t.id)}),e.organData=t.data,e.defaultExpandedKeys,e.organData,e.currentOrganId=t.data[0].id,e.selectCurrentTreeName=t.data[0].label,e.getUserList()},function(e){})},getUserList:function(){var e=this;this.currentPage=1;var t={mobile:this.formInline.mobile,username:this.formInline.username,nickName:this.formInline.nickName,enforceNo:this.formInline.enforceNo,organId:this.currentOrganId,current:this.currentPage,size:this.pageSize,status:this.formInline.region};this.$store.dispatch("getUserList",t).then(function(t){e.totalPage=t.data.ipageList.total;var a=t.data.ipageList.records,r=t.data.userOtherInfoList;a.forEach(function(e){var t=[],a="",s="";r.forEach(function(r){e.id==r.userId&&(t.push(r.roleName),a=r.departmentTitle,s=r.organTitle)}),e.roleNames=t.join(","),e.userDeparment=a,e.userOrgan=s}),e.tableData=a})},handleSizeChange:function(e){this.pageSize=e,this.getUserList()},handleCurrentChange:function(e){this.currentPage=e,this.getUserList()},handleEdit:function(e,t){this.$refs.addUserRef.handelEdit(t)},handleDelete:function(e){var t=this;this.$confirm("确认删除该用户?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$store.dispatch("getUserdelete",e.id).then(function(e){t.getAllOrgan(t.$refs.addUserRef.id),t.$message({type:"success",message:"删除成功!"})},function(e){})}).catch(function(){})},Initialization:function(e){var t=this;this.$confirm("确认初始化密码?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$store.dispatch("getUserreset",e.id).then(function(e){t.getAllOrgan(t.$refs.addUserRef.id),t.$message({type:"success",message:"密码初始化成功!"})},function(e){})}).catch(function(){})},addUser:function(){var e={parentNodeId:this.currentOrganId,parentNodeName:this.selectCurrentTreeName};this.$refs.addUserRef.showModal(e)},bindRole:function(){if(this.selectUserIdList.length){var e={userIdList:this.selectUserIdList,organId:this.currentOrganId};this.$refs.bindRoleRef.showModal(e)}else this.$message("请选择用户")},selectUser:function(e){var t=this;this.selectUserIdList=[],e.forEach(function(e){t.selectUserIdList.push(e.id),t.selectUserIdList})}},mounted:function(){},created:function(){this.getAllOrgan()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"com_searchAndpageBoxPadding"},[a("div",{staticClass:"fullBox departBox",attrs:{id:"userBox"}},[a("div",{staticClass:"departOrUserTree"},[a("p",[e._v("机构列表")]),e._v(" "),a("el-input",{attrs:{placeholder:"输入机构名"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}},[a("el-button",{attrs:{slot:"append",size:"mini",icon:"el-icon-search"},slot:"append"})],1),e._v(" "),a("div",{staticClass:"treeBox"},[a("el-tree",{ref:"tree",staticClass:"filter-tree",attrs:{data:e.organData,props:e.defaultProps,"node-key":"id","default-expand-all":"","filter-node-method":e.filterNode},on:{"node-click":e.handleNodeClick},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node,s=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[a("i",{class:s.children?"iconfont law-icon_zhan_bag":""}),e._v("\n              "+e._s(r.label)+"\n            ")])])}}])})],1)],1),e._v(" "),a("div",{staticClass:"departTable"},[a("el-form",{attrs:{model:e.formInline,"label-width":"70px"}},[a("div",{staticClass:"userSearchPart"},[a("div",[a("el-form-item",{attrs:{label:"查询方法"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formInline.searchType1,callback:function(t){e.$set(e.formInline,"searchType1",t)},expression:"formInline.searchType1"}},e._l(e.searchType,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),a("div",[a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{model:{value:e.formInline.username,callback:function(t){e.$set(e.formInline,"username",t)},expression:"formInline.username"}})],1)],1),e._v(" "),a("div",[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{model:{value:e.formInline.nickName,callback:function(t){e.$set(e.formInline,"nickName",t)},expression:"formInline.nickName"}})],1)],1),e._v(" "),a("div",[a("el-form-item",{attrs:{label:"证件号"}},[a("el-input",{model:{value:e.formInline.enforceNo,callback:function(t){e.$set(e.formInline,"enforceNo",t)},expression:"formInline.enforceNo"}})],1)],1),e._v(" "),a("div",[a("el-form-item",{attrs:{label:"账户状态"}},[a("el-select",{staticStyle:{width:"120px"},model:{value:e.formInline.region,callback:function(t){e.$set(e.formInline,"region",t)},expression:"formInline.region"}},[a("el-option",{attrs:{label:"区域一",value:"shanghai"}}),e._v(" "),a("el-option",{attrs:{label:"区域二",value:"beijing"}})],1)],1)],1),e._v(" "),a("div",[a("el-button",{attrs:{type:"primary",size:"medium",icon:"el-icon-search"},on:{click:e.getUserList}},[e._v("查询")])],1)]),e._v(" "),a("div",{staticClass:"userSearchPart"},[a("div",[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.addUser}},[e._v("新增用户")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.bindRole}},[e._v("角色绑定")])],1),e._v(" "),a("div",[a("el-form-item",{attrs:{label:"联系电话"}},[a("el-input",{model:{value:e.formInline.mobile,callback:function(t){e.$set(e.formInline,"mobile",t)},expression:"formInline.mobile"}})],1)],1),e._v(" "),a("p",[e._v("人员列表")])])]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:"",height:"70%"},on:{"selection-change":e.selectUser}},[a("el-table-column",{attrs:{type:"selection",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"username",label:"用户名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"enforceNo",label:"执法证号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"mobile",label:"联系电话"}}),e._v(" "),a("el-table-column",{attrs:{prop:"roleNames",label:"角色"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userOrgan",label:"所属机构"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userDeparment",label:"所属部门"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v(e._s(0===t.row.status?"正常":-1===t.row.status?"拉黑":"待激活"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"230",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.Initialization(t.row)}}},[e._v("初始化")])]}}])})],1),e._v(" "),a("div",{staticClass:"paginationBox"},[a("el-pagination",{attrs:{"current-page":e.currentPage,background:"","page-sizes":[10,20,30,40],layout:"prev, pager, next,sizes,jumper",total:e.totalPage},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("addUser",{ref:"addUserRef",on:{uploadaaa:function(t){return e.getUserList()}}}),e._v(" "),a("bindRole",{ref:"bindRoleRef"})],1)])},staticRenderFns:[]};var l=a("VU/8")(i,n,!1,function(e){a("+Jot")},null,null);t.default=l.exports},pW91:function(e,t){}});
//# sourceMappingURL=44.d3c28b50037f0f99569d.js.map