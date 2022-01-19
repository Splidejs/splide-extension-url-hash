/*!
 * @splidejs/splide-extension-url-hash
 * Version  : 0.2.3
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
// node_modules/@splidejs/splide/dist/js/splide.esm.js
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
  const { event } = Splide22;
  const key = {};
  let listeners = [];
  function on(events, callback, priority) {
    event.on(events, callback, key, priority);
  }
  function off(events) {
    event.off(events, key);
  }
  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, (target, event2) => {
      listeners.push([target, event2, callback, options]);
      target.addEventListener(event2, callback, options);
    });
  }
  function unbind(targets, events, callback) {
    forEachEvent(targets, events, (target, event2) => {
      listeners = listeners.filter((listener) => {
        if (listener[0] === target && listener[1] === event2 && (!callback || listener[2] === callback)) {
          target.removeEventListener(event2, listener[2], listener[3]);
          return false;
        }
        return true;
      });
    });
  }
  function forEachEvent(targets, events, iteratee) {
    forEach(targets, (target) => {
      if (target) {
        events.split(" ").forEach(iteratee.bind(null, target));
      }
    });
  }
  function destroy() {
    listeners = listeners.filter((data) => unbind(data[0], data[1]));
    event.offBy(key);
  }
  event.on(EVENT_DESTROY, destroy, key);
  return {
    on,
    off,
    emit: event.emit,
    bind,
    unbind,
    destroy
  };
}

// node_modules/@splidejs/splide/src/js/utils/dom/getAttribute/getAttribute.ts
function getAttribute2(elm, attr) {
  return elm.getAttribute(attr);
}

// src/js/extensions/URLHash/constants.ts
var HASH_ATTRIBUTE_NAME = "data-splide-hash";

// src/js/extensions/URLHash/URLHash.ts
function URLHash(Splide3, Components2, options) {
  const { on, bind } = EventInterface(Splide3);
  const { setIndex, go } = Components2.Controller;
  function setup() {
    const index = convertHashToIndex(location.hash);
    setIndex(index > -1 ? index : options.start || 0);
  }
  function mount() {
    on(EVENT_ACTIVE, onActive);
    bind(window, "hashchange", onHashChange);
  }
  function onActive(Slide2) {
    const hash = getAttribute2(Slide2.slide, HASH_ATTRIBUTE_NAME);
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
    const index = convertHashToIndex(location.hash);
    if (index > -1) {
      go(index);
    }
  }
  function convertHashToIndex(hash) {
    hash = hash.replace("#", "");
    if (hash) {
      const { slides } = Components2.Elements;
      for (let i = 0; i < slides.length; i++) {
        if (getAttribute2(slides[i], HASH_ATTRIBUTE_NAME) === hash) {
          return i;
        }
      }
    }
    return -1;
  }
  return {
    setup,
    mount
  };
}
/*!
 * Splide.js
 * Version  : 3.6.11
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */

export { URLHash };
