import {route} from './routerExport/common'
import commonRouterJson from './routerExport/routerJson/commonRouterJson'

//通用基础router（全国）
const routersCommon = [
  ...route,
  ...commonRouterJson,

]


const routers = [...routersCommon]
export {routers}



