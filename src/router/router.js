import {route} from './routerExport/common'
import lawSuperviseJson from './routerExport/routerJson/lawSuperviseJson'
import commonRouterJson from './routerExport/routerJson/commonRouterJson.json'

//通用基础router（全国）
const routersCommon = [
  ...route,
//   ...commonRouterJson,

]


const routers = [...routersCommon]
export {routers}



