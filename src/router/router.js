import {loginRouter, registRouter,redirectRouter,homeRouter,lagoutOneRouter} from './routerExport/common'
import lawSuperviseJson from './routerExport/routerJson/lawSuperviseJson'

//通用基础router（全国）
const routersCommon = [
  loginRouter,
  registRouter,
  homeRouter,
  // ...lagoutOneRouter,
  redirectRouter,
  ...lawSuperviseJson
]


const routers= [...routersCommon]
export {routers}



