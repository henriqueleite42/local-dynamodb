/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const tsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
	context: __dirname,
	mode: slsw.lib.webpack.isLocal ? "development" : "production",
	entry: slsw.lib.entries,
	devtool: slsw.lib.webpack.isLocal
		? "eval-cheap-module-source-map"
		: "source-map",
	resolve: {
		extensions: [".mjs", ".json", ".ts"],
		symlinks: false,
		cacheWithContext: false,
		plugins: [
			new tsconfigPathsPlugin({
				configFile: "./tsconfig.paths.json",
			}),
		],
	},
	output: {
		libraryTarget: "commonjs",
		path: path.join(__dirname, ".webpack"),
		filename: "[name].js",
	},
	optimization: {
		concatenateModules: false,
	},
	target: "node",
	externals: [nodeExternals()],
	module: {
		rules: [
			// All files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				test: /\.(tsx?)$/,
				loader: "ts-loader",
				exclude: [
					[
						path.resolve(__dirname, "node_modules"),
						path.resolve(__dirname, ".serverless"),
						path.resolve(__dirname, ".webpack"),
					],
				],
				options: {
					transpileOnly: true,
					experimentalWatchApi: true,
				},
			},
		],
	},
};
