const {defineConfig} = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9201",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  },
  configureWebpack: config => {
    // 开发环境不需要gzip
    if (process.env.NODE_ENV !== 'production') return
    config.plugins.push(
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/,// 匹配文件名
        threshold: 5120, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 不删除源文件
      })
    )
  },
  chainWebpack: (config) => {
    config
      .plugin('AutoImport')
      .use(AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'css',
            exclude: new RegExp(/^(?!.*loading-directive).*$/)
          })
        ],
        dts: 'auto-imports.d.ts'
      }))
    config
      .plugin('Components')
      .use(Components({
        resolvers: [ElementPlusResolver({importStyle: 'css'})],
        dts: 'components.d.ts'
      }))
  }
})
