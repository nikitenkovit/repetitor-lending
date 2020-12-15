"use strict";

(function () {

  var mainScrollFunction = function (scrollElement) {

    /*create scroll bar start*/
    var createScrollBar = function () {
      var newScrollTrek = document.createElement('div');
      newScrollTrek.classList.add('scroll-container__scroll-trek');

      scrollElement.appendChild(newScrollTrek);

      var scrollTrek = scrollElement.querySelector('.scroll-container__scroll-trek');
      var newScrollPin = document.createElement('div');
      newScrollPin.classList.add('scroll-container__scroll-pin');

      scrollTrek.appendChild(newScrollPin);
    };

    createScrollBar();
    /*create scroll bar end*/

    /*initiate scroll bar start*/
    var scrollTrek = scrollElement.querySelector('.scroll-container__scroll-trek');
    var scrollPin = scrollElement.querySelector('.scroll-container__scroll-pin');
    scrollPin.style.top = '0';

    var scrollHeightValue = scrollElement.scrollHeight;
    var scrollElementHeightValue = scrollElement.offsetHeight;
    var scrollTrekHeightValue = scrollTrek.offsetHeight;

    var scrollPinPositionLimits = {
      min: 0,
      max: scrollTrekHeightValue
    };

    var scrollTrekPositionLimits = {
      min: 0,
      max: scrollHeightValue
    };

    var scrollPinHeightValue = (scrollElementHeightValue / scrollHeightValue) * 100;

    scrollPin.style.height = scrollPinHeightValue + '%';


    if (scrollHeightValue <= scrollTrekHeightValue) {
      scrollTrek.style.display = 'none';
    } else {
      scrollTrek.style.display = 'block';
    }
    /*initiate scroll bar end*/

    /*add scroll handler start*/
    scrollElement.addEventListener('scroll', function (event) {
      var scrollValue = event.target.scrollTop;
      scrollTrek.style.top = scrollValue + 'px';

      if (parseInt(scrollTrek.style.top) < scrollTrekPositionLimits.min) {
        scrollTrek.style.top = scrollTrekPositionLimits.min + 'px';
      }
      if (parseInt(scrollTrek.style.top) + scrollPin.offsetHeight > scrollTrekPositionLimits.max) {
        scrollTrek.style.top = scrollTrekPositionLimits.max - scrollTrek.offsetHeight + 'px';
      }

      var scrollPinTopPosition = (scrollValue / scrollHeightValue) * 100;
      scrollPin.style.top = scrollPinTopPosition + '%';

      if (parseInt(scrollPin.style.top) < scrollPinPositionLimits.min) {
        scrollPin.style.top = scrollPinPositionLimits.min + 'px';
      }
      if (parseInt(scrollPin.style.top) + scrollPin.offsetHeight > scrollPinPositionLimits.max) {
        scrollPin.style.top = scrollPinPositionLimits.max - scrollPin.offsetHeight + 'px';
      }
    });
    /*add scroll handler end*/

    /*add drag`n drop handler start*/
    var onMouseDown = function (evt) {
      evt.preventDefault();

      var startY = evt.clientY;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shiftY = startY - moveEvt.clientY;

        startY = moveEvt.clientY;

        scrollPin.style.top = (scrollPin.offsetTop - shiftY) + 'px';

        if (parseInt(scrollPin.style.top) < scrollPinPositionLimits.min) {
          scrollPin.style.top = scrollPinPositionLimits.min + 'px';
        }
        if (parseInt(scrollPin.style.top) + scrollPin.offsetHeight > scrollPinPositionLimits.max) {
          scrollPin.style.top = scrollPinPositionLimits.max - scrollPin.offsetHeight + 'px';
        }

        scrollElement.scrollTop = scrollElement.scrollTop - (shiftY + ((shiftY / 100) * 150));
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    scrollPin.addEventListener('mousedown', onMouseDown);

    /*add drag`n drop handler end*/
  };

  /*find all scroll elements and add all scroll bars on page start*/
  var allScrollElements = document.querySelectorAll('.scroll-container');
  var scrollTrek = document.querySelector('.scroll-container__scroll-trek');

  var addAllScrollBars = function () {

    if (scrollTrek) {
      for (var el = 0; el < allScrollElements.length; el++) {
        var currentScrollTrek = allScrollElements[el].querySelector('.scroll-container__scroll-trek');
        allScrollElements[el].removeChild(currentScrollTrek);
      }
    }
    for (var e = 0; e < allScrollElements.length; e++) {
      mainScrollFunction(allScrollElements[e]);
    }
  };

  addAllScrollBars();
  /*find all scroll elements and add all scroll bars on page end*/

  /*re-initiate if the window has changed start*/
  window.addEventListener('resize', function () {
    addAllScrollBars();
  });
  /*re-initiate if the window has changed end*/

  /*re-initiate if tab link click start*/
  var allTabsLinks = document.querySelectorAll('.reviews__years-link');

  var tabLinkClickHandler = function (element) {
    element.addEventListener('click', function () {
      addAllScrollBars();
    });
  };

  for (var link = 0; link < allTabsLinks.length; link++) {
    tabLinkClickHandler(allTabsLinks[link]);
  }
  /*re-initiate if tab link click end*/
})();