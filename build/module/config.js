module.exports = {
	entry: './src/js/splide-extension-url-hash.js',
	output: {
		filename     : 'splide-extension-url-hash.js',
		library      : 'Splide',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test   : /.js$/,
				loader : 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	optimization: {
		minimize: false,
	},
	mode: 'production',
};