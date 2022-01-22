import { URLHash } from '../extensions';


declare global {
  interface Window {
    splide: Record<string, any>;
  }
}

if ( typeof window !== 'undefined' ) {
  window.splide = window.splide || {};
  window.splide.Extensions = window.splide.Extensions || {};
  window.splide.Extensions.URLHash = URLHash;
}
