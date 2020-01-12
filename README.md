# URL Hash Navigation - Splide Extension
This is an extension of the [Splide](https://github.com/Splidejs/splide) slider library for listening to hash change and move a slide to a slide having the hash name.

Also, an initial slide will correspond with the URL hash and browser forward/back button moves a slider.

## Installation
### NPM(Recommended)
1. Get the latest extension by NPM:
    ```bash
    $ npm install @splidejs/splide-extension-url-hash
    ```
1. Mount the extension to the Splide.
    ```javascript
    import Splide from '@splidejs/splide';
    import URLHash from '@splidejs/splide-extension-url-hash';
    new Splide( '#splide' ).mount( { URLHash } );
    ```
    
### CDN or Hosting Files
1. Visit [jsDelivr](https://www.jsdelivr.com/package/npm/@splidejs/splide-extension-url-hash) and get the links of the latest files or download files from the dist library.
1. Import minified stylesheet and JavaScript files on your site:
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-url-hash@0.0.2/dist/css/splide-extension-url-hash.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-url-hash@0.0.2/dist/js/splide-extension-url-hash.min.js">
    ```
    Note that version numbers above are incorrect.
1. Mount the extension to the Splide.
    ```javascript
    new Splide( '#splide' ).mount( window.splide.Extensions );
    ```

### HTML
Set hash values to slides by "data-splide-hash" data attribute:
```html
<div class="splide">
    <div class="splide__track">
        <ul class="splide__list">
            <li class="splide__slide" data-splide-hash="slide01">
            </li>
            <li class="splide__slide" data-splide-hash="slide02">
            </li>
            <li class="splide__slide" data-splide-hash="slide03">
            </li>
        </ul>
    </div>
</div>
```

## License
Splide is released under the MIT license.  
© 2020 Naotoshi Fujita
