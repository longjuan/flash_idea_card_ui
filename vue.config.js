const {defineConfig} = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:9201",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        },
      }
    }
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
