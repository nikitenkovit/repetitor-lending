"use strict";

(function () {
  /*up-button start*/
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
      setTimeout(backToTop, 6);
    }
  }

  upBtn.addEventListener('click', backToTop);
  /*up-button end*/

  /*modal window from header start*/
  var headerModalOverlay = document.querySelector('.header__modal-window--overlay');
  var headerButton = document.querySelector('.header__button-request-a-call');
  var headerModalWindow = document.querySelector('.getCall');
  var closeModalWindow = document.querySelector('.closeModalWindow');
  var htmlTag = document.querySelector('html');
  var headerTag = document.querySelector('header');
  var navTag = document.querySelector('nav');
  var mainTag = document.querySelector('main');
  var escapeCode = 27;

  var missClick = function (evt) {
    var target = evt.target;
    var itsHeaderModalWindow = target === headerModalWindow || headerModalWindow.contains(target);
    var itsHeaderButton = target === headerButton || headerButton.contains(target);

    if (!itsHeaderModalWindow && !itsHeaderButton) {
      headerModalHandler();
    }
  };

  var pressEsc = function (evt) {
    evt.preventDefault();

    if (evt.keyCode === escapeCode) {
      headerModalHandler();
    }
  }

  var headerModalHandler = function () {
    headerModalOverlay.style.display = 'flex';
    headerModalOverlay.classList.toggle('modal-window__overlay--open');
    headerModalOverlay.classList.toggle('modal-window__overlay--close');
    htmlTag.classList.toggle('html--disabled');
    headerTag.classList.toggle('filter-blur');
    navTag.classList.toggle('filter-blur');
    mainTag.classList.toggle('filter-blur');

    if (headerModalOverlay.classList.contains('modal-window__overlay--open')) {
      document.addEventListener('click', missClick);
      document.addEventListener('keydown', pressEsc);
    } else {
      document.removeEventListener('click', missClick);
      document.removeEventListener('keydown', pressEsc);
      setTimeout(function () {
        headerModalOverlay.style.display = 'none';
      }, 600)
    }
  };

  headerButton.addEventListener('click', headerModalHandler);
  closeModalWindow.addEventListener('click', headerModalHandler);
  /*modal window from header end*/

  /*main modal window start*/
  var buttonCheckInACourse = document.querySelector('.navigation__button-check-in-a-course');
  var interview = document.querySelector('.interview');
  var showInterview = document.querySelector('.showInterview');
  var buttonClose = document.querySelector('.interview__button-close');
  var timeToShowPopap = 30000;

  var mainModalWindowHandler = function () {
    interview.classList.toggle('active');
  }

  buttonCheckInACourse.addEventListener('click', mainModalWindowHandler)
  showInterview.addEventListener('click', mainModalWindowHandler)
  buttonClose.addEventListener('click', mainModalWindowHandler)

  if (document.documentElement.clientWidth > 767) {
    setTimeout(function () {
      interview.classList.add('active');
    }, timeToShowPopap)
  }
  /*main modal window end*/
})();