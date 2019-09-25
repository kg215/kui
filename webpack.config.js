/* eslint-disable no-undef */
const path = require("path");

const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const HtmlWebpackPlugin= require("html-webpack-plugin");
const WebpackDevServerOutput = require("webpack-dev-server-output");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = "development";

const dist = path.resolve(__dirname,"./dist");
function getBabelOptions(env) {
	return {
		envName: env,
		// 业界通用 preset
		presets: [
			[require("@babel/preset-env"),{
				"targets": {
					"node": "current",
				},
				useBuiltIns:"usage",
			}]
			, require("@babel/preset-react"),require("@babel/preset-typescript")],
		plugins: [
			[require("@babel/plugin-proposal-decorators"), {legacy: true}],
			[require("@babel/plugin-proposal-class-properties")],
			[require("@babel/plugin-syntax-dynamic-import")],
			[require("@babel/plugin-proposal-optional-chaining")],
		],
		// 缓存 loader 结果，可提高编译性能
		// build 时由于要扫描组件使用情况，所以不使用缓存
		cacheDirectory: env === "development",
		// 维持行号，否则 Webpack 异常消息中的行号不正确
		retainLines: true,
	};
}

const babelOpts = getBabelOptions(mode);
const srcPath = (subDir)=>{
	return path.join(__dirname, "src", subDir);
};
module.exports = {
	mode:mode,
	entry:{
		app:"./src/index.tsx",
	},
	output: {
		path: dist,
		filename: "[name].[hash:10].js",
		chunkFilename: "[name].[hash:10].js",
		publicPath: "http://127.0.0.1:9999"
	},
	devServer:{
		contentBase:"./dist",  //服务访问的根目录
		inline: true,
		port:9999,
		open:false, //打包后是否自动打开
	},
	resolve: {
		extensions: [".ts",".tsx",".js", ".jsx",".d.ts"],
		alias: {
			"@view": srcPath("view"),
		},
	},
	optimization: {
		namedModules: true, //取代插件中的 new webpack.NamedModulesPlugin()
		namedChunks: true,
		splitChunks: { //取代 webpack.optimize.CommonsChunkPlugin
			minSize:1,
			minChunks:1,
			maxAsyncRequests:1,
			chunks: "all",
			automaticNameDelimiter: "_",
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: 1
				}
			},
		},
		runtimeChunk: {
			name: entrypoint => `${entrypoint.name}`
		}
	},
	resolveLoader:{
		modules: [
			"node_modules",
		]
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: babelOpts
					}
				]
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test:/\.tsx?$/,
				exclude: /node_modules/,
				loader: [{
					loader:"babel-loader",
					options: babelOpts
				},"ts-loader"]
			},
			{
				test:/\.(le|c)ss$/,
				use:[
					{
						loader:MiniCssExtractPlugin.loader,
						options: {
							publicPath: "./style",
							hmr: process.env.NODE_ENV === "development",
						},
					},
					"css-loader",
					"postcss-loader",
					"less-loader",
				]
			}, {
				test: /\.(png|woff|woff2|svg|ttf|eot)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 100000,  //这里要足够大这样所有的字体图标都会打包到css中
					}
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template:"./src/template.html",
			filename: "index.html",
		}),
		new WebpackDevServerOutput({
			path: "./dist",
			isDel: true
		}),
		new MiniCssExtractPlugin({
			filename: "style/[name].css",
			chunkFilename: "style/[name].css",
			ignoreOrder: false,
		}),
	]
};