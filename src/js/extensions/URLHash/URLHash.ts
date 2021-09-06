import { BaseComponent, Components, EventInterface, Options, Splide, EVENT_ACTIVE } from '@splidejs/splide';
import { getAttribute } from '@splidejs/splide/src/js/utils';
import { SlideComponent } from '@splidejs/splide/src/js/components/Slides/Slide';
import { HASH_ATTRIBUTE_NAME } from './constants';


/**
 * The extension for observing the URL hash change
 * and moving the slider to the slide that is associated with the hash value.
 *
 * @since 0.2.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A URLHash component object.
 */
export function URLHash( Splide: Splide, Components: Components, options: Options ): BaseComponent {
	const { on, bind } = EventInterface( Splide );
	const { setIndex, go } = Components.Controller;

	/**
	 * Called when the component is constructed.
	 * Determines the initial slide index by the URL hash.
	 */
	function setup(): void {
		const index = convertHashToIndex( location.hash );
		setIndex( index > -1 ? index : options.start || 0 );
	}

	/**
	 * Called when the component is mounted.
	 */
	function mount(): void {
		on( EVENT_ACTIVE, onActive );
		bind( window, 'hashchange', onHashChange );
	}

	/**
	 * Called when any slide becomes active.
	 *
	 * @param Slide - A SlideComponent that gets active.
	 */
	function onActive( Slide: SlideComponent ): void {
		const hash = getAttribute( Slide.slide, HASH_ATTRIBUTE_NAME );

		if ( hash ) {
			location.hash = hash;
		} else {
			if ( history ) {
				// Removes #.
				history.replaceState( null, null, ' ' );
			} else {
				location.hash = '';
			}
		}
	}

	/**
	 * Called when the URL hash changes.
	 */
	function onHashChange(): void {
		const index = convertHashToIndex( location.hash );

		if ( index > -1 ) {
			go( index );
		}
	}

	/**
	 * Converts the provided hash string to the slide index.
	 *
	 * @param hash - A hash string to convert.
	 *
	 * @return A slide index on success, or otherwise `-1`.
	 */
	function convertHashToIndex( hash: string ): number {
		hash = hash.replace( '#', '' );

		if ( hash ) {
			const { slides } = Components.Elements;

			for ( let i = 0; i < slides.length; i++ ) {
				if ( getAttribute( slides[ i ], HASH_ATTRIBUTE_NAME ) === hash ) {
					return i;
				}
			}
		}

		return -1;
	}

	return {
		setup,
		mount,
	}
}
