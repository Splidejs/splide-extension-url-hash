const uglify = require( 'uglifyjs-webpack-plugin' );
const config = require( './config' );

module.exports = {
	...config,
	output: {
		filename: 'splide-extension-url-hash.min.js',
	},
	optimization: {
		minimizer: [ new uglify() ],
	},
};