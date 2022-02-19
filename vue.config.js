module.exports = {
    devServer: {
        host: "localhost",
        port: 8080,
        open: true,
        proxy: {
            // 一旦devServer(8080)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(4000)
            '/api': {
                target: 'http://localhost:4000',
                changOrigin: true, //允许跨域
                ws: true,
                // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    }
}