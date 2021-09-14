// 定义使用哪个环境的反向代理规则文件。里面有域名的定义
const proxyTable = require('./vue.config_pt_dev.js')

module.exports = {
  publicPath: '/lucky-draw/',
  devServer: {
    port: 80,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    https: false,
    //pfxPassphrase: '',
    //pfx: './rynnova.com.pfx', // 证书在本项目下的相对路径
    //public: 'vue.rynnova.com', // 指定使用的域名
    proxy: proxyTable, // 使用规则表中定义好的Proxy table
  },
}