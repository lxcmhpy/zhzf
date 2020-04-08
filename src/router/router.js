import {route} from './routerExport/common'
import lawSuperviseJson from './routerExport/routerJson/lawSuperviseJson'
import commonRouterJson from './routerExport/routerJson/commonRouterJson'

//通用基础router（全国）
const routersCommon = [
  ...route,
  ...commonRouterJson,
  ...lawSuperviseJson
]


const routers = [...routersCommon]
export {routers}



