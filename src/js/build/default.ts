import { ComponentConstructor } from '@splidejs/splide';
import { URLHash } from '../extensions';


declare global {
	interface Extensions {
		URLHash?: ComponentConstructor;
	}

	interface SplideGlobals {
		Extensions?: Extensions;
	}

	interface Window {
		splide: SplideGlobals;
	}
}

if ( typeof window !== 'undefined' ) {
	window.splide = window.splide || {};
	window.splide.Extensions = window.splide.Extensions || {};
	window.splide.Extensions.URLHash = URLHash;
}
