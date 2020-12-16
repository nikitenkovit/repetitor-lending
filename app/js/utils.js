'use strict';

(function () {
  window.utils = {
    debounce: function (func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
      };
    },
    valueWindowWidth: function () {
      var windowWidth = document.documentElement.clientWidth;
      if (windowWidth >= 320 && windowWidth < 480) return 'phone';
      if (windowWidth >= 480 && windowWidth < 768) return 'bigPhone';
      if (windowWidth >= 768 && windowWidth < 980) return 'tablet';
      if (windowWidth >= 980) return 'desktop';
    }
  }
})();