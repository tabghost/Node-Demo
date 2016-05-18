var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		test1: './src/test1.js',
		test1_1: './src/test1.2.js',
		test_react: './src/test_react.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin("common.js")
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel'
				// 若.babelrc已设定则以下可忽略
				/*
				query: {
					presets: ['react', 'es2015']
				}
				*/
			}
		]
	},
	devServer: {
		publicPath: "/static/",
		stats: {
			colors: true
		},
		port: 6000,
		contentBase: 'build',
		inline: true
	}
}