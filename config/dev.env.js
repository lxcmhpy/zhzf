'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  //BASE_API: '"http://172.16.169.54:8888"',
  //BASE_API: '"http://172.16.170.53:8888"', //线上的
  // BASE_API: '"http://172.16.169.62:8888/catsic"', //鸿燕
<<<<<<< HEAD
  // BASE_API: '"http://172.16.169.83:8888/catsic"', //罗兴朝
<<<<<<< HEAD
  // BASE_API: '"http://172.16.169.75:8888/catsic"', //李垚
=======
  // BASE_API: '"http://172.16.169.75:8888/catsic"', //单国鑫
  //BASE_API: '"http://172.16.168.84:8888/catsic"', //李垚
>>>>>>> b03cec668aa6347482efdbc07fd81d196460c8e5
  BASE_API: '"http://127.0.0.1:8888/catsic"', 
=======
  BASE_API: '"http://172.16.169.83:8888/catsic"', //罗兴朝
  // BASE_API: '"http://172.16.169.75:8888/catsic"', //单国鑫
  // BASE_API: '"http://172.16.168.84:8888/catsic"', //李垚
  // BASE_API: '"http://127.0.0.1:8888/catsic"',
>>>>>>> e0efbccc5ec19fa154b6e1c5d66dc48724a60518

  //BASE_API2: '"http://baidu.com"',
})
