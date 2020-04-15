const config = require( '../global/config' );

module.exports = {
	...config,
	output: {
		filename     : 'splide-extension-url-hash.esm.js',
		library      : 'Splide',
		libraryTarget: 'umd',
	},
};