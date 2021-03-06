const path = require('path');
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

const webpackConfig = {
    mode: "development",
    entry: {
        index: './src/Frame/MainFrame.js',
    },
    output: {
        publicPath: "/",
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    devServer: {
        host: '0.0.0.0',
        inline: true,
        port: 7122,
        publicPath: '/',
        proxy: {
          '/myProject': {
            target: 'http://localhost:9002',
            pathRewrite: { '^/myProject': '' },
            changeOrigin: true
          }
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
            filename: 'index.html',
            inject: true,
            chunks: ['index']
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './src/Images'),
                to: 'Images',
                ignore: ['.*']
            }
        ]),
        //开启多线程进行打包
        new HappyPack({
            id: 'happy-babel-js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        })
    ],
    module: {
        rules: [
            // {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happy-babel-js',
                include: [path.resolve('src')],
                exclude: /node_modules/
            },
            {test: /\.json$/, use: 'json-loader'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            {test: /\.vue$/, use: 'vue-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.scss$/, loader:'style-loader!css-loader!sass-loader'},
            {test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader?name=font/[name]-[hash].[ext]'},

        ]
    }
};

module.exports = webpackConfig
