(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Splide"] = factory();
	else
		root["Splide"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
var HASH_ATTRIBUTE_NAME = 'data-splide-hash';
/**
 * The extension component for listening to URL hash change
 * and moving a slider to a slide having the hash name in its data attribute.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - Extension object.
 */

/* harmony default export */ __webpack_exports__["default"] = (function (Splide, Components) {
  var URLHash = {
    /**
     * Called when this extension is mounted.
     */
    mount: function mount() {
      Splide.index = hashToIndex(window.location.hash) || Splide.options.start;
      bind();
    }
  };
  /**
   * Listen some events.
   */

  function bind() {
    // Try to change URL with a hash of the active slide.
    Splide.on('moved', function (newIndex) {
      var hash = Components.Slides.getSlide(newIndex).slide.getAttribute(HASH_ATTRIBUTE_NAME);

      if (!hash) {
        if (history) {
          // Remove #.
          history.replaceState(null, null, ' ');
        } else {
          window.location.hash = '';
        }
      } else {
        window.location.hash = hash;
      }
    }); // Move the slider to the slide having the new hash.

    window.addEventListener('hashchange', function () {
      var index = hashToIndex(window.location.hash);

      if (index !== false && Splide.index !== index) {
        Splide.go(index);
      }
    });
  }
  /**
   * Try to convert hash to the slide index.
   *
   * @param {string} hash - A hash value.
   *
   * @return {number|boolean} - Converted index on success. false on failure.
   */


  function hashToIndex(hash) {
    hash = hash.replace('#', '');

    if (!hash) {
      return false;
    }

    var Slide = Components.Slides.getSlides(false, true).find(function (Slide) {
      return Slide.slide.getAttribute(HASH_ATTRIBUTE_NAME) === hash;
    });
    return Slide ? Slide.index : false;
  }

  return URLHash;
});

/***/ })
/******/ ]);
});