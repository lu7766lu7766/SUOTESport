var webpack = require('webpack')
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
Object.assign(vueLoaderConfig.loaders, {
	js: 'happypack/loader?id=happy-babel-js'
})

const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		modules: [resolve('src'), resolve('node_modules')],
		alias: {
			vue$: 'vue/dist/vue.common.js',
			'~': resolve('node_modules'),
			src: resolve('src'),
			assets: resolve('src/assets'),
			lib: resolve('src/assets/scripts'),
			'@': resolve('src/components'),
			static: resolve('static'),
			config: resolve('src/config/index.build.js')
		}
	},
	module: {
		noParse: /es6-promise\.js$/,
		// noParse: [/jquery/, /bootstrap/, /lodash/, /mathjs/, /moment/],
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader', // loader: 'vue-loader',
						options: vueLoaderConfig
					}
				],
				include: resolve('src'),
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loader: 'happypack/loader?id=happy-babel-js', // loader: 'babel-loader',
				include: resolve('src'),
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			config: 'config',
			axios: 'axios',
			_: 'lodash',
			moment: 'moment',
			math: 'mathjs'
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		//   name: "config",
		//   minChunks: Infinity,
		// }),
		new webpack.IgnorePlugin(/vertx/),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HappyPack({
			id: 'happy-babel-js',
			loaders: ['babel-loader?cacheDirectory=true'],
			threadPool: happyThreadPool
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./vendor-manifest.json')
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./jquery-manifest.json')
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./langs-manifest.json')
		}),
		// new webpack.DllReferencePlugin({
		// 	context: __dirname,
		// 	manifest: require('./unminify-manifest.json')
		// }),
		new HtmlWebpackIncludeAssetsPlugin({
			assets: [
				'static/script/vendor.dll.js',
				'static/script/jquery.dll.js',
				'static/script/langs.dll.js'
			], // , 'static/script/unminify.dll.js'
			files: ['index.html'],
			append: false,
			hash: true
		})
	]
}
