const path = require("path");

//显示打包速度
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

//查看bundle大小的工具
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const HtmlWebpackPlugin= require("html-webpack-plugin");
const WebpackDevServerOutput = require("webpack-dev-server-output");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
const isDev = mode==="development";

const dist = path.resolve(__dirname,"./dist");
const srcPath = (subDir)=>{
	return path.join(__dirname, "src", subDir);
};
const webpackConfig = {
	mode:mode,
	entry:{
		app:"./src/index.tsx",
	},
	output: {
		path: dist,
		filename: "[name].[hash:10].js",
		chunkFilename: "[name].[hash:10].js",
		publicPath: "http://127.0.0.1:9999/"
	},
	devServer:{
		contentBase:"./dist",  //服务访问的根目录
        host:"localhost",
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
		namedModules: isDev,
		namedChunks: isDev,
		splitChunks: {
			cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                },
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                },
                default: false
			},
		},
		runtimeChunk: true,
        minimize:true
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
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test:/\.tsx?$/,
				exclude: /node_modules/,
                use:["thread-loader","babel-loader"]
			},
			{
				test:/\.(le|c)ss$/,
				use:[
                    {
						loader:MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../",
							hmr: process.env.NODE_ENV === "development",
						},
					},
					"css-loader",
					"postcss-loader",
					"less-loader",
				]
			}, {
				test: /\.(png|woff|woff2|svg|ttf|eot)$/,
				use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 100,
                            name:"files/[name].[hash].[ext]"
                        }
                    }
                ]
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
			ignoreOrder: false
		}),
        new BundleAnalyzerPlugin({
            openAnalyzer:false
        })
	]
};

module.exports = smp.wrap(webpackConfig);