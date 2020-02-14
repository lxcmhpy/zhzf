import {loginRouter, registRouter,redirectRouter,homeRouter,lagoutOneRouter} from './routerExport/common'


//通用基础router（全国）
const routersCommon = [
  loginRouter,
  registRouter,
  homeRouter,
  // ...lagoutOneRouter,
  redirectRouter
]


const routers= [...routersCommon]
export {routers}



