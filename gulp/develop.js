const { watch } = require( 'gulp' );
const { buildDevCode } = require( './build-script' );


function develop() {
  watch( [ 'src/js/**/*.ts', '!src/js/**/*.test.ts' ], buildDevCode );
}

exports.develop = develop;
