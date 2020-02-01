/**
 * The extension component for listening to URL hash change
 * and moving a slider to a slide having the hash name in its data attribute.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The attribute name for assigning a hash value.
 *
 * @type {string}
 */
const HASH_ATTRIBUTE_NAME = 'data-splide-hash';


/**
 * The extension component for listening to URL hash change
 * and moving a slider to a slide having the hash name in its data attribute.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - Extension object.
 */
export default ( Splide, Components ) => {
	const URLHash = {
		/**
		 * Called when this extension is mounted.
		 */
		mount() {
			Splide.index = hashToIndex( window.location.hash ) || Splide.options.start;
			bind();
		},
	};

	/**
	 * Listen some events.
	 */
	function bind() {
		// Try to change URL with a hash of the active slide.
		Splide.on( 'moved', newIndex => {
			const hash = Components.Slides.getSlide( newIndex ).slide.getAttribute( HASH_ATTRIBUTE_NAME );

			if ( ! hash ) {
				if ( history ) {
					// Remove #.
					history.replaceState( null, null, ' ' );
				} else {
					window.location.hash = '';
				}
			} else {
				window.location.hash = hash;
			}
		} );

		// Move the slider to the slide having the new hash.
		Splide.on( 'hashchange', () => {
			const index = hashToIndex( window.location.hash );

			if ( index !== false && Splide.index !== index ) {
				Splide.go( index );
			}
		}, window );
	}

	/**
	 * Try to convert hash to the slide index.
	 *
	 * @param {string} hash - A hash value.
	 *
	 * @return {number|boolean} - Converted index on success. false on failure.
	 */
	function hashToIndex( hash ) {
		hash = hash.replace( '#', '' );

		if ( ! hash ) {
			return false;
		}

		const Slide = Components.Slides.getSlides( false, true )
			.find( Slide => Slide.slide.getAttribute( HASH_ATTRIBUTE_NAME ) === hash );

		return Slide ? Slide.index : false;
	}

	return URLHash;
}