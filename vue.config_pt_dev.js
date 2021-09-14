'use strict'
// 定义反向代理主入口，http开头，结尾不带斜杠
const APIPrefix = 'http://localhost:8080'
module.exports = {
  '/lucky-draw': {
    target: APIPrefix, // 目标接口域名
    changeOrigin: true, // 是否跨域
    pathRewrite: {
      // 重写接口
    }
  }
}
