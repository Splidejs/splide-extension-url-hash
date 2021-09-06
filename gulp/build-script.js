const { parallel, series } = require( 'gulp' );
const rollup     = require( 'rollup' ).rollup;
const typescript = require( 'rollup-plugin-typescript2' );
const rename     = require( 'ts-transformer-properties-rename' ).default;
const uglify     = require( 'rollup-plugin-uglify' ).uglify;
const babel      = require( '@rollup/plugin-babel' );
const resolve    = require( '@rollup/plugin-node-resolve' ).nodeResolve;
const path       = require( 'path' );
const banner     = require( './constants/banner' );
const name       = 'splide-extension-url-hash';

function buildScript( type, minify ) {
	const file  = buildFilename( type, minify );
	const input = `./src/js/build/${ type }.ts`;

	const plugins = [
		resolve(),
		typescript( {
      transformers: [
        service => ( {
          before: [
            rename( service.getProgram(), { internalPrefix: '' } ),
          ],
          after : [],
        } ),
      ],
    } ),
		babel.getBabelOutputPlugin( {
			configFile: path.resolve( __dirname, '../.babelrc' ),
			allowAllFormats: true,
		} ),
	];

	if ( minify ) {
		plugins.push(
			uglify( {
				output: {
					comments: /^!/,
				},
				mangle: {
					properties: {
						regex: /^_(private)_/,
					},
				},
			} ),
		);
	}

	return rollup( { input, plugins } )
		.then( bundle => {
			return bundle.write( {
				banner,
				file,
				format   : 'umd',
				name     : 'Splide',
				sourcemap: ! minify,
			} );
		} );
}

function buildFilename( type, minify ) {
	if ( type === 'default' ) {
		return `./dist/js/${ name }${ minify ? '.min' : '' }.js`;
	}

	return `./dist/js/${ name }-${ type }${ minify ? '.min' : '' }.js`;
}

function buildModule( format ) {
	return rollup( {
		input  : './src/js/index.ts',
		plugins: [
			resolve(),
      typescript(),
			babel.getBabelOutputPlugin( {
				presets: [
					[
						'@babel/preset-env',
						{
							modules: false,
							loose  : true,
						}
					]
				],
				allowAllFormats: true,
			} ),
		]
	} ).then( bundle => {
		return bundle.write( {
			banner,
			file  : `./dist/js/${ name }.${ format }.js`,
			format,
			exports: 'named',
		} );
	} );
}

exports.buildDevCode = function buildDevCode() {
  return buildScript( 'default' );
}

exports.buildScript = parallel(
	function jsDefault() { return buildScript( 'default' ) },
	function jsMinified() { return buildScript( 'default', true ) },
);

exports.buildModule = series(
	function moduleCjs() { return buildModule( 'cjs' ) },
	function moduleEsm() { return buildModule( 'esm' ) },
);
