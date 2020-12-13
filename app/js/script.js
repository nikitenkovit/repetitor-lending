"use strict";

(function () {
  /*up-button*/

  var upBtn = document.querySelector('.up-button')

  window.onscroll = function () {
    if (window.pageYOffset > 200) {
      upBtn.classList.remove('up-button--hidden')
    } else {
      upBtn.classList.add('up-button--hidden')
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 10);
    }
  }

  upBtn.addEventListener('click', backToTop);
})();