var path = require('path');

module.exports = {
	entry: {
		test1: [
			path.resolve(__dirname, 'src/test1.js'),
			path.resolve(__dirname, 'src/test1.2.js')
		],
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},
}