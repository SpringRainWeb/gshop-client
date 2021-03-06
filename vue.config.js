const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': []
            }
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: false
        }
    },
    devServer: {
        proxy: {
            // proxy all requests starting with /api to jsonplaceholder
            '/api': {
                target: 'http://localhost:3300', //代理接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //代理的路径
                }
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            }
        }
    }

}