'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
<<<<<<< HEAD
  //BASE_API: '"http://172.16.169.54:8888"',
  //BASE_API: '"http://172.16.170.53:8888"', //线上的
=======
  // BASE_API: '"http://124.192.215.4:8083/catsic"', //线上的
>>>>>>> c60fc5fde5ad320d8c3cebfd887a7e787e62e351
  BASE_API: '"http://172.16.169.62:8888/catsic"', //鸿燕
  // BASE_API: '"http://172.16.169.78:8888/catsic"', //文静
  // BASE_API: '"http://172.16.169.83:8888/catsic"', //罗兴朝
  // BASE_API: '"http://172.16.168.84:8888/catsic"', //李垚
  // BASE_API: '"http://172.16.169.62:8888/catsic"', //鸿燕
  // BASE_API: '"http://127.0.0.1:8888/catsic"',

})
