/**
 * Set the URL hash extension to the global object.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import URLHash from '../../src/js/splide-extension-url-hash';

window.splide = window.splide || {};
window.splide.Extensions = window.splide.Extensions || {};
window.splide.Extensions.URLHash = URLHash;