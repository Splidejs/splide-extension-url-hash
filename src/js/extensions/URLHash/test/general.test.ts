import { Splide } from '@splidejs/splide';
import { buildHtml } from '../../../test/fixtures';
import { URLHash } from '../URLHash';


describe( 'URLHash', () => {
	beforeEach( () => {
		window.location.hash = '';
		document.body.innerHTML = buildHtml( 10 );
	} );

	test( 'can behave as an extension.', () => {
		const splide = new Splide( '#splide' );
		splide.mount( { URLHash } );
		expect( splide.Components.URLHash ).not.toBeUndefined();
	} );

	test( 'can determines the initial slide index by the URL hash.', () => {
		window.location.hash = '#2';

		const splide = new Splide( '#splide' );
		splide.mount( { URLHash } );

		expect( splide.index ).toBe( 2 );
	} );

	test( 'can move the slider when the hash changes.', () => {
		const splide = new Splide( '#splide', { speed: 0 } );
		splide.mount( { URLHash } );

		expect( splide.index ).toBe( 0 );

		window.location.hash = '#2';
		fire( window, 'hashchange' );

		expect( splide.index ).toBe( 2 );

		window.location.hash = '#5';
		fire( window, 'hashchange' );

		expect( splide.index ).toBe( 5 );
	} );

	test( 'can update the hash when the active slide changes.', () => {
		const splide = new Splide( '#splide', { speed: 0 } );
		splide.mount( { URLHash } );

		splide.go( 3 );
		expect( window.location.hash ).toBe( '#3' );

		splide.go( 7 );
		expect( window.location.hash ).toBe( '#7' );
	} );
} );

function fire( target: Window | Document | Element, type: string ): Event {
	const e = new Event( type );
	target.dispatchEvent( e );
	return e;
}
