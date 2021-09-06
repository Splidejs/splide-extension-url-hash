/*!
 * @splidejs/splide-extension-url-hash
 * Version  : 0.2.0
 * License  : MIT
 * Copyright: 2021 Naotoshi Fujita
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict';
  /**
   * Checks if the given subject is an array or not.
   *
   * @param subject - A subject to check.
   *
   * @return `true` if the subject is an array, or otherwise `false`.
   */

  function isArray(subject) {
    return Array.isArray(subject);
  }
  /**
   * Push the provided value to an array if the value is not an array.
   *
   * @param value - A value to push.
   *
   * @return An array containing the value, or the value itself if it is already an array.
   */


  function toArray(value) {
    return isArray(value) ? value : [value];
  }
  /**
   * The extended `Array#forEach` method that accepts a single value as an argument.
   *
   * @param values   - A value or values to iterate over.
   * @param iteratee - An iteratee function.
   */


  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  var EVENT_ACTIVE = 'active';
  var EVENT_DESTROY = 'destroy';
  /**
   * The function that provides interface for internal and native events.
   *
   * @since 3.0.0
   *
   * @param Splide - A Splide instance.
   *
   * @return A collection of interface functions.
   */

  function EventInterface(Splide) {
    /**
     * Holds the event object.
     */
    var event = Splide.event;
    /**
     * The key for events.
     */

    var key = {};
    /**
     * Stores all handlers that listen to native events.
     */

    var listeners = [];
    /**
     * Registers an event handler with an unique key.
     * It can only be removed by `off()` method below.
     *
     * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
     * @param callback - A callback function to register.
     * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
     *                   Lower numbers correspond with earlier execution. The default value is 10.
     */

    function on(events, callback, priority) {
      event.on(events, callback, key, priority);
    }
    /**
     * Removes event handlers registered by `on()`.
     *
     * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
     */


    function off(events) {
      event.off(events, key);
    }
    /**
     * Listens to native events.
     * Splide#destory() will remove all registered listeners.
     *
     * @param targets  - A target element, the window object or the document object.
     * @param events   - An event or events to listen to.
     * @param callback - A callback function.
     * @param options  - Optional. The options to pass to the `addEventListener` function.
     */


    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event) {
        listeners.push([target, event, callback, options]);
        target.addEventListener(event, callback, options);
      });
    }
    /**
     * Removes the event handler.
     *
     * @param targets - A target element, the window object or the document object.
     * @param events  - An event name or names to remove.
     */


    function unbind(targets, events) {
      forEachEvent(targets, events, function (target, event) {
        listeners = listeners.filter(function (listener) {
          if (listener[0] === target && listener[1] === event) {
            target.removeEventListener(event, listener[2], listener[3]);
            return false;
          }

          return true;
        });
      });
    }
    /**
     * Iterates over each target and event.
     *
     * @param targets  - A target element, the window object or the document object.
     * @param events   - An event name or names.
     * @param iteratee - An iteratee function.
     */


    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function (target) {
        if (target) {
          events.split(' ').forEach(iteratee.bind(null, target));
        }
      });
    }
    /**
     * Removes all listeners.
     */


    function destroy() {
      listeners = listeners.filter(function (data) {
        return unbind(data[0], data[1]);
      });
      event.offBy(key);
    }
    /**
     * Invokes destroy when the slider is destroyed.
     */


    event.on(EVENT_DESTROY, destroy, key);
    return {
      on: on,
      off: off,
      emit: event.emit,
      bind: bind,
      unbind: unbind,
      destroy: destroy
    };
  }
  /**
   * Returns the specified attribute value.
   *
   * @param elm  - An element.
   * @param attr - An attribute to get.
   */


  function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
  }
  /**
   * The data attribute name for URL hash.
   *
   * @since 0.2.0
   */


  var HASH_ATTRIBUTE_NAME = 'data-splide-hash';
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
   * @return A Drag component object.
   */

  function URLHash(Splide, Components, options) {
    var _EventInterface = EventInterface(Splide),
        on = _EventInterface.on,
        bind = _EventInterface.bind;

    var _Components$Controlle = Components.Controller,
        setIndex = _Components$Controlle.setIndex,
        go = _Components$Controlle.go;
    /**
     * Called when the component is constructed.
     * Determines the initial slide index by the URL hash.
     */

    function setup() {
      var index = convertHashToIndex(location.hash);
      setIndex(index > -1 ? index : options.start || 0);
    }
    /**
     * Called when the component is mounted.
     */


    function mount() {
      on(EVENT_ACTIVE, onActive);
      bind(window, 'hashchange', onHashChange);
    }
    /**
     * Called when any slide becomes active.
     *
     * @param Slide - A SlideComponent that gets active.
     */


    function onActive(Slide) {
      var hash = getAttribute(Slide.slide, HASH_ATTRIBUTE_NAME);

      if (hash) {
        location.hash = hash;
      } else {
        if (history) {
          // Removes #.
          history.replaceState(null, null, ' ');
        } else {
          location.hash = '';
        }
      }
    }
    /**
     * Called when the URL hash changes.
     */


    function onHashChange() {
      var index = convertHashToIndex(location.hash);

      if (index > -1) {
        go(index);
      }
    }
    /**
     * Converts the provided hash string to the slide index.
     *
     * @param hash - A hash string to convert.
     *
     * @return A slide index on success, or otherwise `-1`.
     */


    function convertHashToIndex(hash) {
      hash = hash.replace('#', '');

      if (hash) {
        var slides = Components.Elements.slides;

        for (var i = 0; i < slides.length; i++) {
          if (getAttribute(slides[i], HASH_ATTRIBUTE_NAME) === hash) {
            return i;
          }
        }
      }

      return -1;
    }

    return {
      setup: setup,
      mount: mount
    };
  }

  if (typeof window !== 'undefined') {
    window.splide = window.splide || {};
    window.splide.Extensions = window.splide.Extensions || {};
    window.splide.Extensions.URLHash = URLHash;
  }
});
//# sourceMappingURL=splide-extension-url-hash.js.map
