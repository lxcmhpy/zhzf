
import { PersonRouter } from '@/router/routerExport/routerJson/personRouterJson';

//公共方法
export const mixinPerson={
  //通用数据
  data(){
    return {
      currentPage: 1, //当前页
      pageSize: 10,   //pagesize
      totalPage: 0,   //总页数
      tableData: [],  //列表数据
      tableLoading: false // 列表数据加载
    }
  },
  methods: {
    searchTable() {//查询当前用户下的所有机构
      let _this = this
      _this.$store.dispatch("findOrganTreeByCurrUser").then(
        res => {
        _this.tableDataTree = res.data;
      },
      err => {
        console.log(err);
      });
    },
    //查询岗位,stationInfo定义页面存储查询到岗位列表数据
    getStationInfo(){
      this.$store.dispatch("findStation","").then(
      res=>{
        if(res.code===200){
          this.stationInfo=res.data;
        }
      },err => {
          console.log(err);
        }
      ).catch(()=>{});
    },
    //页面列表，性别翻译
    sexFormat(row) {
      if (row.sex === '0') {
        return '男'
      } else if (row.sex === '1') {
        return '女'
      } 
    },
    //根据ids删除
    deleteByIds(methodName,ids){
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'el-icon-question',
        customClass: 'custom-confirm'
      }).then(() => {
        this.$store.dispatch(methodName, ids).then(res => {
          this.$message({ type: "success", message: "删除成功!"});
        },
        err => {
          console.log(err);
        });
      }).catch(() => {});
    },
    //根据id删除
    deleteById(methodName,id){
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'el-icon-question',
        customClass: 'custom-confirm'
      }).then(() => {
        this.$store.dispatch(methodName, id).then(res => {
          if(res.code === 200){
            this.$message({ type: "success", message: "删除成功!"});
          }
        },
          err => {console.log(err);}
        );
      }).catch(() => {});
    },
    //页面列表查询
    getPageList(methodName,data){
      this.tableLoading = true
      this.$store.dispatch(methodName, data).then(res => {
        if(res.code === 200){
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        }
        this.tableLoading = false;
      }, err => {
        this.$message({ type: "error", message: err.msg || '' });
        this.tableLoading = false;
      });
    },
    //人员信息列表打开
    openPersonTag(methodName,data,param){
      this.$store.commit(methodName,data,param);
      this.$router.push({
        name: 'personDetailPage',
        params:{
          personInfo:data,
          pageStatus:param
        }
      });
    },
    //查询当前人员所属机构，*****oidInfo 定义在页面存储机构信息
    getOrgInfo(){
      this.$store.dispatch("findOrganTreeByCurrUser").then(
        res=>{
          if(res.code===200){
              this.oidInfo=res.data;
          }
        },
        err => {
          console.log(err);
        }).catch(()=>{});
    },
    /**
     * 查看人员详情
     * @param row // 列表中人员信息
     * @param type // 'edit' 新增
     *  */
    openPersonDetail(row, type) {
      const addRoutes = PersonRouter[0].children[0].children;
      addRoutes.splice(0, addRoutes.length);
      const currentRoute = addRoutes.findIndex(item => item.path === `/personDetailPage/${type}/${row.personId}`);
      if (currentRoute > -1) {
        this.$router.push({
          path: `/personDetailPage/${type}/${row.personId}`
        });
      } else {
        const newRouter = {
          path: `/personDetailPage/${type}/${row.personId}`,
          name: `personDetailPage_${row.personId}`,
          meta: { title: `个人详情-${row.personName}`, oneTab:true},
          component: resolve => require(["@/page/person/person-manage/personDetailPage.vue"], resolve )
        }
        PersonRouter[0].children[0].children.push(newRouter);
        this.$router.addRoutes(PersonRouter);
        this.$router.push({ path: `/personDetailPage/${type}/${row.personId}`});
      }
    }
  }
}