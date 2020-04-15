const config = require( '../global/config' );

module.exports = {
	...config,
	entry: './src/js/splide-extension-url-hash.js',
	output: {
		filename     : 'splide-extension-url-hash.esm.js',
		library      : 'Splide',
		libraryTarget: 'umd',
	},
};