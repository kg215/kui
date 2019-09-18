// module.exports = {
// 	entry: ["@babel/polyfill"],
// 	// 业界通用 preset
// 	presets: [require("@babel/preset-env"), require("@babel/preset-react"),require("@babel/preset-typescript")],
// 	plugins: [
// 		[require("@babel/plugin-proposal-decorators"), {legacy: true}],
// 		[require("@babel/plugin-proposal-class-properties")],
// 		[require("@babel/plugin-syntax-dynamic-import")],
// 		[require("@babel/plugin-proposal-optional-chaining")],
// 	],
// 	// 缓存 loader 结果，可提高编译性能
// 	// build 时由于要扫描组件使用情况，所以不使用缓存
// 	cacheDirectory: true,
// 	// 维持行号，否则 Webpack 异常消息中的行号不正确
// 	retainLines: true
// };