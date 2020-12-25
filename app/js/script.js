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
  var headerModalWindow = document.querySelector('.modalWindow');
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
    if (evt.keyCode === escapeCode) {
      evt.preventDefault();
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

  /*mask for phone number start*/
  var allTelNumber = document.querySelectorAll(".f_phone");

  window.addEventListener("DOMContentLoaded", function () {
    var setCursorPosition = function (pos, elem){
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    }

    function mask() {

      var matrix = "+7 (___) ___ ____";
      var count = 0;
      var def = matrix.replace(/\D/g, "");
      var val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && count < val.length ? val.charAt(count++) : count >= val.length ? "" : a
      });
      if (event.type == "blur") {
        if (this.value.length === 2) this.value = ""
      } else setCursorPosition(this.value.length, this)
    }

    var telNumberClickHandler = function (element) {
        element.addEventListener("input", mask, false);
        element.addEventListener("focus", mask, false);
        element.addEventListener("blur", mask, false);
    }

    for (var i =0; i < allTelNumber.length; i++) {
        telNumberClickHandler(allTelNumber[i]);
    }
    /*mask for phone number end*/

    /*form submit start*/

    var allAjaxForm = document.querySelectorAll('.ajaxForm');

    for (var af = 0; af < allAjaxForm.length; af++) {
      allAjaxForm[af].addEventListener('submit', function(evt) {
        evt.preventDefault();

        var warnText = this.querySelector('.warnText');
        var allLabel = this.querySelectorAll('label');
        var allInput = this.querySelectorAll('input');

        for (var label = 0; label < allLabel.length; label++) {
          allLabel[label].classList.add('label-hidden');
        }

        setTimeout(function () {
          warnText.classList.add('warnText--active');
        }, 300)

//////////////////////////////////////////////////////////

          var request = new XMLHttpRequest();
          request.onreadystatechange = function() {
            console.log("readyState=", this.readyState, "status=", this.status);
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              console.log("SUCCESS", this);
            }
          }

          request.open(this.method, this.action, true);

          var data = new FormData(this);
          // for (var key of data.keys())
          //   console.log(key, data.get(key));

          request.send(data);

///////////////////////////////////////////////////////////

        for (var inp = 0; inp < allInput.length; inp++) {

          if (allInput[inp].type === 'text' || allInput[inp].type === 'email') {
            allInput[inp].value = "";
          }
        }

        setTimeout(function () {
          warnText.classList.remove('warnText--active');

          for (var la = 0; la < allLabel.length; la++) {
            allLabel[la].classList.remove('label-hidden');
          }
        }, 3000)

      });
    }
  });
})();