/*!
 * @splidejs/splide-extension-url-hash
 * Version  : 0.2.3
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict';

  function isArray(subject) {
    return Array.isArray(subject);
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  var EVENT_ACTIVE = "active";
  var EVENT_DESTROY = "destroy";

  function EventInterface(Splide22) {
    var event = Splide22.event;
    var key = {};
    var listeners = [];

    function on(events, callback, priority) {
      event.on(events, callback, key, priority);
    }

    function off(events) {
      event.off(events, key);
    }

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event2) {
        listeners.push([target, event2, callback, options]);
        target.addEventListener(event2, callback, options);
      });
    }

    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function (target, event2) {
        listeners = listeners.filter(function (listener) {
          if (listener[0] === target && listener[1] === event2 && (!callback || listener[2] === callback)) {
            target.removeEventListener(event2, listener[2], listener[3]);
            return false;
          }

          return true;
        });
      });
    }

    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function (target) {
        if (target) {
          events.split(" ").forEach(iteratee.bind(null, target));
        }
      });
    }

    function destroy() {
      listeners = listeners.filter(function (data) {
        return unbind(data[0], data[1]);
      });
      event.offBy(key);
    }

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

  function getAttribute2(elm, attr) {
    return elm.getAttribute(attr);
  }

  var HASH_ATTRIBUTE_NAME = "data-splide-hash";

  function URLHash(Splide3, Components2, options) {
    var _EventInterface = EventInterface(Splide3),
        on = _EventInterface.on,
        bind = _EventInterface.bind;

    var _Components2$Controll = Components2.Controller,
        setIndex = _Components2$Controll.setIndex,
        go = _Components2$Controll.go;

    function setup() {
      var index = convertHashToIndex(location.hash);
      setIndex(index > -1 ? index : options.start || 0);
    }

    function mount() {
      on(EVENT_ACTIVE, onActive);
      bind(window, "hashchange", onHashChange);
    }

    function onActive(Slide2) {
      var hash = getAttribute2(Slide2.slide, HASH_ATTRIBUTE_NAME);

      if (hash) {
        location.hash = hash;
      } else {
        if (history) {
          history.replaceState(null, null, " ");
        } else {
          location.hash = "";
        }
      }
    }

    function onHashChange() {
      var index = convertHashToIndex(location.hash);

      if (index > -1) {
        go(index);
      }
    }

    function convertHashToIndex(hash) {
      hash = hash.replace("#", "");

      if (hash) {
        var slides = Components2.Elements.slides;

        for (var i = 0; i < slides.length; i++) {
          if (getAttribute2(slides[i], HASH_ATTRIBUTE_NAME) === hash) {
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

  if (typeof window !== "undefined") {
    window.splide = window.splide || {};
    window.splide.Extensions = window.splide.Extensions || {};
    window.splide.Extensions.URLHash = URLHash;
  }
  /*!
   * Splide.js
   * Version  : 3.6.11
   * License  : MIT
   * Copyright: 2022 Naotoshi Fujita
   */

});
//# sourceMappingURL=splide-extension-url-hash.js.map
