// vue.config.js
let externals = {}
if (process.env.NODE_ENV === 'production') {
  externals = {
    lodash: 'lodash'
  }
}
// const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  // 将 examples 目录添加为新的页面
  pages: {
    index: {
      // page 的入口
      entry: 'example/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },
  configureWebpack: {
    plugins: [
      // new CopyWebpackPlugin([
      //   { from: 'packages/third-part-lib/ztree/css/zTreeStyle', to: 'zTreeStyle' }
      // ])
    ],
    externals: externals
  }
  // configureWebpack:{
  //     resolve: {
  //         alias: {
  //             vue$: "vue/dist/vue.esm.js", //加上这一句
  //         }
  //     },
  // }
}
